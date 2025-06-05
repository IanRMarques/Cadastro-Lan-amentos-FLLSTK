import { Request, Response } from "express";
import { TransactionService } from "../services/TransactionService";
import { Transaction } from "../entities/Transaction";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  async createTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const transactionData = plainToClass(Transaction, req.body);
      
      const errors = await validate(transactionData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const transaction = await this.transactionService.createTransaction(transactionData);
      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAllTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getTransactionsGroupedByMonth(req: Request, res: Response): Promise<Response> {
    try {
      const groupedTransactions = await this.transactionService.getTransactionsGroupedByMonth();
      return res.status(200).json(groupedTransactions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}