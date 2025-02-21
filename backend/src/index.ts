import express from "express";
import env from "./config/env";
import { connectDB } from "./db/db";
import cors from "cors";
import userRouter from "./routes/userRouter";

const app = express();
const PORT = Number(env.PORT) || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", userRouter);

const server = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error("❌ Erro ao iniciar o servidor:", error.message);
    process.exit(1);
  }
};

server();
