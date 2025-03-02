"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default("3000"),
    NODE_ENV: zod_1.z.enum(["development", "production"]).default("development"),
    DATABASE_URL: zod_1.z.string().url(),
});
const env = envSchema.parse(process.env);
exports.default = env;
