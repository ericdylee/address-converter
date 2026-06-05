# 푸터 + 개인정보처리방침 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 공통 `Footer` 컴포넌트를 전역 배치해 저작권·데이터 출처를 표기하고, 개인정보처리방침(`/privacy`) 페이지를 추가한다.

**Architecture:** `components/Footer.tsx`(서버 컴포넌트)를 `app/layout.tsx`에 한 번 렌더해 `/`·`/result`·`/privacy` 전체에 적용하고, 두 페이지의 인라인 `<footer>`를 제거해 중복을 없앤다. `/privacy`는 정적 한국어 페이지.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript.

**검증 방식 메모:** 이 저장소엔 단위 테스트 러너가 없다(정적 UI). 각 태스크는 단위 테스트 대신 `npx tsc --noEmit`(타입) + `npm run lint`(ESLint) + 개발서버 `curl`/브라우저 확인으로 검증한다. 새 테스트 프레임워크는 도입하지 않는다(YAGNI).

**경로 alias:** `@/*` → 프로젝트 루트. `@/components/Footer`로 import 가능.

---

### Task 1: 공통 Footer 컴포넌트 생성

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Footer 컴포넌트 작성**

`components/Footer.tsx`:

```tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 px-4 text-center text-xs text-gray-400 space-y-1">
      <p>데이터: 행정안전부 도로명주소 영문 API</p>
      <p>© {year} 한글 → 영문 주소 변환기</p>
      <p>
        <Link
          href="/privacy"
          className="hover:text-gray-600 underline-offset-2 hover:underline"
        >
          개인정보처리방침
        </Link>
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: 타입체크**

Run: `npx tsc --noEmit`
Expected: 종료 코드 0, 출력 없음.

- [ ] **Step 3: 린트**

Run: `npm run lint`
Expected: 에러/경고 없음.

- [ ] **Step 4: 커밋**

```bash
git add components/Footer.tsx
git commit -m "feat: 공통 Footer 컴포넌트 추가 (저작권·출처·개인정보처리방침 링크)"
```

---

### Task 2: Footer를 layout에 전역 배치 + 인라인 푸터 제거

이 세 파일은 한 태스크로 묶는다(전역 푸터를 넣으면서 페이지별 푸터를 동시에 제거해야 푸터 중복이 안 생긴다).

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/result/page.tsx`

- [ ] **Step 1: layout.tsx 에 Footer import 추가**

`app/layout.tsx` 상단 import 블록에 한 줄 추가. 변경 전:

```tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
```

변경 후:

```tsx
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";
```

- [ ] **Step 2: layout.tsx body에 `<Footer />` 렌더**

`app/layout.tsx`의 `<body>` 내부. 변경 전:

```tsx
      <body className="min-h-full flex flex-col">
        {children}
        {adsenseClientId && (
```

변경 후:

```tsx
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
        {adsenseClientId && (
```

(`body`가 `flex flex-col`, Footer가 `mt-auto`라 콘텐츠가 짧아도 하단에 붙는다.)

- [ ] **Step 3: `app/page.tsx`의 인라인 푸터 제거**

아래 블록을 **삭제**한다(앞뒤 빈 줄 정리):

```tsx
        <footer className="mt-10 text-center text-xs text-gray-400">
          데이터: 행정안전부 도로명주소 영문 API
        </footer>
```

- [ ] **Step 4: `app/result/page.tsx`의 인라인 푸터 제거**

동일 내용 블록을 **삭제**한다(JP 지원 편집으로 줄 번호가 밀렸을 수 있으니 줄 번호가 아니라 아래 내용으로 찾을 것):

```tsx
        <footer className="mt-10 text-center text-xs text-gray-400">
          데이터: 행정안전부 도로명주소 영문 API
        </footer>
```

- [ ] **Step 5: 타입체크 + 린트**

Run: `npx tsc --noEmit && npm run lint`
Expected: 둘 다 통과(종료 0, 에러 없음).

- [ ] **Step 6: 개발서버에서 푸터 중복 없는지 확인**

먼저 개발 서버가 **하나만** 떠 있는지 확인(중복 서버는 Turbopack 캐시 손상 유발):

```bash
ps aux | grep -E 'next dev|next-server' | grep -v grep
```

서버가 없으면 `npm run dev`로 하나만 실행. 그다음:

```bash
curl -s http://localhost:3000/ | grep -c "개인정보처리방침"
curl -s "http://localhost:3000/result?street=B396%20Gangnam-daero&city=Gangnam-gu&state=Seoul&zip=06232&ko=Seoul" | grep -c "개인정보처리방침"
```
Expected: 두 명령 모두 `1` (각 페이지에 공통 푸터 1개). 페이지마다 "데이터: 행정안전부..." 도 1번만 나와야 한다:

```bash
curl -s http://localhost:3000/ | grep -c "행정안전부 도로명주소 영문 API"
```
Expected: `1`

- [ ] **Step 7: 커밋**

```bash
git add app/layout.tsx app/page.tsx app/result/page.tsx
git commit -m "refactor: 푸터를 공통 Footer로 일원화 (layout 전역 배치 + 인라인 푸터 제거)"
```

---

### Task 3: 개인정보처리방침 `/privacy` 페이지 생성

**Files:**
- Create: `app/privacy/page.tsx`

- [ ] **Step 1: privacy 페이지 작성**

`app/privacy/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 한글 → 영문 주소 변환기",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
            ← 홈으로
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">개인정보처리방침</h1>
          <p className="mt-1 text-xs text-gray-500">시행일 · 최종 수정일: 2026-06-04</p>
        </header>

        <div className="space-y-6 bg-white border border-gray-200 rounded-2xl p-6 text-sm text-gray-700 leading-relaxed">
          <p>
            본 방침은 ‘한글 → 영문 주소 변환기’(이하 ‘서비스’)가 이용자의 개인정보를 어떻게
            처리하는지 설명합니다.
          </p>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">1. 수집하는 개인정보</h2>
            <p>
              서비스는 회원가입이나 로그인 기능이 없으며, 이름·연락처 등 이용자의 개인정보를 직접
              수집하거나 저장하지 않습니다. 이용자가 입력한 주소 검색어는 영문 변환을 위해
              행정안전부 도로명주소 영문 API 조회에만 사용되며, 서버에 저장하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">2. 쿠키 및 광고</h2>
            <p>
              본 서비스는 Google AdSense를 통해 광고를 게재할 수 있습니다. Google을 포함한 제3자
              광고 사업자는 쿠키 및 광고 식별자를 사용하여 이용자의 관심사에 기반한 맞춤형 광고를
              제공할 수 있습니다.
            </p>
            <p className="mt-2">
              이용자는{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google 광고 설정
              </a>
              에서 맞춤형 광고를 비활성화하거나,{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                aboutads.info
              </a>
              에서 제3자 쿠키 사용을 거부할 수 있습니다. 자세한 내용은 Google 개인정보처리방침을
              참고하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">3. 외부 링크</h2>
            <p>
              본 서비스는 외부 사이트로 연결되는 링크를 포함할 수 있으며, 외부 사이트의 개인정보
              처리에 대해서는 책임지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">4. 방침 변경</h2>
            <p>본 개인정보처리방침이 변경되는 경우 변경 내용을 본 페이지에 게시합니다.</p>
          </section>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
            ← 홈으로
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: 타입체크 + 린트**

Run: `npx tsc --noEmit && npm run lint`
Expected: 둘 다 통과.

- [ ] **Step 3: 페이지 응답 확인**

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000/privacy
curl -s http://localhost:3000/privacy | grep -c "개인정보처리방침"
```
Expected: `HTTP 200`, grep 결과 ≥ `1`.

- [ ] **Step 4: 커밋**

```bash
git add app/privacy/page.tsx
git commit -m "feat: 개인정보처리방침(/privacy) 페이지 추가"
```

---

### Task 4: 통합 브라우저 검증 (커밋 없음)

**Files:** 없음 (확인 전용)

- [ ] **Step 1: 단일 개발 서버 확인**

```bash
ps aux | grep -E 'next dev|next-server' | grep -v grep
```
Expected: `next dev` / `next-server` 프로세스가 **한 쌍만**. 두 쌍 이상이면 중복 서버이므로 여분을 종료(`pkill`)하고 하나만 유지. (중복 서버 = Turbopack 캐시 손상 원인.)

- [ ] **Step 2: 세 경로 + 푸터 표시 확인**

브라우저(또는 playwright)로 `http://localhost:3000/`, `/result?street=B396%20Gangnam-daero&city=Gangnam-gu&state=Seoul&zip=06232&ko=Seoul`, `/privacy` 를 열어:
- 세 페이지 모두 하단에 공통 푸터(데이터 출처 · © 연도 · 개인정보처리방침) 1개씩 표시.
- 푸터의 "개인정보처리방침" 클릭 → `/privacy`로 이동.
- 콘솔 에러 없음, 반복 리로드(깜빡임) 없음.

- [ ] **Step 3: 모바일 폭 확인**

뷰포트 390px에서 `/`와 `/privacy`의 푸터·본문 레이아웃이 넘침·깨짐 없이 표시되는지 확인.

---

## Self-Review

**1. Spec coverage:**
- 공통 Footer 전역 배치 → Task 1+2 ✓
- 인라인 푸터 제거 → Task 2 ✓
- 저작권 + 데이터 출처 표기 → Task 1(Footer 내용) ✓
- 개인정보처리방침 페이지(/privacy) → Task 3 ✓
- 검증(tsc/lint/브라우저/모바일) → 각 태스크 Step + Task 4 ✓
- Non-goals(이용약관·면책·연락처·사업자정보) → 계획에 포함 안 함 ✓

**2. Placeholder scan:** "TBD/TODO/추후구현" 없음. 모든 코드 블록은 실제 코드. ✓

**3. Type consistency:** 새 export는 `Footer`(default), `PrivacyPage`(default) + `metadata`. layout import는 `@/components/Footer`로 일치. 타입 정의/시그니처 충돌 없음. ✓

(텍스트의 따옴표는 react/no-unescaped-entities 회피 위해 유니코드 따옴표 ‘ ’ 사용.)
