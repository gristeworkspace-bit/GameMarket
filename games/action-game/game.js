const gameCanvas = document.getElementById('gameCanvas');
const scoreText = document.getElementById('score');
const livesText = document.getElementById('lives');
const restartButton = document.getElementById('restartButton');
let world = null;
const controls = {
  left: false,
  right: false,
  jump: false,
};

let score = 0;
let lives = 3;
let gameOver = false;
let player = null;
let playerState = { x: 50, y: 280, vx: 0, vy: 0, grounded: false };
let platforms = [];
let coins = [];
let animationFrame = null;

const viewWidth = 340;
const viewHeight = 500;
const worldWidth = 700;
const worldHeight = 520;
const gravity = 0.7;
const speed = 3.5;
const jumpPower = -13;

function createEntity(className, x, y, width, height) {
  const element = document.createElement('div');
  element.className = className;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  world.appendChild(element);
  return element;
}

function setupScene() {
  gameCanvas.innerHTML = '<div id="world" class="world"></div>';
  world = document.getElementById('world');
  world.style.width = `${worldWidth}px`;
  world.style.height = `${worldHeight}px`;

  playerState.x = 50;
  playerState.y = 280;
  playerState.vx = 0;
  playerState.vy = 0;
  playerState.grounded = false;

  player = createEntity('player', playerState.x, playerState.y, 34, 44);

  const level = [
    { x: 0, y: 438, w: 340, h: 28 },
    { x: 20, y: 360, w: 120, h: 20 },
    { x: 190, y: 300, w: 120, h: 20 },
    { x: 80, y: 220, w: 100, h: 20 },
    { x: 220, y: 150, w: 100, h: 20 }
  ];

  platforms = level.map(platform => createEntity('platform', platform.x, platform.y, platform.w, platform.h));

  coins = [
    { x: 50, y: 320 },
    { x: 230, y: 260 },
    { x: 260, y: 110 }
  ].map(coin => {
    const node = createEntity('coin', coin.x, coin.y, 18, 18);
    return { node, x: coin.x, y: coin.y, collected: false };
  });

  updateHud();
  gameOver = false;
  restartButton.hidden = true;
}

function updateHud() {
  scoreText.textContent = `Score: ${score}`;
  livesText.textContent = `Lives: ${lives}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function rectOverlap(a, b) {
  return !(a.left > b.right || a.right < b.left || a.top > b.bottom || a.bottom < b.top);
}

function getRect(element) {
  const left = parseFloat(element.style.left);
  const top = parseFloat(element.style.top);
  const width = parseFloat(element.style.width);
  const height = parseFloat(element.style.height);
  return { left, top, right: left + width, bottom: top + height, width, height };
}

function collectCoins() {
  const playerRect = getRect(player);
  coins.forEach(coin => {
    if (coin.collected) return;
    const coinRect = { left: coin.x, top: coin.y, right: coin.x + 18, bottom: coin.y + 18 };
    if (rectOverlap(playerRect, coinRect)) {
      coin.collected = true;
      coin.node.remove();
      score += 100;
      updateHud();
    }
  });
}

function updateCamera() {
  if (!world) return;
  const targetX = clamp(playerState.x + 17 - viewWidth / 2, 0, worldWidth - viewWidth);
  const targetY = clamp(playerState.y + 22 - viewHeight / 2, 0, worldHeight - viewHeight);
  world.style.transform = `translate(${-targetX}px, ${-targetY}px)`;
}

function applyPhysics() {
  if (gameOver) return;

  const targetSpeed = (controls.right ? 1 : 0) - (controls.left ? 1 : 0);
  playerState.vx = targetSpeed * speed;

  if (controls.jump && playerState.grounded) {
    playerState.vy = jumpPower;
    playerState.grounded = false;
  }

  playerState.vy += gravity;
  playerState.x += playerState.vx;
  playerState.y += playerState.vy;
  playerState.x = clamp(playerState.x, 0, worldWidth - 34);

  if (playerState.y > worldHeight - 44) {
    loseLife();
    return;
  }

  playerState.grounded = false;
  platforms.forEach(platform => {
    const platformRect = getRect(platform);
    const playerRect = getRect(player);
    const nextRect = {
      left: playerState.x,
      top: playerState.y,
      right: playerState.x + playerRect.width,
      bottom: playerState.y + playerRect.height,
      width: playerRect.width,
      height: playerRect.height
    };

    if (rectOverlap(nextRect, platformRect) && playerState.vy >= 0 && playerState.y + playerRect.height <= platformRect.bottom) {
      playerState.y = platformRect.top - playerRect.height;
      playerState.vy = 0;
      playerState.grounded = true;
    }
  });

  player.style.left = `${playerState.x}px`;
  player.style.top = `${playerState.y}px`;
  collectCoins();
  updateCamera();
}

function loseLife() {
  lives -= 1;
  updateHud();
  if (lives <= 0) {
    endGame();
    return;
  }
  playerState.x = 50;
  playerState.y = 280;
  playerState.vx = 0;
  playerState.vy = 0;
}

function endGame() {
  gameOver = true;
  restartButton.hidden = false;
  const message = document.createElement('div');
  message.className = 'game-over';
  message.textContent = 'Game Over';
  if (!document.querySelector('.game-over')) {
    gameCanvas.appendChild(message);
  }
}

function gameLoop() {
  applyPhysics();
  if (!gameOver) {
    animationFrame = requestAnimationFrame(gameLoop);
  }
}

function startGame() {
  score = 0;
  lives = 3;
  updateHud();
  setupScene();
  if (document.querySelector('.game-over')) {
    document.querySelector('.game-over').remove();
  }
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(gameLoop);
}

function handlePointer(button, active) {
  controls[button] = active;
}

['leftButton','rightButton','jumpButton'].forEach(id => {
  const button = document.getElementById(id);
  const control = id.replace('Button', '').toLowerCase();
  button.addEventListener('pointerdown', () => handlePointer(control, true));
  button.addEventListener('pointerup', () => handlePointer(control, false));
  button.addEventListener('pointerleave', () => handlePointer(control, false));
  button.addEventListener('click', event => event.preventDefault());
});

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') controls.left = true;
  if (e.key === 'ArrowRight') controls.right = true;
  if (e.key === 'ArrowUp' || e.key === ' ') controls.jump = true;
});

window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') controls.left = false;
  if (e.key === 'ArrowRight') controls.right = false;
  if (e.key === 'ArrowUp' || e.key === ' ') controls.jump = false;
});

restartButton.addEventListener('click', startGame);

startGame();
