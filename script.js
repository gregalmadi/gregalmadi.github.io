"use strict";

// HTML selectors
const tiles = document.querySelectorAll(".tile");
const playerX = document.querySelector(".playerX");
const playerO = document.querySelector(".playerO");
const reset = document.querySelector(".reset");
const gameOverWindow = document.querySelector(".gameOver");
const newGame = document.querySelector(".newGame");
const winMessage = document.querySelector(".winMsg");

// All game variables
let playerXTurn = false;
let playerOTurn = false;
let stepCount = 0;
let randomNum = 0;

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

let Xmarks = [];
let Omarks = [];

// Initiate game
const initialize = () => {
  randomNum = Math.trunc(Math.random() * 2 + 1);
  gameOverWindow.style.display = "none";
  playerXTurn = false;
  playerOTurn = false;

  if (randomNum === 1 && playerXTurn === false) {
    playerXTurn = true;
    playerOTurn = false;
    playerX.classList.add("active");
    playerO.classList.remove("active");
  } else if (randomNum === 2 && playerOTurn === false) {
    playerOTurn = true;
    playerXTurn = false;
    playerO.classList.add("active");
    playerX.classList.remove("active");
  }

  tiles.forEach((tile) => {
    tile.innerHTML = "";
    tile.style.backgroundColor = "rgb(35, 105, 84)";
    tile.style.boxShadow = "-1px -1px 5px black";
  });

  stepCount = 0;
  Xmarks = [];
  Omarks = [];
};

initialize();

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

// Game events
tiles.forEach((tile, i) => {
  tile.addEventListener("click", () => {
    if (tile.innerHTML === "" && playerXTurn) {
      tile.innerHTML = "X";
      tile.style.backgroundColor = "rgb(20, 57, 46)";
      tile.style.boxShadow = "none";

      switchPlayer();
      stepCount++;
      Xmarks.push(i);
      checkGameStatus();
    } else if (tile.innerHTML === "" && playerOTurn) {
      tile.innerHTML = "O";
      tile.style.backgroundColor = "rgb(20, 57, 46)";
      tile.style.boxShadow = "none";

      switchPlayer();
      stepCount++;
      Omarks.push(i);
      checkGameStatus();
    } else if (tile.innerHTML !== "") {
      tile.classList.add("animate");
      setTimeout(() => {
        tile.classList.remove("animate");
      }, 1000);
    }
  });
});

// Checking game status
const checkGameStatus = () => {
  let win = false;
  winningCombos.forEach((array) => {
    if (
      array.length <= Xmarks.length &&
      array.every((el) => Xmarks.includes(el))
    ) {
      winMessage.innerHTML = `'X' won!🥳`;
      gameOver();
      win = true;
    }

    if (
      array.length <= Omarks.length &&
      array.every((el) => Omarks.includes(el))
    ) {
      winMessage.innerHTML = `'O' won!🥳`;
      gameOver();
      win = true;
    }
    if (stepCount === 9 && win === false) {
      winMessage.innerHTML = `It's a tie!`;
      gameOver();
    }
  });
};

// Button events
reset.addEventListener("click", () => {
  initialize();
});

// Button events
newGame.addEventListener("click", () => {
  initialize();
});

// Reset game
const gameOver = () => {
  playerX.classList.remove("active");
  playerO.classList.remove("active");
  gameOverWindow.style.display = "block";
};
