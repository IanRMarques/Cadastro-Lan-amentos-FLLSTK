import { getRepository } from "typeorm";
import { Transaction } from "../entities/Transaction";

export class TransactionRepository {
  private transactionRepo = getRepository(Transaction);

  async createTransaction(data: Partial<Transaction>) {
    const transaction = this.transactionRepo.create(data);
    return await this.transactionRepo.save(transaction);
  }

  async getAllTransactions() {
    return this.transactionRepo.find();
  }
}
