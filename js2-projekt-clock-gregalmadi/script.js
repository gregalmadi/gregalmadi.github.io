"use strict";

const clock = document.querySelector(".clock");

const logTime = () => {
  const time = new Date();

  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  clock.innerHTML = `${hours} : ${minutes} : ${seconds}`;
};

setInterval(() => {
  logTime();
}, 1000);
