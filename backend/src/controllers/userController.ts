import { Request, Response } from "express";
import { createUser, loginUser } from "../services/userService";
import { Iuser } from "../interface/userInterface";

export const addUser = async (req: Request<{}, {}, Iuser>, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      status: true,
      message: "Usuário criado com sucesso!",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Erro ao criar usuário.",
    });
  }
};

export const login = async (req: Request<{}, {}, Iuser>, res: Response) => {
  try {
    const user = await loginUser(req.body);
    res.status(201).json({
      status: true,
      message: "Login realizado com sucesso!",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Erro ao tentar realizar o login.",
    });
  }
};
