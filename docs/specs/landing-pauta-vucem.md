# Landing de pauta: VUCEM (piloto)

Estado: en construcción · Impacto: verde (Oscar lo pidió explícito el 2026-07-28)
Repo: bg-group · Rama: `feat/lp-vucem`

## Objetivo

Primera de una familia de landings que reciben el clic de Google Ads. Una landing por palabra
clave del reporte `public/BG-estrategia-sem-seo.html`. Esta es el **piloto**: fija el patrón
(estructura, tono, captura de datos) que después se replica, no la cobertura.

Keyword piloto: **VUCEM**. 90,500 búsquedas/mes en México, dificultad 36%, CPC estimado 0.45 USD,
**cero anunciantes pagando hoy**. Los primeros lugares orgánicos son portales de gobierno, así que
posicionar por SEO no es viable: es la keyword donde el anuncio es la única entrada.

## Quién llega y qué quiere

Intención **navegacional**: la persona quiere entrar al portal a hacer un trámite, no leer teoría.
Ya opera en comercio exterior. Es responsable de tráfico, comercio exterior o finanzas en una
empresa IMMEX, o un agente aduanal.

De ahí la regla que manda sobre todo el contenido: **no es una página de "qué es VUCEM"**. Quien
busca eso ya lo sabe. BG es una firma de especialistas y la página tiene que demostrarlo en los
primeros diez segundos, o el visitante se va al portal de gobierno que está justo abajo.

## Alcance

1. Ruta nueva `/lp/vucem`, en español, `noindex` (es tráfico pagado, no debe competir con `/guias`).
2. Contenido de nivel especialista sobre operar en VUCEM: qué se atora, por qué se rechaza, qué
   consecuencia legal tiene y cómo se previene.
3. Formulario de captura en **sidebar fijo** en escritorio, que acompaña el scroll sin tapar el
   contenido. En móvil no hay sidebar: barra inferior con ancla al formulario, que va al final.
4. El lead entra por el `/api/leads` que ya existe. No se crea endpoint nuevo ni tabla nueva.
5. Entregable de texto aparte, en este mismo archivo: variantes de anuncio y el mapa de keywords.

## Fuera de alcance

- Las otras 37 keywords SEM. Se propagan después, con este patrón ya aprobado.
- Tocar `/guias`, la home o el CRM.
- Alta de la campaña en Google Ads. Aquí solo se entregan los textos.
- Versión en inglés. La pauta corre en México.

## Fuente de verdad del contenido

Por orden. **Nada que no salga de aquí se afirma en la página.**

1. `src/content/guias.ts`, en especial `manifestacion-de-valor`, `pedimento`, `anexo-24` y
   `valoracion-aduanera`. Ese corpus ya tiene el registro correcto: definición propia, fundamento
   legal citado y errores con su consecuencia.
2. `docs/bgcg-source.md` y `docs/bgcg-site-content.txt` para servicios y capacidades reales de BG.
3. `public/BG-estrategia-sem-seo.html` para los datos de la keyword.

Prohibido inventar cifras, plazos, precios, tiempos de respuesta del portal, número de clientes o
casos. Si un dato hace falta y no está en las fuentes, **no se escribe**: se anota al final del
spec, en "Por confirmar con BG", y se entrega la página sin él. Un dato inventado en una página
de una firma legal es el peor error posible aquí.

## Estructura de la página

El orden importa: arriba lo que resuelve, abajo lo que convence.

1. **Entrada.** Título que nombra el problema operativo, no la marca. Una línea de apoyo y el
   formulario a la vista en escritorio.
2. **Lo que se atora en VUCEM.** El bloque de mayor valor. Cada caso: qué pasa, por qué la
   autoridad lo rechaza, qué se hace. Con fundamento legal donde exista en el corpus.
3. **Consecuencias.** Qué cuesta cada error: rechazo, crédito fiscal, multa, operación detenida.
   Es el ángulo que distingue a una firma legal de un despacho de trámites.
4. **Cómo entra BG.** Servicios reales del sitio, ligados a los problemas de arriba.
5. **Preguntas.** Las que se hace quien opera, no las de un glosario.
6. **Cierre.** Invitación a dejar los datos, con la promesa concreta de qué recibe a cambio.

Sin bloque de "qué es VUCEM". Sin testimonios. Sin logos de clientes.

## Diseño

- Hereda el sistema del sitio: tokens, tipografía y tema oscuro existentes. No se inventa escala
  ni paleta. Se reusan los componentes de `src/components/site` que apliquen.
- **Las secciones hermanas no pueden ser la misma tarjeta repetida.** Cada bloque con su propia
  familia de layout. Una rejilla de seis tarjetas iguales es el resultado a evitar.
- Sidebar de ~380px, fijo, que **empuja el contenido, no lo tapa**.
- Responsive real a 375px.
- La vista nace con sus estados: envío, éxito y error del formulario.

## Copy

- De usted. Registro institucional, igual que el resto del sitio.
- Cero AI slop: nada de "solución integral", "transforma", "potencia", "sin fricciones".
- Sin em-dashes.
- Títulos planos y descriptivos. Dicen el tema, no juegan con él. Prohibida la frase paralela de
  consultor tipo "Autoridad que compone".

## Anuncios de Google Ads

Tres variantes, cada una con un tono distinto y su pain point. Respetar los límites de Google:
títulos de 30 caracteres, descripciones de 90.

1. **Prevención.** El riesgo de que un trámite mal presentado se convierta en crédito fiscal.
2. **Operación.** La urgencia de destrabar un trámite detenido.
3. **Autoridad.** El respaldo de una firma legal con veinte años, frente a un gestor.

Van al final de este archivo cuando estén escritas, no en un archivo aparte.

## Criterios de aceptación

Se verifican uno por uno antes de reportar. Los cuatro primeros son ejecutables.

1. `npm run build` pasa sin errores ni warnings nuevos.
2. `/lp/vucem` responde 200 y trae `noindex` en las cabeceras.
3. El formulario envía contra `/api/leads` y el lead queda registrado. Se prueba el envío bueno,
   el campo vacío y el error del servidor.
4. Captura con Playwright a 1440px y a 375px, con el sidebar visible en la primera.
5. Ningún dato que no salga de las fuentes listadas arriba.
6. Ninguna sección repite la familia de layout de su hermana.
7. Las tres variantes de anuncio caben en los límites de Google Ads, contados carácter por carácter.

## Riesgo principal

Que la página termine siendo un glosario bonito. Si el visitante que ya opera en comercio exterior
no aprende nada en el segundo bloque, la landing no sirve por más que convierta el formulario.

## Por confirmar con BG

Datos que la página pedía y no están en las fuentes. Se entregó sin ellos.

1. **Plazo de respuesta a un lead.** El formulario dice que un especialista se pone en contacto, sin
   prometer cuándo. El sitio declara "disponibilidad 24 horas, 7 días" como valor de la firma, que no
   es lo mismo que un tiempo de respuesta comprometido.
2. **Costo de la primera revisión.** No se dice si tiene costo. Mientras no se confirme, la página no
   afirma que sea gratuita.
3. **Casos y cifras de resultado.** Sin número de operaciones atendidas, clientes ni recuperaciones.
   Por eso no hay bloque de prueba social.
4. **Tiempos del portal.** Nada sobre cuánto tarda la VUCEM en resolver un trámite o un rechazo.
5. **Revisión jurídica del contenido.** Los fundamentos citados vienen del corpus de `/guias`, que en
   su encabezado ya advierte que al escalar requiere revisión de un experto de BG. Esta landing
   hereda ese pendiente.

## Entregable de texto: anuncios de Google Ads

Conteo hecho carácter por carácter con `node` sobre el texto exacto (títulos ≤ 30, descripciones
≤ 90). El número entre paréntesis es la longitud real.

### Variante 1 · Prevención
Pain point: un trámite mal presentado que termina en crédito fiscal.

Títulos:
- Antes del crédito fiscal (24)
- Revisión de valor en aduana (27)
- Auditoría preventiva aduanal (28)

Descripciones:
- Un valor sin sustento se convierte en crédito fiscal. Lo revisamos antes que la autoridad. (90)
- Firma legal de comercio exterior: manifestación de valor, pedimentos y Anexo 24. (80)

### Variante 2 · Operación
Pain point: trámite detenido y mercancía parada en la aduana.

Títulos:
- Trámite detenido en VUCEM (25)
- Rechazo de COVE o e.firma (25)
- Mercancía parada en aduana (26)

Descripciones:
- Revisamos por qué la ventanilla rechaza su transmisión y qué se corrige hoy. (76)
- Especialistas en COVE, pedimentos y valor en aduana. Tijuana y San Diego. (73)

### Variante 3 · Autoridad
Pain point: una firma legal frente a un gestor de trámites.

Títulos:
- Firma legal, no un gestor (25)
- 20 años en comercio exterior (28)
- Consultoría legal aduanal (25)

Descripciones:
- Recursos administrativos, acuerdos conclusivos y juicio ante el TFJA. (69)
- Legal, trade compliance e IT en una sola firma. Tijuana y San Diego. (68)

## Entregable de texto: mapa de keywords

Grupo de anuncios que apunta a `/lp/vucem`. Volumen, dificultad y CPC salen de
`public/BG-estrategia-sem-seo.html` (SEMrush, base México, julio de 2026). El CPC va en dólares.

| Palabra clave | Volumen/mes | Dificultad | CPC | Concordancia |
|---|---|---|---|---|
| VUCEM | 90,500 | 36 % | $0.45 | Frase |
| Ingreso VUCEM | 1,900 | 36 % | $0.00 | Exacta |
| VUCEM SAT | 1,600 | 35 % | $0.44 | Exacta |
| Ventanilla Única VUCEM | 1,300 | 31 % | $0.42 | Exacta |
| VUCEM Ventanilla Única | 1,300 | 30 % | $0.42 | Exacta |
| Sellos VUCEM | 1,000 | 31 % | $0.00 | Exacta |
| Manifestación de Valor VUCEM | 480 | 26 % | $0.38 | Exacta |

Suma del grupo: 98,080 búsquedas al mes.

La cabecera va en frase y no en amplia porque el término solo tiene mucho volumen informativo y de
empleo alrededor: 1,951 variantes con 104,600 búsquedas al mes en conjunto, según el mismo reporte.
Las variantes van en exacta porque ya traen la intención completa.

Negativas, las mismas que el reporte fija desde el día 1: qué es, gratis, pdf, curso, diplomado,
sueldo, cuánto gana, empleo, vacante, carrera, ejemplo.

Correspondencia entre variante de anuncio y keyword: "Sellos VUCEM" e "Ingreso VUCEM" son de acceso
al portal, así que llevan la variante 2 (Operación). "Manifestación de Valor VUCEM" lleva la 1
(Prevención). La cabecera "VUCEM" rota las tres.

## Cómo se propaga a las otras keywords

Lo que fija este piloto, para las 37 restantes:

- Ruta `/lp/<keyword>` bajo `src/app/lp/`, con el shell de `src/app/lp/layout.tsx` (sin navegación
  del sitio: la única salida es el formulario).
- `noindex` por dos vías: `metadata.robots` en la página y la cabecera `X-Robots-Tag` que
  `next.config.ts` aplica a `/lp/:path*`.
- El contenido vive en la propia página, en arreglos con nombre (`ATORONES`, `ESCALADA`,
  `SERVICIOS`, `PREGUNTAS`). No hay motor genérico: cada landing es su propio archivo.
- Captura de leads con `src/components/lp/LeadPanel.tsx`, que recibe `campaign` y lo manda como
  `service` a `/api/leads`. Así el CRM distingue de qué landing vino cada lead.
- Grid de dos columnas `[1fr_380px]`: el sidebar es columna del grid, así que empuja el contenido.
  En móvil el grid colapsa, el formulario queda al final y el CTA vive en la barra fija inferior.
- Las seis secciones no comparten familia de layout. Al replicar, conviene conservar esa regla y
  cambiar el contenido, no aplanar todo a tarjetas.
