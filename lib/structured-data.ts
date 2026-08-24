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

export function guideJsonLd(opts: {
  title: string;
  path: string;
  /** 글별 작성일. 없으면 기존 8편이 공유하는 GUIDE_DATE를 쓴다. */
  datePublished?: string;
  /** 글별 최종 수정일. 화면을 다시 확인해 고친 글은 이 값을 갱신한다. */
  dateModified?: string;
}) {
  return [
    articleSchema({
      title: opts.title,
      path: opts.path,
      datePublished: opts.datePublished ?? GUIDE_DATE,
      dateModified: opts.dateModified ?? GUIDE_DATE,
    }),
    breadcrumbSchema([
      { name: "홈", path: "/" },
      { name: "사용 가이드", path: "/guide" },
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
