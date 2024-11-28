"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChartLine,
  FaWallet,
  FaCog,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Menu from "../menu/menu";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {

    const loggedIn = Cookies.get("loggedIn");
    
    if (!loggedIn) {
      router.push("/");
    }
  }, [router]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Orçamento",
        data: [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Gastos",
        data: [2000, 2500, 2200, 2700, 2900, 3100, 2600, 2800, 2400, 2300, 2500, 2700],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };
  return (
    <div className="bg-[#16A34A] min-h-screen flex flex-col">
      {/* Header com menu sanduíche */}
      <div className="flex justify-between items-center bg-white shadow p-4">
        <button
          onClick={() => router.back()}
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition"
        >
          ← Voltar
        </button>
        <h1 className="text-lg sm:text-2xl text-[#0A2342]">Orçamento</h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-blue-500 focus:outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {menuOpen && (
            <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-48 z-50">
              <Menu/>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-grow p-6">
        {/* Resumo do orçamento */}
        <section className="bg-white text-green-800 p-4 rounded-lg shadow-md mb-6">
          <p className="text-xs sm:text-sm text-center">
            Você está dentro do orçamento! Continue assim! 🎉
          </p>
          <h2 className="text-lg font-bold text-center">Saldo disponível: R$ 1500,00</h2>
        </section>

        {/* Gráficos */}
        <section className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-lg w-full sm:w-3/4 shadow-md">
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Orçamento vs Gastos" },
                  tooltip: { enabled: true },
                },
                scales: {
                  x: { title: { display: true, text: "Meses" } },
                  y: { beginAtZero: true, title: { display: true, text: "Valor (R$)" } },
                },
              }}
            />
          </div>
        </section>

        {/* Detalhes */}
        <section className="space-y-4 mb-8">
          <div className="bg-white p-3 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-black mb-4">Despesas Essenciais</h3>
            <ul className="list-none space-y-1 text-black text-sm">
              <li>Aluguel: R$ 1500,00</li>
              <li>Alimentação: R$ 800,00</li>
              <li>Transporte: R$ 400,00</li>
              <li>Educação: R$ 700,00</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-black mb-4">Despesas Não Essenciais</h3>
            <ul className="list-none space-y-1 text-black text-sm">
              <li>Roupas e acessórios: R$ 300,00</li>
              <li>Viagens: R$ 1200,00</li>
              <li>Assinaturas: R$ 200,00</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-lg">
        <nav className="flex justify-around p-4 text-gray-600">
          <a href="/inicial" className="flex flex-col items-center hover:text-blue-500">
            <FaHome size={24} />
            <span className="text-xs sm:text-sm mt-1">Início</span>
          </a>
          <a href="/receitas-despesas" className="flex flex-col items-center hover:text-blue-500">
            <FaChartLine size={24} />
            <span className="text-xs sm:text-sm mt-1">Receitas/Despesas</span>
          </a>
          <a href="/orcamento" className="flex flex-col items-center hover:text-blue-500">
            <FaWallet size={24} />
            <span className="text-xs sm:text-sm mt-1">Orçamentos</span>
          </a>
          <a href="/investimentos" className="flex flex-col items-center hover:text-blue-500">
            <FaChartLine size={24} />
            <span className="text-xs sm:text-sm mt-1">Investimentos</span>
          </a>
          <a href="/configuracoes" className="flex flex-col items-center hover:text-blue-500">
            <FaCog size={24} />
            <span className="text-xs sm:text-sm mt-1">Configurações</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
