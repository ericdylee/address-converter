# AdSense 전면광고용 검색/결과 페이지 분리 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 단일 페이지로 동작하던 한글→영문 주소 변환 UI를 검색(`/`)과 결과(`/result`) 두 페이지로 분리해, 라우트 전환 시점에 AdSense Vignette 광고가 자동 서빙될 수 있는 구조를 만든다.

**Architecture:** App Router 기반. `/`에는 `AddressSearch`만 두고, 후보 클릭 시 `router.push('/result?...')`로 클라이언트 라우팅. `/result`는 URL params에서 4필드 + 한글 원본을 읽어 카드 렌더. `app/layout.tsx`에 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` env var이 있을 때만 AdSense 스크립트 로드. `public/ads.txt`는 빈 파일로 미리 둔다.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript. 자동 테스트 프레임워크 없음 → 검증은 `npx tsc --noEmit`, `npm run lint`, 브라우저 수동 확인으로 대체.

**참고 스펙:** `docs/superpowers/specs/2026-05-27-adsense-interstitial-flow-design.md`

---

## 파일 구조

생성/수정 파일과 역할:

| 파일 | 작업 | 역할 |
|------|------|------|
| `app/page.tsx` | 수정 | 검색창 1개만. 후보 선택 시 `router.push('/result?...')` |
| `app/result/page.tsx` | 생성 | URL params 읽기 + 상세주소 입력 + 4개 카드 + "다시 검색" 링크 |
| `app/layout.tsx` | 수정 | AdSense 스크립트 조건부 삽입 |
| `public/ads.txt` | 생성 | 빈 파일(승인 후 채움) |
| `.env.local.example` | 수정 | `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 안내 추가 |
| `CLAUDE.md` | 수정 | 새 라우트 구조 / 데이터 흐름 문서화 |

`components/AddressSearch.tsx`, `components/AddressCard.tsx`, `components/DetailAddressInput.tsx`, `lib/juso.ts`, `lib/romanize.ts`, `lib/types.ts`, `app/api/search-address/route.ts` 는 변경하지 않는다.

---

### Task 1: AdSense 스크립트 조건부 삽입 (layout)

**Files:**
- Modify: `app/layout.tsx`
- Modify: `.env.local.example`

- [ ] **Step 1: `.env.local.example`에 AdSense env var 안내 추가**

`.env.local.example` 끝에 다음을 추가:

```
# Google AdSense publisher ID (도메인 연결 + 승인 후 채워넣으세요)
# 형식: ca-pub-XXXXXXXXXXXXXXXX
# 비어 있으면 AdSense 스크립트가 로드되지 않습니다 (개발 환경 기본).
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
```

- [ ] **Step 2: `app/layout.tsx` 수정 — AdSense `<Script>` 조건부 삽입**

`app/layout.tsx`의 전체 내용을 아래로 교체:

```tsx
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한글 → 영문 주소 변환기",
  description: "한글 주소를 영문으로 변환하고 해외 사이트 입력 필드에 맞춰 개별 복사할 수 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {adsenseClientId && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: 타입체크 + 린트**

Run:
```bash
npx tsc --noEmit && npm run lint
```
Expected: 둘 다 오류 없이 통과.

- [ ] **Step 4: 수동 확인 — 스크립트 미로드(env 비어 있음)**

개발 서버가 떠 있다면 그대로(env 변경은 재시작 필요할 수 있음). 브라우저에서 http://localhost:3000 열고 DevTools → Elements → `<body>` 안에 `pagead2.googlesyndication.com` 문자열이 **없음**을 확인.

- [ ] **Step 5: 커밋**

```bash
git add app/layout.tsx .env.local.example
git commit -m "feat: AdSense 스크립트 조건부 로드 (NEXT_PUBLIC_ADSENSE_CLIENT_ID)"
```

---

### Task 2: `public/ads.txt` 빈 파일 추가

**Files:**
- Create: `public/ads.txt`

- [ ] **Step 1: `public/ads.txt` 생성**

빈 파일로 생성. 내용:

```
# AdSense 승인 후 다음 형식으로 채워주세요:
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

- [ ] **Step 2: 수동 확인 — 라우트 접근 가능**

브라우저에서 http://localhost:3000/ads.txt 열어 위 텍스트가 보이는지 확인.

- [ ] **Step 3: 커밋**

```bash
git add public/ads.txt
git commit -m "chore: ads.txt 자리 비워두기 (AdSense 승인 후 채움)"
```

---

### Task 3: 결과 페이지 신설 (`/result`)

**Files:**
- Create: `app/result/page.tsx`

- [ ] **Step 1: `app/result/page.tsx` 생성**

전체 내용:

```tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AddressCard from "@/components/AddressCard";
import DetailAddressInput from "@/components/DetailAddressInput";
import { combineStreetWithDetail } from "@/lib/romanize";

function ResultContent() {
  const params = useSearchParams();
  const street = params.get("street") ?? "";
  const city = params.get("city") ?? "";
  const state = params.get("state") ?? "";
  const zip = params.get("zip") ?? "";
  const ko = params.get("ko") ?? "";

  const [detail, setDetail] = useState("");

  const hasRequired = street && city && state && zip;

  if (!hasRequired) {
    return (
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700">잘못된 접근입니다.</p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            검색 페이지로 이동
          </Link>
        </div>
      </main>
    );
  }

  const streetWithDetail = combineStreetWithDetail(street, detail);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← 다시 검색
          </Link>
          <span className="text-xs text-gray-400">변환 결과</span>
        </header>

        {ko && (
          <div className="mb-6 px-4 py-3 bg-white border border-gray-200 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">원본 (한글)</div>
            <div className="text-sm text-gray-900">{ko}</div>
          </div>
        )}

        <section className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <DetailAddressInput value={detail} onChange={setDetail} />
        </section>

        <section className="space-y-3">
          <AddressCard label="Street Address" value={streetWithDetail} />
          <AddressCard label="City" value={city} />
          <AddressCard label="State / Province" value={state} />
          <AddressCard label="Postal Code" value={zip} />
        </section>

        <div className="mt-4 px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-600">
          <span className="font-medium">Country:</span> South Korea
        </div>

        <footer className="mt-10 text-center text-xs text-gray-400">
          데이터: 행정안전부 도로명주소 영문 API
        </footer>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}
```

> 주의: `useSearchParams`는 `<Suspense>` 경계 안에서 호출해야 빌드 경고가 발생하지 않는다(Next.js 16 App Router 규약). 그래서 `ResultContent`를 분리하고 `ResultPage`에서 Suspense로 감쌌다.

- [ ] **Step 2: 타입체크 + 린트**

Run:
```bash
npx tsc --noEmit && npm run lint
```
Expected: 통과.

- [ ] **Step 3: 수동 확인 — 잘못된 접근 안내**

브라우저에서 http://localhost:3000/result 직접 접근. "잘못된 접근입니다." + 검색 페이지로 이동 버튼 보임.

- [ ] **Step 4: 수동 확인 — URL params로 카드 렌더**

브라우저에서 다음 URL 접근:
```
http://localhost:3000/result?street=396%20Gangnam-daero&city=Gangnam-gu&state=Seoul&zip=06241&ko=%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EA%B0%95%EB%82%A8%EB%8C%80%EB%A1%9C%20396
```

확인 항목:
- 원본(한글) 카드에 "서울 강남구 강남대로 396"
- Street: `396 Gangnam-daero`
- City: `Gangnam-gu`
- State: `Seoul`
- Postal Code: `06241`
- 상세주소 "101동 502호" 입력 시 Street가 `396 Gangnam-daero, 101-502`로 갱신
- "← 다시 검색" 링크 클릭 시 `/`로 이동

- [ ] **Step 5: 커밋**

```bash
git add app/result/page.tsx
git commit -m "feat: /result 페이지 — URL params로 4필드 + 상세주소 입력"
```

---

### Task 4: 메인 페이지 단순화 — 검색창만 + 라우팅

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: `app/page.tsx` 전체 교체**

전체 내용을 아래로 교체:

```tsx
"use client";

import { useRouter } from "next/navigation";
import AddressSearch from "@/components/AddressSearch";
import type { AddressResult } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();

  function handleSelect(result: AddressResult) {
    const params = new URLSearchParams({
      street: result.english.street,
      city: result.english.city,
      state: result.english.state,
      zip: result.english.postalCode,
      ko: result.korean,
    });
    router.push(`/result?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            한글 → 영문 주소 변환기
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            해외 사이트 입력란에 맞춰 필드별로 복사할 수 있습니다
          </p>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <AddressSearch onSelect={handleSelect} />
        </section>

        <footer className="mt-10 text-center text-xs text-gray-400">
          데이터: 행정안전부 도로명주소 영문 API
        </footer>
      </div>
    </main>
  );
}
```

> 변경 요지: `useState`/`combineStreetWithDetail`/`AddressCard`/`DetailAddressInput` 임포트 제거. 4개 카드 섹션과 상세주소 입력란 삭제. 후보 선택 시 `URLSearchParams`로 5개 값 인코딩해 `router.push`.

- [ ] **Step 2: 타입체크 + 린트**

Run:
```bash
npx tsc --noEmit && npm run lint
```
Expected: 통과. (`AddressCard`, `DetailAddressInput`, `combineStreetWithDetail`가 page.tsx에서 사라졌지만 다른 곳에서 쓰이므로 unused 경고 없음.)

- [ ] **Step 3: 수동 확인 — 메인 페이지에 검색창만**

브라우저에서 http://localhost:3000 열고 확인:
- 헤더 + 검색창만 보임
- 상세주소 입력란 없음
- 4개 카드 없음
- "변환 결과" 섹션 없음

- [ ] **Step 4: 수동 확인 — E2E 플로우**

1. 검색창에 "강남대로 396" 입력
2. 드롭다운에 후보 표시 확인
3. 첫 번째 후보 클릭
4. URL이 `/result?street=...&city=...&state=...&zip=...&ko=...` 로 이동했는지 확인
5. 결과 페이지의 4개 카드에 값이 채워졌는지 확인
6. 상세주소에 "101동 502호" 입력 → Street 카드 값이 `..., 101-502`로 바뀌는지 확인
7. "← 다시 검색" 클릭 → `/`로 돌아와 검색창만 보이는지 확인

- [ ] **Step 5: 커밋**

```bash
git add app/page.tsx
git commit -m "feat: 메인 페이지를 검색창만으로 단순화 — 후보 선택 시 /result로 라우팅"
```

---

### Task 5: 문서 업데이트 (CLAUDE.md)

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: `CLAUDE.md`의 "요청 흐름" 다이어그램 교체**

기존 블록(```Browser (AddressSearch, 300ms debounce) ... 4개 AddressCard에 값 채워짐```)을 다음으로 교체:

````markdown
**요청 흐름:**
```
[/] HomePage
  Browser (AddressSearch, 300ms debounce)
    → GET /api/search-address?q=<키워드>
      → lib/juso.ts: searchAddress()
        → business.juso.go.kr/addrlinkApi/addrEngApi.do (confmKey 포함)
      ← JusoApiItem[] → AddressResult[]로 정규화
    ← SearchResponse
  드롭다운 렌더 → 사용자가 후보 클릭
    → router.push('/result?street=...&city=...&state=...&zip=...&ko=...')

[/result] ResultPage
  useSearchParams로 4필드 + ko 읽기
  + 상세주소 로컬 state
  → 4개 AddressCard 렌더 (Street만 combineStreetWithDetail로 합쳐짐)
```

라우트 이동 시점에 AdSense Auto Ads(Vignette)가 광고를 자체 판단으로 서빙. 빈도 보장은 없음.
````

- [ ] **Step 2: `CLAUDE.md`의 "페이지 상태" 단락 교체**

기존 `**페이지 상태** (\`app/page.tsx\`): ...` 단락을 다음으로 교체:

```markdown
**페이지 상태:**
- `app/page.tsx`(HomePage): 상태 없음. `AddressSearch.onSelect`에서 `router.push('/result?...')`로 5개 값(street/city/state/zip/ko)을 URL에 인코딩.
- `app/result/page.tsx`(ResultPage): `useSearchParams`로 5개 값을 읽고, `detail: string` 로컬 state만 가짐. Street 카드는 `combineStreetWithDetail(street, detail)`로 derive. 4필드 중 누락이 있으면 "잘못된 접근" 안내. Country는 정적 라벨.
- `useSearchParams`는 Next.js 16 App Router 규약상 `<Suspense>` 경계 안에서 호출해야 하므로 `ResultPage`가 `Suspense`로 `ResultContent`를 감쌈.
```

- [ ] **Step 3: `CLAUDE.md`의 "모듈 경계"에 layout/ads.txt 추가**

기존 `**모듈 경계:**` 리스트 끝(`- \`components/AddressCard.tsx\` ...` 다음)에 두 줄 추가:

```markdown
- `app/layout.tsx` — `NEXT_PUBLIC_ADSENSE_CLIENT_ID` env var이 있을 때만 AdSense 스크립트(`adsbygoogle.js`) 삽입. 없으면 로드 안 함(개발/미승인 환경 기본).
- `public/ads.txt` — AdSense 승인 후 publisher ID 채워야 광고 서빙 가능. 코드 변경 없음.
```

- [ ] **Step 4: 수동 확인**

`CLAUDE.md` 열어서 위 3개 섹션이 의도대로 바뀌었는지 확인.

- [ ] **Step 5: 커밋**

```bash
git add CLAUDE.md
git commit -m "docs: 검색/결과 페이지 분리 + AdSense 통합 반영"
```

---

### Task 6: 빌드 + 종합 검증

**Files:** (없음 — 검증만)

- [ ] **Step 1: 프로덕션 빌드**

Run:
```bash
npm run build
```
Expected:
- 오류 없이 완료
- 라우트 목록에 `/`, `/result`, `/api/search-address` 모두 표시
- `/result`는 dynamic 라우트로 표시될 수 있음(`useSearchParams` 사용)

- [ ] **Step 2: 더미 AdSense ID로 스크립트 로드 확인**

`.env.local`에 다음 줄 추가(임시):
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-0000000000000000
```

개발 서버 재시작 (`npm run dev` 끄고 다시 실행 — env var은 빌드 시점에 인라인되므로 재시작 필수).

브라우저에서 http://localhost:3000 열고 DevTools → Elements → `<body>` 안에 다음과 같은 스크립트 태그가 있는지 확인:
```
<script ... src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" ...>
```

(실제 광고는 미승인 ID라 노출되지 않음 — 스크립트 태그 존재만 확인)

- [ ] **Step 3: 더미 ID 제거**

`.env.local`에서 `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...` 줄 삭제(또는 빈 값으로). 개발 서버 재시작 후 스크립트 태그가 다시 사라졌는지 확인.

- [ ] **Step 4: 최종 E2E 플로우 재확인**

검색 → 후보 선택 → 결과 페이지 → 상세주소 입력 → "다시 검색" 왕복이 한 번에 잘 되는지 확인.

- [ ] **Step 5: 커밋 없음 — 검증 단계라 변경 사항 없음**

만약 Task 1~5 진행 중 빠뜨린 게 있어 추가 수정이 발생했다면 별도 커밋으로 처리.

---

## Self-Review 결과

스펙(`docs/superpowers/specs/2026-05-27-adsense-interstitial-flow-design.md`) 대비 커버리지:

- ✅ 라우트 분리 (`/`, `/result`) → Task 3, 4
- ✅ URL 스키마(street/city/state/zip/ko) → Task 3, 4
- ✅ 클라이언트 라우팅 (`router.push`) → Task 4
- ✅ AdSense `<Script>` 조건부 삽입 + env var → Task 1
- ✅ `public/ads.txt` 빈 파일 → Task 2
- ✅ 잘못된 접근 안내 → Task 3
- ✅ `useSearchParams` Suspense 처리 → Task 3 (스펙에는 명시 없지만 Next 16 규약상 필요해 추가)
- ✅ 상세주소 결과 페이지로 이동 → Task 3
- ✅ "다시 검색" 링크 → Task 3
- ✅ 문서 갱신 → Task 5
- ✅ 빌드/검증 → Task 6

플레이스홀더 / 모호한 항목 없음. 함수/타입 이름은 모두 기존 코드에서 그대로 사용(`AddressResult`, `combineStreetWithDetail`, `router.push` 등).
