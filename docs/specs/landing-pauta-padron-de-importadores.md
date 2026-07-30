# Landing de pauta Padrón de importadores (`/lp/padron-de-importadores`)

Landing del lote B sobre `docs/specs/landings-pauta-molde.md`. Todo lo que el molde fija
(arquitectura, tipos, familias, registro del copy, prohibición de inventar datos) aplica y
no se repite aquí. Este spec sigue el esqueleto de `landing-pauta-cove.md`.

## Por qué esta keyword

Fuente: briefing de la tarea (Google Keyword Planner, base México).

| Palabra clave | Búsquedas/mes | Competencia | CPC alto |
|---|---|---|---|
| padron de importadores | 5,400 | Baja | $1.47 |
| padron de importadores sat | 2,400 | Baja | (sin dato) |
| padron de exportadores | 720 | Baja | (sin dato) |
| padron sectorial | 590 | Baja | (sin dato) |

Cuatro variantes de un mismo cluster, con "padron de importadores" como cabecera. Las tres
últimas no traen CPC reportado: se cargan sin la cifra, no se inventa.

**Tensión a anotar.** "padron de importadores sat" tiene intención navegacional: parte de
quien busca es gente ubicando el trámite dentro del portal del SAT, no necesariamente
buscando asesoría. Las negativas base (iniciar sesión, contraseña, mi cuenta) filtran una
parte de ese tráfico, no todo. Si el informe de términos de búsqueda de la primera semana
trae ruido de "cómo entrar a mi cuenta del SAT" o similares, se revisa concordancia y se
suman negativas específicas.

## Quién llega y qué quiere

Dos perfiles, uno de ellos muy urgente:

1. La empresa a la que **le suspendieron el padrón** y tiene mercancía parada en la aduana.
   Es el caso más valioso: intención transaccional inmediata, dispuesta a contratar hoy.
2. La empresa que **va a darse de alta** por primera vez, o que descubrió que su producto
   necesita además el padrón de Sectores Específicos.

Regla que manda sobre el contenido, igual que en vucem y cove: **no es una página de "qué
es el padrón"**. Es la página de qué lo suspende y cómo se recupera. El caso de suspensión
lidera el hero y las causas; el alta de primera vez queda cubierto por el bloque propio y el
alcance del formulario.

## Alcance

1. Ruta nueva `src/app/lp/padron-de-importadores/page.tsx`, en español, `noindex` (metadata
   más la cabecera `X-Robots-Tag` que ya aplica `next.config.ts` a `/lp/:path*`).
2. Contenido de nivel especialista: causales de suspensión, qué padrones sectoriales existen
   y a qué obligan, la cadena de escalada hasta la reactivación, y las preguntas frecuentes
   propias del cluster.
3. `LeadPanel` con `campaign="Landing Padrón de importadores (pauta)"`. No se toca el
   componente ni `/api/leads`.
4. Mismo shell `src/app/lp/layout.tsx`. Archivo propio con sus arreglos con nombre, igual que
   el resto de la familia.
5. Entregable de texto en este mismo archivo: anuncios, keywords y negativas.

## Fuera de alcance

- Las causales de cancelación del programa IMMEX: son tema de `/lp/immex`.
- El encargo conferido como figura legal completa: es tema de `/lp/agencia-aduanal`. Aquí se
  cita de paso, solo en la medida en que afecta el registro del padrón mismo.
- La certificación IVA/IEPS: es tema de `/lp/certificacion-iva-ieps` (lote siguiente).
- Guía SEO nueva. La guía `padron-de-importadores` ya existe en `/guias` y es la fuente.
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.
- Tocar `/guias`, la home, el CRM o las páginas de las otras landings.

## Fuente de verdad del contenido

Por orden. Nada que no salga de aquí se afirma en la página.

1. `src/content/guias.ts`, guía `padron-de-importadores`: `definicion`, `fundamento`,
   `puntosClave`, `distincion`, `errores` y `faq` completos.
2. `src/content/guias.ts`, guías `encargo-conferido` y `que-es-immex`: solo para el
   fundamento y la distinción de paso frente a otras figuras del cluster, sin desarrollar su
   tema.
3. `src/components/lp/constantes.ts` para servicios, cifras y áreas de práctica reales de la
   firma (default, no se sobreescribe).
4. `src/app/lp/agencia-aduanal/page.tsx` e `immex/page.tsx` para el patrón ya aprobado.

## Diferencia obligatoria contra las otras landings

- **Contra `/lp/immex`**: las causales de cancelación del programa IMMEX son su tema. El
  padrón de importadores es un registro distinto del programa; aquí no se desarrollan
  obligaciones de IMMEX (Anexo 24, retorno de mercancía, modalidad autorizada).
- **Contra `/lp/agencia-aduanal`**: el encargo conferido, como figura y como transferencia de
  responsabilidad sobre el valor declarado, es su tema exclusivo. Esta landing no reformula
  esa causa: el corpus de padrón menciona el encargo conferido solo como uno de los
  requisitos base de la inscripción (quién queda autorizado a operar bajo el padrón), y esa
  mención no se convirtió en una causa propia para no invadir el terreno de agencia-aduanal.
- **Contra `/lp/certificacion-iva-ieps`**: la certificación en materia de IVA/IEPS no se
  toca. El padrón es el registro sin el cual no se puede importar; la certificación es un
  beneficio fiscal adicional sobre la importación temporal, tema de esa otra landing.
- Terreno exclusivo de esta página: el registro sin el cual no se puede importar, sus
  causales de suspensión y qué se hace para recuperarlo.

Criterio duro heredado del molde: si un párrafo de esta página funciona igual en otra
landing, está mal escrito.

## Contenido, sección por sección

1. **Hero.** H1 nombra la suspensión, no la definición del padrón. Lead fija el problema:
   sin registro vigente no hay despacho.
2. **Causas (`CAUSAS`, 3), etiquetas `["Supuesto", "Efecto en el padrón"]`.**
   - Padrón sectorial dado por incluido en el general (Anexo 10).
   - Domicilio fiscal no localizado.
   - Incumplimiento fiscal ajeno a la operación aduanera.
3. **Bloque propio, `IndiceDenso`, tras-causas.** "A qué obliga cada padrón sectorial": el
   Padrón de Sectores Específicos, cinco sectores nombrados en el corpus (siderúrgico,
   textil, calzado, alcoholes, hidrocarburos) y el Padrón de Exportadores Sectorial. Ver
   sección dedicada abajo.
4. **Consecuencias (`ESCALADA`, 4 eslabones).** De la suspensión descubierta en la aduana a
   la reactivación por aclaración.
5. **Servicios.** Default de `constantes.ts`, sin sobreescribir.
6. **Preguntas (`PREGUNTAS`, 3).** Reescritas para el cluster, no copiadas de la guía ni de
   otra landing.
7. **Banda de identidad y barra móvil.** Igual que el resto de la familia.

## El bloque propio: `IndiceDenso`

Ancla asignada: "los padrones sectoriales y a qué obliga cada uno". Verificado contra
`src/content/guias.ts`: la guía **sí nombra sectores concretos** en `definicion[1]`
("por ejemplo, siderúrgico, textil, calzado, alcoholes, hidrocarburos") y en `distincion[1]`
menciona el Padrón de Exportadores Sectorial para "algunos sectores de minerales o alcohol".
No hay que inventar nada: se usó esa lista literal.

Cada entrada del índice, con su origen exacto:

| `clave` | `nota` | Origen literal en `guias.ts` |
|---|---|---|
| Padrón de Sectores Específicos | adicional al general; sin él no se despacha aunque el general esté vigente | `distincion[0]`: "El padrón general habilita a importar en términos generales. El sectorial es un permiso adicional por producto sensible: sin él, aunque tengas el general, no puedes importar mercancía de ese sector." |
| Siderúrgico | Anexo 10 RGCE | `definicion[1]`, lista de ejemplos |
| Textil | Anexo 10 RGCE | `definicion[1]`, lista de ejemplos |
| Calzado | Anexo 10 RGCE | `definicion[1]`, lista de ejemplos |
| Alcoholes | Anexo 10 RGCE | `definicion[1]`, lista de ejemplos |
| Hidrocarburos | Anexo 10 RGCE | `definicion[1]`, lista de ejemplos |
| Padrón de Exportadores Sectorial | minerales y alcohol; registro distinto, del lado de la exportación | `distincion[1]`: "Exportar ciertos productos (por ejemplo, algunos sectores de minerales o alcohol) exige el Padrón de Exportadores Sectorial. Son registros distintos y no se cubren entre sí." |

La etiqueta "Anexo 10 RGCE" para los cinco sectores viene del `fundamento` de la guía: "el
Anexo 10 lista los sectores y las fracciones arancelarias que exigen el padrón sectorial."

**Por qué no se listaron requisitos por sector.** La guía no detalla qué exige cada sector
en particular; solo dice que "cada sector tiene sus propios requisitos y su propia lógica de
riesgo", sin desglosarlos. Poner un requisito específico por sector habría sido inventar
dato. El índice se quedó en qué registros existen y de qué fracción arancelaria dependen,
que es exactamente lo que el corpus sostiene.

**Por qué esto no repite las causas.** Las causas hablan de qué suspende el padrón general
(domicilio, incumplimiento fiscal, sectorial faltante como supuesto abstracto). El índice no
reformula esa tercera causa en positivo: en vez de repetir "hay que tramitar el sectorial",
nombra los sectores concretos que existen y agrega un registro que las causas no tocan en
absoluto (el de exportadores). Es información nueva, no la misma en otro formato.

## Criterios de aceptación

- [x] `noindex` por metadata (falta verificar cabecera `X-Robots-Tag` y 200 real: requiere
      servidor levantado, fuera de esta verificación por instrucción explícita de no correr
      `npm run build` ni levantar servidor mientras hay otros agentes trabajando en paralelo).
- [x] Texto de config, contado con `node`: 575 palabras. Ver nota de metodología abajo.
- [x] Las 3 causas citan fundamento que existe en `src/content/guias.ts` (Art. 59-IV Ley
      Aduanera, Anexo 10 RGCE, Reglas Generales de Comercio Exterior sobre padrones).
- [x] Bloque propio presente: `IndiceDenso`, posición `tras-causas`, familia asignada.
- [x] Al menos dos palancas de variación movidas (ver abajo).
- [x] Solo las cifras 20/8/2, sin tocar `CREDENCIALES_HERO` ni `CIFRAS` (son default de
      `constantes.ts`, no se redeclaran).
- [x] Cero afirmación sobre el modelo de despacho de BG.
- [x] `tsc --noEmit` y `eslint` en cero (exit code 0 ambos, ver abajo).
- [x] Anuncios dentro de 30/90, contados con `node`.
- [ ] Sin desbordes a 375px, formulario en sus tres estados, capturas reales: pendiente,
      requiere servidor levantado, fuera de esta tarea por la restricción de no competir con
      los otros 3 agentes en paralelo. Queda para la verificación del orquestador del lote.
- [ ] Cero leads de prueba en Neon: no se probó el formulario en esta tarea, no aplica.

### Nota de metodología del conteo de palabras

El criterio del molde (600-780) se calibró sobre `document.body.innerText` de la página
servida, que incluye texto compartido (LeadPanel, servicios, banda de identidad, barra
móvil) además del contenido propio del `CONFIG`. Como esta tarea prohíbe levantar servidor,
el conteo se hizo sobre los strings literales de `CONFIG` en `page.tsx` con `node` (igual
método aplicado, para calibrar, a `agencia-aduanal` y `immex`):

- `padron-de-importadores` (esta landing): **575 palabras** de config.
- `agencia-aduanal` (referencia real medida: 760 palabras totales): 560 palabras de config.
- `immex` (referencia real medida: 774 palabras totales): 543 palabras de config.

La diferencia entre el conteo de config y el total medido (~200 palabras) es texto
compartido constante entre landings. Con esa calibración, 575 palabras de config caen en el
mismo orden de magnitud que agencia-aduanal e immex, lo que proyecta un total renderizado
dentro del rango 600-780 del criterio. Queda pendiente la medición real con
`document.body.innerText` cuando el orquestador levante el servidor del lote.

## Anuncios

Tres variantes, cada una con 3 títulos (≤30 caracteres) y 2 descripciones (≤90). Conteo
hecho carácter por carácter con `node`; el número entre paréntesis es la longitud real.
Ninguno de estos textos se copió de otra landing.

### Variante 1 · Suspensión

Títulos:
- Padrón suspendido por el SAT (28)
- SAT suspendió su padrón (23)
- Mercancía detenida sin padrón (29)

Descripciones:
- Se revisa la causa de la suspensión y el camino para reactivar su padrón ante el SAT. (85)
- Firma legal de comercio exterior: padrón de importadores, sectorial y reactivación. (83)

### Variante 2 · Sectorial

Títulos:
- Falta el padrón sectorial (25)
- Anexo 10: padrón adicional (26)
- Sector con padrón adicional (27)

Descripciones:
- Si su fracción está en el Anexo 10 necesita, además del general, el padrón sectorial. (85)
- Revisión legal del padrón de importadores y del de Sectores Específicos. (72)

### Variante 3 · Autoridad

Títulos:
- Asesoría legal en padrones (26)
- Reactivación de padrón SAT (26)
- Representación ante el SAT (26)

Descripciones:
- Recursos administrativos, acuerdos conclusivos y representación ante el SAT. (76)
- Especialistas en padrón de importadores, sectorial y reactivación. Tijuana y San Diego. (87)

Nota sobre "20 años": por instrucción explícita de esta tarea, la cifra no entra en ningún
título. No aparece tampoco en las descripciones de esta landing: no hizo falta para dar el
matiz completo ("en promedio entre los socios") dentro de 90 caracteres junto con el resto
del mensaje, así que se dejó fuera en vez de forzarla.

## Keywords y negativas

Grupo de anuncios que apunta a `/lp/padron-de-importadores`. Concordancia de frase.

| Palabra clave | Volumen/mes | Competencia | CPC alto | Concordancia |
|---|---|---|---|---|
| padron de importadores | 5,400 | Baja | $1.47 | Frase |
| padron de importadores sat | 2,400 | Baja | (sin dato) | Frase |
| padron de exportadores | 720 | Baja | (sin dato) | Frase |
| padron sectorial | 590 | Baja | (sin dato) | Frase |

Negativas base del molde (todas las landings): curso, diplomado, licenciatura, maestría,
carrera, universidad, qué es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo,
salario, bolsa de trabajo, iniciar sesión, contraseña, mi cuenta.

Negativas de ambigüedad propias de este cluster:

- Contra la intención navegacional de "padron de importadores sat": app, portal sat, mi
  portal, consulta rfc, verificar rfc. La base ya cubre iniciar sesión / contraseña / mi
  cuenta, que es la mayor parte del ruido de acceso al portal.
- Contra otros usos de "padrón" y "padrón sectorial" ajenos a comercio exterior: electoral,
  ine, credencial de elector, beneficiarios, programa social, sader, pesca.
- Contra "padron de exportadores" fuera del sector aduanero: ganado, ganadero, sader,
  fitosanitario (registros de exportación agropecuaria, que son trámites distintos y no
  entran en el alcance de esta firma).

## Riesgos

1. **Intención navegacional en "padron de importadores sat"** (ver tensión anotada arriba).
   Mitigación: negativas de portal/acceso desde el día 1, concordancia de frase, revisión del
   informe de términos de búsqueda en la primera semana.
2. **Corpus delgado en requisitos por sector.** La guía nombra los sectores del Anexo 10 pero
   no desglosa requisitos particulares por sector. El bloque propio se quedó en qué registros
   existen, sin inventar el detalle que falta.
3. **Superposición conceptual con `/lp/agencia-aduanal`** en el punto del encargo conferido
   como requisito de inscripción. Se resolvió no convirtiendo ese punto en una causa propia
   de esta landing (ver "Diferencia obligatoria" arriba); si el equipo de pauta ve
   canibalización real entre ambas landings, se revisa con datos de campaña.

## Por confirmar con BG

- Si conviene una negativa exacta adicional para "padrón de exportadores" en caso de que
  aparezca tráfico agropecuario real en el informe de términos de búsqueda (SADER, permisos
  fitosanitarios), que no es un servicio de esta firma.
- Revisión jurídica de la página antes de encender la pauta, igual que se pidió para las
  landings anteriores del cluster.

## Cómo quedó

**Palancas de variación movidas** (mínimo dos exigidas, se movieron cuatro):

1. Número de causas: 3, distinto del default de 4.
2. `causas.etiquetas` propio: `["Supuesto", "Efecto en el padrón"]`, en vez del default
   "Qué ocurre / Qué se hace".
3. Eslabones de la cadena de consecuencias: 4, como `pedimento` (agencia-aduanal, immex,
   cove y vucem usan 3).
4. `consecuencias.nota`: se dejó sin usar. La reactivación por aclaración ya queda cubierta
   en el cuarto eslabón; una nota adicional no habría aportado un dato nuevo.

**Fundamento legal citado y su línea de origen en `src/content/guias.ts`:**

- Art. 59, fracción IV, Ley Aduanera · Reglas Generales de Comercio Exterior (padrones) y su
  Anexo 10: `fundamento.cita` de la guía `padron-de-importadores`, línea 1021.
- Anexo 10 de las RGCE (fracciones y sectores que exigen el padrón sectorial):
  `fundamento.texto` de la misma guía, línea 1023.
- Causales de suspensión por incumplimiento fiscal o aduanero: `faq[2].a` de la misma guía,
  línea 1082 ("Por incumplimientos fiscales o aduaneros: domicilio no localizado, omisiones
  en declaraciones, inconsistencias en la operación...").

No se citó ningún fundamento nuevo de `encargo-conferido` ni de `que-es-immex`: ambas guías
se usaron solo para verificar que el encargo conferido y el programa IMMEX son temas de otras
landings y no desarrollarlos aquí, tal como pide la sección de diferencia obligatoria.

**Verificación de código:**

```
npx tsc --noEmit --incremental false   → exit 0
npx eslint src/app/lp/padron-de-importadores/page.tsx   → exit 0
```

No se corrió `npm run build` ni se levantó servidor, por instrucción explícita de la tarea
(otros 3 agentes trabajando en paralelo). Verificación de 200/`noindex`/responsive/formulario
queda pendiente para el orquestador al cerrar el lote.
