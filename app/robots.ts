import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /robots.txt 를 자동 생성한다(검색엔진 크롤러용 안내).
//
// /result는 주소마다 URL이 달라지는 파라미터 페이지라 색인 가치가 없어 일반
// 크롤러에게는 막는다. 다만 AdSense 광고 크롤러(Mediapartners-Google)는 예외로
// 열어둔다 — 광고를 붙일 페이지의 내용을 읽지 못하면 맞춤 광고 대신 관련성 낮은
// 광고가 나가기 때문이다. /result가 이 사이트에서 광고 노출이 가장 많은 화면이다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/result"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
