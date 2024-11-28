"use client";

import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChartLine,
  FaWallet,
  FaCog,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Menu from "../menu/menu";

type DashboardData = {
  [key: string]: { name: string; despesas: number; receitas: number }[];
};

const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const overviewData = [
    { title: "Saldo Atual", value: "R$15.230,50", change: "+5%", type: "positive" },
    { title: "Total de entradas", value: "R$8.540,00", change: "+10%", type: "positive" },
    { title: "Despesas Totais", value: "R$5.320,00", change: "-2%", type: "negative" },
    { title: "Poupança", value: "R$2.410,50", change: "+8%", type: "positive" },
  ];

  const [selectedMonth, setSelectedMonth] = useState<keyof DashboardData>("Janeiro");

  const dashboardData: DashboardData = {
    Janeiro: [
      { name: "Semana 1", despesas: 500, receitas: 300 },
      { name: "Semana 2", despesas: 700, receitas: 400 },
      { name: "Semana 3", despesas: 400, receitas: 350 },
      { name: "Semana 4", despesas: 650, receitas: 500 },
    ],
    Fevereiro: [
      { name: "Semana 1", despesas: 600, receitas: 400 },
      { name: "Semana 2", despesas: 800, receitas: 500 },
      { name: "Semana 3", despesas: 450, receitas: 370 },
      { name: "Semana 4", despesas: 700, receitas: 550 },
    ],
    Março: [
      { name: "Semana 1", despesas: 550, receitas: 320 },
      { name: "Semana 2", despesas: 750, receitas: 410 },
      { name: "Semana 3", despesas: 470, receitas: 360 },
      { name: "Semana 4", despesas: 680, receitas: 520 },
    ],
  };

  const selectedData = dashboardData[selectedMonth];

 

  return (
    <main className="bg-[#16A34A] min-h-screen flex flex-col">
      {/* Header com Título e Menu */}
      <div className="flex justify-between items-center bg-white shadow-md p-4 relative">
        {/* Título no lado esquerdo */}
        <h1 className="text-lg sm:text-2xl font-bold text-[#0A2342]">
          Página Inicial
        </h1>
        {/* Logo no meio */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="/assets/LOGOsemfundoEnome.png"
            alt="Logo da Empresa"
            className="h-20 w-20 sm:h-24 sm:w-24"
          />
        </div>
        {/* Botão de Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 hover:text-blue-500 focus:outline-none"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-12 right-4 bg-white shadow-lg rounded-lg w-48 z-50">
           <Menu/>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-grow p-4 space-y-10">
        {/* Resumo Financeiro */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {overviewData.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-green-200 to-white rounded-lg p-4 shadow-md"
            >
              <h3 className="text-[#0A2342] font-semibold">{item.title}</h3>
              <p className="mt-2 text-[#0A2342] font-bold">{item.value}</p>
              <p
                className={`mt-1 font-semibold ${
                  item.type === "positive" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change}
              </p>
            </div>
          ))}
        </section>

        {/* Gráficos */}
        <section>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-center font-semibold text-[#0A2342] mb-6">
              Relatório Mensal
            </h2>
            <div className="flex justify-center items-center mb-4">
              <label htmlFor="month" className="mr-2 text-[#0A2342]">
                Selecione o mês:
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(e.target.value as keyof DashboardData)
                }
                className="p-2 border rounded-md"
              >
                {Object.keys(dashboardData).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="w-full h-64">
                <ResponsiveContainer>
                  <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="despesas" fill="#E53E3E" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer>
                  <LineChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="receitas" stroke="#38A169" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-4">
        <nav className="flex justify-around">
          <a
            href="/inicial"
            className="flex flex-col items-center hover:text-blue-500"
          >
            <FaHome size={24} />
            <span>Início</span>
          </a>
          <a
            href="/receitas-despesas"
            className="flex flex-col items-center hover:text-blue-500"
          >
            <FaChartLine size={24} />
            <span>Receitas</span>
          </a>
          <a
            href="/orcamento"
            className="flex flex-col items-center hover:text-blue-500"
          >
            <FaWallet size={24} />
            <span>Orçamento</span>
          </a>
          <a
            href="/investimentos"
            className="flex flex-col items-center hover:text-blue-500"
          >
            <FaChartLine size={24} />
            <span>Investimentos</span>
          </a>
          <a
            href="/configuracoes"
            className="flex flex-col items-center hover:text-blue-500"
          >
            <FaCog size={24} />
            <span>Configurações</span>
          </a>
        </nav>
      </footer>
    </main>
  );
};

export default HomePage;
