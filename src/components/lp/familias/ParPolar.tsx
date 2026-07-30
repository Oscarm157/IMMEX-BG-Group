// Dos paneles separados por un símbolo. Extraído tal cual del bloque "COVE
// contra factura y contra pedimento" de /lp/cove (v4): dos tarjetas lado a
// lado con un separador "≠".
export function ParPolar({
  items,
  simbolo = "≠",
}: {
  items: readonly { a: string; b: string; texto: string }[];
  simbolo?: string;
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2">
      {items.map((d) => (
        <div key={d.b} className="flex flex-col gap-6 bg-ink px-7 py-10 sm:px-9">
          <div className="flex items-baseline gap-3 font-mono text-[13px] uppercase tracking-[0.14em]">
            <span className="text-chalk">{d.a}</span>
            <span aria-hidden className="text-ash">
              {simbolo}
            </span>
            <span className="text-smoke">{d.b}</span>
          </div>
          <p className="text-[16px] leading-relaxed text-bone/90">{d.texto}</p>
        </div>
      ))}
    </div>
  );
}
