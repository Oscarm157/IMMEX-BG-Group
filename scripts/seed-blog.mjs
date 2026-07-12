// Seed de 4 notas de blog para BG (tabla articles).
// Factual, bilingüe ES/EN, fundamento legal verificado con fuentes reales.
// Idempotente: no duplica si ya existe el slug.
// Correr con: node --env-file=.env.local scripts/seed-blog.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const ARTICLES = [
  {
    slug: "manifestacion-de-valor-electronica-obligatoria",
    category: "Aduanas",
    cover: "/img/blog/manifestacion-de-valor-electronica-obligatoria.png",
    sourceName: "Comunicado conjunto SAT-ANAM 16-2026",
    sourceUrl: "https://www.anam.gob.mx/comunicado-prensa-conjunto-16-2026/",
    sourceDate: "02/06/2026",
    titleEs: "Manifestación de Valor electrónica: transmisión obligatoria por VUCEM",
    titleEn: "Electronic Value Declaration: mandatory transmission through VUCEM",
    excerptEs:
      "La Manifestación de Valor deja el papel: se transmite por VUCEM, previa al despacho, con exigibilidad a partir del 31 de julio de 2026 tras varias prórrogas. Qué cambia y cómo llegar listo.",
    excerptEn:
      "The Value Declaration leaves paper behind: it is transmitted through VUCEM, prior to clearance, enforceable from July 31, 2026 after several extensions. What changes and how to be ready.",
    bodyEs: `## Qué cambió
La Manifestación de Valor pasó de un documento en papel o PDF que el importador conservaba y entregaba a su agente aduanal, a una transmisión electrónica obligatoria por la Ventanilla Única de Comercio Exterior (VUCEM), previa al despacho de las mercancías y con folio.

## Desde cuándo es exigible
El formato está disponible en VUCEM desde el 1 de agosto de 2025. La exigibilidad se ha recorrido en varias prórrogas: de diciembre de 2025 a abril, luego a junio y, conforme al comunicado conjunto SAT-ANAM 16-2026, a partir del 31 de julio de 2026. Conviene confirmar la última prórroga antes de cada operación, porque la fecha ha cambiado más de una vez.

## Fundamento legal
La obligación se apoya en el artículo 59, fracción III de la Ley Aduanera, la regla 1.5.1 de las Reglas Generales de Comercio Exterior 2025 y el formato con referencia E2 del Anexo 1. El soporte documental del valor (factura, documento de transporte, prueba de origen, comprobante de pago e incrementables del artículo 65 de la Ley Aduanera) se rige por el artículo 81 del Reglamento de la Ley Aduanera y se conserva cinco años.

## Qué implica para el importador
La información del valor en aduana debe estar completa y correcta antes del despacho, no después. Un expediente incompleto o una manifestación mal transmitida se vuelve una contingencia en la primera revisión de la autoridad.`,
    bodyEn: `## What changed
The Value Declaration moved from a paper or PDF document kept by the importer and handed to the customs broker, to a mandatory electronic transmission through Mexico's Single Window (VUCEM), prior to clearance and with a folio number.

## When it becomes enforceable
The form has been available in VUCEM since August 1, 2025. Enforcement has been pushed back through several extensions: from December 2025 to April, then to June and, under the joint SAT-ANAM communiqué 16-2026, from July 31, 2026. Confirm the latest extension before each operation, because the date has changed more than once.

## Legal basis
The obligation rests on Article 59, section III of the Customs Law, rule 1.5.1 of the 2025 General Rules of Foreign Trade and the form referenced as E2 in Annex 1. The supporting file for the value (invoice, transport document, proof of origin, proof of payment and the additions under Article 65 of the Customs Law) is governed by Article 81 of the Customs Law Regulations and kept for five years.

## What it means for the importer
The customs value information must be complete and correct before clearance, not after. An incomplete file or a poorly transmitted declaration becomes a contingency at the authority's first review.`,
    recEs: `- Revisa que tu expediente de valor cumpla el artículo 81 del RLA antes de transmitir, no durante una auditoría.
- Ordena el flujo con tu agente aduanal para transmitir la manifestación previa al despacho, sin frenar la operación.
- Verifica la última prórroga vigente antes de cada pedimento.`,
    recEn: `- Make sure your value file meets Article 81 of the Regulations before you transmit, not during an audit.
- Align the flow with your customs broker to transmit the declaration prior to clearance, without stalling the operation.
- Verify the latest extension in force before each entry.`,
  },
  {
    slug: "decreto-immex-restriccion-calzado",
    category: "IMMEX",
    cover: "/img/blog/decreto-immex-restriccion-calzado.png",
    sourceName: "Diario Oficial de la Federación",
    sourceUrl: "https://www.dof.gob.mx",
    sourceDate: "28/08/2025",
    titleEs: "El Decreto IMMEX ya no permite importar calzado terminado en temporal",
    titleEn: "The IMMEX Decree no longer allows temporary import of finished footwear",
    excerptEs:
      "El DOF del 28 de agosto de 2025 añadió las partidas 64.01 a 64.05 al Anexo I del Decreto IMMEX: el calzado terminado ya no puede importarse de forma temporal al amparo del programa. Contexto y alcance.",
    excerptEn:
      "The Official Gazette of August 28, 2025 added headings 64.01 to 64.05 to Annex I of the IMMEX Decree: finished footwear can no longer be imported temporarily under the program. Context and scope.",
    bodyEs: `## Qué establece el decreto
El 28 de agosto de 2025 se publicó en el Diario Oficial de la Federación una modificación al Decreto IMMEX que adiciona al Anexo I las partidas 64.01 a 64.05 de la TIGIE (calzado terminado) como mercancías que no pueden importarse temporalmente al amparo del programa. Entró en vigor al día siguiente.

## Por qué
La Secretaría de Economía justificó la medida por un crecimiento anómalo de las importaciones temporales de calzado que, en lugar de retornar o exportarse, se comercializaban en el país. Es la misma línea de la reforma de textil y confección de diciembre de 2024.

## El contexto arancelario
La restricción se suma a un entorno de mayor presión sobre insumos importados: el decreto de aranceles a la importación desde países sin tratado (Nación Más Favorecida), publicado en el DOF el 29 de diciembre de 2025, encareció numerosas fracciones a partir de enero de 2026. Para una empresa IMMEX, el origen de sus insumos vuelve a ser una decisión de costo.

## Qué revisar
Si tu programa incluía calzado terminado en temporal, esa operación ya no procede bajo IMMEX y debe reencauzarse. Conviene cotejar el Anexo I vigente contra tu padrón de productos antes del siguiente pedimento.`,
    bodyEn: `## What the decree sets out
On August 28, 2025 the Official Gazette published an amendment to the IMMEX Decree that adds headings 64.01 to 64.05 of the tariff schedule (finished footwear) to Annex I as goods that cannot be imported temporarily under the program. It took effect the following day.

## Why
The Ministry of Economy justified the measure by an abnormal rise in temporary footwear imports that, instead of being returned or exported, were sold within the country. It follows the same line as the December 2024 textile and apparel reform.

## The tariff context
The restriction adds to greater pressure on imported inputs: the decree of tariffs on imports from countries without a treaty (Most Favored Nation), published in the Gazette on December 29, 2025, raised many tariff lines from January 2026. For an IMMEX company, the origin of its inputs is again a cost decision.

## What to review
If your program included finished footwear on a temporary basis, that operation no longer proceeds under IMMEX and must be redirected. Check the current Annex I against your product list before the next entry.`,
    recEs: `- Coteja tu padrón de productos contra el Anexo I vigente del Decreto IMMEX.
- Si operabas calzado terminado en temporal, define la vía correcta (definitiva u otra) antes de cruzar.
- Revisa el impacto del arancel a Nación Más Favorecida 2026 en el origen de tus insumos.`,
    recEn: `- Check your product list against the current Annex I of the IMMEX Decree.
- If you moved finished footwear temporarily, define the correct route (definitive or otherwise) before crossing.
- Review the impact of the 2026 Most Favored Nation tariff on the origin of your inputs.`,
  },
  {
    slug: "certificacion-iva-ieps-renovacion",
    category: "Fiscal",
    cover: "/img/blog/certificacion-iva-ieps-renovacion.png",
    sourceName: null,
    sourceUrl: null,
    sourceDate: null,
    titleEs: "Certificación de IVA e IEPS: renovarla a tiempo para no perder el crédito",
    titleEn: "VAT and IEPS certification: renew on time to keep the credit",
    excerptEs:
      "La certificación IVA-IEPS evita pagar esos impuestos en la importación temporal, pero se renueva cada año y en los 30 días previos al vencimiento. Qué la sostiene y qué pasa si se cae.",
    excerptEn:
      "The VAT-IEPS certification avoids paying those taxes on temporary imports, but it renews every year and within the 30 days before expiry. What sustains it and what happens if it lapses.",
    bodyEs: `## Para qué sirve
La certificación permite aplicar un crédito fiscal equivalente al 100% del IVA y del IEPS que causaría la importación temporal, en lugar de pagarlos o garantizarlos. Es un beneficio de flujo clave para maquiladoras y empresas IMMEX.

## En qué se sustenta
El fundamento está en el artículo 28-A de la Ley del IVA y el artículo 15-A de la Ley del IEPS, desarrollados en el Título 7 de las Reglas Generales de Comercio Exterior (regla 7.1.2 de requisitos, 7.2.1 de obligaciones y 7.2.3 de renovación, ficha de trámite 153/LA). El Anexo 31 es el sistema de control de cuentas de créditos y garantías, no la base de la certificación: ahí se controla el crédito fiscal.

## La renovación no espera
Las renovaciones de la modalidad IVA-IEPS tienen vigencia de un año, en cualquiera de los rubros A, AA o AAA. La solicitud se presenta de forma electrónica dentro de los 30 días previos al vencimiento, y al momento de renovar no debe haber saldos vencidos del crédito fiscal en el Anexo 31.

## Qué pasa si se cae
Si no se renueva o se cancela el registro, la empresa pierde el crédito del 100% y tiene que pagar el IVA y el IEPS en sus importaciones temporales o garantizarlos con fianza o carta de crédito. La autoridad puede iniciar el procedimiento de cancelación cuando se dejan de cumplir los requisitos.`,
    bodyEn: `## What it is for
The certification allows a tax credit equal to 100% of the VAT and IEPS that a temporary import would trigger, instead of paying or guaranteeing them. It is a key cash-flow benefit for maquiladoras and IMMEX companies.

## What it rests on
The basis is Article 28-A of the VAT Law and Article 15-A of the IEPS Law, developed in Title 7 of the General Rules of Foreign Trade (rule 7.1.2 on requirements, 7.2.1 on obligations and 7.2.3 on renewal, procedure sheet 153/LA). Annex 31 is the control system for credit and guarantee accounts, not the basis of the certification: it is where the tax credit is tracked.

## Renewal does not wait
Renewals of the VAT-IEPS modality are valid for one year, in any of the A, AA or AAA tiers. The request is filed electronically within the 30 days before expiry, and at the time of renewal there must be no overdue balances of the tax credit in Annex 31.

## What happens if it lapses
If it is not renewed or the registration is cancelled, the company loses the 100% credit and must pay VAT and IEPS on its temporary imports or guarantee them with a bond or letter of credit. The authority can start the cancellation procedure when requirements stop being met.`,
    recEs: `- Marca en el calendario la ventana de 30 días previos al vencimiento; fuera de ella la renovación se complica.
- Cierra los saldos del crédito fiscal en el Anexo 31 antes de solicitar la renovación.
- Revisa el cumplimiento de los requisitos del Título 7 con anticipación, no al vencimiento.`,
    recEn: `- Mark the 30-day window before expiry on the calendar; outside it, renewal gets harder.
- Clear the tax credit balances in Annex 31 before filing the renewal.
- Review compliance with the Title 7 requirements ahead of time, not at expiry.`,
  },
  {
    slug: "reglas-de-origen-tmec-cf28",
    category: "T-MEC",
    cover: "/img/blog/reglas-de-origen-tmec-cf28.png",
    sourceName: "U.S. Customs and Border Protection",
    sourceUrl: "https://www.cbp.gov/document/forms/cbp-form-28-request-information",
    sourceDate: null,
    titleEs: "Reglas de origen del T-MEC: qué es el CF28 de la aduana de Estados Unidos",
    titleEn: "USMCA rules of origin: what the U.S. Customs CF28 is",
    excerptEs:
      "Cuando exportas a Estados Unidos con trato preferencial, la aduana puede pedirte soporte con un CF28. Qué es, qué plazo tienes y cómo se relaciona con la certificación de origen del T-MEC.",
    excerptEn:
      "When you export to the United States with preferential treatment, Customs may request support with a CF28. What it is, how long you have and how it relates to the USMCA certification of origin.",
    bodyEs: `## Qué es el CF28
El CBP Form 28, "Request for Information", es una solicitud formal de información que emite la aduana de Estados Unidos cuando la factura u otra documentación no basta para verificar el valor, la clasificación o el cumplimiento de un trato preferencial. El importador tiene por lo general 30 días para responder de forma completa.

## A dónde puede llevar
Una respuesta insuficiente o tardía puede derivar en un CF29, "Notice of Action", y en el cobro de aranceles o derechos adicionales. Por eso el CF28 no es un trámite menor: es el primer momento en que se sostiene, o se pierde, el trato preferencial.

## Su relación con el origen T-MEC
Vía CF28, la aduana suele pedir la prueba de elegibilidad para el trato preferencial, es decir, la certificación de origen del T-MEC. La verificación formal de origen se rige aparte (Artículo 5.9 del T-MEC y 19 CFR 182.72), pero en la práctica el CF28 suele anteceder a una verificación.

## Qué debe tener la certificación
La certificación de origen del T-MEC no requiere un formato específico, pero debe incluir los nueve elementos mínimos de datos del Artículo 5.2 y el Anexo 5-A (certificador, exportador, productor e importador; descripción y clasificación; criterio de origen; periodo; firma y fecha). A diferencia del TLCAN, bajo el T-MEC el importador también puede certificar el origen (19 CFR 182.12).`,
    bodyEn: `## What the CF28 is
The CBP Form 28, "Request for Information", is a formal request for information issued by U.S. Customs when the invoice or other documentation is not enough to verify value, classification or compliance with preferential treatment. The importer usually has 30 days to respond in full.

## Where it can lead
An insufficient or late response can lead to a CF29, "Notice of Action", and to the collection of additional duties. That is why the CF28 is not a minor formality: it is the first point at which preferential treatment is sustained, or lost.

## Its relation to USMCA origin
Through a CF28, Customs often asks for proof of eligibility for preferential treatment, that is, the USMCA certification of origin. The formal origin verification is governed separately (Article 5.9 of the USMCA and 19 CFR 182.72), but in practice the CF28 tends to precede a verification.

## What the certification must contain
The USMCA certification of origin does not require a specific format, but it must include the nine minimum data elements of Article 5.2 and Annex 5-A (certifier, exporter, producer and importer; description and classification; origin criterion; period; signature and date). Unlike NAFTA, under the USMCA the importer can also certify origin (19 CFR 182.12).`,
    recEs: `- Ten la certificación de origen y su soporte listos antes de exportar, no cuando llegue el CF28.
- Responde el CF28 completo y dentro del plazo; una respuesta parcial abre la puerta al CF29.
- Verifica que tu certificación cubra los nueve datos mínimos del Anexo 5-A.`,
    recEn: `- Keep the certification of origin and its support ready before you export, not when the CF28 arrives.
- Answer the CF28 in full and on time; a partial response opens the door to a CF29.
- Verify that your certification covers the nine minimum data elements of Annex 5-A.`,
  },
];

let inserted = 0;
let skipped = 0;
for (let i = 0; i < ARTICLES.length; i++) {
  const a = ARTICLES[i];
  const existing = await sql`select id from articles where slug = ${a.slug}`;
  if (existing.length > 0) {
    skipped++;
    continue;
  }
  await sql`
    insert into articles
      (slug, status, title_es, title_en, excerpt_es, excerpt_en, body_es, body_en,
       recommendations_es, recommendations_en, source_name, source_url, source_date,
       category, cover_url, featured, published_at, created_at, updated_at)
    values
      (${a.slug}, 'published', ${a.titleEs}, ${a.titleEn}, ${a.excerptEs}, ${a.excerptEn},
       ${a.bodyEs}, ${a.bodyEn}, ${a.recEs}, ${a.recEn}, ${a.sourceName}, ${a.sourceUrl},
       ${a.sourceDate}, ${a.category}, ${a.cover}, false,
       now() - make_interval(mins => ${i}), now(), now())`;
  inserted++;
}

console.log(`seed-blog listo: ${inserted} insertadas, ${skipped} ya existían.`);
