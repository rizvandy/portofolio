/* ==========================================================================
   Rizvandy Akbar P.R - Auto Translator dengan Retry & Model Fallback
   Membaca API Key dari .env, menerjemahkan id.json → en.json
   ========================================================================== */

require('dotenv').config();
const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

// ==== Konfigurasi ====
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY tidak ditemukan di file .env');
  console.error('   Pastikan file .env sudah dibuat dengan format:');
  console.error('   GEMINI_API_KEY=AQ.Ab8...');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Daftar model alternatif — dicoba berurutan jika yang pertama gagal
const MODEL_FALLBACKS = [
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-3.0-flash',
  'gemini-2.0-flash',
];

// Konfigurasi Retry
const MAX_RETRIES_PER_MODEL = 3;   // Coba 3x per model
const INITIAL_DELAY_MS = 5000;     // Jeda awal 5 detik
const DELAY_MULTIPLIER = 2;        // Setiap gagal, jeda dilipatgandakan

// ==== Fungsi Delay ====
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ==== Fungsi Utama ====
async function translateJSON() {
  console.log('⏳ Membaca file id.json...');

  const idData = JSON.parse(fs.readFileSync('./locales/id.json', 'utf8'));

  const prompt = `
Anda adalah penerjemah profesional untuk website portofolio developer.
Terjemahkan nilai (values) dari JSON berikut ke dalam Bahasa Inggris yang natural, profesional, dan cocok untuk Frontend Developer.

ATURAN PENTING:
1. JANGAN terjemahkan istilah teknis seperti HTML, CSS, JavaScript, Laravel, Bootstrap, Frontend, Backend, Full Stack, Universitas Dr. Soetomo, atau nama orang.
2. Kunci (keys) JSON harus tetap SAMA PERSIS. Hanya ubah nilainya saja.
3. Output HARUS berupa JSON valid tanpa teks tambahan, tanpa markdown, dan tanpa penjelasan.

Berikut JSON-nya:
${JSON.stringify(idData, null, 2)}
  `.trim();

  // Loop melalui daftar model fallback
  for (let modelIndex = 0; modelIndex < MODEL_FALLBACKS.length; modelIndex++) {
    const modelName = MODEL_FALLBACKS[modelIndex];
    console.log(`\n🤖 Mencoba model: ${modelName}`);

    let delay = INITIAL_DELAY_MS;

    for (let attempt = 1; attempt <= MAX_RETRIES_PER_MODEL; attempt++) {
      try {
        console.log(`   → Percobaan ${attempt}/${MAX_RETRIES_PER_MODEL}...`);

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });

        let enText = response.text;
        enText = enText.replace(/```json/g, '').replace(/```/g, '').trim();

        // Validasi JSON sebelum simpan
        JSON.parse(enText); // Akan throw error jika bukan JSON valid

        fs.writeFileSync('./locales/en.json', enText);
        console.log('\n✅ Berhasil! File "locales/en.json" telah dibuat otomatis.');
        console.log(`   Model yang berhasil: ${modelName}`);
        console.log('   Silakan cek folder locales untuk melihat hasilnya.\n');
        return; // Selesai!

      } catch (error) {
        const isServerBusy = error.status === 503 || error.status === 429;
        const isModelNotFound = error.status === 404;

        // Kalau model tidak tersedia, langsung pindah ke model berikutnya
        if (isModelNotFound) {
          console.log(`   ⚠️  Model "${modelName}" tidak tersedia. Pindah ke model berikutnya...`);
          break;
        }

        // Kalau server sibuk, tunggu lalu coba lagi
        if (isServerBusy && attempt < MAX_RETRIES_PER_MODEL) {
          console.log(`   ⚠️  Server sibuk (${error.status}). Tunggu ${delay / 1000} detik...`);
          await sleep(delay);
          delay *= DELAY_MULTIPLIER;
        } else if (attempt === MAX_RETRIES_PER_MODEL) {
          console.log(`   ❌ Gagal ${MAX_RETRIES_PER_MODEL}x dengan model ini.`);
          break;
        } else {
          console.error('   ❌ Error tak terduga:', error.message || error);
          return;
        }
      }
    }
  }

  // Kalau semua model gagal
  console.error('\n❌ Semua model gagal. Kemungkinan server Google sedang sangat sibuk.');
  console.error('   Silakan coba lagi dalam beberapa menit.\n');
  process.exit(1);
}

translateJSON();