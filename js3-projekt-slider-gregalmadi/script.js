"use strict";

import gallery from "./images.json" assert { type: "json" };

const nextImage = document.querySelector(".arrow--right");
const prevImage = document.querySelector(".arrow--left");
const mainImage = document.querySelector(".image__main");
let bubbles;

const counter = document.querySelector(".counter");
const caption = document.querySelector(".caption");

const bubbleContainer = document.querySelector(".bubbles");

const autoSkipper = 5000;
/*const sliderHeight = "80vh";*/

let imgID = 0;

const imageTemplate = `
<img class="bubble" src="images/inactive.svg" />
`;

/*const containerSlider = document.querySelector(".container__slider");
containerSlider.style.height = sliderHeight;*/

for (let i = 0; i < gallery.length; i++) {
  bubbleContainer.innerHTML += imageTemplate;

  /*const bubi = document.createElement("div");
  bubbleContainer.appendChild(bubi);
  bubi.innerHTML = imageTemplate;*/
}
bubbles = Array.from(document.querySelectorAll(".bubble"));

bubbles.forEach((bubble, i) =>
  bubble.addEventListener("click", () => {
    rollImage(i);
  })
);

nextImage.addEventListener("click", () => {
  imgID === gallery.length - 1 ? (imgID = 0) : imgID++;
  rollImage(imgID);
});

prevImage.addEventListener("click", () => {
  imgID === 0 ? (imgID = gallery.length - 1) : imgID--;
  rollImage(imgID);
});

const rollImage = (imgID) => {
  bubbles.forEach((bubble) =>
    bubble.setAttribute("src", "images/inactive.svg")
  );
  mainImage.classList.add("fade");

  counter.innerHTML = `${gallery[imgID].id + 1}/${gallery.length}`;
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
  imgID === gallery.length - 1 ? (imgID = 0) : imgID++;
  rollImage(imgID);
}, autoSkipper);
