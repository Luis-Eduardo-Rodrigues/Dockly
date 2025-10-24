import { File, Download, Trash2, Edit } from "lucide-react";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    const fetchComposes = async () => {
      if (!userId) {
        alert("id não encontrado");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/composes/${userId}`
        );
        const data = await response.json();

        if (data && typeof data === "object") {
          if (Array.isArray(data.composes)) {
            setHistorico(data.composes);
          } else {
            setHistorico([data.composes]);
          }
        } else {
          setHistorico([]);
        }
      } catch (error) {
        console.log(error);
        setHistorico([]);
      }
    };

    fetchComposes();
  }, [userId]);

  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dataString;
    }
  };

  const handleDownload = (ymlContent, fileName = "docker-compose.yml") => {
    const blob = new Blob([ymlContent], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  async function deletarCompose(idcompose) {
    try {
      const idUser = window.localStorage.getItem("userId");
      const idCompose = idcompose;
      const result = await axios.delete(
        `http://localhost:5000/composes/${idUser}/${idCompose}`
      );

      window.location.reload();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Header />

      <section className="p-12">
        <h2 className="text-3xl text-white font-extrabold mb-2">
          Histórico de Gerações
        </h2>
        <p className="text-[#a1a1a1] text-lg sm:text-xl leading-relaxed">
          Acesse e gerencie todos os arquivos{" "}
          <code className="bg-zinc-800 px-2 py-1 rounded text-sm">
            docker-compose.yml
          </code>{" "}
          que você criou.
        </p>
      </section>

      <section className="px-12 pb-16 flex flex-wrap justify-center gap-6">
        {historico.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#a1a1a1] text-lg">
              Nenhum compose encontrado no histórico.
            </p>
          </div>
        ) : (
          historico.map((compose) => (
            <div
              key={compose.id}
              className="card w-full sm:w-[350px] p-6 rounded-2xl bg-[#101010] border border-zinc-800 shadow-md hover:shadow-lg hover:border-[#266aee]/60 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <File className="w-12 h-12 bg-[#0b1b22] text-[#019fdf] rounded-xl p-2 border border-zinc-700" />
                <p className="font-bold text-lg line-clamp-2">
                  {compose.prompt && compose.prompt.length > 50
                    ? `${compose.prompt.substring(0, 50)}...`
                    : compose.prompt}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-400 mt-4">
                <span>{formatarData(compose.createdAt)}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleDownload(compose.yml, `docker-compose.yml`)
                    }
                    title="Baixar arquivo"
                    className="p-2 rounded-md hover:bg-[#266aee]/20 hover:text-[#266aee] transition"
                  >
                    <Download className="w-4 h-4 cursor-pointer" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-green-500/20 hover:text-green-400 transition">
                    <Edit className="w-4 h-4 cursor-pointer" />
                  </button>
                  <button
                    onClick={() => deletarCompose(compose.id)}
                    title="Excluir"
                    className="p-2 rounded-md hover:bg-red-500/20 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
