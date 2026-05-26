const target = document.getElementById('target');
const scoreText = document.getElementById('score');
const timerText = document.getElementById('timer');
const restartButton = document.getElementById('restartButton');

let score = 0;
let timeLeft = 15;
let gameActive = false;
let moveInterval = null;
let timerInterval = null;

function startGame() {
  score = 0;
  timeLeft = 15;
  gameActive = true;
  scoreText.textContent = `Score: ${score}`;
  timerText.textContent = `Time: ${timeLeft}`;
  target.textContent = 'Tap!';
  target.style.display = 'block';
  restartButton.hidden = true;

  moveTarget();
  moveInterval = setInterval(moveTarget, 900);
  timerInterval = setInterval(updateTimer, 1000);
}

function endGame() {
  gameActive = false;
  target.style.display = 'none';
  restartButton.hidden = false;
  target.textContent = 'Game Over';
  clearInterval(moveInterval);
  clearInterval(timerInterval);
}

function updateTimer() {
  timeLeft -= 1;
  timerText.textContent = `Time: ${timeLeft}`;
  if (timeLeft <= 0) {
    endGame();
  }
}

function moveTarget() {
  if (!gameActive) return;
  const parent = target.parentElement;
  const parentRect = parent.getBoundingClientRect();
  const size = 90;
  const maxX = parentRect.width - size;
  const maxY = parentRect.height - size;
  const x = Math.max(0, Math.min(maxX, Math.random() * maxX));
  const y = Math.max(0, Math.min(maxY, Math.random() * maxY));

  target.style.transform = `translate(${x}px, ${y}px)`;
}

target.addEventListener('click', () => {
  if (!gameActive) return;
  score += 1;
  scoreText.textContent = `Score: ${score}`;
  moveTarget();
});

restartButton.addEventListener('click', () => {
  startGame();
});

startGame();
