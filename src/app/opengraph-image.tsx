import { ImageResponse } from "next/og";

export const alt = "BG Consulting Group — Comercio exterior, aduanas y cumplimiento";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG por defecto para previews de links (WhatsApp, LinkedIn, X, etc.).
// Tokens reales del sitio: ink #0f1521, chalk #f6f8fa, bone #ccd2dc, accent #00e6a0.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f1521",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#00e6a0" }} />
          <div style={{ color: "#00e6a0", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>
            BG Consulting Group
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f6f8fa", fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
            Comercio exterior, aduanas
          </div>
          <div style={{ color: "#f6f8fa", fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
            y cumplimiento
          </div>
          <div style={{ color: "#ccd2dc", fontSize: 30, marginTop: 28, maxWidth: 900 }}>
            Más de 20 años entre Tijuana y San Diego. Asesoría legal, fiscal y de cumplimiento IMMEX.
          </div>
        </div>

        <div style={{ display: "flex", height: 6, width: 180, background: "#00e6a0" }} />
      </div>
    ),
    { ...size },
  );
}
