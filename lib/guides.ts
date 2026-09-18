// 가이드 글 카탈로그 — 목록 페이지·글머리 표기·출처·이어서 읽기가 모두 여기서 나온다.
//
// 왜 한곳에 모았나:
// 글 아래 "참고한 공식 자료"와 "이어서 읽기"를 각 페이지에 손으로 적으면
// 글이 늘어날수록 서로 어긋난다(링크가 끊기거나, 같은 글이 자기 자신을 가리킴).
// 카탈로그를 단일 출처로 두면 목록 순서·내부 링크·확인 날짜가 항상 맞물린다.
//
// 표기 원칙:
// - verified.date 는 "그 날 실제로 다시 확인한 날짜"만 적는다. 글을 손봤다고
//   올리지 않는다. 확인하지 않았으면 예전 날짜를 그대로 둔다.
// - sources 에는 글을 쓰면서 실제로 근거로 삼은 곳만 넣는다. 권위 있어 보이려고
//   읽지도 않은 문서를 링크하지 않는다.

/** 가이드를 읽는 순서. 목록 페이지에서 이 순서대로 묶어 보여준다. */
export type GuideStage = "basics" | "shopping" | "abroad";

export type GuideSource = {
  /** 링크에 보일 이름 */
  label: string;
  url: string;
  /** 이 자료에서 무엇을 확인했는지 한 줄 */
  note: string;
};

export type Guide = {
  /** 사이트 내 경로. 카탈로그의 키 역할도 한다. */
  path: string;
  /** 목록 카드와 내부 링크에 쓰는 제목 */
  title: string;
  /** 목록 카드 설명 */
  desc: string;
  /** 목록 카드에 보이는 한 줄 예시 */
  example: string;
  stage: GuideStage;
  /** 최초 공개일 (YYYY-MM-DD) */
  datePublished: string;
  /** 내용을 마지막으로 고친 날 (YYYY-MM-DD) */
  dateModified: string;
  /** 내용을 마지막으로 직접 확인한 날짜와 방법 */
  verified: { date: string; how: string };
  sources: GuideSource[];
  /** 글 끝 "이어서 읽기"에 걸 다른 가이드 경로 (2~3개) */
  next: string[];
};

// 자주 쓰는 출처는 상수로 두고 재사용한다(주소·표기가 바뀌면 여기 한 곳만 고침).
const SRC_JUSO_ENG: GuideSource = {
  label: "주소정보누리집 — 영문주소 검색 (행정안전부)",
  url: "https://www.juso.go.kr/openEngPage.do",
  note: "도로명주소의 공식 영문 표기를 확인한 곳입니다.",
};

const SRC_JUSO_API: GuideSource = {
  label: "도로명주소 영문 변환 API (행정안전부)",
  url: "https://business.juso.go.kr/addrlink/main.do",
  note: "이 사이트 변환기가 실제로 호출하는 공식 API입니다.",
};

const SRC_ROMAN: GuideSource = {
  label: "국어의 로마자 표기법 (국립국어원)",
  url: "https://www.korean.go.kr/front/page/pageView.do?page_id=P000148",
  note: "지명을 로마자로 옮기는 기준 규정입니다.",
};

const SRC_EPOST: GuideSource = {
  label: "인터넷우체국 (우정사업본부)",
  url: "https://www.epost.go.kr/",
  note: "EMS·국제소포의 라벨 항목과 접수 절차를 확인한 곳입니다.",
};

const SRC_UPU: GuideSource = {
  label: "만국우편연합(UPU)",
  url: "https://www.upu.int/en/home",
  note: "CN22·CN23 세관신고서가 만국우편연합 공통 서식임을 확인한 곳입니다.",
};

const SRC_UNIPASS: GuideSource = {
  label: "개인통관고유부호 발급 (관세청)",
  url: "https://unipass.customs.go.kr/csp/persIndex.do",
  note: "해외직구 통관에 쓰이는 개인통관고유부호를 발급받는 공식 창구입니다.",
};

const SRC_JP_ZIP: GuideSource = {
  label: "우편번호 검색 (일본우편)",
  url: "https://www.post.japanpost.jp/zipcode/",
  note: "일본 우편번호와 주소를 조회하는 공식 페이지입니다.",
};

const SRC_JP_ROMAN: GuideSource = {
  label: "우편번호 데이터 — 로마자 표기 (일본우편)",
  url: "https://www.post.japanpost.jp/zipcode/dl/roman-zip.html",
  note: "이 사이트 일본 탭이 쓰는 공식 로마자 데이터의 원본입니다.",
};

const SRC_PASSPORT: GuideSource = {
  label: "여권 로마자 성명 표기 규정 (외교부)",
  url: "https://www.passport.go.kr/home/kor/contents.do?menuPos=39",
  note: "서류의 영문 이름을 여권과 맞춰야 하는 근거입니다.",
};

// 2026-09-18에 한국 주소 예시를 행정안전부 영문주소 API로 다시 조회해 대조했다.
// (예: 서울특별시 강남구 테헤란로 152 → 152 Teheran-ro, Gangnam-gu, Seoul / 06236)
const RECHECK_KR = {
  date: "2026-09-18",
  how: "글에 나오는 한국 주소 예시를 행정안전부 영문주소 API로 다시 조회해 표기와 우편번호를 대조했습니다.",
};

export const GUIDES: Guide[] = [
  {
    path: "/guide/english-address",
    title: "한글 주소, 영문으로 쓰는 법",
    desc: "영문 주소의 어순, 도로명·지번 차이, 동/호수·층 표기, 실제 변환 예시까지 한 번에 정리했습니다.",
    example: "서울특별시 강남구 테헤란로 152 → 152 Teheran-ro, Gangnam-gu, Seoul",
    stage: "basics",
    datePublished: "2026-07-14",
    dateModified: "2026-09-18",
    verified: RECHECK_KR,
    sources: [SRC_JUSO_ENG, SRC_JUSO_API, SRC_ROMAN],
    next: ["/guide/apartment-unit", "/guide/common-mistakes", "/guide/korea-region-names"],
  },
  {
    path: "/guide/apartment-unit",
    title: "아파트 동·호수, 건물명 영문 표기 정리",
    desc: "‘101동 502호’, ‘3층’, 오피스텔·빌라 건물명처럼 영문으로 옮기기 까다로운 상세주소를 규칙과 예시로 정리했습니다.",
    example: "101동 502호 → 101-502 · 3층 → 3F",
    stage: "basics",
    datePublished: "2026-07-14",
    dateModified: "2026-09-18",
    verified: RECHECK_KR,
    sources: [SRC_JUSO_ENG, SRC_ROMAN, SRC_EPOST],
    next: ["/guide/english-address", "/guide/common-mistakes", "/guide/overseas-shopping"],
  },
  {
    path: "/guide/korea-region-names",
    title: "전국 시·도 영문 표기 정리표",
    desc: "서울·부산·경기도 등 전국 16개 시·도의 공식 영문 표기와 City·State 칸에 넣는 법, 우편번호 형식을 정리했습니다.",
    example: "경기도 → Gyeonggi-do · 제주특별자치도 → Jeju-do",
    stage: "basics",
    datePublished: "2026-07-14",
    dateModified: "2026-09-18",
    verified: {
      date: "2026-09-18",
      how: "16개 시·도의 영문 표기를 행정안전부 영문주소 API로 전수 재조회해 표와 한 건씩 대조했습니다(16건 전부 일치).",
    },
    sources: [SRC_JUSO_ENG, SRC_JUSO_API, SRC_ROMAN],
    next: ["/guide/english-address", "/guide/common-mistakes", "/guide/english-documents"],
  },
  {
    path: "/guide/common-mistakes",
    title: "영문 주소 변환할 때 자주 틀리는 실수 7가지",
    desc: "City·State 자리 바꾸기, 동/호수 표기, 우편번호 형식, 국가 누락 등 흔한 실수를 잘못된 예·올바른 예로 비교합니다.",
    example: "City: Seoul / State: Gangnam-gu ✕ → City: Gangnam-gu / State: Seoul ✓",
    stage: "basics",
    datePublished: "2026-07-14",
    dateModified: "2026-09-18",
    verified: RECHECK_KR,
    sources: [SRC_JUSO_ENG, SRC_EPOST],
    next: ["/guide/english-address", "/guide/korea-region-names", "/guide/overseas-shopping"],
  },
  {
    path: "/guide/amazon-address",
    title: "아마존 한국 주소 입력법 (실제 화면)",
    desc: "아마존의 실제 주소 입력 화면을 캡처해 칸별로 짚었습니다. City·Province를 헷갈리게 만드는 원인과 결제 단계의 개인통관고유부호까지 다룹니다.",
    example: "City → Michuhol-gu · Province → Incheon",
    stage: "shopping",
    datePublished: "2026-08-24",
    dateModified: "2026-09-18",
    verified: {
      date: "2026-08-24",
      how: "아마존 데스크톱 웹의 주소 추가 화면을 직접 열어 캡처하고, 화면에서 읽히는 내용만 적었습니다. 예시 주소는 2026-09-18에 행정안전부 API로 다시 대조했습니다.",
    },
    sources: [SRC_UNIPASS, SRC_JUSO_ENG],
    next: ["/guide/overseas-shopping", "/guide/common-mistakes", "/guide/english-address"],
  },
  {
    path: "/guide/overseas-shopping",
    title: "해외직구 배송지에 한국·일본 주소 넣는 법",
    desc: "Address Line 1/2, City, State, ZIP 같은 해외 양식의 칸에 무엇을 넣어야 하는지 예시로 설명합니다.",
    example: "Address Line 1 → 152 Teheran-ro · City → Gangnam-gu · ZIP → 06236",
    stage: "shopping",
    datePublished: "2026-07-14",
    dateModified: "2026-09-18",
    verified: {
      date: "2026-08-24",
      how: "아이허브·알리익스프레스의 주소 입력 화면을 직접 열어 캡처했습니다. 예시 주소는 2026-09-18에 행정안전부 API로 다시 대조했습니다.",
    },
    sources: [SRC_UNIPASS, SRC_JUSO_ENG],
    next: ["/guide/amazon-address", "/guide/common-mistakes", "/guide/international-shipping"],
  },
  {
    path: "/guide/international-shipping",
    title: "국제우편·EMS 영문 주소와 라벨 작성법",
    desc: "우체국 EMS·국제소포 라벨의 보내는 사람/받는 사람 영문 주소, 세관신고서(CN22/CN23), 반품 라벨 작성법을 정리했습니다.",
    example: "From/To 주소 · CN22 세관신고서 · 전화 +82 표기",
    stage: "abroad",
    datePublished: "2026-07-14",
    dateModified: "2026-09-18",
    verified: RECHECK_KR,
    sources: [SRC_EPOST, SRC_UPU, SRC_JUSO_ENG],
    next: ["/guide/english-address", "/guide/overseas-shopping", "/guide/english-documents"],
  },
  {
    path: "/guide/english-documents",
    title: "영문 주소가 필요한 서류 총정리 (비자·유학·해외 계좌)",
    desc: "비자·유학 원서, 해외 은행 계좌·송금, 영문 재직·재학 증명서처럼 주소를 영어로 적어야 하는 서류별 요령과 표기 일관성 팁을 정리했습니다.",
    example: "Permanent address = 한국 집 주소 · 모든 서류에 표기 통일",
    stage: "abroad",
    datePublished: "2026-07-14",
    dateModified: "2026-09-18",
    verified: RECHECK_KR,
    sources: [SRC_JUSO_ENG, SRC_PASSPORT],
    next: ["/guide/english-address", "/guide/korea-region-names", "/guide/international-shipping"],
  },
  {
    path: "/guide/japan-address",
    title: "일본 주소, 영문으로 쓰는 법",
    desc: "도도부현·시구정촌 구분, 丁目·番地·号의 하이픈 표기, 정령지정도시의 City 표기까지 일본 주소 로마자 규칙을 정리했습니다.",
    example: "東京都千代田区丸の内1-1-1 → 1-1-1 Marunochi, Chiyoda-ku, Tokyo",
    stage: "abroad",
    datePublished: "2026-07-14",
    dateModified: "2026-09-18",
    verified: {
      date: "2026-09-18",
      how: "예시 3건과 정령지정도시 표기를 이 사이트가 쓰는 일본우편 로마자 데이터로 다시 조회해 대조하고, 어긋난 표기 3건(Marunouchi·Kita-ku·Funabashi)을 공식 표기로 고쳤습니다.",
    },
    sources: [SRC_JP_ZIP, SRC_JP_ROMAN],
    next: ["/guide/overseas-shopping", "/guide/english-address", "/guide/common-mistakes"],
  },
];

/** 목록 페이지의 단계 묶음. 글이 '무엇 다음에 무엇'인지 보이게 한다. */
export const STAGES: { id: GuideStage; step: string; title: string; desc: string }[] = [
  {
    id: "basics",
    step: "1단계",
    title: "영문 주소의 원리 익히기",
    desc: "어순과 칸 배치를 먼저 잡습니다. 여기만 이해하면 나머지는 응용입니다.",
  },
  {
    id: "shopping",
    step: "2단계",
    title: "쇼핑몰 주문서에 실제로 넣어보기",
    desc: "실제 쇼핑몰 입력 화면을 캡처해 칸별로 짚었습니다.",
  },
  {
    id: "abroad",
    step: "3단계",
    title: "국제우편·서류·일본 주소로 넓히기",
    desc: "직접 보낼 때, 서류에 적을 때, 일본 주소일 때의 차이를 다룹니다.",
  },
];

/** 경로로 가이드 한 편을 찾는다. 카탈로그에 없으면 개발 중 바로 알 수 있게 예외를 던진다. */
export function getGuide(path: string): Guide {
  const found = GUIDES.find((g) => g.path === path);
  if (!found) throw new Error(`알 수 없는 가이드 경로: ${path}`);
  return found;
}

/** "이어서 읽기"에 걸 글 목록. 자기 자신은 빼고, 카탈로그에 있는 것만 남긴다. */
export function nextGuides(guide: Guide): Guide[] {
  return guide.next
    .filter((p) => p !== guide.path)
    .map((p) => GUIDES.find((g) => g.path === p))
    .filter((g): g is Guide => Boolean(g));
}

/** 특정 단계에 속한 글 목록 (카탈로그에 적은 순서를 그대로 유지). */
export function guidesByStage(stage: GuideStage): Guide[] {
  return GUIDES.filter((g) => g.stage === stage);
}
