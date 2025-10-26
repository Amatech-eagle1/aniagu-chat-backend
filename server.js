import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Aniagu D Chatbot Backend is running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "Hello";

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Aniagu D Design’s AI assistant — friendly and helpful." },
        { role: "user", content: userMessage }
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
