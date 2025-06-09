// src/routes/transactionRoutes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { TransactionService } from '../services/TransactionService';

const router = Router();
const transactionService = new TransactionService();
const transactionController = new TransactionController();

router.post('/transactions', transactionController.createTransaction.bind(transactionController));
router.get('/transactions', transactionController.getAllTransactions.bind(transactionController));

export default router;
