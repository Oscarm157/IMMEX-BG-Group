// Contenido piloto del campus: 1 categoría (Comercio exterior) con 3 videos,
// cada uno con intro + video YouTube + desglose + quiz. Idempotente por slug.
// Video de YouTube = placeholder embebible (Big Buck Bunny) hasta que Oscar
// cargue los reales. Correr: node --env-file=.env.local scripts/seed-campus-pilot.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const DEMO_VIDEO = "aqz-KE-bpKQ"; // placeholder embebible

async function ensureCategory() {
  const slug = "comercio-exterior";
  const found = await sql`select id from campus_categories where slug = ${slug}`;
  if (found.length) return found[0].id;
  const rows = await sql`
    insert into campus_categories (slug, title, description, audience, status, "order")
    values (${slug}, ${"Comercio exterior"},
            ${"Fundamentos de operación aduanera y programas de fomento, explicados por video con una evaluación al cierre."},
            ${"ambos"}, ${"published"}, ${0})
    returning id`;
  return rows[0].id;
}

async function ensureTopic(categoryId, order, slug, title, intro, desglose, quizTitle, questions) {
  let t = await sql`select id from campus_topics where category_id = ${categoryId} and slug = ${slug}`;
  if (!t.length) {
    t = await sql`insert into campus_topics (category_id, slug, title, "order", status)
                  values (${categoryId}, ${slug}, ${title}, ${order}, ${"published"}) returning id`;
  }
  const topicId = t[0].id;

  // Bloques: reemplaza los existentes para ser idempotente.
  await sql`delete from campus_blocks where topic_id = ${topicId}`;
  await sql`insert into campus_blocks (topic_id, kind, "order", data)
            values (${topicId}, ${"text"}, ${0}, ${JSON.stringify({ markdown: intro })})`;
  await sql`insert into campus_blocks (topic_id, kind, "order", data)
            values (${topicId}, ${"video"}, ${1}, ${JSON.stringify({ provider: "youtube", videoId: DEMO_VIDEO, url: `https://www.youtube.com/watch?v=${DEMO_VIDEO}` })})`;
  await sql`insert into campus_blocks (topic_id, kind, "order", data)
            values (${topicId}, ${"text"}, ${2}, ${JSON.stringify({ markdown: desglose })})`;

  // Quiz: uno por topic. Reemplaza para idempotencia.
  const existingQuiz = await sql`select id from campus_quizzes where topic_id = ${topicId}`;
  for (const q of existingQuiz) {
    await sql`delete from campus_quiz_questions where quiz_id = ${q.id}`;
    await sql`delete from campus_quizzes where id = ${q.id}`;
  }
  const quiz = await sql`insert into campus_quizzes (topic_id, title, passing_score, source)
                         values (${topicId}, ${quizTitle}, ${70}, ${"manual"}) returning id`;
  const quizId = quiz[0].id;
  let qi = 0;
  for (const q of questions) {
    await sql`insert into campus_quiz_questions (quiz_id, prompt, options, correct_index, "order")
              values (${quizId}, ${q.prompt}, ${JSON.stringify(q.options)}, ${q.correct}, ${qi++})`;
  }
  return topicId;
}

async function main() {
  const categoryId = await ensureCategory();

  await ensureTopic(
    categoryId,
    1,
    "immex-que-es",
    "IMMEX: qué es y para qué sirve",
    "El programa IMMEX permite a una empresa importar temporalmente insumos, materias primas y maquinaria sin pagar el IVA ni el impuesto general de importación, siempre que el producto resultante se exporte. Es la base de la operación de maquila en la frontera.",
    "## Puntos clave\n\n- **Importación temporal:** los insumos entran sin cubrir IVA ni IGI, contra la obligación de retornar el producto al extranjero.\n- **Plazos:** la mercancía tiene un plazo máximo de permanencia según el tipo de bien; excederlo genera crédito fiscal.\n- **Anexo 24 y 30:** el control de inventarios es obligatorio y auditable.\n\n## Por qué importa\n\nUn mal control de descargos convierte una importación temporal en definitiva, con el impuesto y las multas que eso implica.",
    "Evaluación: IMMEX",
    [
      { prompt: "¿Qué beneficio principal otorga el programa IMMEX?", options: ["Importar temporalmente sin pagar IVA ni IGI", "Exportar sin factura", "Pagar menos ISR", "Contratar sin IMSS"], correct: 0 },
      { prompt: "¿Qué obligación acompaña a la importación temporal?", options: ["Vender en territorio nacional", "Retornar el producto al extranjero", "Donar el excedente", "Pagar el IVA al final del año"], correct: 1 },
      { prompt: "¿Qué anexos regulan el control de inventarios?", options: ["Anexo 1 y 2", "Anexo 24 y 30", "Anexo 11", "Ninguno"], correct: 1 },
      { prompt: "¿Qué pasa si se excede el plazo de permanencia?", options: ["No pasa nada", "Se genera un crédito fiscal", "Se renueva automático", "Baja el arancel"], correct: 1 },
    ],
  );

  await ensureTopic(
    categoryId,
    2,
    "reglas-de-origen",
    "Reglas de origen en el T-MEC",
    "Las reglas de origen determinan si un producto califica como originario de la región para gozar de arancel preferencial bajo el T-MEC. No basta con ensamblar en México: hay que cumplir el valor de contenido regional.",
    "## Cómo se determina el origen\n\n- **Cambio de clasificación arancelaria:** el insumo importado cambia de fracción al transformarse.\n- **Valor de contenido regional (VCR):** porcentaje mínimo de valor que debe originarse en la región.\n- **Certificación:** el exportador emite el certificado de origen bajo responsabilidad propia.\n\n## Riesgo común\n\nDeclarar origen sin sustento documental es la causa más frecuente de rechazo en una verificación de origen.",
    "Evaluación: Reglas de origen",
    [
      { prompt: "¿Para qué sirven las reglas de origen?", options: ["Fijar el tipo de cambio", "Determinar si un bien goza de arancel preferencial", "Calcular el IVA", "Definir el salario"], correct: 1 },
      { prompt: "¿Qué mide el VCR?", options: ["El peso del producto", "El valor originado en la región", "El número de piezas", "La distancia de envío"], correct: 1 },
      { prompt: "¿Quién emite el certificado de origen en el T-MEC?", options: ["La aduana", "El exportador", "El banco", "El transportista"], correct: 1 },
    ],
  );

  await ensureTopic(
    categoryId,
    3,
    "pedimento-aduanal",
    "El pedimento aduanal, campo por campo",
    "El pedimento es el documento fiscal que ampara toda operación de comercio exterior. Un error en un campo clave puede detener la mercancía o generar una multa. Aquí revisamos los campos que más se equivocan.",
    "## Campos críticos\n\n- **Clave de pedimento:** define el régimen (importación definitiva, temporal, retorno).\n- **Fracción arancelaria:** determina arancel, regulaciones y restricciones no arancelarias.\n- **Valor en aduana:** base gravable; un valor mal declarado es observación inmediata.\n\n## Buenas prácticas\n\nCotejar siempre la fracción contra la descripción real de la mercancía, no contra lo que \"siempre se ha usado\".",
    "Evaluación: Pedimento",
    [
      { prompt: "¿Qué ampara el pedimento?", options: ["Solo el pago del flete", "Toda la operación de comercio exterior", "El contrato laboral", "La póliza de seguro"], correct: 1 },
      { prompt: "¿Qué define la clave de pedimento?", options: ["El régimen aduanero", "El color del empaque", "El puerto de salida", "La moneda"], correct: 0 },
      { prompt: "¿Qué determina la fracción arancelaria?", options: ["El arancel y las regulaciones", "El horario de la aduana", "El nombre del agente", "La ruta terrestre"], correct: 0 },
    ],
  );

  console.log("Piloto sembrado: categoría 'Comercio exterior' con 3 videos + quizzes.");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
