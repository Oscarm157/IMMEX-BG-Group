import { Slide } from "../Slide";
import { SlideHead, ShotRow } from "../ui";
import { shots, modulos } from "../data";

const vistas = [
  {
    index: "a",
    title: "Resumen",
    desc: "Tablero con los indicadores clave: prospectos del periodo, conversión, valor en el embudo y tendencia.",
    shot: shots.panelResumen,
    priority: true,
  },
  {
    index: "b",
    title: "Pipeline",
    desc: "Tablero por etapa. Cada prospecto se mueve de columna conforme avanza, con responsable asignado.",
    shot: shots.panelPipeline,
  },
  {
    index: "c",
    title: "Campañas",
    desc: "Anuncios de Meta, Google, TikTok y LinkedIn con presupuesto, prospectos generados, costo por prospecto y conversión.",
    shot: shots.panelCampanas,
  },
  {
    index: "d",
    title: "Generador de posts · IA",
    desc: "Toma un PDF, una liga o un texto y genera variantes de publicación por red social. Inteligencia artificial aplicada a la producción de contenido.",
    shot: shots.panelContenido,
  },
  {
    index: "e",
    title: "Blog",
    desc: "Administración de los artículos públicos del sitio, con estados borrador, programada y publicada.",
    shot: shots.panelBlog,
  },
];

const todos = [...modulos.comercial, ...modulos.contenido, ...modulos.cuenta];

export function S05Panel() {
  return (
    <Slide centered={false}>
      <SlideHead
        index="04"
        eyebrow="El panel · recorrido"
        title="Un panel de gestión propio."
        lead="Además del sitio, la propuesta incluye un panel interno para operar la parte comercial y de contenido. Tres áreas: Comercial, Contenido y Cuenta, con accesos por rol."
        className="mb-10"
      />

      <div className="flex flex-col gap-12">
        {vistas.map((v) => (
          <ShotRow
            key={v.title}
            index={v.index}
            title={v.title}
            desc={v.desc}
            src={v.shot.src}
            url={v.shot.url}
            priority={v.priority}
          />
        ))}

        {/* Lista completa de módulos */}
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
            Los siete módulos
          </span>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {todos.map((m, i) => (
              <div key={m.name} className="rounded-[12px] border border-line bg-surface-1 p-5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display text-[15px] font-medium text-chalk">{m.name}</h4>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-bone/80">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
