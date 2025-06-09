import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Página inicial
import TransactionsPage from './pages/TransactionsPage';  // Página de transações
import LaunchPage from './pages/Lauches';  // Página de formulário de lançamento
import NotFoundPage from './pages/NotFoundPage';  // Página 404

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />  {/* Página inicial */}
      <Route path="/transactions" element={<TransactionsPage />} />  {/* Página de transações */}
      <Route path="/launch" element={<LaunchPage />} />  {/* Página de formulário de lançamento */}
      <Route path="*" element={<NotFoundPage />} />  {/* Página 404 */}
    </Routes>
  );
};

export default App;
