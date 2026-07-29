# Landing de pauta agencia aduanal (`/lp/agencia-aduanal`)

Landing del cluster de mayor volumen comercial del lote. Sigue el molde fijado en
`docs/specs/landings-pauta-molde.md`: arquitectura, diseño, registro del copy y
prohibiciones de dato no se repiten aquí.

## Por qué esta keyword

Cluster completo, según el briefing del lote.

| Palabra clave | Búsquedas/mes | Competencia | CPC alto |
|---|---|---|---|
| agente aduanal monterrey | 9,900 | Alta | $3.74 |
| agencia aduanal | 8,100 | Baja | $2.34 |
| agente aduanal | 6,600 | Media | $2.25 |
| agencia aduanal monterrey | 6,600 | Media | $1.54 |
| despacho de aduana | 3,600 | Baja | $0.31 |

Volumen agregado más alto del conjunto de 12 y el clic más caro (hasta $3.74 en la
variante con Monterrey). Justifica que el copy trabaje en vez de repetir el molde.

## Quién llega y qué quiere

Alguien que busca contratar o cambiar de agente/agencia aduanal. Espera un despachador,
no una firma legal. Regla que manda sobre el contenido: la página no compite por ese
servicio ni lo niega. Le habla a quien ya tiene, o está por tener, un agente aduanal y no
sabe qué parte de la operación sigue siendo suya frente a la autoridad.

El ángulo, documentado en el corpus: el agente aduanal despacha el pedimento bajo un
encargo conferido; la obligación de manifestar y sustentar el valor, y de vigilar a
quién se le tiene ese encargo abierto, la conserva el importador. Esa brecha entre
"contraté a alguien" y "sigo siendo responsable" es real y ya se afirma en la FAQ de
`/lp/vucem` y `/lp/cove`. Aquí es el tema central, no una FAQ de paso.

## Alcance

1. Ruta nueva `src/app/lp/agencia-aduanal/page.tsx`, en español, `noindex` (metadata más
   la cabecera que `next.config.ts` ya aplica a `/lp/:path*`).
2. Contenido de nivel especialista sobre el encargo conferido y el reparto de
   responsabilidad entre importador y agente aduanal.
3. `LeadPanel` con `campaign="Landing Agencia aduanal (pauta)"`. No se toca el
   componente ni `/api/leads`.
4. Bloque propio obligatorio: familia `CitaFundamento`, posición `tras-causas`, ancla "la
   obligación es del importador".

## Fuera de alcance

- El padrón de importadores (tema de `/lp/padron-de-importadores`, en curso en paralelo).
- La anatomía del pedimento y qué declara cada bloque (tema de `/lp/pedimento`, en curso
  en paralelo).
- Cualquier afirmación sobre el modelo de despacho de BG. Ver "Restricción crítica"
  abajo y "Por confirmar con BG".
- Las otras 9 keywords del lote. Se resuelven en sus propias landings.

## RESTRICCIÓN CRÍTICA: el modelo de despacho

Esta página no afirma cómo despacha BG: ni patente propia, ni red de agentes aliados, ni
despacho directo. En `src/content/guias.ts:367` existe copy publicado ("que se despacha a
través de agentes aduanales aliados") que no se tomó como fuente: es un dato de un spec
anterior, sin confirmar con la firma, y el molde lo prohíbe explícitamente. La página solo
afirma lo que sí está documentado: BG es una firma de consultoría legal en comercio
exterior que asesora, revisa, audita y representa ante la autoridad; el agente aduanal
(genérico, sin decir si es aliado de BG o no) presenta el pedimento.

## Fuente de verdad del contenido

Por orden. Nada que no salga de aquí se afirma en la página.

1. `src/content/guias.ts`, guía `encargo-conferido` (definición, puntosClave, errores y
   fundamento de arts. 40 y 59-III) y guía `manifestacion-de-valor` (fundamento de arts.
   59-III y 81, puntosClave sobre la responsabilidad del importador). Se leyeron también
   `pedimento` y `padron-de-importadores`, como pide la tarea, pero su contenido propio
   (anatomía del documento, padrones sectoriales) no se desarrolla aquí: es de otras
   landings.
2. `src/app/lp/cove/page.tsx` y `vucem/page.tsx` para el fundamento legal ya verificado y
   las cifras autorizadas de la firma (no se repite ningún literal de más de 60
   caracteres de esas dos páginas).
3. `src/components/lp/constantes.ts` para `SERVICIOS`, `CIFRAS`, `AREAS` y
   `CREDENCIALES_HERO`, reusados sin modificar.

## Diferencia obligatoria contra las otras landings

- Contra `/lp/vucem` y `/lp/cove`: ellas tratan la transmisión y el valor en la
  ventanilla (COVE, e.firma, correspondencia con el pedimento). Esta landing no toca la
  ventanilla: trata la relación con el agente aduanal y el reparto de responsabilidad
  bajo el encargo conferido.
- Contra `/lp/pedimento`: el pedimento y lo que declara (régimen, clasificación, valor,
  clave) son su tema. Aquí el pedimento aparece solo como el acto que se firma bajo el
  encargo, nunca se explica su anatomía.
- Contra `/lp/padron-de-importadores`: el padrón, sus requisitos y su suspensión son su
  tema. Aquí el padrón no se menciona; el encargo conferido es un concepto distinto
  (autorización a un agente para despachar, no inscripción para poder importar).
- Ningún párrafo de esta página funciona igual en otra: las tres causas, la escalada y el
  bloque propio giran sobre el encargo conferido y la responsabilidad, un eje que no
  aparece desarrollado en ninguna de las páginas ya publicadas.

## Variación obligatoria

Dos palancas movidas respecto al default, las que pide la tarea para este tema:

1. **Número de causas: 3, no 4.** El material de `encargo-conferido` y
   `manifestacion-de-valor` da para tres supuestos honestos (transferencia de
   responsabilidad, sustento del valor, control del encargo abierto). Forzar una cuarta
   hubiera repetido alguna de las tres o invadido el tema del pedimento o del padrón.
2. **`causas.etiquetas` propias: "Lo que se asume" / "Lo que dice la ley".** El default
   "Qué ocurre / Qué se hace" no encaja: el tema no es un incidente operativo que se
   corrige, es una idea equivocada sobre quién responde, contrastada con lo que fija la
   ley. El par nuevo lee cada fila como creencia común frente a la obligación real.

## Contenido, sección por sección

1. **Entrada.** Eyebrow "Agencia aduanal · Encargo conferido". H1 "Asesoría legal sobre
   la responsabilidad que no traslada el encargo". Lead: el agente aduanal presenta el
   pedimento bajo un encargo conferido; el valor declarado, su sustento y el control de
   ese encargo siguen siendo del importador.
2. **Causas (`CAUSAS`, 3), etiquetas "Lo que se asume / Lo que dice la ley":**
   - El encargo conferido, tomado como transferencia de responsabilidad. Arts. 40 y 59-III
     Ley Aduanera. Se asume que firmar el encargo traslada la responsabilidad al agente;
     la ley dice que el encargo autoriza a presentar pedimentos y que lo despachado bajo
     un encargo vigente se imputa al importador.
   - El valor declarado, delegado por completo al agente aduanal. Art. 59-III y art. 81
     Ley Aduanera. Se asume que el agente calcula y respalda el valor; la manifestación de
     valor y sus incrementables las integra y conserva el importador.
   - El encargo conferido, abierto y sin revisar. Art. 40 Ley Aduanera y reglas de RGCE.
     Se asume que basta con haberlo conferido una vez; la ley prevé otorgarlo y revocarlo
     agente por agente, y uno que sigue abierto sin uso queda como vía de despacho fuera
     de control.
3. **Bloque propio: "La obligación es del importador" (`CitaFundamento`, tras-causas).**
   Cita a tamaño display: "El encargo conferido autoriza a presentar el pedimento. No
   traslada la obligación de sustentar el valor declarado." Glosa: art. 59-III y art. 40
   Ley Aduanera, con la lectura de que el importador confiere el encargo y conserva la
   obligación de manifestar y sustentar el valor.
4. **Consecuencias (`ESCALADA`, 3).** Encargo abierto sin revisión (cada pedimento
   firmado bajo un encargo vigente se imputa a la empresa) · Valor sin sustento propio
   (queda sin respaldo si la manifestación no la integró el importador) · Determinación a
   nombre de la empresa (el crédito fiscal se finca contra el importador, no contra el
   agente).
5. **Servicios (`SERVICIOS`, default de `constantes.ts`).** Los mismos cuatro momentos y
   servicios reales usados en cove/vucem/immex. No se inventan servicios nuevos.
6. **Preguntas (`PREGUNTAS`, 3).** ¿El agente aduanal responde si el pedimento sale mal?
   (no; el encargo autoriza, no traslada la obligación) · ¿Qué control tiene la empresa
   sobre el encargo conferido? (se otorga y revoca agente por agente) · ¿BG sustituye a la
   agencia aduanal? (no; la agencia presenta el pedimento, BG asesora y representa).
7. **Banda de identidad**, reusada tal cual: logo, las tres cifras autorizadas y las 8
   áreas de práctica.

Sin bloque de "qué es un agente aduanal". Sin testimonios, sin logos de clientes, sin
cifras de resultado.

## Criterios de aceptación

- [x] `tsc --noEmit` en cero.
- [x] `eslint` sobre el archivo en cero.
- [x] Bloque propio presente, familia `CitaFundamento`, posición `tras-causas`.
- [x] Dos palancas de variación movidas (3 causas, etiquetas propias).
- [x] Todos los `fundamento` existen ya en `src/content/guias.ts` (arts. 40 y 59-III,
      art. 81, reglas de encargo conferido en las RGCE).
- [x] Cero afirmación sobre el modelo de despacho de BG.
- [x] Solo las cifras 20/8/2 (heredadas de `constantes.ts`, sin cambio).
- [x] Ningún literal de más de 60 caracteres compartido con `/lp/cove` o `/lp/vucem`
      (verificado por lectura cruzada de los tres archivos).
- [ ] 200 y `noindex` por cabecera, capturas a 1440x900 y 375x812, tres estados del
      formulario interceptados, `campaign` correcto en el payload sin llegar a Neon: no
      verificables por este agente, se corren en el pase del orquestador contra el
      servidor levantado, junto con `immex` y `pedimento`/`padron-de-importadores`.
- [ ] Texto visible entre 600 y 780 palabras: contado por aproximación de `node` sobre
      los strings del config (ver abajo), no sobre el DOM renderizado. Pendiente de
      confirmar contra la página servida.

## Conteo de palabras (aproximado)

Contado con `node` sobre las strings visibles del `CONFIG` propio de esta landing
(hero, encabezados de sección, las tres causas completas, la escalada completa, las tres
preguntas del FAQ pero solo la primera respuesta, que es la única que `Faq.tsx` monta en
el DOM cuando el acordeón abre por default en el índice 0, y el alcance del `LeadPanel`):
**491 palabras propias**.

Calibración: el mismo método aplicado al `CONFIG` de `/lp/cove` da 480 palabras propias,
contra 740 palabras totales reales medidas en la página servida (según su spec). La
diferencia, aproximadamente 260 palabras, corresponde a los componentes compartidos del
molde (credenciales del hero, servicios, banda de identidad, ficha del `LeadPanel`), que
son fijos entre landings. Proyectando esa misma diferencia sobre esta página: 491 + 260 ≈
**751 palabras totales estimadas**, dentro del rango 600-780 con margen. Es una
aproximación, no una medición: falta confirmarla contra `document.body.innerText` en la
página servida, con la primera pregunta del acordeón abierta, en el pase del
orquestador.

## Anuncios

Tres variantes. Conteo carácter por carácter con `node` (títulos ≤ 30, descripciones ≤
90); el número entre paréntesis es la longitud real.

### Variante 1 · Responsabilidad

Títulos:
- Su agente aduanal, ¿responde? (30)
- Lo que sigue siendo suyo (25)
- Encargo conferido, revisado (27)

Descripciones:
- El encargo conferido autoriza a despachar; no traslada la obligación del valor. (79)
- Firma legal de comercio exterior: valor declarado, encargo y pedimentos. (71)

### Variante 2 · Reparto

Títulos:
- Agente aduanal y su empresa (28)
- Quién responde por el valor (28)
- Encargo conferido: qué cubre (29)

Descripciones:
- El valor declarado y el encargo conferido, revisados antes de operar o de una visita. (87)
- Especialistas en valor en aduana, encargo conferido y pedimentos. Tijuana y San Diego. (85)

### Variante 3 · Autoridad

Títulos:
- Firma legal, no un gestor (25)
- Encargo conferido revisado (26)
- Consultoría legal aduanal (25)

Descripciones:
- Sustento legal del encargo conferido y del valor que declara la empresa. (72)
- Recursos administrativos, acuerdos conclusivos y juicio ante el TFJA. (69)

Nota: esta variante se reescribió en la revisión del lote. La versión anterior repetía
carácter por carácter la de `/lp/pedimento` y usaba el título "20 años en comercio
exterior", que afirma la cifra sin su matiz obligatorio ("en promedio entre los socios").
La cifra sale de los títulos: donde hay espacio para el matiz completo es en la
descripción y en la banda de identidad de la página.

## Keywords y negativas

| Palabra clave | Volumen/mes | Competencia | Puja alta | Concordancia |
|---|---|---|---|---|
| agente aduanal monterrey | 9,900 | Alta | $3.74 | Frase |
| agencia aduanal | 8,100 | Baja | $2.34 | Frase |
| agente aduanal | 6,600 | Media | $2.25 | Frase |
| agencia aduanal monterrey | 6,600 | Media | $1.54 | Frase |
| despacho de aduana | 3,600 | Baja | $0.31 | Frase |

Solo los volúmenes reportados en el briefing. Variantes sin dato (por ejemplo "agente
aduanal tijuana", "mejor agencia aduanal") no se cargan con cifra inventada: se piden a
SEMrush antes de subir la campaña.

Negativas base del molde: curso, diplomado, licenciatura, maestría, carrera,
universidad, qué es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo,
salario, bolsa de trabajo, iniciar sesión, contraseña, mi cuenta.

Negativas propias del cluster, por ambigüedad de intención: vacante, empleo, curriculum,
cv, capacitación, certificación (para no cruzar con `certificacion-iva-ieps`), franquicia,
requisitos para ser agente aduanal, examen agente aduanal, colegio de agentes aduanales
(términos informativos sobre la profesión, no sobre contratar un servicio).

## Riesgos

1. **Volumen alto, competencia alta en la variante Monterrey ($3.74).** Es el clic más
   caro del lote entero. Si el copy no convierte, el CPC se come el presupuesto rápido;
   de ahí la insistencia del brief en que el copy trabaje.
2. **Canibalización de intención con `/lp/pedimento` y `/lp/padron-de-importadores`.**
   Las tres tocan al agente aduanal de refilón. Se resuelve con la sección de diferencia
   obligatoria de arriba: aquí es responsabilidad y encargo conferido, no el documento ni
   el registro.
3. **Riesgo de sonar defensivo.** El ángulo (la responsabilidad no se transfiere) puede
   leerse como corregir al visitante en vez de orientarlo. Se mitigó evitando cualquier
   frase en segunda persona acusatoria ("usted cree que...", "no sabía que..."); las
   causas se presentan como supuesto/ley, no como error del lector.
4. **Corpus delgado en un punto:** el material específico de "a cuántos agentes tienes el
   encargo conferido abierto hoy" vive en el `ctaTitulo` de la guía `encargo-conferido`,
   que no es contenido de cuerpo (`puntosClave`/`errores`/`fundamento`), sino un titular
   de CTA de la guía. Se usó el contenido equivalente de `errores` ("Encargos abiertos
   que ya no se usan") en vez de citar el `ctaTitulo` literal, para no basar una causa en
   un texto que no es parte del cuerpo verificado de la guía.

## Por confirmar con BG

- **El modelo de despacho.** Esta página, a propósito, no dice si BG opera con patente
  propia, con una red de agentes aduanales aliados, o de otra forma. El copy de
  `guias.ts:367` que sí lo afirma ("se despacha a través de agentes aduanales aliados")
  viene de una decisión de spec anterior sin confirmar con la firma, y no se usó como
  fuente. Mientras no se confirme, esta landing (y su ángulo entero, que depende de
  hablarle a quien ya tiene un agente aduanal contratado) se sostiene en un terreno
  neutral: nunca dice si BG es o no la agencia aduanal. Confirmar esto antes de encender
  la pauta es más importante aquí que en las otras 11 landings, porque el cluster entero
  busca justamente un despachador y un anuncio ambiguo sobre qué es BG puede generar
  clics que rebotan al primer contacto.
- Volumen real de las variantes largas de la keyword (Tijuana, requisitos, etc.), pendiente
  de SEMrush.
- Si la Variante 3 de anuncio puede reutilizar literal el texto ya publicado en cove/vucem
  o debe reescribirse por landing (ver nota en "Anuncios").
- Revisión jurídica de la página antes de encender la pauta, igual que se pidió para
  VUCEM y COVE.

## Petición al molde

Ninguna. El tipo `CitaFundamento` ya existía en `src/components/lp/familias/` con las
props exactas que pedía la asignación (`{ cita: string; texto: string }`); no hizo falta
pedir nada nuevo al molde.

## Cómo quedó

Las tres causas citan fundamento que ya está en `src/content/guias.ts`: art. 40 y art.
59, fracción III (guía `encargo-conferido`, línea 476), y art. 59, fracción III, y art.
81 (guía `manifestacion-de-valor`, línea 399). Cero fundamentos nuevos.

El bloque propio usa `CitaFundamento` en `tras-causas`, con la cita apoyada en el mismo
par de artículos, sin repetir literal ninguna oración de las causas.

Se leyeron las guías `pedimento` y `padron-de-importadores` como pedía la tarea, pero su
contenido propio no se usó: son territorio de otras dos landings del lote en curso.

Verificación corrida por este agente: `npx tsc --noEmit --incremental false` (exit 0) y
`npx eslint src/app/lp/agencia-aduanal/page.tsx` (exit 0). No se corrió `npm run build`
ni se levantó servidor, por instrucción explícita de no competir con los otros agentes
del lote. Capturas, `noindex` por cabecera y prueba de los tres estados del formulario
quedan pendientes del pase del orquestador.
