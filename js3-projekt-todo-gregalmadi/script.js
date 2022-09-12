"use strict";

//------------------------------------------------------
// HTML selectors
const dateElement = document.querySelector(".date");
const inputField = document.querySelector(".addText");
const addItemBtn = document.querySelector(".addItem");
const pendingItems = document.querySelector(".container__pendingItems");
const headerPending = document.querySelector(".container__pending header");
const completedItems = document.querySelector(".container__completedItems");
const headerCompleted = document.querySelector(".container__completed header");
const clearAll = document.querySelector(".clear");
const showHide = document.querySelector(".showHide");

//------------------------------------------------------
// Global variables
let pendingItemCount = 0;
let completedItemCount = 0;

// Selectors for future content
let uniqueItems;
let contentItems;

// IIFE-s
let refreshCounter;
let loadData;
let updateCompletePercentage;
let setupDate;

// Local storage items
let todos;
let itemList = [];

// HTML template for todo items
const itemTemplatePending = `
  <input class="checkbox__task" type="checkbox"/>
  <div class="content__task"></div>
  <button class="delete__task">
    <i class="fa fa-trash" aria-hidden="true"></i>
  </button>
`;

const itemTemplateCompleted = `
  <input class="checkbox__task" type="checkbox" checked disabled/>
  <div class="content__task"></div> 
`;

//------------------------------------------------------
// Generating event listeners for todo items
const addNewEventListeners = (item) => {
  let deleteButton = item.children[2];
  let checkbox = item.children[0];

  // Add delete icon visibility listeners
  item.addEventListener("mouseover", () => {
    deleteButton.style.visibility = "visible";
    deleteButton.classList.add("fadeIn");
    setTimeout(() => {
      deleteButton?.classList.remove("fadeIn");
    }, 1000);
  });

  item.addEventListener("mouseleave", () => {
    deleteButton.style.visibility = "hidden";
  });

  // Add delete icon click handle logic
  deleteButton.addEventListener("click", (e) => {
    let item = e.target.parentElement.parentElement;
    let itemContent = item.children[1].innerHTML;
    pendingItemCount--;
    item.remove();

    itemList = itemList.filter((item) => item.desc !== itemContent);

    storeAndRefresh();
  });

  // Add checkbox click handle logic
  checkbox.addEventListener(
    "click",
    (e) => {
      let item = e.target.parentElement;
      let itemContent = item.children[1].innerHTML;
      pendingItemCount--;
      item.remove();
      checkbox.setAttribute("disabled", true);
      deleteButton.style.display = "none";
      itemList.find((item) => item.desc === itemContent).done = true;
      completedItems.appendChild(item);

      storeAndRefresh();
    },
    { once: true }
  );
};

//------------------------------------------------------
// Generating HTML for todo items
const createTaskHTML = (status, content) => {
  const item = document.createElement("div");
  item.classList.add("item");

  if (status === "pendingItems") {
    pendingItems.appendChild(item);
    item.innerHTML = itemTemplatePending;
    pendingItemCount++;

    contentItems = document.querySelectorAll(".content__task");
    uniqueItems = document.querySelectorAll(".item");

    pendingItems.children[pendingItemCount - 1].children[1].innerHTML = content;

    uniqueItems[pendingItemCount - 1].classList.add("fadeIn");
    setTimeout(() => {
      uniqueItems.forEach((item) => item.classList?.remove("fadeIn"));
    }, 1000);

    addNewEventListeners(item);
  }

  if (status === "completedItems") {
    completedItems.appendChild(item);
    item.innerHTML = itemTemplateCompleted;
    completedItemCount++;

    contentItems = document.querySelectorAll(".content__task");

    completedItems.children[completedItemCount - 1].children[1].innerHTML =
      content;
  }
};

//------------------------------------------------------
// Initialization

// Loading localstorage data
(loadData = () => {
  todos = JSON.parse(localStorage.getItem("todos") || "[]");

  todos?.forEach((todo) => {
    if (todo.done === false) {
      createTaskHTML("pendingItems", todo.desc);
    }
    if (todo.done === true) {
      createTaskHTML("completedItems", todo.desc);
    }
  });
})();

// Saving to localstorage
const storeData = () => {
  localStorage.setItem("todos", JSON.stringify(itemList));
};

// Refreshing task counter and completion percentage
(refreshCounter = () => {
  headerPending.innerHTML = `You have ${pendingItems.childElementCount} pending items.`;
  pendingItems.childElementCount === 1
    ? (headerPending.innerHTML = `You have 1 pending item.`)
    : {};
  pendingItems.childElementCount === 0
    ? (headerPending.innerHTML += " > Time to party! 🥳")
    : {};
})();

(updateCompletePercentage = () => {
  completedItems.childElementCount + pendingItems.childElementCount === 0
    ? (headerCompleted.innerHTML = `Completed tasks: 100%`)
    : (headerCompleted.innerHTML = `Completed tasks: ${Math.trunc(
        (completedItems.childElementCount /
          (completedItems.childElementCount + pendingItems.childElementCount)) *
          100
      )}%`);
})();

// Date setup
(setupDate = () => {
  const date = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  dateElement.innerHTML = date;
})();

//------------------------------------------------------
// Add new tasks
addItemBtn.addEventListener("click", () => {
  const addedItem = inputField.value;

  if (addedItem.length != 0) {
    createTaskHTML("pendingItems", addedItem);
    itemList.push({ desc: addedItem, done: false });
    inputField.value = "";

    storeAndRefresh();
  } else return;
});

//------------------------------------------------------
// Extra button event listeners

// Show and hide completed tasks
let displayComplete = true;

showHide.addEventListener("click", () => {
  if (displayComplete === false) {
    displayComplete = true;
    showHide.innerHTML = "Hide completed";
    completedItems.style.display = "block";
  } else {
    displayComplete = false;
    showHide.innerHTML = "Show completed";
    completedItems.style.display = "none";
  }
});

// Clear all data
clearAll.addEventListener("click", () => {
  pendingItemCount = 0;
  completedItemCount = 0;
  localStorage.clear();
  loadData();
  document.location.reload();
});

// Refresh storage and counters
const storeAndRefresh = () => {
  storeData();
  refreshCounter();
  updateCompletePercentage();
};
