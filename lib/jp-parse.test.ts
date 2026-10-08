import { expect, test } from "vitest";
import { parseJpAddress, splitBlock, toHalfWidth } from "./jp-parse";
import { matchKanjiPrefix } from "./jp-postal";

test("toHalfWidth: 전각 숫자와 숫자 사이 대시를 반각으로, 가타카나 장음은 그대로", () => {
  expect(toHalfWidth("１－２ー３")).toBe("1-2-3");
  expect(toHalfWidth("タワー")).toBe("タワー");
});

test("splitBlock: 丁目番号 → 1-2-3", () => {
  expect(splitBlock("1丁目2番3号")).toEqual({ block: "1-2-3", building: "" });
  expect(splitBlock("1丁目2-3")).toEqual({ block: "1-2-3", building: "" });
  expect(splitBlock("一丁目1番1号")).toEqual({ block: "1-1-1", building: "" });
  expect(splitBlock("二十三番地")).toEqual({ block: "23", building: "" });
});

test("splitBlock: 층·호실은 앞에, 건물명(일본어)은 따로", () => {
  expect(splitBlock("1-2-3 〇〇ビル5F")).toEqual({ block: "5F, 1-2-3", building: "〇〇ビル" });
  expect(splitBlock("1-2-3 サンハイツ501号室")).toEqual({ block: "#501, 1-2-3", building: "サンハイツ" });
  expect(splitBlock("1-2-3 ABC Tower")).toEqual({ block: "ABC Tower, 1-2-3", building: "" });
});

test("matchKanjiPrefix: 현 생략·ヶ/ノ 흔들림", () => {
  expect(matchKanjiPrefix("渋谷区神宮前1-2-3")?.result.japanese).toBe("東京都渋谷区神宮前");
  expect(matchKanjiPrefix("東京都港区虎の門1-1")?.result.japanese).toMatch(/^東京都港区虎ノ門/);
});

test("parseJpAddress: 우편번호 + 주소 + 건물", () => {
  const p = parseJpAddress("〒150-0001 東京都渋谷区神宮前1-2-3 〇〇ビル5F");
  expect(p?.result.english).toEqual({
    street: "Jingumae", city: "Shibuya-ku", state: "Tokyo", postalCode: "150-0001",
  });
  expect(p?.block).toBe("5F, 1-2-3");
  expect(p?.building).toBe("〇〇ビル");
});

test("parseJpAddress: 우편번호 없이, 전각, 공백 섞여도", () => {
  const p = parseJpAddress("東京都 千代田区 丸の内１丁目１番１号");
  expect(p?.result.japanese).toBe("東京都千代田区丸の内");
  expect(p?.block).toBe("1-1-1");
});

test("parseJpAddress: 전화번호를 우편번호로 오인하지 않는다", () => {
  const p = parseJpAddress("東京都渋谷区神宮前1-2-3 TEL 03-1234-5678");
  expect(p?.result.english.postalCode).toBe("150-0001");
  expect(p?.block).toBe("1-2-3");
});

test("parseJpAddress: 우편번호만 있고 한자가 데이터와 달라도, 후보가 하나면 그걸 쓴다", () => {
  const p = parseJpAddress("150-0001 Jingumae 1-2-3");
  expect(p?.result.english.street).toBe("Jingumae");
  expect(p?.block).toBe("1-2-3");
});

test("parseJpAddress: 해석 불가면 null", () => {
  expect(parseJpAddress("hello world")).toBeNull();
  expect(parseJpAddress("")).toBeNull();
});
