# ROADMAP

한글→영문 주소 변환기 프로젝트의 단계별 작업 진행 상황입니다.

> **진행률:** ▓▓▓▓▓▓▓▓▓▓░░░░ 6/9 단계 완료 (사용자 작업 필요 단계 포함 시 6/10)

---

## 1단계 — 기획 & 설계 ✅

- [x] 요구사항 인터뷰 (변환 방식, 기술 스택, UX, 상세주소 처리 등)
- [x] 설계서 작성 (`/Users/eric/.claude/plans/steady-leaping-finch.md`)
- [x] 아키텍처 결정: Next.js App Router + juso API 프록시 + 4-필드 카드 UI
- [x] 상세주소 처리 방식 결정: 별도 입력란 + 로마자 변환(`101동 502호` → `101-dong 502-ho`)

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

**산출물:** `lib/` 디렉토리 3개 파일

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
- [x] `AddressCard` — 라벨 + 값 + 복사 버튼, `navigator.clipboard` + `execCommand` 폴백, "복사됨!" 1.5초 피드백
- [x] `DetailAddressInput` — 상세주소 입력, 입력 즉시 로마자 미리보기

**산출물:** `components/` 3개 파일

---

## 6단계 — 메인 페이지 & 문서 ✅

- [x] `app/page.tsx` — 단일 페이지 조립 (검색창 + 상세주소 + 4개 카드)
- [x] `app/layout.tsx` 메타데이터 한글화 + `lang="ko"`
- [x] `README.md` — 사용법 + juso API 키 발급 절차
- [x] `CLAUDE.md` — 향후 Claude Code 작업용 컨텍스트 (한글)

**산출물:** 동작하는 단일 페이지, 사용자 문서

---

## 7단계 — API 키 발급 & 로컬 환경 설정 ⏳ **(사용자 작업 필요)**

- [ ] https://business.juso.go.kr 회원가입
- [ ] 오픈API → 영문주소 API 신청 → **개발용 키 즉시 발급**
- [ ] `cp .env.local.example .env.local`
- [ ] `JUSO_API_KEY` 값에 발급받은 승인키 붙여넣기
- [ ] `npm run dev` 재시작

**완료 기준:** 브라우저에서 "테헤란로" 검색 시 후보 목록이 드롭다운에 뜸

---

## 8단계 — 통합 테스트 ⏳

API 키 발급 후 진행:

- [ ] 자동완성: 도로명 주소 검색 (예: "테헤란로 152")
- [ ] 자동완성: 지번/동 검색 (예: "역삼동")
- [ ] 후보 선택 → 4개 카드(Street/City/State/PostalCode) 채워짐 확인
- [ ] 상세주소 "101동 502호" → Street에 `101-dong 502-ho` 합쳐짐
- [ ] 각 카드 [복사] → 다른 곳에 붙여넣어 실제 클립보드 확인
- [ ] 키보드 네비게이션(↑↓ Enter Esc) 동작
- [ ] 모바일 화면(좁은 폭) 레이아웃 확인
- [ ] 잘못된 검색어 (예: "ㅁㄴㅇㄹ") → "검색 결과가 없습니다" 표시

---

## 9단계 — 배포 ⏳

- [ ] GitHub 저장소 생성 & push (`git init` 이미 됨 / 첫 커밋 필요)
- [ ] Vercel 프로젝트 연동 (https://vercel.com/new)
- [ ] Vercel 환경변수 `JUSO_API_KEY` 등록 (운영용 키 권장)
- [ ] 운영용 API 키 신청 (juso 운영용 신청 후 1~2영업일)
- [ ] 배포 후 운영 도메인에서 검증 (8단계 항목 반복)

---

## 10단계 — 향후 개선 (선택) 💡

우선순위 없는 후보들. 필요할 때 꺼내쓰는 백로그.

- [ ] 변환 이력 저장 (localStorage)
- [ ] 즐겨찾기 / 자주 쓰는 주소 핀
- [ ] 다크모드 토글
- [ ] "전체 주소 한 줄" 카드 추가 (Street + City + State + PostalCode 합친 형태)
- [ ] 도로명/지번 토글 또는 모두 표시
- [ ] 영문 표기 보정 옵션 (예: `-gu` → `gu`, 공식 우편번호 형식 등)
- [ ] juso API 응답 캐싱 (같은 키워드 반복 호출 시)
- [ ] 단위 테스트 (`romanize.ts`, `parseEnglishAddress`)
- [ ] 다국어 변환 (일본어/중국어 표기)
- [ ] PWA 설정 (오프라인 일부 지원)

---

## 범례

- ✅ 완료
- ⏳ 진행 예정 / 사용자 작업 대기
- 💡 후보 (필요 시 진행)
- `[x]` 완료된 세부 작업
- `[ ]` 남은 세부 작업
