"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaHome, FaChartLine, FaWallet, FaCog, FaBars, FaTimes } from "react-icons/fa";
import Menu from "../menu/menu";

const Configuracoes: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tema, setTema] = useState("claro");
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [emailNotificacoes, setEmailNotificacoes] = useState(false);
  const [idioma, setIdioma] = useState("pt-br");
  const [novaSenha, setNovaSenha] = useState("");
  useEffect(() => {

    const loggedIn = Cookies.get("loggedIn");
    
    if (!loggedIn) {
      router.push("/");
    }
  }, [router]);
 
  const handleSalvarSenha = () => {
    if (novaSenha.trim() === "") {
      alert("Por favor, insira uma nova senha.");
    } else {
      // Aqui você pode adicionar uma chamada de API para salvar a senha.
      alert("Senha alterada com sucesso!");
      setNovaSenha("");
    }
  };

  const handleTemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTema(e.target.value);
    alert(`Tema alterado para: ${e.target.value}`);
  };

  const handleIdiomaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdioma(e.target.value);
    alert(`Idioma alterado para: ${e.target.value}`);
  };

  return (
    <div className={`min-h-screen flex flex-col ${tema === "escuro" ? "bg-gray-800 text-white" : "bg-[#16A34A] text-black"}`}>
      {/* Conteúdo principal */}
      <div className="flex-grow w-full p-6 font-roboto">
        {/* Header com menu sanduíche */}
        <div className="flex items-center justify-between shadow-lg bg-white p-4 rounded-md mb-6">
          <button
            onClick={() => router.back()}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition"
          >
            ← Voltar
          </button>
          <h1 className="text-[#0A2342] font-medium text-center text-lg">Configurações</h1>
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
        </div>

        {/* Configurações */}
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-center text-lg font-medium mb-4 text-[#0A2342]">
            Ajustes e Preferências
          </h2>
          <div className="space-y-6">
            {/* Opção de Tema */}
            <div>
              <label className="block font-medium mb-2 text-[#0A2342]">Tema do Aplicativo</label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                value={tema}
                onChange={handleTemaChange}
              >
                <option value="claro">Claro</option>
                <option value="escuro">Escuro</option>
              </select>
            </div>

            {/* Notificações */}
            <div>
              <label className="block font-medium mb-2 text-[#0A2342]">Notificações</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={notificacoesAtivas}
                    onChange={(e) => setNotificacoesAtivas(e.target.checked)}
                  />
                  Ativar notificações
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={emailNotificacoes}
                    onChange={(e) => setEmailNotificacoes(e.target.checked)}
                  />
                  Receber via e-mail
                </label>
              </div>
            </div>

            {/* Alterar Senha */}
            <div>
              <label className="block font-medium mb-2 text-[#0A2342]">Alterar Senha</label>
              <input
                type="password"
                placeholder="Nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSalvarSenha}
                className="mt-2 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Salvar Senha
              </button>
            </div>

            {/* Idioma */}
            <div>
              <label className="block font-medium mb-2 text-[#0A2342]">Idioma</label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                value={idioma}
                onChange={handleIdiomaChange}
              >
                <option value="pt-br">Português (BR)</option>
                <option value="en-us">Inglês (US)</option>
                <option value="es">Espanhol</option>
              </select>
            </div>
          </div>
        </div>
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

export default Configuracoes;
