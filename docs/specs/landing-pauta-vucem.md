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
2. Contenido de nivel especialista sobre operar en VUCEM: qué detiene una operación, por qué se rechaza, qué
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
2. **Causas frecuentes de rechazo.** El bloque de mayor valor. Cada caso: qué pasa, por qué la
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
- El contenido vive en la propia página, en arreglos con nombre (`CAUSAS`, `ESCALADA`,
  `SERVICIOS`, `PREGUNTAS`). No hay motor genérico: cada landing es su propio archivo.
- Captura de leads con `src/components/lp/LeadPanel.tsx`, que recibe `campaign` y lo manda como
  `service` a `/api/leads`. Así el CRM distingue de qué landing vino cada lead.
- Grid de dos columnas `[1fr_380px]`: el sidebar es columna del grid, así que empuja el contenido.
  En móvil el grid colapsa, el formulario queda al final y el CTA vive en la barra fija inferior.
- Las secciones no comparten familia de layout. Al replicar, conviene conservar esa regla y
  cambiar el contenido, no aplanar todo a tarjetas.

---

# Ajuste tras la primera revisión (v2)

Oscar vio el piloto el 2026-07-28 y pidió dos cosas: **que pese menos** y **que sea más formal**.
Además pidió mirar cómo escribe la competencia, en concreto OneCore.

Esto reemplaza lo que contradiga de arriba. Todo lo demás sigue vigente: fuente de verdad, cero
datos inventados, sidebar que empuja, estados del formulario, anuncios ya escritos.

## Lo que se encontró en la competencia

**OneCore** (`onecore.mx`, software de compliance de comercio exterior). Escribe de tú, semiformal,
con exclamaciones del tipo "¡Descubre lo que un sistema de compliance puede hacer por tu empresa!".
**Ese registro no se copia.** Lo que sí se copia es su densidad: 2 a 4 líneas por sección, titulares
cortos y descriptivos, y el peso puesto en lo visual, no en el párrafo. Su titular es
"Sistema para evitar multas en auditorías de Comercio Exterior": dice qué es, sin adornarlo.

Ya tienen publicado "¿Qué es la Ventanilla Única de Comercio Exterior Mexicano (VUCEM)?" y otro de
trámites de la ventanilla. Confirma la decisión de origen: el ángulo básico está ocupado y no es
por ahí.

**VTZ** (`vtz.mx`, firma de abogados de comercio exterior, el par real de BG). Registro formal alto,
de usted e impersonal, tercera persona, títulos secos: "Comercio Exterior y Aduanas".

La receta: **densidad de OneCore, registro de VTZ.**

## Formalidad: qué cambia en el lenguaje

El texto actual usa un registro coloquial que hay que subir.

- Fuera "atorar", "atorón", "se atora", "lo que se atora". Es coloquial mexicano. Entra: **rechazo,
  detención, observación, inconsistencia**.
- Títulos secos y nominales, no narrativos ni en primera persona del plural:
  - "Lo que se atora en la VUCEM" → "Causas frecuentes de rechazo"
  - "A qué escala un error que no se corrige" → "Consecuencias de una operación mal documentada"
  - "Cómo entra BG en la operación" → "Servicios"
  - "Lo que preguntan quienes ya operan" → "Preguntas frecuentes"
  - "Qué se revisa en la primera conversación" → "Alcance de la primera revisión"
- El H1 actual, "Cuando la ventanilla rechaza la transmisión y la mercancía ya está en la aduana",
  es narrativo y largo. Se sustituye por uno nominal y descriptivo. Entregar la página con el que
  se elija y anotar la alternativa en este spec.
- Tercera persona o de usted, nunca "nosotros" como protagonista. "Se revisa el valor declarado",
  no "revisamos su operación".
- Ni una exclamación. Ni una pregunta retórica como título.

## Volumen: qué se recorta

Meta: **alrededor del 40% menos de texto visible** y una sección menos. Se recorta por número de
elementos y por longitud de cada uno, no encogiendo la tipografía.

| Bloque | Ahora | Queda |
|---|---|---|
| Causas de rechazo | 6 casos, 3 renglones cada uno | **4 casos, 2 renglones**: qué lo detiene y qué se hace |
| Consecuencias | 5 escalones | **3 escalones** |
| Servicios | 5 bloques con 4 puntos | **4 bloques con 3 puntos**, una línea cada uno |
| Preguntas | 5 | **3** |
| Cierre | sección propia + formulario | **se fusiona con el formulario**, deja de ser sección |

Las cuatro causas que se conservan, por peso legal: COVE contra pedimento, manifestación de valor,
fracción arancelaria o clave equivocada, y e.firma o sellos vencidos. Se van "e-document ilegible"
y "usuarios y accesos sin control".

Los tres escalones que se conservan: operación detenida, valor en aduana recalculado, crédito
fiscal y multas. Se van "rechazo en la ventanilla" (es el punto de partida, no una consecuencia) y
"controversia".

Ningún párrafo de más de 3 líneas en escritorio. Si una idea no cabe, se corta, no se encoge.

## Lo que NO se toca

- La estructura de layout: cada sección con su propia familia sigue siendo correcta y aprobada.
- El sidebar de captura y su formulario.
- Los anuncios y el mapa de keywords, ya escritos y contados.
- El contenido técnico que se conserve: mismo fundamento legal, misma exactitud.

## Criterios de aceptación de esta pasada

1. El texto visible baja al menos 35% en número de palabras contra la versión anterior. Se mide y
   se reporta el número.
2. Cero apariciones de "atorar" y sus formas, en la página y en el spec.
3. Ningún párrafo de más de 3 líneas a 1440px.
4. Build limpio, 200 y noindex, como antes.
5. Capturas nuevas a 1440 y 375.

## Resultado de la pasada v2

**H1 entregado:** "Asesoría legal para operaciones detenidas en la VUCEM". Nominal, dice el servicio
y el momento en que se necesita.
**Alternativa considerada:** "Rechazos en la VUCEM: causas, riesgo fiscal y corrección". Describe el
contenido de la página en lugar del servicio, así que lee más a artículo que a landing de pauta.

**Medición del texto visible** (`document.body.innerText`, 1440px, misma página y mismo mecanismo
antes y después, con la primera pregunta del acordeón abierta):

| | Palabras |
|---|---|
| Antes (commit `ea2e7e7`) | 1188 |
| Después | 648 |
| Diferencia | **-45.5%** |

**Sobre "atorar":** cero apariciones en la página. En este spec quedan solo las de la sección
"Formalidad", que son la cita de la propia regla.

**Etiquetas de las causas:** el spec pedía "qué lo detiene / qué se hace". Se entregó "Qué ocurre /
Qué se hace" porque dos de las cuatro causas (manifestación de valor y fracción arancelaria) no
detienen la transmisión: se ven en revisión posterior. Poner "qué lo detiene" ahí sería inexacto.

**El cierre se fusionó con el formulario:** los tres puntos del alcance de la primera revisión viven
dentro del `LeadPanel`, arriba de los campos, y sustituyen al párrafo introductorio que tenía.
Quedan visibles sin abrir nada y sin scroll dentro del sidebar.

---

# Ajuste v3: bloque de identidad de la firma

Oscar aprobó la v2 el 2026-07-28 ("ya quedó mejor, la dejaría así") y pidió una sola cosa más.

## El problema que resuelve

El visitante llega desde un anuncio de Google. No conoce BG, no sabe si es un despacho de trámites,
una agencia aduanal o una firma legal. Antes de dejar sus datos necesita saber a quién le habla.
Hoy la página no lo dice en ningún lado: se da por sabido.

## Qué se agrega, en dos lugares

**1. Banda en el cuerpo, ANTES de "Preguntas frecuentes".** No al final. Va cuando el visitante ya
leyó las causas y las consecuencias, justo antes de resolver sus dudas.

Contenido: qué es BG en una o dos líneas, y las áreas de práctica juntas, compactas. Muy sencilla,
sin florituras. Es una banda de identidad, no una sección de "nosotros" con historia.

**2. Ficha compacta en la columna del formulario, debajo del botón de enviar.** Tres o cuatro
líneas, no más. Lo mínimo para que quien está por escribir sus datos sepa a quién se los deja.

Las dos comparten fuente y mensaje, pero no el mismo texto palabra por palabra: la del sidebar es
la versión corta, no un recorte literal de la banda.

## Fuente de verdad, y el límite

Solo lo verificable en el repo: `src/content/dictionaries.ts` (bloque `about`), `services-detail.ts`,
`service-slugs.ts` y `team.ts`.

**Sin cifras de resultado.** Nada de número de clientes, operaciones atendidas, casos ganados,
montos recuperados ni porcentajes de éxito. Oscar lo aclaró expresamente: no pidió resultados. Lo
que se puede afirmar hoy es lo que ya dice el sitio: consultoría legal especializada en comercio
exterior, socios con cerca de veinte años de experiencia en materia fiscal, aduanera y de TI,
oficinas en Tijuana y San Diego, las áreas de práctica reales y el software propio BMS.

Si un dato no está en esas fuentes, no entra. Igual que en todo el resto de esta página.

## Diseño

- Las dos piezas heredan el sistema del sitio. Ninguna introduce un componente nuevo de marca.
- La banda no puede repetir la familia de layout de la sección de Servicios que ya existe arriba.
  Es una banda de identidad, corta y horizontal, no otra lista de bloques.
- No se toca nada más de la página: la v2 está aprobada tal cual.
- El recorte de texto de la v2 no se revierte. Lo que se agrega es poco y compacto por diseño.

## Criterios de aceptación

1. La banda queda inmediatamente antes de "Preguntas frecuentes", no al final de la página.
2. La ficha del sidebar queda debajo del botón de enviar, dentro de la misma columna.
3. Ninguna cifra de resultado en ninguna de las dos.
4. La banda no repite la familia de layout de Servicios.
5. El texto visible total de la página no crece más de 90 palabras respecto de la v2 (669).
6. Build limpio, 200 y noindex. Capturas nuevas a 1440 y 375.

## Resultado de la pasada v3

**Banda de identidad.** Va entre Servicios y Preguntas frecuentes. Dos columnas: a la izquierda el
párrafo de qué es BG, a la derecha las ocho áreas de práctica como índice de dos columnas con regla
fina, en flujo por columna para que las reglas queden alineadas aunque un área ocupe dos renglones.
No lleva `SectionHeading` ni número de sección: es una banda, no un capítulo, y así no obliga a
renumerar el acordeón. Familia de layout distinta de Servicios, que arriba es lista vertical en
claro con títulos display grandes.

**Ficha del sidebar.** Tres renglones bajo el botón de enviar, separados por regla, antes del
bloque de teléfonos. Solo en el formulario: el estado de éxito no la lleva porque ahí ya no hay
botón. Texto propio, no recorte literal de la banda.

**Se quitó el párrafo de cierre de Servicios** ("BG es una firma de consultoría legal especializada
en comercio exterior, con oficinas en Tijuana y San Diego. El despacho se tramita a través de
agentes aduanales."). La banda nueva va inmediatamente después y decía lo mismo con otras palabras.
La aclaración sobre agentes aduanales sigue en la pregunta frecuente "¿BG tramita en la VUCEM o
solo asesora?". Es la única línea de la v2 que se tocó.

**Texto visible** (misma medición que la v2: `document.body.innerText` a 1440px con la primera
pregunta del acordeón abierta): 669 → **701 palabras**, +32. El tope del criterio era +90.

**Sobre "trade compliance" en la ficha.** `critico-anti-slop` lo marcó como anglicismo dentro de
una frase en español. Se conserva: es el nombre del área tal cual lo usa el sitio
(`dictionaries.ts`, `team.ts`) y la tira de credenciales del hero de la v2 ya dice "Legal, trade
compliance e IT". Traducirlo solo aquí rompería la consistencia.

**Fuentes de las dos piezas.** `dictionaries.ts` (`about.intro` para el párrafo, `services.items`
para los nombres de las ocho áreas). Sin cifras de resultado. Fuera quedó el software BMS: cabía en
la fuente pero no en el presupuesto de palabras, y esta landing no vende software.
