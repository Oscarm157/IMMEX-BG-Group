# Landing de pauta Anexo 24 (`/lp/anexo-24`)

Décima landing de la familia sobre el molde `docs/specs/landings-pauta-molde.md`. Todo lo que
ese archivo fija (arquitectura, tipos, prohibiciones de dato, registro del copy, verificación)
aplica igual y no se repite aquí. Este spec sigue el esqueleto de `landing-pauta-cove.md`.

## Por qué esta keyword

Fuente: briefing entregado en el prompt de la tarea.

| Palabra clave | Búsquedas/mes | Competencia | CPC alto |
|---|---|---|---|
| anexo 24 | 2,400 | Baja | $1.30 |
| anexo 24 de las reglas generales de comercio exterior | 480 | Baja | (sin dato) |

`campaign: "Landing Anexo 24 (pauta)"`.

## Quién llega y qué quiere

Empresa IMMEX a la que le exigen un sistema de control de inventarios conforme al Anexo 24, o
que ya opera uno y no cuadra contra sus pedimentos. Es el primer punto que revisa la autoridad en
una visita domiciliaria.

Regla que manda sobre el contenido: **no es una página de "qué es el Anexo 24"**. Es la página de
qué debe registrar el sistema y qué pasa cuando no concilia.

## Alcance

1. Ruta nueva `src/app/lp/anexo-24/page.tsx`, en español, `noindex` (metadata + cabecera que
   `next.config.ts` ya aplica a `/lp/:path*`).
2. Contenido de nivel especialista sobre el sistema de control de inventarios del Anexo 24: qué
   registra, dónde se descuadra y qué expone frente a la autoridad.
3. `LeadPanel` con `campaign="Landing Anexo 24 (pauta)"`. No se toca el componente ni
   `/api/leads`.
4. Bloque propio `PliegoRequisitos`, posición `tras-servicios`: módulos y datos mínimos del
   sistema.
5. Entregable de texto en este archivo: anuncios, keywords y negativas.

## Fuera de alcance

- El programa IMMEX y sus causales de cancelación o suspensión: tema de `/lp/immex`.
- El Anexo 30 y el Anexo 31 de la certificación IVA/IEPS: tema de `/lp/certificacion-iva-ieps`.
  Aquí solo se distinguen en una línea (FAQ), sin desarrollarlos.
- La anatomía del pedimento como documento: tema de `/lp/pedimento`.
- Guía SEO propia del sistema de control de inventarios, más allá de la que ya existe en
  `/guias/anexo-24`.
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.

## Fuente de verdad del contenido

Por orden:

1. `src/content/guias.ts`, guía `anexo-24`: `definicion`, `fundamento`, `puntosClave`,
   `distincion` y `errores`. Es la fuente casi exclusiva del contenido propio.
2. `src/content/dictionaries.ts`, bloque `software` (es), y `src/app/[lang]/software/page.tsx`
   para la mención de BMS y su edición `BMS A24`.
3. `src/app/lp/pedimento/page.tsx` para el uso ya aprobado de la familia `PliegoRequisitos`.

Nada que no salga de aquí se afirma en la página. La guía `anexo-24` no enumera un listado
cerrado de "módulos del sistema": lo que trae son `puntosClave` (registro por pedimento, saldos
en tiempo, automatizado y conservable, trazabilidad de mermas) y una respuesta de `faq`
(disponibilidad ante la autoridad). El pliego usa exactamente eso, sin inventar un campo o
módulo que el corpus no enumera.

## Diferencia obligatoria contra las otras landings

- **Contra `/lp/immex`**: el programa y sus causales son su tema; el Anexo 24 aparece ahí solo
  como una de las obligaciones que sostienen el programa. Aquí se desarrolla de verdad: qué
  registra el sistema, dónde se descuadra y qué expone.
- **Contra `/lp/certificacion-iva-ieps`**: el Anexo 30 y el 31 son su tema. Aquí solo aparecen en
  una pregunta del FAQ, tomada literal de `distincion` en la guía, sin desarrollo.
- **Contra `/lp/pedimento`**: el pedimento como documento (qué declara cada bloque, régimen,
  fracción, valor, contribuciones) es su tema. Aquí el pedimento solo aparece como el punto
  contra el que se concilia el saldo del sistema, nunca como objeto de la página.

Criterio duro: si un párrafo de esta página funciona igual en otra landing, está mal escrito.

## Contenido, sección por sección

1. **Entrada.** H1 que nombra qué debe llevar el sistema, no qué es el Anexo 24. Formulario a la
   vista en escritorio.
2. **Causas (`CAUSAS`, 3).** Etiquetas propias `["Qué se descuadra", "Qué se concilia"]`, en vez
   del default. Tres fallas operativas tomadas de `errores` de la guía: saldos negativos o
   descuadrados, descargos fuera de plazo, control llevado en Excel en vez de un sistema
   automatizado.
3. **Bloque propio, `PliegoRequisitos`, tras-servicios.** Qué debe registrar el sistema: registro
   por pedimento, tipos de descargo, mermas y desperdicios, disponibilidad ante la autoridad.
   Cuatro filas, tomadas de `puntosClave` y de una respuesta del `faq` de la guía. Ninguna fila
   reformula en positivo una causa ya listada: el registro por pedimento, los tipos de descargo y
   la disponibilidad ante la autoridad son datos que las causas no tocan; la trazabilidad de
   mermas tampoco aparece antes. El único punto de contacto real con las causas es "automatizado",
   y se dejó fuera del pliego a propósito porque ya lo cubre la causa 3.
4. **Consecuencias (`ESCALADA`, 3).** De un saldo descuadrado a la determinación de crédito
   fiscal y multas, tomado del propio texto de `errores` ("la autoridad presume que la mercancía
   temporal no retornó").
5. **Servicios (`SERVICIOS` default, 4).** Sin cambios: los mismos cuatro momentos del resto de
   la familia.
6. **Preguntas (`PREGUNTAS`, 3).** Qué revisa primero la autoridad; Anexo 24 contra Anexo 30
   (distinción de mención); si BG proporciona el sistema (mención de BMS).
7. **Banda de identidad y barra fija**, sin cambios: identidad de la firma, no contenido de la
   keyword.

## Mención de BMS sin volver la página un anuncio del producto

Una sola línea, dentro del FAQ, en la pregunta que un lector ya haría ("¿BG proporciona el
sistema?"): la respuesta aclara que BG es la firma que revisa el sistema y su sustento legal, y
que el grupo también opera BMS con un módulo para el Anexo 24 (`BMS A24` en
`dictionaries.ts`), sin condicionar la asesoría legal a usarlo. No se cita la cifra "180+
empresas" (prohibida por el molde), no hay logo ni captura del producto, y el resto de la página
(causas, pliego, consecuencias, servicios) no vuelve a mencionarlo.

## Criterios de aceptación

- [x] Las 3 causas citan fundamento que existe en `src/content/guias.ts` (art. 59-I Ley Aduanera,
      Anexo 24 de las RGCE, Decreto IMMEX).
- [x] Bloque propio `PliegoRequisitos` presente, posición `tras-servicios`, con contenido que no
      reformula las causas.
- [x] Cero cifras de resultado, plazos, precios o casos. Cero "180+ empresas".
- [x] Cero afirmación sobre el modelo de despacho de BG.
- [x] `tsc --noEmit` y `eslint` en cero (ver abajo).
- [ ] Texto visible entre 600 y 780 palabras, medido con navegador. No se corrió Playwright en
      esta tarea (instrucción explícita de no levantar servidor); ver "Por confirmar" abajo.
- [ ] 200 y `noindex` por cabecera, tres estados del formulario, capturas en claro/oscuro y
      375px: pendientes del pase de verificación del lote (servidor compartido con otros
      agentes).

## Entregable de texto: anuncios

Tres variantes, títulos ≤30 caracteres y descripciones ≤90, longitud real entre paréntesis
(contada con `node`). Sin "20 años" en títulos. Sin texto copiado de otra landing.

### Variante 1 · Visita domiciliaria

Títulos:
- Anexo 24: revisión legal (24)
- Sistema Anexo 24 revisado (25)
- Anexo 24, revisión previa (25)

Descripciones:
- Se revisa si el sistema del Anexo 24 sostiene la conciliación ante una visita. (78)
- Firma legal de comercio exterior: control de inventarios, pedimentos y Anexo 24. (80)

### Variante 2 · Conciliación

Títulos:
- Saldo Anexo 24 no cuadra (24)
- Concilie su Anexo 24 (20)
- Inventario IMMEX sin cuadrar (28)

Descripciones:
- Saldo que no cuadra contra los pedimentos: se revisa antes de que la autoridad lo detecte. (90)
- Especialistas en Anexo 24 y control de inventarios IMMEX. Tijuana y San Diego. (78)

### Variante 3 · Autoridad legal

Títulos:
- Asesoría legal, Anexo 24 (24)
- Consultoría legal, Anexo 24 (27)
- Consultoría legal aduanal (25)

Descripciones:
- Sustento legal del sistema de control de inventarios frente a la autoridad. (75)
- Revisión legal antes de un crédito fiscal por un Anexo 24 mal conciliado. (73)

## Entregable de texto: keywords y negativas

| Palabra clave | Volumen/mes | Competencia | Puja alta | Concordancia |
|---|---|---|---|---|
| anexo 24 | 2,400 | Baja | $1.30 | Frase |
| anexo 24 de las reglas generales de comercio exterior | 480 | Baja | Sin dato | Frase |

Negativas, las del molde desde el día 1: curso, diplomado, licenciatura, maestría, carrera,
universidad, qué es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo, salario,
bolsa de trabajo, iniciar sesión, contraseña, mi cuenta.

Más las de ambigüedad propias de esta keyword: anexo 24 código fiscal, anexo 24 fonatur, anexo
24 (sin más contexto, riesgo de tráfico administrativo/fiscal ajeno a aduanas), norma iso 24.

## Riesgos

1. **Corpus delgado.** El material específico de Anexo 24 vive en una sola entrada de la guía. Se
   resolvió sin inventar: el pliego usa exactamente los 4 `puntosClave` más la respuesta de
   disponibilidad del `faq`, no un listado más largo de campos técnicos.
2. **Ambigüedad de "anexo 24".** El término se usa en otras normas (código fiscal, ISO). Negativas
   de ambigüedad desde el día 1 y revisión de términos de búsqueda en la primera semana.
3. **Cercanía con `/lp/immex`, `/lp/certificacion-iva-ieps` y `/lp/pedimento`.** Se resolvió con
   la sección de diferencia obligatoria de arriba: cada una desarrolla su propio tema y solo
   cita a las demás en una línea.

## Por confirmar con BG

- Revisión jurídica de la página antes de encender la pauta.
- Verificación con Playwright (200/noindex, tres estados del formulario, capturas responsive,
  conteo real de palabras) queda pendiente del pase de verificación del lote: esta tarea no
  levantó servidor porque hay otros dos agentes trabajando en paralelo sobre el mismo puerto.

## Petición al molde

Ninguna. El tipo `LandingPautaConfig`, la familia `PliegoRequisitos` y el orden canónico
cubrieron el contenido sin necesitar nada adicional.

## Cómo quedó

**Palancas de variación movidas** (mínimo 2 exigidas):
1. Número de causas: 3, no 4.
2. `causas.etiquetas` propias: `["Qué se descuadra", "Qué se concilia"]`, distinto del default y
   de los pares ya usados en `pedimento` ("Qué falla / Qué se revisa") y `valor-en-aduana` ("Qué
   falla / Qué corrige").
3. Eslabones de la cadena de consecuencias: 3.

**Fundamentos legales citados**, los tres ya existen en `src/content/guias.ts` (guía `anexo-24`,
campo `fundamento`): "Art. 59, fracción I, Ley Aduanera", "Anexo 24 de las RGCE" (abreviatura de
"Reglas Generales de Comercio Exterior", misma convención que usan `pedimento` y `valor-en-aduana`
con "RGCE") y "Decreto IMMEX", citado en el propio texto del `fundamento` de la guía ("Para el
programa, la obligación se refuerza en el Decreto IMMEX"). Cero fundamentos nuevos.

**Pliego**, de dónde salió cada fila:
- "Registro por pedimento": `puntosClave[0]` ("Registro por pedimento").
- "Tipos de descargo": `puntosClave[1]` ("Saldos en tiempo"), la mitad de esa entrada que
  enumera los tres tipos de descargo (retorno, transferencia por pedimento virtual, cambio de
  régimen). La otra mitad de esa misma entrada (el plazo) ya está cubierta por la causa 2.
- "Mermas y desperdicios": `puntosClave[3]` ("Trazabilidad de mermas y desperdicios"), literal.
- "Disponibilidad ante la autoridad": `faq[1]` de la guía ("¿El Anexo 24 se presenta ante la
  autoridad?"), que responde que no se presenta como declaración y que la autoridad la revisa en
  visita o al solicitar información.
- Se descartó una quinta fila de "conservación documental" (la otra mitad de `puntosClave[2]`,
  "Automatizado y conservable") por redundar en tono con la causa 3, que ya cubre el matiz de
  "automatizado" de esa misma entrada.

**BMS**: mencionado una sola vez, en el FAQ, como aclaración de que BG (la firma legal) y BMS (el
software del grupo, con el módulo `BMS A24`) son cosas distintas y que usar el software no es
condición de la asesoría. Ninguna cifra del software (se evitó "180+ empresas") ni afirmación
sobre el modelo de despacho.

**Texto visible**: no medido con navegador en esta tarea (no se levantó servidor, hay dos agentes
más trabajando en paralelo sobre el mismo puerto). Estimación por suma de strings propios
(`node`, excluyendo `metadata`): 519 palabras, por debajo del techo de ~540 que la calibración
del lote considera seguro para terminar entre 600 y 780 palabras renderizadas. Queda pendiente
la medición real en el pase de verificación del lote.

**Verificación corrida**: `npx tsc --noEmit --incremental false` y
`npx eslint src/app/lp/anexo-24/page.tsx`, ambos en cero. No se corrió `npm run build` ni se
levantó el servidor, por instrucción explícita de la tarea.
