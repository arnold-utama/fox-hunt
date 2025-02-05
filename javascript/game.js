let totalTime = 20; // set waktu per round di sini
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

    setTimeout(() => {
      jumpscare.remove();
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

function showCongratulations() {
  document.getElementById("final-score").textContent = currentScore;
  document.getElementById("congratulations-modal").style.display = "flex";
}

function closeModal() {
  // document.getElementById("congratulations-modal").style.display = "none";
  window.location.href = "index.html";
}

let bgm = document.getElementById("bgm");
setTimeout(() => {
  showCongratulations();
  bgm.pause();
}, totalTime * 1000 + 5000);

function updateHighScores(newScore) {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push(newScore);
  highScores.sort((a, b) => b - a);
  highScores = highScores.slice(0, 5); // Simpan hanya 5 skor tertinggi
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function closeModal() {
  updateHighScores(currentScore); // Simpan skor saat menutup modal
  window.location.href = "highscore.html"; // Arahkan ke halaman high score
}

function goToHome() {
  window.location.href = "index.html";
}
