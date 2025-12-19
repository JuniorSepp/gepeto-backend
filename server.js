
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/gerar", async (req, res) => {
  try {
    const { prompt, modo } = req.body;

    const estilo = {
      auto: "crie 5 shorts virais",
      anime: "estilo anime motivacional",
      biblico: "estilo bíblico inspirador",
      dark: "estilo dark psicológico",
      filosofico: "estilo filosófico profundo"
    };

    const promptFinal = `
Crie 5 roteiros diferentes para shorts (até 58 segundos).
Tema: ${prompt}
Estilo: ${estilo[modo] || estilo.auto}

Formato obrigatório:
TÍTULO
CENA 1 – Gancho
CENA 2 – Desenvolvimento
CENA 3 – Reflexão
NARRAÇÃO
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: promptFinal }]
    });

    res.json({
      texto: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.json({ texto: "Erro ao conectar com a IA." });
  }
});

app.get("/", (req, res) => {
  res.send("Gepeto Backend Online 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Gepeto rodando na porta", PORT);
})