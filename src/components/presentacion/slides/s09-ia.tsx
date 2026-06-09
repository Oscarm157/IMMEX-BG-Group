import { Slide } from "../Slide";
import { SlideHead } from "../ui";

export function S09IA() {
  return (
    <Slide centered>
      <SlideHead
        index="08"
        eyebrow="La IA, en concreto"
        title="Dónde trabaja la IA hoy."
        lead="No es una promesa a futuro. Hay dos puntos donde la IA ya está operando, cada uno con una tarea clara."
        className="mb-10"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="console-panel flex flex-col rounded-[16px] bg-surface-1 p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>forum</span>
          </div>
          <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.01em] text-chalk">
            Asistente en el sitio
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-bone/85">
            Un chat que responde dudas del visitante, lo orienta hacia el servicio correcto y deja
            el contacto como lead en el panel. Atiende fuera de horario sin perder al prospecto.
          </p>
          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-smoke">
            Cara pública · captación
          </span>
        </div>

        <div className="console-panel flex flex-col rounded-[16px] bg-surface-1 p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>auto_awesome</span>
          </div>
          <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.01em] text-chalk">
            Generador de posts
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-bone/85">
            Toma un PDF, una URL o un texto y devuelve variantes de publicación por red social,
            con distintos enfoques. Convierte una nota técnica en contenido listo para revisar.
          </p>
          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-smoke">
            Panel · producción de contenido
          </span>
        </div>
      </div>
    </Slide>
  );
}
