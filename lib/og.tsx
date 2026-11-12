import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// next/og renders outside the CSS pipeline, so the palette is repeated here.
const navy = "#0B1220";
const surface = "#111A2E";
const teal = "#14B8A6";
const text = "#E2E8F0";
const muted = "#94A3B8";

export function renderOgImage({ eyebrow, title, subtitle, initials }: {
  eyebrow: string;
  title: string;
  subtitle: string;
  initials: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: navy,
          backgroundImage: `linear-gradient(${surface} 1px, transparent 1px), linear-gradient(90deg, ${surface} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: text,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 12,
              background: teal,
              color: navy,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {initials}
          </div>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: teal, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 120, height: 6, background: teal, borderRadius: 3, marginBottom: 32 }} />
          <div style={{ display: "flex", fontSize: title.length > 40 ? 56 : 72, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: muted, lineHeight: 1.4 }}>{subtitle}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
