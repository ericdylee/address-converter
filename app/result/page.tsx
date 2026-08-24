import type { Metadata } from "next";
import Link from "next/link";
import FieldMappingGuide, { type Country } from "./FieldMappingGuide";
import ResultInteractive from "./ResultInteractive";

// 이 페이지는 검색어마다 URL이 달라지는 파라미터 페이지라 색인 대상이 아니다.
// 다만 robots.txt에서 통째로 막는 대신 여기서 noindex를 걸어, 크롤러가 "읽되
// 색인하지 않도록" 한다. AdSense 광고 크롤러는 내용을 읽어야 맞춤 광고를 낸다.
export const metadata: Metadata = {
  title: "영문 주소 변환 결과",
  description:
    "한글·일본 주소를 Street / City / State / Postal Code 칸별로 나눠 보여줍니다. 칸마다 복사 버튼이 있어 해외 사이트 입력란에 그대로 붙여넣을 수 있습니다.",
  robots: { index: false, follow: true },
};

// searchParams를 서버에서 읽는다(Next 16: Promise). 예전에는 클라이언트에서
// useSearchParams로 읽어 페이지 전체가 Suspense 안에 들어갔고, 그 결과 서버가
// 내려주는 HTML에 "로딩 중…"밖에 없었다. 크롤러에게는 빈 페이지였다는 뜻이다.
export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (key: string) => {
    const v = sp[key];
    return (Array.isArray(v) ? v[0] : v) ?? "";
  };

  const street = one("street");
  const city = one("city");
  const state = one("state");
  const zip = one("zip");
  const ko = one("ko");
  const detail = one("detail");
  const country: Country = one("country") === "jp" ? "jp" : "kr";
  const isJp = country === "jp";

  // 일본은 동네(street)가 빈 우편번호가 있으므로(시 전체) city·state·zip만 있으면 유효.
  const hasRequired = isJp ? city && state && zip : street && city && state && zip;

  if (!hasRequired) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700">
            표시할 주소 정보가 없습니다. 홈에서 주소를 다시 검색해주세요.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
          >
            검색 페이지로 이동
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <Link href="/" className="text-sm font-medium text-blue-700 hover:text-blue-800">
            ← 다시 검색
          </Link>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-950">
            영문 주소 변환 결과
          </h1>
        </header>

        {/* 입력한 원본 주소 — 서버에서 렌더된다 */}
        <div className="mb-3 rounded-lg border border-border bg-white p-5 shadow-card">
          <div className="mb-2 text-xs font-semibold uppercase text-gray-500">
            {isJp ? "일본어 주소" : "한글 주소"}
          </div>
          <div className="break-words text-base leading-7 text-gray-950">{ko}</div>
        </div>

        <ResultInteractive
          street={street}
          city={city}
          state={state}
          zip={zip}
          initialDetail={detail}
          isJp={isJp}
        />

        <FieldMappingGuide country={country} />
      </div>
    </main>
  );
}
