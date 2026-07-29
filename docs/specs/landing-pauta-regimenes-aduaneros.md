# Landing de pauta Regímenes aduaneros (`/lp/regimenes-aduaneros`)

Sigue el molde compartido, `docs/specs/landings-pauta-molde.md`, y el esqueleto de sección
de `docs/specs/landing-pauta-cove.md`. Aquí solo lo que cambia por esta keyword.

## Por qué esta keyword

Cluster propio, con volúmenes del briefing dado (sin fuente de CPC para ninguna variante):

| Palabra clave | Búsquedas/mes | Competencia |
|---|---|---|
| recinto fiscalizado | 3,600 | Baja |
| regimenes aduaneros | 2,400 | Baja |
| recinto fiscalizado estrategico | 1,000 | Baja |
| deposito fiscal | 1,000 | Baja |
| importacion temporal | 390 | Baja |

`campaign: "Landing Regímenes aduaneros (pauta)"`.

## Quién llega y qué quiere

Alguien que tiene que decidir bajo qué régimen entra su mercancía, o que ya entró bajo uno y
necesita cambiarlo o entiende mal sus plazos. No es una página de "qué son los regímenes
aduaneros": es la página de cómo se elige el régimen correcto y qué cuesta equivocarse.

## Alcance

1. Ruta nueva `src/app/lp/regimenes-aduaneros/page.tsx`, `noindex`.
2. Bloque propio `TablaCriterios` en `tras-causas`: los regímenes comparados por criterio.
3. `LeadPanel` con `campaign="Landing Regímenes aduaneros (pauta)"`.
4. Entregable de texto en este archivo: anuncios y keywords/negativas.

## Fuera de alcance

- La importación temporal como beneficio del programa IMMEX (tema de `/lp/immex`).
- La clave de pedimento como documento (tema de `/lp/pedimento`).
- La fracción arancelaria (tema de `/lp/clasificacion-arancelaria`).
- El control de inventarios Anexo 24 (tema de `/lp/anexo-24`).
- Alta de la campaña en Google Ads: aquí solo se entregan los textos.

## Fuente de verdad del contenido

1. `src/content/guias.ts`, guía `regimenes-aduaneros`: definición, fundamento (art. 90), los
   cuatro `puntosClave` (definitivo, temporal, depósito fiscal y tránsito, recinto fiscalizado
   y RFE), la `distincion` definitivo/temporal y los tres `errores`.
2. `src/content/guias.ts`, guía `que-es-immex`, solo como fundamento de mención: el art. 108
   (plazos de permanencia) y el dato de que la temporal es "el régimen sobre el que opera
   IMMEX". No se desarrolla el programa.
3. `src/content/guias.ts`, guía `pedimento`, solo como fundamento de mención: la clave declara
   el régimen. No se desarrolla el pedimento como documento.
4. `src/app/lp/agencia-aduanal/page.tsx` e `immex/page.tsx` para fundamento legal ya
   verificado y estructura de referencia.

Nada que no salga de aquí se afirma en la página. No se cita ningún artículo nuevo.

## Diferencia obligatoria contra las otras landings

- Contra `/lp/immex`: aquí la importación temporal es uno de cuatro regímenes comparados, no
  el programa. Solo se menciona que IMMEX opera sobre ella, en una celda de la tabla.
- Contra `/lp/pedimento`: la clave de pedimento no se desarrolla; solo aparece de paso en el
  título de la tercera causa ("Régimen elegido pedimento por pedimento").
- Contra `/lp/clasificacion-arancelaria` y `/lp/anexo-24`: sin mención, cero solapamiento.
- Terreno propio: el destino aduanero de la mercancía, cómo se elige entre los seis del
  artículo 90 y qué obligación arrastra cada uno.

## El bloque propio: `TablaCriterios`

Primera vez que se usa esta familia en una página real. Columnas: los cuatro regímenes con
datos propios y diferenciados en la guía (definitivo, temporal, depósito fiscal, recinto
fiscalizado estratégico). Tránsito y el recinto fiscalizado sin carácter estratégico quedan
fuera de la tabla: la guía los describe agrupados ("depósito fiscal y tránsito", "recinto
fiscalizado y RFE") y no trae para ellos un dato distinto por cada criterio, así que meterlos
como columna habría forzado a rellenar celdas sin sustento. Tres filas, no cuatro: se descartó
"qué pasa al vencer" como fila propia porque solo el régimen temporal tiene, en la guía, un
supuesto de incumplimiento escrito (los errores de `regimenes-aduaneros`); para definitivo,
depósito fiscal y RFE no hay ese dato, y esa fila se hubiera rellenado con inferencia. Una
tabla de 3×4 verdadera, no de 4×4 rellenada.

**Contenido completo y origen de cada celda**, todo de la guía `regimenes-aduaneros`
(`puntosClave` y `distincion`), salvo donde se indica:

| Criterio | Definitivo | Temporal | Depósito fiscal | Recinto fiscalizado estratégico |
|---|---|---|---|---|
| Pago de contribuciones | "Al nacionalizar; carga fiscal inmediata." — de `puntosClave` "Definitivo": "paga las contribuciones que correspondan... el de mayor carga fiscal inmediata." | "Diferido, condicionado al retorno en plazo." — de `puntosClave` "Temporal": "sin pagar de entrada los impuestos, condicionada a retornar." | "Determinado y suspendido en el almacén." — de `puntosClave` "Depósito fiscal y tránsito": "almacena mercancía con impuestos determinados y suspendidos hasta su destino." | "Diferido, con plazos más amplios." — de `puntosClave` "Recinto fiscalizado y RFE": "impuestos diferidos y plazos amplios." |
| Plazo de permanencia | "No aplica: es definitiva." — de `distincion` "Definitivo vs. temporal": "en el definitivo la mercancía se queda". | "Limitado; distinto para insumo o activo fijo." — de la guía `que-es-immex`, `errores` "Perder de vista los plazos de retorno": "insumos y activo fijo tienen plazos de permanencia distintos." | "Suspendido hasta que se le da destino." — mismo texto de `puntosClave` citado arriba ("hasta su destino"). | "Amplio: el mayor margen del grupo." — de `puntosClave`: "plazos amplios... la figura más completa de este grupo." |
| Para qué se usa | "Mercancía que se queda o sale en definitiva." — de `puntosClave` "Definitivo": "se nacionaliza (importación) o sale de forma definitiva (exportación)." | "Producir y exportar; base del programa IMMEX." — de `puntosClave` "Temporal": "es el régimen sobre el que opera IMMEX." | "Almacenar con impuestos suspendidos antes del destino." — mismo `puntosClave` de depósito fiscal. | "Elaborar, transformar o reparar en espacio habilitado." — de `puntosClave`: "Permiten elaborar, transformar o reparar mercancía dentro de un espacio habilitado." |

La única celda que cruza a otra guía es "Limitado; distinto para insumo o activo fijo.", de
`que-es-immex` (`errores`, ya citada en la guía y en `/lp/immex`), porque `regimenes-aduaneros`
no trae un dato específico de plazo para el régimen temporal más allá de "tiempo limitado".

## Diferencia contra las causas

Las causas dicen dónde falla la elección del régimen (nacionalizar lo que iba a ser temporal,
dejar vencer el plazo, decidir sin ver la operación completa). La tabla no repite eso: compara
los cuatro regímenes por contribuciones, plazo y uso, que es la pregunta previa a cualquiera de
esas fallas ("¿cuál me corresponde?", no "¿qué salió mal?").

## Variación obligatoria (palancas movidas)

- **Causas: 3**, no 4. Coincide con el número de `errores` que trae la guía; no se inventó una
  cuarta para llegar al default.
- **`causas.etiquetas` propias**: `["Qué se elige", "Qué corresponde"]`, distinto del default y
  de lo usado en `agencia-aduanal`, `immex` y `pedimento`.
- **Eslabones de la cadena: 4**, no 3 (mismo precedente que `pedimento`, ya aprobado con 4).
- **`consecuencias.nota` real**: "Cambiar de régimen después es posible, pero exige requisitos
  y, con frecuencia, pagar lo diferido." Toma el hecho de la guía (definición, tercer párrafo:
  "cambiar de régimen después es posible, pero rara vez es gratis ni inmediato") y aporta algo
  que la cadena de consecuencias no dice (la cadena habla de lo que pasa si no se corrige a
  tiempo; la nota dice que corregirlo a tiempo tampoco es gratis).

## Contenido, sección por sección

1. **Hero.** H1 "Régimen aduanero: cuál corresponde a su mercancía", dirigido a la decisión, no
   a la definición.
2. **Causas (3).** Nacionalizar lo que iba a ser temporal (art. 90) · mercancía temporal sin
   retornar en plazo (art. 108) · régimen elegido pedimento por pedimento, sin ver la operación
   completa (art. 90).
3. **Bloque propio: tabla de regímenes comparados**, ver arriba.
4. **Consecuencias (4 eslabones + nota).** De la mercancía sin retorno a la estancia irregular,
   al impuesto exigible con recargos, al crédito fiscal determinado.
5. **Servicios.** Los cuatro compartidos, sin cambios.
6. **Preguntas (3).** Cuántos regímenes hay y cuál corresponde · si se puede cambiar de régimen
   · qué pasa si la mercancía temporal no retorna en plazo.
7. **Banda de identidad.** Compartida, sin cambios.

## Fundamentos legales citados y su línea en `guias.ts`

- **Art. 90 Ley Aduanera**: `src/content/guias.ts`, guía `regimenes-aduaneros`, campo
  `fundamento.cita` (línea 701) y su `fundamento.texto` (línea 703). Usado en causas 1 y 3, y
  como base de la asignación de regímenes de la tabla.
- **Art. 108 Ley Aduanera**: `src/content/guias.ts`, guía `que-es-immex`, campo
  `fundamento.cita` (línea 144). Usado en causa 2, sobre el plazo de la mercancía temporal.

Cero fundamentos nuevos: ambos ya existían en el corpus antes de esta landing.

## Criterios de aceptación

- [x] `noindex` por metadata (cabecera la resuelve `next.config.ts`, no verificable sin
      servidor en esta tarea).
- [x] Texto visible estimado dentro de 600 y 780 palabras (ver método abajo).
- [x] Las 3 causas citan fundamento que existe en el corpus. Cero fundamentos nuevos.
- [x] Bloque propio `TablaCriterios` presente, en `tras-causas`.
- [x] Cuatro palancas de variación movidas (ver arriba), más de las dos exigidas.
- [x] Solo las cifras 20/8/2, sin tocarlas (vienen de las constantes compartidas, no se
      redeclaran).
- [x] Cero afirmación sobre el modelo de despacho de BG.
- [x] Ningún literal de más de 60 caracteres compartido con otra landing (copy escrito desde
      cero para este cluster).
- [x] `tsc` y `eslint` en cero.
- [x] Anuncios dentro de 30/90, contados con `node`.
- [ ] Responsive a 375px, los tres estados del formulario y `campaign` en el payload: no
      verificables en esta tarea porque no se levantó servidor (instrucción explícita del
      orquestador, hay 3 agentes trabajando en paralelo). Pendiente en el pase de verificación
      del lote.

## Método de conteo de palabras (sin servidor)

La instrucción del lote prohíbe levantar servidor o correr `build` mientras corren los otros
tres agentes en paralelo, así que no se pudo medir `document.body.innerText` real. En su lugar
se construyó un script de Node que suma con `split(/\s+/)` todas las cadenas que se renderizan
como texto (hero, causas, bloque, consecuencias + nota, FAQ, alcance del formulario) más una
constante de las bandas compartidas (Servicios, Identidad, el marco fijo del `LeadPanel` y la
barra móvil), calibrada contra `agencia-aduanal`, `immex` y `pedimento` reconstruyendo su
propio contenido con el mismo script: para `immex` la estimación dio 771 contra 774 reportado
(diferencia de 3) y para `pedimento` 778 contra 778 reportado (diferencia de 0); para
`agencia-aduanal` la estimación se apartó 24 palabras del real, así que el margen de error
observado es de hasta ±25 palabras.

Con ese método, esta página estima **746 palabras** (539 de contenido propio + 207 de la
banda compartida), con margen para caer entre 716 y 771 aun con el error observado, dentro del
rango 600-780. **Esto no sustituye la medición real**: se pide confirmarla con
`document.body.innerText` en el pase de verificación del lote, cuando se libere el servidor.

## Anuncios

Tres variantes, cada una con 3 títulos (≤30) y 2 descripciones (≤90). Conteo real con `node`,
longitud entre paréntesis. La cifra de 20 años no aparece en ningún título; en la única
descripción donde se usa lleva el matiz completo ("en promedio entre los socios").

### Variante 1 · Elección del régimen

Títulos:
- Qué régimen aduanero le aplica (30)
- Régimen aduanero equivocado (27)
- Elija bien su régimen aduanero (30)

Descripciones:
- Se revisa qué régimen corresponde a su mercancía antes de pagar de más o diferir mal. (85)
- Firma legal de comercio exterior: régimen, IMMEX y depósito fiscal. (67)

### Variante 2 · Plazo vencido

Títulos:
- Régimen temporal sin retornar (29)
- Mercancía sin retorno a tiempo (30)
- Plazo del régimen aduanero (26)

Descripciones:
- Mercancía temporal sin retornar en plazo. Se revisa antes del crédito fiscal. (77)
- Cambio de régimen aduanero: requisitos y contribuciones que puede exigir la ley. (80)

### Variante 3 · Autoridad

Títulos:
- Firma legal en aduanas (22)
- Asesoría legal aduanera (23)
- Régimen aduanero: asesoría (26)

Descripciones:
- Elección y defensa del régimen aduanero ante la autoridad. Legal, trade compliance e IT. (88)
- 20 años en promedio entre los socios en comercio exterior aduanero. (67)

## Keywords y negativas

| Palabra clave | Volumen/mes | Competencia | Concordancia |
|---|---|---|---|
| recinto fiscalizado | 3,600 | Baja | Frase |
| regimenes aduaneros | 2,400 | Baja | Frase |
| recinto fiscalizado estrategico | 1,000 | Baja | Frase |
| deposito fiscal | 1,000 | Baja | Frase |
| importacion temporal | 390 | Baja | Frase |

Ninguna variante del cluster trae CPC en la fuente del briefing: no se inventa la cifra. Se
piden a SEMrush antes de subir la campaña.

Negativas base del molde (curso, diplomado, licenciatura, maestría, carrera, universidad, qué
es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo, salario, bolsa de trabajo,
iniciar sesión, contraseña, mi cuenta) más las de ambigüedad propias de este cluster: fiscal
(sin "aduanero", puede traer tráfico de derecho fiscal general), régimen fiscal persona física,
depósito bancario, depósito en garantía, recinto (sin más, ambiguo con eventos/salones).

## Riesgos

1. **"deposito fiscal" es ambiguo**: compite con búsquedas de depósitos bancarios y de
   garantía. Negativas desde el día 1, concordancia de frase.
2. **"recinto fiscalizado" sin "estrategico" es el término de mayor volumen del cluster
   (3,600) pero el más genérico**: puede traer tráfico de quien busca qué es un recinto
   fiscalizado sin intención de pauta transaccional. Se revisa en la primera semana de términos
   de búsqueda.
3. **Corpus delgado para dos de los seis regímenes** (tránsito y recinto fiscalizado sin
   carácter estratégico): por eso quedaron fuera de la tabla. Si se necesita desarrollarlos a
   futuro, hace falta ampliar la guía `regimenes-aduaneros` primero, no inventar el dato aquí.

## Por confirmar con BG

- CPC de las cinco variantes del cluster (SEMrush).
- Revisión jurídica de la página antes de encender la pauta.
- Medición real de palabras visibles con `document.body.innerText` cuando se libere el
  servidor (ver "Método de conteo de palabras" arriba).

## Cómo quedó

Página construida con `TablaCriterios`, primer uso real de esa familia. El componente no
necesitó cambios: `columnas`/`filas` de 4 y 3 elementos respectivamente encajan sin ajuste, y
`overflow-x-auto` con `min-w-[560px]` ya resuelve el desborde en 375px sin tocar el componente.

`ESCALADA` con 4 eslabones usa el mismo patrón que `pedimento` (ya aprobado): el cuarto
elemento no tiene entrada en la constante compartida `SANGRIA` (`src/components/lp/
constantes.ts`, solo trae tres valores de sangría), así que su `className` resuelve a
`undefined` y ese paso queda sin la sangría extra de los eslabones 2 y 3, igual que en
`pedimento`. No es un bug de esta página: es una limitación conocida y ya aceptada del molde
compartido para cadenas de 4 pasos. Se anota aquí para que quede trazada, sin tocar
`constantes.ts`.

Ningún fundamento legal nuevo: los dos citados (art. 90 y art. 108 Ley Aduanera) ya vivían en
el corpus antes de esta tarea, en las guías `regimenes-aduaneros` y `que-es-immex`
respectivamente.

## Petición al molde

Nada bloqueante. Dos notas para quien construya la próxima landing con una cadena de
consecuencias de 4 pasos: `SANGRIA` en `src/components/lp/constantes.ts` solo tiene tres
valores (`["", "sm:pl-5", "sm:pl-10"]`), así que el cuarto eslabón siempre pierde la sangría
progresiva (ya ocurre en `pedimento` y en esta página). Si en algún punto se decide que la
escalera de 4 pasos debe verse completa, hace falta un cuarto valor en `SANGRIA`, pero eso es
decisión del dueño del molde, no de esta landing.
