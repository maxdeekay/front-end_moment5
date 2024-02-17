"use strict";

window.onload = () => {
    const body = document.querySelector("body");
    const nav = document.querySelector("nav");
    const openNav = document.getElementById("open-nav");

    openNav.onclick = () => {
        const style = window.getComputedStyle(nav);

        if (style.display === "none") {
            nav.style.display = "block";
            body.style.margin = "0 0 0 5.5em";
            openNav.innerHTML = "close";
        } else {
            nav.style.display = "none";
            body.style.margin = "0 0 0 0.5em";
            openNav.innerHTML = "menu";
        }
    }
}