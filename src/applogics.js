export const appFuncs = (()=>{    
    const projects = new Map();

    class todotask{
        constructor (title, description, dueDate, priority, doneStatus){
            this.title = title;
            this.description = description;
            this._dueDate = dueDate;
            this.priority = priority;
            this.doneStatus = doneStatus;
        }
        get dueDate(){
            return this._dueDate;
        }
        set dueDate(newDueDate) {
            if ( true ){
                this._dueDate = newDueDate;
            }else{
                alert("Invalid due date");
            }
        }
    }

    function createToDoTask(title, description, dueDate, priority, projectName, doneStatus=false){

        if ( projects.has(projectName) ){
            projects.get(projectName).push(new todotask(title, description, dueDate, priority, doneStatus));
        }else{
        projects.set(projectName, [new todotask(title, description, dueDate, priority, doneStatus)]);
        }
    }

    function getProjectList(){
        return projects.keys();
    }

    function createProject(projectName){
        if ( !projects.has(projectName) ){
        projects.set(projectName, []);
        }else{
            alert(`${projectName} already exists`);
        }
    }

    function deleteProject(projectName){
        if ( projects.has(projectName) ){
        projects.delete(projectName);
    }else{
        alert(`${projectName} does not exist`);
    }
    }

    function deleteTask(project, taskIndex){
        project.splice(taskIndex, 1);
    }

    function getToDoList(projectName){
        return projects.get(projectName);
    }

    function getTodaysTasks(){
        const tasksToDo = [];
        projects.forEach((projName, taskList)=>{
            const subTaskList = [];
            taskList.forEach(task=>{
                if ( true ){ //add logic based on due date
                    subTaskList.push(task);
                }
            });
            if ( subTaskList.length > 0 ){
                tasksToDo.push([projName, subTaskList]);
            }
        });
        return tasksToDo; 
    }

    return {createToDoTask, getProjectList, createProject,
    deleteProject, deleteTask, getTodaysTasks, getToDoList};
})();





