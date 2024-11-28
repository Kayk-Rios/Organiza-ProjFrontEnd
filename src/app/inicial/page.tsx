"use client";

import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardPage = () => {
  // Simulação de transações
  const receitas = [5000, 8000, 6000, 7000]; // Valores de receitas por mês
  const despesas = [3000, 4000, 2000, 5000]; // Valores de despesas por mês
  const categorias = ["Janeiro", "Fevereiro", "Março", "Abril"];

  // Configuração dos dados do gráfico de barras
  const barChartData = {
    labels: categorias,
    datasets: [
      {
        label: "Receitas",
        data: receitas,
        backgroundColor: "rgba(34, 197, 94, 0.6)", // Verde
      },
      {
        label: "Despesas",
        data: despesas,
        backgroundColor: "rgba(244, 63, 94, 0.6)", // Vermelho
      },
    ],
  };

  // Configuração dos dados do gráfico de pizza
  const pieChartData = {
    labels: ["Receitas", "Despesas"],
    datasets: [
      {
        label: "Distribuição",
        data: [receitas.reduce((a, b) => a + b, 0), despesas.reduce((a, b) => a + b, 0)],
        backgroundColor: ["rgba(34, 197, 94, 0.6)", "rgba(244, 63, 94, 0.6)"],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Cabeçalho */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl text-blue-900">
          Dashboard Financeiro
        </h1>
        <p className="text-gray-500 text-sm italic">
          Visualize suas receitas, despesas e mais!
        </p>
      </header>

      {/* Gráficos */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Barras */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Receitas x Despesas</h2>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>

        {/* Gráfico de Pizza */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Distribuição Total</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
