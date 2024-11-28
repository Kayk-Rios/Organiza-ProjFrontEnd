"use client";

import React, { createContext, useContext, useState } from "react";

type Transaction = {
  id: string;
  type: "receita" | "despesa";
  amount: number;
  date: string; // formato YYYY-MM-DD
  description: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Dados iniciais de exemplo
    { id: "1", type: "receita", amount: 300, date: "2024-11-01", description: "Venda de produto" },
    { id: "2", type: "despesa", amount: 150, date: "2024-11-03", description: "Conta de luz" },
    { id: "3", type: "receita", amount: 500, date: "2024-11-05", description: "Salário" },
    { id: "4", type: "despesa", amount: 200, date: "2024-11-07", description: "Supermercado" },
  ]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within a TransactionProvider");
  }
  return context;
};
