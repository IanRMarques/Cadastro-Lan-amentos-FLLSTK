export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}

export interface Transaction {
  id?: number;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  createdAt?: string;
}

export interface MonthlyTransactions {
  month: number;
  year: number;
  transactions: Transaction[];
  totalCredit: number;
  totalDebit: number;
}