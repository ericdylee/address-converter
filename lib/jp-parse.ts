import { lookupPostalCode, matchKanjiPrefix } from "./jp-postal";
import type { JpAddressResult, ParsedJpAddress } from "./types";

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
  // 같이 복사된 전화번호(TEL 03-… / FAX … / 電話 …, 또는 끝에 붙은 0으로 시작하는 번호)는 주소가 아니다.
  // \b가 없으면 "Hotel" 안의 tel에서 잘려버린다.
  const body = (zipM ? text.replace(zipM[0], " ") : text)
    .replace(/\s*(?:\bTEL\b|\bFAX\b|電話|☎).*$/i, "")
    .replace(/\s+0\d{1,4}-?\d{1,4}-?\d{3,4}\s*$/, "")
    .trim();
  const compact = body.replace(/\s+/g, "");
  if (!compact && !zip) return null;

  // 시·구만 맞고 동네가 비어 있는 행(XXX-0000)인데 뒤에 글자가 남았다 = 동네를 못 알아봤다.
  // 그럴듯한 오답(빈 Street, -0000 우편번호)보다 "못 알아봤어요" 안내가 낫다.
  const finish = (result: JpAddressResult, rest: string): ParsedJpAddress | null =>
    !result.english.street && rest.trim() ? null : { result, ...splitBlock(rest) };

  // 1) 우편번호 후보 중 한자가 맞는 것 → 2) 한자로 동네까지 맞은 것(우편번호 오타보다 한자를 믿는다)
  // → 3) 우편번호 후보가 하나뿐이면 그것(한자가 없거나 영문인 입력) → 4) 한자로 시·구만 맞은 것
  const byZip = zip ? matchKanjiPrefix(compact, zip) : null;
  if (byZip) return finish(byZip.result, sliceAfterChars(body, byZip.matchedLength));

  const byKanji = compact ? matchKanjiPrefix(compact) : null;
  if (byKanji?.result.english.street) {
    return finish(byKanji.result, sliceAfterChars(body, byKanji.matchedLength));
  }

  if (zip) {
    const c = lookupPostalCode(zip);
    if (c.length === 1) {
      const i = body.search(/\d/);
      return finish(c[0], i < 0 ? "" : body.slice(i));
    }
  }

  return byKanji ? finish(byKanji.result, sliceAfterChars(body, byKanji.matchedLength)) : null;
}
