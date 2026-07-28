# Landing de pauta COVE (`/lp/cove`)

Segunda landing de la familia. Propaga el patrón aprobado y publicado en `/lp/vucem`.
El spec del piloto, `docs/specs/landing-pauta-vucem.md`, sigue vigente: aquí solo se
escribe lo que cambia. Todo lo que ese archivo fija (arquitectura, diseño, registro del
copy, prohibición de inventar datos) aplica igual y no se repite.

## Por qué esta keyword

Fuente: `/root/BG-reporte-keywords.html` (Google Keyword Planner, base México, julio de
2026), sección "Palabras clave seleccionadas".

| Palabra clave | Tema | Búsquedas/mes | Competencia | Puja alta (USD) |
|---|---|---|---|---|
| cove | VUCEM y trámites del portal | 4,400 | Baja | $1.60 |

Es la segunda del tema "VUCEM y trámites del portal", después de `vucem`, que ya tiene su
landing en producción.

**Advertencia sobre el término.** "cove" es una palabra en inglés (cala, ensenada) y
nombre de varias marcas. La cabecera va en **concordancia de frase**, no amplia, y las
negativas del reporte se cargan desde el día 1 más las de ambigüedad. Si el informe de
términos de búsqueda de la primera semana trae ruido en inglés, se pasa a exacta.

## Quién llega y qué quiere

Intención **transaccional inmediata**, más urgente que la de VUCEM: a quien busca "cove"
normalmente le acaba de rebotar una transmisión o está por transmitirla. Ya sabe qué es un
COVE. La página no explica el término: entra por dónde se rompe.

Regla que manda sobre el contenido: **no es una página de "qué es el COVE"**. Es la página
de por qué un COVE se rechaza, qué expone frente a la autoridad y qué se revisa antes de
pagar el pedimento.

## Alcance

1. Ruta nueva `src/app/lp/cove/page.tsx`, en español, `noindex` (`metadata.robots` más la
   cabecera `X-Robots-Tag` que `next.config.ts` ya aplica a `/lp/:path*`).
2. Contenido de nivel especialista sobre el COVE: qué se transmite, dónde se rompe, qué
   consecuencia legal tiene y cómo se previene.
3. `LeadPanel` con `campaign="cove"`. No se toca el componente ni `/api/leads`.
4. Mismo shell `src/app/lp/layout.tsx`. No se crea motor genérico: la landing es su propio
   archivo, con sus arreglos con nombre, igual que VUCEM.
5. Entregable de texto en este mismo archivo: variantes de anuncio y negativas.

## Fuera de alcance

- Las otras keywords seleccionadas (agente aduanal, IMMEX, padrón de importadores,
  clasificación arancelaria). Se propagan después.
- Guía SEO `/guias/cove`. No existe hoy y es un hueco real del corpus, pero es otra tarea.
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.
- Tocar `/guias`, la home, el CRM o `/lp/vucem`.

## Fuente de verdad del contenido

Por orden. **Nada que no salga de aquí se afirma en la página.**

1. `src/content/guias.ts`: guía `vucem` (puntos clave, distinciones y errores traen el
   material de COVE, e-document y e.firma), más `manifestacion-de-valor`, `pedimento`,
   `valoracion-aduanera` y `anexo-24`.
2. `src/app/lp/vucem/page.tsx` para el fundamento legal ya verificado y las cifras
   autorizadas de la firma.
3. `docs/bgcg-source.md` y `docs/bgcg-site-content.txt` para servicios reales de BG.

Prohibido inventar cifras, plazos, precios, tiempos de respuesta del portal, número de
clientes o casos. Lo que falte se anota abajo en "Por confirmar con BG" y la página se
entrega sin él.

## Diferencia obligatoria contra `/lp/vucem`

Riesgo principal de esta tarea: que salga la landing de VUCEM con las palabras cambiadas.
Comparten tema y las dos citan el COVE. Lo que las separa:

- **VUCEM es el canal, el COVE es el dato.** Esta página trata del valor declarado y su
  correspondencia con el pedimento, no del acceso al portal ni de los permisos de otras
  dependencias.
- La distinción **COVE contra factura** (la factura es el documento comercial, el COVE es
  su representación electrónica que declara el valor y se liga al pedimento) es un bloque
  propio aquí. En VUCEM no aparece.
- Las causas de acceso al portal (usuarios, roles, trámites de otras dependencias) **no**
  entran. Aquí solo lo que rompe una transmisión de valor.
- La e.firma vencida sí entra, pero como una de cuatro y no como cabecera: sin certificado
  vigente no hay transmisión del COVE.

Criterio duro: si un párrafo de esta página funciona igual en `/lp/vucem`, está mal escrito.

## Contenido, sección por sección

Misma estructura de seis bloques y mismas familias de layout distintas entre secciones
hermanas que el piloto. Lo que cambia es qué se dice.

1. **Entrada.** Título que nombra el problema operativo (el COVE rechazado o que no
   coincide), línea de apoyo y formulario a la vista en escritorio.
2. **Causas frecuentes de rechazo (`CAUSAS`, 4).** Cada una con `titulo`, `fundamento`,
   `ocurre`, `hace`:
   - El COVE no coincide con el pedimento. Valor, cantidades o datos del proveedor.
     Arts. 36 y 36-A Ley Aduanera · Anexo 22 de las RGCE. Se revisa la captura antes de
     pagar el pedimento.
   - El valor transmitido no tiene sustento. Manifestación de valor sin integrar o
     incrementables fuera (fletes hasta la aduana, seguros, comisiones, regalías).
     Art. 59 fracción III y art. 81 Ley Aduanera. La obligación es del importador, no del
     agente aduanal.
   - El e-document que soporta el COVE, ilegible o incompleto. La ventanilla genera un
     acuse que se declara en el pedimento; un documento borroso o que no corresponde
     genera rechazos y observaciones.
   - e.firma o sellos vencidos. Sin certificado vigente no hay transmisión y la mercancía
     ya está en la aduana. Arts. 36 y 36-A Ley Aduanera.
3. **COVE contra factura y contra pedimento.** Bloque corto, dos distinciones, tomado
   literal del corpus. Es el ancla de especialista de esta página.
4. **Consecuencias (`ESCALADA`, 3).** Las mismas tres del piloto, que aplican igual:
   operación detenida, valor en aduana recalculado por método secundario, crédito fiscal y
   multas.
5. **Cómo entra BG (`SERVICIOS`, 4).** Los mismos cuatro momentos y servicios reales del
   piloto. No se inventan servicios nuevos.
6. **Preguntas (`PREGUNTAS`, 3).** Reescritas para COVE, no copiadas:
   - ¿Qué se revisa primero cuando la ventanilla rechaza el COVE?
   - ¿Quién responde si el agente aduanal capturó mal el valor? (el importador; el encargo
     conferido no traslada la obligación)
   - ¿BG transmite el COVE o solo asesora? (firma de consultoría legal; el despacho se
     tramita a través de agentes aduanales)
7. **Banda de identidad** con logo, las tres cifras autorizadas (20 años en promedio entre
   los socios, 8 áreas de práctica, 2 oficinas) y las 8 áreas de práctica, igual que la v4
   del piloto. Se reusa tal cual: es identidad de la firma, no contenido de la keyword.

Sin bloque de "qué es el COVE". Sin testimonios. Sin logos de clientes. Sin cifras de
resultado.

## Criterios de aceptación

Verificables uno por uno sobre la página servida, no sobre el código:

- [ ] `/lp/cove` responde 200 y trae `noindex` por metadata y por cabecera.
- [ ] Texto visible entre 600 y 780 palabras. El piloto publicado tiene 734.
- [ ] Las 4 causas citan fundamento legal que existe en el corpus. Cero fundamentos nuevos.
- [ ] El bloque COVE contra factura está presente y no existe en `/lp/vucem`.
- [ ] Cero cifras de resultado, plazos, precios o casos. Las únicas cifras son las tres
      autorizadas de la firma.
- [ ] Secciones hermanas con familias de layout distintas. Cero rejillas de tarjetas
      iguales repetidas.
- [ ] Sidebar de ~380px que empuja el contenido en escritorio; en móvil barra inferior con
      ancla al formulario.
- [ ] Responsive real a 375px.
- [ ] El formulario nace con sus tres estados: envío, éxito y error.
- [ ] `campaign="cove"` llega al lead.
- [ ] `pnpm build` y `tsc` en cero. Lint sin hallazgos nuevos.
- [ ] Capturas reales en claro, oscuro y 375px.
- [ ] Cero leads de prueba dejados en Neon. Si se prueba el formulario, se anota el correo
      usado para poder borrarlo.

## Entregable de texto: anuncios

Tres variantes, mismo formato que el piloto: títulos de hasta 30 caracteres y
descripciones de hasta 90, con el conteo entre paréntesis. Se escriben en la
implementación y se anexan a este archivo.

Ángulos, uno por variante:
1. **Rechazo.** El COVE rebotó y hay mercancía esperando.
2. **Correspondencia.** COVE y pedimento que no cuadran.
3. **Autoridad.** Firma legal que sustenta el valor, no un gestor de captura.

Conteo hecho carácter por carácter con `node` sobre el texto exacto (títulos ≤ 30,
descripciones ≤ 90). El número entre paréntesis es la longitud real.

### Variante 1 · Rechazo

Títulos:
- COVE rechazado en la aduana (27)
- Su COVE no pasó la ventanilla (29)
- Mercancía detenida por COVE (27)

Descripciones:
- Revisamos por qué se rechazó su COVE y qué se corrige antes de pagar el pedimento. (82)
- Firma legal de comercio exterior: valor declarado, COVE y pedimentos. (69)

### Variante 2 · Correspondencia

Títulos:
- COVE y pedimento no cuadran (27)
- Diferencia entre COVE y valor (29)
- Revisión de COVE y pedimento (28)

Descripciones:
- Diferencias de valor o proveedor entre el COVE y el pedimento. Se revisan antes de pagar. (89)
- Especialistas en valor en aduana, COVE y pedimentos. Tijuana y San Diego. (73)

### Variante 3 · Autoridad

Títulos:
- Firma legal, no un gestor (25)
- 20 años en comercio exterior (28)
- Consultoría legal aduanal (25)

Descripciones:
- Sustento del valor declarado frente a la autoridad. Legal, trade compliance e IT. (81)
- Recursos administrativos, acuerdos conclusivos y juicio ante el TFJA. (69)

## Entregable de texto: keywords y negativas

Grupo de anuncios que apunta a `/lp/cove`.

| Palabra clave | Volumen/mes | Competencia | Puja alta | Concordancia |
|---|---|---|---|---|
| cove | 4,400 | Baja | $1.60 | Frase |

Las variantes largas ("cove aduana", "cove pedimento", "cove vucem") **no tienen volumen
reportado en la fuente**: no se inventan cifras. Se cargan sin dato o se piden a SEMrush
antes de subir la campaña.

Negativas, las del reporte desde el día 1: curso, diplomado, licenciatura, maestría,
carrera, universidad, qué es, significado, ejemplos, formato, pdf, gratis, vacantes,
sueldo, salario, bolsa de trabajo, iniciar sesión, contraseña, mi cuenta.

Más las de ambigüedad del término, específicas de esta keyword: beach, resort, hotel,
restaurant, lyrics, band, smart cove, cove tools.

## Riesgos

1. **Canibalización con `/lp/vucem`.** Dos landings del mismo tema. Se resuelve con la
   sección de diferencia obligatoria de arriba y con concordancia de frase, no amplia.
2. **Ruido en inglés.** El término es ambiguo fuera del contexto aduanero. Negativas desde
   el día 1 y revisión de términos de búsqueda en la primera semana.
3. **Corpus delgado.** El material específico de COVE vive dentro de la guía de VUCEM y son
   pocos hechos. Si al escribir falta sustancia, **no se rellena**: se anota abajo.

## Por confirmar con BG

- Volumen real de las variantes largas de la keyword.
- Revisión jurídica de la página antes de encender la pauta, igual que se pidió para VUCEM.

## Cómo quedó

Orden final de las siete piezas de "Contenido, sección por sección": la banda de identidad
va al final, después de Preguntas frecuentes, tal como quedó numerada arriba (a diferencia
de `/lp/vucem`, donde va antes del FAQ). Cierra la página con la identidad de la firma justo
antes de la ficha corta del sidebar.

El bloque "COVE contra factura y contra pedimento" usa una familia de layout propia: dos
tarjetas lado a lado separadas por un signo "≠", sin números de índice ni acordeón. No
repite la fila de expediente de Causas, la cadena escalonada de Consecuencias, la lista
fluida de Servicios ni el acordeón de Preguntas.

Las cuatro causas citan fundamento que ya está en `src/content/guias.ts` (arts. 36 y 36-A,
art. 59-III, art. 81 Ley Aduanera, Anexo 22 RGCE y el Decreto de la Ventanilla Digital). Cero
fundamentos nuevos.

**Texto visible**: 740 palabras (`document.body.innerText` a 1440px, con la primera pregunta
del acordeón abierta), dentro del rango de 600 a 780 del criterio.

**Sobre `campaign="cove"`**: se siguió el spec literal, distinto de la convención de
`/lp/vucem` (`campaign="Landing VUCEM (pauta)"`). El campo llega tal cual a `service` en el
lead. No se tocó `LeadPanel` ni `/api/leads`.

Sin leads de prueba en Neon: la prueba del estado de error se hizo interceptando la
petición a `/api/leads` con Playwright (`route.abort()`), sin llegar a la base de datos.
