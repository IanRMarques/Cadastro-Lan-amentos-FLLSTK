// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Referência para o componente App
import './index.css';     // Arquivo de estilo global
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';  // Importando o BrowserRouter

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Envolvendo a aplicação com o BrowserRouter */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);