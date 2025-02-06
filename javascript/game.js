let totalTime = 5; // set waktu per round di sini
let totalSwiper = Math.round(totalTime * 1.5); // jumlah Swiper yang muncul
let totalBoots = Math.round(totalSwiper / 2); // jumlah Boots yang muncul
let totalZalvin = Math.round(totalSwiper / 5); // jumlah Zalvin yang muncul
let swiperPoints = 100; // poin yang didapat ketika menembak Swiper
let zalvinPoints = 500; // poin yang didapat ketika menembak Zalvin
let bootsPoints = -300; // poin yang didapat ketika menembak Boots
let score = document.getElementById("score");
let timer = document.getElementById("timer");
timer.textContent = totalTime;
let gameArea = document.getElementById("game-area");
let gameAreaHeight = gameArea.offsetHeight - 150;
let currentScore = 0;

function createSwiper() {
  let target = document.createElement("img");
  target.style.position = "absolute";
  target.style.top = Math.random() * gameAreaHeight + "px";
  target.style.height = "150px";
  target.src = "./assets/swiper1.png";
  target.alt = "Swiper";
  let transition = "transform 5s ease-in-out";

  if (Math.random() > 0.7) {
    transition = "transform 2s linear";
  }
  let spawnSide = "left";
  if (Math.random() > 0.5) {
    spawnSide = "right";
    target.src = "./assets/swiper1_flipped.png";
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

  target.addEventListener("mousedown", function handleMouseDown() {
    if (target.dataset.clicked) {
      return;
    }
    target.dataset.clicked = "true";
    let currentPosition = window.getComputedStyle(target).transform;
    target.src = "./assets/swiper2.png";
    target.style.transform = currentPosition;
    target.style.transition = "opacity 1s ease-in";
    target.style.opacity = 0;
    currentScore += swiperPoints;
    score.textContent = currentScore;

    showPoints(target, swiperPoints);

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

function createBoots() {
  let target = document.createElement("img");
  target.style.position = "absolute";
  target.style.top = Math.random() * gameAreaHeight + "px";
  target.style.height = "150px";
  target.src = "./assets/boots1.webp";
  target.alt = "Boots";
  let transition = "transform 1.7s linear";

  let spawnSide = "left";
  if (Math.random() > 0.5) {
    spawnSide = "right";
    target.src = "./assets/boots1_flipped.webp";
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

  target.addEventListener("mousedown", function handleMouseDown() {
    if (target.dataset.clicked) {
      return;
    }
    target.dataset.clicked = "true";
    let currentPosition = window.getComputedStyle(target).transform;
    target.src = "./assets/boots2.png";
    target.style.transform = currentPosition;
    target.style.transition = "opacity 1s ease-in";
    target.style.opacity = 0;
    currentScore += bootsPoints;
    score.textContent = currentScore;

    showPoints(target, bootsPoints);

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

function createZalvin() {
  let target = document.createElement("img");
  target.style.position = "absolute";
  target.style.top = Math.random() * gameAreaHeight + "px";
  target.style.height = "150px";
  target.style.height = "300px";
  target.style.top = (Math.random() * gameAreaHeight) / 2 + "px";
  target.src = "./assets/zalvin1.png";
  target.alt = "Zalvin";
  let transition = "transform 2s ease-in-out";

  let spawnSide = "left";
  if (Math.random() > 0.5) {
    spawnSide = "right";
    target.src = "./assets/zalvin1_flipped.png";
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

  target.addEventListener("mousedown", function handleMouseDown() {
    if (target.dataset.clicked) {
      return;
    }
    target.dataset.clicked = "true";
    currentScore += zalvinPoints;
    score.textContent = currentScore;
    target.remove();
    let zalvinSound = new Audio("./assets/zalvin.mp3");
    zalvinSound.play();

    let jumpscare = document.createElement("img");
    jumpscare.src = "./assets/zalvin2.png";
    jumpscare.style.height = "200%";
    jumpscare.style.position = "absolute";
    jumpscare.style.left = "50%";
    jumpscare.style.top = "100%";
    jumpscare.style.transform = "translate(-50%, -50%)";
    gameArea.appendChild(jumpscare);

    showPoints(jumpscare, zalvinPoints);

    setTimeout(() => {
      jumpscare.remove();
    }, 1000);

    jumpscare.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });
  });

  setTimeout(() => {
    target.remove();
  }, 5000);

  target.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });
  gameArea.appendChild(target);
}

function showPoints(target, value) {
  let rect = target.getBoundingClientRect();
  let swiperX = rect.left + rect.width / 2;
  let swiperY = rect.top - 50;

  let points = document.createElement("span");
  points.textContent = "+" + value;
  points.style.color = "#ffee83";
  if (value < 0) {
    points.textContent = value;
    points.style.color = "#ed4c63";
  }
  points.style.fontSize = "1.5em";
  points.style.fontWeight = "bold";
  points.style.textShadow =
    "1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black";
  points.style.position = "absolute";
  points.style.left = `${swiperX}px`;
  points.style.top = `${swiperY}px`;
  points.style.pointerEvents = "none";
  points.style.transition = "opacity 0.8s ease-in, transform 0.8s ease-out";
  points.style.transform = "translate(-50%, -50%)";
  if (value === zalvinPoints) {
    points.style.fontSize = "3em";
    points.style.transform = "translate(-100%, 0%)";
  }

  gameArea.appendChild(points);

  setTimeout(() => {
    points.style.opacity = "0";
    points.style.transform += " translateY(-65px)";
  }, 10);

  setTimeout(() => {
    points.remove();
  }, 800);
}

let swiperSpawned = 0;
let swiperSpawnInterval = (totalTime / totalSwiper) * 1000;
let spawnSwiper = setInterval(() => {
  createSwiper();
  swiperSpawned++;
  if (swiperSpawned === totalSwiper) {
    clearInterval(spawnSwiper);
  }
}, swiperSpawnInterval);

let bootsSpawned = 0;
let bootsSpawnInterval = (totalTime / totalBoots) * 1000;
let spawnBoots = setInterval(() => {
  createBoots();
  bootsSpawned++;
  if (bootsSpawned === totalBoots) {
    clearInterval(spawnBoots);
  }
}, bootsSpawnInterval);

let zalvinSpawned = 0;
let zalvinSpawnInterval = (totalTime / totalZalvin) * 1000;
let spawnZalvin = setInterval(() => {
  createZalvin();
  zalvinSpawned++;
  if (zalvinSpawned === totalZalvin) {
    clearInterval(spawnZalvin);
  }
}, zalvinSpawnInterval);

let gun = document.getElementById("gun");
let offsetX = 200;
document.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX;
  let gunPosition = mouseX + offsetX;
  gun.style.transform = `translateX(${gunPosition}px)`;
});

gameArea.addEventListener("mousedown", () => {
  let gunSound = new Audio("./assets/ak47_sound.webm");
  gunSound.play();
});

let timeLeft = totalTime;
setTimeout(() => {
  let timerCountdown = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerCountdown);
    }
  }, 1000);
}, 500);

let bgm = document.getElementById("bgm");
setTimeout(() => {
  showCongratulations();
  bgm.pause();
}, totalTime * 1000 + 5000);

function createHighScore(highScores, name) {
  highScores.push({ name: name, score: currentScore });
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function updateHighScores(highScores, name) {
  if (!highScores) {
    return false;
  }
  for (const highScore of highScores) {
    if (highScore.name === name) {
      if (currentScore > highScore.score) {
        highScore.score = currentScore;
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        return true;
      }
    }
  }
  return false;
}

let nameInput = document.getElementById("name-input");
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
function submitHighScore() {
  let playerName = nameInput.value;
  if (playerName) {
    let resFindSameName = updateHighScores(highScores, playerName);
    if (!resFindSameName) {
      if (highScores.length >= 5) {
        highScores.pop();
      }
      createHighScore(highScores, playerName);
    }
    window.location.href = "highscore.html";
  }
}

let submitBtn = document.getElementById("submit-btn");
nameInput.addEventListener("input", function () {
  submitBtn.disabled = nameInput.value.trim() === "";
});

function showCongratulations() {
  if (
    highScores.length >= 5 &&
    currentScore <= highScores[highScores.length - 1].score
  ) {
    submitBtn.style.display = "none";
  }
  document.getElementById("final-score").textContent = currentScore;
  document.getElementById("congratulations-modal").style.display = "flex";
}

function goToHome() {
  window.location.href = "index.html";
}
