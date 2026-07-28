# Landing de pauta: VUCEM (piloto)

Estado: en construcción · Impacto: verde (Oscar lo pidió explícito el 2026-07-28)
Repo: bg-group · Rama: `feat/lp-vucem`

## Objetivo

Primera de una familia de landings que reciben el clic de Google Ads. Una landing por palabra
clave del reporte `public/BG-estrategia-sem-seo.html`. Esta es el **piloto**: fija el patrón
(estructura, tono, captura de datos) que después se replica, no la cobertura.

Keyword piloto: **VUCEM**. 90,500 búsquedas/mes en México, dificultad 36%, CPC estimado 0.45 USD,
**cero anunciantes pagando hoy**. Los primeros lugares orgánicos son portales de gobierno, así que
posicionar por SEO no es viable: es la keyword donde el anuncio es la única entrada.

## Quién llega y qué quiere

Intención **navegacional**: la persona quiere entrar al portal a hacer un trámite, no leer teoría.
Ya opera en comercio exterior. Es responsable de tráfico, comercio exterior o finanzas en una
empresa IMMEX, o un agente aduanal.

De ahí la regla que manda sobre todo el contenido: **no es una página de "qué es VUCEM"**. Quien
busca eso ya lo sabe. BG es una firma de especialistas y la página tiene que demostrarlo en los
primeros diez segundos, o el visitante se va al portal de gobierno que está justo abajo.

## Alcance

1. Ruta nueva `/lp/vucem`, en español, `noindex` (es tráfico pagado, no debe competir con `/guias`).
2. Contenido de nivel especialista sobre operar en VUCEM: qué se atora, por qué se rechaza, qué
   consecuencia legal tiene y cómo se previene.
3. Formulario de captura en **sidebar fijo** en escritorio, que acompaña el scroll sin tapar el
   contenido. En móvil no hay sidebar: barra inferior con ancla al formulario, que va al final.
4. El lead entra por el `/api/leads` que ya existe. No se crea endpoint nuevo ni tabla nueva.
5. Entregable de texto aparte, en este mismo archivo: variantes de anuncio y el mapa de keywords.

## Fuera de alcance

- Las otras 37 keywords SEM. Se propagan después, con este patrón ya aprobado.
- Tocar `/guias`, la home o el CRM.
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.
- Versión en inglés. La pauta corre en México.

## Fuente de verdad del contenido

Por orden. **Nada que no salga de aquí se afirma en la página.**

1. `src/content/guias.ts`, en especial `manifestacion-de-valor`, `pedimento`, `anexo-24` y
   `valoracion-aduanera`. Ese corpus ya tiene el registro correcto: definición propia, fundamento
   legal citado y errores con su consecuencia.
2. `docs/bgcg-source.md` y `docs/bgcg-site-content.txt` para servicios y capacidades reales de BG.
3. `public/BG-estrategia-sem-seo.html` para los datos de la keyword.

Prohibido inventar cifras, plazos, precios, tiempos de respuesta del portal, número de clientes o
casos. Si un dato hace falta y no está en las fuentes, **no se escribe**: se anota al final del
spec, en "Por confirmar con BG", y se entrega la página sin él. Un dato inventado en una página
de una firma legal es el peor error posible aquí.

## Estructura de la página

El orden importa: arriba lo que resuelve, abajo lo que convence.

1. **Entrada.** Título que nombra el problema operativo, no la marca. Una línea de apoyo y el
   formulario a la vista en escritorio.
2. **Lo que se atora en VUCEM.** El bloque de mayor valor. Cada caso: qué pasa, por qué la
   autoridad lo rechaza, qué se hace. Con fundamento legal donde exista en el corpus.
3. **Consecuencias.** Qué cuesta cada error: rechazo, crédito fiscal, multa, operación detenida.
   Es el ángulo que distingue a una firma legal de un despacho de trámites.
4. **Cómo entra BG.** Servicios reales del sitio, ligados a los problemas de arriba.
5. **Preguntas.** Las que se hace quien opera, no las de un glosario.
6. **Cierre.** Invitación a dejar los datos, con la promesa concreta de qué recibe a cambio.

Sin bloque de "qué es VUCEM". Sin testimonios. Sin logos de clientes.

## Diseño

- Hereda el sistema del sitio: tokens, tipografía y tema oscuro existentes. No se inventa escala
  ni paleta. Se reusan los componentes de `src/components/site` que apliquen.
- **Las secciones hermanas no pueden ser la misma tarjeta repetida.** Cada bloque con su propia
  familia de layout. Una rejilla de seis tarjetas iguales es el resultado a evitar.
- Sidebar de ~380px, fijo, que **empuja el contenido, no lo tapa**.
- Responsive real a 375px.
- La vista nace con sus estados: envío, éxito y error del formulario.

## Copy

Es el punto donde esta página se gana o se pierde. Oscar lo subrayó aparte del resto del spec.

**El registro: formal y serio, con un toque de camaradería.** Un especialista de BG hablándole a
otro profesional que ya sabe de lo que se trata. De colega a colega, no de vendedor a prospecto ni
de profesor a alumno. Se puede reconocer que un trámite es un dolor de cabeza; no se puede prometer
que desaparece.

- De usted. Registro institucional, igual que el resto del sitio.
- **Cero AI slop, sin excepción.** Prohibido: "solución integral", "transforma tu operación",
  "potencia", "sin fricciones", "lleva tu X al siguiente nivel", "de clase mundial", "empodera".
- **Prohibida la promesa mágica.** Nada de "olvídese de sus problemas", "despreocúpese",
  "nosotros nos encargamos de todo", "deje de preocuparse por la aduana". Si algo es complejo, se
  dice que es complejo. Lo que se ofrece es criterio y respaldo, no que el problema se evapore.
- Sin em-dashes.
- Títulos planos y descriptivos. Dicen el tema, no juegan con él. Prohibida la frase paralela de
  consultor tipo "Autoridad que compone".

## Anuncios de Google Ads

Tres variantes, cada una con un tono distinto y su pain point. Respetar los límites de Google:
títulos de 30 caracteres, descripciones de 90.

1. **Prevención.** El riesgo de que un trámite mal presentado se convierta en crédito fiscal.
2. **Operación.** La urgencia de destrabar un trámite detenido.
3. **Autoridad.** El respaldo de una firma legal con veinte años, frente a un gestor.

Van al final de este archivo cuando estén escritas, no en un archivo aparte.

## Criterios de aceptación

Se verifican uno por uno antes de reportar. Los cuatro primeros son ejecutables.

1. `npm run build` pasa sin errores ni warnings nuevos.
2. `/lp/vucem` responde 200 y trae `noindex` en las cabeceras.
3. El formulario envía contra `/api/leads` y el lead queda registrado. Se prueba el envío bueno,
   el campo vacío y el error del servidor.
4. Captura con Playwright a 1440px y a 375px, con el sidebar visible en la primera.
5. Ningún dato que no salga de las fuentes listadas arriba.
6. Ninguna sección repite la familia de layout de su hermana.
7. Las tres variantes de anuncio caben en los límites de Google Ads, contados carácter por carácter.
8. Todo el texto, incluidos los anuncios, pasa `critico-anti-slop` sin violaciones. Ni una promesa
   mágica, ni una frase hueca, ni un em-dash.

## Riesgo principal

Que la página termine siendo un glosario bonito. Si el visitante que ya opera en comercio exterior
no aprende nada en el segundo bloque, la landing no sirve por más que convierta el formulario.

## Por confirmar con BG

Se llena durante la construcción con lo que hizo falta y no estaba en las fuentes.
