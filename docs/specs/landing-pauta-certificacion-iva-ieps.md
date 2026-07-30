# Landing de pauta Certificación IVA e IEPS (`/lp/certificacion-iva-ieps`)

Landing del molde compartido, `docs/specs/landings-pauta-molde.md`. Todo lo que ese archivo
fija (arquitectura, familias de bloque, registro del copy, prohibición de inventar datos)
aplica igual y no se repite aquí.

## Por qué esta keyword

Fuente: briefing del orquestador, cluster "Certificación IVA e IEPS".

| Palabra clave | Búsquedas/mes | Competencia | Puja alta (USD) |
|---|---|---|---|
| anexo 30 | 880 | Baja | $1.86 |
| anexo 31 | 320 | Baja | (sin dato) |
| certificacion iva ieps | 210 | Baja | ~$22 |
| anexo 30 sat | 170 | Baja | $1.15 |

La de menor volumen del conjunto de 12 y la de clic más caro: "certificacion iva ieps" cuesta
~$22 por clic. Quien busca ese término no está averiguando qué es la certificación, está por
contratar a alguien que se la tramite o que la sostenga: es de las búsquedas de mayor intención
del cluster completo, y el servicio detrás (certificación IVA/IEPS y control de descargos) es de
los más rentables de la firma. El copy tiene que sostener ese costo por clic, no diluirlo con
generalidades.

## Quién llega y qué quiere

Empresa IMMEX que paga IVA en cada importación temporal y quiere dejar de hacerlo, o que ya
está certificada y tiene que renovar sin perder el crédito. Perder la certificación no es un
trámite que se repite: es volver a pagar o afianzar el IVA en cada operación, uno de los golpes
de flujo más caros del comercio exterior.

**No es una página de "qué es la certificación".** Es la página de qué la sostiene (renovación
en tiempo, Anexo 30 y Anexo 31 operando) y qué la pone en riesgo.

## Alcance

1. Ruta nueva `src/app/lp/certificacion-iva-ieps/page.tsx`, en español, `noindex`.
2. Contenido de nivel especialista sobre el crédito del IVA e IEPS: qué lo sostiene, las
   modalidades A, AA y AAA, y qué consecuencia tiene perderlo.
3. `LeadPanel` con `campaign="Landing Certificación IVA e IEPS (pauta)"`.
4. Bloque propio con la familia `EscaleraNiveles`, posición `tras-causas`, ancla en las
   modalidades A, AA y AAA.
5. Entregable de texto en este archivo: variantes de anuncio, keywords y negativas.

## Fuera de alcance

- El Anexo 24 y el sistema de control de inventarios: es tema de `/lp/anexo-24` (en curso en
  paralelo). Aquí se cita solo cuando la guía de origen lo menciona de paso, sin desarrollarlo.
- El programa IMMEX y sus causales de cancelación: es tema de `/lp/immex`. La certificación es
  una figura distinta que se monta sobre el programa, no el programa mismo.
- El Padrón de Importadores: es tema de `/lp/padron-de-importadores`.
- Guía SEO nueva. La guía `certificacion-iva-ieps` ya existe en `/guias` y es la fuente.
- Tocar `/guias`, la home, el CRM o las otras landings.

## Fuente de verdad del contenido

Por orden, tal como fija el molde:

1. `src/content/guias.ts`: guía `certificacion-iva-ieps` (definicion, fundamento arts. 28-A
   Ley del IVA y 15-A Ley del IEPS, Título 7 RGCE; puntosClave sobre modalidades, sistemas de
   control y renovación; distincion "Modalidad A vs. AAA"; errores sobre vencimiento, Anexo 30/31
   sin operar y adeudos), más `anexo-30` (fundamento y puntosClave del control de descargos) y
   `anexo-31` (fundamento y puntosClave del control de créditos y garantías).
2. `src/app/lp/valor-en-aduana/page.tsx` y `agencia-aduanal/page.tsx` para el patrón de página
   ya aprobado y el fundamento legal ya verificado.
3. `docs/bgcg-source.md` y `docs/bgcg-site-content.txt` para servicios reales de BG (no se usaron
   datos nuevos de ahí: los servicios son la constante compartida `SERVICIOS`).

Prohibido inventar cifras, plazos, precios, número de clientes o casos. Lo que falte se anota
abajo en "Por confirmar con BG".

### Qué dice la guía de las modalidades A, AA y AAA

Verificado en `src/content/guias.ts`, guía `certificacion-iva-ieps`:

- **A**: "La A es la puerta de entrada, con vigencia de un año" (distincion "Modalidad A vs.
  AAA").
- **AAA**: "La AAA exige mayor trayectoria y control, pero da beneficios superiores y hasta tres
  años de vigencia" (misma distincion).
- **AA**: la guía **no detalla requisitos ni vigencia propios de la AA**. Solo trae la tendencia
  general que cubre a las tres modalidades: "A mayor modalidad, más requisitos de trayectoria y
  control, pero también más beneficios y una vigencia más larga. La modalidad se elige según la
  madurez y el historial de la empresa" (puntosClave "Modalidades A, AA y AAA").

Por eso el nivel `AA` en `MODALIDADES` no lleva una cifra de vigencia ni un requisito específico
inventado: dice "Pide más trayectoria y control que la modalidad A, con mayor beneficio y
vigencia", que es exactamente la tendencia general aplicada al escalón de en medio, sin afirmar
un dato que el corpus no trae.

## Diferencia obligatoria contra las otras landings

- **Contra `/lp/anexo-24`**: el Anexo 24 y el control de inventarios son su tema. Aquí solo se
  cita "control de inventarios" cuando la propia guía de Anexo 30 o Anexo 31 lo menciona para
  distinguirse de él ("el Anexo 24 controla el inventario físico... el Anexo 30 controla los
  descargos"), nunca se desarrolla como bloque propio.
- **Contra `/lp/immex`**: IMMEX cubre el programa y sus causales de cancelación (domicilio no
  localizado, inconsistencias de inventario, reporte anual). Esta página no toca esas causales:
  las suyas son propias de la certificación (renovación fuera de plazo, Anexo 30 sin cuadrar,
  Anexo 31 sin cuadrar). `EscaleraNiveles` en IMMEX ancla en "de qué norma cuelga cada parte del
  programa" (Decreto / Ley Aduanera / Reglas Generales, una taxonomía de fuentes legales). Aquí
  ancla en las tres modalidades A, AA y AAA, que son una escalera real de requisitos y
  beneficios crecientes, no una lista de normas. Layout compartido, contenido y lógica distintos.
- **Contra `/lp/padron-de-importadores`**: el padrón es su tema, no se menciona aquí.
- **Regla dura del molde**: el bloque propio no reformula en positivo las causas de arriba. Las
  causas dicen qué falla en el día a día de una certificación vigente (renovación tardía, Anexo
  30 o 31 sin cuadrar). El bloque de modalidades no es "certificación sostenida" en espejo: es un
  eje distinto por completo, el nivel de la certificación misma y lo que exige subir de escalón,
  algo que las causas nunca mencionan.

## Contenido, sección por sección

1. **Hero.** H1 que nombra qué sostiene y qué pone en riesgo la certificación, no "qué es".
2. **Causas (`CAUSAS`, 3).** Tres fallas propias de sostener una certificación ya obtenida, con
   etiquetas propias `["Qué se descuida", "Qué la sostiene"]`:
   - La renovación, fuera de los 30 días previos (Título 7 RGCE).
   - El Anexo 30, sin descargos que cuadren (art. 28-A LIVA, Anexo 30 RGCE).
   - El Anexo 31, desconectado del crédito real (Anexo 31 RGCE, art. 28-A LIVA).
3. **Bloque propio, `EscaleraNiveles`, tras-causas.** Las tres modalidades A, AA y AAA, con lo
   que la guía sí documenta de cada una (ver arriba).
4. **Consecuencias (`ESCALADA`, 4).** De un descargo sin conciliar al IVA otra vez en efectivo:
   descargos y créditos sin conciliar, determinación por crédito indebido, renovación negada,
   IVA e IEPS otra vez en cada pedimento.
5. **Servicios (`SERVICIOS`).** Constante compartida, sin modificar.
6. **Preguntas (`PREGUNTAS`, 3).** Modalidades, qué pasa si se pierde la certificación, y el
   alcance de BG frente al Anexo 30/31.
7. **Banda de identidad y barra móvil.** Igual que el resto del molde, sin tocar.

## Criterios de aceptación

- [ ] `/lp/certificacion-iva-ieps` responde 200 y trae `noindex` por metadata y por cabecera.
      Pendiente de verificación contra servidor: no se levantó `next dev`/`next start` en esta
      tarea porque hay otros 2 agentes trabajando en paralelo sobre `.next`. Lo corre el
      orquestador por lote.
- [ ] Texto visible entre 600 y 780 palabras. No medido con navegador en esta tarea por la misma
      razón de arriba; el conteo de strings propios (sin el chrome compartido: encabezados de
      sección, banda de servicios, banda de identidad, "Preguntas frecuentes", etc.) da 541
      palabras, contado con `node`. Apuntado deliberadamente bajo: la calibración del lote
      anterior mostró que sumar strings subestima el render real (~150-250 palabras de chrome
      compartido en las páginas ya medidas).
- [ ] Las 3 causas citan fundamento legal que existe en `src/content/guias.ts`. Cero fundamentos
      nuevos (verificado abajo).
- [ ] Bloque propio `EscaleraNiveles` presente, posición `tras-causas`, ancla en las modalidades.
- [ ] Al menos dos palancas de variación movidas: número de causas (3, no 4), etiquetas propias
      (`["Qué se descuida", "Qué la sostiene"]`), eslabones de consecuencias (4, no 3).
- [ ] Solo las cifras 20 / 8 / 2 (ninguna cifra de la firma aparece en el copy propio de esta
      landing; las trae la `BandaIdentidad` compartida sin tocar).
- [ ] Cero afirmación sobre el modelo de despacho de BG.
- [ ] Ningún literal de más de 60 caracteres compartido con otra `page.tsx` del conjunto.
- [ ] `tsc --noEmit` y `eslint` en cero (verificado, ver abajo).
- [ ] Anuncios dentro de 30/90, contados con `node` (verificado abajo).
- [ ] Cero leads de prueba en Neon: no se probó el formulario en esta tarea.
- [ ] Sin desbordes a 375px y los tres estados del formulario: pendientes de la verificación del
      orquestador contra el servidor, fuera del alcance de esta tarea.

## Anuncios

Tres variantes, textos nuevos, sin copiar de ninguna otra landing del conjunto (se revisó contra
las 10 landings ya escritas). Conteo real con `node`, longitud entre paréntesis.

### Variante 1 · Vencimiento

Títulos:
- Certificación IVA e IEPS (24)
- Renovación de IVA e IEPS (24)
- Crédito de IVA en riesgo (24)

Descripciones:
- Se revisa si su certificación llega en orden a la próxima renovación. (69)
- Firma legal de comercio exterior: certificación, Anexo 30 y Anexo 31. (69)

### Variante 2 · Modalidades

Títulos:
- Modalidad A, AA o AAA (21)
- Qué modalidad conviene (22)
- Certificación por niveles (25)

Descripciones:
- Cada modalidad exige distinto control y da distinto beneficio. Se revisa cuál aplica. (85)
- Consultoría legal en certificación IVA/IEPS y control de descargos. (67)

### Variante 3 · Autoridad

Títulos:
- Consultoría legal en aduanas (28)
- Defensa ante el SAT (19)
- Cumplimiento normativo aduanal (30)

Descripciones:
- Sustento legal del crédito de IVA e IEPS frente a la autoridad. (63)
- Recursos administrativos y acuerdos conclusivos en comercio exterior. (69)

## Keywords y negativas

| Palabra clave | Volumen/mes | Competencia | Puja alta | Concordancia |
|---|---|---|---|---|
| anexo 30 | 880 | Baja | $1.86 | Frase |
| anexo 31 | 320 | Baja | Sin dato | Frase |
| certificacion iva ieps | 210 | Baja | ~$22 | Frase |
| anexo 30 sat | 170 | Baja | $1.15 | Frase |

"anexo 31" se carga sin dato de puja: no está en el briefing y no se inventa.

Negativas base del molde (curso, diplomado, licenciatura, maestría, carrera, universidad, qué
es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo, salario, bolsa de trabajo,
iniciar sesión, contraseña, mi cuenta), más las de ambigüedad propias de este cluster:

- **IEPS es un impuesto que también grava gasolina, tabaco, alcohol y bebidas azucaradas**, la
  búsqueda más frecuente sobre el término fuera de aduanas. Negativas: gasolina, cigarros,
  tabaco, alcohol, cerveza, refrescos, bebidas azucaradas.
- "Anexo 30" y "Anexo 31" son numeraciones genéricas de documentos legales fuera del comercio
  exterior (contratos, pólizas, licitaciones). Negativas: contrato, póliza, seguro, licitación.
- Términos de trámite fiscal genérico que no son la certificación: declaración anual, pago
  referenciado, cálculo de iva, factura electrónica.

## Riesgos

1. **Corpus delgado en la modalidad AA.** La guía documenta A y AAA con precisión, pero no da
   requisitos ni vigencia propios de AA. El nivel intermedio de `EscaleraNiveles` se escribió con
   la tendencia general de la guía, no con un dato inventado; si BG puede confirmar el requisito
   y la vigencia real de la AA, se agrega en una revisión posterior.
2. **Ambigüedad de "IEPS".** Es un impuesto conocido sobre todo por gasolina, tabaco y alcohol.
   Concordancia de frase y las negativas de arriba desde el día 1; revisar términos de búsqueda
   en la primera semana.
3. **Volumen bajo, clic caro.** 210 búsquedas/mes a ~$22 el clic exige que el copy convierta, no
   solo que sea correcto: de ahí la insistencia en "qué la sostiene / qué la pone en riesgo" en
   vez de una definición genérica.

## Por confirmar con BG

- Requisitos y vigencia propios de la modalidad AA, que el corpus actual no detalla.
- Revisión jurídica de la página antes de encender la pauta.

## Cómo quedó

**Palancas de variación movidas** (mínimo dos exigidas por el molde, se movieron tres):
número de causas (3, en vez del default de 4), `causas.etiquetas` propias del tema
(`["Qué se descuida", "Qué la sostiene"]`, distintas de las ya usadas en valor-en-aduana,
immex y agencia-aduanal) y eslabones de `ESCALADA` (4, en vez de 3 como en cove, immex,
agencia-aduanal y valor-en-aduana).

**Fundamento legal citado, línea por línea de `src/content/guias.ts`:**
- "Título 7 Reglas Generales de Comercio Exterior" — fundamento.cita de la guía
  `certificacion-iva-ieps` (línea 1110).
- "Art. 28-A Ley del IVA · Anexo 30 RGCE" — fundamento.cita de la guía `anexo-30` (línea 855).
- "Anexo 31 RGCE · Art. 28-A Ley del IVA" — fundamento.cita de la guía `anexo-31` (línea 1199).

Cero fundamentos nuevos: los tres ya existían, verbatim o cita corta del mismo artículo, en el
corpus antes de escribir esta página.

**`EscaleraNiveles` frente a `immex`**: en IMMEX la escalera es una taxonomía de normas (Decreto
IMMEX / Ley Aduanera / Reglas Generales), tres fuentes legales distintas de las que "cuelga"
cada parte del programa. Aquí la escalera son las tres modalidades reales de la certificación
(A, AA, AAA), que a diferencia de la de IMMEX sí forman un orden ascendente literal: cada nivel
pide más que el anterior y da más a cambio. Es el uso más directo posible de la familia, y el
contenido no se solapa con IMMEX porque IMMEX no menciona las modalidades de certificación (solo
las cita de paso, sin desarrollarlas, igual que esta página no desarrolla las causales de
cancelación del programa).

**Sobre la longitud**: no se corrió `next dev` ni Playwright en esta tarea (instrucción
explícita del encargo, por los otros 2 agentes trabajando en paralelo sobre `.next`). El conteo
de 541 palabras es la suma de los strings propios del archivo (`node`, sin el chrome compartido:
"Preguntas frecuentes", los encabezados numerados, la banda de servicios y la de identidad). Con
la calibración de las cuatro páginas ya medidas (cove 757, regimenes-aduaneros 756,
valor-en-aduana 757, immex 774, todas con textos propios de tamaño comparable), la estimación
apunta a que el render real cae dentro de 600-780, pero **queda pendiente la medición real con
navegador**, que corre el orquestador por lote junto con el resto de criterios de servidor
(noindex por cabecera, tres estados del formulario, `campaign` en el payload, responsive a
375px).
