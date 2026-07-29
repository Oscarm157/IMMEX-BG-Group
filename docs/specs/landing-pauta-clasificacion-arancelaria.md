# Landing de pauta Clasificación arancelaria (`/lp/clasificacion-arancelaria`)

Landing del lote B. Sigue el molde compartido en `docs/specs/landings-pauta-molde.md` y el
esqueleto de `docs/specs/landing-pauta-cove.md`. Aquí solo se escribe lo propio de esta keyword.

## Por qué esta keyword

Fuente: briefing entregado para el lote, cluster "Clasificación arancelaria".

| Palabra clave | Búsquedas/mes | Competencia | Puja alta (USD) |
|---|---|---|---|
| tigie | 4,400 | Baja | $0.37 |
| clasificacion arancelaria | 3,600 | Baja | $1.00 |
| fracciones arancelarias | 1,600 | Baja | sin dato |
| clasificacion arancelaria mexico | 260 | Baja | $0.28 |

"tigie" es el término de mayor volumen del cluster: quien lo busca ya conoce el nombre de la
tarifa y no necesita que se le explique qué es. Las otras tres variantes son declinaciones
directas del mismo tema, sin ambigüedad de idioma ni de marca.

## Quién llega y qué quiere

Alguien que tiene que clasificar una mercancía y no está seguro de la fracción, o a quien la
autoridad le objetó una ya declarada. **No es la página de "qué es la clasificación
arancelaria"**: es la página de cómo se sustenta una fracción y qué pasa cuando no se puede
sustentar frente a una revisión.

## Alcance

1. Ruta nueva `src/app/lp/clasificacion-arancelaria/page.tsx`, en español, `noindex` por
   metadata y por la cabecera `X-Robots-Tag` que ya aplica `next.config.ts` a `/lp/:path*`.
2. Contenido de nivel especialista: qué expone una fracción mal determinada y cómo se
   construye el sustento técnico de la que se declara.
3. `LeadPanel` con `campaign="Landing Clasificación arancelaria (pauta)"`. No se toca el
   componente ni `/api/leads`.
4. Bloque propio con la familia `LineaSecuencia` (obligatoria por asignación), posición
   `tras-servicios`.
5. Entregable de texto en este archivo: anuncios y negativas.

## Fuera de alcance

- Valoración aduanera y sus métodos (tema de `/lp/valor-en-aduana`).
- El régimen aduanero como tal (tema de `/lp/regimenes-aduaneros`).
- El pedimento como documento y sus campos (tema de `/lp/pedimento`).
- PROSEC y la Regla 8ª, capítulo 98 (tema de `/lp/prosec`).
- Las otras keywords del briefing general. Se propagan en su propia landing.
- Tocar `/guias`, la home, el CRM o cualquier otra landing del cluster.

## Fuente de verdad del contenido

Por orden. Nada que no salga de aquí se afirma en la página.

1. `src/content/guias.ts`, guía `clasificacion-arancelaria` (líneas 529-608): definición,
   fundamento legal, puntos clave, distinción y errores.
2. `src/content/guias.ts`, guías `pedimento` y `valoracion-aduanera` solo para confirmar el
   límite exacto de lo que no se desarrolla aquí (la fracción como dato del pedimento; el
   valor y sus métodos).
3. `src/components/lp/constantes.ts` para servicios, cifras y credenciales de la firma. No se
   modifica: se usa el default.
4. `src/app/lp/agencia-aduanal/page.tsx`, `immex/page.tsx` y `docs/specs/landing-pauta-cove.md`
   para el patrón ya aprobado.

### Prohibiciones de dato (heredadas del molde, no se repiten en detalle)

Cero fundamentos nuevos, solo las cifras 20/8/2 con su matiz, cero "180+ empresas", cero
afirmación sobre el modelo de despacho, cero cifras de resultado, sin testimonios.

## Diferencia obligatoria contra las otras landings

- Contra `/lp/pedimento`: ahí la fracción es un dato más entre los que declara el documento
  (régimen, valor, contribuciones, datos del importador); aquí es el objeto único de la
  página: cómo se determina y cómo se defiende.
- Contra `/lp/valor-en-aduana`: el valor de transacción, los incrementables y los métodos
  secundarios son su tema. Aquí no se desarrolla ningún método de valoración; la distinción
  "clasificación vs. valoración" de la guía se usa solo para marcar el límite, no se explica
  valoración.
- Contra `/lp/regimenes-aduaneros`: el régimen (definitivo, temporal, tránsito) no se toca.
- Contra `/lp/prosec`: el capítulo 98 y la Regla 8ª no se desarrollan. El bloque propio
  menciona "trato preferencial" solo en el sentido genérico de la guía (reglas de origen de un
  tratado o lista de un programa), sin entrar a PROSEC.

Criterio duro: si un párrafo de esta página funciona igual en otra landing del cluster, está
mal escrito.

## Contenido, sección por sección

1. **Entrada.** H1 que nombra el problema (sustento y defensa de la fracción), línea de apoyo
   sobre las Reglas Generales de Interpretación y el sustento documental.
2. **Causas (`CAUSAS`, 3).** Tres supuestos que exponen una fracción declarada: elegirla por
   el nombre comercial, tratar mercancías casi idénticas como si fueran la misma, dejar el
   criterio sin dictamen, no cotejar el trato preferencial contra la fracción, y dejar la
   corrección para cuando llega la auditoría.
3. **Bloque propio: la ruta de sustento de una fracción (`LineaSecuencia`, 4 hitos).** TIGIE
   como tarifa base, las Reglas Generales de Interpretación, las notas legales de sección y
   capítulo, y la consulta a la autoridad del artículo 47. Posición `tras-servicios`.
4. **Consecuencias (`ESCALADA`, 3).** De la inconsistencia detectada en revisión a la
   reclasificación de oficio y el cobro de la diferencia con recargos y multas.
5. **Servicios (`SERVICIOS`, default).** Los mismos cuatro momentos y servicios reales del
   molde, sin modificar.
6. **Preguntas (`PREGUNTAS`, 3).** Cómo se determina la fracción, si se puede pedir certeza
   antes de operar (art. 47) y qué hace BG frente a una fracción cuestionada.
7. **Banda de identidad y barra fija**, sin modificar.

## Variación obligatoria: palancas movidas

- **Número de causas**: 5, no 4.
- **`causas.etiquetas`**: `["Qué falla en la práctica", "Qué exige la regla"]`, propio del
  tema, no el default.
- Eslabones de la cadena de consecuencias: 3.

## Cómo el bloque propio no reformula las causas

Las tres causas describen **por qué falla** una fracción en la práctica: se elige por
parecido comercial, se confunde con una mercancía casi idéntica, queda sin dictamen, no se
coteja contra el trato preferencial, o se corrige tarde. Ninguna de ellas está centrada en la
TIGIE como tarifa, en el funcionamiento de las Reglas Generales de Interpretación, en las
notas legales o en el mecanismo de consulta del artículo 47: esos cuatro elementos solo se
mencionan de paso, como fundamento legal citado (columna `fundamento`), nunca como el punto
que la causa desarrolla. El bloque propio, en cambio, es la ruta jerárquica de fuentes que se
recorre para construir un sustento defendible, con el mismo patrón que el bloque aprobado de
`/lp/immex` (de qué norma cuelga cada parte del programa): un nivel por fuente legal, no un
nivel por error corregido. Nada de "esto falla" repetido en positivo sesenta líneas después.

## Criterios de aceptación

- [x] `tsc --noEmit` en 0.
- [x] `eslint` sobre el archivo en 0.
- [x] Texto de la landing entre 600 y 780 palabras. Medido con `node` sobre los strings de la
      config (hero, causas, bloque, consecuencias, faq, revision): **691 palabras**. No incluye
      `SERVICIOS`, `CIFRAS` ni `AREAS` (constantes compartidas, no propias de esta landing).
- [x] Las 3 causas y los 4 hitos del bloque citan fundamento que ya existe en
      `src/content/guias.ts` (líneas 543-545 y 562, guía `clasificacion-arancelaria`). Cero
      fundamentos nuevos.
- [x] Bloque propio presente, familia `LineaSecuencia`, posición `tras-servicios`.
- [x] Al menos dos palancas de variación movidas (ver arriba: tres movidas).
- [x] Solo las cifras 20/8/2, con su matiz, y solo en `CREDENCIALES_HERO`/`CIFRAS` (default,
      no se tocan) y en la descripción del anuncio de la variante 3.
- [x] Cero afirmación sobre el modelo de despacho de BG.
- [ ] Ningún literal de más de 60 caracteres compartido con otra landing: verificado por
      lectura contra `agencia-aduanal`, `immex`, `pedimento` y el spec de `cove`; no verificado
      contra `valor-en-aduana`, `regimenes-aduaneros` ni `prosec`, que otros agentes están
      construyendo en paralelo y cuyo texto final no se pudo leer. Pendiente del pase final del
      orquestador sobre el lote completo.
- [ ] Sin desbordes a 375px: no verificado en este agente (instrucción explícita de no levantar
      servidor ni correr build mientras el lote está en paralelo). Pendiente del pase del
      orquestador.
- [ ] Los tres estados del formulario, `campaign` en el payload y capturas reales: mismo
      motivo, pendientes del pase del orquestador sobre `:3141`.
- [x] Anuncios dentro de 30/90, contados con `node`.
- [x] Cero leads de prueba en Neon (no se probó el formulario en esta tarea).

## Anuncios

Tres variantes, textos propios, no copiados de ninguna otra landing del cluster. Conteo
carácter por carácter con `node` (títulos ≤ 30, descripciones ≤ 90); el número entre
paréntesis es la longitud real.

### Variante 1 · Fracción objetada

Títulos:
- Fracción arancelaria objetada (29)
- ¿Le objetaron su fracción? (26)
- Reclasificación de mercancía (28)

Descripciones:
- Se revisa el sustento de la fracción antes de que la autoridad reclasifique. (76)
- Firma legal de comercio exterior: TIGIE, RGI y defensa ante el SAT. (67)

### Variante 2 · Determinación técnica

Títulos:
- Clasificación arancelaria (26)
- Determine bien su fracción (26)
- Fracciones arancelarias, RGI (28)

Descripciones:
- Determinación de la fracción con las Reglas Generales de Interpretación. (72)
- Dictamen técnico de clasificación arancelaria. Tijuana y San Diego. (67)

### Variante 3 · Autoridad

Títulos:
- Consultoría legal aduanera (26)
- Sustento ante la autoridad (26)
- Dictamen de clasificación (25)

Descripciones:
- Sustento técnico de la fracción frente al SAT. Legal y trade compliance. (72)
- 20 años en promedio entre los socios, en comercio exterior y aduanas. (69)

## Keywords y negativas

Grupo de anuncios que apunta a `/lp/clasificacion-arancelaria`.

| Palabra clave | Volumen/mes | Competencia | Puja alta | Concordancia |
|---|---|---|---|---|
| tigie | 4,400 | Baja | $0.37 | Frase |
| clasificacion arancelaria | 3,600 | Baja | $1.00 | Frase |
| fracciones arancelarias | 1,600 | Baja | sin dato | Frase |
| clasificacion arancelaria mexico | 260 | Baja | $0.28 | Frase |

"fracciones arancelarias" no trae puja alta reportada en el briefing: se carga sin dato, no se
inventa la cifra.

Negativas, las de la base (curso, diplomado, licenciatura, maestría, carrera, universidad, qué
es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo, salario, bolsa de trabajo,
iniciar sesión, contraseña, mi cuenta) más las propias del cluster:

- **curso de clasificacion arancelaria**: tiene volumen propio (170/mes) y es intención de
  capacitación, no de contratar el servicio. La negativa "curso" de la base ya la filtra por
  concordancia amplia de negativa; se deja registrada aquí para que quede explícita al subir
  la campaña.
- tigre, tigres, tigresa (ruido fonético sobre "tigie").
- que es tigie, tigie pdf (ya cubiertas por "qué es" y "pdf" de la base, se listan por
  claridad del cluster).

## Riesgos

1. **"tigie" es un acrónimo poco conocido fuera del gremio.** Quien no trabaja en comercio
   exterior no lo busca; el volumen (4,400) confirma que sí es un término de uso corriente
   entre quien clasifica mercancía. Sin acción adicional, es una lectura de la keyword, no un
   riesgo de campaña.
2. **Corpus concentrado en una sola guía.** Todo el material específico de clasificación vive
   en `clasificacion-arancelaria` (líneas 529-608); no hay una segunda guía que lo profundice.
   Si al escalar el contenido faltara sustancia, no se rellena con supuestos: se anota aquí.
3. **Bloque propio con 4 hitos sobre una rejilla de 3 columnas.** `LineaSecuencia` no admite
   configurar el número de columnas (prohibido tocar `src/components/lp/**`). Con 4 hitos, el
   cuarto queda solo en una segunda fila en pantallas ≥640px. Es un efecto visual, no un
   desborde; se anota como "Petición al molde" abajo en vez de forzar solo 3 hitos y perder uno
   de los cuatro elementos que pide el spec de la tarea.

## Petición al molde

`LineaSecuencia` (`src/components/lp/familias/LineaSecuencia.tsx`) fija `sm:grid-cols-3` sin
parámetro de columnas. Para landings cuyo contenido natural trae 4 hitos (como esta, con
TIGIE / RGI / notas legales / consulta a la autoridad), un quinto o cuarto elemento cae solo en
una fila nueva. No se tocó el componente por estar prohibido; si otra landing del cluster
también necesita 4 hitos, valdría la pena que el componente acepte `sm:grid-cols-4` quizás vía
prop opcional. No se resuelve aquí, solo se deja anotado.

## Por confirmar con BG

- Revisión jurídica de la página antes de encender la pauta, igual que en el resto del
  cluster.
- Si "fracciones arancelarias" tiene puja real: el briefing la trae sin dato.

## Cómo quedó

**Palancas de variación**: número de causas (5, no 4), `causas.etiquetas` propias ("Qué falla
en la práctica" / "Qué exige la regla") y eslabones de la cadena de consecuencias (3). Tres
palancas movidas, dos requeridas por el molde.

**Fundamentos legales citados**, todos ya existentes en `src/content/guias.ts`, guía
`clasificacion-arancelaria`:
- "LIGIE y sus Reglas Generales y Complementarias · Sistema Armonizado" y "Art. 47 Ley
  Aduanera": tomados de `fundamento.cita` (línea 543) y `fundamento.texto` (líneas 544-545).
- Determinación por composición/función/grado de elaboración: `definicion`, párrafo 2 (línea
  539).
- Corrección más cara en plena auditoría: `definicion`, párrafo 3 (línea 540).
- Trato preferencial cotejado contra la fracción: `puntosClave`, "Habilita o niega el trato
  preferencial" (línea 558).
- Consulta a la autoridad ante duda razonable: `puntosClave`, "Puede consultarse ante la
  autoridad" (línea 562).
- Clasificar por semejanza comercial, ignorar notas legales, dictamen sin documentar:
  `errores` (líneas 574, 578, 582).

**Cero fundamentos nuevos.** No se citó ningún artículo, anexo o regla que no esté ya en el
corpus de `/guias`.

**Sobre el bloque propio y las causas**: ver la sección "Cómo el bloque propio no reformula
las causas" arriba. Las tres causas describen fallas concretas de la práctica de clasificar;
el bloque describe la jerarquía de fuentes legales que se recorre para sostener una fracción.
Ningún hito del bloque es el reverso positivo de una causa.

**Verificación corrida en esta tarea**: `npx tsc --noEmit --incremental false` y
`npx eslint src/app/lp/clasificacion-arancelaria/page.tsx`, ambos en 0. No se corrió
`npm run build` ni se levantó servidor, por instrucción explícita de no competir con los otros
3 agentes trabajando en paralelo sobre el mismo repo. La verificación contra `:3141` (200,
`noindex`, capturas 1440/375, formulario interceptado, `campaign` en el payload, literales
compartidos contra `valor-en-aduana`/`regimenes-aduaneros`/`prosec`) queda pendiente del pase
final del orquestador sobre el lote completo, como indican los criterios marcados `[ ]` arriba.

Sin leads de prueba en Neon: no se probó el formulario en esta tarea.

## Ajuste en la verificación del lote

La página se midió en 925 palabras de contenido contra el tope de 780. El conteo que hizo el
agente sin navegador (691) subestimó por mucho: no hay forma fiable de estimar `innerText` sumando
strings, así que el número solo vale medido contra el servidor.

El recorte fue estructural, no de copy:

- Las causas 1 y 2 decían lo mismo (clasificar por el nombre comercial y clasificar por parecido
  con otra mercancía son el mismo error) y se fusionaron en una.
- Se quitó la causa "La corrección, dejada para la auditoría": era un consejo, no un supuesto de
  falla, y su contenido ya estaba implícito en la cadena de consecuencias.
- Se apretaron los textos de los cuatro hitos, las tres respuestas del FAQ y los leads.

Quedó en 756 palabras, con 3 causas en vez de 5. La palanca de variación sigue cumplida: 3 causas
es distinto del default de 4, más las etiquetas propias.
