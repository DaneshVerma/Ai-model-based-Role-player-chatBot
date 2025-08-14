import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // If using Node 18+, you can use global fetch and remove this import
import { rolePrompts } from "./roles.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => res.json({ ok: true }));

// Simple non-streaming test route (helpful for debugging)
app.post("/chat/simple", async (req, res) => {
  try {
    const { role, message } = req.body;
    const prompt = `${
      rolePrompts[role] || rolePrompts.teacher
    }\nUser: ${message}\nAssistant:`;
    const r = await fetch(`${OLLAMA_HOST}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gemma3:1b", prompt, stream: false }),
    });
    if (!r.ok) {
      const txt = await r.text();
      return res.status(500).json({ error: "Ollama error", details: txt });
    }
    const json = await r.json();
    return res.json({ reply: json.response });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// Streaming endpoint: forwards token chunks to frontend
// Streaming endpoint: forwards token chunks to frontend
app.post("/chat/stream", async (req, res) => {
  const { role, message } = req.body || {};
  if (!message) return res.status(400).json({ error: "message required" });

  // Role prompt from roles.js
  const rolePrompt = rolePrompts[role] || rolePrompts.teacher;

  // Final prompt with strict style instructions
  const finalPrompt = `${rolePrompt}
Speak in the exact persona tone of "${role}".
Keep answers short, direct, and to the point.
If referring to yourself, do so in the role’s persona.
Do not break character.
If unsure, say you don't know.

User: ${message}`;

  try {
    const ollamaRes = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:1b",
        prompt: finalPrompt,
        stream: true,
      }),
    });
role
    if (!ollamaRes.ok || !ollamaRes.body) {
      const text = await ollamaRes.text().catch(() => "");
      return res.status(500).send(`Ollama responded with error: ${text}`);
    }

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    for await (const chunk of ollamaRes.body) {
      const lines = chunk.toString().split("\n").filter(Boolean);

      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            res.write(parsed.response);
          }
          if (parsed.done) {
            res.end();
            return;
          }
        } catch {
          res.write(line);
        }
      }
    }

    res.end();
  } catch (err) {
    console.error("Chat stream error:", err);
    try {
      res.status(500).send("Server error");
    } catch {}
  }
});

app.listen(PORT, () =>
  console.log(`✅ Backend listening http://localhost:${PORT}`)
);
