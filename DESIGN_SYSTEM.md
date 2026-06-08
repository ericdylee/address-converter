# DESIGN SYSTEM — 한글·일본 주소 → 영문 변환기

> 이 문서는 **지금 코드에 실제로 쓰이고 있는 디자인 값**(색·폰트·간격·컴포넌트 스타일)을 한곳에 정리한 참조 문서입니다.
> "이 디자인대로 ○○ 만들어줘"라고 할 때 이 문서를 같이 주면, 일관된 화면을 만들 수 있어요.
>
> - **출처:** `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/result/page.tsx`, `app/privacy/page.tsx`, `components/*`
> - **스택:** Tailwind CSS v4 (클래스 이름이 곧 디자인 토큰)
> - **버전:** v0.1 (현재 코드 기준 스냅샷) · 작성일 2026-06-06

---

## 1. 디자인 원칙 (Tone)

**"세련된 업무 도구(utility tool)".** 화려함보다 **깔끔함·신뢰감**이 우선입니다.

- 흰 카드 + 옅은 배경 + **섬세한 1px 보더** + **얕은 그림자** 중심
- 과한 둥근 모서리·강한 그림자·원색 남발 금지
- **파란색(blue-600) 하나**를 주요 액션 컬러로 일관되게 사용
- 영문 주소 값은 **모노스페이스 폰트**로 보여 정렬·가독성을 높임

---

## 2. 색상 (Color)

Tailwind 클래스 이름이 곧 토큰입니다. `hex`는 참고용 근삿값(Tailwind 기본 팔레트).

### 2.1 배경 (Background)

| 용도 | 값 | 비고 |
|------|----|----|
| 페이지 배경 | `#f6f8fc` | `--background` 토큰 → `bg-background` |
| body 배경 | `#f6f8fc` (`--background`) | 페이지와 동일하게 통일 ✅ |
| 카드/입력창 배경 | `white` | |
| 비활성 영역 배경 | `gray-50` `#f9fafb` | 탭 컨테이너, 드롭다운 hover |

### 2.2 텍스트 / 그레이 스케일

| 용도 | 토큰 | hex(근사) |
|------|------|-----------|
| 기본 전경색(토큰) | `--foreground` | `#111827` |
| 제목·주소 값(가장 진함) | `gray-950` | `#030712` |
| 가이드 summary 등 | `gray-900` | `#111827` |
| 입력 라벨 | `gray-800` | `#1f2937` |
| 본문(개인정보처리방침) | `gray-700` | `#374151` |
| 부제·도움말·푸터·필드 라벨 | `gray-500` | `#6b7280` |
| 플레이스홀더·로딩·빈 값 | `gray-400` | `#9ca3af` |
| 빈 값 placeholder, 화살표 | `gray-300` | `#d1d5db` |

### 2.3 주요 색 (Primary — Blue)

| 용도 | 토큰 | hex(근사) |
|------|------|-----------|
| 주요 버튼/활성 탭/채움 | `blue-600` | `#2563eb` |
| 버튼 hover, 링크, eyebrow, 팁 글자 | `blue-700` | `#1d4ed8` |
| 링크 hover | `blue-800` | `#1e40af` |
| 입력 focus 보더, 팁 좌측 선 | `blue-500` | `#3b82f6` |
| 비활성 검색버튼 아이콘 / 한 줄 주소 보더 | `blue-200` | `#bfdbfe` |
| focus 링, 배지 배경, 칩 보더 | `blue-100` | `#dbeafe` |
| 선택 항목 배경, 강조 카드 배경, 칩 배경 | `blue-50` | `#eff6ff` |

### 2.4 의미색 (Semantic) & 강조 (Accent)

| 용도 | 토큰 | hex(근사) |
|------|------|-----------|
| 성공(복사 완료) | `emerald-600` | `#059669` |
| 에러 메시지 | `red-600` | `#dc2626` |
| 일본 배지 | `red-100` / `red-700` | `#fee2e2` / `#b91c1c` |

### 2.5 보더 & 선택 영역

| 용도 | 값 |
|------|----|
| 카드·패널·드롭다운·푸터 보더 | `border-border` (= gray-200 `#e5e7eb`) ✅ 통일 |
| 입력창 보더 | `border-gray-300` (hover `gray-400`) |
| 드롭다운 항목 구분선 | `border-gray-100` |
| 텍스트 드래그 선택 | 배경 `#dbeafe` · 글자 `#172554` (`globals.css ::selection`) |

---

## 3. 타이포그래피 (Typography)

- **본문 폰트:** Geist Sans (`--font-geist-sans`, `next/font/google`)
- **모노 폰트:** Geist Mono (`--font-geist-mono`) — **영문 주소 값 전용**(`font-mono`)
- 전역 `antialiased`

| 용도 | 클래스 |
|------|--------|
| 페이지 제목 (h1) | `text-2xl font-semibold` (sm 이상 `text-3xl`) |
| 섹션 제목 (h2) | `font-semibold` (privacy), `text-xs font-semibold` (구분선 라벨) |
| 본문 / 버튼 / 링크 / 라벨 | `text-sm` |
| 입력창 텍스트 | `text-[15px]` |
| 도움말·푸터·칩·가이드 | `text-xs` |
| 필드 라벨(카드 상단) | `text-[11px] font-semibold uppercase` |
| 배지(KR/JP) | `text-[10px] font-bold` |
| eyebrow("Address Converter") | `text-xs font-semibold uppercase tracking-[0.14em] text-blue-700` |

**굵기:** `font-semibold`(라벨·버튼·제목) · `font-medium`(링크·후보 제목) · `font-bold`(배지) · `font-normal`(주석)

---

## 4. 간격 & 레이아웃 (Spacing & Layout)

| 용도 | 값 |
|------|----|
| 콘텐츠 최대폭 | `max-w-3xl mx-auto` (에러 화면은 `max-w-2xl`) |
| 페이지 패딩 | `px-4 py-10` (sm 이상 `py-14`) |
| 큰 카드 패딩 | `p-5` (sm `p-6`) / privacy `p-6` |
| 작은 카드·입력칸 내부 | `px-4 py-3` |
| 입력 + 버튼 묶음 간격 | `flex items-stretch gap-2` |
| 탭 컨테이너 내부 간격 | `gap-1` + `p-1` |
| 카드 목록 세로 간격 | `space-y-3` |
| 문단 섹션 간격(privacy) | `space-y-6` |

**페이지 골격:** `min-h-screen` 배경 → `max-w-3xl` 가운데 컨테이너 → `header`(eyebrow+제목+설명) → `section` 카드. 푸터는 `layout.tsx`에서 전역(`mt-auto`).

---

## 5. 모서리(Radius) & 그림자(Shadow)

### 모서리
| 용도 | 값 |
|------|----|
| 카드·입력·버튼·드롭다운 | `rounded-lg` (기본값) |
| 탭 버튼 | `rounded-md` |
| 배지 | `rounded` |
| 칩("변환 결과") | `rounded-full` |

### 그림자
| 용도 | 값 |
|------|----|
| 큰 카드(전체) | `shadow-card` = `0 20px 60px rgba(15,23,42,0.06)` ✅ 통일 |
| 작은 필드 카드 | `shadow-field` = `0 1px 2px rgba(15,23,42,0.03)` |
| 드롭다운 | `shadow-dropdown` = `0 22px 55px rgba(15,23,42,0.14)` |
| 한 줄 주소 강조 카드 | `shadow-[0_1px_2px_rgba(37,99,235,0.08)]` (파란 강조, 별도 유지) |
| 버튼 | `shadow-sm shadow-blue-600/20` |

---

## 6. 컴포넌트 스펙 (Components)

> 아래 클래스 문자열은 **현재 코드 그대로**입니다. 그대로 복사하면 동일한 모양이 나옵니다.

### 6.1 기본 버튼 (Primary Button)
```
bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700  + rounded-lg + text-sm font-semibold
```
- **복사 완료 상태:** `bg-emerald-600 text-white` (1.5초간 "복사됨!")
- **비활성(공통):** `cursor-not-allowed bg-gray-100 text-gray-400` (필드 카드·검색 버튼 동일 ✅)

### 6.2 입력창 (Input)
```
h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-[15px] text-gray-950
outline-none transition placeholder:text-gray-400
hover:border-gray-400 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100
```

### 6.3 입력 라벨 (Label)
```
mb-2 block text-sm font-semibold text-gray-800
```

### 6.4 필드 카드 (AddressCard)
```
flex-1 rounded-lg border border-border bg-white px-4 py-3 shadow-field
```
- 라벨: `text-[11px] font-semibold uppercase text-gray-500`
- 값: `text-sm leading-6 text-gray-950` (빈 값이면 `text-gray-300`)

### 6.5 세그먼트 탭 (Segmented Control — 한국/일본)
- 컨테이너: `flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1`
- 버튼 base: `flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors`
- 활성: `bg-blue-600 text-white shadow-sm`
- 비활성: `text-gray-500 hover:bg-white hover:text-gray-900`

### 6.6 국가 배지 (Badge KR/JP)
```
rounded px-1.5 py-0.5 text-[10px] font-bold
```
- 활성: `bg-white/20 text-white` · KR 비활성: `bg-blue-100 text-blue-700` · JP 비활성: `bg-red-100 text-red-700`

### 6.7 자동완성 드롭다운 (Dropdown)
- 컨테이너: `absolute z-10 mt-2 max-h-80 w-full overflow-auto rounded-lg border border-border bg-white shadow-dropdown`
- 항목: `cursor-pointer border-b border-gray-100 px-4 py-3 last:border-b-0`
- 항목 강조(키보드/hover): `bg-blue-50` / 일반 hover: `hover:bg-gray-50`

### 6.8 강조 카드 — 영문 주소 한 줄 (Highlight Card)
```
rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3 shadow-[0_1px_2px_rgba(37,99,235,0.08)]
```

### 6.9 칩 (Status Chip — "변환 결과")
```
rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700
```

### 6.10 팁 박스 (Callout)
```
border-l-2 border-blue-500 bg-blue-50/60 px-4 py-3   + 글자 text-blue-800
```

### 6.11 접이식 가이드 (Details / Summary)
- 컨테이너: `rounded-lg border border-border bg-white`
- summary: `px-5 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50` + 화살표 `group-open:rotate-180`

### 6.12 구분선 (Divider with label)
```
flex-1 h-px bg-gray-200   (양옆)  +  가운데 text-xs font-semibold text-gray-500
```

### 6.13 푸터 (Footer)
```
mt-auto border-t border-border px-4 py-8 text-center text-xs leading-5 text-gray-500
```

---

## 7. 아이콘 (Icons)

- 인라인 SVG, `stroke="currentColor"` `strokeWidth="2"` `strokeLinecap/Linejoin="round"` (Lucide 스타일)
- 검색 아이콘 `w-5 h-5`, 화살표(가이드) `w-4 h-4`
- 장식용 아이콘엔 `aria-hidden="true"`

---

## 8. 값 불일치 정리 (해결됨 ✅, 2026-06-06)

> 시스템화하면서 미세하게 갈렸던 값 4개를 하나로 통일했습니다.

1. **페이지 배경** — `#f6f8fc` / `#f7f8fb` 두 값 → `--background`(`#f6f8fc`) 하나로 통일 ✅
2. **큰 카드 그림자** — `0.07` / `0.06` 두 값 → `shadow-card` 토큰 하나로 통일 ✅
3. **비활성 버튼** — 회색 / 파랑 두 스타일 → `bg-gray-100 text-gray-400` 하나로 통일 ✅
4. **보더** — `gray-200/90`·`/80`·`gray-200` 혼재 → `border-border` 토큰 하나로 통일 ✅

---

## 9. 토큰 레이어 (구현됨 ✅)

색·그림자의 표준 값을 `app/globals.css` 한곳에 모았습니다. 실제 적용된 토큰:

```css
:root {
  --background: #f6f8fc;  --surface: #ffffff;  --foreground: #111827;  --border: #e5e7eb;
  --primary: #2563eb;     --primary-hover: #1d4ed8;  --success: #059669;  --danger: #dc2626;
}
@theme inline {
  --color-background: var(--background);   --color-surface: var(--surface);
  --color-foreground: var(--foreground);   --color-border: var(--border);
  --color-primary: var(--primary);         --color-primary-hover: var(--primary-hover);
  --color-success: var(--success);         --color-danger: var(--danger);
  --shadow-card: 0 20px 60px rgba(15,23,42,0.06);
  --shadow-field: 0 1px 2px rgba(15,23,42,0.03);
  --shadow-dropdown: 0 22px 55px rgba(15,23,42,0.14);
}
```

- **지금 적용됨:** 배경(`bg-background`), 보더(`border-border`), 그림자(`shadow-card/field/dropdown`).
- **토큰은 정의됐지만 컴포넌트는 아직 Tailwind 색을 쓰는 곳:** `bg-blue-600`, `bg-white`, `text-gray-*` 등.
- **다음 단계 (다크모드용):** 위 색들을 의미 토큰(`bg-primary`, `bg-surface` 등)으로 옮기면, **토큰 값만 바꿔** 다크모드를 켤 수 있습니다.

---

## 10. 이 문서 사용법

- 새 화면/컴포넌트를 만들 때: **이 문서를 같이 첨부**하고 "DESIGN_SYSTEM.md의 토큰·컴포넌트 스펙대로 만들어줘"라고 요청.
- 색·간격을 새로 정할 일이 생기면, **먼저 이 문서에 추가**한 뒤 코드에 반영(문서 = 단일 출처).
- 코드 디자인이 바뀌면 이 문서도 같이 업데이트(특히 §6 컴포넌트, §8 불일치).

---

*v0.1 — 현재 코드 스냅샷. §8·§9는 앞으로의 정리 방향 제안입니다.*
