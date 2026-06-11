import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /sitemap.xml 을 자동 생성한다(검색엔진이 페이지를 빠짐없이 색인하도록 돕는 목록).
// 새 페이지를 추가하면 아래 목록에도 한 줄 추가하면 된다.
type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: ChangeFrequency,
  ) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("", 1, "weekly"), // 홈(검색)
    entry("/guide", 0.8, "monthly"), // 가이드 목록
    entry("/guide/english-address", 0.8, "monthly"), // 영문주소 작성법
    entry("/guide/overseas-shopping", 0.8, "monthly"), // 해외직구 배송지 작성법
    entry("/guide/japan-address", 0.8, "monthly"), // 일본 주소 영문 표기법
    entry("/faq", 0.7, "monthly"), // 자주 묻는 질문
    entry("/about", 0.6, "monthly"), // 소개
    entry("/contact", 0.4, "yearly"), // 문의
    entry("/privacy", 0.3, "yearly"), // 개인정보처리방침
  ];
}
