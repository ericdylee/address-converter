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
