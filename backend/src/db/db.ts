import mongoose from "mongoose";
import env from "../config/env";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("🔥 Conectado ao MongoDB com sucesso!");
  } catch (error: any) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
};
