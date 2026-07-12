// Seed/upsert de 4 notas de blog para BG (tabla articles).
// Factual, bilingüe ES/EN, formal y explicativo, fundamento legal verificado.
// Upsert por slug: si ya existe, actualiza el contenido (conserva published_at).
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
    bodyEs: `## Qué es la Manifestación de Valor
La Manifestación de Valor es el documento con el que el importador declara y respalda el valor en aduana de la mercancía que introduce al país. Sirve para que la autoridad pueda verificar que la base sobre la que se pagan las contribuciones es correcta. Durante años se elaboró en papel o en formato PDF, el importador la conservaba y la ponía a disposición de su agente aduanal.

## Qué cambió
El esquema pasó de ese documento estático a una transmisión electrónica obligatoria a través de la Ventanilla Única de Comercio Exterior (VUCEM). La manifestación debe enviarse por ese medio, de forma previa al despacho de las mercancías, y el sistema genera un folio que la vincula a la operación. En términos prácticos, deja de ser un archivo que se guarda y se convierte en un trámite que se presenta ante la autoridad antes de cada importación.

## Desde cuándo es exigible
El formato está disponible en VUCEM desde el 1 de agosto de 2025. La fecha de exigibilidad, en cambio, se ha recorrido en varias ocasiones: primero se fijó para diciembre de 2025, luego se movió a abril, después a junio y, conforme al comunicado conjunto SAT-ANAM 16-2026, quedó a partir del 31 de julio de 2026. Dado que ha cambiado más de una vez, conviene confirmar la prórroga vigente antes de cada operación en lugar de asumir una fecha fija.

## Fundamento legal
La obligación se apoya en el artículo 59, fracción III de la Ley Aduanera, que impone al importador entregar la manifestación de valor y proporcionar los elementos que permiten determinar el valor en aduana. El detalle operativo está en la regla 1.5.1 de las Reglas Generales de Comercio Exterior 2025 y en el formato con referencia E2 del Anexo 1. El soporte documental, es decir la factura comercial, el documento de transporte, la prueba de origen, el comprobante de pago y los conceptos incrementables del artículo 65 de la Ley Aduanera, se rige por el artículo 81 del Reglamento de la Ley Aduanera y debe conservarse durante cinco años.

## Qué implica para el importador
El cambio adelanta el momento en el que la información del valor tiene que estar completa y ordenada. Antes el expediente podía integrarse con cierta holgura; ahora la manifestación se transmite antes del despacho, de modo que cualquier inconsistencia entre lo declarado y el soporte documental queda expuesta desde el inicio de la operación y no cuando la autoridad ejerce sus facultades de revisión. Preparar el expediente con anticipación, y no sobre la marcha, es la forma de evitar que un dato faltante detenga un embarque o derive en una diferencia difícil de justificar más adelante.`,
    bodyEn: `## What the Value Declaration is
The Value Declaration is the document through which the importer declares and supports the customs value of the goods it brings into the country. It allows the authority to verify that the base on which duties and taxes are paid is correct. For years it was prepared on paper or as a PDF, kept by the importer and made available to the customs broker.

## What changed
The scheme moved from that static document to a mandatory electronic transmission through Mexico's Single Window for Foreign Trade (VUCEM). The declaration must be sent through that channel, prior to the clearance of the goods, and the system generates a folio number linking it to the operation. In practice, it stops being a file that is stored and becomes a filing submitted to the authority before each import.

## When it becomes enforceable
The form has been available in VUCEM since August 1, 2025. The enforcement date, however, has been postponed several times: it was first set for December 2025, then moved to April, then to June and, under the joint SAT-ANAM communiqué 16-2026, set for July 31, 2026. Because it has changed more than once, it is advisable to confirm the extension in force before each operation rather than assume a fixed date.

## Legal basis
The obligation rests on Article 59, section III of the Customs Law, which requires the importer to submit the value declaration and provide the elements needed to determine the customs value. The operational detail is in rule 1.5.1 of the 2025 General Rules of Foreign Trade and in the form referenced as E2 in Annex 1. The supporting documentation, namely the commercial invoice, the transport document, the proof of origin, the proof of payment and the additions under Article 65 of the Customs Law, is governed by Article 81 of the Customs Law Regulations and must be kept for five years.

## What it means for the importer
The change brings forward the point at which the value information must be complete and in order. Previously the file could be assembled with some slack; now the declaration is transmitted before clearance, so any inconsistency between what is declared and the supporting documentation is exposed at the start of the operation rather than when the authority exercises its review powers. Preparing the file in advance, rather than on the fly, is how to keep a missing item from holding up a shipment or turning into a difference that is hard to justify later on.`,
    recEs: `- Integra y revisa el expediente de valor conforme al artículo 81 del Reglamento antes de transmitir la manifestación.
- Acuerda con tu agente aduanal el momento de la transmisión para que sea previa al despacho y no frene la operación.
- Confirma la prórroga vigente antes de cada pedimento, dado que la fecha de exigibilidad ha cambiado varias veces.`,
    recEn: `- Assemble and review the value file under Article 81 of the Regulations before you transmit the declaration.
- Agree with your customs broker on the timing so the transmission is prior to clearance and does not stall the operation.
- Confirm the extension in force before each entry, since the enforcement date has changed several times.`,
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
El 28 de agosto de 2025 se publicó en el Diario Oficial de la Federación una modificación al Decreto para el Fomento de la Industria Manufacturera, Maquiladora y de Servicios de Exportación. La reforma adiciona al Anexo I del decreto las partidas 64.01 a 64.05 de la Tarifa de la Ley de los Impuestos Generales de Importación y de Exportación, que corresponden al calzado terminado. Con ello, esas mercancías dejan de poder importarse de forma temporal al amparo de un programa IMMEX. El decreto entró en vigor al día siguiente de su publicación.

## Por qué se adoptó la medida
La Secretaría de Economía sustentó la modificación en un crecimiento atípico de las importaciones temporales de calzado que, en lugar de retornarse o incorporarse a un producto de exportación, terminaban comercializándose en el mercado nacional. El programa IMMEX está pensado para insumos que se transforman y se exportan, no para introducir producto terminado con un beneficio arancelario que después compite con la industria local. La reforma sigue la misma lógica de la medida aplicada al sector textil y de la confección en diciembre de 2024.

## El contexto arancelario
La restricción no llega aislada. A finales de 2025 se sumó un decreto de aranceles a la importación de mercancías provenientes de países con los que México no tiene tratado comercial, bajo el trato de Nación Más Favorecida, publicado en el Diario Oficial el 29 de diciembre de 2025 y vigente desde enero de 2026, que encareció numerosas fracciones. Para una empresa IMMEX, esto significa que tanto la posibilidad de importar ciertos productos como el costo de sus insumos según el origen se han vuelto decisiones que conviene revisar con cuidado.

## Qué conviene revisar
Si un programa incluía calzado terminado dentro de sus operaciones temporales, esa vía ya no está disponible y la operación debe reencauzarse, por ejemplo hacia una importación definitiva con el pago de las contribuciones correspondientes. Más allá del calzado, el episodio es un recordatorio de que el Anexo I del Decreto IMMEX se actualiza y de que conviene cotejar periódicamente el padrón de productos de la empresa contra la versión vigente antes de programar nuevas operaciones.`,
    bodyEn: `## What the decree sets out
On August 28, 2025 the Official Gazette published an amendment to the Decree for the Promotion of the Manufacturing, Maquiladora and Export Services Industry. The reform adds headings 64.01 to 64.05 of the tariff schedule, which correspond to finished footwear, to Annex I of the decree. As a result, those goods can no longer be imported temporarily under an IMMEX program. The decree took effect the day after its publication.

## Why it was adopted
The Ministry of Economy based the amendment on an atypical rise in temporary footwear imports that, instead of being returned or incorporated into an export product, ended up being sold on the domestic market. The IMMEX program is designed for inputs that are transformed and exported, not for bringing in finished products with a tariff benefit that then competes with local industry. The reform follows the same logic as the measure applied to the textile and apparel sector in December 2024.

## The tariff context
The restriction does not arrive in isolation. In late 2025 a decree of tariffs on imports from countries with which Mexico has no trade agreement was added, under Most Favored Nation treatment, published in the Official Gazette on December 29, 2025 and in force since January 2026, which raised many tariff lines. For an IMMEX company, this means that both the ability to import certain products and the cost of its inputs depending on their origin have become decisions worth reviewing carefully.

## What to review
If a program included finished footwear among its temporary operations, that route is no longer available and the operation must be redirected, for example toward a definitive import with payment of the corresponding duties. Beyond footwear, the episode is a reminder that Annex I of the IMMEX Decree is updated, and that it is worth periodically checking the company's product list against the current version before scheduling new operations.`,
    recEs: `- Coteja el padrón de productos de tu programa contra la versión vigente del Anexo I del Decreto IMMEX.
- Si operabas calzado terminado en temporal, define con tu asesor la vía correcta antes del siguiente cruce.
- Revisa cómo afecta el arancel de Nación Más Favorecida de 2026 al costo de tus insumos según su origen.`,
    recEn: `- Check your program's product list against the current version of Annex I of the IMMEX Decree.
- If you moved finished footwear temporarily, define the correct route with your advisor before the next crossing.
- Review how the 2026 Most Favored Nation tariff affects the cost of your inputs depending on their origin.`,
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
    bodyEs: `## Para qué sirve la certificación
La certificación en materia de IVA e IEPS permite a las empresas con operaciones de importación temporal aplicar un crédito fiscal equivalente al 100% del impuesto que causaría esa importación, en lugar de pagarlo o de garantizarlo. Para una maquiladora o una empresa IMMEX representa un beneficio de flujo de efectivo considerable, porque evita inmovilizar recursos en impuestos que, de otro modo, se enterarían en cada operación y se recuperarían después.

## En qué se sustenta
El fundamento de esta figura está en el artículo 28-A de la Ley del Impuesto al Valor Agregado y en el artículo 15-A de la Ley del Impuesto Especial sobre Producción y Servicios. Su desarrollo operativo se encuentra en el Título 7 de las Reglas Generales de Comercio Exterior, que regula el esquema de certificación de empresas: la regla 7.1.2 fija los requisitos, la 7.2.1 las obligaciones y la 7.2.3 la renovación, con la ficha de trámite 153/LA. Conviene precisar que el Anexo 31 no es el fundamento de la certificación, como a veces se asume, sino el sistema de control de cuentas de créditos y garantías donde se administra el crédito fiscal asociado.

## La renovación tiene plazos estrictos
Las renovaciones de la modalidad de IVA e IEPS tienen una vigencia de un año, en cualquiera de sus rubros A, AA o AAA. La solicitud debe presentarse de forma electrónica dentro de los treinta días previos al vencimiento del registro, y al momento de renovar la empresa no debe tener saldos vencidos del crédito fiscal en el Anexo 31. Son plazos que no admiten holgura: presentar la solicitud fuera de esa ventana, o llegar con saldos pendientes, complica o impide la renovación.

## Qué ocurre si se pierde
Si la certificación no se renueva a tiempo o el registro se cancela, la empresa deja de contar con el crédito del 100% y queda obligada a pagar el IVA y el IEPS en sus importaciones temporales, o bien a garantizarlos mediante fianza o carta de crédito. El efecto sobre el flujo de efectivo puede ser importante. Además, la autoridad puede iniciar de oficio el procedimiento de cancelación cuando detecta que dejaron de cumplirse los requisitos, de modo que el seguimiento continuo del cumplimiento es tan relevante como la renovación misma.`,
    bodyEn: `## What the certification is for
The VAT and IEPS certification allows companies with temporary import operations to apply a tax credit equal to 100% of the tax that such an import would trigger, instead of paying or guaranteeing it. For a maquiladora or an IMMEX company it is a considerable cash-flow benefit, because it avoids tying up resources in taxes that would otherwise be paid on each operation and recovered later.

## What it rests on
The basis of this mechanism is Article 28-A of the Value Added Tax Law and Article 15-A of the Special Tax on Production and Services Law. Its operational development is in Title 7 of the General Rules of Foreign Trade, which governs the company certification scheme: rule 7.1.2 sets the requirements, 7.2.1 the obligations and 7.2.3 the renewal, with procedure sheet 153/LA. It is worth clarifying that Annex 31 is not the basis of the certification, as is sometimes assumed, but the control system for credit and guarantee accounts where the associated tax credit is managed.

## Renewal has strict deadlines
Renewals of the VAT and IEPS modality are valid for one year, in any of their A, AA or AAA tiers. The request must be filed electronically within the thirty days before the registration expires, and at the time of renewal the company must have no overdue balances of the tax credit in Annex 31. These are deadlines that leave no slack: filing outside that window, or arriving with pending balances, complicates or prevents the renewal.

## What happens if it is lost
If the certification is not renewed on time or the registration is cancelled, the company loses the 100% credit and becomes obliged to pay VAT and IEPS on its temporary imports, or to guarantee them through a bond or letter of credit. The effect on cash flow can be significant. In addition, the authority may start the cancellation procedure on its own initiative when it finds that the requirements are no longer met, so monitoring compliance continuously is as relevant as the renewal itself.`,
    recEs: `- Anota con anticipación la ventana de treinta días previos al vencimiento; fuera de ella la renovación se complica.
- Verifica que no existan saldos vencidos del crédito fiscal en el Anexo 31 antes de solicitar la renovación.
- Da seguimiento continuo a los requisitos del Título 7, no solo al acercarse el vencimiento.`,
    recEn: `- Note the thirty-day window before expiry well in advance; outside it, renewal gets complicated.
- Verify that there are no overdue tax-credit balances in Annex 31 before filing the renewal.
- Keep continuous track of the Title 7 requirements, not only as expiry approaches.`,
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
El CBP Form 28, denominado "Request for Information", es una solicitud formal de información que emite la aduana de Estados Unidos, la Customs and Border Protection, cuando la factura u otra documentación presentada no le basta para verificar el valor, la clasificación arancelaria o el cumplimiento de las condiciones de un trato preferencial. Se dirige al importador, quien por regla general cuenta con treinta días para responder de manera completa. No es una sanción en sí misma, sino un requerimiento de aclaración.

## A dónde puede conducir
Cuando la respuesta es insuficiente, llega fuera de plazo o no se atiende, la aduana puede emitir un CF29, "Notice of Action", con el que formaliza un cambio en la clasificación, el valor o el trato aplicado, y que puede traducirse en el cobro de aranceles o derechos adicionales. Por eso conviene atender el CF28 con seriedad: es el momento en que el importador demuestra, con documentación, que la operación cumple lo que declaró.

## Su relación con el origen del T-MEC
A través del CF28, la aduana suele solicitar la prueba de elegibilidad para el trato preferencial, es decir, la certificación de origen del T-MEC y su soporte. La verificación formal de origen es un procedimiento distinto, regulado en el Artículo 5.9 del tratado y en el 19 CFR 182.72 y siguientes, pero en la práctica el CF28 suele ser el primer contacto que antecede a una revisión más amplia. Responderlo bien reduce la probabilidad de que el asunto escale.

## Qué debe contener la certificación de origen
La certificación de origen del T-MEC no exige un formato específico, pero sí debe incluir los nueve elementos mínimos de datos previstos en el Artículo 5.2 y el Anexo 5-A del tratado: la identidad del certificador, del exportador, del productor y del importador; la descripción y la clasificación arancelaria de la mercancía; el criterio de origen aplicable; el periodo que ampara, de hasta doce meses; y la firma y la fecha con la declaración correspondiente. A diferencia del TLCAN, el T-MEC permite que la certificación la emita también el importador, además del exportador o el productor. Contar con esa documentación integrada antes de exportar es lo que permite responder un CF28 sin contratiempos.`,
    bodyEn: `## What the CF28 is
The CBP Form 28, called a "Request for Information", is a formal request for information issued by U.S. Customs and Border Protection when the invoice or other documentation submitted is not enough to verify the value, the tariff classification or compliance with the conditions of a preferential treatment. It is addressed to the importer, who as a rule has thirty days to respond in full. It is not a penalty in itself, but a request for clarification.

## Where it can lead
When the response is insufficient, arrives late or goes unanswered, Customs may issue a CF29, "Notice of Action", formalizing a change in the classification, the value or the treatment applied, which may translate into the collection of additional duties. That is why it is worth attending to the CF28 seriously: it is the moment when the importer shows, with documentation, that the operation complies with what was declared.

## Its relation to USMCA origin
Through the CF28, Customs often requests proof of eligibility for the preferential treatment, that is, the USMCA certification of origin and its support. The formal origin verification is a separate procedure, governed by Article 5.9 of the treaty and 19 CFR 182.72 and following, but in practice the CF28 tends to be the first contact preceding a broader review. Answering it well reduces the chance that the matter escalates.

## What the certification of origin must contain
The USMCA certification of origin does not require a specific format, but it must include the nine minimum data elements set out in Article 5.2 and Annex 5-A of the treaty: the identity of the certifier, the exporter, the producer and the importer; the description and tariff classification of the goods; the applicable origin criterion; the period it covers, of up to twelve months; and the signature and date with the corresponding declaration. Unlike NAFTA, the USMCA also allows the certification to be issued by the importer, in addition to the exporter or the producer. Having that documentation assembled before exporting is what makes it possible to answer a CF28 without setbacks.`,
    recEs: `- Integra la certificación de origen y su soporte antes de exportar, no cuando llegue el requerimiento.
- Responde el CF28 de forma completa y dentro del plazo; una respuesta parcial abre la puerta a un CF29.
- Confirma que la certificación cubra los nueve elementos mínimos de datos del Anexo 5-A.`,
    recEn: `- Assemble the certification of origin and its support before exporting, not when the request arrives.
- Answer the CF28 in full and within the deadline; a partial response opens the door to a CF29.
- Confirm that the certification covers the nine minimum data elements of Annex 5-A.`,
  },
];

let inserted = 0;
let updated = 0;
for (let i = 0; i < ARTICLES.length; i++) {
  const a = ARTICLES[i];
  const existing = await sql`select id from articles where slug = ${a.slug}`;
  await sql`
    insert into articles
      (slug, status, title_es, title_en, excerpt_es, excerpt_en, body_es, body_en,
       recommendations_es, recommendations_en, source_name, source_url, source_date,
       category, cover_url, featured, published_at, created_at, updated_at)
    values
      (${a.slug}, 'published', ${a.titleEs}, ${a.titleEn}, ${a.excerptEs}, ${a.excerptEn},
       ${a.bodyEs}, ${a.bodyEn}, ${a.recEs}, ${a.recEn}, ${a.sourceName}, ${a.sourceUrl},
       ${a.sourceDate}, ${a.category}, ${a.cover}, false,
       now() - make_interval(mins => ${i}), now(), now())
    on conflict (slug) do update set
      status = excluded.status,
      title_es = excluded.title_es, title_en = excluded.title_en,
      excerpt_es = excluded.excerpt_es, excerpt_en = excluded.excerpt_en,
      body_es = excluded.body_es, body_en = excluded.body_en,
      recommendations_es = excluded.recommendations_es, recommendations_en = excluded.recommendations_en,
      source_name = excluded.source_name, source_url = excluded.source_url, source_date = excluded.source_date,
      category = excluded.category, cover_url = excluded.cover_url,
      updated_at = now()`;
  if (existing.length > 0) updated++;
  else inserted++;
}

console.log(`seed-blog listo: ${inserted} insertadas, ${updated} actualizadas.`);
