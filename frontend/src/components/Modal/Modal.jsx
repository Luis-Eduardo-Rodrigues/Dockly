export default function Modal({ title, message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-2xl shadow-lg shadow-black/50 w-[90%] max-w-md p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-[#b1b1b1] mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#266aee] hover:bg-[#1f5fd1] text-white font-semibold py-2 px-6 rounded-lg transition-all"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
