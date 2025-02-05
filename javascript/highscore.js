document.addEventListener("DOMContentLoaded", () => {
  const highscoreList = document.getElementById("highscore-list");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScores.forEach((score, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${score}`;
    highscoreList.appendChild(li);
  });
});

function goBack() {
  window.location.href = "index.html";
}
