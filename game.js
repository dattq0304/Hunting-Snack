const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let snack;
let food;
let gameOver = false;
let score = 0;

const startGame = () => {
  snack = { x: 100, y: 190, d: "right" };
  food = createFood();

  const myInterval = setInterval(() => {
    reRender();
    moveSnack();

    if (snack.x === food.x && snack.y === food.y) {
      score++;
      food = createFood();
    }

    if (wasLost()) {
      drawEndScreen();
      clearInterval(myInterval);
    }
  }, 50);
};

const drawScreen = () => {
  context.fillStyle = "black";
  context.beginPath();
  context.moveTo(10, 10);
  context.lineTo(10, canvasHeight - 10);
  context.lineTo(canvasWidth - 10, canvasHeight - 10);
  context.lineTo(canvasWidth - 10, 10);
  context.lineTo(10, 10);
  context.stroke();
};

const reRender = () => {
  console.log("re-render");
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  drawScreen();

  //draw the snack
  context.fillStyle = "green";
  context.fillRect(snack.x, snack.y, 10, 10);

  //draw food
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, 10, 10);
};

const createFood = () => {
  return {
    x: 10 * Math.floor((Math.random() * canvasWidth) / 10),
    y: 10 * Math.floor((Math.random() * canvasHeight) / 10),
  };
};

const moveSnack = () => {
  snack.x -= snack.d === "left" ? 10 : 0;
  snack.y -= snack.d === "up" ? 10 : 0;
  snack.x += snack.d === "right" ? 10 : 0;
  snack.y += snack.d === "down" ? 10 : 0;
};

const wasLost = () => {
  if (
    snack.x === 0 ||
    snack.y === 0 ||
    snack.x === canvasWidth - 10 ||
    snack.y === canvasHeight - 10
  ) {
    return true;
  } else {
    return false;
  }
};

const drawEndScreen = () => {
  context.fillStyle = "black";
  context.fillRect(250, 150, 200, 80);
  context.font = "30px Arial";
  context.fillStyle = "white";
  context.fillText(`Score: ${score}`, 290, 190);
};

document.addEventListener("keydown", (key) => {
  switch (key.keyCode) {
    case 37:
      snack.d = "left";
      break;
    case 38:
      snack.d = "up";
      break;
    case 39:
      snack.d = "right";
      break;
    case 40:
      snack.d = "down";
      break;
  }
});

startGame();
