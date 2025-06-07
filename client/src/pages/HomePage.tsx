import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Transações!</h1>
      <p>Veja as suas transações financeiras.</p>
      <Link to="/transactions">Ver Transações</Link>
    </div>
  );
};

export default HomePage;
