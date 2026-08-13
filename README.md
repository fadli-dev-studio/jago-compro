# JagoCompro - Corporate Landing Page

![JagoCompro](/static/KV.webp)

**JagoCompro** adalah platform *One Stop Solution* profesional untuk kebutuhan branding dan legalitas bisnis modern. Menyediakan layanan terintegrasi mulai dari perancangan **Company Profile** (mewah & orisinal), pengurusan **Legalitas Perusahaan (PT/CV)**, pembuatan **Desain Logo**, hingga pembangunan **Website Corporate** berkecepatan tinggi yang responsif.

---

## 🚀 Fitur Utama

- **Hero Section Dynamic & Responsive**:
  - Penyesuaian viewport otomatis yang responsif untuk tampilan sempurna di desktop, laptop, tablet, dan smartphone.
  - Statistik count-up interaktif (Klien, Proyek Selesai, Orisinalitas, dan Konsultasi Responsif).
- **Alur Pengerjaan Interaktif (8 Tahapan)**:
  - Alur pengerjaan terstruktur dari *Konsultasi & Brief* hingga *Penyerahan Final File*.
  - Dilengkapi *panah indikator interaktif*, efek *hover glow*, dan transisi visual antar baris.
- **Pusat Informasi & FAQ Terkategori**:
  - 20 Pertanyaan & Jawaban komprehensif yang terbagi dalam 5 Kategori (*Company Profile*, *Logo*, *Website*, *Legalitas*, *Pembayaran & Finalisasi*).
  - Dilengkapi bar pencarian *real-time* dan tombol filter kategori dengan jumlah item dinamis.
- **Galeri Portofolio & Lightbox Preview**:
  - Filter kategori proyek (Company Profile, Logo, Website, Legalitas).
  - Preview lightbox gambar resolusi tinggi dengan navigasi tautan proyek.
- **Testimoni & Klien Carousel**:
  - Carousel testimoni klien interaktif menggunakan **Embla Carousel**.
  - Logo marquee klien terpercaya.
- **Navigasi Simpel & Hemat Ruang**:
  - Header navigasi ringkas 6 menu utama dengan tombol *CTA Konsultasi WhatsApp*.
  - Mobile drawer menu yang responsif dan lancar.

---

## 🛠️ Teknologi & Stack

- **Core**: [SvelteKit 2](https://kit.svelte.dev/) (Svelte 5 Runes)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Carousel**: [Embla Carousel Svelte](https://www.embla-carousel.com/)
- **3D & Animation**: Three.js / Canvas Background
- **Environment**: Node.js LTS (`>=20.0.0`)
- **Static Deployment**: `@sveltejs/adapter-static` (GitHub Pages)

---

## 💻 Panduan Penggunaan Lokal

### Prerequisites
Pastikan versi Node.js yang terinstal adalah versi **LTS** (versi 20 atau lebih baru).

```bash
# Periksa versi Node.js
node -v
```

### Instalasi & Dev Server

1. **Clone repository & masuk ke direktori proyek**:
   ```bash
   cd jago-compro
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Akses aplikasi di browser pada alamat `http://localhost:5173/`.

### Verifikasi & Build Produksi

- **Menjalankan Type Check & Svelte Diagnostics**:
  ```bash
  npm run check
  ```
- **Kompilasi Build Statis**:
  ```bash
  npm run build
  ```
- **Pratinjau Hasil Build**:
  ```bash
  npm run preview
  ```

---

## 🌐 Otomatisasi Deploy ke GitHub Pages

Proyek ini telah dilengkapi dengan workflow GitHub Actions (`.github/workflows/deploy.yml`) untuk otomatisasi *build* & *deploy* ke GitHub Pages.

1. Pastikan fitur **GitHub Pages** aktif pada repositori GitHub di menu `Settings -> Pages`.
2. Pilih sumber deployment: **GitHub Actions**.
3. Setiap kali ada perubahan yang di-*push* ke branch `main`, GitHub Actions akan otomatis mengompilasi situs statis ke direktori `build/` dan memperbarui halaman publik secara langsung.

---

## 📱 Dukungan Responsif

Antarmuka **JagoCompro** dirancang dengan pendekatan *Mobile-First & Fluid Grid*:
- 💻 **Desktop / Monitor Lebar** (`xl:`, `2xl:`)
- 💻 **Laptop / Display Standar** (`lg:`)
- 📱 **Tablet & IPad** (`md:`, `sm:`)
- 📱 **Smartphone / Layar Kecil** (`< sm:`)

---

## 📄 Lisensi

© 2026 **JagoCompro**. All Rights Reserved.
