import React from "react";

interface Transaction {
  id: number;
  date: string;
  description: string;
  value: number;
  type: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  return (
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
  );
};

export default TransactionsTable;
