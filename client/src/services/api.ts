import axios from "axios";

// Criação de uma instância do axios com a baseURL definida para o backend
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Certifique-se de que a URL está correta
});

// Função para buscar todas as transações
export const getTransactions = async () => {
  try {
    const response = await api.get("/transactions"); // Endpoint que retorna as transações
    return response.data; // Retorna os dados recebidos do backend
  } catch (error) {
    console.error("Erro ao buscar transações", error);
    throw error;
  }
};

// Função para criar uma nova transação
export const createTransaction = async (data: any) => {
  try {
    const response = await api.post("/transactions", data); // Endpoint para criar uma transação
    return response.data; // Retorna a transação criada
  } catch (error) {
    console.error("Erro ao criar transação", error);
    throw error;
  }
};
