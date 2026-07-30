import type { NextConfig } from "next";

// Headers de seguridad seguros para todo el sitio (no alteran el render).
// Nota: el Content-Security-Policy queda pendiente de afinar y probar EN VIVO
// antes de activarlo (un CSP mal puesto rompe el sitio en silencio).
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse"],
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Landings de pauta: tráfico pagado, fuera del índice para no competir
      // con /guias. La cabecera cubre lo que un meta tag no alcanza.
      { source: "/lp/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  async redirects() {
    return [
      // www no es el dominio canónico: todo el tráfico se consolida en el apex.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bgconsultingroup.com" }],
        destination: "https://bgconsultingroup.com/:path*",
        permanent: true,
      },
      // El panel vive en /admin (no bajo el prefijo de idioma). Alias por memoria muscular.
      { source: "/crm", destination: "/admin/login", permanent: false },
      { source: "/crm/:path*", destination: "/admin/login", permanent: false },
      { source: "/:lang(es|en)/crm", destination: "/admin/login", permanent: false },
      { source: "/:lang(es|en)/crm/:path*", destination: "/admin/login", permanent: false },
    ];
  },
};

export default nextConfig;
