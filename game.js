const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let snake = [
  { x: 100, y: 190, d: "right" },
  { x: 90, y: 190, d: "right" },
  { x: 80, y: 190, d: "right" },
];
let food;
let gameOver = false;
let score = 0;

const startGame = () => {
  food = createFood();

  const myInterval = setInterval(() => {
    reRender();
    moveSnake();

    if (snake[0].x === food.x && snake[0].y === food.y) {
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
  // console.log("re-render");
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
  let node = {
    x: 10 * Math.floor((Math.random() * canvasWidth) / 10),
    y: 10 * Math.floor((Math.random() * canvasHeight) / 10),
  };
  while(checkSnakeLocation(node)) {
    node = {
      x: 10 * Math.floor((Math.random() * canvasWidth) / 10),
      y: 10 * Math.floor((Math.random() * canvasHeight) / 10),
    };
  }
  return node;
};

const checkSnakeLocation = (node) => {
  const len = snake.length
  for(let i = 0; i < len; i++) {
    if(node.x === snake[i].x && node.y === snake[i].y) return true;
  }
  return false;
}

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

const moveNode = (i) => {
  switch (snake[i].d) {
    case "left":
      if ((i === 0 && snake[i].x === 0) || checkCollision()) gameOver = true;
      else snake[i].x -= 10;
      break;
    case "up":
      if ((i === 0 && snake[i].y === 0) || checkCollision()) gameOver = true;
      else snake[i].y -= 10;
      break;
    case "right":
      if ((i === 0 && snake[i].x === canvasWidth - 10) || checkCollision())
        gameOver = true;
      else snake[i].x += 10;
      break;
    case "down":
      if ((i === 0 && snake[i].y === canvasHeight - 10) || checkCollision())
        gameOver = true;
      else snake[i].y += 10;
      break;
  }
};

const moveSnake = () => {
  const len = snake.length;
  //Move the snake
  for (let i = 0; i < len; i++) {
    moveNode(i);
  }

  for (let i = len - 1; i !== 0; i--) {
    //Check collision
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver = true;
      return;
    } else {
      gameOver = false;
    }

    //Change direction
    snake[i].d = snake[i - 1].d;
  }
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
});

const drawEndScreen = () => {
  context.fillStyle = "black";
  context.fillRect(250, 150, 200, 80);
  context.font = "30px Arial";
  context.fillStyle = "white";
  context.fillText(`Score: ${snake.length - 3}`, 290, 190);
};

startGame();
