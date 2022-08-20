"use strict";

const nextImage = document.querySelector(".arrow--right");
const prevImage = document.querySelector(".arrow--left");
const mainImage = document.querySelector(".image__main");
const bubbles = Array.from(document.querySelectorAll(".bubble"));
const counter = document.querySelector(".counter");
const caption = document.querySelector(".caption");

const gallery = [
  {
    id: 0,
    src: "images/caryatid.jpg",
    caption:
      "A caryatid is a sculpted female figure serving as an architectural support taking the place of a column or a pillar supporting an entablature on her head.",
  },
  {
    id: 1,
    src: "images/acropolis.jpg",
    caption:
      "The Acropolis of Athens is an ancient citadel located on a rocky outcrop above the city of Athens and contains the remains of several ancient buildings of great architectural and historical significance, the most famous being the Parthenon.",
  },
  {
    id: 2,
    src: "images/epidaurus.jpg",
    caption:
      "The Ancient Theatre of Epidaurus is a theatre in the Greek city of Epidaurus, located on the southeast end of the sanctuary dedicated to the ancient Greek God of medicine, Asclepius.",
  },
  {
    id: 3,
    src: "images/mystras.jpg",
    caption:
      "Mystras is a fortified town and a former municipality in Laconia, near ancient Sparta. It served as the capital of the Byzantine Despotate of the Morea in the 14th and 15th centuries, experiencing a period of prosperity and cultural flowering during the Palaeologan Renaissance.",
  },
];

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
}, 5000);
