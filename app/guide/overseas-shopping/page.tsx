import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import GuideQuickAnswer from "@/components/GuideQuickAnswer";
import { createPageMetadata } from "@/lib/metadata";
import { guideJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "해외직구 배송지에 한국·일본 주소 넣는 법",
  description:
    "해외 쇼핑몰 주문서의 Address Line 1/2, City, State/Province, ZIP, Country 칸에 한국·일본 주소를 어떻게 넣는지 예시로 확인하세요.",
  path: "/guide/overseas-shopping",
});

export default function OverseasShoppingGuide() {
  return (
    <ContentLayout
      title="해외직구 배송지에 한국·일본 주소 넣는 법"
      lead="해외 주문서의 영어 칸 이름이 낯설어도, 어떤 칸에 무엇을 넣는지만 알면 됩니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
      jsonLd={guideJsonLd({
        title: "해외직구 배송지에 한국·일본 주소 넣는 법",
        path: "/guide/overseas-shopping",
        dateModified: "2026-08-24",
      })}
    >
      <GuideQuickAnswer
        title="한국 주소 빠른 답"
        rows={[
          { label: "Address Line 1", value: "1001 Jungang-daero" },
          {
            label: "Address Line 2",
            value: "동/호수 (선택)",
            note: "아파트라면 101-502 처럼 넣습니다.",
          },
          { label: "City", value: "Yeonje-gu" },
          { label: "State / Province", value: "Busan" },
          { label: "ZIP / Postal Code", value: "47545" },
          { label: "Country", value: "South Korea" },
        ]}
      />
      <GuideQuickAnswer
        title="일본 주소 빠른 답"
        rows={[
          { label: "Address Line 1", value: "1-1-1 Marunouchi" },
          { label: "City", value: "Chiyoda-ku" },
          { label: "State / Prefecture", value: "Tokyo" },
          { label: "ZIP / Postal Code", value: "100-0005" },
          { label: "Country", value: "Japan" },
        ]}
      />

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
            “부산광역시 연제구 중앙대로 1001 (47545)”을 칸별로 넣으면 다음과
            같습니다. 아파트라면 동/호수는 Address Line 2에 넣습니다.
          </p>
          <ul className="space-y-1.5 font-mono text-sm text-gray-900">
            <li>Address Line 1 — 1001 Jungang-daero</li>
            <li>City — Yeonje-gu</li>
            <li>State / Province — Busan</li>
            <li>ZIP / Postal Code — 47545</li>
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
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            6. 사이트마다 요구하는 게 다릅니다
          </h2>
          <p className="mb-3">
            해외 쇼핑몰이라고 해서 전부 영문 주소를 받는 것은 아닙니다. 한국 배송을
            오래 해온 곳은 아예 한국식 주소 입력창을 따로 만들어 두기도 합니다. 실제
            화면을 확인한 결과를 정리하면 이렇습니다.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">사이트</th>
                  <th className="px-4 py-2 font-semibold">주소를 어떻게 받나</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">아마존</td>
                  <td className="px-4 py-2">
                    영문 주소. <span className="font-mono">City</span> ·{" "}
                    <span className="font-mono">Province</span> 칸이 나뉘어 있습니다.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">아이허브</td>
                  <td className="px-4 py-2">
                    한글 주소. 우편번호·주소·상세주소 칸으로 받고 City·Province 칸이
                    없습니다.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900">알리익스프레스</td>
                  <td className="px-4 py-2">
                    한글 주소. 우편번호·도로명으로 찾는 한국식 검색창을 씁니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <figure>
              <Image
                src="/shots/iherb/01-new-address-form.png"
                alt="아이허브의 새 배송 주소 추가 화면. 국가를 대한민국으로 고르면 이름, 우편번호, 주소(도시명·구·동·지번 또는 도로명), 상세주소, 휴대폰번호 칸이 한글로 표시된다."
                width={1626}
                height={1278}
                className="h-auto w-full rounded-lg border border-gray-200"
              />
              <figcaption className="mt-2 text-xs leading-5 text-gray-500">
                아이허브 — 칸 이름이 전부 한글이고 City·Province 칸이 없습니다.
                (2026-08-24 확인)
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/shots/aliexpress/01-new-address-form.png"
                alt="알리익스프레스의 배송지 추가 화면. 국가는 Korea, 받는 사람과 +82 휴대폰 번호를 받고, 주소는 우편번호·도로명·건물명·번지로 찾는 한국식 검색창을 쓴다."
                width={1646}
                height={786}
                className="h-auto w-full rounded-lg border border-gray-200"
              />
              <figcaption className="mt-2 text-xs leading-5 text-gray-500">
                알리익스프레스 — 한국식 주소 검색창을 씁니다. 전화번호는 “01로 시작하는
                11자리”를 요구합니다. (2026-08-24 확인)
              </figcaption>
            </figure>
          </div>

          <p className="mt-3">
            그래서 “해외직구에는 무조건 영문 주소”라는 말은 사실이 아닙니다. 영문 주소가
            꼭 필요한 곳은 아마존·이베이처럼 한국 전용 입력 화면이 없는 사이트입니다.
            사이트별 실제 화면과 칸별 입력값은{" "}
            <Link
              href="/guide/amazon-address"
              className="font-medium text-blue-700 hover:underline"
            >
              아마존 한국 주소 입력법
            </Link>
            에 정리해 두었습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            7. 배송대행지(배대지)를 쓸 때 — 헷갈리기 쉬운 구분
          </h2>
          <p>
            미국 등 현지 쇼핑몰이 한국 배송을 안 할 때는 “배송대행지(배대지)”를
            씁니다. 이때 <strong className="font-semibold text-gray-900">쇼핑몰
            주문서의 배송 주소는 내 한국 집이 아니라 배대지의 현지 주소</strong>를
            넣습니다. 내 한국 주소는 배대지 업체에 “최종 전달지”로 따로 등록합니다.
            즉 두 주소의 역할이 다릅니다.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>쇼핑몰 배송지 = 배대지 현지 창고 주소(+내 이름·배대지 회원코드)</li>
            <li>배대지에 등록하는 최종 배송지 = 내 한국 영문 주소</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            현지에서 한국까지의 국제 배송·라벨·세관신고서 작성은{" "}
            <Link
              href="/guide/international-shipping"
              className="font-medium text-blue-700 hover:underline"
            >
              국제우편·EMS 영문 주소와 라벨 작성법
            </Link>
            에서 다룹니다.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            8. 전화번호와 개인통관고유부호
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-gray-900">전화번호</strong> —
              국가번호 <span className="font-mono">+82</span>를 고른 다음, 맨 앞 0을
              빼는 곳과 그대로 두는 곳이 갈립니다. 아마존은 0을 뺀{" "}
              <span className="font-mono">10 1234 5678</span> 형태를 예시로 보여주고,
              알리익스프레스는 “01로 시작하는 11자리”를 요구합니다.{" "}
              <strong className="font-semibold text-gray-900">
                입력창 아래 안내 문구를 그대로 따르세요.
              </strong>
            </li>
            <li>
              <strong className="font-semibold text-gray-900">
                개인통관고유부호(P + 12자리)
              </strong>{" "}
              — 한국으로 들어오는 해외직구는 통관 시 이 번호가 필요합니다. 관세청
              유니패스에서 발급받아, 쇼핑몰의 해당 칸(또는 배대지)에 입력하세요.
              주소와는 별개의 정보입니다. 영문 이름으로 주문할 때 전화번호가 통관부호
              등록 정보와 맞아야 하는 경우가 있으니{" "}
              <Link href="/guide/amazon-address" className="font-medium text-blue-700 hover:underline">
                아마존 입력법
              </Link>
              의 통관 항목도 함께 보세요.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            9. 자주 하는 실수
          </h2>
          <p>
            City·State를 바꿔 넣기, 동/호수 누락, 우편번호 형식처럼 이 글 밖에서도
            반복되는 실수는{" "}
            <Link
              href="/guide/common-mistakes"
              className="font-medium text-blue-700 hover:underline"
            >
              자주 틀리는 실수 7가지
            </Link>
            에 잘못된 예·올바른 예와 함께 모아두었습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                배대지를 쓰면 내 한국 주소는 어디에 넣나요?
              </h3>
              <p className="mt-1">
                쇼핑몰에는 배대지 현지 주소를 넣고, 내 한국 영문 주소는 배대지
                업체 사이트의 “배송지(수취인)” 정보에 등록합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                State 칸이 필수인데 우리 동네가 목록에 없어요.
              </h3>
              <p className="mt-1">
                대부분 직접 입력이 가능합니다. 시·도 이름(예: Seoul, Busan,
                Gyeonggi-do)을 그대로 타이핑하세요.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                개인통관고유부호는 주소 칸에 넣나요?
              </h3>
              <p className="mt-1">
                아니요. 주소와 별개이며, 쇼핑몰이나 배대지의 전용 칸(customs
                code 등)에 입력합니다.
              </p>
            </div>
          </div>
        </section>
      </article>

      <GuideCta />
    </ContentLayout>
  );
}
