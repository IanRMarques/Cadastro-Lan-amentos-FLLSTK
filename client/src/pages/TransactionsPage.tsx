import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/api';  // Supondo que você tenha o arquivo api.ts
import '../components/TransactionForm';  // Importando o CSS para estilização
import '../CSS/TransactionsPage.css';  // Certifique-se de que o caminho está corret
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<any[]>([
    // Exemplo de dados para simular como as transações ficariam
    {
      id: 1,
      date: '2025-06-03',
      description: 'Test Transaction',
      value: 100,
      type: 'Crédito'
    }
  ]);

  // Função para formatar a data para exibir no formato MM/YYYY
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  // Agrupar transações por mês e ano
  const groupTransactionsByMonth = (transactions: any[]) => {
    const grouped = transactions.reduce((acc: any, transaction) => {
      const monthYear = formatDate(transaction.date);

      if (!acc[monthYear]) {
        acc[monthYear] = { transactions: [], totalCredit: 0, totalDebit: 0 };
      }

      acc[monthYear].transactions.push(transaction);

      if (transaction.type === 'Crédito') {
        acc[monthYear].totalCredit += transaction.value;
      } else {
        acc[monthYear].totalDebit += transaction.value;
      }

      return acc;
    }, {});

    return grouped;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data); // Simulando com dados reais da API
      } catch (error) {
        console.error('Erro ao carregar as transações', error);
      }
    };

    fetchTransactions();
  }, []);

  const groupedTransactions = groupTransactionsByMonth(transactions);

  return (
    <div>
      <h1>Transações</h1>
      <table>
        <thead>
          <tr>
            <th>Mês/Ano</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedTransactions).map((monthYear) => {
            const monthData = groupedTransactions[monthYear];
            return (
              <React.Fragment key={monthYear}>
                {monthData.transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    {index === 0 && (
                      <td rowSpan={monthData.transactions.length}>
                        {monthYear}
                      </td>
                    )}
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.value}</td>
                    <td>{transaction.type}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4}>
                    <strong>Total de Créditos</strong>
                  </td>
                  <td>{monthData.totalCredit}</td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <strong>Total de Débitos</strong>
                  </td>
                  <td>{monthData.totalDebit}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
