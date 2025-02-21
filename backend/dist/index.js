"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./config/env"));
const db_1 = require("./db/db");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const url_1 = require("url");
const app = (0, express_1.default)();
const PORT = Number(env_1.default.PORT);
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
const routesPath = path_1.default.resolve("src/routes");
(0, fs_1.readdirSync)(routesPath).forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file.endsWith(".ts") && !file.endsWith(".js"))
        return;
    const routePath = (0, url_1.pathToFileURL)(path_1.default.resolve(routesPath, file)).toString();
    console.log("TENTANDO IMPORTAR:", routePath);
    try {
        const route = yield Promise.resolve(`${routePath}`).then(s => __importStar(require(s)));
        console.log("IMPORTADO COM SUCESSO", route);
        app.use("/api/v1", route.default);
    }
    catch (error) {
        console.error("ERRO AO IMPORTAR", routePath, error);
    }
}));
app.get("/", (req, res) => {
    res.json({ message: "API conectada ao MongoDB!" });
});
const server = () => {
    (0, db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
};
server();
