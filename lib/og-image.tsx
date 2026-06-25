import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

type OgImageOptions = {
  title: string;
  subtitle: string;
  badge?: string;
  rows?: { label: string; value: string }[];
};

export function createOgImage({
  title,
  subtitle,
  badge = "Address Converter",
  rows = [
    { label: "Street", value: "152 Teheran-ro" },
    { label: "City", value: "Gangnam-gu" },
    { label: "State", value: "Seoul" },
    { label: "ZIP", value: "06236" },
  ],
}: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f8fc",
          color: "#111827",
          fontFamily:
            'Arial, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          padding: 56,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 18,
            background:
              "repeating-linear-gradient(-45deg, #2563eb 0, #2563eb 18px, #ffffff 18px, #ffffff 36px, #dc2626 36px, #dc2626 54px, #ffffff 54px, #ffffff 72px)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: 40,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                alignSelf: "flex-start",
                border: "1px solid #bfdbfe",
                borderRadius: 999,
                background: "#eff6ff",
                color: "#1d4ed8",
                fontSize: 24,
                fontWeight: 700,
                padding: "10px 18px",
                marginBottom: 30,
              }}
            >
              {badge}
            </div>
            <div
              style={{
                fontSize: 68,
                lineHeight: 1.12,
                fontWeight: 800,
                letterSpacing: 0,
                color: "#030712",
                marginBottom: 24,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.45,
                color: "#4b5563",
                maxWidth: 650,
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                marginTop: 36,
                fontSize: 24,
                color: "#6b7280",
              }}
            >
              {SITE_NAME}
            </div>
          </div>

          <div
            style={{
              width: 420,
              border: "1px solid #e5e7eb",
              borderRadius: 18,
              background: "#ffffff",
              boxShadow: "0 24px 48px rgba(15, 23, 42, 0.10)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <div
              style={{
                height: 14,
                background:
                  "repeating-linear-gradient(-45deg, #2563eb 0, #2563eb 12px, #ffffff 12px, #ffffff 24px, #dc2626 24px, #dc2626 36px, #ffffff 36px, #ffffff 48px)",
              }}
            />
            <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
              {rows.map((row) => (
                <div
                  key={row.label}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "16px 18px",
                    background: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {row.label}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      lineHeight: 1.25,
                      fontWeight: 700,
                      color: "#030712",
                    }}
                  >
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    },
  );
}
