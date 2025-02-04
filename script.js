let totalTime = 20; // set time di sini
let totalTargets = totalTime * 2; // totalTime * 2 untuk difficulty hard
let score = document.getElementById("score");
let timer = document.getElementById("timer");
timer.textContent = totalTime;
let currentScore = 0;

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
    target.src = "assets/swiper1_flipped.png";
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
    let currentPosition = window.getComputedStyle(target).transform;
    target.src = "assets/swiper2.png";
    target.style.transform = currentPosition;
    target.style.transition = "opacity 1s ease-in-out";
    target.style.opacity = 0;
    currentScore += 100;
    score.textContent = currentScore;

    setTimeout(() => {
      target.remove();
    }, 1000);
  });

  setTimeout(() => {
    target.remove();
  }, 5000);

  target.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });

  gameArea.appendChild(target);
}

let timeLeft = totalTime;
let timerCountdown = setInterval(() => {
  timeLeft--;
  timer.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timerCountdown);
  }
}, 1000);

let targetsSpawned = 0;
let spawnInterval = totalTime / totalTargets * 1000;
let spawnTarget = setInterval(() => {
  createTarget();
  targetsSpawned++;
  console.log(targetsSpawned);
  
  if (targetsSpawned === totalTargets) {
    clearInterval(spawnTarget);
  }
}, spawnInterval);

function showCongratulations() {
  document.getElementById("final-score").textContent = currentScore;
  document.getElementById("congratulations-modal").style.display = "flex";
}

function closeModal() {
  // document.getElementById("congratulations-modal").style.display = "none";
  window.location.href = "index.html";
}

setTimeout(() => {
  showCongratulations();
}, totalTime * 1000 + 5000);

// if (targetsKilled === totalTargets) {
//   showCongratulations();
// } else if (targetsSpawned === totalTargets) {
//   showCongratulations();
// }
