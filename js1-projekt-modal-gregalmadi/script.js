"use strict";

// HTML selectors
const container = document.querySelector(".container");
const content = document.querySelectorAll(".content");
const contentText = document.querySelectorAll(".content__text");
const header = document.querySelectorAll(".content__header");
const modalWindow = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalHeader = document.querySelector(".modal__header");
const closeModalBtn = document.querySelector(".btn--close");
const okayBtn = document.querySelector(".btn--okay");
const noBtn = document.querySelector(".btn--no");

// Opening modal logic
const modalOpen = (i) => {
  modalWindow.style.display = "flex";
  modalWindow.classList.add("fadeIn");
  setTimeout(() => {
    modalWindow.classList.remove("fadeIn");
  }, 1000);
  modalContent.innerHTML = contentText[i].innerHTML;
  modalHeader.innerHTML = header[i].innerHTML;
};

// Closing modal logic
const modalClose = () => {
  modalWindow.classList.add("fadeOut");

  setTimeout(() => {
    modalWindow.classList.remove("fadeOut");
    modalWindow.style.display = "none";
  }, 1000);
};

// Listening to click events on cards
content.forEach((el, i) => {
  el.addEventListener("click", () => {
    modalOpen(i);
  });
});

// Listening for modal closing events
closeModalBtn.addEventListener("click", modalClose);
okayBtn.addEventListener("click", modalClose);
noBtn.addEventListener("click", modalClose);
modalWindow.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    modalClose();
  } else {
    return;
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalClose();
  }
});
