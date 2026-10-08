import { lookupPostalCode, matchKanjiPrefix } from "./jp-postal";
import type { ParsedJpAddress } from "./types";

// 일본어 주소 한 줄(예약 메일·호텔 페이지에서 복사한 것)을 "동네 + 번지 + 건물"로 쪼갠다.
// 동네까지는 우편번호 데이터와 맞춰 영문을 얻고, 번지는 숫자로 정규화하고,
// 건물명은 공식 영문 표기가 없어 번역하지 않고 원문 그대로 돌려준다.

/** 전각 영숫자 → 반각. 숫자 사이의 각종 대시만 "-"로 (가타카나 장음 ー는 건드리지 않음). */
export function toHalfWidth(s: string): string {
  return s
    .replace(/[０-９Ａ-Ｚａ-ｚ＃]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/(\d)[－−‐―ー](?=\d)/g, "$1-");
}

const KANJI_DIGIT: Record<string, number> = {
  〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9,
};

/** "二十三" → "23". 丁目·번지에 쓰이는 1~99 범위만 다룬다. */
function kanjiToNum(s: string): string {
  if (!s.includes("十")) return [...s].map((c) => KANJI_DIGIT[c]).join("");
  const [tens, ones] = s.split("十");
  return String((tens ? KANJI_DIGIT[tens] : 1) * 10 + (ones ? KANJI_DIGIT[ones] : 0));
}

/** 동네 뒤 나머지 → { block: 결과 페이지 detail, building: 일본어 건물명 원문 } */
export function splitBlock(rest: string): { block: string; building: string } {
  let s = toHalfWidth(rest).replace(/[\s　]+/g, " ").trim();
  // 丁目·番·号 앞의 한자 숫자만 바꾼다 (동네 이름 속 八丁堀·六本木은 이미 앞에서 소비됨)
  s = s.replace(/[〇一二三四五六七八九十]+(?=丁目|番|号)/g, kanjiToNum);
  s = s.replace(/(\d+)丁目/g, "$1-").replace(/(\d+)番地?/g, "$1-").replace(/(\d+)号(?!室)/g, "$1");

  const m = s.match(/^(\d+(?:-\d+)*)-?/);
  const nums = m ? m[1] : "";
  let tail = (m ? s.slice(m[0].length) : s).trim();

  const units: string[] = [];
  tail = tail
    .replace(/(\d+)(?:階|F)/gi, (_, n) => (units.push(`${n}F`), ""))
    .replace(/(\d+)号室/g, (_, n) => (units.push(`#${n}`), ""))
    .trim();

  // 남은 게 전부 영문이면(예: "ABC Tower") 건물명으로 Street에 넣어도 된다
  if (/^[\x20-\x7e]*$/.test(tail)) {
    if (tail) units.unshift(tail);
    tail = "";
  }
  const block = [units.join(" "), nums].filter(Boolean).join(", ");
  return { block, building: tail };
}

/** body 앞에서 공백을 제외하고 n글자를 건너뛴 나머지 */
function sliceAfterChars(body: string, n: number): string {
  let i = 0;
  for (let seen = 0; i < body.length && seen < n; i++) if (!/\s/.test(body[i])) seen++;
  return body.slice(i);
}

export function parseJpAddress(input: string): ParsedJpAddress | null {
  const text = toHalfWidth(input).replace(/[\s　]+/g, " ").trim();
  // 앞뒤가 숫자가 아닌 3+4자리만 우편번호로 본다 (03-1234-5678 같은 전화번호 배제)
  const zipM = text.match(/〒?\s*(?<!\d)(\d{3})-?(\d{4})(?![\d-])/);
  const zip = zipM ? zipM[1] + zipM[2] : undefined;
  // 같이 복사된 전화번호(TEL 03-… / 電話 …)는 주소가 아니므로 잘라낸다
  const body = (zipM ? text.replace(zipM[0], " ") : text).replace(/\s*(?:TEL|電話|☎).*$/i, "").trim();
  const compact = body.replace(/\s+/g, "");
  if (!compact && !zip) return null;

  // 1) 우편번호 후보 중 한자가 맞는 것 → 2) 우편번호 후보가 하나뿐이면 그것 → 3) 한자만으로 전체 검색
  const byZip = zip ? matchKanjiPrefix(compact, zip) : null;
  if (byZip) return { result: byZip.result, ...splitBlock(sliceAfterChars(body, byZip.matchedLength)) };

  if (zip) {
    const c = lookupPostalCode(zip);
    if (c.length === 1) {
      const i = body.search(/\d/);
      return { result: c[0], ...splitBlock(i < 0 ? "" : body.slice(i)) };
    }
  }

  const byKanji = matchKanjiPrefix(compact);
  if (byKanji) return { result: byKanji.result, ...splitBlock(sliceAfterChars(body, byKanji.matchedLength)) };
  return null;
}
