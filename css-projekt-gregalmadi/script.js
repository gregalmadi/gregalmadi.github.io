"use strict";

// HTML selectors
const menuItems = document.querySelector(".fa-bars");
const userOpen = document.querySelector(".fa-caret-down");
const userMenu = document.querySelector(".user");
const content = document.querySelector(".content");
const searchValue = document.querySelector("#search");
const searchButton = document.querySelector(".search__btn");
const mainCard = document.querySelectorAll(".main__card");
const signIn = document.querySelector(".signIn");
const userId = document.querySelector("#name");
const password = document.querySelector("#password");
const headline = document.querySelector("h1");
const adminPage = document.querySelector("h3");
const aside = document.querySelector("aside");

// Global variable declarations
let isAsideOpen = !aside.style.display === "";
let isLoginOpen = !userMenu.style.display === "";
let userInput = "";
let userName = "";

// Site logic -->
const openMenu = () => {
  if (window.innerWidth >= 701) {
    switchMenu("sidebar--small", "sidebar", menuContentLarge);
    content.classList?.remove("contentShiftLeft");
    content.classList?.remove("contentShiftLeft--small");
    aside.classList?.remove("fadeOut");
    aside.classList.add("fadeIn");
    content.classList.add("contentShiftRight");
    isAsideOpen = true;
  }
  if (window.innerWidth < 701) {
    switchMenu("sidebar", "sidebar--small", menuContentSmall);
    content.classList?.remove("contentShiftLeft--small");
    content.classList?.remove("contentShiftLeft");
    aside.classList?.remove("fadeOut");
    aside.classList.add("fadeIn");
    content.classList.add("contentShiftRight--small");
    isAsideOpen = true;
  }
};

const closeMenu = () => {
  if (window.innerWidth >= 701 && isAsideOpen === true) {
    switchMenu("sidebar--small", "sidebar", menuContentLarge);
    content.classList?.remove("contentShiftRight");
    content.classList?.remove("contentShiftRight--small");
    aside.classList.add("fadeOut");
    content.classList.add("contentShiftLeft");
    isAsideOpen = false;
  }
  if (window.innerWidth < 701 && isAsideOpen === true) {
    switchMenu("sidebar", "sidebar--small", menuContentSmall);
    content.classList?.remove("contentShiftRight--small");
    content.classList?.remove("contentShiftRight");
    aside.classList.add("fadeOut");
    content.classList.add("contentShiftLeft--small");
    isAsideOpen = false;
  }
};

// Mobile menu template
const menuContentSmall = `
<nav class="main__nav">
    <ul class="nav__ul">
      <li class="menu--active li--small">
        <i class="fa fa-tachometer"></i>
      </li>
      <li class="li--small">
        <i class="fa fa-windows"></i>
      </li>
      <li class="li--small">
        <i class="fa fa-bookmark"></i>
      </li>
      <li class="li--small">
        <i class="fa fa-area-chart"></i>
      </li>
      <li class="li--small">
        <i class="fa fa-table"></i>
      </li>
    </ul>
  </nav>`;

// Big screen menu template
const menuContentLarge = `
    <nav class="main__nav">
      <ul class="nav__ul">
        <details>
          <summary class="menu__items">Core</summary>
          <li class="menu--active">
            <i class="fa fa-tachometer"></i> Dashboard
            <i class="fa fa-angle-right"></i>
          </li>
        </details>
        <details>
          <summary class="menu__items">Interface</summary>
          <li>
            <i class="fa fa-windows"></i> Layouts
            <i class="fa fa-angle-right"></i>
          </li>

          <li>
            <i class="fa fa-bookmark"></i> Pages
            <i class="fa fa-angle-right"></i>
          </li>
        </details>
        <details>
          <summary class="menu__items">Addons</summary>
          <li>
            <i class="fa fa-area-chart"></i> Charts
            <i class="fa fa-angle-right"></i>
          </li>
          <li>
            <i class="fa fa-table"></i> Tables
            <i class="fa fa-angle-right"></i>
          </li>
        </details>
      </ul>
    </nav>`;

// Switching menu styles based on screen size
const switchMenu = (from, to, content) => {
  aside.classList.remove(from);
  aside.classList.add(to);
  aside.innerHTML = content;
};

// Opening and closing of sidebar menu
menuItems.addEventListener("click", () => {
  if (isAsideOpen === false) {
    openMenu();
  } else {
    closeMenu();
  }
});

// Resize actions - switch menus / auto-close
window.addEventListener("resize", () => {
  if (window.innerWidth >= 701 && isAsideOpen === true) {
    switchMenu("sidebar--small", "sidebar", menuContentLarge);
    content.classList.remove("contentShiftRight--small");
    content.classList.remove("contentShiftRight");
    content.classList.add("contentShiftRight");
  }

  if (window.innerWidth < 701 && isAsideOpen === true) {
    switchMenu("sidebar", "sidebar--small", menuContentSmall);
    content.classList.remove("contentShiftRight--small");
    content.classList.remove("contentShiftRight");
    content.classList.add("contentShiftRight--small");
  }
});

// Opening and closing of the user login menu
userOpen.addEventListener("click", () => {
  if (isLoginOpen === false) {
    userMenu.style.display = "flex";
    isLoginOpen = true;
  } else {
    userMenu.style.display = "none";
    isLoginOpen = false;
  }
});

// Basic search bar functionality
searchButton.addEventListener("click", () => {
  userInput = searchValue.value;

  if (userInput !== "") {
    Array.from(mainCard)
      .filter((card) => card.className.includes(userInput))[0]
      .classList.add("pulsate");
  }
});

// Basic sign in functionality
const credAnims = (el1) => {
  el1.classList.add("warning");
  setTimeout(() => {
    el1.classList.remove("warning");
  }, 1000);
};

signIn.addEventListener("click", () => {
  if (userId.value.length < 4) {
    credAnims(userId);
  } else if (password.value !== "1234") {
    credAnims(password);
  } else {
    userName = userId.value;
    headline.innerHTML = `Welcome ${userName}! Hope you are having a wonderful day 🌞`;
    adminPage.innerHTML = `Admin Page (${userName})`;
    userId.value = "";
    password.value = "";
    userMenu.style.display = "none";
    isLoginOpen = false;
  }
});
