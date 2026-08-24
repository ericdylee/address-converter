import { describe, it, expect } from "vitest";
import {
  websiteSchema,
  softwareAppSchema,
  articleSchema,
  breadcrumbSchema,
  guideJsonLd,
} from "./structured-data";

describe("structured-data", () => {
  it("websiteSchema: WebSite 타입과 name/url 포함", () => {
    const s = websiteSchema() as Record<string, unknown>;
    expect(s["@type"]).toBe("WebSite");
    expect(typeof s.name).toBe("string");
    expect(String(s.url)).toMatch(/^https?:\/\//);
  });

  it("softwareAppSchema: 무료(price 0) 도구로 표기", () => {
    const s = softwareAppSchema() as {
      "@type": string;
      offers: { price: string };
    };
    expect(s["@type"]).toBe("SoftwareApplication");
    expect(s.offers.price).toBe("0");
  });

  it("articleSchema: headline과 절대 url 포함", () => {
    const s = articleSchema({
      title: "테스트 글",
      description: "설명",
      path: "/guide/test",
      datePublished: "2026-07-14",
      dateModified: "2026-07-14",
    }) as Record<string, unknown>;
    expect(s["@type"]).toBe("Article");
    expect(s.headline).toBe("테스트 글");
    expect(String(s.url)).toContain("/guide/test");
  });

  it("breadcrumbSchema: position이 1부터 증가", () => {
    const s = breadcrumbSchema([
      { name: "홈", path: "/" },
      { name: "가이드", path: "/guide" },
    ]) as {
      "@type": string;
      itemListElement: { position: number }[];
    };
    expect(s["@type"]).toBe("BreadcrumbList");
    expect(s.itemListElement).toHaveLength(2);
    expect(s.itemListElement[0].position).toBe(1);
    expect(s.itemListElement[1].position).toBe(2);
  });

  describe("guideJsonLd", () => {
    const built = guideJsonLd({
      title: "아마존 한국 주소 입력법",
      path: "/guide/amazon-address",
      datePublished: "2026-08-24",
      dateModified: "2026-08-25",
    }) as [
      Record<string, unknown>,
      { "@type": string; itemListElement: { name: string }[] },
    ];

    it("Article + BreadcrumbList 두 개를 만든다", () => {
      expect(built).toHaveLength(2);
      expect(built[0]["@type"]).toBe("Article");
      expect(built[1]["@type"]).toBe("BreadcrumbList");
    });

    // 가이드 8편이 공유하던 GUIDE_DATE 상수와 달리, 글마다 다른 날짜를 받는다.
    // 작성일과 수정일이 서로 다를 수 있어야 "관리되는 글"로 표기된다.
    it("글별 날짜를 주면 그대로 싣는다 (공유 상수 대신)", () => {
      expect(built[0].datePublished).toBe("2026-08-24");
      expect(built[0].dateModified).toBe("2026-08-25");
    });

    it("이동경로가 홈 → 사용 가이드 → 글 순서다", () => {
      expect(built[1].itemListElement.map((i) => i.name)).toEqual([
        "홈",
        "사용 가이드",
        "아마존 한국 주소 입력법",
      ]);
    });
  });
});
