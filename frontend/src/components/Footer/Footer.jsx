import { Container, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] border-t border-zinc-800 py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-[#eaeaea]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Container className="w-6 h-6 text-[#266aee]" />
            <span className="text-xl font-bold text-white">Dockly</span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Gere e gerencie ambientes Docker em segundos. Dockly é o jeito mais
            rápido e inteligente de criar seu <code>docker-compose.yml</code>.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navegação</h4>
          <ul className="flex flex-col gap-2 text-sm text-zinc-400">
            <li>
              <a href="/historico" className="hover:text-[#266aee] transition">
                Histórico de Geração
              </a>
            </li>
            <li>
              <a
                href="/comprar_tickets"
                className="hover:text-[#266aee] transition"
              >
                Comprar Tickets
              </a>
            </li>
            <li>
              <a href="/suporte" className="hover:text-[#266aee] transition">
                Suporte
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Conecte-se</h4>
          <div className="flex gap-4">
            <a
              href=""
              target="_blank"
              className="p-2 rounded-lg border border-zinc-800 hover:border-[#266aee] hover:text-[#266aee] transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href=""
              target="_blank"
              className="p-2 rounded-lg border border-zinc-800 hover:border-[#266aee] hover:text-[#266aee] transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href=""
              target="_blank"
              className="p-2 rounded-lg border border-zinc-800 hover:border-[#266aee] hover:text-[#266aee] transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href=""
              target="_blank"
              className="p-2 rounded-lg border border-zinc-800 hover:border-[#266aee] hover:text-[#266aee] transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-800 pt-4 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Dockly — Todos os direitos reservados.
      </div>
    </footer>
  );
}
