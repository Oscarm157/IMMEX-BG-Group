# Molde de las landings de pauta (`/lp/*`)

Contrato compartido por las 12 landings de la familia. Los specs de `/lp/vucem` y `/lp/cove`
siguen vigentes para lo suyo; este archivo fija lo que aplica a todas y **no se repite en cada
spec**. Ninguna landing edita el molde: si necesita algo que no existe, lo anota como
`## Petición al molde` en su propio spec y resuelve dentro de su bloque propio.

## Arquitectura

Cada landing es `src/app/lp/<slug>/page.tsx` y contiene: `metadata`, sus arreglos con nombre,
el JSX de su bloque propio, y `return <LandingPauta config={CONFIG} />`. Nada más.

`src/components/lp/LandingPauta.tsx` compone el orden canónico:

1. Hero (sin numerar)
2. Causas + LeadPanel
3. bloque propio, si `posicion: "tras-causas"`
4. Consecuencias
5. bloque propio, si `posicion: "tras-consecuencias"`
6. Servicios
7. bloque propio, si `posicion: "tras-servicios"`
8. Preguntas frecuentes
9. Banda de identidad (sin numerar)
10. Barra fija móvil

**La numeración se deriva del orden.** No se escribe `index` a mano en ningún lado. Los
servicios, las cifras de la firma y las áreas de práctica son constantes compartidas: no se
redeclaran ni se modifican por landing.

## El config

`src/components/lp/tipos.ts`:

```ts
export type LandingPautaConfig = {
  campaign: string;                              // llega tal cual a `service` en /api/leads
  hero: { eyebrow: string; h1: string; lead: string; medida?: string };
  causas: {
    eyebrow: string; title: string; lead: string;
    etiquetas?: readonly [string, string];       // default ["Qué ocurre", "Qué se hace"]
    items: readonly Causa[];                     // 3 a 5
  };
  consecuencias: { eyebrow: string; title: string; lead: string;
                   items: readonly Paso[]; nota?: string };
  faq: { title?: string; items: readonly QA[] };
  revision: readonly string[];                   // alcance, dentro del LeadPanel
  bloque?: BloquePropio;                         // obligatorio en la práctica, ver abajo
  servicios?: readonly Servicio[];               // default: SERVICIOS. No sobreescribir.
};

type Causa = { titulo: string; fundamento: string; ocurre: string; hace: string };
type Paso  = { paso: string; desc: string };
type QA    = { q: string; a: string };

type BloquePropio = {
  eyebrow: string; title: string; lead?: string;
  posicion: "tras-causas" | "tras-consecuencias" | "tras-servicios";
  familia: string;              // nombre de la familia, para auditar variedad
  render: React.ReactNode;      // el layout lo escribe la landing
};
```

`campaign` va con el formato `"Landing <CLUSTER> (pauta)"`, como vucem. Es lo que permite
atribuir el lead a la campaña.

`bloque` es opcional en el tipo solo porque vucem nació sin él. **Para las 10 landings nuevas es
obligatorio**: sin ancla propia, 12 páginas sobre el mismo molde se leen como plantilla.

## Las familias del bloque propio

`src/components/lp/familias/`. Cada landing tiene una asignada; no se elige libremente.

| Familia | Props |
|---|---|
| `ParPolar` | `{ items: readonly {a: string; b: string; texto: string}[]; simbolo?: string }` |
| `TablaCriterios` | `{ columnas: readonly string[]; filas: readonly {criterio: string; celdas: readonly string[]}[] }` |
| `LineaSecuencia` | `{ hitos: readonly {marca: string; titulo: string; desc: string}[] }` |
| `PliegoRequisitos` | `{ filas: readonly {clave: string; valor: string}[] }` |
| `CitaFundamento` | `{ cita: string; texto: string }` |
| `EscaleraNiveles` | `{ niveles: readonly {nivel: string; titulo: string; desc: string}[] }` |
| `IndiceDenso` | `{ entradas: readonly {clave: string; nota?: string}[] }` |

### Asignación

| Landing | Familia | Posición | Ancla |
|---|---|---|---|
| `cove` (hecha) | ParPolar | tras-causas | COVE contra factura y contra pedimento |
| `immex` | EscaleraNiveles | tras-consecuencias | Obligaciones que sostienen el programa |
| `pedimento` | PliegoRequisitos | tras-causas | Qué declara cada bloque del pedimento |
| `agencia-aduanal` | CitaFundamento | tras-causas | La obligación es del importador, no del agente |
| `clasificacion-arancelaria` | LineaSecuencia | tras-servicios | Ruta de sustento de una fracción |
| `padron-de-importadores` | IndiceDenso | tras-causas | Padrones sectoriales y a qué obliga cada uno |
| `regimenes-aduaneros` | TablaCriterios | tras-causas | Los regímenes comparados por criterio |
| `valor-en-aduana` | LineaSecuencia | tras-causas | Prelación de los métodos de valoración |
| `prosec` | ParPolar | tras-consecuencias | PROSEC contra Regla 8ª |
| `anexo-24` | PliegoRequisitos | tras-servicios | Módulos y datos mínimos del sistema |
| `certificacion-iva-ieps` | EscaleraNiveles | tras-causas | Modalidades A, AA y AAA |

## Variación obligatoria

12 páginas con la misma forma se leen como plantilla. Además de la familia asignada, cada landing
mueve al menos dos de estas palancas:

- **Número de causas**: 3, 4 o 5. No siempre 4.
- **`causas.etiquetas`**: el default "Qué ocurre / Qué se hace" no encaja en todos los temas. Usar
  el par que corresponda ("Qué exige / Qué se revisa", "Supuesto / Consecuencia", "Qué falla /
  Qué corrige").
- **Eslabones de la cadena**: 3 o 4.
- **`consecuencias.nota`**: presente solo cuando hay algo real que decir. vucem la tiene, cove no.

Criterio duro, heredado del spec de cove: **si un párrafo de esta página funciona igual en otra
landing, está mal escrito.** Verificable: ningún literal de más de 60 caracteres puede aparecer en
dos `page.tsx` distintos fuera de `constantes.ts`. Aplica también a los textos de anuncio del spec.

**El bloque propio cubre un tema que las causas no tocan.** Salió en la revisión del lote A: la
trampa es construirlo reformulando en positivo las mismas causas que ya se listaron arriba ("esto
falla" y sesenta líneas después "esto sostiene"). No repite literales, así que pasa el script, pero
el lector recibe lo mismo dos veces y la página se infla sin decir nada nuevo. Las familias
`EscaleraNiveles` y `TablaCriterios` invitan especialmente a ese error, porque por forma piden una
lista. Referencias de lo que sí es un ancla: `cove` (COVE contra factura, que no es una causa),
`agencia-aduanal` (la cita del art. 59-III) e `immex` (de qué norma cuelga cada obligación).

## Fuente de verdad del contenido

Por orden. **Nada que no salga de aquí se afirma en la página.**

1. `src/content/guias.ts`, las guías asignadas al cluster.
2. `src/content/dictionaries.ts` y `src/content/services-detail.ts` para los servicios reales.
3. `docs/bgcg-source.md` y `docs/bgcg-site-content.txt` para datos de la firma.
4. `src/app/lp/vucem/page.tsx` y `cove/page.tsx` para fundamento legal ya verificado.

### Prohibiciones de dato

- **Todo `fundamento` legal debe existir ya en `src/content/guias.ts`.** Cero artículos nuevos, cero
  anexos nuevos. Si el fundamento que necesitas no está en el corpus, no lo cites.
- **Las únicas cifras de la firma son 20 / 8 / 2**, y los 20 años solo con su matiz exacto: "años en
  promedio entre los socios". Nunca "20 años de experiencia".
- **Prohibido "180+ empresas"**, aunque aparezca en `dictionaries.ts`: no está respaldado en las
  fuentes primarias.
- **Cero afirmación sobre el modelo de despacho de BG**: ni patente propia, ni red de agentes
  aliados, ni despacho directo. El dato está sin confirmar con la firma.
- Cero cifras de resultado, plazos, precios, tiempos de respuesta, número de clientes o casos.
- Sin testimonios, sin logos de clientes.

### Registro del copy

De usted. Formal, plano y descriptivo. Los títulos dicen qué es la cosa, no la adornan: nada de
juegos de palabras, metáforas ni frases paralelas de consultor. Sin em-dashes. Nunca "nosotros" en
primera persona: se escribe "se revisa", no "revisamos". Cero frases huecas ("solución integral",
"potenciar", "sin fricciones", "de clase mundial").

## Qué entrega cada landing

Exactamente **dos archivos**: `src/app/lp/<slug>/page.tsx` y `docs/specs/landing-pauta-<slug>.md`.

El spec sigue el esqueleto de `landing-pauta-cove.md`: Por qué esta keyword · Quién llega y qué
quiere · Alcance · Fuera de alcance · Fuente de verdad · **Diferencia obligatoria contra las otras
landings** · Contenido sección por sección · Criterios de aceptación · Anuncios · Keywords y
negativas · Riesgos · Por confirmar con BG · Cómo quedó.

**Anuncios**: 3 variantes, cada una con 3 títulos (≤30 caracteres) y 2 descripciones (≤90), con la
longitud real entre paréntesis, contada con `node`, no a ojo.

**Keywords**: solo los volúmenes del briefing. Las variantes sin dato reportado se cargan sin dato,
no se inventa la cifra. Concordancia de frase.

**Negativas**, la base para todas: curso, diplomado, licenciatura, maestría, carrera, universidad,
qué es, significado, ejemplos, formato, pdf, gratis, vacantes, sueldo, salario, bolsa de trabajo,
iniciar sesión, contraseña, mi cuenta. Más las de ambigüedad propias del cluster.

## Prohibido tocar

`src/components/lp/**`, `src/app/lp/layout.tsx`, `next.config.ts`, `src/content/**`, `src/lib/**`,
este archivo, y las páginas de las otras landings. El `noindex` ya está resuelto por
`next.config.ts` para todo `/lp/:path*`: no hay que configurarlo.

## Verificación

Contra el servidor en `:3141`:

```bash
curl -sI http://localhost:3141/lp/<slug> | grep -iE "^HTTP|x-robots-tag"
curl -s  http://localhost:3141/lp/<slug> | grep -c 'name="robots" content="noindex'
npx tsc --noEmit --incremental false
npx eslint src/app/lp/<slug>/page.tsx
```

No correr `npm run build`: compite por `.next` con los demás. Lo corre el orquestador por lote.

Capturas con Playwright a 1440x900 y 375x812. Con `fullPage` hay que pasar
`reducedMotion: "reduce"` al contexto, o las secciones que nunca se scrollearon salen en
`opacity: 0` porque el `IntersectionObserver` de `Reveal` no dispara.

**El formulario se prueba sin escribir en Neon**, interceptando la ruta:

```js
await page.route("**/api/leads", r => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' })); // sent
await page.route("**/api/leads", r => r.abort());                                                                        // error
```

Comprobar de paso que el payload interceptado trae el `campaign` correcto en `service`.

### Criterios de aceptación

- [ ] 200 y `noindex` por metadata y por cabecera.
- [ ] Texto visible entre 600 y 780 palabras.
- [ ] Todos los `fundamento` existen ya en `src/content/guias.ts`.
- [ ] Bloque propio presente, con la familia y posición asignadas.
- [ ] Al menos dos palancas de variación movidas respecto al default.
- [ ] Solo las cifras 20 / 8 / 2, con su matiz.
- [ ] Cero afirmación sobre el modelo de despacho.
- [ ] Ningún literal de más de 60 caracteres compartido con otra landing.
- [ ] Sin desbordes a 375px.
- [ ] Los tres estados del formulario, probados con interceptación.
- [ ] `campaign` correcto en el payload.
- [ ] `tsc` y `eslint` en cero.
- [ ] Anuncios dentro de 30/90, contados con `node`.
- [ ] Cero leads de prueba en Neon.
