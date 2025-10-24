import prisma from "../lib/prisma.js";
import client from "../lib/openai.js";
import dotenv from "dotenv";

dotenv.config();

export const gerarCompose = async (req, res) => {
  try {
    const { userId } = req.params;
    const { promptUser } = req.body;

    if (!promptUser || !userId) {
      return res.status(400).json({
        msg: "Erro. Digite corretamente todos os campos.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id_user: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    if (user.qtd_tickets <= 0) {
      return res.status(403).json({
        msg: "Você não possui tickets suficientes. Compre novos tickets",
      });
    }

    const result = await client.responses.create({
      model: "gpt-4o-mini",
      input: `Você é um gerador de arquivos Docker Compose.  
              Gere um arquivo completo e válido chamado "docker-compose.yml".  
              Use apenas YAML válido e não adicione explicações.

              Regras:
              - Sempre inclua as versões corretas das imagens (ex: postgres:15, node:20, redis:7, etc).  
              - Adicione variáveis de ambiente padrão e boas práticas (POSTGRES_USER, POSTGRES_PASSWORD, etc).  
              - Configure volumes e networks quando necessário.
              - Se o usuário citar “frontend” e “backend”, crie dois serviços separados.
              - Se ele citar banco de dados, configure a conexão via variáveis de ambiente.
              - Use a versão "3.9" do compose.

              Pedido do usuário:
              ${promptUser}

              Responda apenas com o conteúdo YAML:`,
    });

    let ymlText = result.output_text?.trim() || "";
    ymlText = ymlText
      .replace(/^```yaml\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const newHistory = await prisma.history.create({
      data: {
        prompt: promptUser,
        yml: ymlText,
        userId: Number(userId),
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id_user: Number(userId) },
      data: {
        qtd_tickets: user.qtd_tickets - 1,
      },
    });

    return res.status(201).json({
      message: "Compose gerado com sucesso!",
      history: newHistory,
      ticketsRestantes: updatedUser.qtd_tickets,
    });
  } catch (error) {
    console.error("Erro ao gerar compose:", error);
    res.status(500).json({
      msg: "Erro interno ao gerar o arquivo docker-compose.",
    });
  }
};
