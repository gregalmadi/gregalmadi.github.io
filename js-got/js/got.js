"use strict";

import charData from "../json/got.json" assert { type: "json" };

//--------------------------------------------------
// Global variable declaration

const characterContainer = document.querySelector(".container__characters");
const characterImage = document.querySelector(".img__character");
const characterName = document.querySelector(".name__character");
const characterBadge = document.querySelector(".badge__character");
const characterBio = document.querySelector(".bio__character");
const searchValue = document.querySelector(".input");
const buttonSearch = document.querySelector(".search");
const searchInfo = document.querySelector(".notFound");
const sidebarOpeningButton = document.querySelector(".btn__sidebar--open");
const gotHeader = document.querySelector(".header");
const sidebar = document.querySelector(".section__sidebar");

let tileImages;
let isOpen = true;

//--------------------------------------------------
// Sorting character data and filtering alive characters
const aliveAndSortedCharData = charData
  .sort((a, b) => {
    let x = a.name.split(" ")[0];
    let y = b.name.split(" ")[0];
    //let x = a.portrait.slice(7).slice(0, -4);
    //let y = b.portrait.slice(7).slice(0, -4);
    return x < y ? -1 : x > y ? 1 : 0;
  })
  .filter((char) => !char?.dead);

//--------------------------------------------------
// Generating HTML character tile content
(() => {
  const tileTemplate = `
        <div class="tile">
            <img class="img_content" src="" />
            <div class="char_name"></div>
        </div>`;

  for (let i = 0; i < 48; i++) {
    characterContainer.innerHTML += tileTemplate;
  }

  // Filling up tiles
  const tileNames = document.querySelectorAll(".char_name");
  tileImages = document.querySelectorAll(".img_content");
  tileImages.forEach((img, i) => {
    img.setAttribute("src", `${aliveAndSortedCharData[i].portrait}`);
  });
  tileNames.forEach((charName, i) => {
    if (aliveAndSortedCharData[i].alias) {
      charName.innerHTML = aliveAndSortedCharData[i].alias;
    } else {
      charName.innerHTML = aliveAndSortedCharData[i].name;
    }
  });
})();

//------------------------------------
// Show sidebar character details
const showDetails = (img, i) => {
  searchValue.value = "";
  searchInfo.innerHTML = "";

  tileImages.forEach((img) => img.classList.remove("selected"));
  img.classList.add("selected");

  if (aliveAndSortedCharData[i]?.picture.includes("jpg")) {
    characterImage.setAttribute("src", `${aliveAndSortedCharData[i].picture}`);
  } else {
    characterImage.setAttribute("src", `./assets/pictures/noPic.jpg`);
  }

  characterName.innerHTML = `${aliveAndSortedCharData[i].name}`;

  if (aliveAndSortedCharData[i]?.house)
    characterBadge.setAttribute(
      "src",
      `./assets/houses/${aliveAndSortedCharData[i].house}.png`
    );
  else if (aliveAndSortedCharData[i]?.organization) {
    characterBadge.setAttribute(
      "src",
      `./assets/houses/${aliveAndSortedCharData[i].organization}.png`
    );
  } else {
    characterBadge.setAttribute("src", `./assets/houses/noHouse.png`);
  }

  characterBio.innerHTML = `${aliveAndSortedCharData[i].bio}`;
};

//------------------------------------
// Event listeners for characters
tileImages.forEach((img, i) => {
  img.addEventListener("click", () => {
    showDetails(img, i);
    openSidebar();
  });
});

//------------------------------------
// Searchbar functionality
buttonSearch.addEventListener("click", () => {
  const searchedCharacter = searchValue.value.toLowerCase().trim();

  for (const [i, char] of aliveAndSortedCharData.entries()) {
    if (
      char.name.toLowerCase().includes(searchedCharacter) &&
      searchedCharacter !== ""
    ) {
      openSidebar();
      showDetails(tileImages[i], i);
      searchValue.value = "";
      break;
    } else {
      searchInfo.innerHTML = "No character found";
      searchValue.value = "";
    }
  }
});

// Sidebar opening / closing functionality
sidebarOpeningButton.addEventListener("click", () => {
  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

const openSidebar = () => {
  gotHeader.innerHTML = "Game Of Thrones";
  sidebar.style.width = "400px";
  buttonSearch.style.visibility = "visible";
  searchValue.style.visibility = "visible";
  characterName.style.display = "block";
  characterImage.style.display = "block";
  characterBadge.style.display = "block";
  characterBio.style.display = "block";
  isOpen = true;
};

const closeSidebar = () => {
  gotHeader.innerHTML = "GOT";
  sidebar.style.width = "100px";
  buttonSearch.style.visibility = "hidden";
  searchValue.style.visibility = "hidden";
  characterName.style.display = "none";
  characterImage.style.display = "none";
  characterBadge.style.display = "none";
  characterBio.style.display = "none";
  isOpen = false;
};

//----------------------------------------------------------------------------------
//alternative solution for fetching json data (as if it was coming from a webserver)
/*
const fetchUrl = "../json/got.json";

const fetchingData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}.`);

    const data = await response.json();
  } catch (err) {
    throw new Error("Something went wrong with your fetching request!");
  }
  // filtering and sorting from this point is the same
};

fetchingData(fetchUrl);

//----------------------------------------------------------------------------------
//alternative solution for sorting based on surname instead of firstname

const aliveAndSortedCharData = charData
  .sort((a, b) => {
    let x = a.name?.split(" ")[1].trim();
    let y = b.name?.split(" ")[1].trim();
    return x < y ? -1 : x > y ? 1 : 0;
  })
  .filter((char) => !char?.dead);
*/
