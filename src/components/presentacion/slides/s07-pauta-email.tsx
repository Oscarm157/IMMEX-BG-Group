import { Slide } from "../Slide";
import { SlideHead } from "../ui";
import { pauta } from "../data";

export function S07PautaEmail() {
  return (
    <Slide centered>
      <SlideHead
        index="06"
        eyebrow="Siguiente paso · email"
        title="La base del evento IMMEX."
        lead="BG fue patrocinador del evento y tiene la lista de asistentes: público del giro exacto. Es el canal de menor costo por contacto y, bien usado, el de mayor retorno a este nivel de inversión."
        className="mb-10"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {pauta.email.map((idea, i) => (
          <div key={idea.title} className="console-panel flex gap-5 rounded-[14px] bg-surface-1 p-6 sm:p-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{idea.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-chalk sm:text-xl">
                  {idea.title}
                </h3>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-bone/85">{idea.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}
