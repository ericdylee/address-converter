import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /api/jp-address가 런타임에 fs로 읽는 일본 우편번호 데이터를
  // Vercel 서버 번들(trace)에 포함시킨다. 동적 경로라 자동 추적이 안 되므로 명시.
  outputFileTracingIncludes: {
    "/api/jp-address": ["./data/jp-postal.json"],
  },
};

export default nextConfig;
