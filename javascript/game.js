let totalTime = 20; // set waktu per round di sini
let totalSwiper = Math.round(totalTime * 1.5); // jumlah Swiper yang muncul
let totalBoots = Math.round(totalSwiper / 2); // jumlah Boots yang muncul
let totalGoldSwiper = Math.round(totalSwiper / 5); // jumlah Boots yang muncul
let swiperPoints = 100; // poin yang didapat ketika menembak Swiper
let goldSwiperPoints = 500; // poin yang didapat ketika menembak Gold Swiper
let bootsPoints = -300; // poin yang didapat ketika menembak Boots
let score = document.getElementById("score");
let timer = document.getElementById("timer");
timer.textContent = totalTime;
let currentScore = 0;

function createTarget(targetType) {
  let target = document.createElement("img");
  let gameArea = document.getElementById("game-area");
  let gameAreaHeight = gameArea.offsetHeight - 150;

  target.style.position = "absolute";
  target.style.top = Math.random() * gameAreaHeight + "px";
  target.style.height = "150px";

  let transition = "";
  if (targetType === "swiper") {
    target.src = "assets/swiper1.png";
    target.alt = "Swiper";
    transition = "transform 5s ease-in-out";
    if (Math.random() > 0.7) {
      transition = "transform 2s linear";
    }
  } else if (targetType === "goldSwiper") {
    target.style.height = "300px";
    target.style.top = Math.random() * gameAreaHeight / 2 + "px";
    target.src = "assets/zalvin1.png";
    target.alt = "Zalvin";
    transition = "transform 2s ease-in-out";
  } else if (targetType === "boots") {
    target.src = "assets/boots1.webp";
    target.alt = "Boots";
    transition = "transform 1.7s linear";
  }

  let spawnSide = "left";
  if (Math.random() > 0.5) {
    spawnSide = "right";
    if (targetType === "swiper") {
      target.src = "assets/swiper1_flipped.png";
    } else if (targetType === "goldSwiper") {
      target.src = "assets/zalvin1_flipped.png";
    } else if (targetType === "boots") {
      target.src = "assets/boots1_flipped.webp";
    }
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
    if (targetType === "swiper") {
      target.src = "assets/swiper2.png";
      currentScore += swiperPoints;
    } else if (targetType === "goldSwiper") {
      target.src = "assets/zalvin2.png";
      target.style.height = "200vh";
      currentScore += goldSwiperPoints;
      let zalvinSound = new Audio("/assets/zalvin.mp3");
      zalvinSound.play();
    } else if (targetType === "boots") {
      target.src = "assets/boots2.png";
      currentScore += bootsPoints;
    }
    target.style.transform = currentPosition;
    target.style.transition = "opacity 1s ease-in";
    target.style.opacity = 0;
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
setTimeout(() => {
  let timerCountdown = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerCountdown);
    }
  }, 1000);
}, 500);

let swiperSpawned = 0;
let swiperSpawnInterval = (totalTime / totalSwiper) * 1000;
let spawnSwiper = setInterval(() => {
  createTarget("swiper");
  swiperSpawned++;
  if (swiperSpawned === totalSwiper) {
    clearInterval(spawnSwiper);
  }
}, swiperSpawnInterval);

let goldSwiperSpawned = 0;
let goldSwiperSpawnInterval = (totalTime / totalGoldSwiper) * 1000;
let spawnGoldSwiper = setInterval(() => {
  createTarget("goldSwiper");
  goldSwiperSpawned++;
  if (goldSwiperSpawned === totalGoldSwiper) {
    clearInterval(spawnGoldSwiper);
  }
}, goldSwiperSpawnInterval);

let bootsSpawned = 0;
let bootsSpawnInterval = (totalTime / totalBoots) * 1000;
let spawnBoots = setInterval(() => {
  createTarget("boots");
  bootsSpawned++;
  if (bootsSpawned === totalBoots) {
    clearInterval(spawnBoots);
  }
}, bootsSpawnInterval);

let gameArea = document.getElementById("game-area");
gameArea.addEventListener("mousedown", () => {
  let gunSound = new Audio("/assets/ak47_sound.webm");
  gunSound.play();
});

const gun = document.getElementById("gun");
const offsetX = 200;
document.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX;
  let gunPosition = mouseX + offsetX;
  gun.style.transform = `translateX(${gunPosition}px)`;
});

function showCongratulations() {
  document.getElementById("final-score").textContent = currentScore;
  document.getElementById("congratulations-modal").style.display = "flex";
}

function closeModal() {
  // document.getElementById("congratulations-modal").style.display = "none";
  window.location.href = "home.html";
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
  window.location.href = "home.html";
}
