"use strict";

const counter = document.querySelector(".counter");
const daysLeft = document.querySelector(".days");

//const startDate = new Date("2022-05-29").getTime(); // previous streak: 110 days
const timeOfTravel = new Date("2024-12-12").getTime();
const now = new Date().getTime();

const diffInDays = Math.trunc((timeOfTravel - now) / 1000 / 60 / 60 / 24);
let diffInSeconds = (timeOfTravel - now) / 1000;

const updater = setInterval(()=>{
  diffInSeconds = (timeOfTravel - now)
},1000000)


daysLeft.innerHTML = `DAYS LEFT: ${diffInDays}`;
counter.innerHTML = `SECONDS LEFT: ${diffInSeconds}`;
