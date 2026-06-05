# ROADMAP

한글→영문 주소 변환기 프로젝트의 단계별 작업 진행 상황입니다.

> **진행률:** ▓▓▓▓▓▓▓▓▓▓▓▓░░ 8/9 단계 완료 (9 배포 남음) · +11단계 일본 주소 변환 완료 ✅ · +12단계 푸터/디자인 개선 완료 ✅

> **아키텍처 메모:** 초기 설계는 "단일 페이지 + 별도 상세주소 입력란"이었으나,
> 이후 **2-라우트 구조(`/` 검색 · `/result` 결과) + AdSense Vignette** 로 재구조화되었고
> 상세주소는 별도 입력란 대신 **검색어에서 자동 추출**하는 방식으로 바뀌었습니다.
> 아래 5·6단계에 반영되어 있습니다. 자세한 현재 구조는 `CLAUDE.md` 참고.

---

## 1단계 — 기획 & 설계 ✅

- [x] 요구사항 인터뷰 (변환 방식, 기술 스택, UX, 상세주소 처리 등)
- [x] 설계서 작성 (`/Users/eric/.claude/plans/steady-leaping-finch.md`)
- [x] 아키텍처 결정: Next.js App Router + juso API 프록시 + 4-필드 카드 UI

**산출물:** 설계서 (`plans/steady-leaping-finch.md`)

---

## 2단계 — 프로젝트 셋업 ✅

- [x] `create-next-app`으로 스캐폴딩 (TypeScript + App Router + Tailwind v4)
- [x] Next.js 16, React 19 환경 확인
- [x] `tsconfig.json`의 `@/*` 경로 alias 확인

**산출물:** `package.json`, `tsconfig.json`, `next.config.ts`, 기본 `app/` 폴더

---

## 3단계 — 핵심 라이브러리 ✅

- [x] `lib/types.ts` — 공통 타입 (`AddressFields`, `AddressResult`, `SearchResponse`, `JusoApiItem`, `JusoApiResponse`)
- [x] `lib/romanize.ts` — 상세주소 한글→로마자 변환 (`동/호/층/번지/관/실`)
- [x] `lib/juso.ts` — juso API 클라이언트 (응답 파싱 + Street/City/State 분리)
- [x] `lib/extract-detail.ts` — 검색어에서 상세주소 패턴(`101동 502호` 등) 자동 추출

**산출물:** `lib/` 디렉토리 4개 파일

---

## 4단계 — API 라우트 ✅

- [x] `app/api/search-address/route.ts` — juso API 프록시
- [x] API 키 미설정 시 503 + 한글 에러 메시지
- [x] juso API 에러 → 500 + 사용자 친화적 메시지 (개발 모드에선 `detail` 포함)
- [x] 검색어 2글자 미만 시 빈 결과 반환 (불필요한 API 호출 방지)
- [x] `.env.local.example` 작성

**산출물:** `/api/search-address` 엔드포인트, 환경변수 예시

---

## 5단계 — UI 컴포넌트 ✅

- [x] `AddressSearch` — 300ms debounce 자동완성, AbortController로 진행 요청 취소, 키보드 네비게이션(↑↓ Enter Esc), 외부 클릭 시 닫힘
- [x] `AddressSearch` — 검색어에서 상세주소를 분리해 키워드만 juso에 질의 (`extract-detail` 활용)
- [x] `AddressCard` — 라벨 + 값 + 복사 버튼, `navigator.clipboard` + `execCommand` 폴백, "복사됨!" 1.5초 피드백
- [x] ~~`DetailAddressInput` — 별도 상세주소 입력란~~ → **제거됨** (상세주소는 검색어에서 자동 추출하는 방식으로 대체)

**산출물:** `components/` (`AddressSearch`, `AddressCard`)

---

## 6단계 — 페이지 · 문서 · AdSense ✅

- [x] `app/page.tsx`(HomePage) — 검색창만 있는 단순 진입 페이지, 후보 선택 시 `/result`로 라우팅 (5필드 + detail을 URL params로 전달)
- [x] `app/result/page.tsx`(ResultPage) — `useSearchParams`로 값 읽어 4개 카드 + "영문 주소 한 줄" 블록 렌더, `Suspense` 경계로 감쌈
- [x] `app/layout.tsx` 메타데이터 한글화 + `lang="ko"`
- [x] `app/layout.tsx` — `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 있을 때만 AdSense 스크립트 조건부 로드
- [x] `public/ads.txt` — AdSense 승인 후 publisher ID 채울 자리 준비
- [x] `README.md` — 사용법 + juso API 키 발급 절차
- [x] `CLAUDE.md` / `AGENTS.md` — Claude Code 작업용 컨텍스트 (한글)

**산출물:** 동작하는 2-라우트 앱, AdSense 통합 자리, 사용자 문서

---

## 7단계 — API 키 발급 & 로컬 환경 설정 ✅

- [x] https://business.juso.go.kr 회원가입 + 영문주소 API 신청 (개발용 키 발급)
- [x] `.env.local`에 `JUSO_API_KEY` 설정 완료
- [x] 라이브 검증: `테헤란로` 검색 시 후보 10건 + 영문 변환(`428 Teheran-ro / Gangnam-gu / Seoul / 06194`) 정상 반환 확인

**완료 기준:** 브라우저에서 "테헤란로" 검색 시 후보 목록이 드롭다운에 뜸 ✅

---

## 8단계 — 통합 테스트 ✅

API 키 검증 완료 — UI 레벨 E2E 점검(Playwright로 실제 브라우저 검증):

- [x] 자동완성: 도로명 주소 검색 ("테헤란로", "강남대로 396") → 후보 드롭다운 정상
- [x] 자동완성: 지번/동 검색 ("역삼동") → 후보 정상
- [x] 후보 선택 → `/result`로 이동, 4개 카드(Street/City/State/PostalCode) 채워짐 확인
- [x] 검색어에 상세주소 포함 ("올림픽로 300 101동 504호") → 키워드만 질의되고 Street에 `101-504` 합쳐짐
- [x] "영문 주소 한 줄" 블록 + 각 카드 [복사] → 실제 클립보드에 값 들어감 확인 (예: Postal Code → "06211")
- [x] 키보드 네비게이션(↑↓ Enter) 동작 — ↓↓+Enter로 3번째 후보 선택 후 `/result` 이동 확인
- [x] `/result` 직접 접근(필수 param 누락) → "잘못된 접근입니다" 안내 + 검색 페이지 링크
- [x] 모바일 화면(375px) 레이아웃 확인 — 가로 오버플로우 없음
- [x] 잘못된 검색어 ("ㅁㄴㅇㄹ") → "검색 결과가 없습니다" 표시

**E2E 중 관찰한 이슈:**
- 점검 초반 후보 선택 시 `ReferenceError: extractDetail is not defined`가 한 번 발생해 `/result` 이동이 안 됐으나, 이는 **소스 버그가 아니라 개발서버(Turbopack)의 깨진 컴파일 상태**였음 — 같은 시점 dev 로그에 `Turbopack FATAL … Next.js package not found` 패닉 기록이 있고, 재컴파일 후 정상화됨. 소스(`app/page.tsx`)는 이미 `extractDetail`를 정상 import 하고 있으며 `git` 기준 변경 없음. **교훈: 개발 중 원인 불명의 클라이언트 에러가 나면 dev 서버를 재시작(재컴파일)해볼 것.**

---

## 9단계 — 배포 ⏳

- [ ] GitHub 저장소 생성 & push
- [ ] Vercel 프로젝트 연동 (https://vercel.com/new)
- [ ] Vercel 환경변수 `JUSO_API_KEY` 등록 (운영용 키 권장)
- [ ] 운영용 API 키 신청 (juso 운영용 신청 후 1~2영업일)
- [ ] AdSense 승인 후 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 등록 + `public/ads.txt` 채우기
- [ ] 배포 후 운영 도메인에서 검증 (8단계 항목 반복)

---

## 10단계 — 향후 개선 (선택) 💡

우선순위 없는 후보들. 필요할 때 꺼내쓰는 백로그.

- [ ] 변환 이력 저장 (localStorage)
- [ ] 즐겨찾기 / 자주 쓰는 주소 핀
- [ ] 다크모드 토글
- [x] "전체 주소 한 줄" 카드 추가 — `/result`의 "영문 주소" 블록으로 구현됨
- [ ] 도로명/지번 토글 또는 모두 표시
- [ ] 영문 표기 보정 옵션 (예: `-gu` → `gu`, 공식 우편번호 형식 등)
- [ ] juso API 응답 캐싱 (같은 키워드 반복 호출 시)
- [ ] 단위 테스트 (`romanize.ts`, `parseEnglishAddress`, `extract-detail`, `jp-postal`)
- [x] 다국어 변환 — **일본 주소(우편번호→영문) 추가** (아래 11단계 참고) / 중국어는 미정
- [ ] PWA 설정 (오프라인 일부 지원)

---

## 11단계 — 일본 주소(우편번호) 영문 변환 ✅

홈에 **[🇰🇷 한국][🇯🇵 일본] 탭**을 추가. 일본은 한국(juso)처럼 무료 영문 자동완성 API가
없어 **우편번호(7자리) 조회** 방식으로 구현. 결과 페이지(4-필드 카드)는 그대로 재사용하고
`country` 파라미터로 분기.

- [x] `scripts/build-jp-postal.mjs` — 일본우편 공식 로마자 데이터(`KEN_ALL_ROME.CSV`, Shift_JIS)를
      다운로드/디코딩/정제 → `data/jp-postal.json`(우편번호 12만건). `npm run build:jp-data`로 갱신
- [x] `lib/jp-postal.ts` — JSON을 fs로 1회 로드/캐시, `lookupPostalCode()` (외부 키 불필요)
- [x] `lib/romanize.ts` — `combineJpStreet()` (일본식 어순: 번지가 동네 앞 → `1-1-1 Marunochi`)
- [x] `app/api/jp-address/route.ts` — `GET ?zip=` 우편번호 조회 프록시
- [x] `components/JpAddressSearch.tsx` — 우편번호 입력 + 번지·건물번호 입력 + 후보 드롭다운
- [x] `app/page.tsx` — 한국/일본 탭. `app/result/page.tsx` — `country`별 Street 어순/라벨/가이드 분기
- [x] `next.config.ts` — `outputFileTracingIncludes`로 `data/jp-postal.json`을 서버 번들에 포함
- [x] E2E(Playwright) 검증: `100-0005`→`1-1-1 Marunochi, Chiyoda-ku, Tokyo 100-0005, Japan`,
      동네 없는 `060-0000`(시 전체) 엣지케이스, 한국 흐름 회귀, 콘솔 에러 0

> **데이터 갱신 메모:** `KEN_ALL_ROME`은 연 1회 정도 갱신됨. `npm run build:jp-data` 재실행 후
> `data/jp-postal.json` 교체. 일본우편 공식 로마자는 장음을 생략함(예: 丸の内=`Marunochi`, 東京=`Tokyo`).

---

## 12단계 — 푸터 · 개인정보처리방침 · 디자인 개선 ✅

AdSense/신뢰도 보강을 위해 공통 푸터와 개인정보처리방침을 정리하고, 전체 UI를 더 깔끔한 최신 유틸리티 디자인 톤으로 개선.

- [x] `components/Footer.tsx` — 전역 공통 푸터 문구 정리
  - copyright 문구: `copyrightⓒ한글일본주소-영문변환기`
  - 하단 문구: `all right reserve`
  - 데이터 출처 + 개인정보처리방침 링크 유지
- [x] `app/privacy/page.tsx` — 개인정보처리방침 문서 페이지를 문서형 카드 UI로 정리
- [x] `app/globals.css` — 기본 배경/전경색, Geist 폰트 기준, selection 컬러 정리
- [x] `app/page.tsx` — 홈 화면 레이아웃 개선
  - `Address Converter` eyebrow 추가
  - 한국/일본 탭을 segmented control 형태로 개선
  - 활성 `KR 한국` 버튼과 주요 버튼 색상을 파란색으로 통일
- [x] `components/AddressSearch.tsx`, `components/JpAddressSearch.tsx` — 입력창/검색 버튼/드롭다운 디자인 통일
  - 검색 버튼은 파란색 유지
  - hover/focus 상태, 비활성 상태, 드롭다운 그림자/선택 상태 개선
- [x] `app/result/page.tsx`, `components/AddressCard.tsx` — 결과 화면 디자인 개선
  - 대표 영문 주소 블록 강조
  - 필드별 복사 카드 정돈
  - 복사 버튼 파란색 유지, 복사 완료 상태는 emerald로 표시
  - Country도 필드별 복사 카드에 포함
- [x] 전체 페이지 톤 통일
  - 배경 `#f6f8fc` 계열
  - 과한 둥근 모서리 축소
  - 얕은 그림자와 섬세한 border 중심의 세련된 업무 도구 UI
- [x] 검증 완료
  - `npm run lint` 통과
  - `npm run build` 통과
  - `/`, `/privacy`, `/result?...` 모두 로컬 개발 서버에서 `200 OK`

**현재 로컬 확인 URL:** `http://localhost:3000`

---

## 범례

- ✅ 완료
- ⏳ 진행 예정 / 사용자 작업 대기
- 💡 후보 (필요 시 진행)
- `[x]` 완료된 세부 작업
- `[ ]` 남은 세부 작업
