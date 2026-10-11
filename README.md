# Rizvandy Akbar P.R — Personal Portfolio

Website portofolio pribadi yang dibangun dengan HTML, CSS, dan JavaScript murni. Memiliki desain monokrom minimalis, dukungan dua bahasa (Indonesia/Inggris), dan animasi scroll.

🌐 **Live Demo:** [rizvandy.my.id](https://rizvandy.my.id)

---

## ✨ Fitur

- 🎨 **Desain Monokrom Minimalis** — Tampilan bersih, elegan, dan profesional
- 🌍 **Dukungan Dua Bahasa (ID/EN)** — Otomatis menggunakan AI Gemini untuk terjemahan
- 📱 **Responsif** — Optimal di desktop, tablet, dan HP
- ⚡ **Animasi Scroll** — Animasi halus saat scroll halaman
- 📄 **Proyek Dinamis** — Daftar proyek di-render dari data JavaScript
- 📬 **Form Kontak Berfungsi** — Terintegrasi dengan Formspree
- 🚀 **Deploy di Vercel** — Dengan domain pribadi dan HTTPS otomatis

---

## 🛠️ Teknologi yang Dipakai

| Kategori | Teknologi |
|----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Framework CSS** | Bootstrap 5 |
| **Ikon** | Font Awesome, Iconify |
| **Font** | Inter (Google Fonts) |
| **Deploy** | Vercel |
| **Tools** | Git, GitHub, Figma |
| **Backend (Sedang Belajar)** | PHP, Laravel, MySQL, Node.js |

---

## 📁 Struktur Folder

portfolio/
├── assets/
│ ├── documents/ # File Resume PDF
│ ├── icons/ # Ikon custom
│ └── images/
│ ├── logo/ # Logo website
│ ├── profile/ # Foto profil
│ └── projects/ # Screenshot proyek
├── css/
│ ├── style.css # Style utama
│ └── responsive.css # Style untuk mobile
├── js/
│ ├── language.js # Fitur ganti bahasa
│ ├── projects.js # Render proyek dinamis
│ ├── navigation.js # Perilaku navbar
│ └── main.js # File utama JavaScript
├── locales/
│ ├── id.json # Teks bahasa Indonesia
│ └── en.json # Teks bahasa Inggris
├── index.html
├── sitemap.xml
├── robots.txt
└── README.md

---

## 🚀 Cara Menjalankan di Komputer Lokal

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/rizvandy/portofolio.git
   cd portofolio

Jalankan dengan Live Server (extension VS Code) atau: (bash) npx serve
Buka di browser: http://localhost:3000

Catatan: Project ini memakai fetch() untuk membaca file JSON. Anda wajib pakai local server — tidak bisa hanya double-click file index.html.

Cara Setup Auto-Translate (Opsional)
Website ini punya fitur terjemahan otomatis untuk konten dua bahasa.

Dapatkan API Key Gemini di aistudio.google.com
Buat file .env:text
GEMINI_API_KEY=masukkan_api_key_anda

Install dependencies:bash
npm install

Jalankan translate:bash
node translate.js

Perintah di atas akan otomatis membuat file locales/en.json dari locales/id.json.

📬 Kontak
Email: rizvandyakbar25@gmail.com

LinkedIn: linkedin.com/in/rizvandy-akbar-331304372

GitHub: github.com/rizvandy

Website: rizvandy.my.id

📄 Lisensi
Project ini open source dan bebas dipakai untuk keperluan belajar.

<p align="center"> Dibuat dengan ❤️ oleh <a href="https://rizvandy.my.id">Rizvandy Akbar P.R</a> </p> ```

