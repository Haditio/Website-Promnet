document.getElementById('calculateBtn').addEventListener('click', function() { // Menambahkan event listener untuk tombol hitung usia
    const birthdateInput = document.getElementById('birthdate').value; // Mengambil nilai dari input tanggal lahir
    if (!birthdateInput) { // Memeriksa apakah input tanggal lahir kosong
        alert('Silakan masukkan tanggal lahir!'); // Menampilkan peringatan jika tanggal lahir tidak diisi
        return; // Menghentikan eksekusi jika tanggal lahir tidak ada
    }

    const birthdate = new Date(birthdateInput); // Mengonversi input tanggal lahir menjadi objek Date
    const today = new Date(); // Mengambil tanggal hari ini
    let age = today.getFullYear() - birthdate.getFullYear(); // Menghitung usia berdasarkan tahun
    const monthDifference = today.getMonth() - birthdate.getMonth(); // Menghitung selisih bulan antara hari ini dan tanggal lahir

    // Mengurangi usia jika bulan saat ini lebih awal dari bulan lahir
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
        age--; // Mengurangi usia jika perlu
    }

    document.getElementById('result').innerText = `Usia Anda adalah ${age} tahun.`; // Menampilkan hasil perhitungan usia
});
