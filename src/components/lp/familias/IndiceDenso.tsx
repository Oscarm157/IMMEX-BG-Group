// Índice tipográfico denso en mono, sin tarjetas. Familia distinta de las
// demás: es la más comprimida, pensada para recapitular referencias (normas,
// documentos, términos) ya mencionadas en el resto de la página.
export function IndiceDenso({ entradas }: { entradas: readonly { clave: string; nota?: string }[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-3 border-t border-line pt-8 font-mono text-[13px] sm:grid-cols-2">
      {entradas.map((e) => (
        <li key={e.clave} className="flex flex-wrap items-baseline gap-x-2 py-1.5">
          <span aria-hidden className="text-accent">
            ·
          </span>
          <span className="text-bone/90">{e.clave}</span>
          {e.nota && <span className="text-ash">/ {e.nota}</span>}
        </li>
      ))}
    </ul>
  );
}
