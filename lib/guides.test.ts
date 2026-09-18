import { describe, expect, it } from "vitest";
import { GUIDES, STAGES, getGuide, guidesByStage, nextGuides } from "./guides";

// 카탈로그가 깨지면 "이어서 읽기"가 없는 글로 연결되거나(404) 목록에서 글이
// 통째로 사라진다. 눈으로는 잘 안 보이는 종류의 사고라 테스트로 막는다.

const paths = GUIDES.map((g) => g.path);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("가이드 카탈로그", () => {
  it("경로가 중복되지 않는다", () => {
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("모든 글이 STAGES에 있는 단계에 속한다", () => {
    const stageIds = new Set(STAGES.map((s) => s.id));
    for (const g of GUIDES) {
      expect(stageIds.has(g.stage), `${g.path}의 단계: ${g.stage}`).toBe(true);
    }
  });

  it("단계별로 묶으면 모든 글이 빠짐없이 한 번씩 나온다", () => {
    const grouped = STAGES.flatMap((s) => guidesByStage(s.id));
    expect(grouped).toHaveLength(GUIDES.length);
    expect(new Set(grouped.map((g) => g.path)).size).toBe(GUIDES.length);
  });

  it("빈 단계가 없다 — 글 없는 목차는 오히려 감점이다", () => {
    for (const s of STAGES) {
      expect(guidesByStage(s.id).length, `${s.title} 단계`).toBeGreaterThan(0);
    }
  });

  it("'이어서 읽기'가 실재하는 글만 가리킨다", () => {
    for (const g of GUIDES) {
      for (const p of g.next) {
        expect(paths, `${g.path} → ${p}`).toContain(p);
      }
    }
  });

  it("자기 자신을 '이어서 읽기'로 걸지 않는다", () => {
    for (const g of GUIDES) {
      expect(nextGuides(g).map((n) => n.path)).not.toContain(g.path);
    }
  });

  it("모든 글에 '이어서 읽기'가 2편 이상 있다", () => {
    for (const g of GUIDES) {
      expect(nextGuides(g).length, g.path).toBeGreaterThanOrEqual(2);
    }
  });

  it("모든 글에 출처가 최소 1개 있고 링크가 https다", () => {
    for (const g of GUIDES) {
      expect(g.sources.length, g.path).toBeGreaterThan(0);
      for (const s of g.sources) {
        expect(s.url.startsWith("https://"), `${g.path}: ${s.url}`).toBe(true);
        expect(s.note.length, `${g.path}: ${s.label}의 설명`).toBeGreaterThan(0);
      }
    }
  });

  it("날짜가 YYYY-MM-DD 형식이고 수정일이 작성일보다 빠르지 않다", () => {
    for (const g of GUIDES) {
      expect(g.datePublished, g.path).toMatch(ISO_DATE);
      expect(g.dateModified, g.path).toMatch(ISO_DATE);
      expect(g.verified.date, g.path).toMatch(ISO_DATE);
      expect(
        g.dateModified >= g.datePublished,
        `${g.path}: ${g.datePublished} 작성 / ${g.dateModified} 수정`,
      ).toBe(true);
    }
  });

  it("getGuide는 없는 경로에 예외를 던진다", () => {
    expect(() => getGuide("/guide/없는글")).toThrow();
    expect(getGuide(paths[0]).path).toBe(paths[0]);
  });
});
