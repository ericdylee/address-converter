import { expect, test } from "vitest";
import { extractDetail } from "./extract-detail";

test("동+호 조합을 한 덩어리로 추출한다", () => {
  expect(extractDetail("강남대로 123 105동 2003호")).toBe("105동 2003호");
});

test("층+호 조합을 한 덩어리로 추출한다", () => {
  expect(extractDetail("테헤란로 4 3층 301호")).toBe("3층 301호");
});

test("호만 있으면 호만 추출한다", () => {
  expect(extractDetail("월드컵로 206 1204호")).toBe("1204호");
});

test("상세주소 패턴이 없으면 빈 문자열", () => {
  expect(extractDetail("서울특별시 서초구 강남대로 323")).toBe("");
});

test("여러 조각이면 마지막 것만 쓴다 (의도된 정책)", () => {
  expect(extractDetail("3호선 근처 501호")).toBe("501호");
});
