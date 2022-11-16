const canvas = document.querySelector("#canvas");
const scoreText = document.querySelector("#score-game");
const container = document.querySelector(".container");
const gameOver = document.querySelector(".gameOver");
const maxScore = document.querySelector(".max-score");
const currentScore = document.querySelector(".current-score");
const gameOverRetry = document.querySelector(".gameOverRetry");

const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lvl = 0;
let score = 0;
let maxScoreVar = 0;
let game = true;

let block = {
  speedBlock: 4,
  x: 0,
  y: canvas.height - 240 - 30,
  w: 300,
  h: 30,
};

if (canvas.width < 500) {
block.w = 150;
block.speedBlock = 1
}

const configs = {
  firstBc: {
    x: canvas.width / 2 - block.w / 2,
    y: canvas.height - 240,
  },
};

let blocksArray = [
  { x: configs.firstBc.x, w: block.w, colorX: "4f2000" },
  { x: configs.firstBc.x, w: block.w, colorX: "4f2000" },
  { x: configs.firstBc.x, w: block.w, colorX: "4f2000" },
  { x: configs.firstBc.x, w: block.w, colorX: "4f2000" },
  { x: configs.firstBc.x, w: block.w, colorX: "4f2000" },
  { x: configs.firstBc.x, w: block.w, colorX: "4f2000" },
  { x: configs.firstBc.x, w: block.w, colorX: "4f2000" },
  { x: configs.firstBc.x, w: block.w, colorX: "4f2000" },
];

// context.fillStyle = "#6a3600";

function gameLoop() {
  requestAnimationFrame(gameLoop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (game) {
    blocksArray.slice(0, 8).map((el, index) => {
      context.fillStyle = "#" + el.colorX;
      context.fillRect(el.x, configs.firstBc.y + 30 * index, el.w, block.h);
    });
    drawBlock();
  }
  console.log(blocksArray);
}

let randomColor = function () {
  return Math.floor(Math.random() * 16777215).toString(16);
};

window.addEventListener("keydown", function (e) {
  if (score > maxScoreVar) maxScoreVar = score;
  if (game && (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 40)) {
    let lastArr = blocksArray[0];
    let ortiqcha = Math.abs(lastArr.x - block.x);
    let colorMaina = randomColor() || "4f2000";

    if (lastArr.x + lastArr.w < block.x || block.x + block.w < lastArr.x) {
      currentScore.innerHTML = score;
      maxScore.innerHTML = maxScoreVar;
      gameOver.style.display = "initial";
      game = false;
    } else if (lastArr.x >= block.x) {
      blocksArray.unshift({ x: lastArr.x, w: block.w - ortiqcha, colorX: colorMaina });

      block.w -= ortiqcha;
      scoreText.innerHTML = ++score;
    } else if (lastArr.x <= block.x) {
      blocksArray.unshift({ x: block.x, w: block.w - ortiqcha });

      block.w -= ortiqcha;
      scoreText.innerHTML = ++score;
    }
    block.x = 0;
    block.speedBlock = 4;
  }
});
container.addEventListener("click", function () {
  if (score > maxScoreVar) maxScoreVar = score;
  if (game === true) {
    let lastArr = blocksArray[0];
    let ortiqcha = Math.abs(lastArr.x - block.x);

    if (lastArr.x + lastArr.w < block.x || block.x + block.w < lastArr.x) {
      currentScore.innerHTML = score;
      gameOver.style.display = "initial";
      maxScore.innerHTML = maxScoreVar;
      game = false;
    } else if (lastArr.x >= block.x) {
      blocksArray.unshift({ x: lastArr.x, w: block.w - ortiqcha, colorX: randomColor() });

      block.w -= ortiqcha;
      scoreText.innerHTML = ++score;
    } else if (lastArr.x <= block.x) {
      blocksArray.unshift({ x: block.x, w: block.w - ortiqcha });

      block.w -= ortiqcha;
      scoreText.innerHTML = ++score;
    }
    block.x = 0;
    block.speedBlock = 4;
  }
});

gameOverRetry.addEventListener("click", function () {
  gameOver.style.display = "none";
  score = 0;
  scoreText.innerHTML = score;
  game = true;
  block.x = 0;
  canvas.width < 500 ? (block.w = 200) : (block.w = 300);
  blocksArray.splice(0, blocksArray.length - 8);
  console.log(blocksArray);
});

function drawBlock() {
  lvl = Math.round(score / 2);
  block.x += block.speedBlock + (lvl * block.speedBlock) / 4;

  if (block.x < 0) {
    block.speedBlock = 4;
  } else if (block.x + block.w > canvas.width) {
    block.speedBlock = -4;
  }
  context.fillStyle = "#4f2000";
  context.fillRect(block.x, block.y, block.w, block.h);
}

gameLoop();
