import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Faq } from "@/components/site/Faq";
import { LeadPanel } from "@/components/lp/LeadPanel";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Operación en VUCEM: rechazos, valor y cumplimiento | BG Consulting Group",
  description:
    "Causas frecuentes de rechazo en la VUCEM, lo que exponen frente a la autoridad y cómo se corrigen. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias (vucem, pedimento, manifestacion-de-valor,
// valoracion-aduanera, anexo-24, encargo-conferido) y de docs/bgcg-source.md.
const CAUSAS = [
  {
    titulo: "El COVE no coincide con el pedimento",
    fundamento: "Arts. 36 y 36-A Ley Aduanera · Anexo 22 de las RGCE",
    ocurre:
      "Diferencias de valor, cantidades o datos del proveedor entre el COVE y el pedimento impiden que la operación avance.",
    hace: "Verificar la captura del COVE antes de pagar el pedimento. Corregir después cuesta más que revisar antes.",
  },
  {
    titulo: "La manifestación de valor no está integrada",
    fundamento: "Art. 59 fracción III y art. 81 Ley Aduanera",
    ocurre:
      "El valor declarado queda sin respaldo documental. La obligación de sustentarlo es del importador, no del agente aduanal.",
    hace: "Integrar la manifestación y sus incrementables antes de cada operación: fletes hasta la aduana, seguros, comisiones y regalías.",
  },
  {
    titulo: "Fracción arancelaria o clave de pedimento equivocada",
    fundamento: "Arts. 35 a 37 Ley Aduanera · Anexo 22 de las RGCE",
    ocurre:
      "La operación pasa con el trato fiscal incorrecto: la fracción determina los impuestos y la clave, el régimen.",
    hace: "Dictaminar la clasificación antes de operar y verificar que la clave corresponda al régimen real de la mercancía.",
  },
  {
    titulo: "e.firma o sellos vencidos",
    fundamento: "Arts. 36 y 36-A Ley Aduanera",
    ocurre:
      "Sin certificado vigente no hay transmisión y el despacho se detiene con la mercancía ya en la aduana.",
    hace: "Renovar antes del vencimiento y llevar esas fechas en el calendario de la operación.",
  },
];

const ESCALADA = [
  {
    paso: "Operación detenida",
    desc: "La mercancía no se despacha aunque ya esté en la aduana, y la producción queda esperando.",
  },
  {
    paso: "Valor en aduana recalculado",
    desc: "Sin sustento del valor declarado, la autoridad rechaza el valor de transacción y determina uno por método secundario.",
  },
  {
    paso: "Crédito fiscal y multas",
    desc: "Impuestos omitidos sobre la base gravable correcta, más las multas que correspondan.",
  },
];

const SERVICIOS = [
  {
    momento: "Antes de operar",
    servicio: "Expertos en comercio internacional",
    puntos: ["Clasificación arancelaria", "Origen de la mercancía", "Criterios aduaneros"],
  },
  {
    momento: "Sobre la documentación",
    servicio: "Comercio exterior",
    puntos: ["Valor en aduana", "Criterios de valoración aduanera", "Presentación de pedimentos"],
  },
  {
    momento: "Antes de una revisión",
    servicio: "Compliance y aseguramiento",
    puntos: ["Evaluación de riesgos", "Auditorías preventivas", "Análisis de control interno"],
  },
  {
    momento: "Ante una determinación",
    servicio: "Consultoría legal",
    puntos: ["Recursos administrativos", "Acuerdos conclusivos", "Tribunal Federal de Justicia Administrativa"],
  },
];

const PREGUNTAS = [
  {
    q: "¿Por dónde se empieza cuando la ventanilla rechaza la transmisión?",
    a: "Por la vigencia de la e.firma y los sellos, y por la correspondencia entre el COVE y el pedimento.",
  },
  {
    q: "¿Quién responde si el agente aduanal capturó mal el valor?",
    a: "El importador. La obligación de manifestar y sustentar el valor en aduana es de la empresa, aunque el agente aduanal presente el pedimento bajo el encargo conferido.",
  },
  {
    q: "¿BG tramita en la VUCEM o solo asesora?",
    a: "BG es una firma de consultoría legal. El despacho se tramita a través de agentes aduanales; la asesoría revisa el valor, la clasificación y el control interno, y representa a la empresa ante una determinación.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Causa del rechazo en la ventanilla.",
  "Sustento del valor declarado.",
  "Control de inventarios contra pedimentos.",
];

const seccion = "px-5 sm:px-8 lg:px-12";

// Escalón por eslabón de la cadena de consecuencias. Solo desde sm: en 375px la
// sangría dejaría el texto en una columna inservible.
const SANGRIA = ["", "sm:pl-5", "sm:pl-10"];

export default function LpVucemPage() {
  return (
    <div className="mx-auto w-full max-w-[1560px] lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <div className="min-w-0">
        {/* 1 · Entrada: tipográfica, con la tira de credenciales en mono */}
        <section className={`grid-field ${seccion} pb-14 pt-14 sm:pb-20 sm:pt-20`}>
          <Reveal>
            <span className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
              VUCEM · Operación y cumplimiento
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-chalk">
              Asesoría legal para operaciones detenidas en la VUCEM
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl border-l-2 border-accent pl-5 text-[18px] leading-relaxed text-bone/90">
              Revisión de la causa del rechazo, del sustento del valor declarado y de lo que la operación expone frente
              a la autoridad.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-smoke">
              <li>Más de 20 años en comercio exterior</li>
              <li aria-hidden className="text-line">
                /
              </li>
              <li>Legal, trade compliance e IT</li>
              <li aria-hidden className="text-line">
                /
              </li>
              <li>Tijuana y San Diego</li>
            </ul>
          </Reveal>
        </section>

        {/* 2 · Causas: filas de expediente, título y fundamento a la izquierda,
            los dos renglones operativos a la derecha */}
        <section className={`${seccion} pb-20 pt-16 sm:pt-24`}>
          <SectionHeading
            eyebrow="Operación"
            index="01"
            title="Causas frecuentes de rechazo"
            lead="Cuatro causas concentran la mayoría de los rechazos y las observaciones."
            className="mb-14"
          />
          <div className="border-t border-line">
            {CAUSAS.map((c, i) => (
              <div
                key={c.titulo}
                className="grid gap-6 border-b border-line py-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
              >
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
                <dl className="flex flex-col gap-4 pl-8 lg:pl-0">
                  {(
                    [
                      ["Qué ocurre", c.ocurre],
                      ["Qué se hace", c.hace],
                    ] as const
                  ).map(([etiqueta, texto]) => (
                    <div key={etiqueta} className="grid gap-1 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-5">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash sm:pt-1">
                        {etiqueta}
                      </dt>
                      <dd className="text-[16px] leading-relaxed text-bone/90">{texto}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* 3 · Consecuencias: cadena vertical escalonada sobre panel de consola */}
        <section className={`${seccion} pb-20`}>
          <div className="console-panel rounded-[16px] bg-surface-1 px-6 py-12 sm:px-10 sm:py-14">
            <SectionHeading
              eyebrow="Riesgo"
              index="02"
              title="Consecuencias de una operación mal documentada"
              lead="Un rechazo se resuelve el mismo día. Lo que se declaró mal escala."
              rule={false}
              className="mb-12"
            />
            <ol className="relative border-l border-line pl-7 sm:pl-9">
              {ESCALADA.map((e, i) => (
                <Reveal key={e.paso} delay={i * 0.06} as="li" className="relative pb-9 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute -left-[calc(1.75rem+3.5px)] top-2 h-1.5 w-1.5 rounded-full bg-accent sm:-left-[calc(2.25rem+3.5px)]"
                  />
                  <div className={SANGRIA[i]}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[12px] tabular-nums text-ash">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-[19px] font-medium tracking-[-0.015em] text-chalk">{e.paso}</h3>
                    </div>
                    <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-bone/85">{e.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className="mt-10 max-w-2xl border-l-2 border-accent pl-5 text-[16px] leading-relaxed text-bone/90">
              El control de inventarios es la primera puerta que revisa la autoridad en una visita domiciliaria: un
              Anexo 24 que no cuadra con los pedimentos deriva en crédito fiscal.
            </p>
          </div>
        </section>

        {/* 4 · Servicios: interludio claro, servicio en display grande con sus
            sub-puntos reales en línea */}
        <section className="grid-field-light bg-paper">
          <div className={`${seccion} py-20 sm:py-24`}>
            <SectionHeading
              eyebrow="Firma"
              index="03"
              title="Servicios"
              lead="Ordenados por el momento de la operación en que se necesitan."
              tone="light"
              className="mb-14"
            />
            <div className="flex flex-col gap-11">
              {SERVICIOS.map((s, i) => (
                <Reveal key={s.servicio} delay={i * 0.05}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink">{s.momento}</span>
                  <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-tight tracking-[-0.025em] text-ink">
                    {s.servicio}
                  </h3>
                  <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[16px] leading-relaxed text-graphite">
                    {s.puntos.map((p, j) => (
                      <li key={p} className="flex items-center gap-3">
                        {j > 0 && (
                          <span aria-hidden className="text-line-soft">
                            ·
                          </span>
                        )}
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <p className="mt-14 max-w-2xl border-t border-line-soft pt-7 text-[16px] leading-relaxed text-graphite">
              BG es una firma de consultoría legal especializada en comercio exterior, con oficinas en Tijuana y San
              Diego. El despacho se tramita a través de agentes aduanales.
            </p>
          </div>
        </section>

        {/* 5 · Preguntas frecuentes: acordeón */}
        <section className={`${seccion} pb-20 pt-24`}>
          <SectionHeading eyebrow="Preguntas" index="04" title="Preguntas frecuentes" className="mb-12" />
          <Faq items={PREGUNTAS} />
        </section>
      </div>

      {/* Sidebar de captura: columna propia del grid, así que empuja el contenido
          en vez de taparlo. En móvil el grid colapsa y queda al final del flujo. */}
      <aside
        id="form"
        className="scroll-mt-4 border-t border-line px-5 pb-12 pt-12 sm:px-8 lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto lg:border-l lg:border-t-0 lg:px-6 lg:pb-8 lg:pt-8"
      >
        <LeadPanel campaign="Landing VUCEM (pauta)" alcance={REVISION} />
      </aside>

      {/* Barra inferior en móvil: no hay sidebar, así que el CTA vive fijo abajo */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/95 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <a
            href="tel:+526646079642"
            className="shrink-0 rounded-full border border-chalk/25 px-4 py-3 font-mono text-[13px] tabular-nums text-chalk"
          >
            Llamar
          </a>
          <a
            href="#form"
            className="flex-1 rounded-full bg-accent px-5 py-3 text-center text-[15px] font-medium text-on-accent"
          >
            Dejar mis datos
          </a>
        </div>
      </div>
    </div>
  );
}
