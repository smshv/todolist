import "./css/style.css"
import {appFuncs} from "./applogics"

export function createDomElem(
    type, classList = [], id=null, innerHTML=null, textContent = null
){
    const element = document.createElement(type);
    if ( id ){
        element.setAttribute("id", id);
    }
    classList.forEach(className=>{
        element.classList.add(className);
    });
    if ( innerHTML ){
        element.innerHTML = innerHTML;
    }else if( textContent ){
        element.textContent = textContent;
    }
    return element;
}




