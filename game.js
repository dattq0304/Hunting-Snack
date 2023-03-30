const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let snake = [{ x: 100, y: 190, d: "right" }];
let food;
let gameOver = false;
let score = 0;

const startGame = () => {
  food = createFood();

  const myInterval = setInterval(() => {
    reRender();
    moveSnake();
    checkCollision();

    if (snake[0].x === food.x && snake[0].y === food.y) {
      score++;
      food = createFood();
      expandSnake(
        { x: snake[0].x, y: snake[0].y, d: snake[0].d },
        snake.length * 50
      );
    }

    if (gameOver) {
      drawEndScreen();
      clearInterval(myInterval);
    }
  }, 50);
};

const reRender = () => {
  console.log("re-render");
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  //draw the snake
  context.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    context.fillRect(snake[i].x, snake[i].y, 10, 10);
  }

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

const expandSnake = ({ x, y, d }, time) => {
  setTimeout(() => {
    snake.push({ x, y, d });
  }, time);
};

const checkCollision = () => {
  const len = snake.length;
  for (let i = 1; i < len; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver = true;
    } else {
      gameOver = false;
    }
  }
};

const moveNode = (node) => {
  switch (node.d) {
    case "left":
      if (node.x === 0) gameOver = true;
      else node.x -= 10;
      break;
    case "up":
      if (node.y === 0) gameOver = true;
      else node.y -= 10;
      break;
    case "right":
      if (node.x === canvasWidth - 10) gameOver = true;
      else node.x += 10;
      break;
    case "down":
      if (node.y === canvasHeight - 10) gameOver = true;
      else node.y += 10;
      break;
  }
};

const moveSnake = () => {
  const len = snake.length;
  for (let i = 0; i < len; i++) {
    moveNode(snake[i]);
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
  let prevD = snake[0].d;
  switch (key.keyCode) {
    case 37:
      if (prevD != "right") snake[0].d = "left";
      break;
    case 38:
      if (prevD != "down") snake[0].d = "up";
      break;
    case 39:
      if (prevD != "left") snake[0].d = "right";
      break;
    case 40:
      if (prevD != "up") snake[0].d = "down";
      break;
  }
  changeDirection();
});

const changeDirection = () => {
  const len = snake.length;
  for (let i = 1; i < len; i++) {
    setTimeout(() => {
      snake[i].d = snake[0].d;
    }, 50 * i);
  }
};

startGame();
