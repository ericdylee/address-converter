import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";

// /sitemap.xml 을 자동 생성한다(검색엔진이 페이지를 빠짐없이 색인하도록 돕는 목록).
//
// lastModified 는 "정말 그날 고친 것"만 적는다. 빌드할 때마다 오늘 날짜를 넣으면
// 매일 전 페이지가 바뀌었다고 알리는 셈이라 신호가 오히려 흐려진다.
// 가이드 글은 lib/guides.ts 의 dateModified 를 그대로 쓰고, 나머지 고정 페이지는
// 아래 상수를 손으로 갱신한다.
type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

/** 고정 페이지(홈·소개·문의 등)를 마지막으로 손본 날 */
const STATIC_PAGES_UPDATED = "2026-09-18";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: ChangeFrequency,
    lastModified: string,
  ) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  // 가이드 글은 카탈로그에서 그대로 가져온다 — 글이 늘어도 여기를 고칠 필요가 없다.
  const guideEntries = GUIDES.map((g) =>
    entry(g.path, g.path === "/guide/amazon-address" ? 0.9 : 0.8, "monthly", g.dateModified),
  );

  return [
    entry("", 1, "weekly", STATIC_PAGES_UPDATED), // 홈(검색)
    entry("/guide", 0.8, "monthly", STATIC_PAGES_UPDATED), // 가이드 목록
    ...guideEntries,
    entry("/faq", 0.7, "monthly", STATIC_PAGES_UPDATED), // 자주 묻는 질문
    entry("/about", 0.6, "monthly", STATIC_PAGES_UPDATED), // 소개
    entry("/contact", 0.4, "yearly", STATIC_PAGES_UPDATED), // 문의
    entry("/privacy", 0.3, "yearly", STATIC_PAGES_UPDATED), // 개인정보처리방침
  ];
}
