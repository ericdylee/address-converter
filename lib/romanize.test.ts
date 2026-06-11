import { expect, test } from "vitest";
import {
  combineJpStreet,
  combineStreetWithDetail,
  romanizeDetail,
} from "./romanize";

test("동+호: 동은 하이픈, 호는 제거", () => {
  expect(romanizeDetail("101동 502호")).toBe("101-502");
});

test("층은 F로 변환", () => {
  expect(romanizeDetail("3층")).toBe("3F");
});

test("층+호 조합", () => {
  expect(romanizeDetail("3층 301호")).toBe("3F 301");
});

test("한글 동 이름은 로마자로 (가동 → Ga)", () => {
  expect(romanizeDetail("가동 101호")).toBe("Ga-101");
});

test("한글이 없으면 그대로 통과", () => {
  expect(romanizeDetail("Apt 101")).toBe("Apt 101");
});

test("빈 입력은 빈 문자열", () => {
  expect(romanizeDetail("  ")).toBe("");
});

test("combineStreetWithDetail: 도로명 뒤에 콤마로 합침", () => {
  expect(combineStreetWithDetail("323 Gangnam-daero", "101동 502호")).toBe(
    "323 Gangnam-daero, 101-502",
  );
});

test("combineStreetWithDetail: 상세 없으면 도로명만", () => {
  expect(combineStreetWithDetail("323 Gangnam-daero", "")).toBe(
    "323 Gangnam-daero",
  );
});

test("combineJpStreet: 번지가 동네 앞에 온다", () => {
  expect(combineJpStreet("Marunouchi", "1-1-1")).toBe("1-1-1 Marunouchi");
});

test("combineJpStreet: 번지 없으면 동네만, 동네 없으면 번지만", () => {
  expect(combineJpStreet("Marunouchi", "")).toBe("Marunouchi");
  expect(combineJpStreet("", "1-1-1")).toBe("1-1-1");
});
