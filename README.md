# 한글 → 영문 주소 변환기

해외 사이트에 한국 주소를 입력할 때, 정부 공식 영문주소로 변환해주고 **Street / City / State / Postal Code 필드별로 개별 복사**할 수 있는 도구입니다.

## 주요 기능

- 한글 주소 자동완성 검색 (도로명/지번 모두 지원)
- 4개 표준 필드(Street, City, State, Postal Code)로 분리 표시
- 각 필드별 원클릭 복사
- 상세주소(동/호) 한글 입력 → 자동 로마자 변환 (예: `101동 502호` → `101-dong 502-ho`)

## 시작하기

### 1. juso.go.kr 영문주소 API 승인키 발급

행정안전부에서 무료로 발급해주는 공식 API입니다.

1. https://business.juso.go.kr 접속 후 회원가입 & 로그인
2. 상단 메뉴에서 **오픈API → 신청** 클릭
3. **영문주소 API**를 선택하고 신청
   - **개발용 키**: 신청 즉시 발급 (호출 제한 있음, 개발/테스트용 충분)
   - **운영용 키**: 신청 후 1~2 영업일 내 승인
4. 신청 사유는 간단히 작성 (예: "개인 사이트 영문주소 변환 서비스")
5. 발급된 **승인키(confmKey)** 복사

### 2. 환경변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열어 `JUSO_API_KEY` 값을 발급받은 승인키로 변경합니다.

```
JUSO_API_KEY=발급받은_승인키
```

### 3. 의존성 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속.

## 사용법

1. 한글 주소창에 검색어 입력 (예: "테헤란로 152", "역삼동")
2. 자동완성 드롭다운에서 정확한 주소 선택
3. 필요시 상세주소(동/호수) 입력
4. 4개 카드 옆의 **복사** 버튼으로 해외 사이트 입력란에 붙여넣기

## 기술 스택

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **행정안전부 영문주소 API** (data.juso.go.kr)

## 배포

Vercel에 배포 시 환경변수 `JUSO_API_KEY`를 프로젝트 설정에 추가하세요.

```bash
npm run build
```

## 폴더 구조

```
app/
  page.tsx              # 메인 페이지
  layout.tsx
  api/search-address/
    route.ts            # juso API 프록시 (API 키 서버에서 보호)
components/
  AddressSearch.tsx     # 자동완성 검색창
  AddressCard.tsx       # 복사 가능한 결과 카드
  DetailAddressInput.tsx # 상세주소 입력
lib/
  juso.ts              # juso API 클라이언트
  romanize.ts          # 상세주소 로마자 변환
  types.ts             # 공통 타입
```
