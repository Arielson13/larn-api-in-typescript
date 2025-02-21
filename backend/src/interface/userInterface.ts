import { Document } from "mongoose";

// Interface Typescript para User
export interface Iuser extends Document {
  nome: string;
  senha: string;
  email: string;
}

export interface IuserDataLogin extends Document {
  nome: string;
  senha: string;
  email?: string;
}
