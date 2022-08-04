"use strict";

// Creating HTML tiles
const gameContainer = document.querySelector(".game-container");

(() => {
  const tileTemplate = `
        <div class="tile">
            <img class="img_content" src=" " /></div>
        </div>`;

  for (let i = 0; i < 16; i++) {
    gameContainer.innerHTML += tileTemplate;
  }
})();

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

let fruitMatrix = [[], [], [], [], [], [], [], []];
let last2TileElements = { indexes: [], tiles: [], images: [] };
let initialize;

let lives = 0;
let flyAway = 0;

//többször változtava a nehézséget a játék megkezdése előtt elrontja a játékot

// Initialize game
(initialize = () => {
  gameContainer.classList.add("tileBlocker");
  radioButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      lives = Number(btn.getAttribute("id"));
      livesCounter.innerHTML = `Lives: ${"❤️".repeat(lives)}`;
      startButton.removeAttribute("disabled");

      startButton.addEventListener("click", () => {
        diffSelector.style.display = "none";
        startButton.style.display = "none";
        resetGame.style.display = "block";
        btn.checked = false;

        randomizer();
      });
    })
  );

  tiles.forEach((el) => el.classList.remove("tileHidden"));
  tileImages.forEach((el) => el.classList.remove("tileHidden"));
})();

// Tile content generator
const randomizer = () => {
  tiles.forEach((el) => {
    el.classList.add("tileRandom");

    setTimeout(() => {
      el.classList.remove("tileRandom");
      gameContainer.classList.remove("tileBlocker");
    }, 1000);
  });

  let fruit = "";
  let set1 = new Set();

  while (set1.size !== 16) {
    set1.add(Math.floor(Math.random() * 16));
  }

  Array.from(set1).forEach((number, i) => {
    switch (number) {
      case 0:
      case 1:
        fruit = "grape";
        tileImages[i].setAttribute("src", `images/${fruit}_fruit.svg`);
        fruitMatrix[0].push(i);
        break;
      case 2:
      case 3:
        fruit = "kiwi";
        tileImages[i].setAttribute("src", `images/${fruit}_fruit.svg`);
        fruitMatrix[1].push(i);
        break;
      case 4:
      case 5:
        fruit = "apple";
        tileImages[i].setAttribute("src", `images/${fruit}_fruit.svg`);
        fruitMatrix[2].push(i);
        break;
      case 6:
      case 7:
        fruit = "banana";
        tileImages[i].setAttribute("src", `images/${fruit}_fruit.svg`);
        fruitMatrix[3].push(i);
        break;
      case 8:
      case 9:
        fruit = "cherry";
        tileImages[i].setAttribute("src", `images/${fruit}_fruit.svg`);
        fruitMatrix[4].push(i);
        break;
      case 10:
      case 11:
        fruit = "strawberry";
        tileImages[i].setAttribute("src", `images/${fruit}_fruit.svg`);
        fruitMatrix[5].push(i);
        break;
      case 12:
      case 13:
        fruit = "orange";
        tileImages[i].setAttribute("src", `images/${fruit}_fruit.svg`);
        fruitMatrix[6].push(i);
        break;
      case 14:
      case 15:
        fruit = "lemon";
        tileImages[i].setAttribute("src", `images/${fruit}_fruit.svg`);
        fruitMatrix[7].push(i);
        break;
    }
  });
};

// Check and handle click events
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

    setTimeout(() => {
      tileImages[i].style.visibility = "visible";
    }, 300);

    setTimeout(() => {
      tile.classList.remove("tileFlip");
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
      }, 1800);

      fruitMatrix.forEach((fruitPos) => {
        if (fruitPos.every((el) => last2TileElements.indexes.includes(el))) {
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
        livesCounter.innerHTML = `Lives: ${"❤️".repeat(lives)}`;
      }
      statusCheck();
    }
  });
});

// Game status checker
const statusCheck = () => {
  const endScreen = (status) => {
    setTimeout(() => {
      gameOverWindow.style.display = "block";
      message.innerHTML = `You ${status}!`;
      livesCounter.innerHTML = "";
    }, 1800);
  };
  if (flyAway === 8) {
    endScreen("won");
  }

  if (lives === 0) {
    endScreen("lost");
  }
};

// New game
const resetVisuals = () => {
  diffSelector.style.display = "block";
  startButton.style.display = "block";
  resetGame.style.display = "none";
  livesCounter.innerHTML = "";
  initialize();
};

restartGame.addEventListener("click", () => {
  resetVisuals();
  gameOverWindow.style.display = "none";
});

resetGame.addEventListener("click", () => {
  resetVisuals();
});

/* Array.from(tiles).every((tile) => tile.classList.contains("tileHidden"))*/
