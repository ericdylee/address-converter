# 일본 주소 우선 전략 — 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 일본어 주소를 통째로 붙여넣으면 영문 4칸(Street/City/State/Postal Code)으로 바꿔주고, 홈과 결과 화면이 "일본 주소 영문 변환" 검색 의도에 바로 답하게 만든다.

**Architecture:** 이미 있는 일본 우편번호 데이터(`data/jp-postal.json`, 12만 행)를 그대로 쓴다. 새로 만드는 건 순수 함수 하나(`lib/jp-parse.ts` — 붙여넣은 문장을 "어느 동네 + 번지 + 건물"로 쪼갬)와, 그걸 부르는 입력 칸 하나(`components/JpPasteInput.tsx`)뿐이다. API는 기존 `/api/jp-address`에 `?q=`만 더한다 → 배포 설정(`outputFileTracingIncludes`) 수정 불필요.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, vitest. 새 의존성 없음.

**Spec:** `docs/handoff/2026-10-08-japan-first.md` (§4 설계안, §6 진행 순서)

## 쉽게 말하면 (비개발자용 요약)

지금은 일본 주소를 바꾸려면 **우편번호를 따로 알아내서** 칸에 넣어야 한다. 그런데 비짓재팬웹에 숙소 주소를 넣는 사람은 보통 예약 확인 메일의 `〒150-0001 東京都渋谷区神宮前1-2-3 〇〇ビル5F` 한 줄만 갖고 있다. 이 계획은 **그 한 줄을 그대로 붙여넣으면 끝나게** 만드는 것이 핵심(PR-1)이고, 나머지(PR-2·3)는 그걸 검색해서 들어온 사람이 "여기가 맞구나" 하고 바로 알게 하는 화면 정리다.

## 먼저 정할 것 (사용자 결정 — 계획은 ★표 기본값으로 작성됨)

| # | 질문 | ★기본값 | 이유 |
|---|------|---------|------|
| D1 | 홈 기본 탭을 일본으로? | ★**일본 기본 + 탭 순서 일본→한국** | 서치콘솔 상위 검색어 1·2위가 모두 일본이고, 그 사람들이 홈(`/`)으로 들어온다. 한국 주소 검색어는 상위에 없다. 한국 사용자는 탭 한 번 누르면 된다. (반대로 정하면 Task 4의 한 줄만 바꾸면 됨) |
| D2 | 비짓재팬웹·EMS 칸 이름을 어떻게 확인? | ★**공식 화면/안내에서 직접 확인한 것만**. 사용자 화면 캡처가 있으면 가장 확실 | 확인 안 한 칸 이름을 지어내면 틀린 안내가 된다 (`lib/guides.ts` 원칙과 동일). 확인 못 한 섹션은 빼고 배포. |

## Global Constraints

- 새 의존성 추가 금지. 외부 API 추가 금지. 한국 주소 기능은 그대로 둔다.
- 새 페이지(`/japan` 등) 만들지 않는다 — 홈이 이미 `일본주소 영문변환`으로 1페이지에 있다(순위 분산 위험).
- 건물명(한자·가타카나)은 **로마자로 바꾸지 않는다.** 공식 영문 표기가 없으므로 원문을 보여주고 안내만 한다.
- 메타 제목은 문구를 **더하는** 방향으로만. 통째로 갈아엎지 않는다.
- 검색 카드(`section`)에 `overflow-hidden` 금지 — 자동완성 드롭다운이 잘린다(2026-06-11 P0).
- `lib/guides.ts`의 `verified.date`는 실제로 다시 확인한 날만 올린다. 이 계획의 어떤 작업도 그 날짜를 건드리지 않는다.
- 검증 명령: `npm test`, `npx tsc --noEmit`, `npm run lint`. dev 화면 무한 로딩이면 서버 끄고 `rm -rf .next` 후 재시작.

## 이미 확인한 데이터 사실 (2026-10-08, 실제 `data/jp-postal.json`에서 측정)

- 한자 접두사 역검색(12만 행 선형 탐색) 1회 ≈ 27ms → 인덱스 불필요.
- 시·구 한자 이름이 두 현에 걸쳐 겹치는 경우는 단 2개(`府中市` 東京都/広島県, `伊達市` 福島県/北海道) → 현 이름 생략 입력도 거의 항상 하나로 결정된다.
- `ヶ`/`ケ`가 들어간 행 2,522개 → 사용자가 `霞ヶ関`/`霞が関`처럼 다르게 쓸 수 있으므로 비교 키를 통일해야 한다.
- 동네(town) 칸이 빈 행 1,870개 (예: `604-0000 京都市中京区`). 교토의 `〇〇通り上る` 식 주소는 동네까지 못 맞추고 시·구까지만 맞을 수 있다 → 정상 동작으로 본다.
- **알려진 표기 문제 (이번 범위 아님):** 일본우편 공식 로마자는 장음 `u`를 뺀다 → `丸の内`가 `Marunochi`(통상 표기는 Marunouchi). 우편번호로 배달은 되므로 이번엔 손대지 않는다. 사용자 문의가 실제로 오면 그때 보정표를 검토.

## Review Focus

1. **현 이름을 생략한 붙여넣기** (`渋谷区神宮前1-2-3`) — 예약 메일에 흔하다. 시·구부터 맞춰야 한다. → Task 1 테스트.
2. **전화번호가 같이 붙여넣어진 경우** (`… TEL 03-1234-5678`) — 우편번호로 오인하면 엉뚱한 주소가 나온다. 앞뒤가 숫자가 아닌 3+4자리만 우편번호로 본다. → Task 1 테스트.
3. **한자 숫자 丁目** (`丸の内一丁目1番1号`) — 공식 문서·호텔 사이트에 흔하다. `1-1-1`이 되어야 한다. 동네 이름 속 한자 숫자(`八丁堀`, `六本木`)는 건드리면 안 된다. → Task 1 테스트.
4. **`ヶ`/`ケ`/`が`·`ノ`/`の` 표기 흔들림** (`霞ヶ関` vs 데이터 `霞が関`) — `ヶ↔ケ`, `ノ↔の`는 통일, `が`는 통일하지 않는다(다른 글자). → Task 1 테스트로 `虎の門`이 `虎ノ門`과 맞는지 고정.
5. **해석 실패** — 무엇을 넣어도 빈 화면·에러로 끝나면 안 된다. "우편번호로 찾기"로 안내해야 한다. → Task 3에서 실패 메시지 + 기존 입력 유지.

---

## 파일 구조

| 파일 | 상태 | 책임 |
|------|------|------|
| `lib/jp-postal.ts` | 수정 | 데이터 소유. `matchKanjiPrefix()` 추가 (한자 접두사 → 후보) |
| `lib/jp-parse.ts` | 신규 | 붙여넣은 문장 → `{ result, block, building }` (순수 함수) |
| `lib/jp-parse.test.ts` | 신규 | 위 함수 테스트 (실제 데이터 사용 — 기존 `jp-postal.test.ts`와 같은 방식) |
| `lib/types.ts` | 수정 | `ParsedJpAddress`, `JpParseResponse` 타입 (클라이언트가 fs 모듈을 import하지 않도록 타입만 여기) |
| `app/api/jp-address/route.ts` | 수정 | `?q=` 분기 추가 |
| `components/JpPasteInput.tsx` | 신규 | 붙여넣기 칸 + 해석 미리보기 + 확인 버튼 |
| `app/page.tsx` | 수정 | 일본 탭에 붙여넣기 칸 배치, 기본 탭·탭 순서, H1·소개 문구 |
| `app/layout.tsx` | 수정 | 기본 메타 제목/설명에 일본 문구 추가 |
| `app/result/FieldMappingGuide.tsx` | 수정 | 일본 결과에 용도별 매핑(해외 쇼핑몰 / 비짓재팬웹 / EMS) |
| `app/guide/korea-region-names/page.tsx`, `lib/guides.ts` | 수정 | 제목·설명만 (CTR 개선) |

---

## PR-1 — 붙여넣기 해석 (핵심)

브랜치: `git switch -c jp-paste main`

### Task 1: 한자 접두사 검색 + 붙여넣기 해석 함수

**Files:**
- Modify: `lib/jp-postal.ts` (파일 끝에 추가)
- Create: `lib/jp-parse.ts`
- Modify: `lib/types.ts` (`JpSearchResponse` 아래에 추가)
- Test: `lib/jp-parse.test.ts`

**Interfaces:**
- Consumes: `lookupPostalCode(zip): JpAddressResult[]`, `normalizeZip(s): string` (기존, `lib/jp-postal.ts`)
- Produces:
  - `lib/jp-postal.ts`: `jpKey(s: string): string`, `matchKanjiPrefix(text: string, zip?: string): { result: JpAddressResult; matchedLength: number } | null`
  - `lib/jp-parse.ts`: `toHalfWidth(s: string): string`, `splitBlock(rest: string): { block: string; building: string }`, `parseJpAddress(input: string): ParsedJpAddress | null`
  - `lib/types.ts`: `type ParsedJpAddress = { result: JpAddressResult; block: string; building: string }`, `type JpParseResponse = { parsed: ParsedJpAddress | null }`
  - `block`은 결과 페이지의 `detail`로 그대로 넘기는 값 (예: `"5F, 1-2-3"`). `combineJpStreet(town, block)`가 앞에 붙여 `"5F, 1-2-3 Jingumae"`가 된다 — 일본우편 영문 표기 순서(호실·층 → 번지 → 동네)와 같다.

- [ ] **Step 1: 실패하는 테스트 작성** — `lib/jp-parse.test.ts`

```ts
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
```

> 주의: `虎の門` 테스트의 실제 우편번호 행 이름은 실행해 보고 `toMatch` 정규식이 맞는지 확인한다. `渋谷区神宮前`이 다른 현의 같은 이름과 겹치지 않는 것은 위 "데이터 사실"에서 확인됨.

- [ ] **Step 2: 실행해서 실패 확인**

Run: `npx vitest run lib/jp-parse.test.ts`
Expected: FAIL — `Cannot find module './jp-parse'`

- [ ] **Step 3: `lib/types.ts`에 타입 추가** (`JpSearchResponse` 바로 아래)

```ts
// 일본어 주소 한 줄을 해석한 결과. block은 결과 페이지 detail로 그대로 넘긴다(예: "5F, 1-2-3").
// building은 공식 영문 표기가 없는 건물명 원문 — 로마자로 바꾸지 않고 안내에만 쓴다.
export type ParsedJpAddress = {
  result: JpAddressResult;
  block: string;
  building: string;
};

export type JpParseResponse = {
  parsed: ParsedJpAddress | null;
};
```

- [ ] **Step 4: `lib/jp-postal.ts` 끝에 한자 접두사 검색 추가**

```ts
/** 표기 흔들림 통일용 비교 키. 글자 수는 그대로라 매칭 길이를 원문에 그대로 쓸 수 있다. */
export function jpKey(s: string): string {
  return s.replace(/ヶ/g, "ケ").replace(/ノ/g, "の");
}

type Entry = { zip: string; idx: number; full: string; noPref: string };

function toEntry(zip: string, r: JpTuple, idx: number): Entry {
  return { zip, idx, full: jpKey(r[3] + r[4] + r[5]), noPref: jpKey(r[4] + r[5]) };
}

let flat: Entry[] | null = null;

// ponytail: 12만 행 선형 탐색(요청당 ~30ms). 느려지면 현·시 단위 인덱스로.
function getFlat(): Entry[] {
  if (!flat) {
    flat = [];
    for (const [zip, rows] of Object.entries(getData())) {
      rows.forEach((r, idx) => flat!.push(toEntry(zip, r, idx)));
    }
  }
  return flat;
}

/**
 * text(공백 없는 일본어 주소)의 앞부분과 가장 길게 일치하는 "현+시+동네"(또는 현 생략 "시+동네") 행.
 * zip을 주면 그 우편번호의 행만 본다. matchedLength = text 앞에서 소비한 글자 수.
 */
export function matchKanjiPrefix(
  text: string,
  zip?: string,
): { result: JpAddressResult; matchedLength: number } | null {
  const key = jpKey(text);
  const z = zip ? normalizeZip(zip) : null;
  const pool = z ? (getData()[z] ?? []).map((r, idx) => toEntry(z, r, idx)) : getFlat();

  let best: { e: Entry; len: number } | null = null;
  for (const e of pool) {
    for (const p of [e.full, e.noPref]) {
      if (p && key.startsWith(p) && (!best || p.length > best.len)) best = { e, len: p.length };
    }
  }
  if (!best) return null;
  return { result: lookupPostalCode(best.e.zip)[best.e.idx], matchedLength: best.len };
}
```

- [ ] **Step 5: `lib/jp-parse.ts` 작성**

```ts
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
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `npx vitest run lib/jp-parse.test.ts && npm test && npx tsc --noEmit`
Expected: 전부 PASS. 실패하면 기대값을 고치지 말고 실제 데이터 행(`node -e 'console.log(require("./data/jp-postal.json")["1500001"])'`)을 먼저 확인.

- [ ] **Step 7: Commit**

```bash
git add lib/jp-postal.ts lib/jp-parse.ts lib/jp-parse.test.ts lib/types.ts
git commit -m "feat: 일본어 주소 한 줄 해석 (우편번호·한자 역검색·丁目番号 정규화)"
```

### Task 2: API `?q=` 분기

**Files:**
- Modify: `app/api/jp-address/route.ts`

**Interfaces:**
- Consumes: `parseJpAddress(input): ParsedJpAddress | null` (Task 1)
- Produces: `GET /api/jp-address?q=<문장>` → `200 { parsed: ParsedJpAddress | null }` (`JpParseResponse`). `?zip=` 동작은 그대로.

- [ ] **Step 1: 핸들러 수정** — 기존 `try` 블록 맨 앞에 추가하고 import 한 줄 추가

```ts
import { parseJpAddress } from "@/lib/jp-parse";
// …
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  try {
    // 일본어 주소 한 줄 붙여넣기. 길이 제한은 남용 방지(주소 한 줄은 200자를 넘지 않는다).
    if (q) return Response.json({ parsed: parseJpAddress(q.slice(0, 200)) });

    const results = lookupPostalCode(zip);
```

- [ ] **Step 2: 수동 확인**

Run: `npm run dev` 후 다른 터미널에서
`curl -s "http://localhost:3000/api/jp-address?q=$(node -p 'encodeURIComponent("〒150-0001 東京都渋谷区神宮前1-2-3 〇〇ビル5F")')"`
Expected: `{"parsed":{"result":{…"street":"Jingumae"…},"block":"5F, 1-2-3","building":"〇〇ビル"}}`
그리고 `?zip=100-0005`가 예전처럼 `{"results":[…]}`를 돌려주는지 확인.

- [ ] **Step 3: Commit**

```bash
git add app/api/jp-address/route.ts
git commit -m "feat: /api/jp-address에 ?q= (주소 한 줄 해석) 추가"
```

### Task 3: 붙여넣기 입력 칸

**Files:**
- Create: `components/JpPasteInput.tsx`
- Modify: `app/page.tsx` (일본 탭 렌더 부분)

**Interfaces:**
- Consumes: `GET /api/jp-address?q=` → `JpParseResponse` (Task 2), 기존 `handleJpSelect(result: JpAddressResult, block: string)` (`app/page.tsx`)
- Produces: `<JpPasteInput onSelect={(result, block) => void} />` — `JpAddressSearch`와 같은 `onSelect` 모양이라 홈 쪽 코드 변경이 한 줄이다.

동작: 사용자가 붙여넣고 **[변환]** 을 누르면 해석 결과를 미리보기로 보여주고(잘못 맞췄을 수 있으니 바로 이동하지 않음), **[이 주소로 영문 보기]** 를 누르면 결과 페이지로 간다. 해석 실패 시 "아래 우편번호로 찾기를 써주세요" 안내. 붙여넣기는 버튼 방식이라 debounce·드롭다운이 필요 없다.

- [ ] **Step 1: 컴포넌트 작성** — `components/JpPasteInput.tsx`

```tsx
"use client";

import { useState } from "react";
import type { JpAddressResult, JpParseResponse, ParsedJpAddress } from "@/lib/types";

type Props = { onSelect: (result: JpAddressResult, block: string) => void };

// 일본어 주소 한 줄을 통째로 붙여넣는 주 입력. 예약 확인 메일의 주소를 그대로 복사해 오는 상황을 위해.
export default function JpPasteInput({ onSelect }: Props) {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState<ParsedJpAddress | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "fail" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("loading");
    setParsed(null);
    try {
      const res = await fetch(`/api/jp-address?q=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as JpParseResponse;
      setParsed(data.parsed);
      setStatus(data.parsed ? "idle" : "fail");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="jp-paste" className="mb-2 block text-sm font-semibold text-gray-900">
        일본어 주소 붙여넣기
      </label>
      <textarea
        id="jp-paste"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="〒150-0001 東京都渋谷区神宮前1-2-3 〇〇ビル5F"
        className="w-full resize-none rounded-lg border border-border px-4 py-3 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
      <p className="mt-1.5 text-xs text-gray-500">
        예약 확인 메일·호텔 홈페이지의 주소를 그대로 복사해 넣으세요. 우편번호가 없어도 됩니다.
      </p>
      <button
        type="submit"
        disabled={status === "loading" || !text.trim()}
        className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "loading" ? "해석 중…" : "변환"}
      </button>

      {status === "fail" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          주소를 알아보지 못했어요. 아래 <b>우편번호로 찾기</b>를 써주세요.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          일시적인 오류가 났어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      {parsed && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm">
          <p className="text-gray-700">
            {parsed.result.japanese} → <b>{parsed.result.englishLabel}</b> ({parsed.result.english.postalCode})
          </p>
          {parsed.block && <p className="mt-1 text-gray-700">번지·층/호: {parsed.block}</p>}
          {parsed.building && (
            <p className="mt-1 text-gray-600">
              건물명 「{parsed.building}」은 공식 영문 표기가 없어 넣지 않았어요. 필요하면 다음 화면의
              상세주소 칸에 직접 로마자로 적어주세요.
            </p>
          )}
          <button
            type="button"
            onClick={() => onSelect(parsed.result, parsed.block)}
            className="mt-3 rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-gray-800"
          >
            이 주소로 영문 보기
          </button>
        </div>
      )}
    </form>
  );
}
```

> 버튼·입력 스타일은 `components/JpAddressSearch.tsx`의 기존 클래스와 맞춰 조정한다(같은 화면에 두 입력이 나란히 있으므로). 새 색·토큰을 만들지 않는다.

- [ ] **Step 2: 홈에 배치** — `app/page.tsx`

import 추가: `import JpPasteInput from "@/components/JpPasteInput";`
일본 탭 렌더를 아래로 교체:

```tsx
          ) : (
            <>
              <JpPasteInput onSelect={handleJpSelect} />
              <p className="mb-3 text-sm font-semibold text-gray-900">또는 우편번호로 찾기</p>
              <JpAddressSearch onSelect={handleJpSelect} />
            </>
          )}
```

- [ ] **Step 3: 브라우저로 확인** (`npm run dev`, http://localhost:3000 → 일본 탭)

확인할 입력과 기대:
1. `〒150-0001 東京都渋谷区神宮前1-2-3 〇〇ビル5F` → 미리보기 `Jingumae, Shibuya-ku, Tokyo (150-0001)`, `5F, 1-2-3`, 건물명 안내 → 버튼 → 결과 Street `5F, 1-2-3 Jingumae`
2. `渋谷区神宮前1丁目2番3号` → 같은 동네, `1-2-3`
3. `hello` → 실패 안내, 아래 우편번호 칸 그대로 사용 가능
4. 우편번호 칸의 자동완성 드롭다운이 카드 밖으로 잘리지 않는지 (overflow 회귀)
5. 모바일 폭(375px)에서 textarea·버튼이 넘치지 않는지

- [ ] **Step 4: 전체 검증 + Commit**

Run: `npm test && npx tsc --noEmit && npm run lint`

```bash
git add components/JpPasteInput.tsx app/page.tsx
git commit -m "feat: 일본어 주소 붙여넣기 입력 (해석 미리보기 후 결과로 이동)"
```

PR-1 열기: `gh pr create --title "feat: 일본어 주소 붙여넣기 변환" --body …` → 머지 → Vercel 자동 배포 → 실서버에서 Step 3의 1번 입력 재확인.

---

## PR-2 — 홈 첫인상 + 결과 화면 용도별 매핑

브랜치: `git switch -c jp-home main` (PR-1 머지 후)

### Task 4: 홈 탭·문구·메타

**Files:**
- Modify: `app/page.tsx` (`useState<Tab>`, 탭 버튼 순서, H1·부제, 소개 h2/본문)
- Modify: `app/layout.tsx` (`metadata.title.default`, `defaultDescription`, openGraph/twitter `title`)

**Interfaces:** 없음 (화면 문구만). `handleKrSelect`/`handleJpSelect` 변경 없음.

- [ ] **Step 1: 기본 탭 (D1)** — `useState<Tab>("kr")` → `useState<Tab>("jp")`. 탭 버튼 두 개의 순서를 바꿔 **일본이 왼쪽**. (D1을 "한국 유지"로 정했다면 이 Step은 건너뛰고 문구만.)

- [ ] **Step 2: H1·부제**

```tsx
// H1
일본·한글 주소 → 영문 변환기
// 부제
일본어 주소를 붙여넣으면 비짓재팬웹·EMS·해외 쇼핑몰 칸에 맞춰 영문으로 나눠드려요
```

소개 섹션 h2를 `일본·한글 주소를 영문으로 쉽고 정확하게`로, 첫 문단의 "도로명·지번·일본 우편번호 주소"를 "일본어 주소(붙여넣기·우편번호)와 한국 도로명·지번 주소"로.

- [ ] **Step 3: 메타 (더하기만)** — `app/layout.tsx`

```ts
default: "한글·일본 주소 → 영문 변환기 | 일본 주소 영문 변환·도로명 영문주소",
```

`defaultDescription` 첫 문장 앞에 `일본 주소를 붙여넣으면 영문 주소로 바꿔 비짓재팬웹·우체국 EMS·해외 쇼핑몰 칸별로 복사할 수 있어요.`를 추가하고, 기존 한국 문장은 뒤에 남긴다. `keywords`에 `"일본주소 영문변환"`, `"일본 주소 영어로"`, `"비짓재팬웹 주소"` 추가. openGraph/twitter `title`은 그대로(공유 카드 변화 최소화).

- [ ] **Step 4: 확인 + Commit**

`npm run dev`에서 홈 첫 화면이 일본 탭·붙여넣기 칸으로 열리는지, 한국 탭 전환·검색이 그대로 되는지. `npm run build`로 메타 오류 없는지.

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: 홈 첫 화면을 일본 주소 변환 중심으로 (기본 탭·문구·메타)"
```

### Task 5: 결과 화면 용도별 매핑 (D2 확인 결과에 따라)

**Files:**
- Modify: `app/result/FieldMappingGuide.tsx`

**Interfaces:**
- Consumes: 기존 `Country`, `GuideRow`, `JP_ROWS`
- Produces: 일본 결과에서 섹션 최대 3개. 서버 컴포넌트 유지(크롤러가 읽는 본문).

- [ ] **Step 1: 칸 이름 확인 (코드 쓰기 전)**

| 용도 | 확인처 | 기록할 것 |
|------|--------|-----------|
| 비짓재팬웹 숙소 주소 | services.digital.go.jp 공식 안내 / 사용자 캡처(D2) | 실제 칸 라벨(영문·일문 그대로), 우편번호 칸 유무 |
| 우체국 EMS 스마트접수 (일본행) | ems.epost.go.kr 받는 사람 입력 화면 / 공식 안내 | 받는 사람 주소 칸 라벨, 칸 개수 |

각 확인처 URL과 확인 날짜를 해당 배열 위 주석에 남긴다. **확인 못 한 용도는 배열을 만들지 않고 Step 3에서 빠진다.**

- [ ] **Step 2: 확인된 것만 배열로** — `JP_ROWS` 아래, 기존과 같은 형식. `<…>` 자리는 Step 1에서 확인한 실제 라벨·URL·날짜로 채운다:

```ts
// 비짓재팬웹 — 확인: <URL> (<YYYY-MM-DD>)
const JP_VJW_ROWS: GuideRow[] = [
  { foreign: "<확인한 칸 라벨>", field: "Street Address", note: "…" },
  // …
];
```

> 이 Step만 예외적으로 값이 비어 있다: 지어내지 않기 위해서다. 확인이 안 되면 이 배열 자체를 만들지 않는다.

- [ ] **Step 3: 섹션 렌더** — `country === "jp"`일 때 `[{ title: "해외 쇼핑몰", rows: JP_ROWS }, { title: "비짓재팬웹", rows: JP_VJW_ROWS }, { title: "우체국 EMS", rows: JP_EMS_ROWS }]` 중 정의된 것만 순서대로, 기존 표 마크업을 섹션별로 반복 렌더(제목 `h3` + 기존 표). 한국(`kr`)은 그대로. 기존 `<details>`의 `overflow-hidden`은 드롭다운이 없는 정적 카드라 유지해도 된다.

- [ ] **Step 4: 확인 + Commit**

`/result?street=Jingumae&city=Shibuya-ku&state=Tokyo&zip=150-0001&ko=東京都渋谷区神宮前&detail=1-2-3&country=jp`에서 섹션이 보이는지, `country=kr`은 변화 없는지. `curl -s <위 URL> | grep "비짓재팬웹"`으로 서버 HTML에 본문이 있는지(크롤러용).

```bash
git add app/result/FieldMappingGuide.tsx
git commit -m "feat: 일본 결과에 용도별(비짓재팬웹·EMS·쇼핑몰) 칸 매핑"
```

PR-2 열기 → 머지 → 배포.

---

## PR-3 — korea-region-names 제목·설명 (노출 6,621 / CTR 1.2%)

### Task 6: 제목에 답을 바로 보이게

**Files:**
- Modify: `app/guide/korea-region-names/page.tsx:12-17` (metadata만)
- Modify: `lib/guides.ts` (`/guide/korea-region-names` 항목의 `title`·`desc`만. `verified`·`dateModified`는 건드리지 않음)

- [ ] **Step 1: 검색어 확인** — 서치콘솔 → 실적 → 페이지 필터 `/guide/korea-region-names` → 검색어 탭 상위 10개를 이 계획 하단 "측정 기록"에 붙여넣는다. 아래 문구는 handoff의 `province 서울` 계열 기준 초안이며, 상위 검색어가 다르면 그 단어로 바꾼다.

- [ ] **Step 2: 문구 교체**

```ts
title: "서울 영문 Seoul · 경기도 Gyeonggi-do — 시·도 영문 표기표 (City·State)",
description:
  "서울은 State/Province 칸에 Seoul, 경기도는 Gyeonggi-do. 전국 시·도 공식 영문 표기와 City·State·우편번호 칸에 무엇을 넣는지 한 표로 정리했습니다.",
```

`lib/guides.ts`의 `title`/`desc`도 같은 방향으로(목록 카드용이라 조금 짧게). 본문은 손대지 않는다.

- [ ] **Step 3: 검증 + Commit**

Run: `npm test` (`lib/guides.test.ts`가 링크·날짜 형식 확인) `&& npx tsc --noEmit`

```bash
git add app/guide/korea-region-names/page.tsx lib/guides.ts
git commit -m "chore: 시·도 영문 표기표 제목·설명에 답을 바로 노출 (CTR 개선)"
```

---

## 배포 후 측정 (코드 아님)

- 배포 2~4주 후 서치콘솔에서 비교 (기준값 = handoff §1):
  - `일본주소 영문변환` 32클릭/363노출, `일본 주소 영문 변환` 27/256
  - 홈 `/` 141/2,258, `/guide/korea-region-names` 77/6,621 (CTR 1.2%)
- Vercel Analytics에서 일본 탭 결과 페이지(`country=jp`) 비중.
- 그다음 애드센스 6차 신청 여부 판단. **신청 자체가 목표가 아니다.**

## 측정 기록

(Task 6 Step 1의 검색어, 배포 후 수치를 여기 적는다)

## 이번에 일부러 안 하는 것

- `Marunochi` 같은 일본우편 로마자 장음 보정 — 배달엔 지장 없음, 문의가 오면 검토.
- 건물명 로마자 변환 — 공식 표기가 없어 틀린 값을 만들 위험이 더 크다.
- 일본 전용 페이지·새 가이드 글 — 순위 분산 위험, 범위 밖.
- `?tab=jp` URL 파라미터 — D1이 일본 기본이면 불필요. D1을 한국 유지로 정하면 그때 Task 4에 추가.
