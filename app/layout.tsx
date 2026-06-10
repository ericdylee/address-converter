import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO/공유용 메타데이터.
// - metadataBase: 상대경로(canonical, OG 이미지 등)를 절대 URL로 만들 기준 도메인.
// - title.template: 하위 페이지가 title만 정하면 "소개 | …" 처럼 자동으로 붙는다.
// - 도메인은 환경변수 NEXT_PUBLIC_SITE_URL 로 주입(lib/site.ts).
const description =
  "한글·일본 주소를 행정안전부·우편번호 공식 데이터 기반으로 영문 주소(Street/City/State/Postal)로 변환하고 칸별로 복사하세요. 해외직구·해외 배송·유학 서류 작성에 유용합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "한글·일본 주소 → 영문 변환기 | 도로명·지번 영문주소 변환",
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "영문주소 변환",
    "한글주소 영문변환",
    "도로명주소 영문",
    "지번주소 영문",
    "일본 주소 영문 변환",
    "해외직구 주소 입력",
    "영문 주소 변환기",
    "english address converter korea",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "한글·일본 주소 → 영문 변환기",
    description,
  },
  twitter: {
    card: "summary",
    title: "한글·일본 주소 → 영문 변환기",
    description,
  },
  robots: { index: true, follow: true },
  // 네이버 서치어드바이저 사이트 소유확인용 메타태그.
  // other에 넣은 키 그대로 <meta name="naver-site-verification" content="..."> 로 렌더됨.
  verification: {
    other: {
      "naver-site-verification": "e52cddfb91c7105e57acf177046d70525744dde3",
    },
  },
};

// 모바일 대응: 기기 너비에 맞춰 렌더(확대/축소 기본값) + 모바일 브라우저
// 상단바 색을 헤더/푸터(다크)와 맞춤.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101828",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* AdSense 사이트 소유권 확인용 메타태그 (클라이언트 ID가 설정된 경우에만) */}
        {adsenseClientId && (
          <meta name="google-adsense-account" content={adsenseClientId} />
        )}
        {/* 본문 기본 폰트: Pretendard (한글 가독성 좋은 웹폰트, 공식 CDN의 동적 서브셋 사용)
            preconnect로 CDN과의 연결을 미리 맺어 첫 화면 글꼴 로딩을 앞당긴다. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        {adsenseClientId && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
