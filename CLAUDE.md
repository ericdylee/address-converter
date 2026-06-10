# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

@AGENTS.md

## 프로젝트 개요

한글 주소를 영문 주소로 변환해주는 웹 앱입니다. 사용자가 한글 주소(도로명 또는 지번)를 입력하면 행정안전부 공식 영문주소 API(`business.juso.go.kr`)를 기반으로 자동완성 후보를 제시하고, 사용자가 선택하면 영문 주소를 Street / City / State / Postal Code 4개 필드로 분리해서 표시합니다. 각 필드는 개별 복사 버튼이 있어, 입력란이 분리된 해외 사이트에 붙여넣기 편하도록 만들어졌습니다.

## 명령어

```bash
npm run dev      # 개발 서버 (Turbopack), http://localhost:3000
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 빌드 실행
npm run lint     # eslint
npm test         # vitest 단위 테스트 (lib/*.test.ts)
npx tsc --noEmit # 타입 체크만
```

`.env.local`에 `JUSO_API_KEY`가 설정되어 있어야 합니다 (`.env.local.example` 참고). 키가 없으면 `/api/search-address`는 503과 함께 한글 에러 메시지를 반환합니다 — UI에서 설정 누락을 바로 알 수 있도록 의도된 동작입니다.

## 아키텍처

Next.js App Router 기반 두 라우트 앱(`/` 검색, `/result` 결과). juso API 키는 서버에만 두기 때문에 브라우저는 juso를 직접 호출하지 않고 항상 `/api/search-address`를 거칩니다. 두 페이지로 나눈 이유는 AdSense Vignette(전면 광고)이 라우트 전환 시점에 서빙되도록 하기 위함입니다.

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

**모듈 경계:**
- `lib/juso.ts` — juso API 응답 모양을 알고 있는 유일한 파일. `parseEnglishAddress()`가 `engAddr` 콤마 문자열을 Street/City/State로 분리. juso가 응답 형식을 바꾸면 여기만 고치면 됩니다.
- `lib/romanize.ts` — `romanizeDetail()`이 상세주소 한글 접미사를 변환. `101동 502호` 같이 동+공백+호 패턴은 `101-502`로 합쳐짐 (동은 `-`로, 호는 제거). 그 외: `층`→`F`, `번지`→`-beonji`, `관`→`-gwan`, `실`→`-sil`. 한글이 없는 입력은 그대로 통과. `combineStreetWithDetail()`이 상세주소를 Street 필드에 합치는 진입점.
- `app/api/search-address/route.ts` — 얇은 핸들러. `MISSING_KEY` 에러는 503 + 사용자용 한글 메시지로, 그 외 에러는 500으로 변환. 개발 모드에서는 `detail` 필드에 원본 에러도 담음.
- `components/AddressSearch.tsx` — 자동완성 상태를 모두 가짐: debounce, 진행 중 요청 취소용 AbortController, 키보드 네비게이션(↑↓ Enter Esc), 외부 클릭 시 닫힘.
- `components/AddressCard.tsx` — 영문 필드 1개당 카드 1개. `navigator.clipboard.writeText` 우선, 구형 브라우저 대비 `document.execCommand("copy")` 폴백.
- `app/layout.tsx` — `NEXT_PUBLIC_ADSENSE_CLIENT_ID` env var이 있을 때만 AdSense 스크립트(`adsbygoogle.js`) 삽입. 없으면 로드 안 함(개발/미승인 환경 기본).
- `public/ads.txt` — AdSense 승인 후 publisher ID 채워야 광고 서빙 가능. 코드 변경 없음.

**페이지 상태:**
- `app/page.tsx`(HomePage): 상태 없음. `AddressSearch.onSelect`에서 `router.push('/result?...')`로 5개 값(street/city/state/zip/ko)을 URL에 인코딩.
- `app/result/page.tsx`(ResultPage): `useSearchParams`로 5개 값을 읽고, `detail: string` 로컬 state만 가짐. Street 카드는 `combineStreetWithDetail(street, detail)`로 derive. 4필드 중 누락이 있으면 "잘못된 접근" 안내. Country는 정적 라벨.
- `useSearchParams`는 Next.js 16 App Router 규약상 `<Suspense>` 경계 안에서 호출해야 하므로 `ResultPage`가 `Suspense`로 `ResultContent`를 감쌈.

## Next.js 16 관련 메모

Next.js 16 + React 19 + Tailwind v4 사용 (위의 `AGENTS.md` 경고 참고). API 컨벤션이 헷갈리면 기억보다 `node_modules/next/dist/docs/`를 먼저 확인하세요 — App Router 파일 규약과 route handler 시그니처가 이전 버전과 다를 수 있습니다.

경로 alias `@/*`는 프로젝트 루트를 가리킵니다(`tsconfig.json` 참고). 그래서 어디서든 `@/lib/juso`, `@/components/AddressCard` 같이 import 할 수 있습니다.
