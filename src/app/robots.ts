import type { MetadataRoute } from "next";

const BASE_URL = "https://bgconsultingroup.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Panel y API fuera del índice; el mapa del sitio es de uso interno.
        disallow: ["/admin", "/api", "/mapa-del-sitio"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
