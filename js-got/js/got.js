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

let tileImages;

//--------------------------------------------------
// Sorting character data and filtering alive characters
const aliveAndSortedCharData = charData
  .sort((a, b) => {
    let x = a.portrait.slice(7).slice(0, -4);
    let y = b.portrait.slice(7).slice(0, -4);
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
  tileNames.forEach(
    (charName, i) => (charName.innerHTML = aliveAndSortedCharData[i].name)
  );
})();

// Event listeners for characters
tileImages.forEach((img, i) => {
  img.addEventListener("click", () => {
    tileImages.forEach((img) => img.classList.remove("selected"));

    img.classList.add("selected");
    characterImage.setAttribute("src", `${aliveAndSortedCharData[i].picture}`);
    characterName.innerHTML = `${aliveAndSortedCharData[i].name}`;
    characterBadge.setAttribute(
      "src",
      `../assets/houses/${aliveAndSortedCharData[i].house}.png`
    );
    characterBio.innerHTML = `${aliveAndSortedCharData[i].bio}`;
  });
});

// Searchbar functionality
buttonSearch.addEventListener("click", () => {
  const searchedCharacter = searchValue.value.toLowerCase().trim();

  tileImages.forEach((img) => img.classList.remove("selected"));

  aliveAndSortedCharData.forEach((char, i) => {
    if (
      searchedCharacter !== "" &&
      char.name.toLowerCase().includes(searchedCharacter)
    ) {
      tileImages[i].classList.add("selected");
      characterImage.setAttribute(
        "src",
        `${aliveAndSortedCharData[i].picture}`
      );
      characterName.innerHTML = `${aliveAndSortedCharData[i].name}`;
      characterBadge.setAttribute(
        "src",
        `../assets/houses/${aliveAndSortedCharData[i].house}.png`
      );
      characterBio.innerHTML = `${aliveAndSortedCharData[i].bio}`;
      searchInfo.innerHTML = "";
      searchValue.value = "";
    } else {
      searchInfo.innerHTML = "No such character found.";
    }
  });
});
