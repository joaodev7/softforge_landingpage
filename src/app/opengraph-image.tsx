import { ImageResponse } from "next/og";

export const alt = "SoftForge — Fábrica de Software, SaaS e Landing Pages";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 80% 0%, #0066ff 0%, #0b1f44 48%, #050d1f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "#0066ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 54,
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: "0.12em",
              display: "flex",
            }}
          >
            SOFT<span style={{ color: "#60a5fa" }}>FORGE</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Forjamos software que impulsiona o seu negócio.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#a0a7b8" }}>
          Sistemas sob Medida · SaaS B2B (PRAXIS) · Automações (catchVagas) · Landing Pages
        </div>
      </div>
    ),
    size,
  );
}
