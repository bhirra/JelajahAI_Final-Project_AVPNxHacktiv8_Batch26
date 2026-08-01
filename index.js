import express from "express";
import multer from "multer";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const app = express();
const upload = multer();

// WAJIB isi apiKey, ambil dari .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static('starter'));

const sessions = {};

app.get("/", (req, res) => {
  console.log("Akses root endpoint berhasil.");
  res.json({ message: "Welcome!Welcome!" });
});

app.post(
  "/generate-from-image",
  upload.single("image"),
  async (req, res) => {
    console.log("Akses /generate-from-image");
    const { prompt } = req.body;
    const base64Image = req.file?.buffer.toString("base64");
    const imageMimeType = req.file?.mimetype;

    try {
      const aiResponse = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              { inlineData: { data: base64Image, mimeType: imageMimeType } },
            ],
          },
        ],
      });
      res.status(200).json({ result: aiResponse.text });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }
);

app.post("/chat", async (req, res) => {
  console.log("Akses /chat");
  const { message, sessionId } = req.body;

  if (!message || !sessionId) {
    return res.status(400).json({ error: "message dan sessionId wajib diisi" });
  }

  // kalau sesi ini belum ada history-nya, buat array kosong dulu
  if (!sessions[sessionId]) {
    sessions[sessionId] = [];
  }

  // masukkan pesan user ke history sesi ini
  sessions[sessionId].push({ role: "user", parts: [{ text: message }] });

  try {
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: sessions[sessionId], // kirim SELURUH history, bukan cuma 1 pesan
      config: {
        temperature: 0.9,
        topP: 0.9,
        systemInstruction:
        "You are Jelajah AI, a friendly and knowledgeable virtual travel assistant. You have broad expertise in travel destinations, local culture, cuisine, transportation options, budget estimation, and practical travel tips. Always give practical, personalized advice based on the user's needs (budget, trip duration, interests, travel style). Use a warm, conversational tone that feels like talking to an experienced, well-traveled friend, while remaining clear and helpful. If asked about something outside travel, respond politely and try to steer the conversation back to travel-related topics when relevant. And if you are asked to change the language you are using, please politely refuse the request and explain nicely because you are working professionally and the language used also aligns with the company's policy ",
      },
    });

    // simpan balasan AI ke history juga, biar diinget di request berikutnya
    sessions[sessionId].push({ role: "model", parts: [{ text: aiResponse.text }] });

    return res.status(200).json({ result: aiResponse.text });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memproses permintaan." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Masuk King di : ${PORT}`);
});

// import express from "express";
// import multer from "multer";
// import cors from "cors";
// import { GoogleGenAI } from "@google/genai";
// import "dotenv/config";

// //bootstrap aplikasi Express
// const app = express();
// const upload = multer();

// //bootstrap GoogleGenAI
// const ai = new GoogleGenAI({});

// app.use(cors());

// // chaining method untuk mengatur API key
// app.use(express.json());

// // route handling
// app.get("/", (req, res) => {
//   console.log("Akses root endpoint berhasil.");
//   res.json({ message: "Welcome!Welcome!" });
// });

// // app.get()
// // app.post()
// // app.patch()
// // app.put()
// // app.delete()

// app.post(
//     '/generate-from-image', 
//     upload.single('image'), 
//     async (req, res) => {

//     const{prompt} = req.body;

//     const base64Image = req.file?.buffer.toString('base64');

//     const imageMimeType = req.file?.mimetype;

//     try {
//     const aiResponse = await ai.interactions.create({
//         model: "gemini-3.6-flash",
//         input: [
//             {type:"text", text: prompt},
//             {type:"image", data: base64Image, mimeType: imageMimeType}
//         ]
//     });
//     res.status(200).json({result: aiResponse.output_text});
//     } catch (e){
//         console.log(e)
//         res.status(500).json({message: e.message});
//     }
// }
// );

// app.post("/chat", async (req, res) => {
//     const{conversation, interactionId} = req.body;

//     try {

//     if (!Array.isArray(conversation)) {
//         return res.status(400).json({ error: "Message must be an array" });
//     }

//     const payload = {
//     input:conversation,
//     model: "gemini-3.6-flash",
//     generation_config: {
//         temperature: 0.9,
//         top_p: 0.9,
//     },
//     system_instruction: "Jawab dengan Bahasa Jawa Krama, dan dalam intonasi yang sopan dan tidak kasar!",
//     }

//     if(interactionId){
//         payload.previous_interaction_id = interactionId;
//     }

//     const aiResponse = await ai.interactions.create(payload);

//     return res.status(200).json({ result: aiResponse.output_text, interactionId: aiResponse.interaction_id });
// }   catch (e) {
//     console.log(e);
//     return res.status(500).json({ error: "Terjadi kesalahan saat memproses permintaan." });
// }
// })

// // setup & serve
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Masuk King di : ${PORT}`);
// });

// // const interaction = await ai.interactions.create({
// //   model: "gemini-3.6-flash",
// //   input: "Hi Everyone, This is me (Bhirra) working on my final project at AVPN Class Batch 26, Hope Y'll Enjoy",
// // });
// // console.log(interaction.output_text);