document.addEventListener("DOMContentLoaded", () => {
  const highscoreList = document.getElementById("highscore-list");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScores.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} — ${entry.score}`;
    li.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.2}s forwards`;
    li.style.opacity = "0"; // Awalnya disembunyikan sebelum animasi
    highscoreList.appendChild(li);
  });
});

function goBack() {
  window.location.href = "index.html";
}
