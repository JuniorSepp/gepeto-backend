import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ================================
   ROTA PRINCIPAL DO GEPETO
================================ */
app.post("/roteiro", async (req, res) => {
  try {
    const { tema, plataforma, estilo, duracao } = req.body;

    if (!tema || !plataforma || !estilo || !duracao) {
      return res.status(400).json({
        erro: "Dados incompletos",
      });
    }

    const prompt = `
Crie um roteiro EXTREMAMENTE VIRAL para ${plataforma}.
Tema: ${tema}
Estilo: ${estilo}
Duração: ${duracao}

Regras:
- Comece com gancho forte em 3 segundos
- Linguagem simples
- Final impactante
- Texto contínuo, sem tópicos
`;

    const resposta = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Você é um criador profissional de roteiros virais." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8
    });

    res.json({
      roteiro: resposta.choices[0].message.content
    });

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao gerar roteiro",
      detalhe: erro.message
    });
  }
});

app.listen(3000, () => {
  console.log("🔥 Gepeto backend rodando em http://localhost:3000");
});