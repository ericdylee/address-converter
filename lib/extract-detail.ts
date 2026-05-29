const DETAIL_RE = /(\d+동\s*\d+호|\d+동|\d+호|\d+층)/g;

export function extractDetail(query: string): string {
  const matches = query.match(DETAIL_RE);
  if (!matches) return "";
  return matches[matches.length - 1].trim();
}
