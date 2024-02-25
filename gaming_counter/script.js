"use strict";

const counter = document.querySelector(".counter");

setInterval(() => {
  const timeOfTravel = new Date("2024-12-27").getTime();
  const now = new Date().getTime();

  const differenceInEpoch = timeOfTravel - now;

  const days = Math.trunc(differenceInEpoch / 1000 / 60 / 60 / 24);
  const hours = Math.trunc((differenceInEpoch / 1000 / 60 / 60) % 24);
  const minutes = Math.trunc((differenceInEpoch / 1000 / 60) % 60);
  const seconds = Math.trunc((differenceInEpoch / 1000) % 60);

  counter.innerHTML = `TIME REMAINING TILL JAPAN 💕: ${days}:${hours}:${minutes}:${seconds}`;
}, 1000);
