import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/api';  // Supondo que você tenha o arquivo api.ts

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao carregar as transações", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transações</h1>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.description}: {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;
