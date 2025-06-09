import "reflect-metadata"; // Necessário para o TypeORM
import express, { Request, Response } from "express";
import { createConnection } from "typeorm"; 
import { Transaction } from "./entities/Transaction"; 
import * as dotenv from "dotenv"; 
import cors from "cors";  // Importe o CORS

dotenv.config();

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:5173'  // Substitua com a URL do seu frontend, caso seja diferente
}));
  // Habilita CORS para todos os domínios

app.use(express.json());  // Middleware para parsear o corpo da requisição como JSON

// Configuração do TypeORM usando variáveis de ambiente
createConnection({
  type: "postgres",
  host: "localhost",  // Defina o host diretamente
  port: 5432,  // Defina a porta diretamente
  username: "postgres",  // Defina o usuário diretamente
  password: "room",  // Defina a senha diretamente
  database: "financas",  // Defina o nome do banco de dados diretamente
  entities: [Transaction],  // As entidades que você está utilizando
  synchronize: true,  // Sincroniza automaticamente (não recomendado em produção)
  logging: true,  // Habilite o logging para depuração
})
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((error) => {
    console.log("Erro ao conectar ao banco de dados:", error);
  });

// Aqui você deve importar e usar suas rotas
import transactionRoutes from './routes/transactionRoutes';
app.use('/api', transactionRoutes);  // Use o prefixo '/api' para suas rotas

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
  console.log(`Acesse a API em http://localhost:${port}/api/transactions`);
  console.log(`Acesse a documentação da API em http://localhost:${port}/api/docs`);
});
app.get("/", (req: Request, res: Response) => {
  res.send("Bem-vindo à API de Transações!");
  res.json({ message: "Bem-vindo à API de Transações!" });
});

