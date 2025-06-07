import React, { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";

const TransactionForm = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction(formData);
    setFormData({ date: "", description: "", value: 0, type: "Crédito" }); // Resetar formulário
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Value</label>
        <input
          type="number"
          name="value"
          value={formData.value}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleInputChange}>
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
        </select>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
