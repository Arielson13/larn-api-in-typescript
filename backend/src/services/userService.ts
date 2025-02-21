import { userModel } from "../models/userModel";
import { Iuser, IuserDataLogin } from "../interface/userInterface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env";

const JWT_SECRET = env.SECRET_KEY; // chave secreta no .env

// Criar um novo Usuário no banco de dados
export const createUser = async (userData: Iuser) => {
  try {
    const { nome, email, senha } = userData;

    if (!nome || !email || !senha) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    // Verifica se o e-mail ja está em uso
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("E-mail ja cadastrado.");
    }

    // Hash da senha antes de salvar no banco
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Criar e salvar o novo usuário
    const newUser = new userModel({
      ...userData,
      senha: hashedPassword, // Salva a senha criptografada
    });

    await newUser.save();

    // Gerar um token JWT para usuário
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expira em 1 hora
    );

    return { user: newUser, token };
  } catch (error: any) {
    throw new Error(error.message || "Erro ao criar usuário");
  }
};

export const loginUser = async (userDataLogin: IuserDataLogin) => {
  try {
    const { nome, email, senha } = userDataLogin;

    // Se o login de preferencia for utilizando nome ou email
    const userName = await userModel.findOne({ nome });
    const userEmail = await userModel.findOne({ email });
    if (!userName || !userEmail) {
      throw new Error("Credênciais inválidas.");
    }

    const isMath = await bcrypt.compare(senha, userDataLogin.senha);
    if (!isMath) {
      throw new Error("Credênciais inválidas.");
    }

    const token = jwt.sign(
      { id: userDataLogin._id },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expira em 1 hora
    );

    return { user: userName, token };
  } catch (error: any) {
    throw new Error(error.message || "Erro ao tentar realizar login.");
  }
};
