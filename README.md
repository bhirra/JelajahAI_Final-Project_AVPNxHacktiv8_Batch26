# 🧳 Jelajah AI — Travel Assistant

Jelajah AI adalah chatbot berbasis AI yang membantu pengguna merencanakan perjalanan wisata secara personal dan interaktif. Dibangun menggunakan Google Gemini API, chatbot ini mampu memberikan rekomendasi destinasi, estimasi budget, tips transportasi, hingga saran kuliner khas — lengkap dengan kemampuan mengingat konteks percakapan sebelumnya dalam satu sesi.

Project ini dibuat sebagai final project untuk mata kuliah **AI Productivity and AI API Integration for Developers**.

---

## ✨ Fitur Utama

- 💬 **Percakapan natural** — pengguna dapat bertanya seputar rencana perjalanan menggunakan bahasa sehari-hari
- 🧠 **Conversation memory** — chatbot mengingat histori percakapan per sesi, sehingga jawaban lebih kontekstual dan personal
- 🌍 **Domain pengetahuan travel** — dilengkapi system instruction khusus agar fokus memberi saran seputar destinasi, budget, transportasi, dan budaya lokal
- 🖼️ **Analisis gambar** — mendukung upload gambar untuk dianalisis oleh AI (endpoint `/generate-from-image`)
- 🎨 **UI elegan** — tampilan chat dengan tema navy & gold yang bersih dan nyaman digunakan

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| Backend | Node.js, Express.js |
| AI Model | Google Gemini API (`@google/genai`) — model `gemini-3.6-flash` |
| Frontend | HTML, CSS, JavaScript (vanilla) |
| Markdown Rendering | marked.js |
| Environment Config | dotenv |

---

## 📁 Struktur Project

```
final-project/
├── index.js              # Server Express & logic API Gemini
├── starter/
│   ├── index.html         # Halaman UI chatbot
│   ├── script.js          # Logic frontend (fetch API, render chat)
│   └── style.css          # Styling tema navy & gold
├── .env                   # API key (tidak di-push ke GitHub)
├── .env.example            # Contoh format .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Cara Menjalankan Project

### 1. Clone repository
```bash
git clone https://github.com/bhirra/JelajahAI_Final-Project_AVPNxHacktiv8_Batch26.git
cd JelajahAI_Final-Project_AVPNxHacktiv8_Batch26
```

### 2. Install dependencies
```bash
npm install
```

### 3. Buat file `.env`
Buat file `.env` di root folder, isi dengan API key Gemini kamu (bisa didapat dari [Google AI Studio](https://aistudio.google.com/)):
```
GEMINI_API_KEY=your_api_key_here
```

### 4. Jalankan server
```bash
npx nodemon index.js
```
Jika berhasil, akan muncul log:
```
Masuk King di : 3001
```

### 5. Buka chatbot di browser
```
http://localhost:3001/index.html
```

---

## 🧩 Endpoint API

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/` | Cek status server |
| `POST` | `/chat` | Kirim pesan ke chatbot, mendukung `sessionId` untuk memory percakapan |
| `POST` | `/generate-from-image` | Kirim gambar + prompt untuk dianalisis AI |

**Contoh request `/chat`:**
```json
{
  "message": "Saya mau liburan ke Bali 5 hari, budget sekitar 5 juta",
  "sessionId": "user-123"
}
```

---

## 🎯 Target Pengguna

Calon wisatawan atau traveler — baik yang baru pertama kali merencanakan perjalanan maupun yang sudah berpengalaman — yang membutuhkan panduan cepat dan personal seputar destinasi, budget, dan itinerary tanpa harus mencari dari banyak sumber terpisah.

---

## 📸 Screenshot

<img width="1917" height="1032" alt="Albhirra Grendy Permana Putra - AVPNxHacktiv8 - UI (User Interface) Jelajah AI" src="https://github.com/user-attachments/assets/20e94e1f-cab0-4ff7-871a-b91545a3ebd8" />



---

## 👤 Author

Dibuat oleh **Albhirra Grendy Permana Putra** — Final Project AVPN Class Batch 26.
