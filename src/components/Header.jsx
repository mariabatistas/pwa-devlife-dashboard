import { useState } from "react";
import Relogio from "./Relogio";

function Header() {
  const [mostrarRelogio, setMostrarRelogio] = useState(true);

  return (
    <header className="border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-xl shadow-inner shadow-emerald-500/20">
            ✦
          </div>
          <h1 className="text-xl font-black tracking-tight sm:text-2xl">
            DevLife <span className="text-emerald-400">Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {mostrarRelogio && <Relogio />}
          <button
            onClick={() => setMostrarRelogio(!mostrarRelogio)}
            className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 transition hover:border-emerald-400 hover:text-white"
          >
            {mostrarRelogio ? "Ocultar" : "Relógio"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;