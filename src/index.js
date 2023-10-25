import "./css/style.css"
import {appFuncs} from "./applogics"
import {renderer} from "./renderDynamic"
import { handleClick } from "./handleTaskCardEvent";
import { formRenderer } from "./formRenderer";

const menuHandler = (()=>{
    let event;
    const getterMap = {
        "home": [appFuncs.getAllTasks, {}],  //0:method, 1:params
        "today": [appFuncs.getAllTasks, {}],
        "week": [appFuncs.getAllTasks, {}],
        "proj-list": [appFuncs.getTaskByProject, {get projName(){
            return event.target.getAttribute("id");
        }}]
    };
    function handleMenuEvent(e){
        event = e;
        const [getterMethod, params] = getterMap[e.currentTarget.getAttribute("id")];
        renderer.taskGetter = getterMethod;
        for ( const param in params){
            renderer.params[param] = params[param];
        }
        //isSorted param of rendered is controlled by the sort button
        renderer.renderTaskList();
    }
    return {handleMenuEvent}
})();



appFuncs.createProject("test1");
appFuncs.createProject("test2");
appFuncs.createToDoTask("task1", "adas", "test1", "5", 1, true);
appFuncs.createToDoTask("task2", "adas", "test2", "5", 3, false);
document.querySelector("#proj").addEventListener("mouseover", (e)=>{
    e.currentTarget.nextElementSibling.style["visibility"] = "visible";
    renderer.renderProjList(appFuncs.getProjectList());
});
document.querySelector("#proj").parentElement.addEventListener("mouseleave", (e)=>{
    e.currentTarget.lastElementChild.style["visibility"] = "hidden";
});
document.querySelectorAll(".menu-item,.proj-list").forEach(element=>{
    element.addEventListener("click", (e)=>{
        if ( e.target.getAttribute("class") !== "proj-list" && 
            e.target.getAttribute("id") !== "proj" ){
            menuHandler.handleMenuEvent(e);
        }
    });
});
document.querySelector("#sort").addEventListener("click", (e)=>{
    if ( renderer.params.isSorted ){
        e.currentTarget.classList.remove("sorted");
    }else{
        e.currentTarget.classList.add("sorted");
    }
    renderer.params.isSorted = !renderer.params.isSorted;  
});
renderer.taskGetter = appFuncs.getAllTasks;
renderer.renderTaskList();

document.querySelectorAll(".form-menu-item").forEach(x=>{
    x.addEventListener("click", (e)=>{
        formRenderer.handleFormMenu(e.currentTarget.getAttribute("id"));
    })
});

document.querySelector("#add-button").addEventListener("click", ()=>{
    formRenderer.showOverlayedContent("#form-create");
    formRenderer.handleFormMenu();
})
document.querySelectorAll(".cancel").forEach(x=>{
    x.addEventListener("click", ()=>{
        formRenderer.hideOverlayedContent();
    })
});

document.querySelector("#main-body").addEventListener("click", (e)=>{
    handleClick(e);
});








