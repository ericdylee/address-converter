import { expect, test } from "vitest";
import { formatZip, lookupPostalCode, normalizeZip } from "./jp-postal";

test("normalizeZip: 숫자만 남긴다", () => {
  expect(normalizeZip("〒100-0005")).toBe("1000005");
  expect(normalizeZip("100 0005")).toBe("1000005");
});

test("formatZip: 7자리는 3-4로 포맷, 아니면 그대로", () => {
  expect(formatZip("1000005")).toBe("100-0005");
  expect(formatZip("123")).toBe("123");
});

test("lookupPostalCode: 실제 데이터에서 조회 (도쿄 마루노우치)", () => {
  const results = lookupPostalCode("100-0005");
  expect(results.length).toBeGreaterThan(0);
  expect(results[0].english).toEqual({
    street: "Marunochi",
    city: "Chiyoda-ku",
    state: "Tokyo",
    postalCode: "100-0005",
  });
  expect(results[0].japanese).toBe("東京都千代田区丸の内");
});

test("lookupPostalCode: 7자리가 아니면 빈 배열", () => {
  expect(lookupPostalCode("123")).toEqual([]);
  expect(lookupPostalCode("")).toEqual([]);
});
