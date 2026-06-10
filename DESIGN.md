# Design

> 디자인 작업(/impeccable)이 참조하는 시각 시스템 요약.
> 상세 컴포넌트 스펙(클래스 문자열 단위)은 `DESIGN_SYSTEM.md`가 정본이며, 이 문서는 그 위에 방향성(모티프·모션·금지사항)을 더한 것. 코드가 바뀌면 두 문서를 같이 갱신한다.

## Theme

**"세련된 업무 도구"** — 밝은 배경(`#f6f8fc`) 위 흰 카드, 섬세한 1px 보더, 다층 그림자. 화려함보다 깔끔함·신뢰감. 라이트 테마 단일(다크모드는 토큰화 이후 백로그).

시그니처: **국제우편(에어메일) 모티프**. 에어메일 봉투 줄무늬(빨강 `#dc2626`·파랑 `#2563eb` 사선 패턴), 우편 라벨 느낌의 영문 주소 표기. 화면당 1~2곳만 — 검색 카드 상단 라인, 결과의 영문 주소 블록 등 "주소가 해외로 간다"는 의미가 닿는 자리에만 쓴다.

## Colors

| 역할 | 토큰 | 값 |
|---|---|---|
| 페이지 배경 | `--background` / `bg-background` | `#f6f8fc` |
| 카드·입력 표면 | `--surface` | `#ffffff` |
| 기본 텍스트 | `--foreground` | `#111827` (제목·값은 `gray-950`) |
| 보더 | `--border` / `border-border` | `#e5e7eb` |
| 주요 액션 (버튼·활성 탭·링크) | `--primary` (blue-600) | `#2563eb` |
| 주요 액션 hover | `--primary-hover` (blue-700) | `#1d4ed8` |
| 성공 (복사 완료) | `--success` (emerald-600) | `#059669` |
| 에러 | `--danger` (red-600) | `#dc2626` |
| 보조 텍스트 | gray-500~800 단계 | `DESIGN_SYSTEM.md` §2.2 |
| 강조 배경 (선택 항목·팁) | blue-50/100 | `#eff6ff` / `#dbeafe` |
| 국가 배지 | KR=blue-100/700 · JP=red-100/700 | |

색 전략: **Restrained** — 파랑 하나가 액션을 전담하고, 빨강은 에러·JP 배지·에어메일 줄무늬에만. 새 색을 추가하지 않는다.

## Typography

- **본문**: Pretendard Variable (CDN, `--font-sans`) → Geist Sans 폴백. 전역 기준 크기 112.5%(18px) — 고령·저시력 배려, 줄이지 말 것.
- **영문 주소 값 전용**: Geist Mono (`font-mono`) — 데이터다움·정렬 가독성. 주소 외 장식 용도로 쓰지 않는다.
- 스케일은 고정 rem (product 레지스터 — fluid/clamp 제목 금지). 위계: h1 `text-2xl~3xl font-bold` / 라벨 `text-sm font-semibold` / 필드 라벨 `text-[11px]~xs uppercase` / 도움말 `text-xs`.

## Spacing & Layout

- 가운데 1단 `max-w-3xl`, 페이지 패딩 `px-4 py-10`(sm `py-14`).
- 카드 목록 `space-y-3`, 큰 카드 `p-5~6`, 입력+버튼 `gap-2`.
- 모서리: 기본 `rounded-lg`, 탭 `rounded-md`, 칩 `rounded-full`. 과한 라운드 금지.
- 그림자 3단계 토큰: `shadow-card`(큰 카드, 다층) > `shadow-dropdown` > `shadow-field`(필드 카드). 임의 그림자 값 추가 금지.

## Components

정본은 `DESIGN_SYSTEM.md` §6 (버튼·입력·필드 카드·세그먼트 탭·배지·드롭다운·강조 카드·칩·팁 박스·접이식 가이드·구분선·푸터). 원칙:

- 버튼 위계: 진한 파랑(solid)은 화면당 핵심 액션에만. 보조 액션은 연한 스타일.
- 모든 인터랙티브 요소는 default/hover/focus/disabled 상태를 갖춘다. 복사 완료는 emerald + "복사됨!" 1.5초.
- 자동완성은 combobox/listbox ARIA, 복사 버튼은 aria-live 유지.

## Iconography

인라인 SVG, Lucide 스타일 (`stroke=currentColor`, `strokeWidth=2`, round cap/join). 장식 아이콘엔 `aria-hidden`.

## Motion

- 150~250ms, ease-out. `transition-colors` 위주 — 도구는 기다리게 하지 않는다.
- 모션은 상태 전달용(hover, 복사 피드백, 로딩 스피너)만. 페이지 로드 연출·장식 모션 금지.
- `prefers-reduced-motion` 존중.

## Don't

- 파랑 외 새 액션 컬러, 그라데이션, 글래스모피즘.
- 광고처럼 보이는 박스 / 기능처럼 보이는 광고 배치.
- 영문 주소 외 mono 폰트 남용, 본문 글씨 축소.
- 우편 모티프 과용 (화면당 1~2곳 초과).
