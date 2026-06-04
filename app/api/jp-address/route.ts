import { NextRequest } from "next/server";
import { lookupPostalCode } from "@/lib/jp-postal";

// 일본 우편번호 → 영문 주소 후보 조회.
// 한국(search-address)과 달리 로컬 내장 데이터라 외부 API 키가 필요 없다.
export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get("zip")?.trim() ?? "";

  try {
    const results = lookupPostalCode(zip);
    return Response.json({ results });
  } catch (err) {
    const message = (err as Error).message;
    return Response.json(
      {
        error: "우편번호 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        code: "JP_DATA_ERROR",
        detail: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 },
    );
  }
}
