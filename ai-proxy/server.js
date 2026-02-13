import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://terminal-resume-iota.vercel.app"
    ]
  })
);

const API_URL = "https://api.pawan.krd/v1/chat/completions";
const MODEL = "gpt-oss-20b";

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAWAN_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("AI provider error:", data);
      return res.status(500).json({ error: "AI provider error" });
    }

    const answer =
      data.choices?.[0]?.message?.content ||
      "Error generating response.";

    return res.json({ answer });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`AI Proxy running on port ${PORT}`);
});
