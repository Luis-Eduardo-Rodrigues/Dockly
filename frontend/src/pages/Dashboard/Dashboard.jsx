import { Loader, Brain } from "lucide-react";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Modal from "../../components/Modal/Modal";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  async function gerarCompose() {
    if (!prompt.trim()) {
      setError("Por favor, descreva o ambiente que você precisa.");
      return;
    }

    if (prompt.trim().length < 10) {
      setError(
        "Por favor, forneça uma descrição mais detalhada (mínimo 10 caracteres)."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userId = window.localStorage.getItem("userId");
      const result = await axios.post(
        `http://localhost:5000/gerarCompose/${userId}`,
        {
          promptUser: prompt.trim(),
        }
      );

      setModal({
        title: "✅ Compose gerado com sucesso!",
        message:
          "Seu arquivo docker-compose.yml foi criado e adicionado ao seu histórico.",
        onClose: () => {
          setModal(null);
          window.location.href = "/historico";
        },
      });
      console.log(result.data);
    } catch (error) {
      console.error("Erro completo:", error);
      if (error.response) {
        setError(`${error.response.data.msg}`);
      } else {
        setError("Erro ao gerar compose. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Header />

      <section className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white">
          Gere seu Docker Compose em segundos
        </h2>
        <p className="text-[#a1a1a1] text-lg sm:text-xl leading-relaxed">
          Descreva o ambiente que você precisa e receba automaticamente um
          arquivo <code className="text-[#266aee]">docker-compose.yml</code>{" "}
          completo, pronto para usar.
        </p>
      </section>

      <section className="flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full">
        <div className="flex-1 bg-[#0e0e0e] rounded-xl p-8 shadow-lg shadow-black/20 border border-zinc-800">
          <p className="text-lg font-semibold mb-3">
            Descreva seu ambiente Docker
          </p>

          <textarea
            onChange={(e) => {
              setPrompt(e.target.value);
              setError("");
            }}
            value={prompt}
            className="bg-[#111111] text-[#d1d1d1] rounded-lg w-full h-32 p-4 resize-none outline-none border border-zinc-800 focus:border-[#266aee] placeholder:text-[#666] transition-colors"
            placeholder="Ex: Ambiente com Node.js 20, PostgreSQL 15, Redis para cache e pgAdmin para gerenciar o banco..."
            disabled={loading}
          />

          {error && (
            <div className="mt-2 text-red-400 text-sm flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <div className="flex items-center justify-between mt-2 text-sm text-[#666]">
            <span>{prompt.length}/500</span>
          </div>

          <button
            onClick={gerarCompose}
            disabled={loading || !prompt.trim()}
            className={`w-full mt-4 text-white font-bold py-3 rounded-md transition-all flex items-center justify-center gap-2 ${
              loading || !prompt.trim()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#266aee] hover:bg-[#1f5fd1] hover:cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Gerando Compose...
              </>
            ) : (
              "Gerar Docker Compose"
            )}
          </button>
        </div>

        <aside className="lg:w-80 bg-[#0e0e0e] rounded-xl p-6 border border-zinc-800 shadow-lg shadow-black/20">
          <p className="text-xl font-bold flex items-center gap-2 mb-4">
            <Brain className="text-[#266aee]" />
            Inspire-se:
          </p>

          <div className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-700">
            <p className="text-sm text-[#a1a1a1]">
              <strong>💡 Exemplos de stacks populares:</strong>
            </p>
            <ul className="text-xs text-[#888] mt-2 space-y-1">
              <li>• Node.js + PostgreSQL + pgAdmin</li>
              <li>• Django + MySQL + Redis</li>
              <li>• Next.js + MongoDB + Nginx</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="p-12 bg-[#0b0b0b] border-t border-zinc-800">
        <h2 className="text-white font-extrabold text-4xl text-center mb-10">
          Como o Dockly funciona?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 hover:border-[#266aee] transition-all shadow-lg hover:shadow-[#266aee]/10">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#266aee]/10 text-[#266aee] text-xl font-bold mb-4">
              1
            </div>
            <p className="text-[#f5f5f5] text-lg leading-relaxed">
              Ao criar sua conta, você recebe{" "}
              <span className="text-green-500 font-semibold">
                3 tickets gratuitos
              </span>{" "}
              para testar o Dockly e gerar seus primeiros arquivos{" "}
              <code className="text-[#266aee]">docker-compose.yml</code>.
            </p>
          </div>

          <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 hover:border-[#266aee] transition-all shadow-lg hover:shadow-[#266aee]/10">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#266aee]/10 text-[#266aee] text-xl font-bold mb-4">
              2
            </div>
            <p className="text-[#f5f5f5] text-lg leading-relaxed">
              Use seus tickets para gerar{" "}
              <span className="font-semibold text-[#266aee]">
                ambientes Docker completos
              </span>{" "}
              em poucos segundos. Descreva o que precisa e o Dockly cria tudo
              pra você.
            </p>
          </div>

          <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 hover:border-[#266aee] transition-all shadow-lg hover:shadow-[#266aee]/10">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#266aee]/10 text-[#266aee] text-xl font-bold mb-4">
              3
            </div>
            <p className="text-[#f5f5f5] text-lg leading-relaxed">
              Quando seus tickets acabarem, você pode{" "}
              <span className="text-red-500 font-semibold">
                adquirir novos pacotes
              </span>{" "}
              e continuar criando quantos ambientes quiser — sem limites.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          onClose={modal.onClose}
        />
      )}
    </main>
  );
}
