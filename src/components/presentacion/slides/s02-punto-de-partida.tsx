import { Slide } from "../Slide";
import { SlideHead } from "../ui";

export function S02PuntoDePartida() {
  return (
    <Slide centered>
      <SlideHead
        index="01"
        eyebrow="El punto de partida"
        title="De una landing de evento a una plataforma."
        lead="El sitio anterior era una página única para el Foro IMMEX: servía para un evento, no para la firma. La renovación lo convierte en la cara digital de BG Consulting Group y en una herramienta de trabajo para el equipo."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="console-panel flex flex-col rounded-[14px] bg-surface-1 p-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Antes</span>
          <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.01em] text-bone">
            Landing de un solo uso
          </h3>
          <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-5 text-[14px] text-bone/80">
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-smoke" />
              Una sola página, atada al Foro IMMEX
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-smoke" />
              Sin SEO ni contenido propio
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-smoke" />
              Nada que el equipo pudiera editar
            </li>
          </ul>
        </div>

        <div className="console-panel flex flex-col rounded-[14px] bg-surface-1 p-7">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
            Ahora
          </span>
          <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.01em] text-chalk">
            Sitio de firma + panel
          </h3>
          <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-5 text-[14px] text-bone/90">
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Seis páginas bilingües ES / EN
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              SEO, velocidad y blog propio
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Panel de gestión comercial y de contenido
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] text-ash">
        El Foro IMMEX queda archivado en /foro, no se borró.
      </p>
    </Slide>
  );
}
