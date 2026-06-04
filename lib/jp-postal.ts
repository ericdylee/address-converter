import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AddressFields, JpAddressResult } from "./types";

// data/jp-postal.json 한 행의 모양:
// [prefEn, cityEn, townEn, prefKanji, cityKanji, townKanji]
type JpTuple = [string, string, string, string, string, string];

// JSON이 11MB대라 TS로 직접 import하면 tsc가 거대한 리터럴 타입을 추론하느라 느려진다.
// 그래서 런타임에 fs로 한 번 읽어 모듈 스코프에 캐시한다(서버리스 인스턴스당 1회).
// (Vercel 배포 시 next.config.ts의 outputFileTracingIncludes로 이 파일이 번들에 포함됨)
let cache: Record<string, JpTuple[]> | null = null;

function getData(): Record<string, JpTuple[]> {
  if (!cache) {
    const file = join(process.cwd(), "data", "jp-postal.json");
    cache = JSON.parse(readFileSync(file, "utf8")) as Record<string, JpTuple[]>;
  }
  return cache;
}

/** 입력에서 숫자만 남긴다. "100-0005" / "〒100-0005" → "1000005" */
export function normalizeZip(input: string): string {
  return input.replace(/\D/g, "");
}

/** 표시용 우편번호. "1000005" → "100-0005" */
export function formatZip(input: string): string {
  const z = normalizeZip(input);
  return z.length === 7 ? `${z.slice(0, 3)}-${z.slice(3)}` : z;
}

/** 우편번호로 영문 주소 후보를 조회. 7자리가 아니거나 없으면 빈 배열. */
export function lookupPostalCode(input: string): JpAddressResult[] {
  const zip = normalizeZip(input);
  if (zip.length !== 7) return [];
  const rows = getData()[zip];
  if (!rows) return [];

  const postalCode = formatZip(zip);
  return rows.map((row, idx) => {
    const [prefEn, cityEn, townEn, prefKanji, cityKanji, townKanji] = row;
    const english: AddressFields = {
      // 동네가 Street의 베이스. 번지(블록)는 사용자 입력으로 combineJpStreet에서 앞에 붙는다.
      street: townEn,
      city: cityEn,
      state: prefEn,
      postalCode,
    };
    return {
      id: `${zip}-${idx}`,
      japanese: `${prefKanji}${cityKanji}${townKanji}`,
      englishLabel: [townEn, cityEn, prefEn].filter(Boolean).join(", "),
      english,
    };
  });
}
