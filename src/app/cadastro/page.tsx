"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Cadastro(){
  const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [nome, SetNome] = useState("");
        const router = useRouter();
    const handleCadastro = async (e: React.FormEvent) => {

      
        e.preventDefault();
        
        if (!nome || nome.length < 3) {
          alert("O nome de usuário deve ter pelo menos 3 caracteres.");
          return;
        }
        if (!password || password.length < 6) {
          alert("A senha deve ter pelo menos 6 caracteres.");
          return;
        }
        Cookies.set("password", password);
        Cookies.set("email", email);
        Cookies.set("nome", nome);
        alert("Usuario cadastrado")
        router.push("/")
      };
     
    return(
        <>
        
        
        <form className="space-y-4" onSubmit={handleCadastro}>
            <div>
              <label className="block text-sm text-gray-700">Nome:</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none text-black"
               value={nome || ""}
               onChange={(e) => SetNome(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">E-mail:</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none text-black"
                value={email || ""} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Senha:</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none text-black"
                value={password || ""} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Confirmar Senha:</label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
            >
              Criar Conta
            </button>
          </form>
        </>
    )
}