import mongoose from "mongoose";
import { Iuser } from "../interface/userInterface";

const userSchema = new mongoose.Schema<Iuser>(
  {
    nome: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requied: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<Iuser>("userModel", userSchema);
