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
let headDirection = "right";

const startGame = () => {
  food = createFood();

  const myInterval = setInterval(() => {
    reRender();
    moveSnake();
    snake[0].d = headDirection; //Change snake's head direction to new direction

    //If the snake hits the food
    if (snake[0].x === food.x && snake[0].y === food.y) {
      const len = snake.length;
      food = createFood(); //Create a new food
      expandSnake(
        //Expand the snake
        {
          x: snake[0].x,
          y: snake[0].y,
          d: headDirection,
        },
        len * 50 //The time it takes for each segment to appear
      );
    }

    //If the game is over, stop the game loop and display the end screen
    if (gameOver) {
      drawEndScreen();
      clearInterval(myInterval);
    }
  }, 50); //The game loop runs every 50 milliseconds
};

const reRender = () => {
  //Clear the canvas
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  //Draw the snake
  context.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    context.fillRect(snake[i].x, snake[i].y, 10, 10);
  }

  //Draw the food
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, 10, 10);
};

const createFood = () => {
  let node = {
    x: 10 * Math.floor((Math.random() * canvasWidth) / 10),
    y: 10 * Math.floor((Math.random() * canvasHeight) / 10),
  };
  while (checkOverlap(node)) {
    //Make sure the food doesn't overlap with the snake
    node = {
      x: 10 * Math.floor((Math.random() * canvasWidth) / 10),
      y: 10 * Math.floor((Math.random() * canvasHeight) / 10),
    };
  }
  return node;
};

const checkOverlap = (node) => {
  const len = snake.length;
  for (let i = 0; i < len; i++) {
    //If the food overlaps with a segment of the snake, return true
    if (node.x === snake[i].x && node.y === snake[i].y) return true;
  }
  return false;
};

const expandSnake = ({ x, y, d }, time) => {
  setTimeout(() => {
    snake.push({ x, y, d });
  }, time);
};

const checkCollision = () => {
  const len = snake.length;
  for (let i = 1; i < len; i++) {
    //If the head of the snake overlaps with any other segment, the game is over
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
      if (i === 0 && snake[i].x < 0) gameOver = true;
      else snake[i].x -= 10;
      break;
    case "up":
      if (i === 0 && snake[i].y < 0) gameOver = true;
      else snake[i].y -= 10;
      break;
    case "right":
      if (i === 0 && snake[i].x > canvasWidth - 10) gameOver = true;
      else snake[i].x += 10;
      break;
    case "down":
      if (i === 0 && snake[i].y > canvasHeight - 10) gameOver = true;
      else snake[i].y += 10;
      break;
  }
};

const moveSnake = () => {
  const len = snake.length;
  //Move each segment of the snake
  for (let i = 0; i < len; i++) {
    moveNode(i);
  }

  for (let i = len - 1; i !== 0; i--) {
    //Change direction
    snake[i].d = snake[i - 1].d;

    //Check collision
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver = true;
      return;
    } else {
      gameOver = false;
    }
  }
};

document.addEventListener("keydown", (key) => {
  // Get the current direction of the snake's head
  let prevD = snake[0].d;
  // Check which key was pressed
  switch (key.keyCode) {
    case 37: // left arrow
      // Check that the snake isn't currently moving right (cannot reverse direction)
      if (prevD != "right") {
        headDirection = "left";
      }
      break;
    case 38: // up arrow
      if (prevD != "down") {
        headDirection = "up";
      }
      break;
    case 39: // right arrow
      if (prevD != "left") {
        headDirection = "right";
      }
      break;
    case 40: // down arrow
      if (prevD != "up") {
        headDirection = "down";
      }
      break;
    case 65: // "a" key
      if (prevD != "right") {
        headDirection = "left";
      }
      break;
    case 87: // "w" key
      if (prevD != "down") {
        headDirection = "up";
      }
      break;
    case 68: // "d" key
      if (prevD != "left") {
        headDirection = "right";
      }
      break;
    case 83: // "s" key
      if (prevD != "up") {
        headDirection = "down";
      }
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
