// 조합 패턴(동+호, 층+호)을 단일 패턴보다 앞에 둬야 한 덩어리로 매치된다.
// 여러 조각이 발견되면 마지막 것만 쓴다(주소 중간 숫자의 오인 방지 — 의도된 정책).
const DETAIL_RE = /(\d+동\s*\d+호|\d+층\s*\d+호|\d+동|\d+호|\d+층)/g;

export function extractDetail(query: string): string {
  const matches = query.match(DETAIL_RE);
  if (!matches) return "";
  return matches[matches.length - 1].trim();
}
