import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "전국 시·도 영문 표기 정리표 (City·State 넣는 법)",
  description:
    "서울·부산·경기도 등 전국 17개 시·도의 공식 영문 표기와, 영문 주소에서 City·State 칸에 무엇을 넣는지, 한국 우편번호 형식까지 정리한 표입니다.",
  path: "/guide/korea-region-names",
});

// 전국 17개 광역자치단체. 영문 표기는 행정안전부 영문주소 표기 기준.
const regions: { ko: string; en: string; type: string }[] = [
  { ko: "서울특별시", en: "Seoul", type: "특별시" },
  { ko: "부산광역시", en: "Busan", type: "광역시" },
  { ko: "대구광역시", en: "Daegu", type: "광역시" },
  { ko: "인천광역시", en: "Incheon", type: "광역시" },
  { ko: "광주광역시", en: "Gwangju", type: "광역시" },
  { ko: "대전광역시", en: "Daejeon", type: "광역시" },
  { ko: "울산광역시", en: "Ulsan", type: "광역시" },
  { ko: "세종특별자치시", en: "Sejong", type: "특별자치시" },
  { ko: "경기도", en: "Gyeonggi-do", type: "도" },
  { ko: "강원특별자치도", en: "Gangwon-do", type: "특별자치도" },
  { ko: "충청북도", en: "Chungcheongbuk-do", type: "도" },
  { ko: "충청남도", en: "Chungcheongnam-do", type: "도" },
  { ko: "전북특별자치도", en: "Jeollabuk-do", type: "특별자치도" },
  { ko: "전라남도", en: "Jeollanam-do", type: "도" },
  { ko: "경상북도", en: "Gyeongsangbuk-do", type: "도" },
  { ko: "경상남도", en: "Gyeongsangnam-do", type: "도" },
  { ko: "제주특별자치도", en: "Jeju-do", type: "특별자치도" },
];

export default function KoreaRegionNamesGuide() {
  return (
    <ContentLayout
      title="전국 시·도 영문 표기 정리표"
      lead="영문 주소의 State / Province 칸에 들어가는 전국 17개 시·도의 공식 영문 표기를 한 표에 모았습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            시·도는 State, 구·시·군은 City
          </h2>
          <p>
            한국 주소를 영문으로 쓸 때 <strong className="font-semibold text-gray-900">시·도</strong>(서울특별시,
            경기도 등)는 <strong className="font-semibold text-gray-900">State / Province</strong> 칸에 넣고,
            그 안의 <strong className="font-semibold text-gray-900">구·시·군</strong>(강남구 → Gangnam-gu,
            수원시 → Suwon-si 등)은 <strong className="font-semibold text-gray-900">City</strong> 칸에
            넣습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            전국 17개 시·도 영문 표기
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">한글</th>
                  <th className="px-4 py-2 font-semibold">영문 표기</th>
                  <th className="px-4 py-2 font-semibold">종류</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {regions.map((r) => (
                  <tr key={r.ko}>
                    <td className="px-4 py-2">{r.ko}</td>
                    <td className="px-4 py-2 font-mono font-medium text-gray-900">
                      {r.en}
                    </td>
                    <td className="px-4 py-2 text-gray-500">{r.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            ※ 강원특별자치도·전북특별자치도처럼 명칭이 바뀐 곳도 영문 주소에서는
            보통 <span className="font-mono">Gangwon-do</span>,{" "}
            <span className="font-mono">Jeollabuk-do</span> 표기를 그대로
            사용합니다. 가장 정확한 값은 변환기 결과를 따르세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            City 칸만 있고 State 칸이 없을 때
          </h2>
          <p>
            해외 양식에 City 칸 하나만 있는 경우에는 큰 도시 이름(예:{" "}
            <span className="font-mono">Seoul</span>,{" "}
            <span className="font-mono">Busan</span>)을 City에 넣으면 됩니다.
            서울·부산처럼 시 자체가 광역단위인 곳은 구(Gangnam-gu)를 생략하고
            도시명만 적어도 배송에 문제가 없습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            한국 우편번호는 5자리입니다
          </h2>
          <p>
            한국 우편번호는 2015년부터 도입된{" "}
            <strong className="font-semibold text-gray-900">5자리</strong>{" "}
            국가기초구역번호입니다(예: <span className="font-mono">06236</span>).
            시·도마다 정해진 하나의 번호가 있는 것이 아니라 도로·건물 단위로
            부여되므로, 정확한 우편번호는 시·도 표가 아니라 실제 주소로 확인해야
            합니다. 도구에서 주소를 검색하면 해당 건물의 우편번호가 ZIP / Postal
            Code 칸에 자동으로 채워집니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-950">함께 보기</h2>
          <p>
            칸별 작성 원리는{" "}
            <Link
              href="/guide/english-address"
              className="font-semibold text-blue-700 hover:underline"
            >
              한글 주소 영문으로 쓰는 법
            </Link>
            , 흔한 실수는{" "}
            <Link
              href="/guide/common-mistakes"
              className="font-semibold text-blue-700 hover:underline"
            >
              자주 틀리는 실수 7가지
            </Link>
            에서 확인하세요.
          </p>
        </section>
      </article>

      <GuideCta />
    </ContentLayout>
  );
}
