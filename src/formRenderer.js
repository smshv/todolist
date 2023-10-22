export const formRenderer = (()=>{
    let overlayContainer = "#container-overlayed";
    let overlayedContent = null;
    function showOverlayedContent(selector){
        overlayedContent = selector;
        document.querySelector(overlayContainer).style["visibility"] = 
        "visible";
        
        document.querySelector(selector).style["visibility"] = 
        "visible";
    }

    function hideOverlayedContent(){
        document.querySelector(overlayContainer).style["visibility"] = 
        "hidden";
        document.querySelector(overlayedContent).style["visibility"] = 
        "hidden";
    }

    return {showOverlayedContent, hideOverlayedContent}

})();

