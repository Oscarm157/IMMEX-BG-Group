import { Slide } from "../Slide";
import { meta } from "../data";

export function S01Portada() {
  return (
    <Slide centered>
      <div className="relative">
        <div aria-hidden className="grid-field grid-fade absolute inset-x-0 -top-24 -bottom-24 -z-10" />
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
          {meta.client}
          <span className="text-smoke">· Propuesta de sitio web</span>
        </div>

        <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.92] tracking-[-0.035em] text-chalk">
          Renovación{" "}
          <span className="font-serif font-normal italic text-bone">digital.</span>
        </h1>

        <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-bone/90">
          Una propuesta de sitio nuevo y un panel de gestión para la firma. Un recorrido por la
          dirección visual, los módulos y la atención con inteligencia artificial.
        </p>

        <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-1 px-4 py-2 text-[12.5px] text-bone/80">
          <span aria-hidden className="material-symbols-outlined text-accent" style={{ fontSize: 15 }}>draft</span>
          Borrador para revisión. Falta pulir y mejorar.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.14em] text-smoke">
          <span className="text-bone">{meta.date}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          <span>Presentación interna</span>
        </div>

        <p className="mt-12 font-mono text-[11px] text-ash">
          Avanza con → o la barra espaciadora · F para pantalla completa
        </p>
      </div>
    </Slide>
  );
}
