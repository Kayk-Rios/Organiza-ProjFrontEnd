"use client";

import { useRouter } from "next/navigation";
import Logout from "../logout/logout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface UserData {
  email: string | undefined;
  password: string | undefined;
  nome: string | undefined;
}

export default function Menu() {
  const router = useRouter(); // Hook deve ser chamado no componente principal
  const [userData, setUserData] = useState<UserData>({ email: "", password: "", nome: "",});
  const handleNavigation = (path: string) => {
    router.push(path); // Navega para a rota especificada
  };

  useEffect(() => {

    const loggedIn = Cookies.get("loggedIn");
    
    if (!loggedIn) {
      router.push("/");
    } else {
      setUserData({
        email: Cookies.get("email"),
        password: Cookies.get("password"),
        nome: Cookies.get("nome"),
      });
    }
  }, [router]);


  return (
    <div>
      <nav className="flex flex-col p-2">
        <button
          onClick={() => handleNavigation("/inicial")}
          className="text-gray-700 hover:text-blue-500 py-2 text-left"
        >
          Início
        </button>
        <button
          onClick={() => handleNavigation("/receitas-despesas")}
          className="text-gray-700 hover:text-blue-500 py-2 text-left"
        >
          Receitas e Despesas
        </button>
        <button
          onClick={() => handleNavigation("/orcamento")}
          className="text-gray-700 hover:text-blue-500 py-2 text-left"
        >
          Orçamento
        </button>
        <button
          onClick={() => handleNavigation("/investimentos")}
          className="text-gray-700 hover:text-blue-500 py-2 text-left"
        >
          Investimentos
        </button>
        <button
          onClick={() => handleNavigation("/configuracoes")}
          className="text-gray-700 hover:text-blue-500 py-2 text-left"
        >
          Configurações
        </button>

        <button
          
          className="text-gray-700 hover:text-blue-500 py-2 text-left"
        >
          Nome: {userData.nome}
        </button>
        <p 
          className="text-gray-700 hover:text-blue-500 py-2 text-left break-words"
        >
        {userData.email}
        </p>
        <Logout />
      </nav>
    </div>
  );
}
