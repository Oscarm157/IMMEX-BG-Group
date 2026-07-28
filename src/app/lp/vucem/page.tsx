import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Faq } from "@/components/site/Faq";
import { LeadPanel } from "@/components/lp/LeadPanel";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Operación en VUCEM: rechazos, valor y cumplimiento | BG Consulting Group",
  description:
    "Por qué se atora una transmisión en la VUCEM, qué expone a la empresa frente a la autoridad y cómo se corrige. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias (vucem, pedimento, manifestacion-de-valor,
// valoracion-aduanera, anexo-24, encargo-conferido) y de docs/bgcg-source.md.
const ATORONES = [
  {
    titulo: "e.firma o sellos vencidos",
    fundamento: "Arts. 36 y 36-A Ley Aduanera",
    pasa: "La ventanilla no deja transmitir y el despacho se detiene con la mercancía ya en la aduana.",
    rechaza:
      "El acceso a la VUCEM se controla con la e.firma de la empresa y con los usuarios y roles dados de alta. Sin certificado vigente no hay transmisión.",
    hace: "Renovar antes de que caduque y llevar los vencimientos en el calendario de la operación, no cuando ya falló.",
  },
  {
    titulo: "El COVE no coincide con el pedimento",
    fundamento: "Arts. 36 y 36-A Ley Aduanera · Anexo 22 de las RGCE",
    pasa: "Diferencias de valor, cantidades o datos del proveedor entre el COVE y el pedimento traban la operación.",
    rechaza:
      "El pedimento se liga al COVE, que es la representación electrónica de la factura con los datos de valor. Si no cuadran, no avanza.",
    hace: "Revisar la captura del COVE antes de pagar el pedimento. Corregir después cuesta más que verificar antes.",
  },
  {
    titulo: "e-document ilegible o incompleto",
    fundamento: null,
    pasa: "Un documento digitalizado borroso, incompleto o que no corresponde genera rechazos y observaciones.",
    rechaza:
      "La ventanilla emite un acuse por cada documento y ese acuse se declara en el pedimento. Si el documento no sostiene la operación, la observación queda asentada.",
    hace: "Tratar la digitalización como parte del expediente de la operación, no como un requisito de forma.",
  },
  {
    titulo: "La manifestación de valor no está integrada",
    fundamento: "Art. 59 fracción III y art. 81 Ley Aduanera",
    pasa: "El valor declarado en el pedimento queda sin respaldo documental.",
    rechaza:
      "La obligación de manifestar y sustentar el valor es del importador, no del agente aduanal. En una revisión, la autoridad puede rechazar el valor de transacción y determinar uno mayor.",
    hace: "Integrar la manifestación con sus anexos antes de cada operación, incluidos los incrementables: fletes hasta la aduana, seguros, comisiones y regalías.",
  },
  {
    titulo: "Fracción arancelaria o clave de pedimento equivocada",
    fundamento: "Arts. 35 a 37 Ley Aduanera · Anexo 22 de las RGCE",
    pasa: "La operación pasa, pero con el trato fiscal incorrecto.",
    rechaza:
      "La fracción determina los impuestos y las regulaciones no arancelarias; la clave determina el régimen y cómo se descarga la mercancía después. Es una de las causas más frecuentes de reclasificación y de crédito fiscal.",
    hace: "Dictaminar la clasificación antes de operar y verificar que la clave corresponda al régimen real de la mercancía.",
  },
  {
    titulo: "Usuarios y accesos sin control",
    fundamento: null,
    pasa: "Accesos abiertos a personas que ya no operan, o roles sin definir dentro de la ventanilla.",
    rechaza:
      "Quién entra a la VUCEM y qué puede hacer ahí es control interno. La empresa responde por lo que se despacha bajo su encargo conferido.",
    hace: "Revisar altas, bajas y roles igual que cualquier acceso sensible, y mantener al día el encargo conferido vigente.",
  },
];

const ESCALADA = [
  {
    paso: "Rechazo en la ventanilla",
    desc: "La transmisión no pasa. El despacho se detiene antes de empezar.",
  },
  {
    paso: "Operación detenida",
    desc: "La mercancía no se despacha aunque ya esté en la aduana, y la producción queda esperando.",
  },
  {
    paso: "Valor en aduana recalculado",
    desc: "Si el valor declarado no tiene sustento, la autoridad rechaza el valor de transacción y determina uno por método secundario.",
  },
  {
    paso: "Crédito fiscal y multas",
    desc: "Impuestos omitidos sobre la base gravable correcta, más las multas que correspondan.",
  },
  {
    paso: "Controversia",
    desc: "Lo que empezó como una captura mal hecha termina en recurso administrativo, acuerdo conclusivo o juicio ante el Tribunal Federal de Justicia Administrativa.",
  },
];

const SERVICIOS = [
  {
    momento: "Antes de operar",
    servicio: "Expertos en comercio internacional",
    puntos: ["Clasificación arancelaria", "Origen de la mercancía", "Criterios aduaneros", "Avalúos"],
  },
  {
    momento: "Sobre la documentación",
    servicio: "Comercio exterior",
    puntos: [
      "Valor en aduana de la mercancía",
      "Criterios de valoración aduanera",
      "Correcta presentación de pedimentos",
      "Análisis de riesgo en materia aduanera",
    ],
  },
  {
    momento: "Antes de que revise la autoridad",
    servicio: "Compliance y aseguramiento",
    puntos: [
      "Evaluación de riesgos de comercio exterior",
      "Auditorías preventivas",
      "Análisis de control interno",
      "NAFTA 303",
    ],
  },
  {
    momento: "Cuando ya hay una determinación",
    servicio: "Consultoría legal",
    puntos: [
      "Recursos administrativos",
      "Acuerdos conclusivos",
      "Tribunal Federal de Justicia Administrativa",
      "Juicio de amparo",
    ],
  },
  {
    momento: "En el control de inventarios",
    servicio: "BMS Customs System",
    puntos: ["Cumple Anexo 24", "Cumple Anexo 30", "Archivos EDI por web services", "Integración MRP/ERP"],
  },
];

const PREGUNTAS = [
  {
    q: "La ventanilla rechazó la transmisión y la mercancía ya está en la aduana. ¿Por dónde se empieza?",
    a: "Por las causas frecuentes, en orden: vigencia de la e.firma y de los sellos con los que se opera, correspondencia entre el COVE y el pedimento en valor, cantidades y datos del proveedor, y legibilidad de los documentos digitalizados. Revisar eso antes de tocar el pedimento evita corregir dos veces.",
  },
  {
    q: "¿Quién responde ante la autoridad si el agente aduanal capturó mal el valor?",
    a: "El importador. La obligación de manifestar y sustentar el valor en aduana es de la empresa, aunque el agente aduanal presente el pedimento. El encargo conferido faculta al agente a despachar en su nombre, y la empresa responde por lo que se despacha bajo ese encargo.",
  },
  {
    q: "¿Un rechazo en la VUCEM puede terminar en crédito fiscal?",
    a: "El rechazo por sí solo detiene el despacho. El crédito fiscal nace de lo que se declaró: un valor sin sustento, una fracción arancelaria incorrecta o un descargo de inventario que no cuadra con los pedimentos. Ahí es donde la autoridad determina impuestos omitidos.",
  },
  {
    q: "¿BG tramita en la VUCEM o solo asesora?",
    a: "BG es una firma de consultoría legal especializada en comercio exterior. El despacho se tramita a través de agentes aduanales; la asesoría legal y de cumplimiento acompaña la operación, revisa el valor, la clasificación y el control interno, y representa a la empresa cuando hay una determinación de la autoridad.",
  },
  {
    q: "¿Se puede revisar la operación antes de que la revise la autoridad?",
    a: "Sí, y es el servicio que menos cuesta y más evita: evaluación de riesgos de comercio exterior, auditorías preventivas y análisis de control interno. En una visita domiciliaria, la primera puerta que abre la autoridad es el control de inventarios.",
  },
];

const seccion = "px-5 sm:px-8 lg:px-12";

// Escalón por eslabón de la cadena de consecuencias. Solo desde sm: en 375px la
// sangría dejaría el texto en una columna inservible.
const SANGRIA = ["", "sm:pl-5", "sm:pl-10", "sm:pl-[3.75rem]", "sm:pl-20"];

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
            <h1 className="mt-6 max-w-[20ch] text-balance font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-chalk">
              Cuando la ventanilla rechaza la transmisión y la mercancía ya está en la aduana
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl border-l-2 border-accent pl-5 text-[18px] leading-relaxed text-bone/90">
              Revisamos por qué se atora su operación en la VUCEM, qué expone a la empresa frente a la autoridad y qué
              se corrige antes de la siguiente transmisión.
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

        {/* 2 · Lo que se atora: filas de expediente, título y fundamento a la
            izquierda, los tres renglones operativos a la derecha */}
        <section className={`${seccion} pb-20 pt-16 sm:pt-24`}>
          <SectionHeading
            eyebrow="Operación"
            index="01"
            title="Lo que se atora en la VUCEM"
            lead="Los rechazos vienen casi siempre del mismo puñado de causas. Cada una tiene una consecuencia distinta si se deja pasar."
            className="mb-14"
          />
          <div className="border-t border-line">
            {ATORONES.map((a, i) => (
              <div
                key={a.titulo}
                className="grid gap-6 border-b border-line py-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
              >
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[12px] tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[20px] font-medium leading-snug tracking-[-0.02em] text-chalk sm:text-[22px]">
                      {a.titulo}
                    </h3>
                  </div>
                  {a.fundamento && (
                    <p className="mt-4 pl-8 font-mono text-[12px] leading-relaxed text-smoke">{a.fundamento}</p>
                  )}
                </div>
                <dl className="flex flex-col gap-4 pl-8 lg:pl-0">
                  {(
                    [
                      ["Qué pasa", a.pasa],
                      ["Por qué se rechaza", a.rechaza],
                      ["Qué se hace", a.hace],
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
              title="A qué escala un error que no se corrige"
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
              En una visita domiciliaria, la primera puerta que revisa la autoridad es el control de inventarios. Un
              Anexo 24 que no cuadra con los pedimentos es de donde sale la mayoría de los créditos fiscales del sector.
            </p>
          </div>
        </section>

        {/* 4 · Cómo entra BG: interludio claro, servicio en display grande con
            sus sub-puntos reales en línea */}
        <section className="grid-field-light bg-paper">
          <div className={`${seccion} py-20 sm:py-24`}>
            <SectionHeading
              eyebrow="Servicios"
              index="03"
              title="Cómo entra BG en la operación"
              lead="Servicios de la firma, ordenados por el momento en que se necesitan."
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
              Diego. El despacho se tramita a través de agentes aduanales; la asesoría legal y de cumplimiento acompaña
              la operación.
            </p>
          </div>
        </section>

        {/* 5 · Preguntas de quien opera: acordeón */}
        <section className={`${seccion} pb-20 pt-24`}>
          <SectionHeading
            eyebrow="Preguntas"
            index="04"
            title="Lo que preguntan quienes ya operan"
            className="mb-12"
          />
          <Faq items={PREGUNTAS} />
        </section>

        {/* 6 · Cierre: qué recibe quien deja sus datos */}
        <section className={`${seccion} pb-20`}>
          <Reveal className="rounded-[16px] border border-accent/35 bg-surface-1/60 px-6 py-10 sm:px-10 sm:py-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Siguiente paso</span>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-medium leading-tight tracking-[-0.025em] text-chalk">
              Qué se revisa en la primera conversación
            </h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                "Qué se atoró en la ventanilla y por qué la autoridad lo rechaza.",
                "Si el valor declarado está sustentado con su manifestación y sus incrementables.",
                "Si el control de inventarios cuadra con los pedimentos que amparan la mercancía.",
              ].map((t, i) => (
                <li key={t} className="border-t border-line pt-4">
                  <span className="font-mono text-[12px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-[16px] leading-relaxed text-bone/90">{t}</p>
                </li>
              ))}
            </ol>
            <p className="mt-9 text-[16px] leading-relaxed text-bone/85">
              Deje sus datos en el formulario. Si la mercancía ya está detenida, marque al{" "}
              <a href="tel:+526646079642" className="font-mono tabular-nums text-accent hover:text-accent-dim">
                +52 (664) 607 9642
              </a>
              .
            </p>
          </Reveal>
        </section>
      </div>

      {/* Sidebar de captura: columna propia del grid, así que empuja el contenido
          en vez de taparlo. En móvil el grid colapsa y queda al final del flujo. */}
      <aside
        id="form"
        className="scroll-mt-4 border-t border-line px-5 pb-12 pt-12 sm:px-8 lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto lg:border-l lg:border-t-0 lg:px-6 lg:pb-8 lg:pt-8"
      >
        <LeadPanel campaign="Landing VUCEM (pauta)" />
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
