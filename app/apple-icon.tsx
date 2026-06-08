import { ImageResponse } from "next/og";

// 아이폰 '홈 화면에 추가' 시 쓰이는 아이콘(180x180 PNG). 파비콘(app/icon.svg)과 같은 위치 핀 마크.
// iOS가 모서리를 자동으로 둥글게 마스킹하므로 배경(블루)은 모서리까지 꽉 채운다.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 13c-9.94 0-18 8.06-18 18 0 13.5 18 23 18 23s18-9.5 18-23c0-9.94-8.06-18-18-18Z"
            fill="#ffffff"
          />
          <circle cx="32" cy="31" r="7" fill="#2563eb" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
