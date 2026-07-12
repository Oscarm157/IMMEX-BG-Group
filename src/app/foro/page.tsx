import Image from "next/image";
import { Logo } from "@/components/Logo";
import { TallyForm } from "@/components/TallyForm";
import { MotionSection } from "@/components/MotionSection";
import { FloatingCTA } from "@/components/FloatingCTA";

const partnershipBG = [
  { icon: "gavel", title: "Defensa Fiscal", desc: "Defensa legal ante autoridades fiscales y aduaneras." },
  { icon: "verified_user", title: "Compliance Normativo", desc: "Estructuración de protocolos de cumplimiento bajo estándares internacionales." },
  { icon: "strategy", title: "Estrategia Legal", desc: "Criterio legal que sostiene la operación ante la autoridad." },
];

const partnershipBMS = [
  { icon: "bolt", title: "Automatización", desc: "Digitalización de flujos de trabajo complejos para reducir error humano." },
  { icon: "settings_input_component", title: "Control de Operación", desc: "Monitoreo en tiempo real de cada variable en la cadena de suministro." },
  { icon: "database", title: "Gestión de Datos", desc: "Inteligencia centralizada para la toma de decisiones basada en evidencia." },
];

const frameworkPillars = [
  { name: "Cumplimiento", desc: "Operación alineada al marco normativo aduanero." },
  { name: "Integridad", desc: "Datos consistentes entre sistemas y registros oficiales." },
  { name: "Confiabilidad", desc: "Procesos repetibles y auditables en cada operación." },
  { name: "Trazabilidad", desc: "Evidencia continua del ciclo completo de la operación." },
];

const frameworkDimensions = [
  {
    label: "Dimensión 1",
    title: "Requerimientos del negocio",
    items: ["Sistemas y aplicaciones", "Información y datos", "Infraestructura y ciberseguridad", "Personas y gobernanza"],
  },
  {
    label: "Dimensión 2",
    title: "Recursos de TI y comercio exterior",
    items: ["Operación", "Controles internos", "Auditoría y monitoreo", "Inteligencia y mejora continua"],
  },
  {
    label: "Dimensión 3",
    title: "Modelo de operación, control y mejora continua",
    items: ["Gobernanza transversal sobre las dos dimensiones anteriores."],
  },
];

const benefits = [
  { icon: "verified", title: "Cumplimiento normativo defendible", desc: "Menos discrepancias con la autoridad, con revisión jurídica constante." },
  { icon: "shield", title: "Reducción de riesgos", desc: "Identificación y mitigación temprana de vulnerabilidades aduaneras." },
  { icon: "settings_suggest", title: "Automatización de procesos", desc: "Escalabilidad operativa sin incrementar la carga administrativa." },
  { icon: "visibility", title: "Visibilidad operativa", desc: "Visibilidad de los tiempos y costos de tu operación IMMEX." },
];

export default function Home() {
  return (
    <>
      {/* Top bar */}
      <div className="bg-white">
        <div className="container mx-auto px-6 md:px-8 py-6 md:py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <Logo variant="bg" tone="dark" size="lg" />
            <span className="text-on-surface-variant/30 text-xl font-extralight select-none">
              ×
            </span>
            <Logo variant="bms" tone="dark" size="lg" />
          </div>
        </div>
        <div className="h-[3px] bg-tertiary-fixed" />
      </div>

      {/* Hero */}
      <header className="relative min-h-[640px] md:min-h-[680px] flex flex-col overflow-hidden asymmetric-gradient text-on-primary">
        <div className="hero-glow" aria-hidden />

        <div className="container mx-auto px-6 md:px-8 relative z-10 flex-grow grid lg:grid-cols-[1.4fr_0.6fr] gap-12 items-center py-16 md:py-20">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-4 md:gap-6">
              <span className="h-px w-10 bg-tertiary-fixed" />
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-tertiary-fixed">
                Foro IMMEX · Diagnóstico de cumplimiento
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">
              Revisa tu operación IMMEX antes que <span className="text-tertiary-fixed">la autoridad</span>.
            </h1>
            <p className="text-base md:text-lg text-white/85 max-w-xl font-light leading-relaxed">
              Diagnóstico previo para asistentes al Foro IMMEX. Respaldo legal y software especializado en una sola conversación.
            </p>
            <div className="pt-4 md:pt-8 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-4 bg-tertiary-fixed text-on-tertiary-fixed px-8 md:px-10 py-4 md:py-5 rounded-sm font-extrabold text-base md:text-lg transition-transform hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_20px_60px_-20px_rgba(230,255,0,0.45)]"
              >
                Solicitar diagnóstico sin costo
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a
                href="#framework"
                className="inline-flex items-center gap-2 text-white border-b border-white/30 hover:border-tertiary-fixed hover:text-tertiary-fixed pb-1 text-sm font-bold tracking-[0.2em] uppercase transition-colors"
              >
                Ver framework
                <span className="material-symbols-outlined text-base">arrow_downward</span>
              </a>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="border-l border-white/15 pl-8 space-y-8">
              <div>
                <p className="text-tertiary-fixed text-[10px] font-black tracking-[0.3em] uppercase mb-2">
                  Capa Legal · BG Consulting
                </p>
                <p className="text-white/85 text-sm leading-relaxed">
                  Defensa fiscal, compliance normativo y estrategia legal para dar certeza a la operación.
                </p>
              </div>
              <div>
                <p className="text-tertiary-fixed text-[10px] font-black tracking-[0.3em] uppercase mb-2">
                  Capa Software · BMS
                </p>
                <p className="text-white/85 text-sm leading-relaxed">
                  Automatización del Anexo 24, control de operación y gestión de datos en tiempo real.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
                  Una sola conversación
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50 z-10">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <span className="h-8 w-px bg-tertiary-fixed/40" />
        </div>
      </header>

      {/* Partnership */}
      <MotionSection id="partnership" className="py-32 bg-surface text-on-surface">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24 max-w-3xl mx-auto space-y-4">
            <span className="text-tertiary-fixed-dim font-bold tracking-[0.3em] uppercase text-sm">
              BG + BMS
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-primary">
              Asesoría legal y software sobre la misma operación.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border-t border-outline-variant/15">
            <div className="p-12 md:p-20 bg-surface-container-lowest border-r border-outline-variant/15 hover:bg-primary-container transition-colors duration-500 group">
              <p className="text-tertiary-fixed-dim group-hover:text-tertiary-fixed text-[10px] font-black tracking-[0.4em] uppercase mb-6 transition-colors">
                Capa Legal
              </p>
              <div className="mb-14">
                <Logo variant="bg" tone="dark" size="lg" swapOnHover />
              </div>
              <ul className="space-y-8">
                {partnershipBG.map((item) => (
                  <li key={item.title} className="flex items-start gap-6">
                    <span className="material-symbols-outlined text-4xl group-hover:text-tertiary-fixed text-primary-container transition-colors">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="text-2xl font-bold mb-2 text-primary group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-on-surface-variant group-hover:text-white/80 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-12 md:p-20 bg-surface-container-low hover:bg-primary-container transition-colors duration-500 group">
              <p className="text-tertiary-fixed-dim group-hover:text-tertiary-fixed text-[10px] font-black tracking-[0.4em] uppercase mb-6 transition-colors">
                Capa Software
              </p>
              <div className="mb-14">
                <Logo variant="bms" tone="dark" size="lg" swapOnHover />
              </div>
              <ul className="space-y-8">
                {partnershipBMS.map((item) => (
                  <li key={item.title} className="flex items-start gap-6">
                    <span className="material-symbols-outlined text-4xl group-hover:text-tertiary-fixed text-primary-container transition-colors">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="text-2xl font-bold mb-2 text-primary group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-on-surface-variant group-hover:text-white/80 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Framework */}
      <section id="framework" className="bg-primary overflow-hidden">
        <div className="bg-primary-container py-8 px-8 border-b border-white/5">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
              Gobierno de comercio exterior, <span className="text-tertiary-fixed">en un solo marco</span>
            </h3>
            <Logo variant="bms" tone="light" size="md" />
          </div>
        </div>

        <div className="container mx-auto px-8 py-24">
          <div className="max-w-4xl mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              BMS Trade Governance Framework
            </h2>
            <p className="text-xl text-white/85 leading-relaxed">
              Estructura para automatizar y controlar la operación de comercio exterior, con respaldo legal.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <div className="relative aspect-square w-full max-w-[640px] mx-auto">
              <Image
                src="/Framework.jpg"
                alt="BMS Trade Governance Framework"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 640px, 100vw"
                priority
              />
            </div>

            <div className="space-y-10">
              <div>
                <p className="text-tertiary-fixed text-xs font-black tracking-[0.3em] uppercase mb-4">
                  Núcleo
                </p>
                <div className="grid grid-cols-2 gap-px bg-white/5">
                  {frameworkPillars.map((p) => (
                    <div key={p.name} className="bg-primary-container p-5 space-y-2">
                      <h4 className="text-tertiary-fixed font-black tracking-tight text-lg">{p.name}</h4>
                      <p className="text-white/70 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {frameworkDimensions.map((d) => (
                  <div key={d.label} className="border-l-2 border-tertiary-fixed/40 pl-5">
                    <p className="text-tertiary-fixed/80 text-[10px] font-black tracking-[0.3em] uppercase mb-1">
                      {d.label}
                    </p>
                    <h5 className="text-white font-bold mb-2">{d.title}</h5>
                    <p className="text-white/75 text-sm leading-relaxed">
                      {d.items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <MotionSection className="py-24 md:py-32 bg-surface-container-low">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-16 md:mb-20 space-y-4">
            <span className="text-tertiary-fixed-dim font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
              Beneficios
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary">
              Cuatro frentes que se cubren al mismo tiempo
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/30">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="bg-surface-container-lowest p-8 md:p-10 space-y-6 hover:bg-white transition-all group relative"
              >
                <div className="absolute top-0 left-0 h-px w-0 bg-tertiary-fixed transition-all duration-500 group-hover:w-full" />
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container text-primary group-hover:bg-tertiary-fixed group-hover:text-on-tertiary-fixed transition-colors">
                    <span className="material-symbols-outlined">{b.icon}</span>
                  </div>
                  <span className="text-xs font-black tracking-[0.2em] text-on-surface-variant/40">
                    0{i + 1}
                  </span>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-primary leading-tight">{b.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Lead Capture */}
      <MotionSection id="contact" className="py-32 bg-primary">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2 space-y-8">
              <span className="text-tertiary-fixed font-black tracking-widest uppercase text-sm">
                Diagnóstico para asistentes
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                Diagnóstico sin costo para asistentes al foro
              </h2>
              <p className="text-xl text-white/85 font-light">
                Evaluamos el estado actual de tu operación IMMEX y te proponemos una ruta clara de cumplimiento y automatización.
              </p>
              <div className="flex items-center gap-4 text-white/50 text-sm">
                <span className="material-symbols-outlined text-tertiary-fixed">info</span>
                Sujeto a disponibilidad de agenda.
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-white p-6 md:p-10 shadow-2xl">
                <TallyForm />
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Footer */}
      <footer className="bg-primary py-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
            <div className="space-y-4">
              <Logo variant="bg" tone="light" size="md" />
              <p className="text-white/85 text-sm leading-relaxed max-w-sm">
                Defensa fiscal, compliance normativo y estrategia legal en operación aduanera.
              </p>
            </div>
            <div className="space-y-4">
              <Logo variant="bms" tone="light" size="md" />
              <p className="text-white/85 text-sm leading-relaxed max-w-sm">
                Software para automatización del Anexo 24, control operativo y reportería.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-tertiary-fixed text-[10px] font-black tracking-[0.3em] uppercase">
                Foro IMMEX
              </p>
              <p className="text-white text-base leading-relaxed">
                Diagnóstico sin costo para asistentes.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-tertiary-fixed text-sm font-bold tracking-[0.25em] uppercase hover:text-white transition-colors"
              >
                Solicitar
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between gap-3 text-white/40 text-xs tracking-[0.2em] uppercase">
            <span>© 2026 BG Consulting Group &amp; BMS Software</span>
            <span>Cumplimiento y trazabilidad</span>
          </div>
        </div>
      </footer>

      <FloatingCTA />
    </>
  );
}
