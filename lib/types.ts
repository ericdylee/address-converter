export type AddressFields = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

export type AddressResult = {
  id: string;
  korean: string;
  englishFull: string;
  english: AddressFields;
};

export type SearchResponse = {
  results: AddressResult[];
  totalCount: number;
};

export type SearchError = {
  error: string;
  code: "MISSING_KEY" | "API_ERROR" | "BAD_REQUEST";
};

// 일본 주소 후보 1건. english는 한국과 동일한 4-필드 구조를 재사용한다
// (street=동네, city=시·구, state=도도부현, postalCode=우편번호).
export type JpAddressResult = {
  id: string;
  japanese: string; // 한자 원본 주소 (예: 東京都千代田区丸の内)
  englishLabel: string; // 후보 표시용 영문 한 줄 (예: Marunochi, Chiyoda-ku, Tokyo)
  english: AddressFields;
};

export type JpSearchResponse = {
  results: JpAddressResult[];
};

export type JusoApiItem = {
  korAddr: string;
  roadAddr: string;
  jibunAddr: string;
  zipNo: string;
  admCd: string;
  rnMgtSn: string;
  bdKdcd: string;
  siNm: string;
  sggNm: string;
  emdNm: string;
  liNm: string;
  rn: string;
  udrtYn: string;
  buldMnnm: string;
  buldSlno: string;
  mtYn: string;
  lnbrMnnm: string;
  lnbrSlno: string;
};

export type JusoApiResponse = {
  results: {
    common: {
      errorMessage: string;
      countPerPage: string;
      totalCount: string;
      errorCode: string;
      currentPage: string;
    };
    juso: JusoApiItem[] | null;
  };
};
