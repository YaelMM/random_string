let darkMode = localStorage.getItem('darkMode1');
const darkModeToggle = document.querySelector(".darkModeToggle");

//Functions

//this funcion adds the class dark to all the webpages
function enableDarkMode() {
    document.body.classList.add("dark");

    try {//try for members.html
        const selectGroup = document.getElementById("SelectGroup");
        const members = document.querySelectorAll(".member");

        members.forEach((member) => {
            member.classList.add("dark");
        });
        selectGroup.classList.add("dark");
    } catch (error) { }

    try {//try for dashboard.html
        const links = document.querySelector(".links");
        const viewMain = document.querySelector(".view_main");
        const viewItiem = document.querySelectorAll(".view_item");
        const modal = document.querySelector(".modal");

        viewItiem.forEach((item) => {
            console.log(item);
            item.classList.add("dark");
            console.log(item);
        });
        modal.classList.add("dark");
        links.classList.add("dark");
        viewMain.classList.add("dark");
    } catch (error) { }

    try {//try for notes.html
        const todoList = document.querySelector(".todo-list");

        todoList.classList.add("dark");
    } catch (error) { }

    try {//try for profile.html
        const card = document.querySelector(".card");
        const modal = document.querySelector(".modal");
        const modalDeact = document.querySelector(".modal-deact");

        card.classList.add("dark");
        modal.classList.add("dark");
        modalDeact.classList.add("dark");
    } catch (error) { }

}

//this funcion removes the class dark to all the webpages
function diasbleDarkMode() {
    document.body.classList.remove("dark");

    try {//try for members.html
        const members = document.querySelectorAll(".member");
        const selectGroup = document.getElementById("SelectGroup");

        members.forEach((member) => {
            console.log(member);
            member.classList.remove("dark");
            console.log(member);
        });
        selectGroup.classList.remove("dark");
    } catch (error) { }

    try {//try for dashboard.html
        const links = document.querySelector(".links");
        const viewMain = document.querySelector(".view_main");
        const viewItiem = document.querySelectorAll(".view_item");
        const modal = document.querySelector(".modal");

        viewItiem.forEach((item) => {
            console.log(item);
            item.classList.remove("dark");
            console.log(item);
        });
        links.classList.remove("dark");
        viewMain.classList.remove("dark");
        modal.classList.add("dark");
    } catch (error) { }

    try {//try for notes.js
        const todoList = document.querySelector(".todo-list");
        todoList.classList.remove("dark");
    } catch (error) { }

    try {//try for profile.html
        const card = document.querySelector(".card");
        const modal = document.querySelector(".modal");
        const modalDeact = document.querySelector(".modal-deact");

        card.classList.remove("dark");
        modal.classList.remove("dark");
        modalDeact.classList.remove("dark");
    } catch (error) { }
}


//event listeners

//This event listener toggles between dark and white mode
darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem('darkMode1');
    if (darkMode == "enabled") {
        diasbleDarkMode();
        localStorage.setItem('darkMode1', null);
    }
    else {
        enableDarkMode();
        localStorage.setItem('darkMode1', 'enabled');
    }
});

//this if checks if you have saved darkmode on localstorage on page load
if (darkMode == "enabled") {
    enableDarkMode();
}