document.addEventListener("DOMContentLoaded", () => {
  const highscoreList = document.getElementById("highscore-list");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScores.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} — ${entry.score}`;
    highscoreList.appendChild(li);
  });
});

function goBack() {
  window.location.href = "index.html";
}
