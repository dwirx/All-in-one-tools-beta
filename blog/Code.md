# Belajar JavaScript: Pengantar dan Contoh Kode

**Tanggal Publikasi**: 27 April 2024  
**Penulis**: Codepedia

---

JavaScript adalah bahasa pemrograman yang sangat populer dan digunakan terutama untuk pengembangan web. Dengan JavaScript, Anda dapat membuat halaman web menjadi interaktif, dinamis, dan responsif. Artikel ini akan memberikan pengantar singkat tentang JavaScript serta contoh kode dasar yang bisa langsung Anda coba.

## Apa itu JavaScript?

JavaScript adalah bahasa scripting yang berjalan di browser maupun di sisi server (dengan Node.js). JavaScript memungkinkan manipulasi elemen HTML, pengelolaan event, hingga pembuatan aplikasi web lengkap.

### Kelebihan JavaScript:

- Berjalan di semua browser modern  
- Mudah dipelajari dan digunakan  
- Mendukung paradigma pemrograman berorientasi objek dan fungsional  
- Memiliki ekosistem besar dengan banyak library dan framework

## Struktur Dasar JavaScript

JavaScript berjalan di dalam tag `<script>` pada HTML, atau dalam file terpisah dengan ekstensi `.js`.

Contoh kode JavaScript sederhana untuk menampilkan pesan di konsol:

```javascript
console.log("Halo, dunia!");
```

## Contoh Kode JavaScript: Menghitung Luas Lingkaran

Misalkan kita ingin membuat fungsi untuk menghitung luas lingkaran, rumusnya adalah:

$$
L = \pi r^2
$$

Dalam JavaScript, kita bisa membuat fungsi seperti berikut:

```javascript
function hitungLuasLingkaran(radius) {
    const pi = Math.PI;
    const luas = pi * radius * radius;
    return luas;
}

// Contoh penggunaan
const jariJari = 7;
const luasLingkaran = hitungLuasLingkaran(jariJari);
console.log("Luas lingkaran dengan jari-jari " + jariJari + " adalah " + luasLingkaran.toFixed(2));
```

Kode di atas mendefinisikan fungsi `hitungLuasLingkaran` yang menerima parameter `radius` dan mengembalikan luas lingkaran. Fungsi ini menggunakan konstanta `Math.PI` untuk nilai π.

## Contoh Interaksi dengan User: Input dan Output

Kita juga bisa membuat JavaScript yang meminta input dari user dan menampilkan hasilnya.

```javascript
// Meminta input jari-jari dari user
const inputRadius = prompt("Masukkan jari-jari lingkaran:");

// Konversi input ke angka
const radius = parseFloat(inputRadius);

if (isNaN(radius) || radius <= 0) {
    alert("Input tidak valid! Masukkan angka positif.");
} else {
    const luas = Math.PI * radius * radius;
    alert("Luas lingkaran dengan jari-jari " + radius + " adalah " + luas.toFixed(2));
}
```

Kode ini menggunakan `prompt` untuk menerima input, `parseFloat` untuk mengubah string menjadi angka desimal, dan `alert` untuk menampilkan hasil.

## Diagram Alir Logika Program Menghitung Luas Lingkaran

<div class="mermaid">
graph TD
    A[Mulai] --> B[Input jari-jari]
    B --> C{Apakah input valid?}
    C -- Tidak --> D[Tampilkan error]
    C -- Ya --> E[Hitung luas]
    E --> F[Tampilkan hasil]
    F --> G[Selesai]
</div>

## Kesimpulan

JavaScript adalah bahasa yang sangat berguna untuk membuat halaman web interaktif. Dengan memahami dasar-dasar seperti fungsi, variabel, input/output, dan operasi matematika, Anda sudah bisa mulai membuat program sederhana seperti menghitung luas lingkaran.

Mulailah bereksperimen dengan kode-kode sederhana, lalu kembangkan ke konsep yang lebih kompleks seperti manipulasi DOM, event handling, dan penggunaan library populer.

---

**Referensi:**  
- MDN Web Docs - [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)  
- Eloquent JavaScript, Marijn Haverbeke  
- W3Schools - [JavaScript Tutorial](https://www.w3schools.com/js/)