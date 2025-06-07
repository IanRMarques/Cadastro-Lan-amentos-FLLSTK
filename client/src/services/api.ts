import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getTransactions = async () => {
  try {
    const response = await api.get("/transactions");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar transações", error);
    throw error;
  }
};

export const createTransaction = async (data: any) => {
  try {
    const response = await api.post("/transactions", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar transação", error);
    throw error;
  }
};
