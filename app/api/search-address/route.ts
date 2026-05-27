import { NextRequest } from "next/server";
import { searchAddress } from "@/lib/juso";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const pageParam = request.nextUrl.searchParams.get("page");
  const page = pageParam ? Math.max(1, Number(pageParam) || 1) : 1;

  if (!q || q.length < 2) {
    return Response.json({ results: [], totalCount: 0 });
  }

  try {
    const data = await searchAddress(q, page);
    return Response.json(data);
  } catch (err) {
    const code = (err as Error & { code?: string }).code;
    const message = (err as Error).message;

    if (code === "MISSING_KEY") {
      return Response.json(
        {
          error: "서버에 JUSO_API_KEY가 설정되지 않았습니다. .env.local 파일을 확인하세요.",
          code,
        },
        { status: 503 },
      );
    }

    return Response.json(
      {
        error: "주소 검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        code: code ?? "API_ERROR",
        detail: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 },
    );
  }
}
