import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";

export const metadata: Metadata = {
  title: "일본 주소, 영문으로 쓰는 법",
  description:
    "일본 주소를 영문(로마자)으로 작성하는 방법을 정리했습니다. 영문 주소의 어순, 도도부현·시구정촌 구분, 丁目·番地·号의 숫자 표기, 우편번호 형식, 실제 변환 예시까지 예시 중심으로 설명합니다.",
  alternates: { canonical: "/guide/japan-address" },
};

export default function JapanAddressGuide() {
  return (
    <ContentLayout
      title="일본 주소, 영문으로 쓰는 법"
      lead="일본 주소도 영문으로 쓸 때는 순서가 반대가 됩니다. 우편번호와 丁目·番地·号 규칙만 알면 어렵지 않습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            1. 영문 일본 주소는 순서가 반대입니다
          </h2>
          <p>
            일본어 주소는 <strong className="font-semibold text-gray-900">큰 단위 → 작은 단위</strong>{" "}
            순서로 씁니다(도도부현 → 시·구 → 동네 → 번지). 영문으로 쓸 때는
            한국 주소와 마찬가지로{" "}
            <strong className="font-semibold text-gray-900">작은 단위 → 큰 단위</strong>{" "}
            순서로 뒤집습니다. 번지가 맨 앞, 도도부현과 우편번호가 뒤로 갑니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            2. 일본 주소의 구성요소와 영문 대응
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">일본어</th>
                  <th className="px-4 py-2 font-semibold">영문 필드</th>
                  <th className="px-4 py-2 font-semibold">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2">丁目·番地·号 (번지)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Street Address 앞부분</td>
                  <td className="px-4 py-2 font-mono">1-1-1</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">町域 (동네 이름)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Street Address 뒷부분</td>
                  <td className="px-4 py-2 font-mono">Marunouchi</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">건물명·호수</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Address Line 2</td>
                  <td className="px-4 py-2 font-mono">Sakura Bldg. 5F</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">市·区·町·村 (시구정촌)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">City</td>
                  <td className="px-4 py-2 font-mono">Chiyoda-ku</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">都道府県 (도도부현)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">State / Prefecture</td>
                  <td className="px-4 py-2 font-mono">Tokyo</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">郵便番号 (우편번호 7자리)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Postal Code</td>
                  <td className="px-4 py-2 font-mono">100-0005</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">국가</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Country</td>
                  <td className="px-4 py-2 font-mono">Japan</td>
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
            예를 들어 다음 일본어 주소를 영문으로 바꾸면 이렇게 됩니다.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
                일본어
              </div>
              <div className="text-gray-900">
                〒100-0005 東京都千代田区丸の内1丁目1番1号
              </div>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
                영문
              </div>
              <div className="break-words font-mono text-gray-950">
                1-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005, Japan
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            4. 丁目·番地·号는 하이픈 숫자로 씁니다
          </h2>
          <p>
            &ldquo;1丁目2番3号&rdquo;처럼 단위가 붙은 번지는 영문에서{" "}
            <span className="font-mono">1-2-3</span> 처럼 하이픈으로 이어 적는
            것이 표준입니다. 일본 우편(Japan Post)의 로마자 표기도 이 방식을
            씁니다. 이 도구의 일본 탭에서 우편번호로 동네까지 찾은 뒤,
            번지·건물번호 칸에 <span className="font-mono">1-2-3</span> 형태로 입력하면
            Street 칸 맨 앞에 자동으로 합쳐집니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            5. 건물명과 호수는 어떻게 쓰나요
          </h2>
          <p>
            건물명은 로마자로 적고 층/호를 뒤에 붙입니다(예: サクラビル 5階 →{" "}
            <span className="font-mono">Sakura Bldg. 5F</span>). 해외 양식에
            Address Line 2(또는 Apartment/Suite/Unit) 칸이 있으면 건물명·호수만
            그 칸에 적고, 없으면 Street 칸 끝에 이어 적으면 됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            6. 자주 하는 실수
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Tokyo를 City 칸에 넣기 — Tokyo는 도도부현이므로 State/Prefecture
              칸에 넣고, City에는 시·구(예: Chiyoda-ku)를 넣습니다.
            </li>
            <li>
              우편번호 하이픈 누락 — 일본 우편번호는{" "}
              <span className="font-mono">100-0005</span> 처럼 3자리-4자리
              형식입니다.
            </li>
            <li>
              주소를 일본어 순서 그대로 적기 — 영문은 번지부터 시작해야
              합니다.
            </li>
            <li>국가(Japan) 누락 — 국제 배송에는 반드시 국가가 필요합니다.</li>
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
