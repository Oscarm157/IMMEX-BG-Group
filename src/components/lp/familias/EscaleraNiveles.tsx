// Niveles ascendentes asimétricos. Familia distinta de CadenaConsecuencias
// (escalera sin panel de consola ni numeración circular): cada nivel se
// desplaza un poco más que el anterior, sin repetir la misma sangría en los tres.
const SANGRIA_NIVEL = ["", "sm:pl-8", "sm:pl-16", "sm:pl-24"];

export function EscaleraNiveles({
  niveles,
}: {
  niveles: readonly { nivel: string; titulo: string; desc: string }[];
}) {
  return (
    <div className="flex flex-col gap-8">
      {niveles.map((n, i) => (
        <div key={n.nivel} className={`border-l-2 border-accent/70 pl-5 ${SANGRIA_NIVEL[i] ?? ""}`}>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{n.nivel}</span>
          <h3 className="mt-2 font-display text-[19px] font-medium leading-snug tracking-[-0.015em] text-chalk">
            {n.titulo}
          </h3>
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-bone/85">{n.desc}</p>
        </div>
      ))}
    </div>
  );
}
