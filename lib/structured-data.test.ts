import { describe, it, expect } from "vitest";
import {
  websiteSchema,
  softwareAppSchema,
  articleSchema,
  breadcrumbSchema,
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
});
