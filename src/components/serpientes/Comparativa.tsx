import { Reveal } from "@/components/site/Reveal";
import { COMPARATIVA, REDES_RIVALES } from "@/content/serpientes-plan";

function n(num: number) {
  return num.toLocaleString("es-MX");
}

const EQUIPOS = COMPARATIVA.equipos.map((e) => {
  const redes =
    REDES_RIVALES.equipos[e.nombre as keyof typeof REDES_RIVALES.equipos];
  return {
    nombre: e.nombre,
    corto: e.nombre.split(" ")[0],
    resumen: e.resumen,
    fortalezas: e.fortalezas,
    ig: redes.instagram.seguidores,
    fb: redes.facebook.meGusta,
    destacado: "destacado" in e && e.destacado === true,
  };
});

const SERPIENTES = EQUIPOS.find((e) => e.destacado)!;
const RIVALES = EQUIPOS.filter((e) => !e.destacado);

type Fila = { corto: string; valor: number; pct: number; destacado: boolean };

function GrupoMetrica({
  titulo,
  sufijo,
  filas,
}: {
  titulo: string;
  sufijo: string;
  filas: Fila[];
}) {
  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between border-b border-[var(--st-line)] pb-3">
        <span className="st-eyebrow text-[12px] tracking-[0.18em] text-[var(--st-chalk)]">
          {titulo}
        </span>
        <span className="st-eyebrow text-[10px] tracking-[0.16em] text-[var(--st-ash)]">
          {sufijo}
        </span>
      </div>
      <div className="grid gap-4">
        {filas.map((f, i) => (
          <Reveal
            key={f.corto}
            delay={i * 0.08}
            className="grid grid-cols-[5.5rem_1fr] items-center gap-4 sm:grid-cols-[7rem_1fr]"
          >
            <span
              className={`st-eyebrow text-[12px] leading-tight ${
                f.destacado ? "text-[var(--st-gold)]" : "text-[var(--st-bone)]"
              }`}
            >
              {f.corto}
            </span>
            <div className="flex items-center gap-3">
              <div className="h-5 flex-1 bg-[var(--st-void)]">
                <div
                  className={`st-bar-track ${
                    f.destacado ? "bg-[var(--st-gold)]" : "bg-[var(--st-bone)]/45"
                  }`}
                  style={{ width: `${f.pct}%` }}
                />
              </div>
              <span
                className={`w-16 shrink-0 text-right text-[15px] leading-none [font-family:var(--font-plex-mono)] sm:w-20 sm:text-[17px] ${
                  f.destacado ? "text-[var(--st-gold)]" : "text-[var(--st-chalk)]"
                }`}
              >
                {n(f.valor)}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Comparativa() {
  const maxIg = Math.max(...EQUIPOS.map((e) => e.ig));
  const maxFb = Math.max(...EQUIPOS.map((e) => e.fb));
  const filasIg: Fila[] = EQUIPOS.map((e) => ({
    corto: e.corto,
    valor: e.ig,
    pct: (e.ig / maxIg) * 100,
    destacado: e.destacado,
  }));
  const filasFb: Fila[] = EQUIPOS.map((e) => ({
    corto: e.corto,
    valor: e.fb,
    pct: (e.fb / maxFb) * 100,
    destacado: e.destacado,
  }));

  return (
    <section className="st-band st-band-surface border-t border-[var(--st-line)] px-6 py-24 md:px-10 md:py-32">
      <span className="st-ghostnum -top-8 right-2 md:right-8" aria-hidden>
        {COMPARATIVA.numero}
      </span>
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-14 flex items-baseline gap-x-5 md:mb-20">
          <span className="st-display text-[clamp(34px,5.4vw,68px)] leading-none text-[var(--st-gold)]">
            {COMPARATIVA.numero}
          </span>
          <h2 className="st-display text-[clamp(24px,3.8vw,44px)] text-[var(--st-chalk)]">
            {COMPARATIVA.titulo}
          </h2>
        </Reveal>

        {/* Data-viz versus: hace visible el tamaño real del rezago. */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <GrupoMetrica titulo="Instagram" sufijo="seguidores" filas={filasIg} />
          <GrupoMetrica titulo="Facebook" sufijo="me gusta" filas={filasFb} />
        </div>
        <p className="mt-6 text-[11px] text-[var(--st-ash)]">
          {REDES_RIVALES.fuente}.
        </p>

        {/* Lectura cualitativa: 1 destacado + 2 rivales, no tres tarjetas gemelas. */}
        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-[1.35fr_1fr] md:gap-8">
          <Reveal>
            <article className="flex h-full flex-col border border-[var(--st-gold)] bg-[var(--st-void)] p-8 md:p-10">
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-[var(--st-line)] pb-6">
                <h3 className="st-display text-[26px] leading-none text-[var(--st-gold)] md:text-[34px]">
                  {SERPIENTES.nombre}
                </h3>
                <span className="st-eyebrow shrink-0 text-[11px] text-[var(--st-gold)]">
                  Nosotros
                </span>
              </div>
              <p className="text-[15px] leading-[1.65] text-[var(--st-bone)] md:text-[16px]">
                {SERPIENTES.resumen}
              </p>
              <ul className="mt-8 grid gap-3 border-t border-[var(--st-line)] pt-8 sm:grid-cols-2">
                {SERPIENTES.fortalezas.map((f, j) => (
                  <li
                    key={j}
                    className="grid grid-cols-[auto_1fr] gap-3 text-[13px] leading-[1.5] text-[var(--st-chalk)]"
                  >
                    <span className="mt-[7px] h-1 w-1 bg-[var(--st-gold)]" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <div className="grid gap-6">
            {RIVALES.map((r, i) => (
              <Reveal key={r.nombre} delay={i * 0.1}>
                <article className="border-l-2 border-[var(--st-line)] pl-6 md:pl-8">
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <h3 className="st-display text-[19px] leading-none text-[var(--st-chalk)] md:text-[22px]">
                      {r.nombre}
                    </h3>
                    <span className="st-eyebrow shrink-0 text-[10px] text-[var(--st-ash)]">
                      Rival
                    </span>
                  </div>
                  <p className="text-[13px] leading-[1.6] text-[var(--st-bone)] md:text-[14px]">
                    {r.resumen}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
