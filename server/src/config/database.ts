import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost", // Host do banco
  port: Number(process.env.DB_PORT) || 5432, // Porta do banco
  username: process.env.DB_USER || "postgres", // Usuário do banco (postgres por padrão)
  password: process.env.DB_PASSWORD || "room", // Senha do banco
  database: process.env.DB_NAME || "financas", // Nome do banco
  synchronize: process.env.NODE_ENV === "development", // Sincroniza o banco apenas no ambiente de desenvolvimento
  logging: process.env.NODE_ENV === "development", // Habilita o log apenas no ambiente de desenvolvimento
  entities: ["src/server/models/*.ts"], // Caminho das entidades
};

export default dbConfig;
