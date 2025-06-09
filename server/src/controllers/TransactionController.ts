// src/controllers/TransactionController.ts

import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService(); // Certifique-se de que o serviço está sendo instanciado corretamente
  }

  // Rota para criar uma nova transação
  async createTransaction(req: Request, res: Response) {
    try {
      console.log("Dados recebidos:", req.body); // Log para verificar os dados recebidos
      const { date, description, value, type } = req.body;

      // Validação para garantir que o valor seja um número positivo
      if (isNaN(value) || value <= 0) {
        return res.status(400).json({ message: 'Valor inválido!' });
      }

      // Criando a transação
      const transaction = await this.transactionService.createTransaction({
        date,
        description,
        value,
        type,
      });

      console.log("Transação criada:", transaction); // Log da transação criada
      res.status(201).json(transaction); // Retorna a transação criada
    } catch (error: any) {
      console.error("Erro ao criar transação:", error.message); // Log detalhado do erro
      res.status(500).json({
        message: 'Erro ao criar transação',
        error: error.message,
        stack: error.stack,
      });
    }
  }

  // Rota para buscar todas as transações
  async getAllTransactions(req: Request, res: Response) {
    try {
      console.log("Buscando todas as transações...");  // Log para indicar que o processo começou
      const transactions = await this.transactionService.getAllTransactions(); // Chama o serviço para obter todas as transações
      if (!transactions || transactions.length === 0) {
        console.log("Nenhuma transação encontrada."); // Log se não houver transações
        return res.status(404).json({ message: 'Nenhuma transação encontrada' });
      }
      console.log(transactions);
      console.log("Transações encontradas:", transactions);  // Log das transações retornadas
      res.json(transactions); // Retorna todas as transações
    } catch (error: any) {
      console.error("Erro ao obter transações:", error.message); // Log detalhado do erro
      res.status(500).json({
        message: 'Erro ao obter transações',
        error: error.message,
        stack: error.stack,
      });
    }
  }
}
