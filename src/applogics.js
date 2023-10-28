const appFuncs = (() => {
  const projects = new Map();

  class ToDoTask {
    #dueDate;

    constructor(title, description, projName, dueDate, priority, doneStatus) {
      this.title = title;
      this.description = description;
      this.projName = projName;
      this.#dueDate = dueDate;
      this.priority = priority;
      this.doneStatus = doneStatus;
    }

    get dueDate() {
      return this.#dueDate;
    }

    set dueDate(newDueDate) {
      if (true) {
        this.#dueDate = newDueDate;
      } else {
        alert("Invalid due date");
      }
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
    if (projects.has(projName)) {
      projects
        .get(projName)
        .push(
          new ToDoTask(
            title,
            description,
            projName,
            dueDate,
            priority,
            doneStatus,
          ),
        );
    } else {
      projects.set(projName, [
        new ToDoTask(
          title,
          description,
          projName,
          dueDate,
          priority,
          doneStatus,
        ),
      ]);
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

  function deleteTask(project, taskIndex) {
    project.splice(taskIndex, 1);
  }

  function heapify(inputList, bound, ind) {
    let largest = ind;
    const left = ind * 2 + 1;
    const right = ind * 2 + 2;
    const List = inputList;
    if (left < bound && List[left].dueDate > List[largest].dueDate) {
      largest = left;
    }
    if (right < bound && List[right].dueDate > List[largest].dueDate) {
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

  return {
    createToDoTask,
    getProjectList,
    createProject,
    deleteProject,
    deleteTask,
    getAllTasks,
    getTaskByProject,
  };
})();

export default appFuncs;
