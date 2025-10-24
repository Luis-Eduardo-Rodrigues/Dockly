import axios from "axios";
import { Container } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  async function criarNovoUser() {
    try {
      const res = await axios.post("http://localhost:5000/cadastrar", {
        email_user: email,
        nome_user: nome,
        senha: senha,
      });

      window.localStorage.setItem("userId", res.data.user.id_user);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="h-screen flex items-center justify-center flex-col bg-[#0f0f10]">
      <div className="flex items-center flex-col">
        <div>
          <Container className="w-16 h-16 rounded-full bg-[#266aee] text-white p-2" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mt-2">
            Dockly - Criar conta
          </h2>
        </div>
      </div>
      <div className="form flex items-center flex-col gap-8 mt-4">
        <div className="flex justify-center flex-col gap-2">
          <label className="text-white font-medium" htmlFor="">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="seu@email.com"
            className="w-72 border-1 border-white  px-4 py-2 rounded-sm bg-[#1b1b1b] text-white"
          />
        </div>
        <div className="flex justify-center flex-col gap-2">
          <label className="text-white font-medium" htmlFor="">
            Nome
          </label>
          <input
            onChange={(e) => setNome(e.target.value)}
            type="text"
            placeholder="Seu Nome Completo"
            className="w-72 border-1 border-white  px-4 py-2 rounded-sm bg-[#1b1b1b] text-white"
          />
        </div>
        <div className="flex justify-center flex-col gap-2">
          <label className="text-white font-medium" htmlFor="">
            Senha
          </label>
          <input
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            placeholder="*******"
            className="w-72 border-1 border-white px-4 py-2 rounded-sm bg-[#1b1b1b] text-white"
          />
        </div>
        <div>
          <button
            onClick={() => criarNovoUser()}
            className="w-72 py-2 rounded-sm bg-[#266aee] text-white font-bold cursor-pointer transition-colors hover:bg-[#285cbf]"
          >
            Criar conta
          </button>
        </div>
        <div>
          <div>
            <p className="text-center mb-4 text-[#616060] font-semibold">
              OU CRIAR COM{" "}
            </p>
          </div>
          <div className="flex items-center">
            <button className="flex items-center justify-center rounded-sm w-full py-2 text-white text-sm bg-[#1b1b1b] transition-colors hover:bg-[#303030] cursor-pointer font-semibold border-1 border-white">
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>{" "}
              Github
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="font-medium text-white">
              Já tem uma conta?{" "}
              <a
                href="/"
                className="font-bold text-[#266aee] cursor-pointer hover:underline"
              >
                Entrar
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
