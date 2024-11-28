"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
    
  
      const storedUseremail = Cookies.get("email");
      const storedPassword = Cookies.get("password");

       if (email === storedUseremail  && password === storedPassword) {
        alert("login bem sucedido")
        Cookies.set("loggedIn", "true")
        router.push("/investimentos")
       }
    };
   
    


    return(
        <>
         <form className="space-y-4"  onSubmit={handleSubmit}>
            <div>
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

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
            >
            Entrar
            </button>
          </form>
        </>
    )
}