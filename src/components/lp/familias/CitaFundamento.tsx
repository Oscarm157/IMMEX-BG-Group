// Una cita a tamaño display + glosa en mono, banda completa (fondo propio de
// borde a borde del contenedor). Familia distinta de las demás: aquí no hay
// lista ni comparación, es una sola afirmación llevada al frente.
export function CitaFundamento({ cita, texto }: { cita: string; texto: string }) {
  return (
    <div className="rounded-[16px] border border-line bg-surface-1 px-6 py-14 sm:px-10 sm:py-16">
      <p className="max-w-3xl text-balance font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-chalk">
        {cita}
      </p>
      <p className="mt-6 max-w-xl font-mono text-[13px] leading-relaxed text-smoke">{texto}</p>
    </div>
  );
}
