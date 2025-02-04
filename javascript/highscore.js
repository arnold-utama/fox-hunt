const highscoresList = document.getElementById('highscores-list');
const scoreInput = document.getElementById('score-input');
const addScoreButton = document.getElementById('add-score-button');

// Array untuk menyimpan highscores
let highscores = [];

// Fungsi untuk menampilkan highscores
function displayHighscores() {
  // Kosongkan daftar highscores
  highscoresList.innerHTML = '';

  // Urutkan highscores dari tertinggi ke terendah
  highscores.sort((a, b) => b - a);

  // Tampilkan hanya 5 skor tertinggi
  highscores.slice(0, 5).forEach((score, index) => {
    const scoreItem = document.createElement('div');
    scoreItem.innerText = `${index + 1}. ${score}`;
    highscoresList.appendChild(scoreItem);
  });
}

// Fungsi untuk menambahkan skor baru
function addHighscore(newScore) {
  if (newScore && !isNaN(newScore)) { // Pastikan input adalah angka
    highscores.push(Number(newScore));
    displayHighscores(); // Perbarui tampilan highscores
    scoreInput.value = ''; // Kosongkan input
  } else {
    alert('Masukkan skor yang valid!');
  }
}

// Tambahkan skor saat tombol diklik
addScoreButton.addEventListener('click', () => {
  addHighscore(scoreInput.value);
});

// Tampilkan highscores saat halaman dimuat
displayHighscores();