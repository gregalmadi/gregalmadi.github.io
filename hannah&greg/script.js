"use strict";

const counter = document.querySelector(".counter");

setInterval(() => {
  const timeOfTravel = new Date("2024-12-26").getTime() + new Date().getTimezoneOffset() * 60 * 1000;
  const now = new Date().getTime();

  const differenceInEpoch = timeOfTravel - now;

  const days = Math.trunc(differenceInEpoch / 1000 / 60 / 60 / 24);
  const hours = Math.trunc((differenceInEpoch / 1000 / 60 / 60) % 24);
  const minutes = Math.trunc((differenceInEpoch / 1000 / 60) % 60);
  const seconds = Math.trunc((differenceInEpoch / 1000) % 60);

  counter.innerHTML = `TIME REMAINING TILL JAPAN PT.2 💕: ${days}:${String(hours).length < 2 ? "0" + hours : hours}:${String(minutes).length < 2 ? "0" + minutes : minutes}:${
    String(seconds).length < 2 ? "0" + seconds : seconds
  }`;
}, 1000);
