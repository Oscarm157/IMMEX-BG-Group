# Landing de pauta pedimento (`/lp/pedimento`)

Landing del cluster "pedimento" del lote de 12. Sigue el molde fijado en
`docs/specs/landings-pauta-molde.md`: arquitectura, diseño, registro del copy y
prohibiciones de dato no se repiten aquí.

**Nota de origen.** Este spec se escribe después de que la página ya estaba construida:
el agente que la implementó murió por un error de conexión antes de dejar el documento.
El código en `src/app/lp/pedimento/page.tsx` ya compila, pasa `tsc` y `eslint` en cero, y
se documenta tal cual quedó. Este archivo no propone cambios sobre la página.

## Por qué esta keyword

Fuente: `/root/BG-reporte-keywords.html` (Google Keyword Planner + SEMrush, medición al
27 de julio de 2026).

| Palabra clave | Búsquedas/mes | Competencia | CPC alto |
|---|---|---|---|
| pedimento de importacion | 6,600 | Baja | $0.37 |
| pedimento aduanal | 1,900 | Baja | (sin dato) |
| pedimento de exportacion | 1,000 | Baja | $0.45 |
| pedimentos sat | 880 | Baja | (sin dato) |

Cluster de volumen agregado alto (10,380 búsquedas/mes) y competencia baja en las cuatro
variantes, con el CPC más bajo del lote donde hay dato ($0.37-$0.45). Volumen barato de
capturar si el copy filtra bien la intención informativa del término.

## Quién llega y qué quiere

El pedimento, a diferencia de "cove" o "vucem", no es un término ambiguo fuera del
comercio exterior: las cuatro variantes ya vienen calificadas ("de importación", "de
exportación", "aduanal", "sat"). Quien busca sabe qué es un pedimento; el filtro de
`docs/specs/landings-pauta-molde.md` negativas base ("qué es", "significado",
"ejemplos") ya saca al que busca la definición.

Regla que manda sobre el contenido, igual que en cove: **no es una página de "qué es un
pedimento"**. Existe esa página en `/guias/pedimento` para SEO orgánico; esta es de
pauta y entra por dónde se rompe: qué expone un pedimento que no coincide con la
mercancía o que no tiene sustento documental, y quién responde por eso ante la
autoridad.

**Tensión de intención con "pedimentos sat".** Esta variante tiene un componente
navegacional real: parte de quien la busca quiere el portal del SAT para consultar el
estatus de un trámite, no una revisión legal. Las negativas base del molde
("iniciar sesión", "contraseña", "mi cuenta") filtran parcialmente ese tráfico, pero no
filtran a quien busca "consultar pedimento" o "estatus de pedimento" sin llegar a
escribir "iniciar sesión". Se anota como riesgo abajo y se amplían las negativas de
ambigüedad propias del cluster con términos de consulta/seguimiento.

## Alcance

1. Ruta `src/app/lp/pedimento/page.tsx`, en español, `noindex` (metadata más la cabecera
   que `next.config.ts` ya aplica a `/lp/:path*`). Ya existe, ya compila.
2. Contenido de nivel especialista sobre lo que un pedimento declara, su sustento
   documental y la responsabilidad de la empresa frente a la autoridad.
3. `LeadPanel` con `campaign="Landing Pedimento (pauta)"`. No se toca el componente ni
   `/api/leads`.
4. Bloque propio: familia `PliegoRequisitos`, posición `tras-causas`, ancla "Qué declara
   cada bloque del pedimento" — asignación exacta de la tabla del molde.
5. Este spec: entregable de texto (anuncios, keywords, negativas).

## Fuera de alcance

- La anatomía del encargo conferido y quién responde frente al agente aduanal (tema de
  `/lp/agencia-aduanal`, ya en producción). El pedimento aquí menciona quién responde
  ante la autoridad de forma general (la empresa, no el agente), pero no desarrolla el
  encargo conferido ni sus artículos.
- El valor en aduana como tema propio: incrementables, métodos de valoración (tema de
  `/lp/valor-en-aduana`, pendiente en el lote).
- La fracción arancelaria como tema propio: reglas de clasificación, criterios de
  interpretación (tema de `/lp/clasificacion-arancelaria`, pendiente).
- La clave de pedimento y el régimen aduanero como tema propio: los seis regímenes
  comparados (tema de `/lp/regimenes-aduaneros`, pendiente).
- El sistema de control de inventarios del Anexo 24 como tema propio: módulos, datos
  mínimos (tema de `/lp/anexo-24`, pendiente; también usa la familia `PliegoRequisitos`,
  con posición y ancla distintas, ver "Diferencia obligatoria").
- La transmisión y el valor en la ventanilla digital (tema de `/lp/vucem` y `/lp/cove`,
  en producción).
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.
- Tocar `/guias`, la home, el CRM o las páginas de las otras landings.

## Fuente de verdad del contenido

Por orden. Nada que no salga de aquí se afirma en la página. Así lo deja el comentario
del propio `page.tsx` (líneas 14-16):

1. `src/content/guias.ts`, guía `pedimento` (`definicion`, `fundamento`, `puntosClave` y
   `errores`, slug en línea 296). `manifestacion-de-valor` (línea 385) y
   `regimenes-aduaneros` (línea 687) se citan **solo como fundamento de mención**, sin
   desarrollar su tema: son el sustento legal de dos de las cuatro causas, no contenido
   propio de esta página.
2. `docs/bgcg-source.md` para datos reales de la firma.
3. `src/components/lp/constantes.ts` para `SERVICIOS`, `CIFRAS`, `AREAS` y
   `CREDENCIALES_HERO`, reusados sin modificar (la página no sobreescribe `servicios` en
   su `CONFIG`, así que usa el default del molde).

### Verificación de fundamentos citados en la página

Los cuatro `fundamento` de `CAUSAS` existen ya en el corpus:

| Fundamento citado en la página | Existe en | Línea |
|---|---|---|
| Arts. 35, 36, 36-A y 37 Ley Aduanera · Anexo 22 de las RGCE (causas 1 y 4) | guía `pedimento`, campo `fundamento` | `src/content/guias.ts:310` |
| Art. 59 fracción III y art. 81 Ley Aduanera (causa 2) | guía `manifestacion-de-valor`, campo `fundamento` | `src/content/guias.ts:399` |
| Art. 90 Ley Aduanera (causa 3) | guía `regimenes-aduaneros`, campo `fundamento` | `src/content/guias.ts:701` |

Cero fundamentos nuevos. No hay bloqueante en este punto.

## Diferencia obligatoria contra las otras landings

Riesgo principal: el pedimento es el documento que casi todas las demás landings del
cluster aduanero mencionan de pasada (COVE se liga a él, el encargo conferido lo firma,
la clasificación y el régimen se asientan en él). El terreno exclusivo de esta página es
**el pedimento como documento que ampara la operación y prueba la legal estancia, y la
responsabilidad sobre lo que declara** — no cada dato particular que contiene.

- **`/lp/vucem` y `/lp/cove`** se quedan con la transmisión y el valor en la ventanilla
  digital (COVE, e.firma, acuse). Esta página no explica cómo se transmite nada: parte
  de que el pedimento ya existe y revisa lo que declara.
- **`/lp/valor-en-aduana`** (pendiente) se queda con los incrementables y los métodos de
  valoración. Aquí "valor en aduana" aparece solo como una fila del pliego (`PLIEGO`,
  tercer renglón) y como causa de que falte su manifestación, sin desarrollar
  incrementables ni el orden de los seis métodos.
- **`/lp/clasificacion-arancelaria`** (pendiente) se queda con la fracción: reglas de
  clasificación, criterios de interpretación. Aquí la fracción aparece como una fila del
  pliego y como la primera causa (que no corresponda a la mercancía), sin desarrollar
  cómo se determina.
- **`/lp/regimenes-aduaneros`** (pendiente) se queda con la clave y el régimen: los seis
  regímenes comparados por criterio. Aquí la clave aparece como fila del pliego y como
  causa 3, sin comparar regímenes entre sí.
- **`/lp/agencia-aduanal`** (en producción) se queda con el encargo conferido y el
  reparto de responsabilidad entre importador y agente. La FAQ de esta página
  ("¿Quién responde ante la autoridad?") toca el mismo eje de responsabilidad, pero solo
  para fijar que es la empresa y no desarrolla el encargo conferido ni sus artículos (40
  y 59-III): ese desarrollo completo vive en la otra landing.
- **`/lp/anexo-24`** (pendiente) usará la misma familia de layout (`PliegoRequisitos`)
  pero con ancla y contenido propios: "Módulos y datos mínimos del sistema". Aquí Anexo
  24 aparece solo en el último eslabón de la escalada de consecuencias ("El inventario
  IMMEX deja de conciliar"), como efecto de un pedimento mal elaborado, no como tema.

Criterio duro heredado: si un párrafo de esta página funciona igual en otra landing del
cluster, está mal escrito. Verificado con un script de comparación de literales (ver
"Cómo quedó"): cero strings de más de 60 caracteres compartidos con `cove`, `vucem`,
`immex` o `agencia-aduanal`.

## Contenido, sección por sección

Orden canónico del molde (hero sin numerar · causas+panel · bloque tras-causas ·
consecuencias · servicios · FAQ · identidad sin numerar · barra móvil). Descripción de lo
que la página realmente tiene, leído de `CONFIG` en `page.tsx`:

1. **Entrada (`hero`).** Eyebrow "Pedimento · Documento y responsabilidad". H1 "Asesoría
   legal para revisar lo que declara un pedimento". Lead: revisión de lo que asienta el
   pedimento, su sustento documental y la responsabilidad que asume la empresa frente a
   la autoridad. `medida: "22ch"` acota el ancho del H1.
2. **Causas (`CAUSAS`, 4), etiquetas propias `["Qué falla", "Qué se revisa"]`** (no el
   default "Qué ocurre / Qué se hace" — primera palanca de variación):
   - La fracción no corresponde a la mercancía. Arts. 35, 36, 36-A y 37 Ley Aduanera ·
     Anexo 22 de las RGCE. Se coteja la fracción contra la mercancía real antes del
     despacho.
   - El valor declarado no tiene manifestación que lo sostenga. Art. 59 fracción III y
     art. 81 Ley Aduanera. Se verifica que el valor tenga detrás la manifestación
     completa.
   - La clave no corresponde al régimen real. Art. 90 Ley Aduanera. Se confirma que la
     clave corresponda al régimen real antes de pagar.
   - El pedimento no trae la documentación que lo soporta. Arts. 35, 36, 36-A y 37 Ley
     Aduanera · Anexo 22 de las RGCE. Se arma el expediente documental que respalda cada
     pedimento.
3. **Bloque propio: "Qué declara cada bloque del pedimento" (`PliegoRequisitos`,
   tras-causas).** Cinco filas clave/valor, el ancla de especialista de la página: régimen
   y clave de pedimento, fracción arancelaria, valor en aduana, contribuciones (IGI, IVA,
   IEPS, DTA), y datos de quien importa o exporta. Es la única landing del lote hoy que
   enumera el contenido completo del pedimento como pliego (`/lp/anexo-24`, pendiente,
   usará la misma familia con otro contenido).
4. **Consecuencias (`ESCALADA`, 4 eslabones — segunda palanca de variación; cove y
   agencia-aduanal usan 3).** La discrepancia queda registrada → determinación de
   impuestos y multas → la legal estancia queda sin sostén → el inventario IMMEX deja de
   conciliar (Anexo 24). Cadena escalonada, sin `nota` adicional.
5. **Servicios (`SERVICIOS`, default de `constantes.ts`, sin sobreescribir).** Los mismos
   cuatro momentos y servicios reales del molde: expertos en comercio internacional,
   comercio exterior, compliance y aseguramiento, consultoría legal.
6. **Preguntas (`PREGUNTAS`, 3).** Qué se revisa primero en un pedimento antes de
   pagarlo · quién responde ante la autoridad por lo que declara (la empresa, no
   desarrolla el encargo conferido) · si el pedimento prueba por sí solo la legal
   estancia (es la prueba central, sostenida con factura, transporte y permisos).
7. **Banda de identidad**, reusada tal cual: logo, las tres cifras autorizadas y las 8
   áreas de práctica.

Además del `revision` dentro del `LeadPanel` (no es sección numerada): correspondencia
entre el pedimento y la mercancía real, sustento documental de cada dato declarado,
consistencia con el control de inventarios.

Sin bloque de "qué es un pedimento". Sin testimonios, sin logos de clientes, sin cifras
de resultado.

## Criterios de aceptación

- [x] Bloque propio presente, familia `PliegoRequisitos`, posición `tras-causas` —
      coincide con la asignación de la tabla del molde.
- [x] Dos palancas de variación movidas: `causas.etiquetas` propias ("Qué falla / Qué se
      revisa") y 4 eslabones en consecuencias (no 3).
- [x] Los cuatro `fundamento` existen ya en `src/content/guias.ts` (ver tabla arriba).
- [x] Solo las cifras 20/8/2, heredadas de `constantes.ts` sin cambio.
- [x] Cero afirmación sobre el modelo de despacho de BG (la FAQ 2 dice que la empresa
      responde, sin decir cómo despacha BG ni mencionar agentes aliados).
- [x] Ningún literal de más de 60 caracteres compartido con `cove`, `vucem`, `immex` ni
      `agencia-aduanal` (verificado con script, ver "Cómo quedó").
- [x] `npx tsc --noEmit --incremental false`: exit 0.
- [x] `npx eslint src/app/lp/pedimento/page.tsx`: exit 0.
- [ ] 200 y `noindex` por metadata y por cabecera `X-Robots-Tag`: no verificable por este
      agente sin servidor levantado. Pendiente del pase del orquestador.
- [ ] Texto visible entre 600 y 780 palabras: solo se corrió una aproximación por `node`
      sobre los strings del `CONFIG` (ver abajo), no una medición sobre el DOM
      renderizado. La aproximación da un estimado por encima del techo del rango — **la
      medición real contra la página servida es el pendiente más importante de este
      spec**, ver "Riesgos".
- [ ] Capturas reales en claro, oscuro y 375px: pendiente del pase del orquestador.
- [ ] Los tres estados del formulario (envío, éxito, error), probados con interceptación
      de `/api/leads`: pendiente del pase del orquestador.
- [ ] `campaign="Landing Pedimento (pauta)"` correcto en el payload: la página lo fija en
      `CONFIG.campaign` (línea 111), falta confirmar que llega tal cual al payload real.

## Entregable de texto: anuncios

Tres variantes, títulos ≤ 30 caracteres y descripciones ≤ 90, longitud real contada
carácter por carácter con `node` entre paréntesis.

### Variante 1 · El pedimento que no cuadra con la operación

Títulos:
- El pedimento no cuadra (22)
- Pedimento contra mercancía (26)
- Revisión de su pedimento (24)

Descripciones:
- Se revisa que el pedimento corresponda a la mercancía antes de pagarlo. (71)
- Firma legal de comercio exterior: pedimentos, fracción y clave. (63)

### Variante 2 · Revisión antes de una visita de la autoridad

Títulos:
- Revise su pedimento antes (25)
- Prepare su expediente aduanal (29)
- Antes de una visita aduanera (28)

Descripciones:
- Se revisa el sustento documental del pedimento antes de una visita de la autoridad. (83)
- Firma legal de comercio exterior con presencia en Tijuana y San Diego. (70)

### Variante 3 · Autoridad de la firma

Títulos:
- Firma legal, no un gestor (25)
- Revisión legal de pedimentos (28)
- Valor, fracción y régimen (25)

Descripciones:
- Sustento legal del pedimento y del expediente que lo respalda. (62)
- Revisión documental y defensa ante una determinación de la autoridad. (69)

Nota: esta variante se reescribió en la revisión del lote. La versión anterior repetía
carácter por carácter la de `/lp/agencia-aduanal` y compartía piezas con `/lp/immex`, y
usaba el título "20 años en comercio exterior", que afirma la cifra sin su matiz
obligatorio ("en promedio entre los socios"). La cifra sale de los títulos: donde hay
espacio para el matiz completo es en la descripción y en la banda de identidad de la
página.

## Entregable de texto: keywords y negativas

Grupo de anuncios que apunta a `/lp/pedimento`.

| Palabra clave | Volumen/mes | Competencia | Puja alta | Concordancia |
|---|---|---|---|---|
| pedimento de importacion | 6,600 | Baja | $0.37 | Frase |
| pedimento aduanal | 1,900 | Baja | sin dato | Frase |
| pedimento de exportacion | 1,000 | Baja | $0.45 | Frase |
| pedimentos sat | 880 | Baja | sin dato | Frase |

Solo los volúmenes y pujas reportados en la fuente. Las que dicen "sin dato" se cargan
sin cifra: no se inventa la puja.

Negativas base del molde: curso, diplomado, licenciatura, maestría, carrera,
universidad, qué es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo,
salario, bolsa de trabajo, iniciar sesión, contraseña, mi cuenta.

Negativas propias del cluster, por la intención navegacional de "pedimentos sat"
detectada arriba: consulta, estatus, seguimiento, rastreo, descarga (búsquedas de quien
quiere consultar o descargar su pedimento en el portal, no una revisión legal).

## Riesgos

1. **Estimado de palabras por encima del rango.** El conteo aproximado por `node` sobre
   los strings del `CONFIG` propio da 538 palabras (ver desglose abajo). Calibrando con
   el mismo método que usó el spec de `agencia-aduanal` (480 propias → 740 reales en
   cove, diferencia fija de ~260 palabras por los componentes compartidos del molde:
   credenciales del hero, servicios, banda de identidad, ficha del `LeadPanel`), el
   estimado para esta página es 538 + 260 ≈ **798 palabras totales**, por encima del
   techo de 780 del criterio de aceptación. Es una aproximación, no una medición: la
   página real puede quedar dentro del rango si el acordeón del FAQ o algún componente
   compartido pesa menos de lo calibrado con cove. **Este es el pendiente de mayor
   prioridad para el orquestador**: medir `document.body.innerText` a 1440px con la
   primera pregunta del acordeón abierta, contra la página servida. Si el conteo real
   confirma que excede 780, es una decisión de Oscar recortar contenido (el bloque
   propio de 5 filas y la escalada de 4 eslabones son los dos tramos más largos), no algo
   que este spec resuelve por sí solo, porque la tarea pide documentar la página como
   quedó, no modificarla.
2. **Tensión de intención en "pedimentos sat".** Documentada arriba: parte del volumen es
   navegacional al portal del SAT. Mitigado con negativas de consulta/estatus/seguimiento
   desde el día 1 y revisión del informe de términos de búsqueda en la primera semana.
3. **Canibalización de responsabilidad con `/lp/agencia-aduanal`.** Ambas tocan quién
   responde ante la autoridad. Se resuelve con la sección de diferencia obligatoria: aquí
   se afirma el hecho (la empresa responde) sin desarrollar el encargo conferido.
4. **Corpus delgado en un punto.** `manifestacion-de-valor` y `regimenes-aduaneros` se
   citan solo por su `fundamento`, sin usar su `definicion` ni `puntosClave` propios (eso
   sería invadir el tema de otras landings pendientes). Si al momento de escribir
   `/lp/valor-en-aduana` o `/lp/regimenes-aduaneros` se necesita ese material, ya está
   identificado y sin usar en el corpus.

## Por confirmar con BG

- Si el conteo real de palabras (riesgo 1) excede 780, decidir qué recortar: el pliego de
  5 filas o algún eslabón de la escalada.
- Volumen real de variantes largas no reportadas en el briefing (por ejemplo "pedimento
  de importacion pdf" ya cubierta por negativa base "pdf", pero "consulta de pedimento" u
  otras de cola larga), pendiente de SEMrush antes de subir la campaña.
- Revisión jurídica de la página antes de encender la pauta, igual que se pidió para
  VUCEM, COVE y agencia aduanal.

## Cómo quedó

La página ya estaba escrita cuando se recibió esta tarea (el agente que la construyó
murió por un error de conexión antes de dejar el spec). Este documento describe el
código tal cual existe en `src/app/lp/pedimento/page.tsx`, sin modificarlo.

**Verificación corrida por este agente:**

- `npx tsc --noEmit --incremental false`: exit 0.
- `npx eslint src/app/lp/pedimento/page.tsx`: exit 0.
- Script de comparación de literales (`re.findall` de strings entre comillas de más de 60
  caracteres) entre `pedimento/page.tsx` y `cove`, `vucem`, `immex`,
  `agencia-aduanal`: **cero coincidencias**.
- Los cuatro `fundamento` de `CAUSAS` verificados uno por uno contra
  `src/content/guias.ts` (tabla arriba, líneas 310, 399 y 701): cero fundamentos nuevos,
  cero bloqueante.
- Conteo de palabras propias por `node` sobre los strings del `CONFIG` (hero, encabezados
  de sección, las 4 causas completas, las 5 filas del pliego, la escalada completa de 4
  eslabones, las 3 preguntas del FAQ pero solo la primera respuesta —la que
  `Faq.tsx`/`BloqueFaq.tsx` monta en el DOM con el acordeón abierto por default en el
  índice 0—, y el `revision` del `LeadPanel`): **538 palabras propias**. Desglose:
  hero 35, encabezado de causas 20, las 4 causas 176, encabezado del bloque 25, el pliego
  93, encabezado de consecuencias 25, la escalada 88, FAQ (3 preguntas + 1 respuesta) 56,
  revisión 20.

No se corrió `npm run build` ni se levantó servidor, para no competir con otros agentes
del lote por `.next`, siguiendo la instrucción del molde. 200, `noindex` por cabecera,
capturas, los tres estados del formulario y la medición real de palabras contra
`document.body.innerText` quedan pendientes del pase del orquestador.

No se encontró ningún fundamento legal en la página que no exista ya en
`src/content/guias.ts`: no hay bloqueante de dato en este spec.
