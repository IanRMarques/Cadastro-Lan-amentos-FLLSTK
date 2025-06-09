// src/api/axios.ts

import axios from 'axios';

// Configuração correta do axios com a URL do backend
export const api = axios.create({
  baseURL: 'http://localhost:3000/api'  // Ajuste a URL para o backend
});
