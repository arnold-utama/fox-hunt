let score = document.getElementById("score");
let timer = document.getElementById("timer");
let currentScore = 0;
let currentTimer = Number(timer.textContent);
function createTarget() {
  let target = document.createElement("img");
  let gameArea = document.getElementById("game-area");
  let gameAreaHeight = gameArea.offsetHeight - 150;

  target.src = "assets/swiper1.png";
  target.alt = "Swiper.png";
  target.style.position = "absolute";
  target.style.top = Math.random() * gameAreaHeight + "px";
  target.style.height = "150px";

  let spawnSide = "left";
  if (Math.random() > 0.5) {
    spawnSide = "right";
  }        

  let transition = "transform 5s ease-in-out";
  if (Math.random() > 0.7) {
    transition = "transform 2s linear";
  }

  if (spawnSide === "left") {
    target.style.left = "-200px";
    setTimeout(() => {
      target.style.transition = transition;
      target.style.transform = "translateX(calc(100vw + 200px))";
    }, 100);
  } else {
    target.style.right = "-200px";
    setTimeout(() => {
      target.style.transition = transition;
      target.style.transform = "translateX(calc(-100vw - 200px))";
    }, 100);
  }

  target.addEventListener("mousedown", function () {
    console.log("Target was hit!");
    let currentPosition = window.getComputedStyle(target).transform;
    target.src = "assets/swiper2.png";
    target.style.transform = currentPosition;
    target.style.transition = "opacity 1s linear";
    target.style.opacity = 0;
    currentScore += 100;
    score.textContent = currentScore;

    setTimeout(() => {
      target.remove();
    }, 500);
  });

  gameArea.appendChild(target);
}

let timerCountdown = setInterval(() => {
  currentTimer--;
  timer.textContent = currentTimer;
}, 1000);

let spawnTarget = setInterval(() => {
  createTarget();
  if (currentTimer <= 0) {
    clearInterval(spawnTarget);
    clearInterval(timerCountdown);
  }
}, 1000);
