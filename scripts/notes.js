// variables
const toggle = document.querySelector('.toggle');
const note_btn = document.querySelector("#note-btn");
const todo_list = document.querySelector("#todo-lists");
const SelectColor = document.getElementById("color");
const SalirG = document.getElementById("SalirG");
const BorrarG = document.getElementById("BorrarG");
const Sortb = document.getElementById("sort-btn");
const h1 = document.getElementById("h1");
var Id;
const styleButtons = document.querySelectorAll(".style-button");
var SortC =false;
var SortS =false;
const SortStatus = document.getElementById("sort-status");


// eventListeners

SalirG.addEventListener("click", function (event) {
    quitGroup();
});

BorrarG.addEventListener("click", function (event) {
    delteGroup()
});

//Event listener for "sort color" button
Sortb.addEventListener("click", function (event) {
    if(Sortb.className==="sort-btn fas fa-toggle-off")
    {
        Sortb.className="sort-btn fas fa-toggle-on";
        SortColour();
        favourites();
        SortC=true;
    }
    else
    {
        location.reload();
    }
});

//Event listener for "sort status" button
SortStatus.addEventListener("click", function (event) {
    if(SortStatus.className==="sort-btn fas fa-toggle-off")
    {
        SortStatus.className="sort-btn fas fa-toggle-on";
        SortStat();
        favourites();
        SortS=true;
    }
    else
    {
        SortStatus.className="sort-btn fas fa-toggle-off";
        //Reload the notes so that they appear in the order they were created and not by colour
        location.reload();
    }
});

// navbar listener
toggle.addEventListener('click', (e) => {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
});

// note-btn listener
note_btn.addEventListener("click", function (event) {
    event.preventDefault();
    pushNote(document.getElementById("text-box").value, SelectColor.value, false, style());
    document.getElementById("text-box").value = '';
});

//check,remove or mark a note as favorite
todo_list.addEventListener("click", (e) => {
    var todo = e.target;
    //check note
    if (todo.classList[0] === "complete-btn") {
        const check = todo.parentElement;
        if (todo.value == "false") {

            todo.value = true;
        }
        else if (todo.value == "true") {

            todo.value = false;
        }

        changeNote(todo.parentElement.children[2].value, todo.value)

    }
    //delete note
    else if (todo.classList[0] === "delete-btn") {
        const check = todo.parentElement;
        deleteNote(todo.value);
        check.remove();
    }
    //Mark a note as favourite
    else if (todo.classList[0] === "fav-btn" || todo.parentElement.classList[0] === "fav-btn") {


        if(todo.parentElement.classList[0] === "fav-btn")
        {
            todo=todo.parentElement;
        }
        if(todo.value == "true")
        {
            todo.value = false;    
        }
        else if (todo.value == "false") {
            todo.value = true;

        }
        changeFav(todo.parentElement.children[2].value, todo.value);

    }

});


// functions
//Sort the notes puthing the fovourites on top
function favourites() {

    var list, i, switching, b, shouldSwitch;
    list = todo_list;
    switching = true;

    while (switching) {

        switching = false;
        b = list.getElementsByTagName("div");

        for (i = 0; i < (b.length - 1); i++) {

            shouldSwitch = false;

            if (b[i].children[1].value < b[i + 1].children[1].value) {
                shouldSwitch = true;
                break;
            }

      }
      if (shouldSwitch) {

        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;

      }
    }
}
//Sort the notes by Status (Complete/Pending)
function SortStat() {

    var list, i, switching, b, shouldSwitch;
    list = todo_list;
    switching = true;

    while (switching) {

      switching = false;
      b = list.getElementsByTagName("div");
        
      for (i = 0; i < (b.length - 1); i++) {

        shouldSwitch = false;

        if (b[i].children[3].value > b[i+1].children[3].value) {
            shouldSwitch = true;
            break;
        }
      }
      if (shouldSwitch) {

        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;

      }
    }
}

//Function that sorts notes by colour
function SortColour() {

    var list, i, switching, b, shouldSwitch;
    list = todo_list;
    switching = true;

    while (switching) {

        switching = false;
        b = list.getElementsByTagName("div");

        for (i = 0; i < (b.length - 1); i++) {

            shouldSwitch = false;

            if (b[i].style.borderLeftColor < b[i+1].style.borderLeftColor) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {

            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;

        }
    }
}

function CleanNotes() {
    while (todo_list.firstChild) {
        todo_list.removeChild(todo_list.lastChild);
    }
}
function getId(IdIn) {
    Id = IdIn;
}
function Title(x) {
    h1.innerText = x;
}

function NewNote(content, color, Status, NoteId, MeAdmin, fav, style) {
    if (content != 0) {
        //creating element
        var div = document.createElement("div")
        var li = document.createElement("li");
        var b1 = document.createElement("button");
        var b2 = document.createElement("button");
        var b3 = document.createElement("button");
        var i1 = document.createElement("i");
        var i2 = document.createElement("i");
        var i3 = document.createElement("i");

        //assigning classes
        b1.className = "delete-btn";
        b2.className = "complete-btn";
        b3.className = "fav-btn";
        i1.className = "fas fa-trash";
        i2.className = "fas fa-check";
        i3.className = "far fa-star";
        div.className = "note";
        li.className = "note-content";
        li.textContent = content;

        //Selector for font
        switch (style) {
            case 1: 
                li.style.fontWeight = "bold";
                break;
            case 2:
                li.style.fontStyle = "italic";
                
                break;
            case 3: 
                li.style.textDecoration = "underline";
                break;
            case 4:
                li.style.fontWeight = "bold";
                li.style.fontStyle = "italic";
                break;
            
            case 5:
                li.style.fontWeight = "bold";
                li.style.textDecoration = "underline";
                break;
            case 6: 
                li.style.fontStyle = "italic";
                li.style.textDecoration = "underline";
                break;
            case 7:
                li.style.fontWeight = "bold";
                li.style.fontStyle = "italic";
                li.style.textDecoration = "underline";
                break;
        }

        b1.setAttribute("value", NoteId);
        b2.setAttribute("value", Status);
        b3.setAttribute("value", fav);
        if (MeAdmin == false) {
            b1.style.display = "none";
            b2.style.display = "none";
            b3.style.display = "none";
        }

        switch (color) {
            case "color-1": div.style.borderLeftColor = "#e07536";
                break;
            case "color-2": div.style.borderLeftColor = "#fa8072";
                break;
            case "color-3": div.style.borderLeftColor = "#789dca";
                break;
            case "color-4": div.style.borderLeftColor = "#57bd9e";
                break;
            case "color-5": div.style.borderLeftColor = "#b19cd9";
                break;
        }

        //appending elements
        div.appendChild(li);
        div.appendChild(b3);
        div.appendChild(b1);
        div.appendChild(b2);
        b3.appendChild(i3);
        b1.appendChild(i1);
        b2.appendChild(i2);
        todo_list.appendChild(div);
        if (b2.value === "true") {
            div.classList.toggle("completed");
        }
        if (b3.value === "true") {
            i3.className = "fas fa-star";;
        }
        if(SortC)
        {
            SortColour();
        }
        if(SortS)
        {
            SortStat();
        }
    }
}

//funcion for the buttons
styleButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
    });
})

//Function that returns which font was selected and its possible combinations
function style(){
    let bID = [];
    styleButtons.forEach(button => {
        bID.push(button.classList.contains("active"));
    })
    
    if(!bID[0] && !bID[1]&& !bID[1] && !bID[2]){
        return 0;
    }

    if(bID[0] && (!bID[1] && !bID[2])){
        return 1;
    }
    if(bID[1]  && (!bID[0] && !bID[2])){
        return 2;
    }
    if(bID[2]  && (!bID[1] && !bID[0])){
        return 3;
    }
    if(bID[0] && bID[1] && !bID[2]){
        return 4;
    }
    if(bID[0]  && bID[2] && !bID[1]){
        return 5;
    }
    if(bID[1] && bID[2] && !bID[0]){
        return 6;
    }

    if(bID[1] && bID[2] && bID[0]){
        return 7;
    }
}
