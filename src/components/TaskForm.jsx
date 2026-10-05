import { useState } from "react";

function TaskForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Estudos");
  const [prioridade, setPrioridade] = useState("media");

  function aoEnviar(evento) {
    evento.preventDefault();
    const texto = titulo.trim();
    if (!texto) return;

    onAdicionar({ titulo: texto, categoria, prioridade });
    setTitulo("");
  }

  return (
    <form
      onSubmit={aoEnviar}
      className="flex flex-col gap-4 rounded-2xl bg-slate-950/60 p-4 sm:p-5 lg:flex-row lg:items-end"
    >
      <div className="flex-1 min-w-0">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Nova tarefa
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="O que precisa ser feito?"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      <div className="min-w-[150px]">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Categoria
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <option>Estudos</option>
          <option>Projeto</option>
          <option>Saúde</option>
          <option>Pessoal</option>
        </select>
      </div>

      <div className="min-w-[150px]">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Prioridade
        </label>
        <select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
      >
        + Adicionar
      </button>
    </form>
  );
}

export default TaskForm;