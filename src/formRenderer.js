export const formRenderer = (()=>{
    let currentParent;
    let lastAlteredElement = null;
    const titleMap = {"task-form":"// Create Task", "proj-form":"// Create Project"};
    function showOverlayedContent(id){
        document.querySelector("#container-overlayed").style["visibility"] = "visible";
        const overlayedContent = document.querySelector(id);
        currentParent = overlayedContent.parentElement;
        overlayedContent.classList.add("active");
        document.querySelector("#mini-window-container").appendChild(
            overlayedContent
        );
    }
    function handleFormMenu(id="task-form"){
        document.querySelector("#form-title").textContent = titleMap[id];
        document.querySelectorAll(".form-wrapper").forEach(x=>{
            x.classList.remove("active");
        });
        lastAlteredElement = document.querySelector(`div#${id}`); 
        lastAlteredElement.classList.add("active")
        document.querySelectorAll(".form-menu-item").forEach(x=>{
            x.classList.remove("selected");
        });
        document.querySelector(`span#${id}`).classList.add("selected");
    }
    function hideOverlayedContent(){
        document.querySelector("#container-overlayed").style["visibility"]= 
        "hidden";
        const overlayedContent = document.querySelector("#mini-window-container").firstElementChild;
        if ( lastAlteredElement ){
            lastAlteredElement.classList.remove("active");
            lastAlteredElement = null;
        }
        overlayedContent.classList.remove("active");
        currentParent.appendChild(
            overlayedContent
        );
    }
    return {showOverlayedContent, hideOverlayedContent, handleFormMenu}

})();

