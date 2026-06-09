import { Slide } from "../Slide";
import { SlideHead, BrowserMock } from "../ui";
import { shots } from "../data";

export function S04Sitio1() {
  return (
    <Slide centered={false}>
      <SlideHead
        index="03"
        eyebrow="Sneak peek · el sitio"
        title="La portada."
        lead="Hero a pantalla completa con el corredor MX-US, y una consola de telemetría que muestra la operación etapa por etapa. El sitio se siente como un instrumento, no como un folleto."
        className="mb-9"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <BrowserMock
          src={shots.homeHero.src}
          url={shots.homeHero.url}
          caption="Inicio · Tu comercio exterior, en orden"
          priority
        />
        <BrowserMock
          src={shots.homeTelemetry.src}
          url={shots.homeTelemetry.url}
          caption="Estado de operación · telemetría y flujo aduanal"
        />
      </div>
    </Slide>
  );
}
