"use client";
import React, { useState } from "react";

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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-4xl mx-auto font-roboto text-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-lg mb-6">
          <button
            onClick={() => console.log("Voltar")}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition"
          >
            ← Voltar
          </button>
          <h1 className="text-lg font-bold">Adicionar Receitas/Despesas</h1>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-md shadow-lg">
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
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } font-semibold`}
            >
              Despesa
            </button>
          </div>

          <h2 className="text-center text-lg font-medium mb-4">
            Adicionar {activeTab === "receita" ? "Receita" : "Despesa"}
          </h2>

          {/* Form */}
          <form className="space-y-4">
            {["valor", "data", "categoria", "conta", "descricao"].map((field) => (
              <div key={field}>
                <label className="block font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
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
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Salvar
            </button>
          </form>
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-6 rounded-md shadow-lg mt-8">
          <h2 className="text-center text-lg font-medium mb-4">
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
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
