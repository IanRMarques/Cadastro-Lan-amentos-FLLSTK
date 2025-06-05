import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { TransactionType } from "../entities/Transaction";

export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async createTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = plainToClass(Transaction, transactionData);
    
    const errors = await validate(transaction);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map(e => Object.values(e.constraints)).join(', ')}`);
    }

    return this.transactionRepository.save(transaction);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find({ order: { date: "ASC" } });
  }

  async getTransactionsByMonth(month: number, year: number): Promise<Transaction[]> {
    return this.transactionRepository.findByMonthAndYear(month, year);
  }

  async getTransactionsGroupedByMonth(): Promise<{ month: number; year: number; transactions: Transaction[] }[]> {
    const months = await this.transactionRepository.findAllGroupedByMonth();
    
    const result = await Promise.all(
      months.map(async ({ month, year }) => {
        const transactions = await this.getTransactionsByMonth(month, year);
        return { month, year, transactions };
      })
    );

    return result;
  }

  async getMonthlySummary(month: number, year: number): Promise<{ totalCredit: number; totalDebit: number }> {
    const transactions = await this.getTransactionsByMonth(month, year);
    
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === TransactionType.CREDIT) {
          acc.totalCredit += Number(transaction.amount);
        } else {
          acc.totalDebit += Number(transaction.amount);
        }
        return acc;
      },
      { totalCredit: 0, totalDebit: 0 }
    );

    return summary;
  }
}