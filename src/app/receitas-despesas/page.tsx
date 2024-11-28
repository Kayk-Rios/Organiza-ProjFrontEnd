"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaChartLine,
  FaWallet,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

interface Transacao {
  tipo: "receita" | "despesa";
  valor: number;
  data: string;
  categoria: string;
  conta: string;
  metodoPagamento: string;
  descricao: string;
}

const App: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [formData, setFormData] = useState<Transacao>({
    tipo: "receita",
    valor: 0,
    data: "",
    categoria: "",
    conta: "",
    metodoPagamento: "",
    descricao: "",
  });
  const [activeTab, setActiveTab] = useState<"receita" | "despesa">("receita");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setTransacoes([...transacoes, { ...formData, tipo: activeTab }]);
    setFormData({
      tipo: "receita",
      valor: 0,
      data: "",
      categoria: "",
      conta: "",
      metodoPagamento: "",
      descricao: "",
    });
  };

  const handleDelete = (index: number) => {
    setTransacoes(transacoes.filter((_, i) => i !== index));
  };

  const handleNavigation = (path: string) => {
    setMenuOpen(false); // Fecha o menu ao navegar
    router.push(path); // Navega para a rota especificada
  };

  return (
    <div className="bg-[#16A34A] min-h-screen flex flex-col">
      {/* Header com Menu Sanduíche */}
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
        <button
          onClick={() => router.back()}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          ← Voltar
        </button>
        <h1 className="text-center text-lg sm:text-2xl text-[#0A2342]">
          Adicionar Receitas/Despesas
        </h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-blue-500"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {menuOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48">
              <nav className="flex flex-col p-4 space-y-2">
                <button
                  onClick={() => handleNavigation("/inicial")}
                  className="text-gray-700 hover:text-blue-500"
                >
                  Início
                </button>
                <button
                  onClick={() => handleNavigation("/receitas-despesas")}
                  className="text-gray-700 hover:text-blue-500"
                >
                  Receitas e Despesas
                </button>
                <button
                  onClick={() => handleNavigation("/orcamento")}
                  className="text-gray-700 hover:text-blue-500"
                >
                  Orçamento
                </button>
                <button
                  onClick={() => handleNavigation("/investimentos")}
                  className="text-gray-700 hover:text-blue-500"
                >
                  Investimentos
                </button>
                <button
                  onClick={() => handleNavigation("/configuracoes")}
                  className="text-gray-700 hover:text-blue-500"
                >
                  Configurações
                </button>
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Formulário para Adicionar Transações */}
      <div className="bg-white p-6 mx-4 sm:mx-10 rounded-lg shadow-lg mt-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setActiveTab("receita")}
            className={`py-2 rounded-l-md ${
              activeTab === "receita"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            } font-semibold`}
          >
            Receita
          </button>
          <button
            onClick={() => setActiveTab("despesa")}
            className={`py-2 rounded-r-md ${
              activeTab === "despesa"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-600"
            } font-semibold`}
          >
            Despesa
          </button>
        </div>
        <form className="space-y-4">
          {["valor", "data", "categoria", "conta", "descricao"].map((field) => (
            <div key={field}>
              <label className="block font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "data" ? "date" : "text"}
                name={field}
                value={formData[field as keyof Transacao]}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}
          <div>
            <label className="block font-medium mb-1">Método de Pagamento</label>
            <select
              name="metodoPagamento"
              value={formData.metodoPagamento}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            >
              <option value="cartao">Cartão</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="transferencia">Transferência</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Salvar
          </button>
        </form>
      </div>

      {/* Histórico de Transações */}
      <div className="bg-white p-6 mx-4 sm:mx-10 rounded-lg shadow-lg mt-6">
        <h2 className="text-lg font-semibold text-center mb-4">
          Histórico de Transações
        </h2>
        <ul className="space-y-4">
          {transacoes.map((transacao, index) => (
            <li
              key={index}
              className={`p-4 rounded-md flex justify-between items-center ${
                transacao.tipo === "receita" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div>
                <strong>{transacao.tipo.toUpperCase()}</strong>: R${" "}
                {transacao.valor} - {transacao.descricao}
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-6">
        <nav className="flex justify-around py-4">
          <a href="/inicial" className="flex flex-col items-center hover:text-blue-500">
            <FaHome size={24} />
            <span className="text-xs">Início</span>
          </a>
          <a
            href="/receitas-despesas"
            className="flex flex-col items-center hover:text-blue-500"
          >
            <FaChartLine size={24} />
            <span className="text-xs">Receitas/Despesas</span>
          </a>
          <a href="/orcamento" className="flex flex-col items-center hover:text-blue-500">
            <FaWallet size={24} />
            <span className="text-xs">Orçamento</span>
          </a>
          <a href="/investimentos" className="flex flex-col items-center hover:text-blue-500">
            <FaChartLine size={24} />
            <span className="text-xs">Investimentos</span>
          </a>
          <a href="/configuracoes" className="flex flex-col items-center hover:text-blue-500">
            <FaCog size={24} />
            <span className="text-xs">Configurações</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default App;
