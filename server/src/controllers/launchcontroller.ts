import { Request, Response } from "express";
import { TransactionService } from "../services/TransactionService";

export class LaunchController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const transaction = await this.transactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar transação", error });
    }
  }

  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Erro ao obter transações", error });
    }
  }
}
