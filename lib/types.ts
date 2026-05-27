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
