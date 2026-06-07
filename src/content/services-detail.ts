// Descripción de cada servicio (1-2 frases factuales, elaboradas de los sub-puntos
// reales del sitio). Índice alineado a SERVICE_SLUGS / dictionaries.services.items.
// Sin inventar cifras ni claims.
export const SERVICE_DETAIL: Record<"es" | "en", readonly string[]> = {
  es: [
    // legal-consulting
    "Representación y defensa de la empresa ante la autoridad aduanera y fiscal. Atendemos recursos administrativos, el juicio de amparo y los procedimientos ante el Tribunal Federal de Justicia Administrativa, además de acuerdos conclusivos para resolver diferencias sin litigio prolongado.",
    // compliance-and-assurance
    "Estructuras de control que identifican y miden el riesgo de comercio exterior antes de que llegue una revisión. Incluye evaluación de riesgos, cumplimiento de NAFTA 303, auditorías preventivas y análisis de control interno.",
    // foreign-trade
    "El criterio técnico detrás de cada importación y exportación: valor en aduana, criterios de valoración, correcta presentación de pedimentos y análisis de riesgo en materia aduanera.",
    // international-trade-experts
    "Clasificación arancelaria, determinación de origen y avalúos resueltos con respaldo técnico y criterio aduanero, para que cada mercancía cruce bajo la fracción y el origen correctos.",
    // information-technology
    "La capa operativa que ordena el movimiento físico de la mercancía: logística, almacenaje, distribución y monitoreo, conectada a la trazabilidad documental de la operación.",
    // fiscal-services
    "Revisión del IVA y gestión de solicitudes de devolución ante la autoridad, para recuperar saldos a favor con el soporte documental que exige el SAT.",
    // trade-agreements
    "Gestión del origen de la mercancía de proveedor a aduana: revisión y creación de registros de origen, diseño de formatos de solicitud, gestión con proveedores nacionales y auditoría de los procesos de determinación y certificación.",
    // import-services
    "La operación de importación cubierta de principio a fin: almacén, normas específicas (NOM), gestión de permisos y coordinación con el agente aduanal.",
  ],
  en: [
    "Representation and defense of the company before the customs and tax authority. We handle administrative resources, the writ of amparo and proceedings before the Federal Court of Administrative Justice, plus conclusive agreements to settle disputes without prolonged litigation.",
    "Control structures that identify and measure foreign-trade risk before a review arrives. Includes risk evaluation, NAFTA 303 compliance, preventive audits and internal control analysis.",
    "The technical judgment behind every import and export: customs value, valuation criteria, correct filing of entries and customs risk analysis.",
    "Tariff classification, origin determination and appraisals resolved with technical backing and customs criteria, so every shipment clears under the right code and origin.",
    "The operational layer that orders the physical movement of goods: logistics, storage, distribution and monitoring, tied to the documentary traceability of the operation.",
    "VAT review and refund-request management before the authority, to recover credit balances with the documentation the tax authority requires.",
    "Origin management from supplier to customs: review and creation of origin records, request-format design, domestic supplier management and audit of determination and certification processes.",
    "The import operation covered end to end: warehouse, specific standards (NOM), permit management and coordination with the customs broker.",
  ],
};
