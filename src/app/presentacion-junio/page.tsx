import { Deck } from "@/components/presentacion/Deck";
import { S01Portada } from "@/components/presentacion/slides/s01-portada";
import { S02PuntoDePartida } from "@/components/presentacion/slides/s02-punto-de-partida";
import { S03Frentes } from "@/components/presentacion/slides/s03-frentes";
import { S04Sitio1 } from "@/components/presentacion/slides/s04-sitio-1";
import { S05Sitio2 } from "@/components/presentacion/slides/s05-sitio-2";
import { S06Panel } from "@/components/presentacion/slides/s06-panel";
import { S07ModulosComercial } from "@/components/presentacion/slides/s07-modulos-comercial";
import { S08ModulosContenido } from "@/components/presentacion/slides/s08-modulos-contenido";
import { S09IA } from "@/components/presentacion/slides/s09-ia";
import { S10Cierre } from "@/components/presentacion/slides/s10-cierre";

export default function PresentacionJunio() {
  return (
    <Deck>
      <S01Portada />
      <S02PuntoDePartida />
      <S03Frentes />
      <S04Sitio1 />
      <S05Sitio2 />
      <S06Panel />
      <S07ModulosComercial />
      <S08ModulosContenido />
      <S09IA />
      <S10Cierre />
    </Deck>
  );
}
