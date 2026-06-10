import type {
  AddressResult,
  JusoApiItem,
  JusoApiResponse,
  SearchResponse,
} from "./types";

const JUSO_ENDPOINT = "https://business.juso.go.kr/addrlink/addrEngApi.do";

// 단위 테스트에서 직접 검증할 수 있도록 export.
export function parseEnglishAddress(item: JusoApiItem): AddressResult["english"] {
  const full = item.roadAddr.trim();
  const parts = full.split(",").map((p) => p.trim()).filter(Boolean);

  let street = parts[0] ?? full;
  if (parts.length >= 3) {
    street = parts.slice(0, parts.length - 2).join(", ");
  }

  return {
    street,
    // 세종시는 시군구(sggNm)가 비어 있다. City가 필수인 해외 폼이 많으므로
    // 시도(siNm)로 채운다 — State와 중복되지만 빈 칸보다 실용적.
    city: item.sggNm || item.siNm,
    state: item.siNm,
    postalCode: item.zipNo,
  };
}

function makeId(item: JusoApiItem, idx: number): string {
  return `${item.rnMgtSn}-${item.zipNo}-${item.buldMnnm}-${item.buldSlno}-${idx}`;
}

export async function searchAddress(
  keyword: string,
  page: number = 1,
): Promise<SearchResponse> {
  const apiKey = process.env.JUSO_API_KEY;
  if (!apiKey) {
    const err = new Error("JUSO_API_KEY is not set");
    (err as Error & { code?: string }).code = "MISSING_KEY";
    throw err;
  }

  const params = new URLSearchParams({
    confmKey: apiKey,
    currentPage: String(page),
    countPerPage: "10",
    keyword,
    resultType: "json",
  });

  const res = await fetch(`${JUSO_ENDPOINT}?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`juso API HTTP ${res.status}`);
  }

  const data: JusoApiResponse = await res.json();
  const { common, juso } = data.results;

  if (common.errorCode !== "0") {
    const err = new Error(common.errorMessage || "juso API error");
    (err as Error & { code?: string }).code = "API_ERROR";
    throw err;
  }

  const items = juso ?? [];
  const results: AddressResult[] = items.map((item, idx) => ({
    id: makeId(item, idx),
    korean: item.korAddr,
    englishFull: item.roadAddr,
    english: parseEnglishAddress(item),
  }));

  return {
    results,
    totalCount: Number(common.totalCount) || 0,
  };
}
