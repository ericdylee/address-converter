# SEO 마무리 + 애드센스 재승인 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 이미 로컬에서 진행된 콘텐츠 보강 위에 ① 원본 가이드 5편 심화 ② 기술 SEO(측정 도구·구조화 데이터)를 얹어, 검색 트래픽을 늘리고 애드센스 3차 재승인 성공 확률을 높인다.

**Architecture:** Next.js 16 App Router 정적 콘텐츠 사이트. 콘텐츠는 `ContentLayout` + `createPageMetadata` 패턴을 따르고, 구조화 데이터는 순수 빌더 함수(`lib/structured-data.ts`) + 재사용 `<JsonLd>` 컴포넌트로 DRY하게 주입한다. 측정은 Vercel Analytics로 시작한다.

**Tech Stack:** Next.js 16.2.6, React 19, Tailwind v4, TypeScript, vitest, @vercel/analytics, Vercel 배포(main push 자동배포), Google Search Console.

## Global Constraints

- 콘텐츠는 **한국어**, 비개발자도 이해할 쉬운 톤. 모든 페이지는 `ContentLayout`(`components/ContentLayout.tsx`)을 사용(홈 `app/page.tsx` 제외 — 커스텀 도구 페이지).
- 메타데이터는 `createPageMetadata({ title, description, path })`(`lib/metadata.ts`) 사용.
- 경로 alias `@/*` = 프로젝트 루트.
- 구조화 데이터는 `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }} />` 형태(기존 `app/faq/page.tsx` 패턴과 동일).
- 가이드는 `GuideQuickAnswer` + `GuideCta` 컴포넌트를 사용.
- **홈 검색 카드의 줄무늬(`.airmail-stripe`) 요소에 `overflow-hidden` 절대 금지** — 자동완성 드롭다운이 잘리는 P0 회귀. 모서리는 `rounded-t-lg`를 줄무늬에 직접.
- 원본 5편 심화 목표: 각 **본문 실텍스트 800단어 이상**, 독창적 예시·예외 케이스·미니 FAQ 포함.
- 잦은 커밋. 각 Task 끝에 커밋.
- 검증 명령: `npm run build` · `npx tsc --noEmit` · `npm run lint` · `npm test`.
- **재제출 순서 원칙:** 배포 → 색인 + 검색 트래픽 확보(2~4주) → 그 뒤 애드센스 재제출. 텅 빈 상태 즉시 재제출 금지.

---

## Phase 0 — 현재 로컬 작업 정리 (안전 기반)

### Task 1: 진행 중인 콘텐츠 작업 검토 후 커밋

현재 워킹트리에 대표님이 로컬에서 한 콘텐츠 보강이 **커밋되지 않은 채** 있다. 이 위에 기술 SEO를 얹기 전에 먼저 커밋해 깨끗한 기반을 만든다(작업 유실 방지).

**Files:**
- Modify(이미 수정됨): `app/about/page.tsx`, `app/guide/overseas-shopping/page.tsx`, `app/guide/page.tsx`, `app/page.tsx`, `app/sitemap.ts`
- Create(이미 생성됨, untracked): `app/guide/apartment-unit/`, `app/guide/english-documents/`, `app/guide/international-shipping/`

- [ ] **Step 1: 변경 내용 확인**

Run: `git status && git diff --stat`
Expected: 위 파일들이 modified/untracked로 표시.

- [ ] **Step 2: 빌드가 깨지지 않는지 확인**

Run: `npm run build`
Expected: 성공. 실패하면 원인 수정 후 진행.

- [ ] **Step 3: 끊긴 링크(404) 없는지 확인** — 가이드 목록·About이 링크하는 모든 `/guide/*`에 해당 폴더가 존재하는지.

Run: `comm -23 <(grep -oE '/guide/[a-z-]+' app/guide/page.tsx app/about/page.tsx | sed 's#.*/guide/#/guide/#' | sort -u) <(ls -d app/guide/*/ | sed 's#app/guide/##;s#/##;s#^#/guide/#' | sort -u)`
Expected: 출력 없음(모든 링크에 대응 폴더 존재). 출력이 있으면 그 페이지를 먼저 만든다.

- [ ] **Step 4: 커밋**

```bash
git add -A
git commit -m "feat: 가이드 3편 추가(동호수·국제우편·영문서류) + About E-E-A-T 보강"
```

---

## Phase 1 — 원본 가이드 5편 심화 (재승인 성패의 핵심)

각 Task 공통 절차:
1. 해당 `page.tsx`의 현재 내용을 Read로 확인.
2. 아래 "추가할 내용"을 반영해 본문 실텍스트 **800단어 이상**으로 확장(기존 톤·컴포넌트 유지).
3. 글 하단에 `GuideQuickAnswer`가 없으면 상단에 추가, `GuideCta`가 없으면 하단에 추가.
4. 다른 가이드로 가는 **내부 링크 2개 이상**을 문맥 속에 서술형으로 삽입.
5. `npm run build`로 검증 → 커밋.

> 심화는 프로즈(글) 작업이라 단위 테스트가 없다. 검증 = 빌드 성공 + 단어 수 목표 + 사람 리뷰. 각 Task 후 대표님이 내용 검토.

### Task 2: `english-address` 심화 — "한글 주소, 영문으로 쓰는 법"

**Files:** Modify `app/guide/english-address/page.tsx`

**추가할 내용:**
- 실제 변환 예시를 **3~4개로 확대**: 서울 아파트, 부산 오피스텔, 경기도 단독주택, 회사 주소 각각 한글→영문 대응.
- **도로 유형 로마자 표기 규칙** 미니표: 로/길/대로 → -ro / -gil / -daero(예: 세종대로 → Sej-daero는 오기, Sejong-daero).
- **사서함(P.O. Box)·회사 주소** 처리 팁 한 단락.
- **해외 양식별 매핑**(아마존/이베이의 Address Line 1/2, City, State, ZIP에 무엇을 넣는지) — `overseas-shopping` 가이드로 링크.
- **미니 FAQ 3문항**(예: "영문 이름도 필요한가요?", "도로명이 영어로 안 바뀌면?", "우편번호를 모르면?").
- 내부 링크: `/guide/apartment-unit`, `/guide/common-mistakes`.

- [ ] **Step 1:** 현재 내용 Read → 위 항목 반영해 확장.
- [ ] **Step 2:** `wc -w app/guide/english-address/page.tsx` → 마크업 포함 1,200+(실텍스트 800+ 목표).
- [ ] **Step 3:** `npm run build` → 성공.
- [ ] **Step 4:** 커밋 `content: english-address 가이드 심화 (예시·규칙·FAQ 보강)`.

### Task 3: `overseas-shopping` 심화 — "해외직구 배송지에 주소 넣는 법"

**Files:** Modify `app/guide/overseas-shopping/page.tsx`
> 주: 이 파일은 Phase 0에서 이미 일부 수정됨. 현재 상태를 먼저 확인하고 부족분만 보강.

**추가할 내용:**
- **주요 쇼핑몰별 입력 예시**: 아마존, 이베이, 아이허브, 알리익스프레스 — 각 사이트의 주소 칸 이름과 한국 주소 매핑을 표로.
- **배송대행지(배대지) 개념**: 한국 집 주소 vs 배대지 주소 차이, 언제 무엇을 넣는지.
- **전화번호 국제표기**(+82, 앞 0 제거)와 **개인통관고유부호** 언급.
- **미니 FAQ 3문항**("City에 뭘 넣죠?", "State가 필수인가요?", "배대지 쓸 때 내 주소는 어디에?").
- 내부 링크: `/guide/english-address`, `/guide/international-shipping`.

- [ ] **Step 1:** 현재 내용 Read → 부족분 보강.
- [ ] **Step 2:** 실텍스트 800+ 확인.
- [ ] **Step 3:** `npm run build` → 성공.
- [ ] **Step 4:** 커밋 `content: overseas-shopping 가이드 심화 (쇼핑몰별 예시·배대지)`.

### Task 4: `japan-address` 심화 — "일본 주소, 영문으로 쓰는 법"

**Files:** Modify `app/guide/japan-address/page.tsx`

**추가할 내용:**
- **실제 예시 3개**(도쿄/오사카/교토)의 일본어→로마자→영문 필드 대응.
- **丁目·番地·号 하이픈 규칙** 상세(예: 1丁目2番3号 → 1-2-3)와 흔한 오기.
- **건물명(マンション/ビル)·호실** 표기법.
- **우편번호 형식**(〒NNN-NNNN)과 영문 양식에서의 위치.
- **한국 주소 표기와의 차이** 한 단락.
- **미니 FAQ 2~3문항**.
- 내부 링크: `/guide/english-address`, `/guide/common-mistakes`.

- [ ] **Step 1:** 현재 내용 Read → 확장.
- [ ] **Step 2:** 실텍스트 800+ 확인.
- [ ] **Step 3:** `npm run build` → 성공.
- [ ] **Step 4:** 커밋 `content: japan-address 가이드 심화 (예시·규칙·FAQ)`.

### Task 5: `common-mistakes` 심화 — "자주 틀리는 실수 7가지"

**Files:** Modify `app/guide/common-mistakes/page.tsx`

**추가할 내용:**
- 각 실수에 **"잘못된 예 → 올바른 예" 표**와 **"왜 문제인지(배송 반송·서류 반려 등 실제 결과)"** 설명 한 줄씩.
- 맨 아래 **최종 체크리스트**(복사해 쓸 수 있는 확인 목록 7~8줄).
- **미니 FAQ 2문항**.
- 내부 링크: `/guide/english-address`, `/guide/korea-region-names`.

- [ ] **Step 1:** 현재 내용 Read → 확장.
- [ ] **Step 2:** 실텍스트 800+ 확인.
- [ ] **Step 3:** `npm run build` → 성공.
- [ ] **Step 4:** 커밋 `content: common-mistakes 가이드 심화 (예시표·체크리스트)`.

### Task 6: `korea-region-names` 심화 — "전국 시·도 영문 표기 정리표"

**Files:** Modify `app/guide/korea-region-names/page.tsx`

**추가할 내용:**
- 17개 시·도 표에 **City/State 배치 예시 칼럼** 추가(각 지역 대표 주소로).
- **광역시 vs 도(道) 차이**와 City/State 넣는 법 설명.
- **세종특별자치시·제주특별자치도** 특수 케이스.
- **흔한 오기**(Gyeonggi-do↔Kyunggi, Chungcheong 표기 등) 주의.
- **미니 FAQ 2문항**.
- 내부 링크: `/guide/english-address`, `/guide/overseas-shopping`.

- [ ] **Step 1:** 현재 내용 Read → 확장.
- [ ] **Step 2:** 실텍스트 800+ 확인.
- [ ] **Step 3:** `npm run build` → 성공.
- [ ] **Step 4:** 커밋 `content: korea-region-names 가이드 심화 (배치 예시·오기 주의)`.

---

## Phase 2 — 기술 SEO 토대 (측정 + 구조화 데이터)

### Task 7: Vercel Analytics 설치 (측정 시작)

**Files:**
- Modify: `package.json` (의존성 추가)
- Modify: `app/layout.tsx` (`<Analytics />` 삽입)

**Interfaces:**
- Produces: 사이트 전역 페이지뷰 측정. Vercel 대시보드 → Analytics 탭에서 확인.

- [ ] **Step 1: 패키지 설치**

Run: `npm install @vercel/analytics`
Expected: `package.json` dependencies에 `@vercel/analytics` 추가.

- [ ] **Step 2: 레이아웃에 컴포넌트 추가**

`app/layout.tsx` 상단 import에 추가:
```tsx
import { Analytics } from "@vercel/analytics/next";
```
`<body>` 내부, `<Footer />` 다음(그리고 AdSense Script 블록과 나란히)에 추가:
```tsx
        <Footer />
        <Analytics />
```

- [ ] **Step 3: 빌드·타입 검증**

Run: `npm run build && npx tsc --noEmit`
Expected: 성공.

- [ ] **Step 4: 커밋**

```bash
git add package.json package-lock.json app/layout.tsx
git commit -m "feat: Vercel Analytics 추가 (유입 측정 시작)"
```

### Task 8: 구조화 데이터 빌더 함수 + 테스트 (TDD)

**Files:**
- Create: `lib/structured-data.ts`
- Test: `lib/structured-data.test.ts`

**Interfaces:**
- Produces:
  - `websiteSchema(): object`
  - `softwareAppSchema(): object`
  - `articleSchema(opts: { title: string; description: string; path: string; datePublished: string; dateModified: string }): object`
  - `breadcrumbSchema(items: { name: string; path: string }[]): object`
- Consumes: `SITE_NAME`, `SITE_URL` (`@/lib/site`), `absoluteUrl` (`@/lib/metadata`).

- [ ] **Step 1: 실패하는 테스트 작성**

`lib/structured-data.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import {
  websiteSchema,
  softwareAppSchema,
  articleSchema,
  breadcrumbSchema,
} from "./structured-data";

describe("structured-data", () => {
  it("websiteSchema: WebSite 타입과 name/url 포함", () => {
    const s = websiteSchema() as Record<string, unknown>;
    expect(s["@type"]).toBe("WebSite");
    expect(typeof s.name).toBe("string");
    expect(String(s.url)).toMatch(/^https?:\/\//);
  });

  it("softwareAppSchema: 무료(price 0) 도구로 표기", () => {
    const s = softwareAppSchema() as Record<string, any>;
    expect(s["@type"]).toBe("SoftwareApplication");
    expect(s.offers.price).toBe("0");
  });

  it("articleSchema: headline과 절대 url 포함", () => {
    const s = articleSchema({
      title: "테스트 글",
      description: "설명",
      path: "/guide/test",
      datePublished: "2026-07-14",
      dateModified: "2026-07-14",
    }) as Record<string, unknown>;
    expect(s["@type"]).toBe("Article");
    expect(s.headline).toBe("테스트 글");
    expect(String(s.url)).toContain("/guide/test");
  });

  it("breadcrumbSchema: position이 1부터 증가", () => {
    const s = breadcrumbSchema([
      { name: "홈", path: "/" },
      { name: "가이드", path: "/guide" },
    ]) as Record<string, any>;
    expect(s["@type"]).toBe("BreadcrumbList");
    expect(s.itemListElement).toHaveLength(2);
    expect(s.itemListElement[0].position).toBe(1);
    expect(s.itemListElement[1].position).toBe(2);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- structured-data`
Expected: FAIL — "Cannot find module './structured-data'".

- [ ] **Step 3: 최소 구현 작성**

`lib/structured-data.ts`:
```ts
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { absoluteUrl } from "@/lib/metadata";

// 구조화 데이터(JSON-LD) 빌더. 순수 함수라 서버/클라이언트 어디서든 호출 가능.
// 결과 객체는 <JsonLd> 컴포넌트로 <script type="application/ld+json">에 넣는다.

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function softwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "ko-KR",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- structured-data`
Expected: PASS (4 tests).

- [ ] **Step 5: 커밋**

```bash
git add lib/structured-data.ts lib/structured-data.test.ts
git commit -m "feat: 구조화 데이터(JSON-LD) 빌더 함수 + 테스트"
```

### Task 9: `<JsonLd>` 컴포넌트 + ContentLayout에 연결

**Files:**
- Create: `components/JsonLd.tsx`
- Modify: `components/ContentLayout.tsx`

**Interfaces:**
- Produces: `<JsonLd data={object | object[]} />` — 각 객체를 `<script type="application/ld+json">`로 렌더.
- `ContentLayout`에 옵션 prop `jsonLd?: object | object[]` 추가.

- [ ] **Step 1: JsonLd 컴포넌트 생성**

`components/JsonLd.tsx`:
```tsx
// 구조화 데이터(JSON-LD) 객체 1개 또는 여러 개를 <script>로 삽입한다.
// FAQ 페이지의 기존 인라인 패턴을 재사용 가능한 컴포넌트로 뽑은 것.
export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
```

- [ ] **Step 2: ContentLayout에 jsonLd prop 추가**

`components/ContentLayout.tsx` — import 추가:
```tsx
import JsonLd from "@/components/JsonLd";
```
Props 타입에 추가:
```tsx
  /** 구조화 데이터(JSON-LD). 있으면 <script>로 삽입. */
  jsonLd?: object | object[];
```
함수 시그니처와 반환부 수정:
```tsx
export default function ContentLayout({ title, lead, backLink, jsonLd, children }: Props) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-14">
      {jsonLd && <JsonLd data={jsonLd} />}
      <div className="mx-auto max-w-3xl">
```
(나머지 기존 내용 유지)

- [ ] **Step 3: 빌드·타입 검증**

Run: `npm run build && npx tsc --noEmit`
Expected: 성공.

- [ ] **Step 4: 커밋**

```bash
git add components/JsonLd.tsx components/ContentLayout.tsx
git commit -m "feat: JsonLd 컴포넌트 + ContentLayout jsonLd prop"
```

### Task 10: 홈페이지에 SoftwareApplication + WebSite JSON-LD

**Files:** Modify `app/page.tsx`

- [ ] **Step 1: import 추가**

```tsx
import JsonLd from "@/components/JsonLd";
import { softwareAppSchema, websiteSchema } from "@/lib/structured-data";
```

- [ ] **Step 2: 반환 JSX 최상단(`<main>` 바로 안)에 삽입**

```tsx
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-14">
      <JsonLd data={[websiteSchema(), softwareAppSchema()]} />
      <div className="mx-auto max-w-3xl">
```

- [ ] **Step 3: 빌드 검증**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 4: 커밋** `feat: 홈에 SoftwareApplication/WebSite 구조화 데이터`.

### Task 11: 가이드 8편에 Article + BreadcrumbList JSON-LD

각 가이드 `page.tsx`에서 `ContentLayout`에 `jsonLd` prop을 넘긴다. 8편 모두 동일 절차.

**대상 파일(8개):**
`app/guide/english-address/page.tsx`, `apartment-unit`, `overseas-shopping`, `international-shipping`, `japan-address`, `common-mistakes`, `korea-region-names`, `english-documents` (각 `/page.tsx`)

**각 파일 공통 수정:**
- import 추가:
```tsx
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
```
- `ContentLayout`에 prop 추가(제목/설명/경로는 그 페이지의 `metadata` 값과 동일하게, 제목은 `title` prop과 동일하게):
```tsx
    <ContentLayout
      title="…(기존)…"
      lead="…(기존)…"
      backLink={{ label: "가이드 목록", href: "/guide" }}
      jsonLd={[
        articleSchema({
          title: "…이 가이드 제목…",
          description: "…이 가이드 metadata.description…",
          path: "/guide/…이 가이드 경로…",
          datePublished: "2026-07-14",
          dateModified: "2026-07-14",
        }),
        breadcrumbSchema([
          { name: "홈", path: "/" },
          { name: "사용 가이드", path: "/guide" },
          { name: "…이 가이드 제목…", path: "/guide/…이 가이드 경로…" },
        ]),
      ]}
    >
```

- [ ] **Step 1:** 8개 파일 각각에 위 패턴 적용(제목·설명·경로를 파일별 실제 값으로).
- [ ] **Step 2:** `npm run build && npx tsc --noEmit` → 성공.
- [ ] **Step 3:** 커밋 `feat: 가이드 8편에 Article/BreadcrumbList 구조화 데이터`.

---

## Phase 3 — 검증 · 배포 · 색인 · 재제출

### Task 12: 전체 검증

- [ ] **Step 1:** `npm run build` → 성공.
- [ ] **Step 2:** `npx tsc --noEmit` → 오류 없음.
- [ ] **Step 3:** `npm run lint` → 통과.
- [ ] **Step 4:** `npm test` → 전체 통과(structured-data 테스트 포함).
- [ ] **Step 5:** `npm run dev` 후 브라우저로 홈·가이드 8편을 눌러보며 **404·깨진 링크 0** 확인.

### Task 13: 배포

- [ ] **Step 1:** 남은 변경 커밋 확인(`git status` 깨끗).
- [ ] **Step 2:** `git push` → main push 시 Vercel 자동 배포(참고: production = address-converter.com).
- [ ] **Step 3:** 배포 완료 후 `https://address-converter.com` 라이브에서 가이드 페이지 정상 표시 확인.

### Task 14: 색인 · 구조화 데이터 검증 (배포 직후)

- [ ] **Step 1:** Google **Rich Results Test**(search.google.com/test/rich-results)에 가이드 URL 1개 입력 → Article·Breadcrumb 인식되는지 확인.
- [ ] **Step 2:** Google **Search Console** → 사이트맵에 `https://address-converter.com/sitemap.xml` 제출/상태 확인.
- [ ] **Step 3:** 주요 새 페이지(신규 가이드 3편)를 GSC **URL 검사 → 색인 생성 요청**.
- [ ] **Step 4:** Vercel Analytics 대시보드에서 방문 데이터가 잡히기 시작하는지 확인.

### Task 15: 색인·트래픽 확보 후 애드센스 재제출 (전략적 대기)

> **즉시 재제출 금지.** 2회 거절된 사이트이므로 "개선됐고 실제로 방문이 있는 사이트" 상태를 만든 뒤 제출한다.

- [ ] **Step 1:** 배포 후 **2~4주** GSC 모니터링 — 색인된 페이지 수 증가, 노출(impressions)이 0에서 상승하는지 확인.
- [ ] **Step 2:** 최소 기준 충족 시 재제출: 8편 이상 색인 완료 + 검색 노출 발생 + 콘텐츠 800단어+ 균일.
- [ ] **Step 3:** AdSense 대시보드에서 재검토(재제출) 신청.
- [ ] **Step 4:** 결과 대기(수일~2주). 승인 시 `public/ads.txt`에 publisher ID 반영 여부 확인.

### Task 16: 측정 루프 (지속)

- [ ] **주간 점검:** GSC(유입 검색어·노출·클릭·순위) + Vercel Analytics(페이지별 방문). 상위 노출되는 검색어가 보이면 그 주제를 더 파고, 노출은 되는데 클릭이 낮으면 제목·설명(메타) 개선.

---

## Self-Review 메모 (작성자 확인)

- **Spec 커버리지:** 흐름1(콘텐츠)=Phase 1로 원본 5편 심화 커버, 신규 3편은 Phase 0에서 완료 반영. 흐름2(기술 SEO: 측정=Task 7, JSON-LD=Task 8~11)=커버. 흐름3(신뢰 신호=About)=로컬 완료로 Phase 0에 반영. 성공기준(재승인·색인·측정)=Phase 3로 커버.
- **범위 밖(YAGNI):** 대량 콘텐츠 생산, 유료 SEO 툴, 백링크, Speed Insights(추후 선택), PostHog(추후 확장).
- **주의:** Phase 2가 Phase 0/1에서 수정한 파일(홈·가이드·ContentLayout)을 다시 건드리므로, 반드시 Phase 0 커밋 후 순서대로 진행.
