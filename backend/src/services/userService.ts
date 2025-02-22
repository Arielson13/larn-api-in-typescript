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

    // Verifica se o usuário existe pelo nome ou email
    const userName = await userModel.findOne({ nome });
    const userEmail = await userModel.findOne({ email });

    const user = userName || userEmail; // Obtém o usuário encontrado
    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    // Comparação correta da senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      throw new Error("Credenciais inválidas.");
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return { user, token };
  } catch (error: any) {
    throw new Error(error.message || "Erro ao tentar realizar login.");
  }
};
