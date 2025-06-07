import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import { validateTransaction } from "../middlewares/validateTransaction";  // Verifique o caminho aqui

const router = Router();
const transactionController = new TransactionController();

router.post("/transactions", validateTransaction, transactionController.createTransaction);
router.get("/transactions", transactionController.getAllTransactions);

export default router;
