import { useState, useEffect } from "react";
import Header from "./components/Header";
import StatusRede from "./StatusRede";
import InstallPrompt from "./InstallPrompt";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

const TAREFAS_INICIAIS = [
  {
    id: 1,
    titulo: "Estudar componentes do React",
    categoria: "Estudos",
    prioridade: "alta",
    concluida: false,
  },
  {
    id: 2,
    titulo: "Configurar o Tailwind no projeto",
    categoria: "Projeto",
    prioridade: "media",
    concluida: true,
  },
  {
    id: 3,
    titulo: "Beber água",
    categoria: "Saúde",
    prioridade: "baixa",
    concluida: false,
  },
];

const FILTROS = [
  { valor: "todas", rotulo: "Todas" },
  { valor: "pendentes", rotulo: "Pendentes" },
  { valor: "concluidas", rotulo: "Concluídas" },
];

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("devlife-tarefas");
    return salvas ? JSON.parse(salvas) : TAREFAS_INICIAIS;
  });

  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    localStorage.setItem("devlife-tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa(novaTarefa) {
    setTarefas((atual) => [
      ...atual,
      { ...novaTarefa, id: Date.now(), concluida: false },
    ]);
  }

  function alternarConcluida(id) {
    setTarefas((atual) =>
      atual.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  }

  function removerTarefa(id) {
    setTarefas((atual) => atual.filter((t) => t.id !== id));
  }

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "pendentes") return !t.concluida;
    if (filtro === "concluidas") return t.concluida;
    return true;
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#020617_45%,_#020617_100%)] text-slate-100">
      <Header />
      <StatusRede />
      <InstallPrompt />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur-sm sm:p-6">
          <TaskForm onAdicionar={adicionarTarefa} />
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
              painel
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              Minhas tarefas
              <span className="ml-2 text-sm font-semibold text-slate-300">
                ({tarefasFiltradas.length})
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTROS.map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => setFiltro(opcao.valor)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  filtro === opcao.valor
                    ? "border-emerald-500 bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30"
                    : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-emerald-400 hover:text-white"
                }`}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </div>

        {tarefasFiltradas.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-10 text-center text-slate-300">
            Nenhuma tarefa nesta categoria.
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tarefasFiltradas.map((tarefa) => (
              <TaskCard
                key={tarefa.id}
                titulo={tarefa.titulo}
                categoria={tarefa.categoria}
                prioridade={tarefa.prioridade}
                concluida={tarefa.concluida}
                onToggle={() => alternarConcluida(tarefa.id)}
                onRemover={() => removerTarefa(tarefa.id)}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;