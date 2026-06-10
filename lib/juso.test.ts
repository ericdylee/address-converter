import { expect, test } from "vitest";
import { parseEnglishAddress } from "./juso";
import type { JusoApiItem } from "./types";

// 테스트에 필요한 필드만 바꿔 쓰는 JusoApiItem 생성기.
function makeItem(overrides: Partial<JusoApiItem>): JusoApiItem {
  return {
    korAddr: "",
    roadAddr: "",
    jibunAddr: "",
    zipNo: "00000",
    admCd: "",
    rnMgtSn: "",
    bdKdcd: "",
    siNm: "",
    sggNm: "",
    emdNm: "",
    liNm: "",
    rn: "",
    udrtYn: "",
    buldMnnm: "",
    buldSlno: "",
    mtYn: "",
    lnbrMnnm: "",
    lnbrSlno: "",
    ...overrides,
  };
}

test("일반 주소: 콤마 첫 조각이 street", () => {
  const item = makeItem({
    roadAddr: "323 Gangnam-daero, Seocho-gu, Seoul",
    siNm: "Seoul",
    sggNm: "Seocho-gu",
    zipNo: "06627",
  });
  expect(parseEnglishAddress(item)).toEqual({
    street: "323 Gangnam-daero",
    city: "Seocho-gu",
    state: "Seoul",
    postalCode: "06627",
  });
});

test("콤마 4조각: 마지막 2개(시·도)를 뺀 나머지가 street", () => {
  const item = makeItem({
    roadAddr: "Suite 100, 323 Gangnam-daero, Seocho-gu, Seoul",
    siNm: "Seoul",
    sggNm: "Seocho-gu",
  });
  expect(parseEnglishAddress(item).street).toBe(
    "Suite 100, 323 Gangnam-daero",
  );
});

test("세종시: 시군구(sggNm)가 비면 시도(siNm)로 city를 채운다", () => {
  const item = makeItem({
    roadAddr: "411 Hannuri-daero, Sejong-si",
    siNm: "Sejong-si",
    sggNm: "",
    zipNo: "30116",
  });
  const parsed = parseEnglishAddress(item);
  expect(parsed.city).toBe("Sejong-si");
  expect(parsed.state).toBe("Sejong-si");
});
