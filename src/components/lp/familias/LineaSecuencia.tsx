// Hitos sobre una regla horizontal. Familia distinta de CadenaConsecuencias
// (que es vertical, con panel de consola): esta corre en fila desde sm,
// cada hito marcado sobre una única línea que atraviesa todos.
export function LineaSecuencia({
  hitos,
}: {
  hitos: readonly { marca: string; titulo: string; desc: string }[];
}) {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
      {hitos.map((h) => (
        <div key={h.marca} className="relative border-t-2 border-accent pt-6">
          <span aria-hidden className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-accent signal-glow" />
          <span className="font-mono text-[12px] tabular-nums text-ash">{h.marca}</span>
          <h3 className="mt-2 font-display text-[18px] font-medium leading-snug tracking-[-0.015em] text-chalk">
            {h.titulo}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-bone/85">{h.desc}</p>
        </div>
      ))}
    </div>
  );
}
