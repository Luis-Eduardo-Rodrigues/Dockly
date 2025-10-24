import { Zap, Star, Crown } from "lucide-react";
import Header from "../../components/Header/Header";

export default function Tickets() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Header />

      <section className="p-6 sm:p-12 max-w-6xl mx-auto">
        <header className="mb-10">
          <h2 className="text-4xl font-extrabold mb-3">Escolha um pacote</h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Selecione a quantidade de tickets que melhor atende suas
            necessidades
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <div className="card w-72 bg-[#111] p-6 rounded-xl border border-zinc-800 hover:border-[#266aee]/60 transition-all flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-7 h-7 p-1 rounded-md bg-zinc-900 text-[#266aee]" />
              <h3 className="font-bold text-xl">Basic</h3>
            </div>
            <p className="text-2xl font-extrabold text-white">R$ 9,99</p>
            <p className="text-zinc-400 text-sm">Ideal para uso leve</p>
            <div className="pt-3">
              <span className="text-3xl font-extrabold text-[#266aee]">
                10{" "}
                <span className="text-lg text-zinc-500 font-normal">
                  tickets
                </span>
              </span>
            </div>
            <button className="mt-4 w-full py-2 bg-[#266aee] hover:bg-[#1f56c2] font-bold rounded-md transition-colors cursor-pointer">
              Comprar
            </button>
          </div>

          <div className="card w-72 bg-[#131313] p-6 rounded-xl border border-[#266aee]/70 shadow-md shadow-[#266aee]/10 transition-all flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Star className="w-7 h-7 p-1 rounded-md bg-[#266aee]/10 text-[#266aee]" />
              <h3 className="font-bold text-xl">Pro</h3>
            </div>
            <p className="text-2xl font-extrabold text-white">R$ 19,99</p>
            <p className="text-zinc-400 text-sm">
              Perfeito para desenvolvedores frequentes
            </p>
            <div className="pt-3">
              <span className="text-3xl font-extrabold text-[#266aee]">
                50{" "}
                <span className="text-lg text-zinc-500 font-normal">
                  tickets
                </span>
              </span>
            </div>
            <button className="mt-4 w-full py-2 bg-[#266aee] hover:bg-[#1f56c2] font-bold rounded-md transition-colors cursor-pointer">
              Comprar
            </button>
          </div>

          <div className="card w-72 bg-[#111] p-6 rounded-xl border border-zinc-800 hover:border-[#ffd700]/50 transition-all flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Crown className="w-7 h-7 p-1 rounded-md bg-[#ffd700]/10 text-[#ffd700]" />
              <h3 className="font-bold text-xl">Master</h3>
            </div>
            <p className="text-2xl font-extrabold text-white">R$ 29,99</p>
            <p className="text-zinc-400 text-sm">
              Para uso ilimitado e intensivo
            </p>
            <div className="pt-3">
              <span className="text-3xl font-extrabold text-[#ffd700]">
                150{" "}
                <span className="text-lg text-zinc-500 font-normal">
                  tickets
                </span>
              </span>
            </div>
            <button className="mt-4 w-full py-2 bg-[#ffd700] hover:bg-[#e6c400] text-black font-bold rounded-md transition-colors cursor-pointer">
              Comprar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
