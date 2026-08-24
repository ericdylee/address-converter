import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import LastVerified from "@/components/LastVerified";
import { createPageMetadata } from "@/lib/metadata";
import { guideJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "전국 시·도 영문 표기 정리표 (City·State 넣는 법)",
  description:
    "서울·부산·경기도 등 전국 16개 시·도의 공식 영문 표기와, 영문 주소에서 City·State 칸에 무엇을 넣는지, 한국 우편번호 형식까지 정리한 표입니다.",
  path: "/guide/korea-region-names",
});

// 전국 광역자치단체. 영문 표기는 행정안전부 영문주소 API가 실제로 반환하는 값
// (= 이 사이트 변환기의 출력)과 일치시킨다. 표와 도구가 다른 값을 말하면 안 된다.
//
// 2026-07-01 광주광역시 + 전라남도 → 전남광주통합특별시로 통합되어 17개 → 16개.
// 마지막 대조: 2026-08-24 (juso API 실제 조회).
const regions: { ko: string; en: string; type: string }[] = [
  { ko: "서울특별시", en: "Seoul", type: "특별시" },
  { ko: "부산광역시", en: "Busan", type: "광역시" },
  { ko: "대구광역시", en: "Daegu", type: "광역시" },
  { ko: "인천광역시", en: "Incheon", type: "광역시" },
  { ko: "대전광역시", en: "Daejeon", type: "광역시" },
  { ko: "울산광역시", en: "Ulsan", type: "광역시" },
  { ko: "전남광주통합특별시", en: "Jeonnam-Gwangju", type: "통합특별시" },
  { ko: "세종특별자치시", en: "Sejong-si", type: "특별자치시" },
  { ko: "경기도", en: "Gyeonggi-do", type: "도" },
  { ko: "강원특별자치도", en: "Gangwon-do", type: "특별자치도" },
  { ko: "충청북도", en: "Chungcheongbuk-do", type: "도" },
  { ko: "충청남도", en: "Chungcheongnam-do", type: "도" },
  { ko: "전북특별자치도", en: "Jeonbuk-do", type: "특별자치도" },
  { ko: "경상북도", en: "Gyeongsangbuk-do", type: "도" },
  { ko: "경상남도", en: "Gyeongsangnam-do", type: "도" },
  { ko: "제주특별자치도", en: "Jeju-do", type: "특별자치도" },
];

export default function KoreaRegionNamesGuide() {
  return (
    <ContentLayout
      title="전국 시·도 영문 표기 정리표"
      lead="영문 주소의 State / Province 칸에 들어가는 전국 16개 시·도의 공식 영문 표기를 한 표에 모았습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
      jsonLd={guideJsonLd({
        title: "전국 시·도 영문 표기 정리표",
        path: "/guide/korea-region-names",
      })}
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
            유형별 City·State 배치 예시
          </h2>
          <p className="mb-3">
            같은 “시·도”라도 유형에 따라 City 칸에 넣는 것이 달라집니다. 네
            가지 유형만 알면 헷갈리지 않습니다.
          </p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">유형</th>
                  <th className="px-4 py-2 font-semibold">State</th>
                  <th className="px-4 py-2 font-semibold">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2">특별시·광역시</td>
                  <td className="px-4 py-2 font-mono text-gray-900">Seoul</td>
                  <td className="px-4 py-2 font-mono text-gray-900">Gangnam-gu</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">도(道)</td>
                  <td className="px-4 py-2 font-mono text-gray-900">Gyeonggi-do</td>
                  <td className="px-4 py-2 font-mono text-gray-900">Suwon-si</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">특별자치시(세종)</td>
                  <td className="px-4 py-2 font-mono text-gray-900">Sejong-si</td>
                  <td className="px-4 py-2 font-mono text-gray-900">Sejong-si</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">특별자치도(제주)</td>
                  <td className="px-4 py-2 font-mono text-gray-900">Jeju-do</td>
                  <td className="px-4 py-2 font-mono text-gray-900">Jeju-si</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            도(道) 안의 시에 구가 있으면(예: 성남시 분당구) City 칸에{" "}
            <span className="font-mono">Bundang-gu, Seongnam-si</span>처럼 함께
            적습니다. 세종시는 아래 구가 없어 State·City 모두 Sejong-si입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            전국 16개 시·도 영문 표기
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
            ※ 위 표의 영문 표기는 행정안전부 영문주소 API가 실제로 돌려주는 값입니다.
            이 사이트의 변환기도 같은 값을 내보내므로 표와 도구 결과가 서로 다르지
            않습니다.
          </p>
        </section>

        <section>
          <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-5">
            <h2 className="mb-2 text-lg font-semibold text-blue-950">
              2026년 7월, 광주와 전남이 하나가 됐습니다
            </h2>
            <p className="text-blue-900">
              2026년 7월 1일{" "}
              <strong className="font-semibold">전남광주통합특별시</strong>가 출범하면서
              광주광역시와 전라남도가 하나의 광역자치단체로 합쳐졌습니다. 그래서 시·도가
              17개에서 <strong className="font-semibold">16개</strong>로 줄었습니다.
            </p>
            <p className="mt-3 text-blue-900">
              영문주소 API도 이 지역 주소를 이제{" "}
              <span className="font-mono font-semibold">Jeonnam-Gwangju</span> 로
              반환합니다. 광주 시내 주소든 여수·목포 같은 전남 주소든 State / Province
              칸에는 같은 값이 들어갑니다.
            </p>
            <div className="mt-3 rounded-lg bg-white px-4 py-3 font-mono text-sm leading-6 text-gray-800">
              전남광주통합특별시 서구 내방로 111
              <br />→ 111 Naebang-ro, Seo-gu, Jeonnam-Gwangju 61945
            </div>
            <p className="mt-3 text-sm text-blue-900">
              예전에 <span className="font-mono">Gwangju</span> 나{" "}
              <span className="font-mono">Jeollanam-do</span> 로 적어 둔 주소가 있다면
              바뀐 표기로 갱신해 두세요. 배송은 우편번호로 처리되므로 옛 표기로도 대개
              도착하지만, 서류처럼 표기를 대조하는 곳에서는 최신 표기를 쓰는 편이
              안전합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            흔한 오기 주의
          </h2>
          <p className="mb-3">
            소리 나는 대로 적으면 공식 표기와 달라집니다. 아래는 자주 틀리는
            철자입니다.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              경기도 — <span className="font-mono">Gyeonggi-do</span> (O) /{" "}
              <span className="font-mono text-red-600">Kyunggi, Gyunggi</span> (X)
            </li>
            <li>
              강원 — <span className="font-mono">Gangwon-do</span> (O) /{" "}
              <span className="font-mono text-red-600">Kangwon</span> (X)
            </li>
            <li>
              전북 — <span className="font-mono">Jeonbuk-do</span> (O) /{" "}
              <span className="font-mono text-red-600">Jeollabuk-do, Jeolabuk</span> (X)
              <span className="block text-sm text-gray-500">
                2024년 전북특별자치도로 바뀌면서 영문 표기도 짧아졌습니다. 예전 표기인
                Jeollabuk-do로 알고 계신 분이 많습니다.
              </span>
            </li>
            <li>
              광주·전남 — <span className="font-mono">Jeonnam-Gwangju</span> (O) /{" "}
              <span className="font-mono text-red-600">Gwangju, Jeollanam-do</span> (지금은 옛 표기)
            </li>
            <li>
              <span className="font-semibold text-gray-900">-do</span>를 빼먹지
              않기 — 도(道)는 이름 뒤에 <span className="font-mono">-do</span>까지
              붙습니다(Gyeonggi-do).
            </li>
          </ul>
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

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                이름이 바뀐 지역은 옛 표기와 새 표기 중 뭘 쓰나요?
              </h3>
              <p className="mt-1">
                영문주소 API가 돌려주는 현재 표기를 쓰는 것이 원칙입니다. 강원특별자치도는{" "}
                <span className="font-mono">Gangwon-do</span>로 그대로지만,
                전북특별자치도는 <span className="font-mono">Jeonbuk-do</span>로,
                광주·전남은 <span className="font-mono">Jeonnam-Gwangju</span>로
                바뀌었습니다. 확실하지 않으면 변환기에 주소를 넣어 나오는 값을 쓰세요.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                세종시는 State와 City에 똑같이 적나요?
              </h3>
              <p className="mt-1">
                네. 세종특별자치시는 아래에 구가 없어 State·City 모두{" "}
                <span className="font-mono">Sejong-si</span>로 적습니다. City 칸만
                있으면 <span className="font-mono">Sejong-si</span> 하나만 넣으면 됩니다.
              </p>
            </div>
          </div>
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
            , 해외 쇼핑몰 입력은{" "}
            <Link
              href="/guide/overseas-shopping"
              className="font-semibold text-blue-700 hover:underline"
            >
              해외직구 배송지 넣는 법
            </Link>
            에서 확인하세요.
          </p>
        </section>

        <LastVerified
          date="2026-08-24"
          note="행정안전부 영문주소 API 조회로 16개 시·도 표기 전수 대조"
        />
      </article>

      <GuideCta />
    </ContentLayout>
  );
}
