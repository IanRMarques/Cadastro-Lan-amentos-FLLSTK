import React, { useEffect, useState } from "react";
import { getTransactions, createTransaction } from "../services/api";

const Lauches = () => {
  const [transactions, setTransactions] = useState<any[]>([]); // Lista de transações
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    value: 0,
    type: "Crédito", // Tipo default
  });

  // Função para carregar as transações da API
  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  // Função para criar uma nova transação
  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdTransaction = await createTransaction(newTransaction);
      setTransactions([...transactions, createdTransaction]); // Adiciona a nova transação à lista
      setNewTransaction({
        date: "",
        description: "",
        value: 0,
        type: "Crédito", // Reset após criar
      });
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  };

  // Carregar transações ao montar o componente
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transações</h1>
      <form onSubmit={handleCreateTransaction}>
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          required
        />
        <input
          type="text"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          placeholder="Descrição"
          required
        />
        <input
          type="number"
          value={newTransaction.value}
          onChange={(e) => setNewTransaction({ ...newTransaction, value: parseFloat(e.target.value) })}
          placeholder="Valor"
          required
        />
        <select
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
        >
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
        </select>
        <button type="submit">Criar Lançamento</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.value}</td>
              <td>{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lauches;
