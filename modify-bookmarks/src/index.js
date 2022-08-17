
import './style.css';

/* These three lines below are necessary for working library Bootstrap */
/* FileStyle-2 (https://markusslima.github.io/bootstrap-filestyle/). This library is needed for customization of */
/* html input element. */

//import './css/bootstrap.min.css'
//import '../node_modules/jquery/dist/jquery.min.js';
//import './js/bootstrap-filestyle.min.js';


//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/*
import './js/flags_size.js'
import './js/routes.js'
import './js/app.js'
*/


window.onload = function() {console.log("load")};
window.onchange = function() {console.log("onchange")};
document.onchange = function() {console.log("load-doc")};
document.onready = function() {console.log("onready-doc")};

//window.onresize = setSize;

window.addEventListener("load", setSize);
window.addEventListener("resize", setSize);
/*
window.addEventListener("DOMNodeInserted", () => {
    console.log("reload"); window.location.reload();
});


window.addEventListener("DOMCharacterDataModified", () => {
    console.log("reload"); window.location.reload();
});
*/
window.addEventListener("DOMAttrModified", () => {
    console.log("DOMAttrModified"); //window.location.reload();
});

/*
window.addEventListener("DOMAttrModified", console.log("DOMAttrModified"));
window.addEventListener("DOMAttributeNameChanged", console.log("DOMAttributeNameChanged"));
window.addEventListener("DOMCharacterDataModified", console.log("DOMCharacterDataModified"));
window.addEventListener("DOMElementNameChanged", console.log("DOMElementNameChanged"));
window.addEventListener("DOMNodeInserted", console.log("DOMNodeInserted"));
window.addEventListener("DOMNodeInsertedIntoDocument", console.log("DOMNodeInsertedIntoDocument"));
window.addEventListener("DOMNodeRemoved", console.log("DOMNodeRemoved"));
document.addEventListener("DOMNodeRemovedFromDocument", console.log("DOMNodeRemovedFromDocument"));
document.addEventListener("DOMSubtreeModified", console.log("DOMSubtreeModified"));
*/

//setSize();
//window.resizeTo(0,0)

function setSize() {
    document.getElementsByClassName("container")[0].style.height =  10*window.innerWidth/window.outerWidth + "mm";
    console.log("setSize");
    hashChange(routers);
    //chooseFile();
    //  document.getElementsByClassName("container")[0].style.margin = "2vw";

}

function Route(name, html, defaultSite) {
    this.name = name;
    this.html = html;
    this.default = defaultSite;
}

let routers = [
    new Route("ru", "ru.html", true),
    new Route("en", "en.html", false)
]

window.addEventListener("hashchange", function() {
    hashChange(routers);
    //window.location.reload();
    //setSize();
    //chooseFile();
})

//hashChange(routers)

function hashChange(someRouter){
    console.log("hashChange");
    //setSize();
    //setTimeout(() => chooseFile(), 100);
    let routers2 = someRouter;
    //console.log(window.location.hash == Undefined)
    if(window.location.hash.length > 0 ){

        for (let i=0; i < routers2.length; ++i) {
            if (routers2[i].name === window.location.hash.substr(1)) {
                launch(routers2[i].html, chooseFile)
            }
        }

    } else { console.log("else")
        for (let i=0; i < routers2.length; i++) {
            if (routers2[i].default === true) {
                launch(routers2[i].html, chooseFile)
            }
        }
    }
}

function launch(someHtml, callback) {

    let url = 'routes/' + someHtml;

    let output = document.getElementById("output");

     output.setAttribute('src', url);
     output.setAttribute('frameborder', '0');
     output.setAttribute('width', '100%');
     output.setAttribute('height', '300');


    //output.setAttribute('style', 'background:#00f')//'font-family: -apple-system,BlinkMacSystemFont,"Segoe
       // UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";font-size: 20px;line-height: 1.5;background-image: linear-gradient(180deg, rgba(255, 255, 255, 0), #ffffff),linear-gradient(70deg, #ddf4ff 30%, #dafbe1);');
/*
    let cssLink = document.createElement("link");
    cssLink.href = "./style.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    output.contentDocument.head.appendChild(cssLink);
*/
    output.onload = callback;

}

import FileSaver from 'file-saver';
//const FileSaver = require('file-saver');

// When a bookmark file is chosen, the function 'getFile' is started.
//window.onload = chooseFile;
function chooseFile() {
    console.log("chooseFile"); //alert("chooseFile");
    //output.contentWindow.document.getElementById("chosen-file").onchange = getFile;
    output.contentDocument.getElementById('chosen-file').onchange = getFile;
    //document.getElementById("chosen-file").onchange = getFile;

}


// Function 'addDate' adds a div element with the bookmark creation date after the inputElement.
// Attribute 'ADD_DATE' has a Unix timestamp in seconds.
// Tag "H3" has the name of the folder.
function addDate(inputElement) {
    let element = inputElement;
    let attributeValue, div, date;

    if (element.hasAttribute('ADD_DATE') && element.tagName !== "H3" && element.textContent !== "") {

        attributeValue = element.getAttribute('ADD_DATE');
        date = convertUnixTime(attributeValue);

        div = window.document.createElement('div');
        div.textContent = "   " + date;
        div.style.display = "inline";

        element.insertAdjacentElement('afterEnd', div);
    }
}

// Function 'elementIteration' iterates through the elements and checks if there are nested elements and apply to each
// element function 'addDate'
function elementIteration(inputElement) {
    let element = inputElement;
    addDate(element);

    if (element.hasChildNodes()) {
        let childNodes = element.children;
        for (let i = 0; i < childNodes.length; i++) {
            elementIteration(childNodes[i]);
        }
    }
}

// Function 'convertUnixTime' takes a Unix timestamp in seconds as parameter value and returns a date in format DAY MMM DD YYYY
// HH:MM:SS
function convertUnixTime(date) {
    let dateInstance = new Date();
    dateInstance.setTime(date*1000);
    let calendarDate = (dateInstance.toString()).slice(0,25);
    return calendarDate;
}

// Function 'getFile' parses the input bookmark file, processes it with the function 'elementIteration' and writes with
// method 'saveAs' of 'FileSaver' package
function getFile(e) {
    //console.log("getFile");
    let domTree;
    let inputFile = e.target.files[0];
    let reader = new FileReader();
    let fileContent;
    let outputFile;
    reader.onload = function(e) {
        fileContent = e.target.result;

        //Parsing the content of the input file and assign result to domTree variable
        domTree = new DOMParser().parseFromString(fileContent, "text/html")

        //Pass the content of tag body to function elementIteration for adding dates
        elementIteration(domTree.getElementsByTagName('body')[0]);
        outputFile = (domTree.getElementsByTagName('body')[0]).outerHTML

        //Form the file and write to disk
        let fileForSave = new File([outputFile], "bookmark-result.html", {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(fileForSave)

    }
    reader.readAsText(inputFile);
}

