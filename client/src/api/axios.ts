// src/api/axios.ts

import axios from 'axios'

// Configuração direta do axios com a URL base
export const api = axios.create({
  baseURL: 'http://localhost:3333' // Defina a URL diretamente sem usar import.meta
})
