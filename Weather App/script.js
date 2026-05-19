// Menggunakan API Key yang diberikan
const apiKey = "4676450f9c474366af932043242610"; // API key untuk mengakses Weather API

function getWeather() { // Fungsi untuk mendapatkan data cuaca berdasarkan nama kota
    const kota = document.getElementById("cityInput").value; // Mengambil nilai input nama kota
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${kota}&aqi=no`; // URL untuk mengambil data cuaca

    fetch(apiUrl) // Mengambil data dari API
        .then(response => { // Menangani respon dari fetch
            if (!response.ok) { // Memeriksa apakah respon tidak berhasil
                throw new Error("Kota tidak ditemukan"); // Mengeluarkan pesan kesalahan jika kota tidak ditemukan
            }
            return response.json(); // Mengonversi respon menjadi format JSON
        })
        .then(data => { // Menangani data yang diterima
            tampilkanCuaca(data); // Memanggil fungsi untuk menampilkan informasi cuaca
        })
        .catch(error => { // Menangani kesalahan yang mungkin terjadi
            document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`; // Menampilkan pesan kesalahan
        });
}

function tampilkanCuaca(data) { // Fungsi untuk menampilkan data cuaca
    const { location, current } = data; // Mengambil data lokasi dan cuaca saat ini

    // Terjemahan lengkap untuk kondisi cuaca
    const kondisiCuaca = { // Objek yang berisi kondisi cuaca dan terjemahannya
        "Sunny": "Cerah",
        "Rain": "Hujan",
        "Clear": "Cerah",
        "Partly cloudy": "Sebagian Berawan",
        "Cloudy": "Berawan",
        "Overcast": "Mendung",
        "Mist": "Berkabut",
        "Patchy rain possible": "Kemungkinan Hujan Rintik",
        "Patchy snow possible": "Kemungkinan Salju Rintik",
        "Patchy sleet possible": "Kemungkinan Hujan Es Rintik",
        "Patchy freezing drizzle possible": "Kemungkinan Gerimis Beku",
        "Thundery outbreaks possible": "Kemungkinan Badai Petir",
        "Blowing snow": "Hembusan Salju",
        "Blizzard": "Badai Salju",
        "Fog": "Kabut",
        "Freezing fog": "Kabut Beku",
        "Patchy light drizzle": "Gerimis Ringan",
        "Light drizzle": "Gerimis Ringan",
        "Freezing drizzle": "Gerimis Beku",
        "Heavy freezing drizzle": "Gerimis Beku Lebat",
        "Patchy light rain": "Hujan Ringan Rintik",
        "Light rain": "Hujan Ringan",
        "Moderate rain at times": "Hujan Sedang Berkala",
        "Moderate rain": "Hujan Sedang",
        "Heavy rain at times": "Hujan Lebat Berkala",
        "Heavy rain": "Hujan Lebat",
        "Light freezing rain": "Hujan Beku Ringan",
        "Moderate or heavy freezing rain": "Hujan Beku Sedang atau Lebat",
        "Light sleet": "Hujan Es Ringan",
        "Moderate or heavy sleet": "Hujan Es Sedang atau Lebat",
        "Patchy light snow": "Salju Ringan Rintik",
        "Light snow": "Salju Ringan",
        "Patchy moderate snow": "Salju Sedang Rintik",
        "Moderate snow": "Salju Sedang",
        "Patchy heavy snow": "Salju Lebat Rintik",
        "Heavy snow": "Salju Lebat",
        "Ice pellets": "Butiran Es",
        "Light rain shower": "Hujan Ringan Singkat",
        "Moderate or heavy rain shower": "Hujan Sedang atau Lebat Singkat",
        "Torrential rain shower": "Hujan Lebat Deras",
        "Light sleet showers": "Hujan Es Ringan Singkat",
        "Moderate or heavy sleet showers": "Hujan Es Sedang atau Lebat Singkat",
        "Light snow showers": "Salju Ringan Singkat",
        "Moderate or heavy snow showers": "Salju Sedang atau Lebat Singkat",
        "Light showers of ice pellets": "Butiran Es Ringan Singkat",
        "Moderate or heavy showers of ice pellets": "Butiran Es Sedang atau Lebat Singkat",
        "Patchy light rain with thunder": "Hujan Ringan Rintik dengan Petir",
        "Moderate or heavy rain with thunder": "Hujan Sedang atau Lebat dengan Petir",
        "Patchy light snow with thunder": "Salju Ringan Rintik dengan Petir",
        "Moderate or heavy snow with thunder": "Salju Sedang atau Lebat dengan Petir",
        "Patchy rain nearby": "Hujan Rintik Terdekat"
    };

    const kondisiText = kondisiCuaca[current.condition.text] || current.condition.text; // Mengambil terjemahan kondisi cuaca

    const informasiCuaca = ` <!-- Template untuk informasi cuaca yang ditampilkan -->
        <h2>${location.name}, ${location.country}</h2> <!-- Menampilkan nama kota dan negara -->
        <div id="jamTanggal"></div> <!-- Tempat untuk menampilkan jam dan tanggal -->
        <img src="https:${current.condition.icon}" alt="${kondisiText}"> <!-- Menampilkan ikon cuaca -->
        <p>Suhu: ${current.temp_c}°C</p> <!-- Menampilkan suhu saat ini -->
        <p>Terasa seperti: ${current.feelslike_c}°C</p> <!-- Menampilkan suhu yang terasa -->
        <p>Kondisi: ${kondisiText}</p> <!-- Menampilkan kondisi cuaca dalam bahasa Indonesia -->
        <p>Kelembapan: ${current.humidity}%</p> <!-- Menampilkan kelembapan -->
        <p>Kecepatan Angin: ${current.wind_kph} km/jam</p> <!-- Menampilkan kecepatan angin -->
        <p>Tekanan: ${current.pressure_mb} mb</p> <!-- Menampilkan tekanan udara -->
    `;

    document.getElementById("weatherResult").innerHTML = informasiCuaca; // Menampilkan informasi cuaca di elemen HTML
}

// Fungsi untuk menampilkan tanggal dan jam sesuai dengan zona waktu kota yang dicek
function tampilkanJamTanggal(zonaWaktu) { // Mengambil zona waktu untuk menampilkan jam dan tanggal
    const waktuSekarang = new Date(); // Mengambil waktu sekarang

    // Format tanggal
    const tanggalString = waktuSekarang.toLocaleDateString("id-ID", { // Mengonversi tanggal ke format Indonesia
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // Mengambil waktu berdasarkan zona waktu kota
    const opsiWaktu = { timeZone: zonaWaktu, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }; // Opsi untuk format waktu
    const jamFormat = new Intl.DateTimeFormat('id-ID', opsiWaktu).format(waktuSekarang); // Format waktu sesuai dengan zona waktu

    // Menampilkan hasil ke dalam elemen HTML
    const jamTanggalInfo = ` <!-- Template untuk jam dan tanggal -->
        <p>Tanggal: ${tanggalString}</p> <!-- Menampilkan tanggal -->
        <p>Jam: ${jamFormat}</p> <!-- Menampilkan jam -->
    `;
    document.getElementById("jamTanggal").innerHTML = jamTanggalInfo; // Menampilkan jam dan tanggal di elemen HTML
}

// Memanggil fungsi tampilkanJamTanggal setiap detik untuk memperbarui waktu
setInterval(() => { // Menjalankan kode secara berkala
    const kota = document.getElementById("cityInput").value; // Mengambil nama kota dari input
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${kota}&aqi=no`; // URL untuk mengambil data cuaca
    
    fetch(apiUrl) // Mengambil data dari API
        .then(response => response.json()) // Mengonversi respon menjadi format JSON
        .then(data => tampilkanJamTanggal(data.location.tz_id)); // Memanggil fungsi untuk menampilkan jam dan tanggal
}, 1000); // Mengatur interval setiap 1000 ms (1 detik)
