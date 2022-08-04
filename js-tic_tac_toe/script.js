"use strict";

// HTML selectors
const tiles = document.querySelectorAll(".tile");
const playerX = document.querySelector(".playerX");
const playerO = document.querySelector(".playerO");
const reset = document.querySelectorAll(".reset");
const gameOverWindow = document.querySelector(".gameOver");
const winMessage = document.querySelector(".winMsg");
const body = document.querySelector("body");

// All game variables
let playerXTurn = false;
let playerOTurn = false;
let stepCount = 0;
let randomNum = 0;
let Xmarks = [];
let Omarks = [];
let initialize;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const partyBlower = new Audio("assets/party.m4a");
const tieChime = new Audio("/assets/tie.wav");

// Initialize game
(initialize = () => {
  randomNum = Math.trunc(Math.random() * 2 + 1);
  gameOverWindow.style.display = "none";

  playerXTurn = playerOTurn = false;

  if (randomNum === 1 && playerXTurn === false) {
    playerXTurn = true;
    playerOTurn = false;
    playerX.classList.add("active");
    playerO.classList.remove("active");
    body.style.backgroundImage =
      "linear-gradient(to right,rgb(0, 0, 0) 0 10%,rgb(255, 255, 255) 75% 100%)";
  } else if (randomNum === 2 && playerOTurn === false) {
    playerOTurn = true;
    playerXTurn = false;
    playerO.classList.add("active");
    playerX.classList.remove("active");
    body.style.backgroundImage =
      "linear-gradient(to left,rgb(0, 0, 0) 0 10%,rgb(255, 255, 255) 75% 100%)";
  }

  tiles.forEach((tile) => {
    tile.innerHTML = "";
    tile.style.backgroundColor = "rgb(35, 105, 84)";
    tile.style.boxShadow = "-1px -1px 5px black";
    tile.classList.remove("animate");
    tile.classList.remove("tilepress");
  });

  stepCount = 0;
  Xmarks = [];
  Omarks = [];
})();

// Switching players
const switchPlayer = () => {
  if (playerXTurn) {
    playerXTurn = false;
    playerOTurn = true;
    playerX.classList.remove("active");
    playerO.classList.add("active");
  } else if (playerOTurn) {
    playerOTurn = false;
    playerXTurn = true;
    playerO.classList.remove("active");
    playerX.classList.add("active");
  }
};

// Game tile click events
tiles.forEach((tile, i) => {
  tile.addEventListener("click", () => {
    if (tile.innerHTML === "" && playerXTurn) {
      move(tile, i, "X", "left", Xmarks);
    } else if (tile.innerHTML === "" && playerOTurn) {
      move(tile, i, "O", "right", Omarks);
    } else if (tile.innerHTML !== "") {
      wrongMove(tile);
    }
  });
});

// One move - either X or O clicks on an unmarked tile
const move = (tile, i, player, direction, arr) => {
  const tilePress = new Audio("/assets/pressure_plate.wav");
  tile.innerHTML = player;
  stepCount++;
  tilePress.play();
  tile.classList.add("tilepress");
  tile.style.backgroundColor = "rgb(20, 57, 46)";
  tile.style.boxShadow = "none";
  setTimeout(() => {
    tile.classList.remove("tilepress");
  }, 2000);

  body.style.backgroundImage = `linear-gradient(to ${direction},rgb(0, 0, 0) 0 10%,rgb(255, 255, 255) 75% 100%)`;
  switchPlayer();
  arr.push(i);
  checkGameStatus();
};

// Wrong move - double clicking on the same tile
const wrongMove = (tile) => {
  const scream1 = new Audio("/assets/scream1_short.wav");
  const scream2 = new Audio("/assets/scream2_short.wav");

  tile.classList.add("animate");
  const randomSound = Math.round(Math.random() + 1);
  randomSound === 1 ? scream1.play() : scream2.play();

  setTimeout(() => {
    tile.classList.remove("animate");
  }, 1000);
};

// Comparing player X-O positions to winning combinations
const compareTiles = (winArr, XArr, OArr) => {
  if (winArr.length <= XArr.length && winArr.every((el) => XArr.includes(el))) {
    gameOver("X");
  }
  if (winArr.length <= OArr.length && winArr.every((el) => OArr.includes(el))) {
    gameOver("O");
  }
};

// Checking game status - tie situation
const checkGameStatus = () => {
  let win = false;

  winningCombos.forEach((array) => {
    compareTiles(array, Xmarks, Omarks, "X", "O");
  });

  if (stepCount === 9 && win === false) {
    gameOver();
  }
};

// Button events - resetting ongoing game
reset.forEach((btn) => {
  btn.addEventListener("click", () => {
    initialize();
  });
});

// Game over screen - adding modal with results and setting background styles
const gameOver = (player) => {
  playerX.classList.remove("active");
  playerO.classList.remove("active");
  gameOverWindow.style.display = "block";
  body.style.backgroundImage =
    "linear-gradient(to left,rgb(255,255,255),rgb(255,255,255))";

  if (player) {
    winMessage.innerHTML = `'${player}' won!🥳`;
    partyBlower.play();
    win = true;
  } else {
    winMessage.innerHTML = `It's a tie!`;
    tieChime.play();
  }
};
