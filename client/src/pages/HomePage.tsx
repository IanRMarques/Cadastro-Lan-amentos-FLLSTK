import React from 'react';
import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction } from '../types/Transaction'; // Certifique-se de que o caminho está correto
import { getTransactions } from '../services/api'; // Certifique-se de que o caminho está correto 
import { createTransaction } from '../services/api'; // Certifique-se de que o caminho está correto
import "../CSS/Homepage.css"; // Certifique-se de que o caminho está correto
const HomePage = () => {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Transações!</h1>
      <p>Veja as suas transações financeiras.</p>

      {/* Link para ver a tabela de lançamentos */}
      <div>
        <Link to="/transactions">Ver Transações</Link>
      </div>

      {/* Link para criar um novo lançamento */}
      <div>
        <Link to="/launch">Criar Novo Lançamento</Link>
      </div>
    </div>
  );
};

export default HomePage;
