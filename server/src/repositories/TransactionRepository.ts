// src/repositories/TransactionRepository.ts
import { getRepository } from "typeorm";
import { Transaction } from "../entities/Transaction"; // Importa a entidade Transaction

export class TransactionRepository {
  private transactionRepo = getRepository(Transaction); // Obtém o repositório da entidade Transaction

  // Função para criar uma nova transação
  async createTransaction(data: Partial<Transaction>) {
    const transaction = this.transactionRepo.create(data); // Cria uma nova instância de transação
    return await this.transactionRepo.save(transaction); // Salva a transação no banco de dados
  }

  // Função para obter todas as transações
  async getAllTransactions() {
    return await this.transactionRepo.find(); // Busca todas as transações
  }
}
