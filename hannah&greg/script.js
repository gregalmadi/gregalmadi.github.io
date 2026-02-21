"use strict";

const counter = document.querySelector(".counter");
//const counterObon = document.querySelector(".counter_obon");

setInterval(() => {
  const timeOfTravel = new Date("2026-03-10").getTime() + new Date().getTimezoneOffset() * 60 * 1000;
  //const timeOfTravelObon = new Date("2024-08-09").getTime() + new Date().getTimezoneOffset() * 60 * 1000;
  const now = new Date().getTime();

  const differenceInEpoch = timeOfTravel - now;
  //const differenceInEpochObon = timeOfTravelObon - now;

  const days = Math.trunc(differenceInEpoch / 1000 / 60 / 60 / 24);
  const hours = Math.trunc((differenceInEpoch / 1000 / 60 / 60) % 24);
  const minutes = Math.trunc((differenceInEpoch / 1000 / 60) % 60);
  const seconds = Math.trunc((differenceInEpoch / 1000) % 60);

  //const daysObon = Math.trunc(differenceInEpochObon / 1000 / 60 / 60 / 24);
  //const hoursObon = Math.trunc((differenceInEpochObon / 1000 / 60 / 60) % 24);
  //const minutesObon = Math.trunc((differenceInEpochObon / 1000 / 60) % 60);
  //const secondsObon = Math.trunc((differenceInEpochObon / 1000) % 60);

  counter.innerHTML = `TIME REMAINING TILL VISA APPOINTMENT 🪪🏢: ${days}:${String(hours).length < 2 ? "0" + hours : hours}:${String(minutes).length < 2 ? "0" + minutes : minutes}:${
    String(seconds).length < 2 ? "0" + seconds : seconds
  }`;

  //counter.innerHTML = `TIME REMAINING TILL WEDDING TRIP 💍💕💫: ${days}:${String(hours).length < 2 ? "0" + hours : hours}:${String(minutes).length < 2 ? "0" + minutes : minutes}:${
  //  String(seconds).length < 2 ? "0" + seconds : seconds
  //}`;

  //counter.innerHTML = `HANNAH GOES HOME IN 🛫: ${days} DAYs, ${String(hours).length < 2 ? "0" + hours : hours} HRs, ${String(minutes).length < 2 ? "0" + minutes : minutes} MINs, ${
  //  String(seconds).length < 2 ? "0" + seconds : seconds
  //} SECs`;

  /*counterObon.innerHTML = `OBON! 💖: ${daysObon}:${String(hoursObon).length < 2 ? "0" + hoursObon : hoursObon}:${String(minutesObon).length < 2 ? "0" + minutesObon : minutesObon}:${
    String(secondsObon).length < 2 ? "0" + secondsObon : secondsObon
  }`;*/
}, 1000);









