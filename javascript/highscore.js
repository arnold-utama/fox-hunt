document.addEventListener("DOMContentLoaded", () => {
  const highscoreList = document.getElementById("highscore-list");
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Urutkan skor dari tertinggi ke terendah
  highScores.sort((a, b) => b.score - a.score);

  // Ambil hanya 5 skor tertinggi
  highScores = highScores.slice(0, 5);

  // Tambahkan skor ke dalam daftar
  highScores.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
    highscoreList.appendChild(li);
  });
});

// Fungsi untuk kembali ke halaman utama
function goBack() {
  window.location.href = "index.html";
}
