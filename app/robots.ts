import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /robots.txt 를 자동 생성한다(검색엔진 크롤러용 안내).
// 전체 공개하되, 색인할 가치가 없는 API와 파라미터 기반 결과 페이지(/result)는 제외.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/result"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
