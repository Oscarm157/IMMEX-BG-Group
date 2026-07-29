import { Reveal } from "@/components/site/Reveal";
import { Seccion } from "./Seccion";
import { CREDENCIALES_HERO } from "./constantes";

// 1 · Entrada: tipográfica, con la tira de credenciales en mono. El pt
// superior deja pasar la nav fija (h-20 en móvil, h-[100px] desde sm).
export function HeroPauta({
  eyebrow,
  h1,
  lead,
  medida = "18ch",
}: {
  eyebrow: string;
  h1: string;
  lead: string;
  medida?: string;
}) {
  return (
    <Seccion variant="grid-oscuro" className="pb-14 pt-32 sm:pb-20 sm:pt-40">
      <Reveal>
        <span className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        {/* max-width varía por landing (18ch/19ch): inline style porque Tailwind
            no puede generar una clase arbitraria a partir de un valor dinámico. */}
        <h1
          className="mt-6 text-balance font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-chalk"
          style={{ maxWidth: medida }}
        >
          {h1}
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-7 max-w-xl border-l-2 border-accent pl-5 text-[18px] leading-relaxed text-bone/90">{lead}</p>
      </Reveal>
      <Reveal delay={0.22}>
        <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-smoke">
          {CREDENCIALES_HERO.flatMap((c, i) => [
            i > 0 ? (
              <li aria-hidden key={`sep-${c}`} className="text-line">
                /
              </li>
            ) : null,
            <li key={c}>{c}</li>,
          ]).filter(Boolean)}
        </ul>
      </Reveal>
    </Seccion>
  );
}
