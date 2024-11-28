
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dados() {
  const router = useRouter();

  const handleLogout = () => {
    // Remover cookies
    Cookies.remove("email");
    Cookies.remove("password");
    Cookies.remove("nome")
    Cookies.remove("loggedIn");

    // Redirecionar para a página de login
    router.push("/");
  };

  return (
    <div>
      {Cookies.get("username")}
      <button onClick={handleLogout} className="text-black">Logout</button>
    </div>
  );
}
