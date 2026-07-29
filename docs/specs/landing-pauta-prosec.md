# Landing de pauta PROSEC (`/lp/prosec`)

Décima landing de la familia. Contrato compartido en `docs/specs/landings-pauta-molde.md`:
arquitectura, tipos, prohibiciones de dato, registro del copy, verificación. Aquí solo lo
que es propio de esta keyword.

## Por qué esta keyword

Cluster asignado, sin dato de puja alta reportado:

| Palabra clave | Búsquedas/mes | Competencia |
|---|---|---|
| prosec | 2,900 | Baja |
| regla octava | 590 | Baja |
| decreto prosec | 480 | Baja |

`campaign: "Landing PROSEC (pauta)"`.

## Quién llega y qué quiere

Empresa que importa insumos o maquinaria y paga arancel general por algo que un programa
sectorial podría dejarle pagar a 0% o 5%, o que ya tiene PROSEC autorizado y no sabe si lo
está aplicando bien. Llega también quien confunde el trámite de PROSEC con el de la Regla
8ª y busca "decreto prosec" para entender la diferencia.

Regla que manda sobre el contenido: **no es una página de "qué es PROSEC"**. Es la página
de cuándo procede el arancel preferencial, qué exige mantenerlo y en qué se distingue de la
Regla 8ª, con la que se confunde de forma constante.

## Alcance

1. Ruta nueva `src/app/lp/prosec/page.tsx`, en español, `noindex` (metadata más la cabecera
   `X-Robots-Tag` que ya aplica `next.config.ts` a `/lp/:path*`).
2. Contenido de nivel especialista: dónde se pierde el arancel preferencial, la escalada de
   consecuencias y la distinción PROSEC/Regla 8ª como bloque propio.
3. `LeadPanel` con `campaign="Landing PROSEC (pauta)"`. No se toca el componente ni
   `/api/leads`.
4. Mismo shell `src/app/lp/layout.tsx`. Archivo propio con sus arreglos con nombre, igual
   que el resto de la familia.
5. Entregable de texto en este mismo archivo: variantes de anuncio, keywords y negativas.

## Fuera de alcance

- El programa IMMEX como tema propio: es de `/lp/immex`. Aquí se cita una vez, sin
  desarrollarlo, como programa distinto que puede convivir con PROSEC.
- La fracción arancelaria y las RGI como tema propio: son de
  `/lp/clasificacion-arancelaria`. El capítulo 98 solo se toca aquí como el mecanismo de la
  Regla 8ª, no como ejercicio de clasificación.
- Los regímenes aduaneros: son de `/lp/regimenes-aduaneros`.
- Guía SEO propia de "regla octava" o "decreto prosec": no existen hoy y son huecos reales
  del corpus, pero son otra tarea.
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.
- Tocar `/guias`, la home, el CRM o cualquier otra landing de `/lp`.

## Fuente de verdad del contenido

Por orden. Nada que no salga de aquí se afirma en la página.

1. `src/content/guias.ts`, guía `prosec` (definicion, fundamento del Decreto PROSEC,
   puntosClave y errores) y guía `regla-octava` (fundamento y distincion, para el bloque
   propio).
2. `src/app/lp/valor-en-aduana/page.tsx` y `agencia-aduanal/page.tsx` para el patrón de
   fundamento legal ya verificado y las cifras autorizadas de la firma.
3. `docs/bgcg-source.md` y `docs/bgcg-site-content.txt` para servicios reales de BG.

Prohibido inventar cifras, plazos, precios, tiempos de respuesta o número de clientes.

## Diferencia obligatoria contra las otras landings

- **Contra `/lp/immex`**: el programa IMMEX es su tema (obligaciones y causales que lo
  sostienen). PROSEC es un programa distinto, de arancel por sector; se cita de paso, sin
  desarrollarse.
- **Contra `/lp/clasificacion-arancelaria`**: la fracción y las RGI son su tema (ruta de
  sustento de una fracción). Aquí el capítulo 98 aparece solo como el mecanismo de la Regla
  8ª, dentro del bloque propio, no como ejercicio de clasificación.
- **Contra `/lp/regimenes-aduaneros`**: los regímenes aduaneros son su tema. No se tocan
  aquí.

Terreno exclusivo de esta página: el arancel preferencial por sector, sus requisitos y su
diferencia con la Regla 8ª.

Criterio duro, heredado del molde: si un párrafo de esta página funciona igual en otra
landing del cluster, está mal escrito.

## Contenido, sección por sección

1. **Entrada.** Título que nombra el momento operativo (cuándo procede el arancel
   preferencial y qué lo sostiene), línea de apoyo y formulario a la vista en escritorio.
2. **Causas frecuentes de pérdida del beneficio (`CAUSAS`, 3).** Cada una con `titulo`,
   `fundamento`, `ocurre`, `hace`, etiquetas propias `["Qué se pierde", "Qué se corrige"]`:
   - Fracción importada sin amparo del sector autorizado.
   - Insumo usado para producir bienes de otro sector.
   - Uso productivo sin trazabilidad que lo compruebe.
   Las tres citan el Decreto PROSEC como fundamento, que es el único que trae el corpus para
   estos supuestos.
3. **Consecuencias (`ESCALADA`, 4 eslabones).** Diferencia de arancel detectada, arancel
   general determinado, crédito fiscal y recargos, programa expuesto a revisión. Cuatro
   pasos en vez de los tres del resto del cluster: la escalada de PROSEC no termina en el
   crédito fiscal, sigue hasta la vigencia del programa.
4. **PROSEC contra Regla 8ª (bloque propio, tras Consecuencias).** Familia `ParPolar`, dos
   paneles con símbolo "+", no "≠": a diferencia de COVE/factura en `/lp/cove`, PROSEC y
   Regla 8ª no son opuestos que se excluyen, son autorizaciones separadas que el corpus
   describe como complementarias ("suelen usarse juntas"). El primer panel distingue qué
   fija cada una; el segundo, la diferencia operativa entre operar PROSEC solo o sumarle la
   Regla 8ª. Ninguno de los dos reformula las causas: las causas son sobre mal uso del
   arancel PROSEC ya autorizado, este bloque es sobre qué autorización hace qué.
5. **Cómo entra BG (`SERVICIOS`).** Constante compartida del molde, sin modificar.
6. **Preguntas (`PREGUNTAS`, 3).** Origen del insumo y arancel preferencial, PROSEC contra
   Regla 8ª como trámites distintos, y el rol de BG frente al trámite ante la Secretaría de
   Economía.
7. **Banda de identidad** con logo, las tres cifras autorizadas y las 8 áreas de práctica.
   Constante compartida, sin modificar.

Sin bloque de "qué es PROSEC". Sin testimonios. Sin logos de clientes. Sin cifras de
resultado.

## Criterios de aceptación

- [ ] `/lp/prosec` responde 200 y trae `noindex` por metadata y por cabecera.
- [ ] Texto visible entre 600 y 780 palabras.
- [ ] Las 3 causas citan fundamento (Decreto PROSEC) que existe en `src/content/guias.ts`.
      Cero fundamentos nuevos.
- [ ] El bloque PROSEC contra Regla 8ª está presente, con familia `ParPolar` y posición
      `tras-consecuencias`.
- [ ] Al menos dos palancas de variación movidas: número de causas (3, no 4), etiquetas
      propias (`"Qué se pierde" / "Qué se corrige"`) y eslabones de consecuencias (4).
- [ ] Cero cifras de resultado, plazos, precios o casos. Solo las tres cifras autorizadas de
      la firma, si aparecieran (aquí no se usan en el cuerpo).
- [ ] Cero afirmación sobre el modelo de despacho de BG.
- [ ] Ningún literal de más de 60 caracteres compartido con otra landing del cluster.
- [ ] Sidebar de ~380px que empuja el contenido en escritorio; barra inferior en móvil.
- [ ] Sin desbordes a 375px.
- [ ] El formulario nace con sus tres estados: envío, éxito y error.
- [ ] `campaign="Landing PROSEC (pauta)"` llega al lead.
- [ ] `tsc` y `eslint` en cero.
- [ ] Anuncios dentro de 30/90, contados con `node`.
- [ ] Cero leads de prueba dejados en Neon.

## Anuncios

Tres variantes, un ángulo cada una. Conteo hecho carácter por carácter con `node` sobre el
texto exacto (títulos ≤ 30, descripciones ≤ 90). El número entre paréntesis es la longitud
real.

### Variante 1 · Arancel preferencial

Títulos:
- Arancel PROSEC: 0% o 5% (23)
- Verifique el arancel PROSEC (27)
- ¿Su insumo califica a PROSEC? (29)

Descripciones:
- Revisión de la fracción y el sector para aplicar el arancel preferencial de PROSEC. (83)
- Firma legal de comercio exterior: PROSEC, Regla 8ª y estrategia arancelaria. (76)

### Variante 2 · Riesgo por mal uso

Títulos:
- PROSEC aplicado sin sustento (28)
- Arancel PROSEC en revisión (26)
- Evite el crédito fiscal PROSEC (30)

Descripciones:
- Se revisa si la fracción y el uso productivo sostienen el arancel PROSEC aplicado. (82)
- Especialistas en PROSEC, Regla 8ª y estrategia arancelaria. Tijuana y San Diego. (80)

### Variante 3 · PROSEC y Regla 8ª

Títulos:
- PROSEC y Regla 8ª: diferencia (29)
- No confunda PROSEC y Regla 8ª (29)
- Asesoría legal en PROSEC (24)

Descripciones:
- Dos autorizaciones distintas que suelen operarse juntas. Se revisan por separado. (81)
- Sector autorizado, fracciones amparadas y trazabilidad del uso productivo. (74)

Ninguno de estos títulos ni descripciones repite texto de otra landing del cluster. No se
usa la cifra "20 años" en ningún título; no aparece en descripciones porque ninguna trae
espacio para el matiz completo ("años en promedio entre los socios") dentro de 90
caracteres junto con contenido propio de PROSEC.

## Keywords y negativas

Grupo de anuncios que apunta a `/lp/prosec`.

| Palabra clave | Volumen/mes | Competencia | Concordancia |
|---|---|---|---|
| prosec | 2,900 | Baja | Frase |
| regla octava | 590 | Baja | Frase |
| decreto prosec | 480 | Baja | Frase |

Sin dato de puja alta en la fuente para ninguna de las tres: se cargan sin cifra, no se
inventa.

Negativas base del cluster: curso, diplomado, licenciatura, maestría, carrera, universidad,
qué es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo, salario, bolsa de
trabajo, iniciar sesión, contraseña, mi cuenta.

Más las de ambigüedad propias de esta keyword: "PROSEC" coincide con nombres comerciales de
empresas de seguridad privada y ciberseguridad. Negativas: seguridad privada, alarmas,
ciberseguridad, cámaras, monitoreo, armería, firearms.

## Riesgos

1. **Corpus delgado en causas.** Los cuatro `errores` de la guía `prosec` son la única
   fuente de fallas operativas; se usaron tres de los cuatro (se dejó fuera "dejar vencer o
   no actualizar el programa" para no forzar una cuarta causa cuando el spec pide un número
   distinto de 4). No se rellenó con nada fuera del corpus.
2. **Ambigüedad de marca.** "PROSEC" es también nombre comercial de empresas de seguridad.
   Negativas desde el día 1 y revisión de términos de búsqueda en la primera semana.
3. **Canibalización conceptual con `/lp/immex` y `/lp/clasificacion-arancelaria`.** Se
   resuelve con la sección de diferencia obligatoria de arriba: PROSEC no desarrolla ni el
   programa IMMEX ni el ejercicio de clasificación por fracción.

## Por confirmar con BG

- Revisión jurídica de la página antes de encender la pauta.
- Si conviene sumar una guía SEO propia de "regla octava" o "decreto prosec": hoy ese
  contenido solo vive dentro de la guía `prosec` y de `regla-octava`, sin una entrada propia
  para el término exacto "decreto prosec".

## Cómo quedó

**Bloque propio y su símbolo.** `ParPolar` se usa con símbolo "+", distinto del "≠" de
`/lp/cove`. La elección responde al contenido: COVE y factura son cosas distintas que no se
sustituyen entre sí, mientras que PROSEC y Regla 8ª son autorizaciones separadas que el
corpus describe como complementarias ("suelen usarse juntas", "se complementan"). Un "≠"
habría afirmado lo contrario de lo que dice la fuente. Los dos paneles tratan una distinción
distinta a la de cove: el primero contrasta qué fija cada figura (arancel contra
clasificación), el segundo contrasta cómo se opera PROSEC con y sin Regla 8ª, un ángulo
operativo que no aparece en ninguna otra landing del cluster.

**Palancas de variación movidas**, tres en total (el mínimo pedido es dos):
1. Número de causas: 3, no 4.
2. `causas.etiquetas` propias: `["Qué se pierde", "Qué se corrige"]`, distinto del default y
   de las etiquetas ya usadas en `valor-en-aduana` ("Qué falla" / "Qué corrige"),
   `agencia-aduanal` ("Lo que se asume" / "Lo que dice la ley") e `immex` ("Qué exige" /
   "Qué se revisa").
3. Eslabones de la cadena de consecuencias: 4, frente a los 3 que usan el resto de las
   landings ya construidas del cluster (cove, valor-en-aduana, agencia-aduanal, immex). El
   cuarto eslabón, "Programa expuesto a revisión", es un hecho propio de PROSEC: la
   irregularidad no solo genera crédito fiscal, compromete la vigencia del programa.

**Fundamento legal citado**: Decreto PROSEC (Programas de Promoción Sectorial), que existe
en `src/content/guias.ts` en `fundamento.cita` de la guía `prosec` (línea 1288) y se repite
en `fundamento.texto` de esa misma guía (línea 1290). Es el único fundamento que el corpus
trae para los supuestos de pérdida del beneficio; no se citó ningún artículo de ley
adicional porque la guía no lo desglosa. La Regla 8ª, citada en el bloque propio a partir de
la guía `regla-octava` (`fundamento.cita`, línea 1377, y `fundamento.texto`, línea 1379), no
se usa como fundamento de una causa: solo aparece dentro del bloque propio, que es donde
corresponde por el ancla asignada.

**Servicios**: se usó la constante `SERVICIOS` del molde sin modificar, como exige el
contrato.

**No se probó el formulario ni se levantó el servidor** en esta tarea: el spec de la tarea
indica explícitamente no correr `npm run build` ni levantar servidor porque hay otros
agentes trabajando en paralelo sobre el mismo `.next`. Los tres estados del formulario, la
captura responsive y la medición real de palabras quedan para el pase de verificación del
orquestador sobre el lote completo.
