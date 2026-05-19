function appendCharacter(character) { // Fungsi untuk menambahkan karakter ke tampilan kalkulator
    document.getElementById('display').value += character; // Menambahkan karakter ke nilai input tampilan
}

function clearDisplay() { // Fungsi untuk membersihkan tampilan kalkulator
    document.getElementById('display').value = ''; // Mengatur nilai input tampilan menjadi kosong
}

function deleteLast() { // Fungsi untuk menghapus karakter terakhir dari tampilan kalkulator
    let display = document.getElementById('display').value; // Mengambil nilai input tampilan saat ini
    document.getElementById('display').value = display.slice(0, -1); // Menghapus karakter terakhir dari nilai input tampilan
}

function calculate() { // Fungsi untuk menghitung hasil dari ekspresi yang dimasukkan
    let expression = document.getElementById('display').value; // Mengambil nilai input tampilan
    try {
        let result = eval(expression); // Menghitung hasil dari ekspresi menggunakan eval
        document.getElementById('display').value = result; // Menampilkan hasil di tampilan kalkulator
    } catch (error) { // Menangani kesalahan jika ekspresi tidak valid
        document.getElementById('display').value = 'Error'; // Menampilkan pesan kesalahan di tampilan kalkulator
    }
}
