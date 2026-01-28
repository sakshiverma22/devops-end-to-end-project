const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let player = { x: 200, y: 200 };
let food = randomPosition();
let score = 0;

// Listen for keyboard input
document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
  switch (event.key) {
    case "ArrowUp":
      player.y -= boxSize;
      break;
    case "ArrowDown":
      player.y += boxSize;
      break;
    case "ArrowLeft":
      player.x -= boxSize;
      break;
    case "ArrowRight":
      player.x += boxSize;
      break;
  }
  keepInsideCanvas();
  checkCollision();
  draw();
}

function keepInsideCanvas() {
  player.x = Math.max(0, Math.min(player.x, 380));
  player.y = Math.max(0, Math.min(player.y, 380));
}

function checkCollision() {
  if (player.x === food.x && player.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = randomPosition();
  }
}

function randomPosition() {
  return {
    x: Math.floor(Math.random() * 20) * boxSize,
    y: Math.floor(Math.random() * 20) * boxSize
  };
}

function draw() {
  ctx.clearRect(0, 0, 400, 400);

  // Player (black)
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, boxSize, boxSize);

  // Food (red)
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Initial draw
draw();
