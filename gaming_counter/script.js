"use strict";

const counter = document.querySelector(".counter");

const startDate = new Date("2022-05-29").getTime();
const now = new Date().getTime();

const diffInDays = Math.trunc((now - startDate) / 1000 / 60 / 60 / 24);

counter.innerHTML = `DAYS PASSED WITHOUT GAMES: ${diffInDays}`;
