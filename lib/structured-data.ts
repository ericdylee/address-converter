import { SITE_NAME, SITE_URL } from "@/lib/site";
import { absoluteUrl } from "@/lib/metadata";

// 구조화 데이터(JSON-LD) 빌더. 순수 함수라 서버/클라이언트 어디서든 호출 가능.
// 결과 객체는 <JsonLd> 컴포넌트로 <script type="application/ld+json">에 넣는다.
// 구글이 "이 페이지는 무엇인지"(사이트·앱·글·이동경로)를 더 정확히 이해하도록 돕는다.

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function softwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };
}

export function articleSchema(opts: {
  title: string;
  description?: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    url: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "ko-KR",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
  if (opts.description) schema.description = opts.description;
  return schema;
}

// 가이드 글 1편에 넣을 구조화 데이터(글 + 이동경로)를 한 번에 만든다.
// 각 가이드 페이지가 ContentLayout의 jsonLd prop에 이 결과를 넘긴다.
const GUIDE_DATE = "2026-07-14";

export function guideJsonLd(opts: { title: string; path: string }) {
  return [
    articleSchema({
      title: opts.title,
      path: opts.path,
      datePublished: GUIDE_DATE,
      dateModified: GUIDE_DATE,
    }),
    breadcrumbSchema([
      { name: "홈", path: "/" },
      { name: "사용 가이드", path: "/guide" },
      { name: opts.title, path: opts.path },
    ]),
  ];
}

// 쇼핑몰별 실전 입력법 글 1편에 넣을 구조화 데이터(글 + 이동경로).
//
// 가이드(guideJsonLd)와 달리 날짜를 글마다 인자로 받는다. 실전 글은 대상
// 사이트의 화면이 바뀌면 다시 확인해 고치는 글이라, "언제 확인한 내용인지"가
// 내용의 일부다. 공유 상수로 묶으면 그 정보가 사라진다.
export function shopJsonLd(opts: {
  title: string;
  path: string;
  description?: string;
  datePublished: string;
  dateModified: string;
}) {
  return [
    articleSchema(opts),
    breadcrumbSchema([
      { name: "홈", path: "/" },
      { name: "쇼핑몰별 입력법", path: "/shops" },
      { name: opts.title, path: opts.path },
    ]),
  ];
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
