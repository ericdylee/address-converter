import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";

export const metadata: Metadata = {
  title: "한글 주소, 영문으로 쓰는 법",
  description:
    "한국 주소를 영문으로 작성하는 방법을 정리했습니다. 영문 주소의 어순, 도로명·지번 주소의 차이, 동/호수·층 표기, 그리고 실제 변환 예시까지 예시 중심으로 설명합니다.",
  alternates: { canonical: "/guide/english-address" },
};

export default function EnglishAddressGuide() {
  return (
    <ContentLayout
      title="한글 주소, 영문으로 쓰는 법"
      lead="영문 주소는 한글 주소와 순서가 반대입니다. 원리만 이해하면 어렵지 않습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            1. 영문 주소는 순서가 반대입니다
          </h2>
          <p>
            한글 주소는 <strong className="font-semibold text-gray-900">큰 단위 → 작은 단위</strong>{" "}
            순서로 씁니다(예: 시 → 구 → 도로명 → 건물번호 → 동/호). 반면 영문
            주소는 <strong className="font-semibold text-gray-900">작은 단위 → 큰 단위</strong>{" "}
            순서로, 즉 거꾸로 적습니다. 가장 작은 단위인 도로명·건물번호가 맨
            앞에 오고, 도시·시도·국가가 뒤로 갑니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            2. 한국 주소의 구성요소와 영문 대응
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">한글</th>
                  <th className="px-4 py-2 font-semibold">영문 필드</th>
                  <th className="px-4 py-2 font-semibold">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2">도로명 + 건물번호</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Street Address</td>
                  <td className="px-4 py-2 font-mono">152 Teheran-ro</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">동 / 호</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Address Line 2</td>
                  <td className="px-4 py-2 font-mono">101-502</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">구 / 시 / 군</td>
                  <td className="px-4 py-2 font-medium text-gray-900">City</td>
                  <td className="px-4 py-2 font-mono">Gangnam-gu</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">시 / 도</td>
                  <td className="px-4 py-2 font-medium text-gray-900">State / Province</td>
                  <td className="px-4 py-2 font-mono">Seoul</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">우편번호</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Postal Code</td>
                  <td className="px-4 py-2 font-mono">06236</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">국가</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Country</td>
                  <td className="px-4 py-2 font-mono">South Korea</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            3. 실제 변환 예시
          </h2>
          <p className="mb-3">
            예를 들어 다음 한글 주소를 영문으로 바꾸면 이렇게 됩니다.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
                한글
              </div>
              <div className="text-gray-900">
                서울특별시 강남구 테헤란로 152, 101동 502호 (06236)
              </div>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
                영문
              </div>
              <div className="break-words font-mono text-gray-950">
                152 Teheran-ro, 101-502, Gangnam-gu, Seoul 06236, South Korea
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            4. 도로명 주소 vs 지번 주소
          </h2>
          <p>
            한국에는 도로명 주소(예: 테헤란로 152)와 옛 지번 주소(예: 역삼동
            737)가 함께 쓰입니다. 둘 다 변환할 수 있지만, 도로명 주소가 국제적으로
            더 표준적이고 배송에도 유리하므로 가능하면 도로명 주소를 사용하세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            5. 동·호수·층은 어떻게 쓰나요
          </h2>
          <p>
            아파트 동/호수는 보통 하이픈으로 합쳐 적습니다. 예를 들어 “101동
            502호”는 <span className="font-mono">101-502</span> 가 됩니다. 층은
            “F”로 표기합니다(예: 3층 → 3F). 이 도구는 상세주소를 입력하면 이런
            규칙을 자동으로 적용해 Street 칸에 합쳐 줍니다. 해외 양식에 Address
            Line 2(또는 Apartment/Suite/Unit) 칸이 따로 있으면 동/호 부분만 그
            칸으로 옮겨 적어도 됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            6. 자주 하는 실수
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              시·도와 구·시를 바꿔 적기 — Seoul(시/도)과 Gangnam-gu(구)는 칸이
              다릅니다.
            </li>
            <li>우편번호를 빠뜨리기 — 해외 배송에서 ZIP/Postal Code는 중요합니다.</li>
            <li>국가(South Korea) 누락 — 국제 배송에는 반드시 국가가 필요합니다.</li>
          </ul>
        </section>
      </article>

      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/70 p-5 text-center">
        <p className="text-sm text-blue-900">
          직접 변환해 보세요 —{" "}
          <Link href="/" className="font-semibold text-blue-700 hover:underline">
            주소 변환기로 이동 →
          </Link>
        </p>
      </div>
    </ContentLayout>
  );
}
