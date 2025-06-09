// src/services/productService.ts

import { api } from '../api/axios' // Importa a instância do axios configurada
import { AxiosResponse } from 'axios'

// Definindo o tipo Product (ajuste de acordo com a sua estrutura de produto)
export interface Product {
  id: number
  name: string
  price: number
}

// Função para obter todos os produtos
export const getAllProducts = async (): Promise<AxiosResponse<Product[]>> => {
  try {
    const response = await api.get('/products') // Não precisa do http://localhost:3333
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
