# Landing de pauta Valor en aduana (`/lp/valor-en-aduana`)

Landing del molde compartido (`docs/specs/landings-pauta-molde.md`). Aquí solo se anota lo
que cambia respecto al molde: keyword, contenido, bloque propio y anuncios.

## Por qué esta keyword

Cluster que fusiona dos guías del corpus: `manifestacion-de-valor` (el documento) y
`valoracion-aduanera` (el método). Volúmenes del briefing:

| Palabra clave | Búsquedas/mes | Competencia | CPC alto |
|---|---|---|---|
| manifestacion de valor | 3,600 | Baja | (sin dato) |
| metodos de valoracion aduanera | 720 | Baja | $0.10 |
| valoracion aduanera | 590 | Baja | $0.09 |
| metodo de valoracion aduanera | 590 | Baja | $0.20 |
| calculo de impuestos de importacion mexico | 590 | Baja | $0.27 |
| manifestacion de valor vucem | 480 | Baja | $0.38 |

"manifestacion de valor" no trae CPC en el briefing: se carga sin cifra, no se inventa.

## Quién llega y qué quiere

Alguien que tiene que declarar un valor y sustentarlo, o a quien la autoridad se lo rechazó
y le determinó otro. Es uno de los casos más caros: si se cae el valor de transacción, se
recalcula toda la base gravable.

Regla que manda sobre el contenido: **no es la página de "qué es el valor en aduana"**. Es la
página de cómo se sustenta el valor declarado y qué método aplica cuando no se puede sostener
el de transacción.

## Alcance

1. Ruta nueva `src/app/lp/valor-en-aduana/page.tsx`, en español, `noindex`.
2. Contenido de nivel especialista sobre la base gravable: incrementables, vinculación entre
   partes, manifestación de valor, y la prelación de métodos cuando el de transacción no
   procede.
3. `LeadPanel` con `campaign: "Landing Valor en aduana (pauta)"`.
4. Bloque propio con la familia `LineaSecuencia`, primer uso real de esa familia en el sitio.
5. Entregable de texto en este archivo: variantes de anuncio y negativas.

## Fuera de alcance

- El resto del cluster (COVE, VUCEM, pedimento, agencia aduanal, clasificación arancelaria):
  cada uno tiene su propia landing, ya hecha o en curso por otro agente.
- Guía SEO nueva. Las dos guías del corpus (`manifestacion-de-valor`, `valoracion-aduanera`)
  ya existen y son la fuente.
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.
- Tocar `/guias`, la home, el CRM o las otras landings.

## Fuente de verdad del contenido

Por orden. Nada que no salga de aquí se afirma en la página.

1. `src/content/guias.ts`, guías `manifestacion-de-valor` y `valoracion-aduanera` (definición,
   fundamento, puntosClave, distinción y errores).
2. `src/app/lp/agencia-aduanal/page.tsx` y `cove/page.tsx` para el fundamento legal ya
   verificado que se reutiliza (arts. 59-III y 81 LA).
3. `docs/bgcg-source.md` y `docs/bgcg-site-content.txt` para servicios reales de BG.

## Diferencia obligatoria contra las otras landings

Esta es la landing con más riesgo de solapamiento del conjunto: el valor se menciona en casi
todas. Fronteras aplicadas:

- **Contra `/lp/cove`.** El COVE transmite el valor; esa landing trata la correspondencia
  entre COVE y pedimento. Aquí no se habla de transmisión ni de la ventanilla: se trata cómo
  se determina y se sustenta el valor antes de que exista un COVE que transmitir.
- **Contra `/lp/vucem`.** La manifestación de valor aparece ahí como una de cuatro causas de
  acceso al portal. Aquí es el tema central: se desarrolla con incrementables, conservación del
  expediente y vinculación, contenido que VUCEM no toca.
- **Contra `/lp/pedimento`.** El valor como dato del pedimento es su tema de paso; aquí es el
  eje: cómo se integra la cifra antes de que llegue a esa casilla.
- **Contra `/lp/agencia-aduanal`.** Quién responde por el valor (el importador, no el agente)
  es su ángulo central, con la cita del art. 59-III como bloque propio. Aquí ese argumento se
  cita una sola vez, dentro de la causa "manifestación de valor sin integrar", sin desarrollarlo
  como eje ni repetir su cita completa.
- **Contra `/lp/clasificacion-arancelaria`.** La fracción arancelaria es su tema; el valor no
  se toca ahí. Ambas landings comparten familia de bloque (`LineaSecuencia`), pero la mía
  secuencia métodos de valoración y la suya secuencia el sustento de una fracción: contenido
  y layout de datos distintos (números 01-05 sobre valor vs. su propia numeración sobre
  clasificación).

Criterio duro: si un párrafo de esta página funciona igual en `/lp/cove` o `/lp/vucem`, está
mal escrito.

## Contenido, sección por sección

1. **Entrada.** "Valor en aduana: cómo se determina y se sustenta". El valor de transacción
   como método principal, con sus incrementables, y que la ley (no la conveniencia) determina
   qué método sigue cuando no procede.
2. **Causas (`CAUSAS`, 3), etiquetas "Qué falla" / "Qué corrige":**
   - Precio de factura sin incrementables sumados. Arts. 64 y 65 LA.
   - Vinculación entre comprador y vendedor sin analizar. Arts. 64 a 78 LA (Acuerdo de
     Valoración de la OMC).
   - Manifestación de valor sin integrar. Art. 59, fracción III, y art. 81 LA.
3. **Bloque propio: la prelación de los métodos de valoración (`LineaSecuencia`, 5 hitos).**
   Valor de transacción, y los cuatro métodos secundarios en el orden que trae la guía:
   mercancías idénticas, mercancías similares, precio unitario de venta, valor reconstruido.
   Ver "Sobre los métodos nombrados" abajo.
4. **Consecuencias (`ESCALADA`, 3).** Valor de transacción rechazado, determinación por método
   secundario, crédito fiscal y multas.
5. **Servicios (`SERVICIOS`, default del molde).** Sin cambios.
6. **Preguntas (`PREGUNTAS`, 3).** Si el valor en aduana es el precio de factura, qué documento
   lo sustenta, y si BG determina el valor o solo asesora.
7. **Banda de identidad y barra móvil.** Default del molde.

### Sobre los métodos nombrados

La guía `valoracion-aduanera` (puntosClave "Métodos secundarios en orden") nombra **5 métodos
en total**: el valor de transacción como principal, y cuatro métodos secundarios que se
aplican sucesivamente: valor de mercancías idénticas, valor de mercancías similares, precio
unitario de venta y valor reconstruido. El corpus no nombra un sexto método (el de "criterios
razonables" o último recurso, que sí existe en el Acuerdo de Valoración de la OMC pero no
aparece en el texto de la guía): no se agregó de memoria, aunque es un método conocido.

Las descripciones de los 4 métodos secundarios se limitan a su posición en el orden
("se aplica cuando el anterior no procede"), sin inventar mecánica de cálculo por método
(deducciones, adiciones, comparables), porque el corpus no la detalla método por método.

## Criterios de aceptación

- [x] `/lp/valor-en-aduana` en español, `noindex` por metadata (verificar cabecera con el
      servidor del orquestador; no se levantó servidor en esta tarea).
- [x] Texto visible estimado en 718 palabras (ver "Cómo quedó"), dentro de 600-780.
- [x] Las 3 causas citan fundamento que existe en `src/content/guias.ts`. Cero fundamentos
      nuevos.
- [x] Bloque propio presente: `LineaSecuencia`, posición `tras-causas`, ancla en la prelación
      de métodos.
- [x] Al menos dos palancas de variación: causas = 3 (no 4), `etiquetas` propias ("Qué falla" /
      "Qué corrige").
- [x] Solo las cifras 20 / 8 / 2, con su matiz (compartidas vía `constantes.ts`, no tocado).
- [x] Cero afirmación sobre el modelo de despacho.
- [x] `tsc` y `eslint` en cero.
- [x] Anuncios dentro de 30/90, contados con `node`.
- [ ] Cero desbordes a 375px, tres estados del formulario, `campaign` en el payload: no
      verificados en esta tarea porque el spec prohíbe levantar servidor (hay 3 agentes en
      paralelo). Pendiente del pase de verificación del orquestador.

## Anuncios

Tres variantes, textos propios, sin reutilizar literales de otra landing (ver `ads_valor.mjs`
en el scratchpad de la sesión, longitudes contadas con `node`).

### Variante 1 · Determinación

Títulos:
- Valor en aduana rechazado (25)
- Recálculo de valor en aduana (28)
- Crédito fiscal por el valor (27)

Descripciones:
- Se revisa por qué se rechazó el valor declarado y qué método aplica después. (76)
- Firma legal de comercio exterior: valor en aduana e incrementables. (67)

### Variante 2 · Base gravable

Títulos:
- Fletes, seguros y regalías (26)
- Base gravable de importación (28)
- Incrementables del valor (24)

Descripciones:
- Fletes, seguros, comisiones y regalías se suman al valor. Se revisa antes de declarar. (86)
- Cálculo de impuestos de importación con la base gravable correcta. (66)

### Variante 3 · Sustento

Títulos:
- Manifestación de valor VUCEM (28)
- Sustento legal del valor (24)
- Dictamen de valor en aduana (27)

Descripciones:
- Se sustenta el valor declarado ante la autoridad, con el método que corresponde. (80)
- 20 años en promedio entre los socios en comercio exterior y aduanas. (68)

## Keywords y negativas

| Palabra clave | Volumen/mes | Competencia | Puja alta | Concordancia |
|---|---|---|---|---|
| manifestacion de valor | 3,600 | Baja | sin dato | Frase |
| metodos de valoracion aduanera | 720 | Baja | $0.10 | Frase |
| valoracion aduanera | 590 | Baja | $0.09 | Frase |
| metodo de valoracion aduanera | 590 | Baja | $0.20 | Frase |
| calculo de impuestos de importacion mexico | 590 | Baja | $0.27 | Frase |
| manifestacion de valor vucem | 480 | Baja | $0.38 | Frase |

Negativas base del molde: curso, diplomado, licenciatura, maestría, carrera, universidad,
qué es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo, salario, bolsa de
trabajo, iniciar sesión, contraseña, mi cuenta.

Negativas de ambigüedad propias del cluster: isr, impuesto sobre la renta, declaracion anual,
predial, valor catastral, avaluo catastral, manifestacion de bienes, manifestacion patrimonial,
manifestacion politica.

## Riesgos

1. **Canibalización con `/lp/vucem` y `/lp/cove`.** Los tres tocan el valor. Se resuelve con
   la sección de diferencia obligatoria de arriba y con concordancia de frase.
2. **"calculo de impuestos de importacion mexico" es ambigua.** Puede atraer búsquedas sobre
   ISR o impuestos internos, no aduaneros. Negativas de ambigüedad desde el día 1.
3. **Corpus del sexto método.** Si Oscar confirma que quiere el método de "criterios
   razonables" incluido, hace falta ampliar la guía `valoracion-aduanera` primero: no se agrega
   a la landing sin que exista en el corpus.

## Por confirmar con BG

- Volumen y CPC de "manifestacion de valor" (llega sin dato en el briefing).
- Si conviene documentar en la guía el sexto método de valoración (criterios razonables /
  último recurso) para poder incluirlo en esta landing más adelante.
- Revisión jurídica de la página antes de encender la pauta.

## Petición al molde

Ninguna. `LineaSecuencia` funcionó con los 5 hitos sin cambios: el grid fijo `sm:grid-cols-3`
los acomoda en dos filas (3 + 2); cada hito lleva su propio borde superior y punto, así que la
fila incompleta no rompe el patrón visual. Un aviso para quien lo use con 4 o 6 hitos: con 4 la
segunda fila queda con un solo elemento suelto a la izquierda, se ve mejor con 3, 5 o 6.

`CadenaConsecuencias` sí tiene una limitación real: la constante `SANGRIA` en
`src/components/lp/constantes.ts` solo define 3 niveles de sangría (`["", "sm:pl-5",
"sm:pl-10"]`). Con una cadena de 4 eslabones, el cuarto queda con `className={undefined}` (sin
sangría), rompiendo la progresión escalonada en vez de continuarla. Por eso esta landing se
quedó en 3 eslabones y movió otras dos palancas de variación en su lugar. No se tocó
`constantes.ts` porque está fuera del alcance permitido; si otra landing del cluster necesita
4 eslabones de verdad, `SANGRIA` necesita un cuarto valor (p. ej. `"sm:pl-14"`).

## Cómo quedó

**Conteo de palabras.** No se levantó servidor (prohibido por el spec: 3 agentes trabajando en
paralelo), así que no se midió `document.body.innerText` real. Se estimó sumando con `node`
todas las cadenas visibles de la página: hero, causas (3 × 4 campos), bloque propio (5 hitos),
consecuencias (3 pasos), alcance del formulario (3 líneas), preguntas (3 títulos + solo la
primera respuesta, porque el acordeón desmonta las demás del DOM) y el texto compartido fijo
(servicios, cifras, áreas, banda de identidad, barra móvil, textos fijos del formulario).
Resultado: **718 palabras**, dentro de 600-780. El método de conteo está en el scratchpad de la
sesión (`count2.mjs`) para que el orquestador lo pueda repetir o descartar contra la medición
real en el pase final.

**Fundamentos legales citados**, los tres ya existen en `src/content/guias.ts`:
- "Art. 64 y art. 65 Ley Aduanera" — tomado del texto de `fundamento` de `valoracion-aduanera`
  (línea 626: "el artículo 64 fija el valor de transacción como método principal... el 65 los
  incrementables").
- "Arts. 64 a 78 Ley Aduanera (Acuerdo de Valoración de la OMC)" — cita literal de
  `fundamento.cita` de `valoracion-aduanera` (línea 624).
- "Art. 59, fracción III, y art. 81 Ley Aduanera" — cita de `fundamento.cita` de
  `manifestacion-de-valor` (línea 399), la misma ya usada en `/lp/agencia-aduanal` (línea 28).

**Métodos de valoración nombrados por el corpus: 5.** El valor de transacción (principal) más
cuatro métodos secundarios en orden: mercancías idénticas, mercancías similares, precio
unitario de venta, valor reconstruido. Fuente: `valoracion-aduanera`, puntosClave "Métodos
secundarios en orden" (línea 642-643) y `fundamento.texto` (línea 626). El sexto método del
Acuerdo de Valoración de la OMC (criterios razonables / último recurso) no está nombrado en el
corpus y no se incluyó, siguiendo la instrucción explícita de no completarlo de memoria.

**Separación contra `/lp/cove` y `/lp/vucem`.** Ninguna de las dos palabras "COVE" ni
"ventanilla" aparece en el contenido propio de esta landing (sí en una pregunta del FAQ, "¿Qué
documento sustenta el valor declarado?", que menciona VUCEM solo en la keyword del título del
ad, no en el copy de la página). El eje aquí es la base gravable: cómo se integra (incrementables,
vinculación) y en qué orden se determina cuando el valor de transacción no procede. Ninguna
causa ni el bloque propio tratan la transmisión electrónica (tema de COVE) ni el acceso al
portal (tema de VUCEM).

**Palancas de variación movidas:** número de causas (3, no 4) y `causas.etiquetas` ("Qué
falla" / "Qué corrige", distinto del default y del resto del cluster). `consecuencias.nota` no
se usó: no había algo real que agregar sin repetir lo ya dicho en los tres pasos de la cadena.

Sin leads de prueba en Neon: no se probó el formulario en esta tarea (no se levantó servidor).
