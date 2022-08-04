"use strict";

const btnDelete = document.querySelectorAll(".btn--delete");
const elements = document.querySelectorAll(".element");
const btnConfirm = document.querySelector(".btn--confirm");
const btnCancel = document.querySelector(".btn--cancel");
const modal = document.querySelector(".modal_background");
const done = document.querySelector(".done");

let index = 0;

// Displays delete confirmation window
const openModal = (i) => {
  elements[i].classList.add("marked_for_delete");
  modal.style.display = "flex";
  index = i;
};

// Each item delete button event listeners
btnDelete.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    openModal(i);
  });
});

// Checking if all items are deleted
const checkIfDone = () => {
  if (
    Array.from(elements).every((el) => el.classList.contains("deleteElement"))
  ) {
    setTimeout(() => {
      done.style.display = "block";
    }, 2000);
  }
};

// Confirm button event listener
btnConfirm.addEventListener("click", () => {
  elements[index].classList.add("deleteElement");
  modal.style.display = "none";
  elements[index].classList.remove("marked_for_delete");
  elements[index].classList.add("blockPointer");
  checkIfDone();
});

// Cancel button event listener
btnCancel.addEventListener("click", () => {
  modal.style.display = "none";
  elements[index].classList.remove("marked_for_delete");
});
