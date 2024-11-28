"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaHome, FaChartLine, FaWallet, FaCog, FaBars, FaTimes } from "react-icons/fa";
import Menu from "../menu/menu";


interface Investimento {
  nome: string;
  retorno: number; // Percentual de retorno
  descricao: string;
}

interface HistoricoInvestimento {
  nome: string;
  valorInvestido: number;
  retornoEstimado: number;
}

const Investimentos: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [valor, setValor] = useState<number>(0);
  const [investimentoSelecionado, setInvestimentoSelecionado] = useState<Investimento | null>(null);
  const [historico, setHistorico] = useState<HistoricoInvestimento[]>([]);


  useEffect(() => {

    const loggedIn = Cookies.get("loggedIn");
    
    if (!loggedIn) {
  
      router.push("/");
    }
  }, [router]);

  const investimentos: Investimento[] = [
    { nome: "Investimento A", retorno: 5, descricao: "Opção conservadora com retorno de 5% ao ano." },
    { nome: "Investimento B", retorno: 8, descricao: "Opção moderada com retorno de 8% ao ano." },
    { nome: "Investimento C", retorno: 12, descricao: "Opção agressiva com retorno de 12% ao ano." },
  ];

  const handleInvestir = () => {
    if (!investimentoSelecionado || valor <= 0) {
      alert("Selecione um investimento e insira um valor válido.");
      return;
    }

    const retornoEstimado = valor + (valor * investimentoSelecionado.retorno) / 100;
    setHistorico([
      ...historico,
      {
        nome: investimentoSelecionado.nome,
        valorInvestido: valor,
        retornoEstimado: parseFloat(retornoEstimado.toFixed(2)),
      },
    ]);

    setValor(0);
    setInvestimentoSelecionado(null);
    alert("Investimento realizado com sucesso!");
  };



  return (
    <div className="bg-[#16A34A] min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between bg-white p-4 rounded-md shadow-md mb-6">
        <button
          onClick={() => router.back()}
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition"
        >
          ← Voltar
        </button>
        <h1 className="text-[#0A2342] font-medium text-center text-lg">Investimentos</h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-blue-500 focus:outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {menuOpen && (
            <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-40">
             <Menu/>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="bg-white p-6 rounded-md shadow-lg mb-6">
          <h2 className="text-[#0A2342] font-medium text-lg mb-4">Selecione um Investimento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {investimentos.map((investimento) => (
              <div
                key={investimento.nome}
                className={`p-4 rounded-lg shadow-md cursor-pointer ${
                  investimentoSelecionado?.nome === investimento.nome
                    ? "bg-green-100 border-2 border-green-600"
                    : "bg-white"
                }`}
                onClick={() => setInvestimentoSelecionado(investimento)}
              >
                <h3 className="text-[#0A2342] font-bold">{investimento.nome}</h3>
                <p className="text-[#0A2342]">{investimento.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário de Investimento */}
        {investimentoSelecionado && (
          <div className="bg-white p-6 rounded-md shadow-lg mb-6">
            <h3 className="text-[#0A2342] font-medium mb-4">
              Investir em {investimentoSelecionado.nome}
            </h3>
            <div className="mb-4">
              <label className="block font-medium text-[#0A2342] mb-2">
                Valor do Investimento
              </label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={handleInvestir}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Confirmar Investimento
            </button>
          </div>
        )}

        {/* Histórico de Investimentos */}
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h3 className="text-[#0A2342] font-medium mb-4">Histórico de Investimentos</h3>
          {historico.length === 0 ? (
            <p className="text-[#0A2342]">Nenhum investimento realizado ainda.</p>
          ) : (
            <ul className="space-y-4">
              {historico.map((item, index) => (
                <li key={index} className="p-4 rounded-md bg-gray-50">
                  <strong>{item.nome}</strong>: R${item.valorInvestido.toFixed(2)} → Retorno
                  estimado: R${item.retornoEstimado.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

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

export default Investimentos;
