import { $ } from "./MT_interactions";

let PromesseDocumentPret = new Promise( (resolve) => {
    if(document.readyState === "complete") {
        resolve();
    } else {
        document.onreadystatechange = () => document.readyState==="complete"?resolve():null;
    }
});


PromesseDocumentPret.then( () => {
    $( ".multiTouchCopntainer img, .multiTouchCopntainer video" );
});
