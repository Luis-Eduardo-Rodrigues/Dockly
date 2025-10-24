import axios from "axios";
import { Container, History, LogOut, Ticket, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [qtdTicket, setQtdTicket] = useState("0");
  const [userName, setUserName] = useState("");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  }

  useEffect(() => {
    async function getUserData() {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const res = await axios.get(
          `http://localhost:5000/users/tickets/${userId}`
        );

        console.log(res.data);

        // Certifique-se que a resposta contenha ambos os campos:
        // { qtd_ticket: number, nome: string }
        setQtdTicket(res.data.qtd_ticket);
        setUserName(res.data.nome);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }

    getUserData();
  }, []);

  return (
    <header className="flex items-center justify-between p-6 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Container className="w-10 h-10 text-[#266aee]" />
        <a href="/dashboard">
          <h1 className="text-3xl font-bold tracking-tight">Dockly</h1>
        </a>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[#8f8f8f]">
          <User className="w-5 h-5 text-[#266aee]" />
          <span className="hidden sm:inline font-medium">{userName}</span>
        </div>

        <a
          href="/historico"
          className="flex items-center gap-2 text-[#8f8f8f] hover:text-[#266aee] transition-colors"
        >
          <History className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Histórico</span>
        </a>

        <a
          href="/comprar_tickets"
          className="flex items-center gap-2 text-green-500 hover:text-green-700 transition-colors"
        >
          <Ticket className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">
            Tickets: {qtdTicket}
          </span>
        </a>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5 cursor-pointer" />
          <span className="hidden sm:inline font-medium cursor-pointer">
            Sair
          </span>
        </button>
      </div>
    </header>
  );
}
