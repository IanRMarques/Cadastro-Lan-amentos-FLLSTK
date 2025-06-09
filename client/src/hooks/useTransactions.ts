import { useState, useEffect } from "react";
import { api } from "../api/axios";  // Certifique-se de que você importou corretamente o axios configurado

interface Transaction {
  id: number;
  date: string;
  description: string;
  value: number;
  type: string;
}

// Função que exporta o hook
export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Função para buscar transações do backend
  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  // Função para adicionar uma nova transação
  const addTransaction = async (transaction: Transaction) => {
    try {
      const response = await api.post("/transactions", transaction);  // Envia a nova transação para o backend
      setTransactions((prevTransactions) => [...prevTransactions, response.data]);  // Atualiza o estado com a nova transação
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  };

  // Fetch transações ao montar o componente
  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, addTransaction };  // Retorna as transações e a função para adicionar transações
};
