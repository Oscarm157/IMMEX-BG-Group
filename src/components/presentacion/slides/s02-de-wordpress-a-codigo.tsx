import { Slide } from "../Slide";
import { SlideHead } from "../ui";

export function S02DeWordpressACodigo() {
  return (
    <Slide centered>
      <SlideHead
        index="01"
        eyebrow="El porqué"
        title="De WordPress a código a la medida."
        lead="El sitio actual está hecho en WordPress. Cumple, pero está atado a una plantilla y a plugins de terceros. La propuesta es un sitio desarrollado a la medida, con un grado de control y personalización mucho mayor."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="console-panel flex flex-col rounded-[14px] bg-surface-1 p-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Hoy</span>
          <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.01em] text-bone">
            WordPress
          </h3>
          <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-5 text-[14px] text-bone/80">
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-smoke" />
              Atado a una plantilla y a plugins de terceros
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-smoke" />
              Personalizar a fondo es costoso y limitado
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-smoke" />
              El desempeño depende de los plugins instalados
            </li>
          </ul>
        </div>

        <div className="console-panel flex flex-col rounded-[14px] bg-surface-1 p-7">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
            La propuesta
          </span>
          <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.01em] text-chalk">
            Código a la medida
          </h3>
          <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-5 text-[14px] text-bone/90">
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Desarrollado a mano, control total del sitio
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Se ajusta cualquier detalle, sin límites de plantilla
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Más rápido y con un panel de gestión propio
            </li>
          </ul>
        </div>
      </div>
    </Slide>
  );
}
