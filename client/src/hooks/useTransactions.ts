import { useState, useEffect } from "react";
import { getTransactions, createTransaction } from "../services/api";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Função para carregar transações
  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao carregar transações", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar uma nova transação
  const addTransaction = async (transactionData: any) => {
    try {
      const newTransaction = await createTransaction(transactionData);
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (error) {
      console.error("Erro ao adicionar transação", error);
    }
  };

  // Carregar transações na montagem do componente
  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    loading,
    addTransaction,
  };
};
