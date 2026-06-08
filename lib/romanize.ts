const SUFFIX_MAP: Array<[RegExp, string]> = [
  [/번지/g, "-beonji"],
  [/동\s+/g, "-"],
  [/동/g, ""],
  // "호"는 제거: "101동 502호" → (동 규칙으로 "101-502호") → "101-502"
  [/호/g, ""],
  [/층/g, "F"],
  [/관/g, "-gwan"],
  [/실/g, "-sil"],
];

// 아파트 동 이름이 한글 문자(가/나/다…)인 경우의 로마자 표기(국어 로마자 표기법).
// "동" 바로 앞의 한 글자에만 적용해, 그 외 한글은 건드리지 않는다.
// 예: "가동 101호" → "Ga-101", "다동 502호" → "Da-502"
const DONG_LETTER_MAP: Record<string, string> = {
  가: "Ga", 나: "Na", 다: "Da", 라: "Ra", 마: "Ma", 바: "Ba", 사: "Sa",
  아: "A", 자: "Ja", 차: "Cha", 카: "Ka", 타: "Ta", 파: "Pa", 하: "Ha",
};

const HANGUL_RE = /[가-힣]/;

export function romanizeDetail(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  if (!HANGUL_RE.test(trimmed)) {
    return trimmed;
  }

  // 1) "동" 앞이 한글 문자면 먼저 로마자로(가→Ga). 동 규칙보다 먼저 처리해야
  //    이후 "Ga동 " → "Ga-"로 자연스럽게 합쳐진다.
  let result = trimmed.replace(
    /([가-힣])(?=동)/g,
    (ch) => DONG_LETTER_MAP[ch] ?? ch,
  );
  // 2) 나머지 접미사 변환(동/호/층/번지/관/실).
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
