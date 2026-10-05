const prioridadeEstilo = {
  alta: "bg-red-500/10 text-red-300 ring-1 ring-red-500/20",
  media: "bg-yellow-500/10 text-yellow-200 ring-1 ring-yellow-500/20",
  baixa: "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20",
};

function TaskCard({ titulo, categoria, prioridade, concluida, onToggle, onRemover }) {
  return (
    <article
      className={`rounded-2xl border p-5 shadow-soft transition-all duration-200 ${
        concluida
          ? "border-slate-700 bg-slate-900/70 opacity-70"
          : "border-slate-800 bg-slate-900/80 hover:-translate-y-0.5 hover:border-emerald-500/40"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          {categoria}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${prioridadeEstilo[prioridade]}`}
        >
          {prioridade}
        </span>
      </div>

      <h2
        className={`mb-5 text-lg font-semibold ${
          concluida ? "text-slate-400 line-through" : "text-white"
        }`}
      >
        {titulo}
      </h2>

      <div className="flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={concluida}
            onChange={onToggle}
            className="h-4 w-4 accent-emerald-500"
          />
          Concluída
        </label>

        <button
          onClick={onRemover}
          className="text-xs font-semibold text-red-400 transition hover:text-red-300"
        >
          Remover
        </button>
      </div>
    </article>
  );
}

export default TaskCard;