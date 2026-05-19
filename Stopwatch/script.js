let hours = 0; // Menyimpan jumlah jam
let minutes = 0; // Menyimpan jumlah menit
let seconds = 0; // Menyimpan jumlah detik
let isRunning = false; // Menentukan status stopwatch (apakah sedang berjalan atau tidak)
let interval; // Variabel untuk menyimpan ID interval

const display = document.getElementById('display'); // Mengambil elemen untuk menampilkan waktu
const startButton = document.getElementById('start'); // Mengambil tombol untuk memulai stopwatch
const stopButton = document.getElementById('stop'); // Mengambil tombol untuk menghentikan stopwatch
const resetButton = document.getElementById('reset'); // Mengambil tombol untuk mereset stopwatch

function updateDisplay() { // Fungsi untuk memperbarui tampilan waktu
  let displayHours = hours < 10 ? '0' + hours : hours; // Menambahkan angka 0 di depan jam jika kurang dari 10
  let displayMinutes = minutes < 10 ? '0' + minutes : minutes; // Menambahkan angka 0 di depan menit jika kurang dari 10
  let displaySeconds = seconds < 10 ? '0' + seconds : seconds; // Menambahkan angka 0 di depan detik jika kurang dari 10
  display.innerText = `${displayHours}:${displayMinutes}:${displaySeconds}`; // Memperbarui elemen display dengan waktu yang diformat
}

function startStopwatch() { // Fungsi untuk memulai stopwatch
  if (!isRunning) { // Memeriksa apakah stopwatch tidak sedang berjalan
    isRunning = true; // Mengubah status menjadi berjalan
    interval = setInterval(() => { // Memulai interval untuk memperbarui waktu setiap detik
      seconds++; // Menambah detik
      if (seconds === 60) { // Memeriksa jika detik mencapai 60
        seconds = 0; // Mengatur detik kembali ke 0
        minutes++; // Menambah menit
        if (minutes === 60) { // Memeriksa jika menit mencapai 60
          minutes = 0; // Mengatur menit kembali ke 0
          hours++; // Menambah jam
        }
      }
      updateDisplay(); // Memperbarui tampilan setelah setiap detik
    }, 1000); // Interval 1000 ms (1 detik)
  }
}

function stopStopwatch() { // Fungsi untuk menghentikan stopwatch
  isRunning = false; // Mengubah status menjadi tidak berjalan
  clearInterval(interval); // Menghentikan interval yang berjalan
}

function resetStopwatch() { // Fungsi untuk mereset stopwatch
  isRunning = false; // Mengubah status menjadi tidak berjalan
  clearInterval(interval); // Menghentikan interval yang berjalan
  hours = 0; // Mengatur jam kembali ke 0
  minutes = 0; // Mengatur menit kembali ke 0
  seconds = 0; // Mengatur detik kembali ke 0
  updateDisplay(); // Memperbarui tampilan ke 00:00:00
}

// Menambahkan event listener untuk tombol-tombol
startButton.addEventListener('click', startStopwatch); // Menjalankan fungsi startStopwatch saat tombol start diklik
stopButton.addEventListener('click', stopStopwatch); // Menjalankan fungsi stopStopwatch saat tombol stop diklik
resetButton.addEventListener('click', resetStopwatch); // Menjalankan fungsi resetStopwatch saat tombol reset diklik

updateDisplay(); // Menginisialisasi tampilan ke 00:00:00
