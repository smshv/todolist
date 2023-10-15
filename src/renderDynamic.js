import { createDomElem } from "./index";

export function renderHome(tastsToDoToday){
    const mainBody = document.querySelector("#main-body");
    if ( mainBody ){
        while ( mainBody.lastElementChild ){
            mainBody.removeChild(mainBody.lastElementChild);
        }
        mainBody.appendChild(createDomElem("h2", ["main-home"], null, null, "Today"));
        //print todays tasks
    }
}

export function renderProject(projectName, toDoList){
    const mainBody = document.querySelector("#main-body");
    if ( mainBody ){
        while ( mainBody.lastElementChild ){
            mainBody.removeChild(mainBody.lastElementChild);
        }
        mainBody.appendChild(createDomElem("h2", ["main-proj"], null, null, projectName));
        //print tasks in project
    }
}





