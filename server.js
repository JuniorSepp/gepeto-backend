import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Gepeto Backend Online 🚀");
});

app.post("/gerar", async (req, res) => {
  try {
    const { prompt, modo } = req.body;

    const promptFinal = `
Você é o GEPETO, um agente brasileiro especialista em criar
5 roteiros diferentes para vídeos Shorts (até 58s).

Tema: ${prompt}
Modo: ${modo || "auto"}

Formato:
TÍTULO:
ROTEIRO:
Cena 1 – Gancho
Cena 2 – Desenvolvimento
Cena 3 – Reflexão
NARRAÇÃO:
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: promptFinal
    });

    res.json({
      texto: response.output_text || "Sem resposta da IA."
    });

  } catch (error) {
    console.error("ERRO OPENAI:", error);
    res.status(500).json({ texto: "Erro ao conectar com a IA." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Gepeto Backend Online 🚀 Porta:", PORT);
});
     
  