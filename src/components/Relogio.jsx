import { useState, useEffect } from "react";

function Relogio() {
  const getHoraAtual = () =>
    new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

  const [hora, setHora] = useState(getHoraAtual);

  useEffect(() => {
    console.log("⏰ Relogio MONTADO — intervalo ligado");

    const intervalo = window.setInterval(() => {
      setHora(getHoraAtual());
    }, 1000);

    return () => {
      console.log("⏰ Relogio DESMONTADO — intervalo desligado");
      window.clearInterval(intervalo);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-slate-900/80 px-3 py-1.5 shadow-lg shadow-emerald-500/10">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
      <span className="font-mono text-sm font-semibold tracking-[0.12em] text-emerald-300">
        {hora}
      </span>
    </div>
  );
}

export default Relogio;