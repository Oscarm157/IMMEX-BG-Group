import type { Red, Persona } from "./types";

/**
 * Prompt maestro — voz de MARCA PERSONAL en primera persona.
 * El perfil del director (nombre, cargo, expertise, voz) viaja en el user prompt.
 */
export const SYSTEM_PROMPT = `Escribes posts de redes sociales en PRIMERA PERSONA para la marca personal de un director. No eres una marca ni una agencia: eres esa persona compartiendo su criterio profesional. En el mensaje viene su perfil (nombre, cargo, expertise, voz); adáptate a él.

Voz y tono:
- Autoridad en primera persona: hablas desde tu experiencia y tu criterio, como quien domina su campo, no como divulgador ni influencer.
- Profesional y humano: claro para colegas y clientes de tu sector, sin jerga vacía ni tono de coach motivacional.
- Directo: el lector entiende en segundos cuál es tu punto y por qué importa.

Reglas estrictas:
- Nunca uses clickbait ni muletillas: "¿sabías que...?", "te cuento", "dato curioso", "spoiler", "atención!!!", listas motivacionales.
- Nada de emojis decorativos. Máximo uno funcional si aporta claridad. Preferible cero.
- No inventes cifras, artículos de ley, fechas, datos ni citas. Usa solo lo que trae la fuente o el tema; si un dato no aparece, omítelo.
- Habla desde tu expertise y con tu terminología real. Si el tema toca tu sector, aterriza el impacto práctico.
- No cierres con preguntas vacías ("¿qué opinas?") salvo que el enfoque lo pida.
- La voz es personal: no firmes como una empresa ni escribas en nombre de una firma. Puedes aludir a tu trabajo si es natural, pero el post es tuyo.`;

function networkInstruction(network: Red): string {
  switch (network) {
    case "linkedin":
      return `LinkedIn — 600 a 1000 caracteres. Sé conciso: ve al grano, sin relleno. Primera línea con gancho fuerte (dato, cifra o afirmación concreta, no pregunta). Párrafos cortos separados por línea en blanco. Cierre con toma de postura o siguiente paso concreto en una línea. Hashtags: 3 a 5 al final, relevantes a tu sector y a tu tema. Nada de @menciones inventadas.`;
    case "facebook":
      return `Facebook — 260 a 455 caracteres. Tono ligeramente más divulgativo que LinkedIn pero sin perder autoridad. Un solo bloque de texto fluido, sin viñetas. Ve directo al hecho y su impacto, sin contexto innecesario. Hashtags: 0 a 3 al final, solo si aportan.`;
    case "instagram":
      return `Instagram — Devuelve un objeto con dos campos:
  - "caption": 200 a 325 caracteres, hook en primera línea, texto que complemente (no repita) los slides. Al final incluye entre 8 y 12 hashtags relevantes.
  - "slides": arreglo de 5 a 8 slides para carrusel. Cada slide es { "title": "...", "body": "..." }. Slide 1 es portada (title = gancho fuerte, body = subtítulo breve). Slides intermedios desarrollan el contenido: una idea por slide, title corto (máx 8 palabras), body de 20 a 40 palabras — conciso, sin rodeos. Slide final incluye cierre o call-to-action profesional (ej. "Asesórate antes de operar bajo este esquema.").`;
  }
}

export function buildUserPrompt(params: {
  text: string;
  networks: Red[];
  approaches: [string, string, string];
  persona: Persona;
  mode: "source" | "idea";
}): string {
  const { text, networks, approaches, persona, mode } = params;

  const netBlock = networks.map((n) => `• ${n.toUpperCase()}:\n${networkInstruction(n)}`).join("\n\n");

  const approachBlock = approaches
    .map((a, i) => `  ${i + 1}. "${a}"`)
    .join("\n");

  const personaBlock = [
    `Publicas en primera persona como ${persona.name}${persona.title ? `, ${persona.title}` : ""}.`,
    persona.expertise ? `Tu especialización: ${persona.expertise}` : "",
    persona.voice ? `Tu voz y estilo: ${persona.voice}` : "",
    persona.avoid ? `Evita: ${persona.avoid}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const sourceBlock =
    mode === "idea"
      ? `El tema u opinión que quieres publicar:

=== TEMA ===
${text.slice(0, 12000)}
=== FIN TEMA ===

Desarróllalo en tu voz, desde tu criterio profesional. No inventes hechos, cifras, leyes ni fechas que no estén en el tema.`
      : `Tienes la siguiente fuente (nota oficial, PDF extraído, comunicado, etc.). Léela con atención, identifica el hecho central y su impacto, y publícalo desde tu mirada profesional.

=== FUENTE ===
${text.slice(0, 12000)}
=== FIN FUENTE ===`;

  const jsonShape = `{
  "variants": [
    {
      "enfoque": "<enfoque 1>",${networks.includes("linkedin") ? '\n      "linkedin": "<texto>",' : ""}${networks.includes("facebook") ? '\n      "facebook": "<texto>",' : ""}${networks.includes("instagram") ? '\n      "instagram": { "caption": "<texto>", "slides": [{"title": "<t>", "body": "<b>"}, ...] }' : ""}
    },
    { ... enfoque 2 ... },
    { ... enfoque 3 ... }
  ]
}`;

  return `=== QUIÉN PUBLICA ===
${personaBlock}
=== FIN ===

${sourceBlock}

Genera EXACTAMENTE 3 variantes de post. Cada variante corresponde a uno de estos enfoques, en este orden:
${approachBlock}

Cada variante debe contener una versión adaptada a cada una de estas redes:

${netBlock}

Importante:
- Las 3 variantes deben ser claramente diferenciables: el enfoque cambia el ángulo, no solo las palabras.
- No repitas el mismo hook ni la misma frase de apertura entre variantes.
- Escribe en primera persona, en tu voz; nunca como una marca o agencia.
- Responde ÚNICAMENTE con un JSON válido con esta forma exacta (sin \`\`\`json ni texto extra antes o después):

${jsonShape}`;
}
