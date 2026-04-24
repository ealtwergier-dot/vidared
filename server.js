// ─────────────────────────────────────────────────────────
//  VidaRed — Servidor Node.js + Express
//  El API Key de Anthropic vive SOLO acá, nunca en el front
// ─────────────────────────────────────────────────────────

import "dotenv/config";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app  = express();
const PORT = process.env.PORT || 3000;
const KEY  = process.env.ANTHROPIC_API_KEY;

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Validación al arrancar ──────────────────────────────
if (!KEY || KEY.includes("PEGA-TU-KEY")) {
  console.error("\n❌  Falta el API Key de Anthropic.");
  console.error("   Abrí el archivo .env y pegá tu key.\n");
  process.exit(1);
}

// ── Middlewares ─────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "public")));   // sirve el HTML

// ── Proxy seguro → Anthropic ────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Falta el campo 'message'." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":      "application/json",
        "x-api-key":         KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model:      "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `Sos Gotita, la asistente IA de VidaRed, la red nacional de donantes
de sangre y médula ósea de Argentina. Respondés en español rioplatense,
de forma amigable, cálida y basada en evidencia médica. Cuando algo es un mito
lo aclarás claramente marcándolo como MITO. Nunca dás diagnósticos médicos.
Sos concisa (máx 3 párrafos) y usás un tono cercano como si hablaras con una amiga.`,
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Error Anthropic:", err);
      return res.status(response.status).json({ error: "Error al contactar a Gotita." });
    }

    const data = await response.json();
    const text = data?.content?.[0]?.text ?? "";
    res.json({ reply: text });

  } catch (err) {
    console.error("Error interno:", err.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// ── Arranque ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🩸  VidaRed corriendo en http://localhost:${PORT}`);
  console.log(`   API Key: ${KEY.slice(0, 14)}...  ✅\n`);
});
