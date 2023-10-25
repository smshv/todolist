import { formRenderer } from "./formRenderer";

export function handleClick(e){
    const elemClass = e.target.classList[0];
    console.log(elemClass);
        switch ( elemClass ){
            case "edit-button":
                console.log("asdas ", elemClass);
                formRenderer.showOverlayedContent("div#task-form");
                break
    }
} 