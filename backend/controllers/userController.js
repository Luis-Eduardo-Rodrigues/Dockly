import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany();

    res.json({ users: result });
  } catch (error) {
    console.log(error);
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { email_user, nome_user, senha } = req.body;

    if (!email_user || !nome_user || !senha) {
      return res.status(400).json({
        msg: "Campos não podem ser vazios. Digite corretamente!",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email_user },
    });

    if (existingUser) {
      return res.status(409).json({ msg: "Usuário já cadastrado!" });
    }

    const hashPassword = await bcrypt.hash(senha, Number(10));

    const user = await prisma.user.create({
      data: {
        email_user,
        nome_user,
        senha_user: hashPassword,
      },
    });

    return res.status(201).json({
      msg: "Usuário cadastrado com sucesso!",
      user: {
        id_user: user.id_user,
        email_user: user.email_user,
        nome_user: user.nome_user,
        tickets: user.qtd_tickets,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ msg: "Erro interno no servidor." });
  }
};

export const login = async (req, res) => {
  try {
    const { email_user, senha } = req.body;

    if (!email_user || !senha) {
      return res.json({ msg: "Preencha os dados corretamente!" });
    }

    const user = await prisma.user.findUnique({
      where: { email_user },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    const validPassword = await bcrypt.compare(senha, user.senha_user);
    if (!validPassword) {
      return res.status(401).json({ msg: "Senha inválida." });
    }

    const token = jwt.sign(
      {
        id_user: user.id_user,
        email_user: user.email_user,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      msg: "Login realizado com sucesso!",
      token,
      user: {
        id_user: user.id_user,
        nome_user: user.nome_user,
        email_user: user.email_user,
        qtd_tickets: user.qtd_tickets,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const returnQtdTicket = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.json({ msg: "Usuário não encontrado" });

    const result = await prisma.user.findUnique({
      where: {
        id_user: Number(userId),
      },
    });

    if (!result) return res.json({ msg: "Não existe esse usuário." });

    return res.json({
      nome: result.nome_user,
      qtd_ticket: result.qtd_tickets,
    });
  } catch (error) {
    console.log(error);
  }
};
