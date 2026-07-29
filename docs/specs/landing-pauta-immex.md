# Landing de pauta IMMEX (`/lp/immex`)

Landing nueva de la familia, sobre el molde fijado en `docs/specs/landings-pauta-molde.md`
y los pilotos `vucem` y `cove`. Aquí solo se documenta lo propio de IMMEX; lo que el
molde ya fija (arquitectura, `LandingPauta.tsx`, prohibiciones de dato, registro del
copy, verificación) no se repite.

## Por qué esta keyword

Fuente: `/root/BG-reporte-keywords.html` (Google Keyword Planner + SEMrush, medición al
27 de julio de 2026).

| Palabra clave | Tema | Búsquedas/mes | Competencia | Puja alta (USD) |
|---|---|---|---|---|
| immex | Programa IMMEX | 8,100 | Baja | $3.26 |
| programa immex | Programa IMMEX | 1,900 | Baja | $5.27 |
| decreto immex | Programa IMMEX | 1,600 | Baja | $0.74 |
| immex que es | Programa IMMEX | 1,600 | Baja | (sin dato) |

Las tres primeras cifras están verificadas en la tabla de Google Keyword Planner del
reporte. "immex que es" viene de la sección SEMrush del mismo reporte y no trae CPC: se
carga sin dato, no se inventa.

**Tensión de intención.** "immex que es" es búsqueda informativa pura ("qué es IMMEX"),
del mismo tipo que ya cubre la guía `/guias/que-es-immex`. La negativa base "qué es" la
filtra en la práctica: el volumen de esa variante que sí llega a la landing debería ser
marginal. Si el informe de términos de búsqueda de la primera semana muestra que "immex
que es" entra de todos modos y rebota, se separa a un grupo de anuncios propio o se
excluye con negativa exacta.

## Quién llega y qué quiere

Intención mixta, pero las tres keywords de mayor volumen ("immex", "programa immex",
"decreto immex") describen a alguien que ya opera bajo el programa o está por solicitarlo,
no a quien pregunta qué es IMMEX desde cero. Esa persona ya sabe la definición; lo que
busca es saber si su programa está en riesgo o qué obligación puede estarle faltando.

Regla que manda sobre el contenido: **no es una página de "qué es IMMEX"**. Ese contenido
ya existe en `/guias/que-es-immex` y es SEO, no pauta. Esta landing entra por el ángulo
de vigencia: qué hace que la autoridad suspenda o cancele un programa ya autorizado, y
qué se revisa para sostenerlo.

## Alcance

1. Ruta `src/app/lp/immex/page.tsx`, en español, `noindex` (`metadata.robots` más la
   cabecera `X-Robots-Tag` que `next.config.ts` ya aplica a `/lp/:path*`). Ya escrita.
2. Contenido de nivel especialista sobre la vigencia del programa IMMEX: causales de
   suspensión y cancelación, la cadena de consecuencias y las obligaciones que lo
   sostienen.
3. `LeadPanel` con `campaign="Landing IMMEX (pauta)"`, siguiendo el formato del molde
   (`"Landing <CLUSTER> (pauta)"`). No se toca el componente ni `/api/leads`.
4. Mismo shell `src/app/lp/layout.tsx`. La landing es su propio archivo.
5. Bloque propio con la familia `EscaleraNiveles`, posición `tras-consecuencias`, según
   la asignación del molde.
6. Entregable de texto en este mismo archivo: variantes de anuncio, keywords y negativas.

## Fuera de alcance

- Las otras keywords del cluster IMMEX que no entraron en este briefing.
- Tocar `/guias/que-es-immex`, `/guias/decreto-immex` o `/guias/anexo-24`: son la fuente
  de contenido, no se editan.
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.
- Tocar `src/components/lp/**`, `src/app/lp/layout.tsx`, `next.config.ts`,
  `src/content/**`, `src/lib/**`, el molde, o las páginas de las otras landings.

## Fuente de verdad del contenido

Por orden. Nada que no salga de aquí se afirma en la página.

1. `src/content/guias.ts`: guías `que-es-immex` (definición, `puntosClave`, `distincion`,
   `errores`, fundamento arts. 4, 5 y 108), `decreto-immex` (fundamento arts. 11, 24 y 27,
   `puntosClave` y `errores` sobre causales de cancelación) y `anexo-24` (fundamento art.
   59-I Ley Aduanera y Anexo 24 de las RGCE, para el control de inventarios).
2. `docs/bgcg-source.md` y `docs/bgcg-site-content.txt` para servicios reales de BG (banda
   de servicios, compartida, no se redeclara).
3. `src/app/lp/vucem/page.tsx` y `cove/page.tsx` para el fundamento legal ya verificado y
   las cifras autorizadas de la firma.

Prohibido inventar cifras, plazos, precios, número de clientes o casos. Lo que falte se
anota abajo en "Por confirmar con BG" y la página se entrega sin él.

## Diferencia obligatoria contra las otras landings

Riesgo principal: IMMEX es el programa marco del que cuelgan varias landings ya
asignadas o planeadas en el molde, cada una con su propio recorte legal. Esta página no
puede invadir el terreno de ninguna:

- **`/lp/anexo-24` se queda con el detalle del sistema de control de inventarios.** Aquí
  el Anexo 24 solo aparece como una de las obligaciones que sostienen el programa (nivel
  "Control" del bloque propio y causal "Inconsistencias graves en el inventario"), sin
  desarrollar módulos, saldos ni descargos: eso es contenido propio de esa landing.
- **`/lp/certificacion-iva-ieps` se queda con las modalidades A, AA y AAA.** Esta página
  menciona que el IVA y el IEPS de la importación temporal no quedan exentos solo por
  tener IMMEX (FAQ 2), pero no entra a las modalidades de la certificación ni a sus
  requisitos: es la landing de certificación la que las desarrolla.
- **`/lp/prosec` se queda con PROSEC y la Regla 8ª.** No aparecen en esta página en
  absoluto: son beneficios arancelarios distintos del programa IMMEX, aunque a veces se
  confunden en boca del cliente.
- **`/lp/regimenes-aduaneros` se queda con la importación temporal como régimen.** Aquí la
  importación temporal solo se toca de refilón, en la causal de "Mercancía sin retornar
  en el plazo del régimen" y en la FAQ 3, sin comparar regímenes ni desarrollar la
  mecánica general del régimen temporal: eso es tema de esa landing.

El terreno propio de `/lp/immex`, el que ninguna otra landing cubre: **el programa como
autorización que se puede perder.** No el trámite de obtenerlo, no el control de
inventarios en detalle, no el régimen aduanero en abstracto: las causales concretas de
suspensión y cancelación, la cadena de consecuencias que sigue a no corregirlas, y las
cuatro obligaciones que, sostenidas, mantienen el programa vigente.

Criterio duro, heredado de cove: si un párrafo de esta página funciona igual en
`/lp/anexo-24`, `/lp/certificacion-iva-ieps`, `/lp/prosec` o `/lp/regimenes-aduaneros`
cuando existan, está mal escrito.

## Contenido, sección por sección

Orden real que arma `LandingPauta.tsx` con `bloque.posicion: "tras-consecuencias"`:

1. **Hero.** Eyebrow "IMMEX · Vigencia del programa"; H1 "Asesoría legal para no perder
   el programa IMMEX"; lead centrado en revisar las obligaciones antes de que una
   inconsistencia derive en suspensión o cancelación. `medida: "20ch"` acota el ancho del
   H1.
2. **Causas (`CAUSAS`, 5) + `LeadPanel`.** Etiquetas propias `["Qué exige", "Qué se
   revisa"]`, no el default del molde. Las cinco causales, cada una `titulo` /
   `fundamento` / `ocurre` / `hace`: domicilio fiscal no localizado (Decreto IMMEX, art.
   27), inconsistencias graves en el inventario (art. 59-I Ley Aduanera y Decreto IMMEX
   art. 27), mercancía sin retornar en el plazo del régimen (art. 108 Ley Aduanera),
   operación fuera de la modalidad autorizada (Decreto IMMEX arts. 4 y 5) y reporte anual
   no presentado (Decreto IMMEX, art. 24). El `LeadPanel` trae el alcance de la primera
   revisión (`REVISION`, 3 puntos: causales aplicables, estado del control de inventarios,
   plazos y modalidad).
3. **Consecuencias (`ESCALADA`, 3).** Cadena ascendente: impuestos diferidos exigibles →
   suspensión del programa → cancelación del programa. No es una lista de causas
   distintas, es la escalada de lo que pasa si una causal no se corrige.
4. **Bloque propio: Obligaciones (`NIVELES`, familia `EscaleraNiveles`, posición
   `tras-consecuencias`).** Cuatro niveles ascendentes, no tres: control (sistema
   automatizado de inventarios, Anexo 24), plazo (retorno, transferencia o cambio de
   régimen a tiempo), alcance (operar dentro de la modalidad autorizada) y reporte
   (reporte anual de operaciones). Es el ancla de especialista de la página: la respuesta
   positiva a "qué sostiene el programa", en espejo de las causales negativas de la
   sección 2.
5. **Servicios.** `BandaServicios` con la constante compartida `SERVICIOS` de
   `constantes.ts`, sin override: la landing no declara `config.servicios`.
6. **Preguntas (`PREGUNTAS`, 3).** Causales de suspensión/cancelación (art. 27); si IMMEX
   exenta IVA e IEPS (no de forma automática); qué pasa si la mercancía no retorna en
   plazo (depende del bien, Ley Aduanera).
7. **Banda de identidad** (sin numerar) y **barra fija móvil**: componentes compartidos,
   sin cambios.

Sin bloque de "qué es IMMEX". Sin testimonios. Sin logos de clientes. Sin cifras de
resultado.

## Criterios de aceptación

Verificables uno por uno sobre la página servida, no sobre el código:

- [ ] `/lp/immex` responde 200 y trae `noindex` por metadata y por cabecera.
- [ ] Texto visible entre 600 y 780 palabras.
- [ ] Las 5 causas y los 4 niveles del bloque propio citan fundamento legal que existe en
      `src/content/guias.ts` (`que-es-immex`, `decreto-immex`, `anexo-24`). Cero
      fundamentos nuevos.
- [ ] El bloque propio (`EscaleraNiveles`, "Obligaciones que sostienen el programa") está
      presente en posición `tras-consecuencias`.
- [ ] Al menos dos palancas de variación movidas respecto al default: 5 causas (no 4) y
      etiquetas propias (`["Qué exige", "Qué se revisa"]`, no el default).
- [ ] Cero cifras de resultado, plazos, precios o casos. Las únicas cifras posibles son
      las tres autorizadas de la firma (20/8/2), y esta página no las usa fuera de la
      banda de identidad compartida.
- [ ] Cero afirmación sobre el modelo de despacho de BG.
- [ ] Ningún literal de más de 60 caracteres compartido con otra landing.
- [ ] Secciones hermanas con familias de layout distintas: fila de expediente (Causas),
      cadena escalonada (Consecuencias), escalera ascendente (bloque propio), lista fluida
      (Servicios), acordeón (Preguntas).
- [ ] Sidebar de ~380px que empuja el contenido en escritorio; en móvil barra inferior con
      ancla al formulario.
- [ ] Responsive real a 375px, sin desbordes.
- [ ] El formulario nace con sus tres estados: envío, éxito y error.
- [ ] `campaign="Landing IMMEX (pauta)"` llega al lead en `service`.
- [ ] `pnpm build`, `tsc --noEmit` y `eslint` en cero. **Ya verificado por quien escribió
      la página**: tsc y eslint en 0 según el encargo de este spec.
- [ ] Capturas reales en claro, oscuro y 375px.
- [ ] Cero leads de prueba dejados en Neon. Si se prueba el formulario, se anota el correo
      usado para poder borrarlo.

## Entregable de texto: anuncios

Tres variantes. Ángulos: (1) el programa en riesgo, (2) las obligaciones que lo
sostienen, (3) autoridad de la firma. Conteo hecho carácter por carácter con `node`
sobre el texto exacto (títulos ≤ 30, descripciones ≤ 90). El número entre paréntesis es
la longitud real.

### Variante 1 · El programa en riesgo

Títulos:
- Su IMMEX puede suspenderse (26)
- Riesgo de perder el IMMEX (25)
- Programa IMMEX en riesgo (24)

Descripciones:
- Se revisan las causales que exponen la vigencia del programa antes de una visita. (81)
- Firma legal de comercio exterior: vigencia, inventarios y reporte anual del IMMEX. (82)

### Variante 2 · Las obligaciones que lo sostienen

Títulos:
- Obligaciones del IMMEX (22)
- Lo que sostiene su IMMEX (24)
- Inventario, plazo y reporte (27)

Descripciones:
- Control de inventarios, retorno en plazo y reporte anual: se revisa que estén al día. (85)
- Especialistas en programa IMMEX y comercio exterior. Tijuana y San Diego. (73)

### Variante 3 · Autoridad de la firma

Títulos:
- Asesoría legal, no gestoría (27)
- Consultoría legal aduanal (25)
- Legal, trade compliance e IT (28)

Descripciones:
- Sustento legal del programa IMMEX. 20 años en promedio entre los socios, 8 áreas. (81)
- Recursos administrativos, acuerdos conclusivos y juicio ante el TFJA. (69)

Nota de cifras: la única variante con cifra de la firma es la descripción 1 de la
Variante 3, y lleva el matiz completo ("20 años en promedio entre los socios, 8 áreas").
Ningún título usa la cifra: 30 caracteres no alcanzan para el matiz completo y no se
trunca la precisión, a diferencia del ad de `/lp/cove` que sí truncó por ser texto ya
publicado en `/lp/vucem`. Aquí, al ser texto nuevo, se prefirió mover la cifra a la
descripción, donde cabe completa.

## Entregable de texto: keywords y negativas

Grupo de anuncios que apunta a `/lp/immex`.

| Palabra clave | Volumen/mes | Competencia | Puja alta | Concordancia |
|---|---|---|---|---|
| immex | 8,100 | Baja | $3.26 | Frase |
| programa immex | 1,900 | Baja | $5.27 | Frase |
| decreto immex | 1,600 | Baja | $0.74 | Frase |
| immex que es | 1,600 | Baja | Sin dato | Frase |

Negativas, las del reporte desde el día 1 (base compartida por todas las landings):
curso, diplomado, licenciatura, maestría, carrera, universidad, qué es, significado,
ejemplos, formato, pdf, gratis, vacantes, sueldo, salario, bolsa de trabajo, iniciar
sesión, contraseña, mi cuenta.

No se detectó ambigüedad propia del cluster que amerite negativas adicionales. A
diferencia de "cove" (palabra en inglés y nombre de marca), "immex" es un término
específico del comercio exterior mexicano sin homónimos frecuentes en otros rubros; la
competencia "Baja" reportada en las cuatro keywords es consistente con eso. La única
tensión real es la de intención informativa de "immex que es", ya cubierta arriba y por
la negativa base "qué es".

## Riesgos

1. **Canibalización con las landings que faltan del cluster.** `/lp/anexo-24`,
   `/lp/certificacion-iva-ieps`, `/lp/prosec` y `/lp/regimenes-aduaneros` comparten el
   mismo programa marco. Se resuelve con la sección de diferencia obligatoria de arriba;
   cuando esas landings se escriban, revisar que no invadan el terreno de esta.
2. **"immex que es" con intención puramente informativa.** El volumen (1,600/mes) es
   significativo frente a las otras tres. Si el CTR es bajo o el rebote alto en la
   primera semana, se separa a un grupo de anuncios propio o se corta con negativa exacta
   adicional.
3. **Corpus concentrado en tres guías.** El material verificado vive en `que-es-immex`,
   `decreto-immex` y `anexo-24`. Si al operar la campaña se necesita un ángulo nuevo que
   no está en esas tres guías, no se rellena: se anota en "Por confirmar con BG".

## Por confirmar con BG

- Revisión jurídica de la página antes de encender la pauta, igual que se pidió para
  VUCEM y COVE.
- Si conviene separar "immex que es" a su propio grupo de anuncios o dejarlo dentro del
  mismo grupo con negativa exacta, según el informe de términos de búsqueda real.

## Cómo quedó

Este spec se escribió después de que la página ya estaba construida, revisada y
aprobada (`pnpm tsc --noEmit` y `eslint` en 0); documenta lo que existe en
`src/app/lp/immex/page.tsx`, no una propuesta. No se tocó el archivo de la página para
escribir este documento.

**Fundamentos legales verificados contra el corpus** (los cinco `fundamento` de `CAUSAS`
más los cuatro niveles del bloque propio citan un subconjunto de estos mismos artículos,
ya presentes en `src/content/guias.ts`):

- Decreto IMMEX (DOF 1 de noviembre de 2006) · art. 27 → guía `decreto-immex`, campo
  `fundamento.cita` (línea 233: "...arts. 11, 24 y 27").
- Art. 59, fracción I, Ley Aduanera → guía `anexo-24`, campo `fundamento.cita` (línea 55:
  "Art. 59, fracción I, Ley Aduanera...").
- Art. 108 Ley Aduanera → guía `que-es-immex`, campo `fundamento.cita` (línea 144: "...Art.
  108 Ley Aduanera").
- Decreto IMMEX, arts. 4 y 5 → guía `que-es-immex`, campo `fundamento.cita` (línea 144:
  "Decreto IMMEX (DOF 1 de noviembre de 2006), arts. 4 y 5").
- Decreto IMMEX (DOF 1 de noviembre de 2006) · art. 24 → guía `decreto-immex`, campo
  `fundamento.cita` (línea 233, mismo artículo que el art. 27).

Ningún fundamento de la página está fuera del corpus. No hay bloqueante de dato.

**Palabras del contenido propio**: 524, contadas con `node` sobre las cadenas de texto
propias del `CONFIG` (hero, causas, niveles del bloque propio, consecuencias, preguntas,
alcance del panel y encabezados de sección). No incluye el texto de los componentes
compartidos (`SERVICIOS`, `BandaIdentidad`, labels del `LeadPanel`), que suman lo
necesario para llegar al rango de 600-780 palabras visibles en la página completa. La
medición real sobre `document.body.innerText` renderizado queda pendiente del
orquestador, junto con el 200/`noindex` contra el servidor, las capturas y los tres
estados del formulario.
