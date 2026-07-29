import { SectionHeading } from "@/components/site/SectionHeading";
import { LeadPanel } from "./LeadPanel";
import { Seccion } from "./Seccion";
import type { Causa } from "./tipos";

// 2 · Causas y captura, sobre banda de fondo propia. Las causas son filas de
// expediente en la columna ancha; el formulario ocupa la angosta y es sticky
// dentro de su columna, no a la altura de la página.
export function CausasConPanel({
  index,
  eyebrow,
  title,
  lead,
  etiquetas = ["Qué ocurre", "Qué se hace"],
  items,
  campaign,
  alcance,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  etiquetas?: readonly [string, string];
  items: readonly Causa[];
  campaign: string;
  alcance: readonly string[];
}) {
  return (
    <Seccion variant="banda-oscura" className="pb-20 pt-16 sm:pt-20">
      <div className="grid grid-cols-12 gap-x-6 gap-y-14 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-8">
          <SectionHeading eyebrow={eyebrow} index={index} title={title} lead={lead} className="mb-14" />
          <div className="border-t border-line">
            {items.map((c, i) => (
              <div key={c.titulo} className="grid gap-6 border-b border-line py-9">
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[12px] tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[20px] font-medium leading-snug tracking-[-0.02em] text-chalk sm:text-[22px]">
                      {c.titulo}
                    </h3>
                  </div>
                  <p className="mt-4 pl-8 font-mono text-[12px] leading-relaxed text-smoke">{c.fundamento}</p>
                </div>
                <dl className="flex flex-col gap-4 pl-8">
                  {(
                    [
                      [etiquetas[0], c.ocurre],
                      [etiquetas[1], c.hace],
                    ] as const
                  ).map(([etiqueta, texto]) => (
                    <div key={etiqueta} className="grid gap-1 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-5">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash sm:pt-1">{etiqueta}</dt>
                      <dd className="text-[16px] leading-relaxed text-bone/90">{texto}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>

        {/* scroll-mt: la nav es fija, el ancla #form de la barra móvil tiene
            que caer por debajo de ella. */}
        <div id="form" className="col-span-12 scroll-mt-28 sm:scroll-mt-32 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <LeadPanel campaign={campaign} alcance={alcance} />
          </div>
        </div>
      </div>
    </Seccion>
  );
}
