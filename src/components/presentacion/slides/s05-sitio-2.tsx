import { Slide } from "../Slide";
import { SlideHead, BrowserMock } from "../ui";
import { shots } from "../data";

export function S05Sitio2() {
  return (
    <Slide centered={false}>
      <SlideHead
        index="04"
        eyebrow="Sneak peek · el sitio"
        title="Software, blog y contacto."
        lead="La página de BMS Custom System, el blog editorial que alimenta el SEO y la página de contacto con las dos oficinas. Todo bilingüe y editable desde el panel."
        className="mb-9"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <BrowserMock
          src={shots.software.src}
          url={shots.software.url}
          caption="Software · el cumplimiento, automatizado"
        />
        <BrowserMock
          src={shots.blog.src}
          url={shots.blog.url}
          caption="Blog · contenido propio para posicionar"
        />
        <BrowserMock
          src={shots.contact.src}
          url={shots.contact.url}
          caption="Contacto · Tijuana y San Diego"
        />
      </div>
    </Slide>
  );
}
