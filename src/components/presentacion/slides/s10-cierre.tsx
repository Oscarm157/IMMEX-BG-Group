import { Slide } from "../Slide";
import { meta } from "../data";

export function S10Cierre() {
  return (
    <Slide centered>
      <div className="relative">
        <div aria-hidden className="grid-field grid-fade absolute inset-x-0 -top-24 -bottom-24 -z-10" />

        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
          Resumen
        </span>

        <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.4rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
          Sitio nuevo, panel propio,{" "}
          <span className="font-serif font-normal italic text-bone">IA operando.</span>
        </h2>

        <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
          {[
            { k: "Sitio", v: "6 páginas ES / EN" },
            { k: "Panel", v: "7 módulos de gestión" },
            { k: "IA", v: "2 puntos activos" },
          ].map((s) => (
            <div key={s.k} className="rounded-[12px] border border-line bg-surface-1 p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">{s.k}</div>
              <div className="mt-2 font-display text-lg text-chalk">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-xl rounded-[14px] border border-dashed border-line bg-surface-1/50 p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Próximos pasos
          </span>
          <p className="mt-3 text-[14px] leading-relaxed text-bone/80">
            Esta sección queda abierta para lo que sigue: fotos reales del cliente, métricas en vivo
            y los siguientes módulos. Se irá completando.
          </p>
        </div>

        <p className="mt-10 font-mono text-[12px] text-ash">
          {meta.client} · {meta.date}
        </p>
      </div>
    </Slide>
  );
}
