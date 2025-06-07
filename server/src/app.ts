import express from "express";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import transactionRoutes from "./routes/transactionRoutes";
import dbConfig from "./config/database";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", transactionRoutes);

createConnection(dbConfig)
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados", error);
  });

export default app;
