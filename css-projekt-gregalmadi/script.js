"use strict";

// HTML selectors
const menuItems = document.querySelector(".fa-bars");
const sidebar = document.querySelector(".sidebar");
const userOpen = document.querySelector(".fa-caret-down");
const userMenu = document.querySelector(".user");
const content = document.querySelector(".content");
const contentSlide = document.querySelector(".contentShift");
const searchValue = document.querySelector("#search");
const searcButton = document.querySelector(".search__btn");
const mainCard = document.querySelectorAll(".main__card");
const signIn = document.querySelector(".signIn");
const userId = document.querySelector("#name");
const password = document.querySelector("#password");
const headline = document.querySelector("h1");
const adminPage = document.querySelector("h3");

// Global variable declarations
let invisible = sidebar.style.display === "";
let closed = userMenu.style.display === "";
let userInput = "";
let userName = "";

// Site logic -->
const openMenu = () => {
  content.classList?.remove("contentShiftLeft");
  sidebar.classList?.remove("fadeOut");
  sidebar.classList.add("fadeIn");
  content.classList.add("contentShiftRight");
  invisible = false;
};

const closeMenu = () => {
  content.classList?.remove("contentShiftRight");
  sidebar.classList.add("fadeOut");
  content.classList.add("contentShiftLeft");
  invisible = true;
};

// Opening and closing of sidebar menu
menuItems.addEventListener("click", () => {
  if (invisible === true) {
    openMenu();
  } else {
    closeMenu();
  }
});

// Opening and closing of the user login menu
userOpen.addEventListener("click", () => {
  if (closed === true) {
    userMenu.style.display = "flex";
    closed = false;
  } else {
    userMenu.style.display = "none";
    closed = true;
  }
});

// Basic search bar functionality
searcButton.addEventListener("click", () => {
  userInput = searchValue.value;

  if (userInput !== "") {
    Array.from(mainCard)
      .filter((card) => card.className.includes(userInput))[0]
      .classList.add("pulsate");
  }
});

// Auto close sidebar menu if resized
window.addEventListener("resize", () => {
  if (window.innerWidth < 701 && invisible === false) {
    closeMenu();
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
    closed = true;
  }
});
