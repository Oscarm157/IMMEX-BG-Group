import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse"],
  async redirects() {
    return [
      // El panel vive en /admin (no bajo el prefijo de idioma). Alias por memoria muscular.
      { source: "/crm", destination: "/admin/login", permanent: false },
      { source: "/crm/:path*", destination: "/admin/login", permanent: false },
      { source: "/:lang(es|en)/crm", destination: "/admin/login", permanent: false },
      { source: "/:lang(es|en)/crm/:path*", destination: "/admin/login", permanent: false },
    ];
  },
};

export default nextConfig;
