const appFuncs = (() => {
  const projects = new Map();

  class ToDoTask {
    #dueDate;

    #priority;

    constructor(taskName, taskDetails, projName, dueDate, priority, doneStatus) {
      this.taskName = taskName;
      this.taskDetails = taskDetails;
      this.projName = projName;
      this.#dueDate = dueDate;
      this.#priority = priority;
      this.doneStatus = doneStatus;
    }

    get dueDate() {
      return this.#dueDate;
    }

    set dueDate(newDueDate) {
      if (true) {
        this.#dueDate = newDueDate;
      } else {
        alert('Invalid due date');
      }
    }

    get priority() {
      return this.#priority;
    }

    set priority(priorityVal) {
      this.#priority = Number(priorityVal);
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

  function createToDoTask(
    title,
    description,
    projName,
    dueDate,
    priority,
    doneStatus = false,
  ) {
    const newTask = new ToDoTask(
      title,
      description,
      projName,
      dueDate,
      priority,
      doneStatus,
    );
    if (projects.has(projName)) {
      projects
        .get(projName)
        .push(newTask);
    } else {
      projects.set(projName, [newTask]);
    }
  }

  function getProjectList() {
    return Array.from(projects.keys());
  }

  function createProject(projectName) {
    if (!projects.has(projectName)) {
      projects.set(projectName, []);
    } else {
      alert(`${projectName} already exists`);
    }
  }

  function deleteProject(projectName) {
    if (projects.has(projectName)) {
      projects.delete(projectName);
    } else {
      alert(`${projectName} does not exist`);
    }
  }

  function deleteTask({ projName, taskId }) {
    projects.get(projName).splice(taskId, 1);
  }

  function heapify(inputList, bound, ind) {
    let largest = ind;
    const left = ind * 2 + 1;
    const right = ind * 2 + 2;
    const List = inputList;
    if (left < bound && Number(List[left].dueDate) > Number(List[largest].dueDate)) {
      largest = left;
    }
    if (right < bound && Number(List[right].dueDate) > Number(List[largest].dueDate)) {
      largest = right;
    }
    if (largest !== ind) {
      [List[ind], List[largest]] = [List[largest], List[ind]];
      heapify(List, bound, largest);
    }
  }
  function heapSort(inputList) {
    const List = inputList;
    for (let i = 0; i < Math.floor(List.length / 2) - 1; i += 1) {
      heapify(List, List.length, i);
    }
    for (let i = List.length - 1; i > 0; i = -1) {
      [List[i], List[0]] = [List[0], List[i]];
      heapify(List, i, 0);
    }
  }

  function sortByDueDate(taskstoDo) {
    heapSort(taskstoDo);
  }
  function getAllTasks(params) {
    const tasksList = [];
    projects.forEach((tasksToDo) => {
      for (let i = 0; i < tasksToDo.length; i += 1) {
        tasksList.push([tasksToDo[i], i]);
      }
    });
    return params.isSorted ? sortByDueDate(tasksList) : tasksList;
  }
  function getTaskByProject(params) {
    const tasksList = projects
      .get(params.projName)
      .map((task, id) => [task, id]);
    return params.isSorted ? sortByDueDate(tasksList) : tasksList;
  }
  function getTask(projName, taskId) {
    return projects.get(projName)[taskId];
  }
  return {
    createToDoTask,
    getProjectList,
    createProject,
    deleteProject,
    deleteTask,
    getAllTasks,
    getTaskByProject,
    getTask,
  };
})();

export default appFuncs;
