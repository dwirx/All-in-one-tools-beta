# Analisis Performa Algoritma Klasifikasi Gambar Menggunakan Deep Learning

**Tanggal Penelitian**: 8 Mei 2025
**Peneliti Utama**: Dr. Virtual Assistant

## Abstrak

Penelitian ini bertujuan untuk menganalisis dan membandingkan performa beberapa algoritma klasifikasi gambar berbasis deep learning, yaitu Convolutional Neural Network (CNN) model A, model B, dan model C. Metrik evaluasi yang digunakan meliputi akurasi, presisi, recall, dan F1-score. Dataset yang digunakan adalah ImageNette yang terdiri dari 10 kelas gambar. Hasil penelitian menunjukkan bahwa model C mencapai performa terbaik dengan akurasi \\(92.5\%\\).

## 1. Pendahuluan

Klasifikasi gambar merupakan salah satu tugas fundamental dalam bidang visi komputer. Dengan kemajuan deep learning, berbagai arsitektur jaringan saraf tiruan telah menunjukkan hasil yang sangat menjanjikan. Persamaan dasar untuk fungsi aktivasi sigmoid yang sering digunakan adalah:
$$ \sigma(x) = \frac{1}{1 + e^{-x}} $$
Penelitian ini berfokus pada perbandingan tiga model CNN yang dimodifikasi untuk tugas klasifikasi pada dataset ImageNette.

## 2. Metodologi Penelitian

Metodologi penelitian yang digunakan dapat diringkas dalam diagram alir berikut:

<div class="mermaid">
graph TD
    A[Pengumpulan Data <br/> (ImageNette)] --> B(Preprocessing Data <br/> - Augmentasi <br/> - Normalisasi);
    B --> C{Pembagian Data <br/> (Train, Val, Test)};
    C --> D[Pelatihan Model A];
    C --> E[Pelatihan Model B];
    C --> F[Pelatihan Model C];
    D --> G(Evaluasi Model A);
    E --> G;
    F --> G;
    G --> H[Analisis Hasil & Perbandingan];
    H --> I[Kesimpulan];
</div>

### 2.1. Dataset
Dataset yang digunakan adalah ImageNette, sebuah subset dari ImageNet yang lebih kecil dan lebih mudah dikelola. Dataset ini terdiri dari 10 kelas yang mudah dibedakan, seperti 'tench', 'English springer', 'cassette player', dll.

### 2.2. Model Arsitektur
Ketiga model (A, B, C) merupakan varian dari arsitektur ResNet, dengan perbedaan pada jumlah layer dan penggunaan teknik regularisasi seperti dropout. Peluang dropout \\(p\\) diatur berbeda untuk setiap model.

### 2.3. Metrik Evaluasi
Metrik evaluasi yang digunakan adalah:
1.  **Akurasi**: Fraksi prediksi yang benar.
    $$ \text{Akurasi} = \frac{\text{TP} + \text{TN}}{\text{TP} + \text{TN} + \text{FP} + \text{FN}} $$
2.  **Presisi**: Dari semua yang diprediksi positif, berapa banyak yang benar-benar positif.
    $$ \text{Presisi} = \frac{\text{TP}}{\text{TP} + \text{FP}} $$
3.  **Recall (Sensitivity)**: Dari semua yang aktualnya positif, berapa banyak yang berhasil diprediksi positif.
    $$ \text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}} $$
4.  **F1-Score**: Rata-rata harmonik dari presisi dan recall.
    $$ F_1 = 2 \cdot \frac{\text{Presisi} \cdot \text{Recall}}{\text{Presisi} + \text{Recall}} $$

Dimana:
* \\( \text{TP} \\) = True Positive
* \\( \text{TN} \\) = True Negative
* \\( \text{FP} \\) = False Positive
* \\( \text{FN} \\) = False Negative

## 3. Hasil dan Pembahasan

Berikut adalah tabel ringkasan hasil performa dari ketiga model:

| Model   | Akurasi | Presisi | Recall | F1-Score |
| :------ | :------ | :------ | :----- | :------- |
| Model A | 88.2%   | 0.885   | 0.882  | 0.883    |
| Model B | 90.1%   | 0.903   | 0.901  | 0.902    |
| **Model C** | **92.5%** | **0.926** | **0.925** | **0.925** |

Dari tabel di atas, terlihat bahwa Model C menunjukkan performa terbaik di semua metrik evaluasi. Peningkatan ini kemungkinan disebabkan oleh kedalaman arsitektur yang lebih optimal dan penggunaan dropout pada layer yang tepat dengan nilai \\( p = 0.3 \\).

Distribusi error untuk setiap kelas juga dianalisis. Misalkan \\( \mathcal{L} \\) adalah fungsi loss (kerugian) yang digunakan, seperti cross-entropy:
$$ \mathcal{L}(y, \hat{y}) = - \sum_{i} y_i \log(\hat{y}_i) $$
dimana \\( y \\) adalah label sebenarnya (one-hot encoded) dan \\( \hat{y} \\) adalah probabilitas prediksi.

## 4. Alur Kerja Eksperimen Detail

Diagram sekuen berikut menjelaskan alur interaksi selama proses eksperimen.

<div class="mermaid">
sequenceDiagram
    participant User as Pengguna
    participant System as Sistem Penelitian
    participant ModelA as Model A
    participant ModelB as Model B
    participant ModelC as Model C

    User->>System: Mulai Eksperimen
    activate System
    System->>System: Muat & Preprocessing Data
    System->>ModelA: Latih dengan Data Training
    activate ModelA
    ModelA-->>System: Model Terlatih A
    deactivate ModelA
    System->>ModelB: Latih dengan Data Training
    activate ModelB
    ModelB-->>System: Model Terlatih B
    deactivate ModelB
    System->>ModelC: Latih dengan Data Training
    activate ModelC
    ModelC-->>System: Model Terlatih C
    deactivate ModelC
    System->>System: Evaluasi semua model dengan Data Test
    System-->>User: Kirim Hasil Perbandingan
    deactivate System
</div>

## 5. Kesimpulan

Berdasarkan analisis yang telah dilakukan, Model C dengan arsitektur ResNet yang lebih dalam dan konfigurasi dropout \\( p = 0.3 \\) menunjukkan superioritas dalam tugas klasifikasi gambar pada dataset ImageNette. Akurasi yang dicapai adalah \\(92.5\%\\), dengan F1-Score \\(0.925\\). Penelitian selanjutnya dapat mengeksplorasi teknik augmentasi data yang lebih canggih atau arsitektur transformer untuk visi.

## Referensi

1.  He, K., Zhang, X., Ren, S., & Sun, J. (2016). Deep residual learning for image recognition. *Proceedings of the IEEE conference on computer vision and pattern recognition*.
2.  Howard, J. (2018). The ImageNette Dataset. *fast.ai*.

---

**Catatan Tambahan**:
Integral sederhana: \\( \int x^2 dx = \frac{x^3}{3} + C \\)

## 4. Alur Kerja Eksperimen Detail

Diagram sekuen berikut menjelaskan alur interaksi selama proses eksperimen.

<div class="mermaid">
sequenceDiagram
    participant User as Pengguna
    participant System as Sistem Penelitian
    participant ModelA as Model A
    participant ModelB as Model B
    participant ModelC as Model C

    User->>System: Mulai Eksperimen
    activate System
    System->>System: Muat & Preprocessing Data
    System->>ModelA: Latih dengan Data Training
    activate ModelA
    ModelA-->>System: Model Terlatih A
    deactivate ModelA
    System->>ModelB: Latih dengan Data Training
    activate ModelB
    ModelB-->>System: Model Terlatih B
    deactivate ModelB
    System->>ModelC: Latih dengan Data Training
    activate ModelC
    ModelC-->>System: Model Terlatih C
    deactivate ModelC
    System->>System: Evaluasi semua model dengan Data Test
    System-->>User: Kirim Hasil Perbandingan
    deactivate System
</div><