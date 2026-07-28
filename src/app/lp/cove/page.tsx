import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Faq } from "@/components/site/Faq";
import { LeadPanel } from "@/components/lp/LeadPanel";
import { Logo } from "@/components/Logo";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "COVE rechazado o que no coincide: revisión legal | BG Consulting Group",
  description:
    "Causas frecuentes de rechazo del COVE, su diferencia con la factura y el pedimento, y qué expone frente a la autoridad. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias (guía vucem: puntosClave, distincion y
// errores de COVE, e-document y e.firma) y de docs/bgcg-source.md. Nada fuera de ahí.
const CAUSAS = [
  {
    titulo: "El COVE no coincide con el pedimento",
    fundamento: "Arts. 36 y 36-A Ley Aduanera · Anexo 22 de las RGCE",
    ocurre: "Diferencias de valor, cantidades o datos del proveedor entre el COVE y el pedimento.",
    hace: "Se revisa la captura del COVE antes de pagar el pedimento.",
  },
  {
    titulo: "El valor transmitido no tiene sustento",
    fundamento: "Art. 59 fracción III y art. 81 Ley Aduanera",
    ocurre:
      "Manifestación de valor sin integrar, o incrementables fuera: fletes hasta la aduana, seguros, comisiones, regalías.",
    hace: "Integrar la manifestación de valor y sus incrementables antes de transmitir. La obligación de sustentarlo es del importador, no del agente aduanal.",
  },
  {
    titulo: "El e-document que soporta el COVE, ilegible o incompleto",
    fundamento: "Decreto de la Ventanilla Digital Mexicana de Comercio Exterior",
    ocurre:
      "La ventanilla genera un acuse que se declara en el pedimento; un documento borroso o que no corresponde genera rechazos y observaciones.",
    hace: "La digitalización se cuida como parte del expediente, no como un requisito de forma.",
  },
  {
    titulo: "e.firma o sellos vencidos",
    fundamento: "Arts. 36 y 36-A Ley Aduanera",
    ocurre: "Sin certificado vigente no hay transmisión, y la mercancía ya está en la aduana.",
    hace: "Renovar antes del vencimiento y llevar esas fechas en el calendario de la operación.",
  },
];

// Ancla de especialista de la página: distinción que no aparece en /lp/vucem.
const DISTINCIONES = [
  {
    a: "COVE",
    b: "Factura",
    texto:
      "La factura es el documento comercial. El COVE es su representación electrónica en la ventanilla, con los datos de valor que se ligan al pedimento. El COVE no sustituye a la factura, la declara.",
  },
  {
    a: "COVE",
    b: "Pedimento",
    texto:
      "El COVE se transmite antes, con los datos de valor de la factura. El pedimento se liga a ese COVE: si no coinciden entre sí, la operación no avanza.",
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

// Mismos cuatro momentos y servicios reales del piloto. Ningún servicio nuevo.
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
    q: "¿Qué se revisa primero cuando la ventanilla rechaza el COVE?",
    a: "Primero la vigencia de la e.firma y los sellos, y después la correspondencia entre el COVE y el pedimento en valor, cantidades y datos del proveedor.",
  },
  {
    q: "¿Quién responde si el agente aduanal capturó mal el valor?",
    a: "El importador. La obligación de manifestar y sustentar el valor en aduana es de la empresa; el encargo conferido permite que el agente aduanal presente el pedimento, no traslada esa obligación.",
  },
  {
    q: "¿BG transmite el COVE o solo asesora?",
    a: "BG es una firma de consultoría legal. El COVE y el despacho se tramitan a través de agentes aduanales; la asesoría revisa el valor, la clasificación y el control interno antes de la transmisión.",
  },
];

// Las tres cifras que el repo sostiene, igual que en /lp/vucem v4. El pie de la
// primera dice "en promedio entre los socios", no "años de experiencia" a secas.
const CIFRAS = [
  { cifra: "20", pie: "años en promedio entre los socios" },
  { cifra: "8", pie: "áreas de práctica" },
  { cifra: "2", pie: "oficinas: Tijuana y San Diego" },
];

// Áreas de práctica reales, tal cual en src/content/dictionaries.ts (services.items).
const AREAS = [
  "Consultoría legal",
  "Compliance y aseguramiento",
  "Comercio exterior",
  "Expertos en comercio internacional",
  "Tecnología de la información",
  "Servicios fiscales",
  "Acuerdos comerciales",
  "Servicios de importación",
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = ["Causa del rechazo del COVE.", "Correspondencia con la factura y el pedimento.", "Sustento del valor declarado."];

// Mismo ancho y padding que el resto del sitio (ver src/app/[lang]/page.tsx).
const contenedor = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";

// Escalón por eslabón de la cadena de consecuencias. Solo desde sm: en 375px la
// sangría dejaría el texto en una columna inservible.
const SANGRIA = ["", "sm:pl-5", "sm:pl-10"];

export default function LpCovePage() {
  return (
    <>
      {/* 1 · Entrada: tipográfica, con la tira de credenciales en mono. El pt
          superior deja pasar la nav fija (h-20 en móvil, h-[100px] desde sm). */}
      <section className="grid-field">
        <div className={`${contenedor} pb-14 pt-32 sm:pb-20 sm:pt-40`}>
          <Reveal>
            <span className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
              COVE · Valor declarado y correspondencia
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-[19ch] text-balance font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-chalk">
              Asesoría legal para un COVE rechazado o que no cuadra
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl border-l-2 border-accent pl-5 text-[18px] leading-relaxed text-bone/90">
              Revisión del valor transmitido, su correspondencia con el pedimento y lo que la operación expone frente a
              la autoridad.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-smoke">
              <li>20 años de experiencia en promedio entre los socios</li>
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
        </div>
      </section>

      {/* 2 · Causas y captura, sobre banda de fondo propia. Las causas son filas
          de expediente en la columna ancha; el formulario ocupa la angosta y es
          sticky dentro de su columna, no a la altura de la página. */}
      <section className="border-y border-line bg-surface-1/40">
        <div className={`${contenedor} pb-20 pt-16 sm:pt-20`}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-14 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-8">
              <SectionHeading
                eyebrow="Transmisión"
                index="01"
                title="Causas frecuentes de rechazo"
                lead="Cuatro causas concentran la mayoría de los rechazos y las observaciones al COVE."
                className="mb-14"
              />
              <div className="border-t border-line">
                {CAUSAS.map((c, i) => (
                  <div key={c.titulo} className="grid gap-6 border-b border-line py-9">
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
                    <dl className="flex flex-col gap-4 pl-8">
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
            </div>

            {/* scroll-mt: la nav es fija, el ancla #form de la barra móvil tiene
                que caer por debajo de ella. */}
            <div id="form" className="col-span-12 scroll-mt-28 sm:scroll-mt-32 lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <LeadPanel campaign="Landing COVE (pauta)" alcance={REVISION} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · COVE contra factura y contra pedimento: dos tarjetas lado a lado con
          un separador "≠", familia de layout propia que no existe en /lp/vucem */}
      <section className={`${contenedor} py-20`}>
        <SectionHeading
          eyebrow="Distinción"
          index="02"
          title="COVE contra factura y contra pedimento"
          lead="El ancla de esta página: el COVE es un dato que se transmite, no el canal ni el documento comercial."
          className="mb-14"
        />
        <div className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2">
          {DISTINCIONES.map((d) => (
            <div key={d.b} className="flex flex-col gap-6 bg-ink px-7 py-10 sm:px-9">
              <div className="flex items-baseline gap-3 font-mono text-[13px] uppercase tracking-[0.14em]">
                <span className="text-chalk">{d.a}</span>
                <span aria-hidden className="text-ash">
                  ≠
                </span>
                <span className="text-smoke">{d.b}</span>
              </div>
              <p className="text-[16px] leading-relaxed text-bone/90">{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 · Consecuencias: cadena vertical escalonada sobre panel de consola */}
      <section className={`${contenedor} pb-20`}>
        <div className="console-panel rounded-[16px] bg-surface-1 px-6 py-12 sm:px-10 sm:py-14">
          <SectionHeading
            eyebrow="Riesgo"
            index="03"
            title="Consecuencias de un valor sin sustento"
            lead="Un rechazo se corrige el mismo día. Lo que se declaró mal escala."
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
                    <span className="font-mono text-[12px] tabular-nums text-ash">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-[19px] font-medium tracking-[-0.015em] text-chalk">{e.paso}</h3>
                  </div>
                  <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-bone/85">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · Servicios: interludio claro, servicio en display grande con sus
          sub-puntos reales en línea */}
      <section className="grid-field-light bg-paper">
        <div className={`${contenedor} py-20 sm:py-24`}>
          <SectionHeading
            eyebrow="Firma"
            index="04"
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
        </div>
      </section>

      {/* 6 · Preguntas frecuentes: acordeón */}
      <section className={`${contenedor} pb-20 pt-24`}>
        <SectionHeading eyebrow="Preguntas" index="05" title="Preguntas frecuentes" className="mb-12" />
        <Faq items={PREGUNTAS} />
      </section>

      {/* 7 · Identidad de la firma: banda horizontal, igual que la v4 de
          /lp/vucem. Sin SectionHeading ni número: es una banda, no un capítulo. */}
      <section className="border-t border-line bg-surface-1/40">
        <div className={`${contenedor} py-14 sm:py-16`}>
          <div className="flex flex-col gap-9 border-b border-line pb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <Logo variant="bg" tone="light" size="lg" className="h-14 w-auto self-start sm:h-16" />
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
                Firma de consultoría legal especializada en comercio exterior, en materia fiscal, aduanera y de
                tecnologías de la información.
              </p>
            </div>
            <div className="lg:pt-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">Áreas de práctica</span>
              <ul className="mt-5 grid gap-x-10 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
                {AREAS.map((a) => (
                  <li key={a} className="border-t border-line py-2.5 text-[15px] leading-snug text-bone/85">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Barra inferior en móvil: el formulario queda arriba en el flujo, así que
          el CTA que lleva a él vive fijo abajo */}
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
    </>
  );
}
