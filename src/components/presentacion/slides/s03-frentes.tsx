import { Slide } from "../Slide";
import { SlideHead } from "../ui";
import { frentes } from "../data";

export function S03Frentes() {
  return (
    <Slide centered={false}>
      <SlideHead
        index="02"
        eyebrow="Por qué renovamos"
        title="Cinco frentes."
        lead="La renovación no fue un cambio de imagen. Atacó cinco cosas concretas que la landing anterior no resolvía."
        className="mb-10"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {frentes.map((f) => (
          <div
            key={f.n}
            className="console-panel flex gap-5 rounded-[14px] bg-surface-1 p-6 sm:p-7"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{f.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] tabular-nums text-accent">{f.n}</span>
                <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-chalk sm:text-xl">
                  {f.title}
                </h3>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-bone/85">{f.body}</p>
            </div>
          </div>
        ))}

        <div className="hidden items-center justify-center rounded-[14px] border border-dashed border-line p-7 md:flex">
          <p className="max-w-[16rem] text-center font-mono text-[12px] leading-relaxed text-ash">
            Cada frente se traduce en algo que el equipo y los clientes ven todos los días.
          </p>
        </div>
      </div>
    </Slide>
  );
}
