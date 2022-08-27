"use strict";

import gallery from "./images.json" assert { type: "json" };

const nextImage = document.querySelector(".arrow--right");
const prevImage = document.querySelector(".arrow--left");
const mainImage = document.querySelector(".image__main");
const bubbles = Array.from(document.querySelectorAll(".bubble"));
const counter = document.querySelector(".counter");
const caption = document.querySelector(".caption");

const autoSkipper = 5000;

let imgID = 0;

bubbles.forEach((bubble, i) =>
  bubble.addEventListener("click", () => {
    rollImage(i);
  })
);

nextImage.addEventListener("click", () => {
  imgID === 3 ? (imgID = 0) : imgID++;
  rollImage(imgID);
});

prevImage.addEventListener("click", () => {
  imgID === 0 ? (imgID = 3) : imgID--;
  rollImage(imgID);
});

const rollImage = (imgID) => {
  bubbles.forEach((bubble) =>
    bubble.setAttribute("src", "images/inactive.svg")
  );
  mainImage.classList.add("fade");

  counter.innerHTML = `${gallery[imgID].id + 1}/4`;
  caption.innerHTML = `${gallery[imgID].caption}`;

  bubbles[imgID].setAttribute("src", "images/active.svg");

  setTimeout(() => {
    mainImage.setAttribute("src", `${gallery[imgID].src}`);
  }, 250);

  setTimeout(() => {
    mainImage.classList.remove("fade");
  }, 500);
};

setInterval(() => {
  imgID === 3 ? (imgID = 0) : imgID++;
  rollImage(imgID);
}, autoSkipper);
