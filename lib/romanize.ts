const SUFFIX_MAP: Array<[RegExp, string]> = [
  [/번지/g, "-beonji"],
  [/동\s+/g, "-"],
  [/동/g, ""],
  [/층/g, "F"],
  [/관/g, "-gwan"],
  [/실/g, "-sil"],
];

const HANGUL_RE = /[가-힣]/;

export function romanizeDetail(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  if (!HANGUL_RE.test(trimmed)) {
    return trimmed;
  }

  let result = trimmed;
  for (const [pattern, replacement] of SUFFIX_MAP) {
    result = result.replace(pattern, replacement);
  }

  return result.replace(/\s+/g, " ").trim();
}

export function combineStreetWithDetail(street: string, detail: string): string {
  const romanized = romanizeDetail(detail);
  if (!romanized) return street;
  return `${street}, ${romanized}`;
}

// 일본식 어순: 번지(블록)가 동네 앞에 온다. "1-1-1" + "Marunochi" → "1-1-1 Marunochi"
// (한국은 "도로명, 상세" 순이라 어순이 반대 → 별도 함수. 번지는 ASCII라 로마자 변환 불필요.)
export function combineJpStreet(town: string, block: string): string {
  const b = block.trim();
  if (!b) return town;
  if (!town) return b;
  return `${b} ${town}`;
}
