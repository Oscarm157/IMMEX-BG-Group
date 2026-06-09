import { Deck } from "@/components/presentacion/Deck";
import { S01Portada } from "@/components/presentacion/slides/s01-portada";
import { S02DeWordpressACodigo } from "@/components/presentacion/slides/s02-de-wordpress-a-codigo";
import { S03Frentes } from "@/components/presentacion/slides/s03-frentes";
import { S04Sitio } from "@/components/presentacion/slides/s04-sitio";
import { S05Panel } from "@/components/presentacion/slides/s05-panel";
import { S06PautaAds } from "@/components/presentacion/slides/s06-pauta-ads";
import { S07PautaEmail } from "@/components/presentacion/slides/s07-pauta-email";
import { S08Cierre } from "@/components/presentacion/slides/s08-cierre";

export default function PresentacionJunio() {
  return (
    <Deck>
      <S01Portada />
      <S02DeWordpressACodigo />
      <S03Frentes />
      <S04Sitio />
      <S05Panel />
      <S06PautaAds />
      <S07PautaEmail />
      <S08Cierre />
    </Deck>
  );
}
