import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";

export const metadata: Metadata = {
  title: "해외직구 배송지에 한국·일본 주소 넣는 법",
  description:
    "해외 쇼핑몰 주문서의 Address Line 1/2, City, State/Province, ZIP, Country 칸에 한국·일본 주소를 어떻게 넣어야 하는지 실제 예시로 정리했습니다.",
  alternates: { canonical: "/guide/overseas-shopping" },
};

export default function OverseasShoppingGuide() {
  return (
    <ContentLayout
      title="해외직구 배송지에 한국·일본 주소 넣는 법"
      lead="해외 주문서의 영어 칸 이름이 낯설어도, 어떤 칸에 무엇을 넣는지만 알면 됩니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            1. 주소를 잘못 적으면 생기는 일
          </h2>
          <p>
            해외직구에서 주소를 잘못 적으면 배송 지연, 반송, 통관 문제로 이어질 수
            있습니다. 특히 City와 State를 바꿔 넣거나 우편번호를 빠뜨리는 실수가
            잦습니다. 아래에서 각 칸의 의미와 입력 예시를 확인하세요.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            2. 해외 양식에 자주 나오는 칸 이름
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">칸 이름(영문)</th>
                  <th className="px-4 py-2 font-semibold">무엇을 넣나</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    Address Line 1 / Street address
                  </td>
                  <td className="px-4 py-2">도로명 + 건물번호 (일본은 번지 + 동네)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    Address Line 2 / Apartment, Suite, Unit
                  </td>
                  <td className="px-4 py-2">동/호수, 건물명 (선택)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    City / Town
                  </td>
                  <td className="px-4 py-2">구·시·군 (일본은 시·구)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    State / Province / Region
                  </td>
                  <td className="px-4 py-2">시·도 (일본은 도도부현)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    ZIP / Postal Code
                  </td>
                  <td className="px-4 py-2">우편번호</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    Country / Region
                  </td>
                  <td className="px-4 py-2">South Korea 또는 Japan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            3. 한국 주소 입력 예시
          </h2>
          <p className="mb-3">
            “서울특별시 강남구 테헤란로 152, 101동 502호 (06236)”를 칸별로 넣으면
            다음과 같습니다.
          </p>
          <ul className="space-y-1.5 font-mono text-sm text-gray-900">
            <li>Address Line 1 — 152 Teheran-ro</li>
            <li>Address Line 2 — 101-502</li>
            <li>City — Gangnam-gu</li>
            <li>State / Province — Seoul</li>
            <li>ZIP / Postal Code — 06236</li>
            <li>Country — South Korea</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            4. 일본 주소 입력 예시
          </h2>
          <p className="mb-3">
            “東京都 千代田区 丸の内 1-1-1 (100-0005)”를 칸별로 넣으면 다음과
            같습니다. 일본은 번지가 동네 앞에 옵니다.
          </p>
          <ul className="space-y-1.5 font-mono text-sm text-gray-900">
            <li>Address Line 1 — 1-1-1 Marunouchi</li>
            <li>City — Chiyoda-ku</li>
            <li>State / Prefecture — Tokyo</li>
            <li>ZIP / Postal Code — 100-0005</li>
            <li>Country — Japan</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            5. 따라하기 3단계
          </h2>
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>이 사이트에서 한글(또는 일본) 주소를 검색해 후보를 선택합니다.</li>
            <li>결과 화면에서 칸별로 나뉜 영문 주소를 복사 버튼으로 복사합니다.</li>
            <li>
              해외 양식의 같은 의미의 칸(위 표 참고)에 차례대로 붙여넣습니다.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            6. 자주 하는 실수
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>City 칸만 있을 때 — 보통 큰 도시 이름(예: Seoul)을 넣습니다.</li>
            <li>State와 City를 바꿔 넣기 — 시/도와 구/시는 서로 다른 칸입니다.</li>
            <li>동/호수 누락 — Address Line 2가 없으면 Line 1 끝에 함께 적습니다.</li>
          </ul>
        </section>
      </article>

      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/70 p-5 text-center">
        <p className="text-sm text-blue-900">
          내 주소로 바로 만들어 보세요 —{" "}
          <Link href="/" className="font-semibold text-blue-700 hover:underline">
            주소 변환기로 이동 →
          </Link>
        </p>
      </div>
    </ContentLayout>
  );
}
