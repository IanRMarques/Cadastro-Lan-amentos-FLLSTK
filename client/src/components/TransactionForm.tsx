import React, { useState } from "react";
import axios from "axios";  // Importando axios
import { useTransactions } from "../hooks/useTransactions";
import '../CSS/TransactionForm.css';

const TransactionForm: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    value: 0,
    type: "Crédito",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enviar os dados para o backend (API)
    try {
      const response = await axios.post("http://localhost:3000/transactions", formData);
      console.log("Transação salva:", response.data);
      addTransaction(response.data);  // Adicionar à lista local
      setFormData({ date: "", description: "", value: 0, type: "Crédito" }); // Resetar o formulário
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Novo Lançamento</h2>  

      <div className="form-group">
        <label>Date</label>
        <input
          className="form-input"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          className="form-input"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Value</label>
        <input
          className="form-input"
          type="number"
          name="value"
          value={formData.value}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Type</label>
        <select
          className="form-input"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
        </select>
      </div>

      <button className="submit-btn" type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
