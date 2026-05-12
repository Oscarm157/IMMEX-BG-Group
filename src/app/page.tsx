import Image from "next/image";
import { Logo } from "@/components/Logo";
import { TallyForm } from "@/components/TallyForm";
import { MotionSection } from "@/components/MotionSection";
import { FloatingCTA } from "@/components/FloatingCTA";

const partnershipBG = [
  { icon: "gavel", title: "Defensa Fiscal", desc: "Protección legal integral ante autoridades fiscales y aduaneras." },
  { icon: "verified_user", title: "Compliance Normativo", desc: "Estructuración de protocolos de cumplimiento bajo estándares internacionales." },
  { icon: "strategy", title: "Estrategia Legal", desc: "Consultoría de alto nivel para blindar la operación corporativa." },
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
  { icon: "verified", title: "Cumplimiento normativo sólido", desc: "Cero discrepancias con la autoridad mediante validación jurídica constante." },
  { icon: "shield", title: "Reducción de riesgos", desc: "Identificación y mitigación temprana de vulnerabilidades aduaneras." },
  { icon: "settings_suggest", title: "Automatización de procesos", desc: "Escalabilidad operativa sin incrementar la carga administrativa." },
  { icon: "visibility", title: "Visibilidad operativa", desc: "Control total sobre los tiempos y costos de su operación IMMEX." },
];

export default function Home() {
  return (
    <>
      {/* Top bar */}
      <div className="bg-white border-b border-outline-variant/20">
        <div className="container mx-auto px-6 md:px-8 py-5 md:py-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-12">
            <Logo variant="bg" tone="dark" size="lg" />
            <div className="h-10 w-px bg-outline-variant/40 hidden md:block" />
            <Logo variant="bms" tone="dark" size="lg" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="relative min-h-screen md:min-h-[820px] flex flex-col overflow-hidden asymmetric-gradient text-on-primary">
        <div className="hero-glow" aria-hidden />

        <div className="container mx-auto px-6 md:px-8 relative z-10 flex-grow flex items-center">
          <div className="max-w-4xl space-y-8 py-16 md:py-24">
            <div className="flex items-center gap-4 md:gap-6">
              <span className="h-px w-10 bg-tertiary-fixed" />
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-tertiary-fixed">
                Foro IMMEX · Cumplimiento 360°
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.02]">
              Cumplimiento que se <span className="text-tertiary-fixed">implementa</span>, no que se promete.
            </h1>
            <p className="text-lg md:text-2xl text-on-primary-container max-w-2xl font-light leading-relaxed">
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
                className="text-white/70 hover:text-white text-sm font-bold tracking-[0.2em] uppercase transition-colors"
              >
                Ver framework
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/30 z-10">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <span className="h-10 w-px bg-white/20" />
        </div>
      </header>

      {/* Partnership */}
      <MotionSection id="partnership" className="py-32 bg-surface text-on-surface">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24 max-w-3xl mx-auto space-y-4">
            <span className="text-tertiary-fixed-dim font-bold tracking-[0.3em] uppercase text-sm">
              Sinergia Estratégica
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-primary">
              Combinamos estrategia legal con ejecución tecnológica
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border-t border-outline-variant/15">
            <div className="p-12 md:p-20 bg-surface-container-lowest border-r border-outline-variant/15 hover:bg-primary-container transition-colors duration-500 group">
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
                      <p className="text-on-surface-variant group-hover:text-on-primary-container/80 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-12 md:p-20 bg-surface-container-low hover:bg-primary-container transition-colors duration-500 group">
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
                      <p className="text-on-surface-variant group-hover:text-on-primary-container/80 transition-colors">
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
      <section id="framework" className="bg-primary-container overflow-hidden">
        <div className="bg-primary py-8 px-8 border-b border-white/5">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
              La Nueva Era del <span className="text-tertiary-fixed">Trade Governance MX</span>
            </h3>
            <Logo variant="bms" tone="light" size="md" />
          </div>
        </div>

        <div className="container mx-auto px-8 py-24">
          <div className="max-w-4xl mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              BMS Trade Governance Framework
            </h2>
            <p className="text-xl text-on-primary-container leading-relaxed">
              Estructura integral para automatizar y controlar la operación de comercio exterior, fortalecida por el respaldo legal y cumplimiento 360°.
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
                    <div key={p.name} className="bg-primary p-5 space-y-2">
                      <h4 className="text-tertiary-fixed font-black tracking-tight text-lg">{p.name}</h4>
                      <p className="text-on-primary-container text-xs leading-relaxed">{p.desc}</p>
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
                    <p className="text-on-primary-container text-sm leading-relaxed">
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
              Resultados medibles
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
                Oportunidad Exclusiva
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                Diagnóstico sin costo para asistentes al foro
              </h2>
              <p className="text-xl text-on-primary-container font-light">
                Evaluamos el estado actual de tu operación IMMEX y te proponemos una ruta clara de cumplimiento y automatización.
              </p>
              <div className="flex items-center gap-4 text-white/50 text-sm">
                <span className="material-symbols-outlined text-tertiary-fixed">info</span>
                Disponibilidad limitada según agenda técnica.
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
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/5">
            <div className="flex flex-wrap items-center gap-10">
              <Logo variant="bg" tone="light" size="sm" />
              <div className="h-6 w-px bg-white/10" />
              <Logo variant="bms" tone="light" size="sm" />
            </div>
            <a
              href="#contact"
              className="text-tertiary-fixed text-sm font-bold tracking-[0.25em] uppercase hover:text-white transition-colors"
            >
              Solicitar diagnóstico
            </a>
          </div>
          <div className="pt-8 text-white/40 text-xs uppercase tracking-[0.25em]">
            © 2026 BG Consulting Group &amp; BMS Software
          </div>
        </div>
      </footer>

      <FloatingCTA />
    </>
  );
}
