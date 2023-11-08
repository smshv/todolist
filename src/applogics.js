let storage = null;

function storageAvailable(type) {
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      // everything except Firefox
      && (e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

function getStoredTasks(projects, taskObjPrototype){
  storageAvailable('localStorage');
  if ( storage ){
    for (let i = 0; i < storage.length; i += 1 ){
      const obj = JSON.parse(storage.getItem(storage.key(i)));
      Object.setPrototypeOf(obj, taskObjPrototype);
      if ( obj.taskName === '_' && !projects.has(obj.projName)){
        projects.set(obj.projName, new Map());
      }else if (projects.has(obj.projName)) {
          if (!projects.get(obj.projName).has(obj.taskName)) {
            projects
            .get(obj.projName)
            .set(obj.taskName, obj);
          }
        }else{
          projects.set(obj.projName, new Map([[obj.taskName, obj]]));
        }
    }
  }
}

const appFuncs = (() => {
  const projects = new Map();

  class ToDoTask {
    
    constructor(taskName="", taskDetails="", projName="", dueDate="", priority="", doneStatus=false) {
      this.taskName = taskName;
      this.taskDetails = taskDetails;
      this.projName = projName;
      this.dueDate = dueDate;
      this.priority = priority;
      this.doneStatus = doneStatus;
    }

    get 'task-name'() {
      return this.taskName;
    }

    set 'task-name'(name) {
      this.taskName = name;
    }

    get 'task-details'() {
      return this.taskDetails;
    }

    set 'task-details'(details) {
      this.taskDetails = details;
    }

    get 'proj-name'() {
      return this.projName;
    }

    set 'proj-name'(name) {
      this.projName = name;
    }

    get 'due-date'() {
      return this.dueDate;
    }

    set 'due-date'(date) {
      this.dueDate = date;
    }

    get 'done-status'() {
      return this.doneStatus;
    }

    set 'done-status'(status) {
      this.doneStatus = (status === 'done');
    }
  }

  function saveToStorage(newTask){
    if ( storage ){
      storage.setItem(`${newTask.projName}_${newTask.taskName}`, JSON.stringify(newTask));
    }
  }
  function createToDoTask(
    formData
  ) {
    const newTask = new ToDoTask(
      formData.get('task-name'),
      formData.get('task-details'),
      formData.get('proj-name'),
      formData.get('due-date'),
      formData.get('priority'),
      formData.get('done-status') === 'done',
    );
    if (projects.has(newTask.projName)) {
      if (!projects.get(newTask.projName).has(newTask.taskName)) {
        projects
          .get(newTask.projName)
          .set(newTask.taskName, newTask);
          saveToStorage(newTask);
      } else {
        alert(`${newTask.taskName} exists in ${newTask.projName}. Please consider changing the task name.`);
      }
    } else {
      projects.set(newTask.projName, new Map([[newTask.taskName, newTask]]));
      saveToStorage(newTask);
    }
  }
  function createProject(projName) {
    if (!projects.has(projName)) {
      projects.set(projName, new Map());
      saveToStorage({projName, taskName:"_"}, {});
    } else {
      alert(`${projName} already exists`);
    }
  }
  function deleteProject(projName) {
    // console.log(projectName);
    if (projects.has(projName)) {
      Array.from(projects.get(projName).keys()).forEach(taskName=>{
        storage.removeItem(`${projName}_${taskName}`); // delete corresponding tasks from storage
      });
      projects.delete(projName);
    } else {
      alert(`${projName} does not exist`);
    }
  }

  function deleteTask({ projName, taskName }) {
    delete projects.get(projName).delete(taskName);
  }

  function editToDoTask(formData, projName, taskName) {
    if ( formData.get('proj-name') ===  projName){
      const task = appFuncs.getTask(projName, taskName);
      Array.from(formData.entries()).slice(0, 6).forEach(([key, value]) => {
        task[key] = value;
      });
      task.doneStatus = (formData.get('done-status') === 'done');
      saveToStorage(task);
    }else{
      deleteTask(projName, taskName);
      createToDoTask(formData);
    }
  }

  function getProjectList() {
    return Array.from(projects.keys());
  }

  
  function heapify(inputList, bound, ind, currentIntTime) {
    let largest = ind;
    const left = ind * 2 + 1;
    const right = ind * 2 + 2;
    const List = inputList;
    // console.log(List[largest]);
    let largestIntTime = new Date(List[largest].dueDate).getTime() - currentIntTime;
    const leftIntDate = left < bound
      ? new Date(List[left].dueDate).getTime() - currentIntTime : null;
    const rightIntDate = right < bound
      ? new Date(List[right].dueDate).getTime() - currentIntTime : null;

    if (leftIntDate && leftIntDate > largestIntTime) {
      largest = left;
      largestIntTime = leftIntDate;
    }
    if (rightIntDate < bound && rightIntDate > largestIntTime) {
      largest = right;
    }
    if (largest !== ind) {
      [List[ind], List[largest]] = [List[largest], List[ind]];
      heapify(List, bound, largest, currentIntTime);
    }
  }
  function heapSort(inputList, currentIntTime) {
    const List = inputList;
    for (let i = Math.floor(List.length / 2) - 1; i >= 0; i -= 1) {
      heapify(List, List.length, i, currentIntTime);
    }

    for (let i = List.length - 1; i > 0; i -= 1) {
      [List[i], List[0]] = [List[0], List[i]];
      heapify(List, i, 0, currentIntTime);
    }
  }

  function sortByDueDate(taskstoDo) {
    const currentIntTime = new Date(new Date().toISOString().split('T')[0]).getTime();
    heapSort(taskstoDo, currentIntTime);
    return taskstoDo;
  }
  
  function getTaskByDays(params){
    const currentIntTime = new Date(new Date().toISOString().split('T')[0]).getTime();
    const timeRemaining = params.daysRemaining * 86400000;
    const tasksList = [];
    Array.from(projects.values()).forEach((tasksOfProject) => {
      Array.from(tasksOfProject.values()).forEach((task) => {
        const taskIntDueTime = new Date(task.dueDate).getTime();
        if (( taskIntDueTime - currentIntTime ) <= timeRemaining ){
          tasksList.push(task);
        }
      });
    });
    return params.isSorted ? sortByDueDate(tasksList):tasksList;
  }
  function getAllTasks(params) { 
    const tasksList = [];
    Array.from(projects.values()).forEach((tasksOfProject) => {
      Array.from(tasksOfProject.values()).forEach((task) => {
        tasksList.push(task);
      });
    });
    return params.isSorted ? sortByDueDate(tasksList) : tasksList;
  }

  function getTaskByProject(params) {
    const tasksList = [];
    Array.from(projects.get(params.projName).values()).forEach((task) => {
      tasksList.push(task);
    });
    return params.isSorted ? sortByDueDate(tasksList) : tasksList;
  }
  function getTask(projName, taskName) {
    return projects.get(projName).get(taskName);
  }
  getStoredTasks(projects, Object.getPrototypeOf(new ToDoTask()));

  return {
    createToDoTask,
    editToDoTask,
    getProjectList,
    createProject,
    deleteProject,
    deleteTask,
    getAllTasks,
    getTaskByDays,
    getTaskByProject,
    getTask,
  };
})();

export default appFuncs;
