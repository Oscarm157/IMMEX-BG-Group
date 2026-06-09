import { Slide } from "../Slide";
import { SlideHead } from "../ui";
import { pauta } from "../data";

function KwChips({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">{label}</span>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((k) => (
          <span
            key={k}
            className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-bone/90"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

export function S06PautaAds() {
  return (
    <Slide centered={false}>
      <SlideHead
        index="05"
        eyebrow="Siguiente paso · pauta digital"
        title="Atraer demanda, no solo esperarla."
        lead="El sitio ya recibe a quien llega. La pauta lleva tráfico de intención hacia él. Dos canales con roles distintos, sin pelear por el mismo presupuesto."
        className="mb-9"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Google */}
        <div className="console-panel flex flex-col rounded-[16px] bg-surface-1 p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-chalk">Google Ads</h3>
            <span className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
              {pauta.google.rol}
            </span>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-bone/85">{pauta.google.body}</p>
          <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5">
            <KwChips label="Campaña BG · legal y fiscal" items={pauta.google.keywords.bg} />
            <KwChips label="Campaña BMS · software" items={pauta.google.keywords.bms} />
          </div>
        </div>

        {/* LinkedIn */}
        <div className="console-panel flex flex-col rounded-[16px] bg-surface-1 p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-chalk">LinkedIn Ads</h3>
            <span className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-smoke">
              {pauta.linkedin.rol}
            </span>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-bone/85">{pauta.linkedin.body}</p>
          <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-[13.5px] text-bone/85">
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Segmenta por cargo, empresa e industria
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Llega a quien decide: dirección y comercio exterior
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Se enciende por fases, no todo el mes
            </li>
          </ul>
        </div>
      </div>

      {/* Presupuesto */}
      <div className="console-panel mt-4 grid gap-6 rounded-[16px] bg-surface-1 p-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Presupuesto de referencia
          </span>
          <p className="mt-2 font-display text-2xl font-medium tracking-[-0.01em] text-chalk">
            {pauta.presupuesto.rango}
          </p>
          <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-bone/80">{pauta.presupuesto.nota}</p>
        </div>
        <div className="flex gap-3">
          {pauta.presupuesto.estimados.map((e) => (
            <div key={e.monto} className="rounded-[12px] border border-line bg-surface-2 px-5 py-4">
              <div className="font-mono text-[12px] text-smoke">{e.monto}</div>
              <div className="mt-1.5 font-display text-[15px] text-chalk">{e.out}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
