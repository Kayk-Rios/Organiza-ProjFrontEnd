"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Page() {
  const [isLoginPage, setIsLoginPage] = useState(true); // Estado para alternar entre Login e Cadastro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Hook para redirecionar

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Não faz o redirecionamento automaticamente
      });

      if (result?.error) {
        alert("Falha na autenticação. Tente novamente.");
      } else {
        console.log("Usuário autenticado:", email);
        router.push("/investimentos/page.tsx");
      }
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      {/* Logo centralizada */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-40 h-40 sm:w-52 sm:h-52"> {/* Ajuste para diferentes tamanhos de tela */}
          <Image
            src="/assets/LOGOsemfundoEnome.png"
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <span className="font-poppins text-center text-gray-800 text-sm sm:text-base">
          Transforme seu cenário financeiro: o primeiro passo começa aqui.
        </span>
      </div>

      {/* Card de Login ou Cadastro */}
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gradient-to-b from-green-100 to-green-500 sm:max-w-lg lg:max-w-xl">
        {isLoginPage ? (
          // Formulário de Login
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-gray-700">E-mail:</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Senha:</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-green-700 hover:underline">
                Esqueci minha senha
              </a>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
            >
              Entrar
            </button>
          </form>
        ) : (
          // Formulário de Cadastro
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Nome:</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">E-mail:</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Senha:</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
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
        )}

        <p className="mt-4 text-center text-sm text-gray-800">
          {isLoginPage ? (
            <>
              Não possui cadastro?{" "}
              <span
                onClick={() => setIsLoginPage(false)}
                className="text-green-700 font-semibold hover:underline cursor-pointer"
              >
                Inscreva-se gratuitamente
              </span>
            </>
          ) : (
            <>
              Já possui conta?{" "}
              <span
                onClick={() => setIsLoginPage(true)}
                className="text-green-700 font-semibold hover:underline cursor-pointer"
              >
                Faça login
              </span>
            </>
          )}
        </p>
      </div>

      {/* Rodapé */}
      <footer className="mt-8 w-full bg-gray-100 py-4 text-center">
        <div className="flex flex-wrap items-center justify-center space-x-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Sobre nós
          </a>
          <a href="#" className="hover:underline">
            Política de privacidade
          </a>
          <a href="#" className="hover:underline">
            Termos de uso
          </a>
          <a href="#" className="hover:underline">
            Fale conosco
          </a>
        </div>
      </footer>
    </div>
  );
}
