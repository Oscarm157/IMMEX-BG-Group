import { SectionHeading } from "@/components/site/SectionHeading";
import { HeroPauta } from "./HeroPauta";
import { CausasConPanel } from "./CausasConPanel";
import { CadenaConsecuencias } from "./CadenaConsecuencias";
import { BandaServicios } from "./BandaServicios";
import { BandaIdentidad } from "./BandaIdentidad";
import { BloqueFaq } from "./BloqueFaq";
import { BarraMovil } from "./BarraMovil";
import { Seccion } from "./Seccion";
import { SERVICIOS } from "./constantes";
import type { BloquePropio, LandingPautaConfig } from "./tipos";

// El bloque propio se renderiza igual que la sección "COVE contra factura y
// contra pedimento" en la v4 de cove: SectionHeading + la familia de layout
// que trae la landing en config.bloque.render. pegadoArriba: solo hace falta
// cuando lo precede una sección plana (Consecuencias); las bandas con fondo
// propio (Causas, Servicios) ya marcan la separación por sí solas.
function BloquePropioSection({
  index,
  bloque,
  pegadoArriba,
}: {
  index: string;
  bloque: BloquePropio;
  pegadoArriba: boolean;
}) {
  return (
    <Seccion variant="plano" className={pegadoArriba ? "pb-20" : "py-20"}>
      <SectionHeading eyebrow={bloque.eyebrow} index={index} title={bloque.title} lead={bloque.lead} className="mb-14" />
      {bloque.render}
    </Seccion>
  );
}

// Orquestador de las landings de pauta. Orden canónico:
// Hero (sin numerar) · Causas+panel · [bloque tras-causas] · Consecuencias ·
// [bloque tras-consecuencias] · Servicios · [bloque tras-servicios] · FAQ ·
// Identidad (sin numerar) · Barra móvil.
// La numeración de SectionHeading se deriva de este orden, nunca a mano.
export function LandingPauta({ config }: { config: LandingPautaConfig }) {
  const servicios = config.servicios ?? SERVICIOS;

  const bloque = config.bloque;
  const trasCausas = bloque?.posicion === "tras-causas";
  const trasConsecuencias = bloque?.posicion === "tras-consecuencias";
  const trasServicios = bloque?.posicion === "tras-servicios";

  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  const indexCausas = next();
  const indexBloqueTrasCausas = trasCausas ? next() : undefined;
  const indexConsecuencias = next();
  const indexBloqueTrasConsecuencias = trasConsecuencias ? next() : undefined;
  const indexServicios = next();
  const indexBloqueTrasServicios = trasServicios ? next() : undefined;
  const indexFaq = next();

  return (
    <>
      <HeroPauta {...config.hero} />

      <CausasConPanel
        index={indexCausas}
        eyebrow={config.causas.eyebrow}
        title={config.causas.title}
        lead={config.causas.lead}
        etiquetas={config.causas.etiquetas}
        items={config.causas.items}
        campaign={config.campaign}
        alcance={config.revision}
      />

      {trasCausas && indexBloqueTrasCausas && (
        <BloquePropioSection index={indexBloqueTrasCausas} bloque={bloque} pegadoArriba={false} />
      )}

      <CadenaConsecuencias
        index={indexConsecuencias}
        eyebrow={config.consecuencias.eyebrow}
        title={config.consecuencias.title}
        lead={config.consecuencias.lead}
        items={config.consecuencias.items}
        nota={config.consecuencias.nota}
        pegadoArriba={trasCausas}
      />

      {trasConsecuencias && indexBloqueTrasConsecuencias && (
        <BloquePropioSection index={indexBloqueTrasConsecuencias} bloque={bloque} pegadoArriba={true} />
      )}

      <BandaServicios index={indexServicios} servicios={servicios} />

      {trasServicios && indexBloqueTrasServicios && (
        <BloquePropioSection index={indexBloqueTrasServicios} bloque={bloque} pegadoArriba={false} />
      )}

      <BloqueFaq index={indexFaq} title={config.faq.title} items={config.faq.items} pegadoArriba={trasServicios} />

      <BandaIdentidad />
      <BarraMovil />
    </>
  );
}
