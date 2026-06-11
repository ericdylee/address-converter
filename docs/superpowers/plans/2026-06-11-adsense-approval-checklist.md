# 애드센스 승인률 최대화 보완 작업 — 작업지시서

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 애드센스 검토 요청(Request review) 제출 전, 사이트의 기능 결함·콘텐츠 부족·품질 신호를 모두 보완해 승인 확률을 최대화한다.

**Architecture:** 코드 변경은 5개(P0 버그 수정, 가이드 글 1편 추가, UX 카피 2건, 접근성 1건, 404 페이지) + 문서/저장소 정리 1개. 모두 기존 Next.js App Router 구조와 디자인 토큰을 그대로 따른다. 새 라이브러리 없음. 마지막에 배포 검증과 사용자가 직접 할 콘솔 작업 체크리스트가 있다.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · vitest

**배경 (2026-06-11 감사 결과):** `.impeccable/critique/2026-06-11T02-33-40Z__app.md` 참고. 핵심 발견 = 자동완성 드롭다운이 검색 카드의 `overflow-hidden`에 잘려 마우스/터치로 후보 선택이 불가능한 P0 버그(커밋 `5a9c868`에서 유입, 프로덕션 라이브 중).

**공통 규칙:**
- 각 Task 완료 시마다 커밋. 커밋 메시지는 기존 컨벤션(한국어, `fix:`/`feat:`/`chore:` 접두사)을 따르고 끝에 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` 트레일러를 붙인다.
- 모든 Task에서 회귀 확인 명령은 동일: `npm test && npx tsc --noEmit && npm run lint` (전부 통과해야 커밋).
- 이번 작업은 신규 비즈니스 로직이 없어 새 단위 테스트는 없다(CSS/마크업/카피 변경). 대신 Task 1·8에 시각 검증 절차가 있다.

---

### Task 1: [P0] 자동완성 드롭다운 잘림 수정

**왜:** 후보 목록이 카드에 잘려 ~19px만 보임 → 핵심 기능이 사실상 차단. 애드센스 검토자가 "동작하지 않는 사이트"로 판단할 수 있는 최우선 결함.

**Files:**
- Modify: `app/page.tsx:69-71`

**원리:** 드롭다운(`position: absolute`)이 검색 카드 `<section>` 안에 있는데, 이 section에 `overflow-hidden`(밖으로 넘치는 내용을 잘라냄)이 걸려 있어 카드 밖으로 펼쳐져야 할 드롭다운까지 잘린다. `overflow-hidden`은 에어메일 줄무늬의 위 모서리를 둥글게 만들려고 넣었던 것이므로, section에서는 빼고 줄무늬 div에 직접 `rounded-t-lg`를 준다.

- [ ] **Step 1: app/page.tsx 수정**

기존 (69-71행):
```tsx
        <section className="overflow-hidden rounded-lg border border-border bg-white shadow-card">
          {/* 에어메일 줄무늬 — 검색 카드가 이 화면의 주인공임을 표시하는 시그니처 */}
          <div className="airmail-stripe h-1.5" aria-hidden="true" />
```

변경 후:
```tsx
        <section className="rounded-lg border border-border bg-white shadow-card">
          {/* 에어메일 줄무늬 — 검색 카드가 이 화면의 주인공임을 표시하는 시그니처.
              줄무늬 모서리는 직접 둥글게 처리 (section에 overflow-hidden을 주면
              자동완성 드롭다운까지 잘리므로 금지 — 2026-06-11 P0 회귀의 원인). */}
          <div className="airmail-stripe h-1.5 rounded-t-lg" aria-hidden="true" />
```

주의: `app/result/page.tsx:33`의 `FullAddressBlock`에도 `overflow-hidden` + 줄무늬 조합이 있지만 그 카드 안에는 드롭다운이 없으므로 **건드리지 않는다**.

- [ ] **Step 2: 시각 검증 (dev 서버)**

```bash
npm run dev
```

브라우저(또는 Playwright)로 `http://localhost:3000` 접속 → 검색창에 `테헤란로 152` 입력 → **후보 목록 전체(주소 텍스트 포함)가 잘리지 않고 보이는지** 확인. 자동 검증을 원하면 드롭다운이 열린 상태에서 devtools 콘솔에:

```js
const lb = document.getElementById("address-search-listbox");
let el = lb.parentElement, clipped = false;
while (el) {
  const s = getComputedStyle(el);
  if (s.overflow.includes("hidden") || s.overflowY === "hidden") clipped = true;
  el = el.parentElement;
}
console.log(clipped ? "FAIL: 아직 잘림" : "PASS: 잘림 없음");
```

Expected: `PASS: 잘림 없음`. 또한 줄무늬 위 모서리가 카드 모서리 밖으로 삐져나오지 않는지 눈으로 확인. JP 탭에서도 우편번호 `1000005` 입력 → 후보가 온전히 보이는지 확인.

- [ ] **Step 3: 회귀 확인**

```bash
npm test && npx tsc --noEmit && npm run lint
```
Expected: 모두 통과.

- [ ] **Step 4: 커밋**

```bash
git add app/page.tsx
git commit -m "fix: 자동완성 드롭다운이 검색 카드 overflow-hidden에 잘리던 P0 버그 수정

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: 일본 주소 영문 표기법 가이드 글 추가

**왜:** 도구 사이트의 1순위 애드센스 거절 사유가 "콘텐츠 부족(Low value content)". 일본 변환 기능은 있는데 일본 가이드 글이 없다 — 승인과 SEO 양쪽에 효과가 가장 큰 콘텐츠.

**Files:**
- Create: `app/guide/japan-address/page.tsx`
- Modify: `app/guide/page.tsx:12-25` (articles 배열)
- Modify: `app/sitemap.ts:22-31` (entry 추가)

- [ ] **Step 1: app/guide/japan-address/page.tsx 생성** (기존 `app/guide/english-address/page.tsx`와 같은 구조·클래스 사용)

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";

export const metadata: Metadata = {
  title: "일본 주소, 영문으로 쓰는 법",
  description:
    "일본 주소를 영문(로마자)으로 작성하는 방법을 정리했습니다. 영문 주소의 어순, 도도부현·시구정촌 구분, 丁目·番地·号의 숫자 표기, 우편번호 형식, 실제 변환 예시까지 예시 중심으로 설명합니다.",
  alternates: { canonical: "/guide/japan-address" },
};

export default function JapanAddressGuide() {
  return (
    <ContentLayout
      title="일본 주소, 영문으로 쓰는 법"
      lead="일본 주소도 영문으로 쓸 때는 순서가 반대가 됩니다. 우편번호와 丁目·番地·号 규칙만 알면 어렵지 않습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            1. 영문 일본 주소는 순서가 반대입니다
          </h2>
          <p>
            일본어 주소는 <strong className="font-semibold text-gray-900">큰 단위 → 작은 단위</strong>{" "}
            순서로 씁니다(도도부현 → 시·구 → 동네 → 번지). 영문으로 쓸 때는
            한국 주소와 마찬가지로{" "}
            <strong className="font-semibold text-gray-900">작은 단위 → 큰 단위</strong>{" "}
            순서로 뒤집습니다. 번지가 맨 앞, 도도부현과 우편번호가 뒤로 갑니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            2. 일본 주소의 구성요소와 영문 대응
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">일본어</th>
                  <th className="px-4 py-2 font-semibold">영문 필드</th>
                  <th className="px-4 py-2 font-semibold">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2">丁目·番地·号 (번지)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Street Address 앞부분</td>
                  <td className="px-4 py-2 font-mono">1-1-1</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">町域 (동네 이름)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Street Address 뒷부분</td>
                  <td className="px-4 py-2 font-mono">Marunouchi</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">건물명·호수</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Address Line 2</td>
                  <td className="px-4 py-2 font-mono">Sakura Bldg. 5F</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">市·区·町·村 (시구정촌)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">City</td>
                  <td className="px-4 py-2 font-mono">Chiyoda-ku</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">都道府県 (도도부현)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">State / Prefecture</td>
                  <td className="px-4 py-2 font-mono">Tokyo</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">郵便番号 (우편번호 7자리)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Postal Code</td>
                  <td className="px-4 py-2 font-mono">100-0005</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">국가</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Country</td>
                  <td className="px-4 py-2 font-mono">Japan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            3. 실제 변환 예시
          </h2>
          <p className="mb-3">
            예를 들어 다음 일본어 주소를 영문으로 바꾸면 이렇게 됩니다.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
                일본어
              </div>
              <div className="text-gray-900">
                〒100-0005 東京都千代田区丸の内1丁目1番1号
              </div>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
                영문
              </div>
              <div className="break-words font-mono text-gray-950">
                1-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005, Japan
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            4. 丁目·番地·号는 하이픈 숫자로 씁니다
          </h2>
          <p>
            “1丁目2番3号”처럼 단위가 붙은 번지는 영문에서{" "}
            <span className="font-mono">1-2-3</span> 처럼 하이픈으로 이어 적는
            것이 표준입니다. 일본 우편(Japan Post)의 로마자 표기도 이 방식을
            씁니다. 이 도구의 일본 탭에서 우편번호로 동네까지 찾은 뒤,
            번지 칸에 <span className="font-mono">1-2-3</span> 형태로 입력하면
            Street 칸 맨 앞에 자동으로 합쳐집니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            5. 건물명과 호수는 어떻게 쓰나요
          </h2>
          <p>
            건물명은 로마자로 적고 층/호를 뒤에 붙입니다(예: サクラビル 5階 →{" "}
            <span className="font-mono">Sakura Bldg. 5F</span>). 해외 양식에
            Address Line 2(또는 Apartment/Suite/Unit) 칸이 있으면 건물명·호수만
            그 칸에 적고, 없으면 Street 칸 끝에 이어 적으면 됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            6. 자주 하는 실수
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Tokyo를 City 칸에 넣기 — Tokyo는 도도부현이므로 State/Prefecture
              칸에 넣고, City에는 시·구(예: Chiyoda-ku)를 넣습니다.
            </li>
            <li>
              우편번호 하이픈 누락 — 일본 우편번호는{" "}
              <span className="font-mono">100-0005</span> 처럼 3자리-4자리
              형식입니다.
            </li>
            <li>
              주소를 일본어 순서 그대로 적기 — 영문은 번지부터 시작해야
              합니다.
            </li>
            <li>국가(Japan) 누락 — 국제 배송에는 반드시 국가가 필요합니다.</li>
          </ul>
        </section>
      </article>

      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/70 p-5 text-center">
        <p className="text-sm text-blue-900">
          직접 변환해 보세요 —{" "}
          <Link href="/" className="font-semibold text-blue-700 hover:underline">
            주소 변환기로 이동 →
          </Link>
        </p>
      </div>
    </ContentLayout>
  );
}
```

- [ ] **Step 2: 가이드 목록에 글 추가** — `app/guide/page.tsx`의 `articles` 배열 끝(`overseas-shopping` 항목 뒤)에 추가:

```tsx
  {
    href: "/guide/japan-address",
    title: "일본 주소, 영문으로 쓰는 법",
    desc: "도도부현·시구정촌 구분, 丁目·番地·号의 하이픈 표기, 우편번호 형식까지 일본 주소 로마자 표기 규칙을 정리했습니다.",
    example: "東京都千代田区丸の内1-1-1 → 1-1-1 Marunouchi, Chiyoda-ku, Tokyo",
  },
```

- [ ] **Step 3: sitemap에 추가** — `app/sitemap.ts`의 return 배열에서 `entry("/guide/overseas-shopping", 0.8, "monthly")` 줄 아래에 추가:

```ts
    entry("/guide/japan-address", 0.8, "monthly"), // 일본 주소 영문 표기법
```

- [ ] **Step 4: 로컬 확인**

```bash
npm run dev
```
`http://localhost:3000/guide/japan-address` 접속 → 글이 기존 가이드와 같은 레이아웃으로 보이는지, `/guide` 목록에 카드가 추가됐는지, `http://localhost:3000/sitemap.xml`에 URL이 들어갔는지 확인.

- [ ] **Step 5: 회귀 확인 후 커밋**

```bash
npm test && npx tsc --noEmit && npm run lint
git add app/guide/japan-address/page.tsx app/guide/page.tsx app/sitemap.ts
git commit -m "feat: 일본 주소 영문 표기법 가이드 글 추가 (애드센스 콘텐츠 보강)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: "검색 결과 없음" 메시지에 재검색 안내 추가

**왜:** 막다른 메시지는 이탈 지점. 다음 행동을 알려주면 사용자가 흐름을 이어간다 (감사 P2).

**Files:**
- Modify: `components/AddressSearch.tsx:294-298`
- Modify: `components/JpAddressSearch.tsx:289-293`

- [ ] **Step 1: AddressSearch.tsx 결과 없음 블록 교체**

기존:
```tsx
      {open && !loading && results.length === 0 && trimmedLength >= 2 && !error && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-gray-500 shadow-dropdown">
          검색 결과가 없습니다.
        </div>
      )}
```

변경 후:
```tsx
      {open && !loading && results.length === 0 && trimmedLength >= 2 && !error && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-gray-500 shadow-dropdown">
          <p className="font-medium text-gray-700">검색 결과가 없습니다.</p>
          <p className="mt-1 text-xs leading-5">
            도로명+건물번호(예: 테헤란로 152)나 건물명으로 다시 검색해 보세요.
            띄어쓰기를 바꾸거나 일부만 입력해도 좋습니다.
          </p>
        </div>
      )}
```

- [ ] **Step 2: JpAddressSearch.tsx 결과 없음 블록 교체**

기존:
```tsx
      {open && !loading && results.length === 0 && digits.length === 7 && !error && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-gray-500 shadow-dropdown">
          해당 우편번호를 찾을 수 없습니다.
        </div>
      )}
```

변경 후:
```tsx
      {open && !loading && results.length === 0 && digits.length === 7 && !error && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-gray-500 shadow-dropdown">
          <p className="font-medium text-gray-700">해당 우편번호를 찾을 수 없습니다.</p>
          <p className="mt-1 text-xs leading-5">
            숫자 7자리를 다시 확인해 주세요. 우편번호는 일본 우편(Japan Post)
            사이트나 받는 분에게 확인할 수 있습니다.
          </p>
        </div>
      )}
```

- [ ] **Step 3: 회귀 확인 후 커밋**

```bash
npm test && npx tsc --noEmit && npm run lint
git add components/AddressSearch.tsx components/JpAddressSearch.tsx
git commit -m "feat: 검색 결과 없음 메시지에 재검색 팁 추가

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: placeholder 명도 대비 개선 (접근성)

**왜:** `placeholder:text-gray-400`(#9ca3af)은 흰 배경 대비 약 2.8:1로 WCAG AA 기준(4.5:1) 미달. 저시력 사용자가 예시를 읽기 어렵다 (감사 P3, PRODUCT.md의 "전 국민 사용자층" 원칙).

**Files:**
- Modify: `components/AddressSearch.tsx:179`
- Modify: `components/JpAddressSearch.tsx:172, 250`
- Modify: `app/result/page.tsx:262`

- [ ] **Step 1: 네 곳의 입력창 클래스에서 `placeholder:text-gray-400` → `placeholder:text-gray-500`로 일괄 치환**

```bash
grep -rn "placeholder:text-gray-400" components app
```
위 4개 위치(AddressSearch 1, JpAddressSearch 2, result 1)가 전부인지 확인 후 각 파일에서 치환. 다른 클래스는 건드리지 않는다.

- [ ] **Step 2: 회귀 확인 후 커밋**

```bash
npm test && npx tsc --noEmit && npm run lint
git add components/AddressSearch.tsx components/JpAddressSearch.tsx app/result/page.tsx
git commit -m "fix: 입력창 placeholder 명도 대비 개선 (gray-400 → gray-500, WCAG AA)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: 개인정보처리방침에 일본 우편번호 조회 명시

**왜:** 방침 §1이 행안부 API만 언급하는데 실제로는 일본 우편번호 조회(`/api/jp-address`)도 있다. 방침과 실제 동작의 불일치는 애드센스/신뢰 양쪽에 마이너스 (감사 P3).

**Files:**
- Modify: `app/privacy/page.tsx:21, 30-37`

- [ ] **Step 1: §1 문단 교체 + 수정일 갱신**

21행 기존:
```tsx
          <p className="mt-2 text-xs text-gray-500">시행일 · 최종 수정일: 2026-06-04</p>
```
변경 후:
```tsx
          <p className="mt-2 text-xs text-gray-500">시행일: 2026-06-04 · 최종 수정일: 2026-06-11</p>
```

§1 문단(34-36행) 기존:
```tsx
              서비스는 회원가입이나 로그인 기능이 없으며, 이름·연락처 등 이용자의 개인정보를 직접
              수집하거나 저장하지 않습니다. 이용자가 입력한 주소 검색어는 영문 변환을 위해
              행정안전부 도로명주소 영문 API 조회에만 사용되며, 서버에 저장하지 않습니다.
```
변경 후:
```tsx
              서비스는 회원가입이나 로그인 기능이 없으며, 이름·연락처 등 이용자의 개인정보를 직접
              수집하거나 저장하지 않습니다. 이용자가 입력한 주소 검색어는 영문 변환을 위해
              행정안전부 도로명주소 영문 API 조회 및 일본 우편번호 데이터(일본우편 기반) 조회에만
              사용되며, 서버에 저장하지 않습니다.
```

- [ ] **Step 2: 회귀 확인 후 커밋**

```bash
npm test && npx tsc --noEmit && npm run lint
git add app/privacy/page.tsx
git commit -m "docs: 개인정보처리방침에 일본 우편번호 조회 명시 + 수정일 갱신

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: 커스텀 404 페이지 추가

**왜:** 현재 404는 Next.js 기본(영문, 사이트 디자인과 무관). 검토자·사용자가 깨진 링크를 만났을 때 사이트 안으로 되돌리는 품질 신호 (감사 추가 발견).

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: app/not-found.tsx 생성**

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

// App Router 규약: app/not-found.tsx 가 404 화면을 담당한다.
// 레이아웃(헤더/푸터)은 layout.tsx 가 그대로 감싸준다.
export default function NotFound() {
  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase text-gray-400">404</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-gray-600">
          주소가 바뀌었거나 잘못 입력된 링크일 수 있어요. 아래에서 원하는
          페이지로 이동해 주세요.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            주소 변환기로 이동
          </Link>
          <Link
            href="/guide"
            className="rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-field transition-colors hover:border-blue-300"
          >
            사용 가이드 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: 로컬 확인** — `npm run dev` 후 `http://localhost:3000/없는페이지` 접속 → 위 화면 + 헤더/푸터가 보이는지 확인.

- [ ] **Step 3: 회귀 확인 후 커밋**

```bash
npm test && npx tsc --noEmit && npm run lint
git add app/not-found.tsx
git commit -m "feat: 커스텀 404 페이지 추가 (홈·가이드로 복귀 동선)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: 저장소 정리 (.gitignore)

**왜:** 감사 과정의 스크린샷·도구 산출물이 미추적 상태로 남아 있다. 실수로 커밋되는 것을 방지.

**Files:**
- Modify: `.gitignore`
- Delete: `audit-*.png` (2026-06-11 감사 스크린샷 6장 — 크리틱 문서에 결론이 기록돼 있어 보관 불필요)

- [ ] **Step 1: .gitignore 끝에 추가**

```gitignore

# 디자인 감사/브라우저 점검 산출물
.impeccable/
.playwright-mcp/
audit-*.png
result-page.png
```

- [ ] **Step 2: 감사 스크린샷 삭제 후 커밋**

```bash
rm -f audit-home-desktop.png audit-home-dropdown.png audit-dropdown2.png audit-dropdown3.png audit-home-mobile-dropdown.png audit-jp-tab.png audit-result-desktop.png audit-result-mobile.png audit-guide-article.png
git add .gitignore
git commit -m "chore: 디자인 감사 산출물 gitignore 추가

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

주의: `result-page.png`는 사용자가 만든 파일일 수 있으므로 삭제하지 말고 ignore만 한다.

---

### Task 8: 배포 및 프로덕션 검증

**왜:** `NEXT_PUBLIC_*` 인라인·자동배포 특성상, 라이브에서 직접 확인해야 끝난 것이다. (메모리: 웹훅이 가끔 누락됨 → 빈 커밋으로 재트리거)

- [ ] **Step 1: 프로덕션 빌드 사전 확인**

```bash
npm run build
```
Expected: 에러 없이 완료. (`/guide/japan-address` 라우트가 빌드 목록에 보여야 함)

- [ ] **Step 2: push (main 직행 — 이 저장소의 평소 방식)**

```bash
git push origin main
```

- [ ] **Step 3: 배포 완료 대기 후 라이브 검증**

2~3분 후:
```bash
curl -s -o /dev/null -w "guide/japan-address: %{http_code}\n" https://address-converter.com/guide/japan-address
curl -s https://address-converter.com/sitemap.xml | grep -c "japan-address"
curl -s -o /dev/null -w "404 custom: %{http_code}\n" https://address-converter.com/no-such-page
```
Expected: `200`, `1`, `404`. 셋 중 하나라도 이전 값이면 배포 누락 — `git commit --allow-empty -m "chore: 배포 재트리거" && git push`로 재트리거.

- [ ] **Step 4: 라이브에서 P0 수정 시각 확인** — 브라우저로 `https://address-converter.com` 접속, `테헤란로 152` 입력 → **후보 목록이 온전히 펼쳐지는지** 데스크톱·모바일 폭(375px) 모두 확인. 이것이 이 플랜의 최종 합격 기준.

---

### Task 9: 제출 전 최종 체크 (사용자가 콘솔에서 직접)

코드 작업이 아니므로 에이전트는 안내만 한다. 사용자(ericdylee1@gmail.com 계정)가 직접:

- [ ] **Search Console 색인 확인** — [Google Search Console](https://search.google.com/search-console) → `address-converter.com` 속성 → "URL 검사"에 `https://address-converter.com/` 입력. "URL이 Google에 등록되어 있음"이면 OK. 아니면 "색인 생성 요청" 클릭. 같은 방법으로 `/guide/english-address`, `/guide/japan-address`도 요청해 두면 좋다.
- [ ] **(선택) 네이버 서치어드바이저**에도 사이트맵 제출 — 한국 트래픽 확보에 도움(승인 후 수익에도 기여).
- [ ] **애드센스 검토 요청** — [AdSense 콘솔](https://adsense.google.com) → 사이트 → `address-converter.com` → **검토 요청(Request review)** 클릭. 심사는 보통 며칠~2주.
- [ ] 심사 기간 동안 사이트를 내리거나 큰 구조 변경을 하지 않는다.

---

## 백로그 (승인과 무관 — 이번에 하지 않음)

- OG 이미지(`app/opengraph-image.tsx`) — 공유 미리보기 카드. SNS 유입 생기면.
- 가이드 글 추가 주제: "국제우편·EMS 영문 주소 라벨 쓰는 법", "영문 주소 Q&A 모음".
- GA4 등 방문자 분석 도구 — 승인 후 광고 최적화 단계에서.
- 다크모드 (DESIGN.md 백로그 항목 그대로).

## Self-Review 결과

- 감사에서 나온 P0(드롭다운)·P2(결과 없음 메시지)·P3(placeholder 대비, privacy 일본 언급)·추가 발견(404, 저장소 정리)이 각각 Task 1·3·4·5·6·7에 매핑됨 — 누락 없음.
- 콘텐츠 보강(승인률 핵심)은 Task 2, 배포 검증은 Task 8, 콘솔 작업은 Task 9로 분리.
- placeholder/TBD 없음. 모든 코드 스텝에 실제 코드 포함. 파일 경로·행 번호는 2026-06-11 HEAD(`b3d7e17`) 기준.
