import { Transaction } from "../entities/Transaction"; // Corrigir o caminho da importação
import { TransactionRepository } from "../repositories/TransactionRepository";

export class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async createTransaction(data: Partial<Transaction>) {
    return await this.transactionRepository.createTransaction(data);
  }

  async getAllTransactions() {
    return await this.transactionRepository.getAllTransactions();
  }
}
