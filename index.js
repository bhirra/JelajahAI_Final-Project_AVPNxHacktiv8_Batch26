import express from "express";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

//bootstrap aplikasi Express
const app = express();
const upload = multer();

//bootstrap GoogleGenAI
const ai = new GoogleGenAI({});

// chaining method untuk mengatur API key
app.use(express.json());

// route handling
app.get("/", (req, res) => {
  console.log("Akses root endpoint berhasil.");
  res.json({ message: "Welcome!Welcome!" });
});

// app.get()
// app.post()
// app.patch()
// app.put()
// app.delete()

app.post(
    '/generate-from-image', 
    upload.single('image'), 
    async (req, res) => {

    const{prompt} = req.body;

    const base64Image = req.file?.buffer.toString('base64');

    const imageMimeType = req.file?.mimetype;

    try {
    const aiResponse = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: [
            {type:"text", text: prompt},
            {type:"image", data: base64Image, mimeType: imageMimeType}
        ]
    });
    res.status(200).json({result: aiResponse.output_text});
    } catch (e){
        console.log(e)
        res.status(500).json({message: e.message});
    }
}
);
   
res.json({ message: "Berhasil memproses permintaan.", data: aiResponse });

// setup & serve
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Masuk King di : ${PORT}`);
});

// const interaction = await ai.interactions.create({
//   model: "gemini-3.6-flash",
//   input: "Hi Everyone, This is me (Bhirra) working on my final project at AVPN Class Batch 26, Hope Y'll Enjoy",
// });
// console.log(interaction.output_text);