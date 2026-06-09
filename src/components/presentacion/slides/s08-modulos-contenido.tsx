import { Slide } from "../Slide";
import { SlideHead, BrowserMock } from "../ui";
import { modulos, shots } from "../data";

export function S08ModulosContenido() {
  const items = [...modulos.contenido, ...modulos.cuenta];

  return (
    <Slide centered={false}>
      <SlideHead
        index="07"
        eyebrow="Módulos · Contenido y cuenta"
        title="Publicar y administrar."
        lead="El blog que alimenta el SEO, un generador de posts con IA para redes, y el control de quién entra y con qué permisos."
        className="mb-9"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <BrowserMock src={shots.panelContenido.src} url={shots.panelContenido.url} caption="Generador de posts · IA para redes" />
        <BrowserMock src={shots.panelBlog.src} url={shots.panelBlog.url} caption="Blog · artículos del sitio" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {items.map((m, i) => (
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
