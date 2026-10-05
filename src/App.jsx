import { useState, useEffect } from "react";
import Header from "./components/Header";
import StatusRede from "./components/StatusRede";
import InstallPrompt from "./components/InstallPrompt";
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
    titulo: "Beber água ",
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
    <div className="min-h-screen bg-slate-100">
      <Header />
      <StatusRede />
      <InstallPrompt />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <TaskForm onAdicionar={adicionarTarefa} />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-700">
            Minhas tarefas ({tarefasFiltradas.length})
          </h2>

          <div className="flex gap-2">
            {FILTROS.map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => setFiltro(opcao.valor)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  filtro === opcao.valor
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-200"
                }`}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2">
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
      </main>
    </div>
  );
}

export default App;