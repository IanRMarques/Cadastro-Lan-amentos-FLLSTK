import { Transaction } from '../entities/Transaction'; // Certifique-se de que o caminho está correto
import { TransactionRepository } from '../repositories/TransactionRepository';  // Importando o repositório

export class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository(); // Inicializa o repositório
  }
  

  // Função para criar uma nova transação
  async createTransaction(data: Partial<Transaction>) {
    return await this.transactionRepository.createTransaction(data);
  }

  // Função para obter todas as transações
  async getAllTransactions() {
    return await this.transactionRepository.getAllTransactions();
  }
}
