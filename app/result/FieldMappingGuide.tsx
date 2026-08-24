import Link from "next/link";

// 해외 사이트 입력 양식의 칸 이름 ↔ 우리 앱 필드 매핑 안내. 나라별로 예시가 달라진다.
//
// 서버 컴포넌트로 둔다. 이 내용은 검색어와 무관하게 고정이라, 서버에서 렌더해야
// 크롤러(특히 AdSense의 Mediapartners-Google)가 읽을 본문이 생긴다.
// 결과 페이지의 나머지는 상세주소 입력 상태에 묶여 있어 클라이언트로 남는다.
export type Country = "kr" | "jp";

type GuideRow = { foreign: string; field: string; note?: string };

const KR_ROWS: GuideRow[] = [
  {
    foreign: "Address / Street address / Address Line 1",
    field: "Street Address",
    note: "도로명 + 건물번호. 동/호도 이 칸 끝에 함께 넣어도 됩니다.",
  },
  {
    foreign: "apartment, Suite, Unit, etc. / Address Line 2 (선택)",
    field: "동 / 호 (예: 101-502)",
    note: "Street 칸에 이미 합쳐져 있어요. 이 칸이 따로 있으면 동/호 부분만 떼어 넣으세요.",
  },
  {
    foreign: "City / ward / town / village / Town·City",
    field: "City (구·시·군, 예: Gangnam-gu)",
  },
  {
    foreign: "State / Province / Region",
    field: "State / Province (시·도, 예: Seoul)",
  },
  { foreign: "ZIP / Postal Code / Postcode", field: "Postal Code (예: 06232)" },
  {
    foreign: "Country / Region",
    field: "South Korea (또는 Korea, Republic of)",
  },
];

const JP_ROWS: GuideRow[] = [
  {
    foreign: "Address / Street address / Address Line 1",
    field: "Street Address",
    note: "번지 + 동네 (예: 1-1-1 Marunouchi). 건물명도 이 칸 끝에 함께 넣어도 됩니다.",
  },
  {
    foreign: "apartment, Suite, Unit, etc. / Address Line 2 (선택)",
    field: "건물·호 (예: 〇〇빌딩 5F)",
    note: "Street 칸에 이미 합쳐져 있어요. 이 칸이 따로 있으면 건물/호 부분만 떼어 넣으세요.",
  },
  {
    foreign: "City / ward / town / Town·City",
    field: "City (시·구, 예: Chiyoda-ku)",
  },
  {
    foreign: "State / Province / Prefecture",
    field: "Prefecture (도도부현, 예: Tokyo)",
  },
  { foreign: "ZIP / Postal Code / Postcode", field: "Postal Code (예: 100-0005)" },
  { foreign: "Country / Region", field: "Japan" },
];

export default function FieldMappingGuide({ country }: { country: Country }) {
  const rows = country === "jp" ? JP_ROWS : KR_ROWS;

  return (
    <details open className="group mt-4 overflow-hidden rounded-lg border border-border bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 text-sm font-semibold text-gray-900 select-none hover:bg-gray-50">
        <span>입력 가이드</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="border-t border-gray-100 px-5 pt-1 pb-5">
        <p className="mb-3 text-sm leading-6 text-gray-500">
          칸 이름은 사이트마다 조금씩 다를 수 있습니다. 아래 가이드를 참고해주세요
        </p>
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.field}
              className="grid grid-cols-1 gap-0.5 sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:gap-3"
            >
              <span className="text-sm text-gray-500 break-words">{row.foreign}</span>
              <span className="hidden sm:block text-gray-300" aria-hidden="true">
                →
              </span>
              <span className="text-sm font-medium text-gray-900 break-words">
                {row.field}
                {row.note && (
                  <span className="block mt-0.5 text-sm font-normal text-gray-500">
                    {row.note}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-lg bg-blue-50/60 px-4 py-3">
          {country === "jp" ? (
            <p className="text-sm text-blue-800 leading-relaxed">
              <span className="font-semibold">팁 · </span>
              일본 영문 주소는 <span className="font-medium">작은 단위 → 큰 단위</span> 순으로
              씁니다(번지 → 동네 → 시·구 → 도도부현). City 칸만 있으면 보통 시·구 이름(예:{" "}
              <span className="font-mono">Chiyoda-ku</span>)을 넣습니다.
            </p>
          ) : (
            // 쇼핑몰이 칸 아래 띄우는 회색 예시가 오히려 사람을 헷갈리게 하는 경우가
            // 많다. 아마존이 대표적이라 실제 사례로 짚어준다(2026-08-24 확인).
            <div className="text-sm text-blue-800 leading-relaxed">
              <p>
                <span className="font-semibold">팁 · </span>
                칸 아래 흐리게 뜨는{" "}
                <span className="font-medium">예시 글씨를 그대로 따라 넣지 마세요.</span>{" "}
                아마존은 City에 <span className="font-mono">Seoul</span>, Province에{" "}
                <span className="font-mono">Kyeonggi-do</span>를 예시로 띄우는데 서울은
                경기도에 속하지 않습니다. 규칙은 하나입니다 —{" "}
                <span className="font-medium">
                  작은 단위가 City(구·시·군), 큰 단위가 State/Province(시·도)
                </span>
                .
              </p>
              <p className="mt-2">
                <Link
                  href="/guide/amazon-address"
                  className="font-semibold text-blue-700 underline-offset-2 hover:underline"
                >
                  아마존 입력법 실제 화면으로 보기 →
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </details>
  );
}
