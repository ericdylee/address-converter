# AdSense 전면광고 노출용 검색/결과 페이지 분리

작성일: 2026-05-27

## 배경

한글 → 영문 주소 변환 사이트를 도메인 연결 후 Google AdSense로 수익화한다. AdSense의 **Vignette(전면)** 광고는 페이지 이동 시점에 자동 서빙되므로, 현재 단일 페이지 구조를 검색/결과 두 페이지로 나눠 자연스러운 라우트 이동을 만든다.

## 제약 / 비목표

- AdSense는 "버튼 클릭 시 광고 보장"을 제공하지 않는다. Vignette 노출은 AdSense가 빈도/정책에 따라 자체 판단한다. 본 작업의 책임은 "라우트 전환을 안정적으로 발생시키는 것"까지.
- AdSense 승인은 도메인 연결 이후 진행되므로, 본 작업에서는 publisher ID 없이 비활성 상태로 코드를 들여놓고, env var이 채워지면 자동 활성화되게 한다.
- 기존 변환 로직(`lib/juso.ts`, `lib/romanize.ts`)은 변경하지 않는다.

## 라우트 구조

| 경로 | 역할 |
|------|------|
| `/` | 검색창(`AddressSearch`)만. 자동완성 드롭다운으로 후보 선택. |
| `/result` | URL 파라미터에서 주소 4필드를 읽어 카드로 표시. 상세주소 입력란 포함. |

후보 클릭 시 `/result?...`로 클라이언트 라우팅(`router.push`). Vignette은 AdSense가 SPA 네비게이션을 감지해 처리한다. 노출이 빈약하면 차후 `<a href>` 풀 네비게이션으로 전환 가능.

## URL 스키마

```
/result?street=<encoded>&city=<encoded>&state=<encoded>&zip=<encoded>&ko=<encoded>
```

- 5개 모두 `encodeURIComponent` 적용.
- `ko`는 원본 한글 주소(결과 페이지 상단 표시용).
- 4개 영문 필드 중 하나라도 누락이면 결과 페이지는 "잘못된 접근" 안내 + `/`로 돌아가는 링크.

## 컴포넌트 변경

- `components/AddressSearch.tsx`: 변경 없음. `onSelect(result)` 인터페이스 유지.
- `app/page.tsx`: 상태 제거. `<AddressSearch onSelect={r => router.push('/result?...')} />`만. 헤더 + 한 줄 설명 + 검색창.
- `app/result/page.tsx` 신설:
  - `'use client'` + `useSearchParams`로 4필드 읽기.
  - `detail: string` 로컬 state. Street 카드 값은 `combineStreetWithDetail(street, detail)`.
  - 4개 `AddressCard` 렌더 (Street / City / State / Postal Code). Country는 정적 라벨.
  - 상단에 "다시 검색" 링크(`/` 로 이동).
- `components/AddressCard.tsx`: 변경 없음.

## AdSense 통합

- env var: `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (예: `ca-pub-1234567890123456`). `.env.local.example`에 추가.
- `app/layout.tsx`:
  ```tsx
  {clientId && (
    <Script
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  )}
  ```
- `public/ads.txt`: 빈 파일로 미리 둠. 승인 후 `google.com, pub-XXX, DIRECT, f08c47fec0942fa0` 형식으로 채움.
- Vignette/Anchor 등 실제 광고 단위는 코드가 아닌 AdSense 대시보드의 Auto Ads 토글로 활성화.

## 에러/엣지 케이스

- `/result` 직접 접근(파라미터 없음): "잘못된 접근입니다. 검색 페이지로 이동해주세요." + 링크.
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 미설정: 스크립트 로드 안 함(개발 환경 기본). 콘솔 경고 없음.
- 동일 후보 재선택 시 같은 URL로 push되어도 동작 정상(Next router는 동일 경로도 처리).

## 테스트 / 검증 방법

수동 검증 위주(자동 테스트 없음, 프로젝트 규모상):

1. `/` 접근 → 검색창만 보임. 4개 카드 / 상세주소 입력란 없음.
2. "강남대로 396" 검색 → 드롭다운 → 항목 클릭 → `/result?...`로 이동, 카드 4개 + 한글 원본 표시.
3. 상세주소 "101동 502호" 입력 → Street 카드에 `... , 101-502` 반영.
4. `/result` 직접 진입 → 잘못된 접근 안내.
5. `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 미설정 빌드 → DOM에 adsbygoogle 스크립트 없음.
6. 더미 ID 설정 → `<script>` 태그 존재(실 광고는 미승인이라 안 뜸).

## 비범위

- AdSense 승인 신청, 도메인 연결, ads.txt 실제 값 채우기 — 코드 작업 외 운영 단계.
- 인앱 배너 광고 슬롯 배치(예: 결과 페이지 카드 사이 광고) — 승인 후 별도 작업으로.
- 검색 히스토리, 즐겨찾기 등 — 본 변경 범위 아님.
