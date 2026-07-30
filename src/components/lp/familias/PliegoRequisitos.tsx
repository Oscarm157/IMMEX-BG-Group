// Pliego a dos columnas, dt/dd, sin cajas. Familia distinta de CausasConPanel
// (que también usa dt/dd, pero dentro de filas de expediente numeradas): aquí
// es una lista de requisitos plana, clave contra valor.
export function PliegoRequisitos({ filas }: { filas: readonly { clave: string; valor: string }[] }) {
  return (
    <dl className="border-t border-line">
      {filas.map((f) => (
        <div
          key={f.clave}
          className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8 sm:py-6"
        >
          <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-ash sm:pt-0.5">{f.clave}</dt>
          <dd className="text-[16px] leading-relaxed text-bone/90">{f.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
