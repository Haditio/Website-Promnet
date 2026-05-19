const questions = [ // Array untuk menyimpan pertanyaan dan jawaban
  {
      question: "Apa singkatan dari HTML?", // Pertanyaan pertama
      answers: [ // Daftar jawaban untuk pertanyaan pertama
          { text: "Hyper Text Markup Language", correct: true }, // Jawaban benar
          { text: "Home Tool Markup Language", correct: false }, // Jawaban salah
          { text: "Hyperlinks and Text Markup Language", correct: false }, // Jawaban salah
          { text: "Hyper Tool Markup Language", correct: false } // Jawaban salah
      ]
  },
  {
      question: "Sintaks yang benar untuk menyertakan script eksternal di JavaScript adalah?", // Pertanyaan kedua
      answers: [ // Daftar jawaban untuk pertanyaan kedua
          { text: "<script href='script.js'>", correct: false }, // Jawaban salah
          { text: "<script src='script.js'>", correct: true }, // Jawaban benar
          { text: "<script name='script.js'>", correct: false }, // Jawaban salah
          { text: "<script link='script.js'>", correct: false } // Jawaban salah
      ]
  },
  {
      question: "Properti CSS yang digunakan untuk mengubah warna latar belakang adalah?", // Pertanyaan ketiga
      answers: [ // Daftar jawaban untuk pertanyaan ketiga
          { text: "background-color", correct: true }, // Jawaban benar
          { text: "color", correct: false }, // Jawaban salah
          { text: "bgcolor", correct: false }, // Jawaban salah
          { text: "background", correct: false } // Jawaban salah
      ]
  },
  {
      question: "Di dalam elemen HTML mana kita menaruh JavaScript?", // Pertanyaan keempat
      answers: [ // Daftar jawaban untuk pertanyaan keempat
          { text: "<js>", correct: false }, // Jawaban salah
          { text: "<script>", correct: true }, // Jawaban benar
          { text: "<javascript>", correct: false }, // Jawaban salah
          { text: "<code>", correct: false } // Jawaban salah
      ]
  },
  {
      question: "Bagaimana cara membuat komentar di CSS?", // Pertanyaan kelima
      answers: [ // Daftar jawaban untuk pertanyaan kelima
          { text: "// Ini adalah komentar", correct: false }, // Jawaban salah
          { text: "<!-- Ini adalah komentar -->", correct: false }, // Jawaban salah
          { text: "/* Ini adalah komentar */", correct: true }, // Jawaban benar
          { text: "# Ini adalah komentar", correct: false } // Jawaban salah
      ]
  }
];

let currentQuestionIndex = 0; // Indeks untuk menyimpan pertanyaan saat ini
let correctAnswers = 0; // Variabel untuk menghitung jumlah jawaban benar
let selectedAnswers = []; // Array untuk menyimpan jawaban yang dipilih

const startButton = document.getElementById("start-btn"); // Mengambil elemen tombol mulai
const questionContainer = document.getElementById("question-container"); // Mengambil kontainer pertanyaan
const questionElement = document.getElementById("question"); // Mengambil elemen untuk menampilkan pertanyaan
const answerButtons = document.getElementById("answer-buttons"); // Mengambil kontainer untuk tombol jawaban
const backButton = document.getElementById("back-btn"); // Mengambil elemen tombol kembali
const nextButton = document.getElementById("next-btn"); // Mengambil elemen tombol berikutnya
const restartButton = document.getElementById("restart-btn"); // Mengambil elemen tombol mulai ulang
const resultContainer = document.getElementById("result-container"); // Mengambil kontainer untuk menampilkan hasil
const navigation = document.querySelector(".navigation"); // Mengambil elemen navigasi
const reviewContainer = document.getElementById("review-container"); // Mengambil kontainer untuk meninjau jawaban
const reviewQuestions = document.getElementById("review-questions"); // Mengambil kontainer untuk menampilkan pertanyaan yang ditinjau

function startQuiz() { // Fungsi untuk memulai kuis
  startButton.style.display = "none"; // Menyembunyikan tombol mulai
  questionContainer.style.display = "block"; // Menampilkan kontainer pertanyaan
  navigation.style.display = "flex"; // Menampilkan navigasi
  currentQuestionIndex = 0; // Mengatur indeks pertanyaan saat ini ke 0
  correctAnswers = 0; // Mengatur jumlah jawaban benar ke 0
  selectedAnswers = []; // Mengatur array jawaban yang dipilih kosong
  nextButton.style.display = "none"; // Menyembunyikan tombol berikutnya
  backButton.style.display = "none"; // Menyembunyikan tombol kembali
  resultContainer.textContent = ""; // Mengosongkan kontainer hasil
  reviewContainer.style.display = "none"; // Menyembunyikan kontainer tinjauan
  restartButton.style.display = "none"; // Menyembunyikan tombol mulai ulang
  showQuestion(); // Menampilkan pertanyaan pertama
}

function showQuestion() { // Fungsi untuk menampilkan pertanyaan saat ini
  resetState(); // Mengatur ulang state tombol
  const currentQuestion = questions[currentQuestionIndex]; // Mengambil pertanyaan saat ini
  questionElement.textContent = currentQuestion.question; // Menampilkan teks pertanyaan
  currentQuestion.answers.forEach(answer => { // Mengiterasi jawaban yang ada
      const button = document.createElement("button"); // Membuat tombol untuk jawaban
      button.textContent = answer.text; // Mengatur teks tombol
      button.classList.add("btn"); // Menambahkan kelas btn untuk styling
      button.addEventListener("click", () => selectAnswer(button, answer)); // Menambahkan event listener untuk memilih jawaban
      answerButtons.appendChild(button); // Menambahkan tombol ke kontainer jawaban
  });
  backButton.style.display = currentQuestionIndex > 0 ? "inline-block" : "none"; // Menampilkan tombol kembali jika bukan pertanyaan pertama
}

function resetState() { // Fungsi untuk mengatur ulang state tombol
  nextButton.style.display = "none"; // Menyembunyikan tombol berikutnya
  while (answerButtons.firstChild) { // Menghapus semua tombol jawaban yang ada
      answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(selectedButton, answer) { // Fungsi untuk memilih jawaban
  Array.from(answerButtons.children).forEach(button => { // Menghapus kelas selected dari semua tombol jawaban
      button.classList.remove("selected");
  });
  selectedButton.classList.add("selected"); // Menambahkan kelas selected ke tombol yang dipilih
  selectedAnswers[currentQuestionIndex] = answer; // Menyimpan jawaban yang dipilih
  if (currentQuestionIndex < questions.length - 1) { // Jika bukan pertanyaan terakhir
      nextButton.style.display = "inline-block"; // Menampilkan tombol berikutnya
  } else {
      showResult(); // Menampilkan hasil jika sudah di pertanyaan terakhir
  }
}

function showResult() { // Fungsi untuk menampilkan hasil kuis
  correctAnswers = selectedAnswers.filter((answer, index) => answer?.correct).length; // Menghitung jumlah jawaban benar
  questionContainer.style.display = "none"; // Menyembunyikan kontainer pertanyaan
  navigation.style.display = "none"; // Menyembunyikan navigasi
  resultContainer.textContent = `Anda menjawab benar ${correctAnswers} dari ${questions.length} soal!`; // Menampilkan hasil
  restartButton.style.display = "inline-block"; // Menampilkan tombol mulai ulang
  reviewAnswers(); // Menampilkan tinjauan jawaban
}

function reviewAnswers() { // Fungsi untuk meninjau jawaban yang dipilih
  reviewContainer.style.display = "block"; // Menampilkan kontainer tinjauan
  reviewQuestions.innerHTML = ""; // Mengosongkan kontainer untuk pertanyaan yang ditinjau
  questions.forEach((question, index) => { // Mengiterasi semua pertanyaan
      const questionElement = document.createElement("div"); // Membuat elemen untuk pertanyaan
      questionElement.classList.add("review-question"); // Menambahkan kelas untuk styling
      questionElement.innerHTML = `<p><strong>${question.question}</strong></p>`; // Menampilkan pertanyaan
      
      question.answers.forEach(answer => { // Mengiterasi semua jawaban untuk pertanyaan ini
          const answerElement = document.createElement("div"); // Membuat elemen untuk jawaban
          answerElement.textContent = answer.text; // Mengatur teks jawaban
          answerElement.style.marginLeft = "20px"; // Mengatur margin kiri
          if (answer.correct) answerElement.style.color = "green";  // Jawaban benar ditampilkan dalam warna hijau
          if (selectedAnswers[index]?.text === answer.text && !answer.correct) answerElement.style.color = "red";  // Jawaban salah yang dipilih ditampilkan dalam warna merah
          questionElement.appendChild(answerElement); // Menambahkan elemen jawaban ke kontainer pertanyaan
      });
      reviewQuestions.appendChild(questionElement); // Menambahkan pertanyaan yang ditinjau ke kontainer tinjauan
  });
}

nextButton.addEventListener("click", () => { // Event listener untuk tombol berikutnya
  currentQuestionIndex++; // Mengubah indeks pertanyaan saat ini
  showQuestion(); // Menampilkan pertanyaan berikutnya
});

backButton.addEventListener("click", () => { // Event listener untuk tombol kembali
  if (currentQuestionIndex > 0) { // Jika indeks lebih dari 0
      currentQuestionIndex--; // Mengurangi indeks pertanyaan saat ini
      showQuestion(); // Menampilkan pertanyaan sebelumnya
  }
});

restartButton.addEventListener("click", startQuiz); // Event listener untuk tombol mulai ulang
startButton.addEventListener("click", startQuiz); // Event listener untuk tombol mulai
