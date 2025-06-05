import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { TransactionService } from "../services/TransactionService";
import { getRepository } from "typeorm";
import { Transaction } from "../entities/Transaction";

export const createTransactionRoutes = () => {
  const router = Router();
  const transactionRepository = getRepository(Transaction);
  const customTransactionRepository = new TransactionRepository();
  customTransactionRepository.setRepository(transactionRepository);
  
  const transactionService = new TransactionService(customTransactionRepository);
  const transactionController = new TransactionController(transactionService);

  router.post("/transactions", transactionController.createTransaction.bind(transactionController));
  router.get("/transactions", transactionController.getAllTransactions.bind(transactionController));
  router.get("/transactions/grouped", transactionController.getTransactionsGroupedByMonth.bind(transactionController));

  return router;
};