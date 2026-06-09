import { Slide } from "../Slide";
import { SlideHead, BrowserMock } from "../ui";
import { modulos, shots } from "../data";

export function S07ModulosComercial() {
  return (
    <Slide centered={false}>
      <SlideHead
        index="06"
        eyebrow="Módulos · Comercial"
        title="Del prospecto al cierre."
        lead="Captura, califica, mueve por etapa y mide. El embudo comercial completo, con cada lead trazado de origen a resultado."
        className="mb-9"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <BrowserMock src={shots.panelResumen.src} url={shots.panelResumen.url} caption="Resumen · KPIs, embudo y tendencia" />
        <BrowserMock src={shots.panelPipeline.src} url={shots.panelPipeline.url} caption="Pipeline · tablero por etapa" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {modulos.comercial.map((m, i) => (
          <div key={m.name} className="rounded-[12px] border border-line bg-surface-1 p-5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[15px] font-medium text-chalk">{m.name}</h3>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-bone/80">{m.desc}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}
