"use strict";

//--------------------------------------------------
// Creating HTML tiles
const gameContainer = document.querySelector(".game-container");

(() => {
  const tileTemplate = `
        <div class="tile">
            <img class="img_content" src=" " />
        </div>`;

  for (let i = 0; i < 10; i++) {
    gameContainer.innerHTML += tileTemplate;
  }
})();

//--------------------------------------------------
// HTML selectors and global variables
const tiles = document.querySelectorAll(".tile");
const tileImages = document.querySelectorAll(".img_content");

const diffSelector = document.querySelector(".difficultySelector");
const startButton = document.querySelector(".start");
const radioButtons = document.querySelectorAll(".radio");
const livesCounter = document.querySelector(".lives");

const message = document.querySelector(".message");
const gameOverWindow = document.querySelector(".gameOver");
const restartGame = document.querySelector(".restart");
const resetGame = document.querySelector(".reset");
const counter = document.querySelector(".counter");
const highscoreCounter = document.querySelector(".highscore");

let tazoMatrix = [[], [], [], [], []];
let last2TileElements = { indexes: [], tiles: [], images: [] };
let initialize;
let getCookieData;

let lives = 0;
let flyAway = 0;

let timer;

let highscore = 0;
let elapsedTime = 0;

//--------------------------------------------------
(getCookieData = () => {
  const cookie = document.cookie.split("; ");
  highscore = cookie[0].split("=")[1];

  if (highscore !== undefined) {
    highscoreCounter.innerHTML = `⬆️: ${highscore} s`;
  } else {
    highscoreCounter.innerHTML = "⬆️: Not set yet";
  }
})();

//--------------------------------------------------
// Initialize game
(initialize = () => {
  gameContainer.classList.add("tileBlocker");
})();

//--------------------------------------------------
// Tile content generator
const randomizer = () => {
  tiles.forEach((el) => {
    el.classList.add("tileRandom");

    setTimeout(() => {
      el.classList.remove("tileRandom");
      gameContainer.classList.remove("tileBlocker");
    }, 1000);
  });

  let tazo = "";
  let set1 = new Set();

  while (set1.size !== 10) {
    set1.add(Math.floor(Math.random() * 10));
  }

  Array.from(set1).forEach((number, i) => {
    switch (number) {
      case 0:
      case 1:
        tazo = "bulbasaur";
        tileImages[i].setAttribute("src", `images/${tazo}.svg`);
        tazoMatrix[0].push(i);

        break;
      case 2:
      case 3:
        tazo = "charmander";
        tileImages[i].setAttribute("src", `images/${tazo}.svg`);
        tazoMatrix[1].push(i);

        break;
      case 4:
      case 5:
        tazo = "pikachu";
        tileImages[i].setAttribute("src", `images/${tazo}.svg`);
        tazoMatrix[2].push(i);

        break;
      case 6:
      case 7:
        tazo = "squirtle";
        tileImages[i].setAttribute("src", `images/${tazo}.svg`);
        tazoMatrix[3].push(i);

        break;
      case 8:
      case 9:
        tazo = "snorlax";
        tileImages[i].setAttribute("src", `images/${tazo}.svg`);
        tazoMatrix[4].push(i);

        break;
    }
  });
};

//--------------------------------------------------
// Check and handle tile click events
tiles.forEach((tile, i) => {
  tile.addEventListener("mouseover", () => {
    tile.classList.add("tileHover");
    setTimeout(() => {
      tile.classList.remove("tileHover");
    }, 500);
  });
  tile.addEventListener("click", () => {
    let goodMoves = [];
    tile.classList.add("tileFlip");
    tileImages[i].style.transform = "none";

    setTimeout(() => {
      tileImages[i].style.visibility = "visible";
    }, 300);

    setTimeout(() => {
      tile.classList.remove("tileFlip");
      //tileImages[i].style.transform = "scale(1, 1)";
    }, 1000);

    if (
      last2TileElements.tiles.length <= 1 &&
      !last2TileElements.indexes.includes(i)
    ) {
      last2TileElements.indexes.push(i);
      last2TileElements.tiles.push(tile);
      last2TileElements.images.push(tileImages[i]);
    } else {
      last2TileElements.indexes = [];
      last2TileElements.tiles = [];
      last2TileElements.images = [];
      last2TileElements.indexes.push(i);
      last2TileElements.tiles.push(tile);
      last2TileElements.images.push(tileImages[i]);
    }

    if (last2TileElements.indexes.length === 2) {
      document.body.classList.add("tileBlocker");
      setTimeout(() => {
        document.body.classList.remove("tileBlocker");
      }, 2000);

      tazoMatrix.forEach((tazoPos) => {
        if (tazoPos.every((el) => last2TileElements.indexes.includes(el))) {
          goodMoves.push(true);

          setTimeout(() => {
            last2TileElements.tiles.forEach((el) =>
              el.classList.add("tileFlyAway")
            );
            setTimeout(() => {
              last2TileElements.tiles.forEach((el) =>
                el.classList.add("tileHidden")
              );
            }, 1000);
          }, 1000);
        } else {
          goodMoves.push(false);

          setTimeout(() => {
            last2TileElements.tiles.forEach((el) =>
              el.classList.add("tileFlipBack")
            );

            setTimeout(() => {
              last2TileElements.images.forEach(
                (el) => (el.style.visibility = "hidden")
              );
            }, 300);
          }, 1000);
          setTimeout(() => {
            last2TileElements.tiles.forEach((el) =>
              el.classList.remove("tileFlipBack")
            );
          }, 2000);
        }
      });

      if (goodMoves.some((el) => el === true)) {
        flyAway++;
      }

      if (goodMoves.every((el) => el === false)) {
        lives--;
        livesCounter.innerHTML = `Lives: ${"🔥".repeat(lives)}`;
      }
      statusCheck();
    }
  });
});

//--------------------------------------------------
// Game status checker
const statusCheck = () => {
  const endScreen = (status) => {
    setTimeout(() => {
      gameOverWindow.style.display = "block";
      message.innerHTML = `You ${status}!`;
      livesCounter.innerHTML = "Lives:";
    }, 1800);
  };
  if (flyAway === 5) {
    endScreen("won");
    clearInterval(timer);
  }

  if (lives === 0) {
    endScreen("lost");
    clearInterval(timer);
  }

  if (flyAway === 5 && (highscore === undefined || elapsedTime < highscore)) {
    updateHighScore(elapsedTime);
  }
};

//--------------------------------------------------
// Reset game, difficulty selection
const updateHighScore = (seconds) => {
  highscore = seconds;
  highscoreCounter.innerHTML = `⬆️: ${seconds} s`;
  document.cookie = `highscore=${highscore}`;
};

const resetData = () => {
  livesCounter.innerHTML = "";
  diffSelector.style.display = "block";
  resetGame.style.display = "none";
  counter.style.display = "none";
  counter.innerHTML = "";
  clearInterval(timer);
  startButton.disabled = true;
  flyAway = 0;
  elapsedTime = 0;

  tiles.forEach((el) => {
    el.classList.remove("tileHidden");
    el.classList.remove("tileFlyAway");
  });
  tileImages.forEach((el) => {
    el.style.visibility = "hidden";
    el.classList.remove("tileHidden");
    el.classList.remove("tileFlyAway");
  });

  tazoMatrix.forEach((tazoArr) => {
    tazoArr.splice(0, 2);
  });

  for (const keys of Object.keys(last2TileElements)) {
    last2TileElements[keys] = [];
  }

  initialize();
};

restartGame.addEventListener("click", () => {
  resetData();
  gameOverWindow.style.display = "none";
});

resetGame.addEventListener("click", () => {
  resetData();
});

radioButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    lives = Number(btn.getAttribute("id"));
    livesCounter.innerHTML = `Lives: ${"🔥".repeat(lives)}`;
    startButton.disabled = false;
  })
);

//--------------------------------------------------
// Timer logic
const counterUpdate = () => {
  let minutes = 0;
  let seconds = 0;
  timer = setInterval(() => {
    elapsedTime++;
    seconds++;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    } else if (seconds > 59) {
      seconds = 0;
      minutes++;
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    }

    counter.innerHTML = `Elapsed time: ${minutes}:${seconds}`;
  }, 1000);
};

//-------------------------------------------------
// Start game
startButton.addEventListener("click", () => {
  diffSelector.style.display = "none";
  resetGame.style.display = "block";
  counter.style.display = "block";

  radioButtons.forEach((radio) => {
    radio.checked = false;
  });

  randomizer();
  counterUpdate();
});
