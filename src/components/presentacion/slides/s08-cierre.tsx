import { Slide } from "../Slide";
import { meta } from "../data";

export function S08Cierre() {
  return (
    <Slide centered>
      <div className="relative">
        <div aria-hidden className="grid-field grid-fade absolute inset-x-0 -top-24 -bottom-24 -z-10" />

        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
          En resumen
        </span>

        <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.4rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
          Sitio a la medida, panel propio,{" "}
          <span className="font-serif font-normal italic text-bone">y un plan para atraer clientes.</span>
        </h2>

        <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Sitio", v: "6 páginas ES / EN" },
            { k: "Panel", v: "7 módulos de gestión" },
            { k: "IA", v: "Atiende y genera contenido" },
            { k: "Pauta", v: "Google, LinkedIn y email" },
          ].map((s) => (
            <div key={s.k} className="rounded-[12px] border border-line bg-surface-1 p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">{s.k}</div>
              <div className="mt-2 font-display text-lg text-chalk">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-xl rounded-[14px] border border-dashed border-line bg-surface-1/50 p-6">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            <span aria-hidden className="material-symbols-outlined" style={{ fontSize: 15 }}>draft</span>
            Es una propuesta
          </span>
          <p className="mt-3 text-[14px] leading-relaxed text-bone/85">
            Lo que se muestra es un borrador para revisión, no la versión final. Falta pulir detalles,
            sumar las fotos reales de la firma y los siguientes módulos. Se irá completando.
          </p>
        </div>

        <p className="mt-10 font-mono text-[12px] text-ash">
          {meta.client} · {meta.date}
        </p>
      </div>
    </Slide>
  );
}
