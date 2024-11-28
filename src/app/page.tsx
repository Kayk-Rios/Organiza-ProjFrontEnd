"use client";

import React, { useState } from "react";
import Image from "next/image";
import Login from "./login/page";
import Cadastro from "./cadastro/page";

export default function Page() {
  const [isLoginPage, setIsLoginPage] = useState(true); // Estado para alternar entre Login e Cadastro

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
         <Login/>
        ) : (
          // Formulário de Cadastro
          <Cadastro/>
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
