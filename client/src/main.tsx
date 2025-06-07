// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Referência para o componente App
import './index.css';     // Arquivo de estilo global

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
