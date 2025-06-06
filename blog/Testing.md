# Misteri Artefak Berdarah di Museum Sejarah Nusantara

Di suatu malam bergolak di Malang, lampu-lampu **Museum Sejarah Nusantara** berkedip misterius. Sebuah artefak emas kuno dilaporkan hilang dari ruang pameran. Desainnya menyerupai lukisan darah yang menetes dari masa silam, tetapi kali ini dalam bentuk **patung kecil**. Detektif Devin, sang pengamat ulung, dipanggil untuk mengurai jejaknya…

## Karakter

- **Detektif Devin** – Ahli observasi dan logika deduktif  
- **Kurator Ratna** – Penjaga koleksi artefak langka  
- **Satpam Iwan** – Terlihat biasa, tapi menyimpan sesuatu  

---

## Diagram Alir Proses Penyelidikan

<div class="mermaid">
graph TD
    A[Mulai Pengaduan] --> B{Pengumpulan Bukti};
    B -- Lengkap --> C[Wawancara Saksi];
    B -- Minim --> D[Back to CCTV Review];
    C --> E{Analisis Bukti};
    D --> E;
    E -- Kecocokan --> F[Identifikasi Tersangka];
    E -- Ambigu --> D;
    F --> G[Penangkapan];
    G --> H[Selesai Kasus];
</div>

**Catatan:**

- **CCTV** (Closed-Circuit Television): kamera pengawas tertutup untuk rekaman internal  
- **Analisis Bukti**: investigasi barang/data yang ditemukan  

---

## Diagram Sekuen Interaksi Karakter

<div class="mermaid">
sequenceDiagram
    DetectiveDevin->>KuratorRatna: Permintaan Daftar Artefak Terakhir
    KuratorRatna->>ArchiveSystem: Query Database Koleksi
    ArchiveSystem-->>KuratorRatna: Kirim Data Lokasi Patung
    KuratorRatna->>DetectiveDevin: Serahkan Laporan Pencurian
    DetectiveDevin->>SatpamIwan: Cek Rekaman Malam Ini
    SatpamIwan-->>DetectiveDevin: Temukan Gerak-gerik Mencurigakan
    DetectiveDevin->>LabForensik: Kirim Sampel Jejak
    LabForensik-->>DetectiveDevin: Hasil Sidik Jari Cocok
    DetectiveDevin->>PenegakHukum: Rekomendasi Penahanan
</div>

---

## Akhir Cerita Sementara...

Dengan hasil sidik jari yang mengarah ke satu nama: **Iwan**, sang satpam yang ternyata adalah bagian dari jaringan pencurian artefak lintas negara, Detektif Devin menutup kasus dengan satu kalimat legendaris:

> _“Sejarah mungkin diam, tapi jejaknya tak pernah berbohong.”_

---


Rumus terkenal Einstein:
$$E = mc^2$$

Atau:
\\[ \sum_{i=1}^{n} i = \frac{n(n+1)}{2} \\]


Persamaan kuadrat adalah \\( ax^2 + bx + c = 0 \\). Alternatifnya, \( x = \frac{-b \pm \sqrt{b^2-4ac}}{2a} \).