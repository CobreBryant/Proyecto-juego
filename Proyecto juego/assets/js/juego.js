const dino = document.getElementById('dino');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.getElementById('game-over-message');

let isJumping = false;
let isGameOver = false;
let score = 0;
let groundMoveInterval;
let dinoPosition = 50;

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  if (!isGameOver) {
    if (event.code === 'ArrowUp' && !isJumping) {
      isJumping = true;
      jumpUp();
    } else if (event.code === 'ArrowRight') {
      moveDinoRight();
    } else if (event.code === 'ArrowLeft') {
      moveDinoLeft();
    }
  }
}

function jumpUp() {
  let position = 0;
  const jumpInterval = setInterval(() => {
    if (position === 400) {
      clearInterval(jumpInterval);
      jumpDown();
    } else {
      position += 10;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function jumpDown() {
  let position = 400;
  const jumpInterval = setInterval(() => {
    if (position === 0) {
      clearInterval(jumpInterval);
      isJumping = false;
    } else {
      position -= 5;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function moveDinoRight() {
  if (dinoPosition < 550) {
    dinoPosition += 10;
    dino.style.left = dinoPosition + 'px';
  }
}

function moveDinoLeft() {
  if (dinoPosition > 0) {
    dinoPosition -= 10;
    dino.style.left = dinoPosition + 'px';
  }
}

function createCactus() {
  if (isGameOver) return;

  const cactus = document.createElement('div');
  cactus.classList.add('cactus');
  gameContainer.appendChild(cactus);

  let cactusPosition = 2000 - Math.random() * 300; // Random height
  cactus.style.left = cactusPosition + 'px';

  const moveCactusInterval = setInterval(() => {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (isColliding(dinoRect, cactusRect)) {
      // Collision detected
      clearInterval(moveCactusInterval);
      clearInterval(groundMoveInterval); // Pause ground movement
      gameOver();
    } else if (cactusPosition < -20) {
      clearInterval(moveCactusInterval);
      gameContainer.removeChild(cactus);
      createCactus();
    } else {
      cactusPosition -= 5;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);
}

function updateScore() {
  score++;
  scoreDisplay.textContent = score;
}

function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function moveGround() {
  let groundPosition = 0;
  groundMoveInterval = setInterval(() => {
    gameContainer.style.backgroundPositionX = groundPosition + 'px';
    groundPosition -= 5;
  }, 20);
}

let gameInterval;
function gameLoop() {
  gameInterval = setInterval(() => {
    updateScore();
  }, 1000);

  moveGround();

  setInterval(() => {
    createCactus();
  }, 5000); // Adjust the interval as needed

  createCactus();
}

function gameOver() {
  isGameOver = true;
  clearInterval(groundMoveInterval); // Stop ground movement
  clearInterval(gameInterval); // Stop score
  saveScoreToLocal();
  gameOverMessage.style.display = 'block';
}

function saveScoreToLocal() {
  localStorage.setItem('dinoGameScore', score);
}

function restartGame() {
  isGameOver = false;
  score = 0;
  scoreDisplay.textContent = score;
  gameOverMessage.style.display = 'none';

  // Remove existing cacti
  const cacti = document.querySelectorAll('.cactus');
  cacti.forEach(cactus => gameContainer.removeChild(cactus));

  // Start the game again
  gameLoop();
}

gameLoop();