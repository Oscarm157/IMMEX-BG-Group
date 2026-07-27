import type Anthropic from "@anthropic-ai/sdk";
import { SERVICIOS } from "@/lib/keywords-schema";

/**
 * Herramientas del asistente. Las de tipo "cliente" no se ejecutan en el servidor:
 * se emiten al navegador, que las aplica sobre el estado de la tabla y devuelve el
 * resultado real en el siguiente turno (si pidió 15 keywords y existían 11, el modelo
 * se entera).
 */

export const TOOLS_CLIENTE = [
  "aplicar_filtros",
  "ordenar",
  "seleccionar_keywords",
  "navegar",
] as const;

export type ToolCliente = (typeof TOOLS_CLIENTE)[number];

export const esToolCliente = (nombre: string): nombre is ToolCliente =>
  (TOOLS_CLIENTE as readonly string[]).includes(nombre);

export const TOOLS: Anthropic.Tool[] = [
  {
    name: "aplicar_filtros",
    description:
      "Filtra la tabla de keywords que están viendo. Solo manda los campos que quieras cambiar; los demás se quedan como están. Para quitar un tope numérico, manda null. Úsala cuando pidan acotar por texto, por volumen, por precio de puja o por competencia.",
    input_schema: {
      type: "object",
      properties: {
        busqueda: {
          type: "string",
          description: "Texto que debe contener la keyword. Cadena vacía para quitar el filtro.",
        },
        min_volumen: {
          type: ["number", "null"],
          description: "Búsquedas mensuales mínimas. null para quitar el tope.",
        },
        max_volumen: {
          type: ["number", "null"],
          description: "Búsquedas mensuales máximas. null para quitar el tope.",
        },
        min_cpc: {
          type: ["number", "null"],
          description: "Puja alta mínima en USD. null para quitar el tope.",
        },
        max_cpc: {
          type: ["number", "null"],
          description: "Puja alta máxima en USD. null para quitar el tope.",
        },
        competencias: {
          type: "array",
          items: { type: "string", enum: ["LOW", "MEDIUM", "HIGH"] },
          description: "Niveles de competencia a mostrar. Lista vacía para mostrar todos.",
        },
        solo_con_puja: {
          type: "boolean",
          description: "Solo keywords donde Google reporta puja.",
        },
      },
      required: [],
    },
  },
  {
    name: "ordenar",
    description: "Ordena la tabla de keywords por una columna.",
    input_schema: {
      type: "object",
      properties: {
        columna: {
          type: "string",
          enum: ["keyword", "servicio", "volumen", "competencia", "cpc"],
        },
        direccion: {
          type: "string",
          enum: ["asc", "desc"],
          description: "asc de menor a mayor, desc de mayor a menor.",
        },
      },
      required: ["columna", "direccion"],
    },
  },
  {
    name: "seleccionar_keywords",
    description:
      "Marca keywords en la tabla, por su texto exacto tal como aparece. Es lo que usas cuando piden 'selecciona las mejores' o 'quédate con estas'. La selección alimenta la calculadora y es lo que se puede mandar a un grupo.",
    input_schema: {
      type: "object",
      properties: {
        keywords: {
          type: "array",
          items: { type: "string" },
          description: "Texto exacto de cada keyword a marcar.",
        },
        reemplazar: {
          type: "boolean",
          description: "true (default) limpia la selección previa; false suma a lo ya marcado.",
        },
      },
      required: ["keywords"],
    },
  },
  {
    name: "navegar",
    description: "Lleva a otra pantalla del panel de pauta.",
    input_schema: {
      type: "object",
      properties: {
        destino: {
          type: "string",
          enum: ["keywords", "grupos"],
        },
        servicio: {
          type: "string",
          enum: [...SERVICIOS],
          description: "Solo para destino keywords: filtra por esa línea de servicio.",
        },
        mercado: {
          type: "string",
          enum: ["nacional_es", "extranjero_en"],
          description: "Solo para destino keywords.",
        },
      },
      required: ["destino"],
    },
  },
  {
    name: "consultar_mercado",
    description:
      "Consulta los datos medidos que no están en pantalla: todos los servicios con su volumen nacional y extranjero, CPC y competencia, y los grupos ya armados con sus métricas. Úsala cuando la pregunta sea de estrategia (por dónde entrar, con qué presupuesto) y necesites comparar servicios que no están viendo.",
    input_schema: {
      type: "object",
      properties: {
        que: {
          type: "string",
          enum: ["servicios", "grupos", "ambos"],
        },
      },
      required: ["que"],
    },
  },
  {
    name: "proponer_grupo",
    description:
      "Propone crear un grupo de anuncios con las keywords seleccionadas. NO lo guarda: sale una tarjeta y ellos deciden. Un grupo es de una sola línea de servicio.",
    input_schema: {
      type: "object",
      properties: {
        nombre: { type: "string", description: "Ej. 'IMMEX · Nacional'." },
        servicio: { type: "string", enum: [...SERVICIOS] },
        plaza: {
          type: ["string", "null"],
          description: "Ciudad si el grupo es local; null si es nacional.",
        },
        mercado: { type: "string", enum: ["nacional_es", "extranjero_en"] },
        keywords: {
          type: "array",
          items: { type: "string" },
          description: "Texto exacto de las keywords que van en el grupo.",
        },
        porque: {
          type: "string",
          description: "Una línea sobre por qué estas keywords juntas.",
        },
      },
      required: ["nombre", "servicio", "mercado", "keywords"],
    },
  },
  {
    type: "web_search_20260209",
    name: "web_search",
    max_uses: 4,
  } as unknown as Anthropic.Tool,
];
