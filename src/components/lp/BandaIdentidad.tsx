import { Logo } from "@/components/Logo";
import { Seccion } from "./Seccion";
import { CIFRAS, AREAS } from "./constantes";

// Banda de identidad de la firma: arriba el renglón de identidad (logo y las
// tres cifras), abajo el texto y las áreas. Sin títulos display ni tarjetas,
// sin numerar. Orden canónico: siempre al final, justo antes de la barra
// móvil, con borde superior únicamente (no border-y: es la última banda).
export function BandaIdentidad() {
  return (
    <Seccion variant="banda-oscura" borde="t" className="py-14 sm:py-16">
      <div className="flex flex-col gap-9 border-b border-line pb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        {/* self-start: sin él, el flex en columna estira la imagen a lo ancho
            del contenedor y la deforma en móvil. */}
        <Logo variant="bg" tone="light" size="lg" className="h-14 w-auto self-start sm:h-16" />
        {/* En móvil las tres cifras se apilan y comparten columna (contents),
            para que los pies arranquen a la misma altura pese a que "20" es
            más ancho que "8". Desde sm quedan en fila. */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-10 lg:gap-x-16">
          {CIFRAS.map((c) => (
            <div key={c.cifra} className="contents sm:block">
              <span className="font-display text-[clamp(2.4rem,6vw,3.25rem)] font-medium leading-none tracking-[-0.03em] tabular-nums text-chalk">
                {c.cifra}
              </span>
              <p className="font-mono text-[12px] leading-relaxed text-smoke sm:mt-3 sm:max-w-[17ch]">{c.pie}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,9fr)] lg:gap-16">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">La firma</span>
          <p className="mt-5 text-[17px] leading-relaxed text-bone/90">
            Firma de consultoría legal especializada en comercio exterior, en materia fiscal, aduanera y de tecnologías
            de la información.
          </p>
        </div>
        <div className="lg:pt-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">Áreas de práctica</span>
          {/* Flujo por columna para que las reglas de las dos columnas queden
              a la misma altura aunque un área ocupe dos renglones. */}
          <ul className="mt-5 grid gap-x-10 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
            {AREAS.map((a) => (
              <li key={a} className="border-t border-line py-2.5 text-[15px] leading-snug text-bone/85">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Seccion>
  );
}
