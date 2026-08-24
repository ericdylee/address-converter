import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideQuickAnswer from "@/components/GuideQuickAnswer";
import GuideCta from "@/components/GuideCta";
import LastVerified from "@/components/LastVerified";
import { createPageMetadata } from "@/lib/metadata";
import { guideJsonLd } from "@/lib/structured-data";

// 이 글의 모든 칸 이름·힌트·경고 문구는 아래 날짜에 실제 아마존 화면을 보고
// 옮긴 것이다. 화면이 바뀌면 캡처부터 다시 찍고 문장을 고친다.
const VERIFIED = "2026-08-24";

export const metadata: Metadata = createPageMetadata({
  title: "아마존 한국 주소 입력법 (City·Province 헷갈리지 않기)",
  description:
    "아마존 주소 입력 화면을 그대로 보면서 City·Province·Zip Code에 무엇을 넣는지, 아마존이 보여주는 힌트가 왜 헷갈리는지, 결제 단계의 개인통관고유부호까지 실제 화면으로 정리했습니다.",
  path: "/guide/amazon-address",
});

export default function AmazonShopGuide() {
  return (
    <ContentLayout
      title="아마존 한국 주소 입력법"
      lead="아마존의 실제 주소 입력 화면을 보면서 칸별로 짚어봅니다. City와 Province를 헷갈리게 만드는 원인이 아마존 화면 자체에 있습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
      jsonLd={guideJsonLd({
        title: "아마존 한국 주소 입력법",
        path: "/guide/amazon-address",
        datePublished: VERIFIED,
        dateModified: VERIFIED,
      })}
    >
      {/* 값 자리에는 "실제로 칸에 넣는 것"을 둔다(다른 가이드와 동일한 규칙).
          예시 주소는 인천광역시 미추홀구 인하로 100 기준. */}
      <GuideQuickAnswer
        title="빠른 답 — 아마존 칸에 넣을 것"
        rows={[
          {
            label: "Address (첫째 칸)",
            value: "100 Inha-ro",
            note: "도로명 + 건물번호",
          },
          {
            label: "Zip Code",
            value: "22212",
            note: "우편번호 5자리. 아마존은 이 칸이 City보다 위에 있습니다",
          },
          {
            label: "City",
            value: "Michuhol-gu",
            note: "구·시·군을 넣습니다. Seoul 같은 시·도가 아닙니다",
          },
          {
            label: "Province",
            value: "Incheon",
            note: "시·도를 넣습니다",
          },
          {
            label: "Phone number",
            value: "10 1234 5678",
            note: "+82를 고른 뒤 앞자리 0을 뺍니다 (010-1234-5678 기준)",
          },
          {
            label: "결제 단계",
            value: "P123456789012",
            note: "개인통관고유부호. 주소만 맞춰서는 주문이 끝나지 않습니다",
          },
        ]}
      />

      <article className="space-y-8 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            아마존 주소 입력 화면
          </h2>
          <p className="mb-4">
            아마존에서 <span className="font-mono text-gray-900">Your Addresses</span> →{" "}
            <span className="font-mono text-gray-900">Add address</span> 로 들어가면 나오는
            화면입니다. Country/Region을{" "}
            <span className="font-mono text-gray-900">Republic of Korea</span>로 고르면 한국용
            칸 구성으로 바뀝니다.
          </p>
          <figure>
            <Image
              src="/shots/amazon/01-add-address-form.png"
              alt="아마존 Add a new address 화면. 위에서부터 Country/Region, Full name, Phone number, Address 입력창 두 개, Zip Code, City, Province 순서로 칸이 놓여 있다."
              width={1196}
              height={1358}
              className="h-auto w-full rounded-lg border border-gray-200"
            />
            <figcaption className="mt-2 text-xs leading-5 text-gray-500">
              아마존 주소 추가 화면 ({VERIFIED} 확인). 칸이 비어 있을 때 회색으로 보이는
              글씨는 입력값이 아니라 아마존이 보여주는 예시입니다.
            </figcaption>
          </figure>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            칸별로 무엇을 넣나
          </h2>
          <p className="mb-3">
            예시로 <span className="font-medium text-gray-900">인천광역시 미추홀구 인하로 100,
            인하아파트 101동 502호</span> 를 넣어 보겠습니다.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-2.5 font-semibold text-gray-900">아마존 칸</th>
                  <th className="px-4 py-2.5 font-semibold text-gray-900">넣을 것</th>
                  <th className="px-4 py-2.5 font-semibold text-gray-900">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Country/Region", "드롭다운에서 선택", "Republic of Korea"],
                  ["Full name", "여권과 같은 영문 이름", "Hong, Gil-Dong"],
                  ["Phone number", "+82 선택 후 앞자리 0 제거", "10 1234 5678"],
                  ["Address (첫째 칸)", "도로명 + 건물번호", "100 Inha-ro"],
                  ["Address (둘째 칸)", "건물명 · 동/호수", "Inha APT 101-502"],
                  ["Zip Code", "우편번호 5자리", "22212"],
                  ["City", "구 · 시 · 군", "Michuhol-gu"],
                  ["Province", "시 · 도", "Incheon"],
                ].map(([field, what, ex]) => (
                  <tr key={field}>
                    <td className="px-4 py-2.5 font-medium text-gray-900">{field}</td>
                    <td className="px-4 py-2.5 text-gray-700">{what}</td>
                    <td className="px-4 py-2.5 font-mono text-gray-950">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Address 칸은 라벨이 하나인데 입력창이 두 개입니다. 다른 사이트의{" "}
            <span className="font-mono">Address Line 1 / 2</span> 와 같은 역할이라고 보면
            됩니다. 동·호수 표기법은{" "}
            <Link
              href="/guide/apartment-unit"
              className="font-medium text-blue-700 hover:underline"
            >
              아파트 동·호수 영문 표기 정리
            </Link>
            에 자세히 있습니다.
          </p>
        </section>

        <section>
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-5">
            <h2 className="mb-2 text-lg font-semibold text-amber-950">
              ⚠️ 아마존이 보여주는 힌트를 그대로 따르면 틀립니다
            </h2>
            <p className="text-amber-900">
              위 화면에서 City 칸에는{" "}
              <span className="font-mono font-semibold">Seoul</span>, Province 칸에는{" "}
              <span className="font-mono font-semibold">Kyeonggi-do</span> 가 회색 예시로 떠
              있습니다. 그런데{" "}
              <strong className="font-semibold">서울특별시는 경기도 안에 있지 않습니다.</strong>{" "}
              두 힌트를 나란히 놓고 보면 존재할 수 없는 주소입니다.
            </p>
            <p className="mt-3 text-amber-900">
              그래서 이 화면을 처음 보면 &ldquo;City에는 서울 같은 큰 도시를 넣는구나&rdquo;
              라고 읽게 되는데, 실제로는 반대입니다.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-red-200 bg-white p-4">
                <p className="text-xs font-semibold text-red-700">✕ 잘못된 입력</p>
                <p className="mt-2 font-mono text-sm leading-6 text-gray-800">
                  City: Incheon
                  <br />
                  Province: Michuhol-gu
                </p>
              </div>
              <div className="rounded-lg border border-green-200 bg-white p-4">
                <p className="text-xs font-semibold text-green-700">✓ 올바른 입력</p>
                <p className="mt-2 font-mono text-sm leading-6 text-gray-800">
                  City: Michuhol-gu
                  <br />
                  Province: Incheon
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-amber-900">
              규칙은 하나입니다. <strong className="font-semibold">작은 단위가 City,
              큰 단위가 Province.</strong> 서울 주소라면 City에 {" "}
              <span className="font-mono">Gangnam-gu</span>, Province에{" "}
              <span className="font-mono">Seoul</span> 이 들어갑니다. 전국 시·도 표기는{" "}
              <Link
                href="/guide/korea-region-names"
                className="font-medium text-blue-800 underline underline-offset-2"
              >
                시·도 영문 표기 정리표
              </Link>
              에 모아뒀습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            힌트의 철자도 공식 표기가 아닙니다
          </h2>
          <p>
            아마존 Province 칸의 예시는{" "}
            <span className="font-mono text-gray-900">Kyeonggi-do</span> 인데, 우리 정부의
            공식 영문 표기는{" "}
            <span className="font-mono font-semibold text-gray-950">Gyeonggi-do</span> 입니다
            (K가 아니라 G). 아마존 힌트가 예전 표기법을 쓰고 있는 것입니다.
          </p>
          <p className="mt-3">
            배송 자체는 우편번호와 구 이름으로 처리되기 때문에 철자가 조금 달라도 대개
            도착합니다. 다만 여러 서류에 같은 주소를 써야 하거나 통관 정보와 대조될 때를
            생각하면 공식 표기로 통일해 두는 편이 안전합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            칸 순서가 다른 사이트와 반대입니다
          </h2>
          <p>
            대부분의 해외 양식은 <span className="font-mono">City → State → ZIP</span> 순으로
            내려갑니다. 그런데 아마존 한국 주소 화면은{" "}
            <span className="font-mono font-semibold text-gray-950">
              Address → Zip Code → City → Province
            </span>{" "}
            순입니다. 우편번호가 도시보다 위에 있습니다.
          </p>
          <p className="mt-3">
            위에서부터 순서대로 채우는 습관이 있으면 우편번호 자리에 도시를 넣는 실수가
            나기 쉽습니다. 칸 이름을 보고 채우세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            전화번호는 앞자리 0을 뺍니다
          </h2>
          <p>
            국가번호 드롭다운에서{" "}
            <span className="font-mono text-gray-900">+82</span> 를 고른 뒤에는 휴대폰 번호
            맨 앞의 <span className="font-mono">0</span> 을 빼고 적습니다. 아마존이 보여주는
            예시 <span className="font-mono text-gray-900">10 5800 8500</span> 도 0이 빠진
            형태입니다.
          </p>
          <p className="mt-3">
            <span className="font-mono">010-1234-5678</span> →{" "}
            <span className="font-mono font-semibold text-gray-950">10 1234 5678</span>
          </p>
          <p className="mt-3 text-sm text-gray-600">
            이 번호는 아래 개인통관고유부호와도 연결되니, 아무 번호나 넣지 마세요.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            주소를 저장해도 끝이 아닙니다 — 개인통관고유부호
          </h2>
          <p className="mb-4">
            한국으로 배송하는 주문은 결제 단계에서{" "}
            <span className="font-medium text-gray-900">개인통관고유부호</span>(Personal
            Customs Clearance Code, PCCC)를 따로 요구합니다. 주소를 아무리 정확히 넣어도 이걸
            빠뜨리면 주문이 진행되지 않습니다.
          </p>
          <figure>
            <Image
              src="/shots/amazon/02-customs-clearance-pccc.png"
              alt="아마존 결제 단계의 Add ID for customs clearance 화면. Personal Customs Clearance Code(개인통관고유부호) 선택, 한국 국적 확인 체크박스, P로 시작하는 12자리 숫자를 넣는 입력창이 보인다."
              width={1654}
              height={1592}
              className="h-auto w-full rounded-lg border border-gray-200"
            />
            <figcaption className="mt-2 text-xs leading-5 text-gray-500">
              결제 단계의 통관 정보 입력 화면 ({VERIFIED} 확인). 이름과 주소는 예시로
              바꿔 두었습니다.
            </figcaption>
          </figure>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              형식은 <span className="font-mono text-gray-900">P</span> + 숫자 12자리입니다
              (화면의 예시: <span className="font-mono">P123456789012</span>).
            </li>
            <li>
              <span className="font-medium text-gray-900">
                &ldquo;only Korean citizens can submit PCCC&rdquo;
              </span>{" "}
              체크박스에 동의해야 입력할 수 있습니다.
            </li>
            <li>
              <span className="font-medium text-gray-900">Save this ID as</span> 칸은 이
              부호에 붙이는 별칭입니다. 아마존이 직접 경고하듯 이 칸의 값은 별표로
              가려지지 않으니 여권번호 같은 정보를 넣지 마세요.
            </li>
          </ul>
        </section>

        <section>
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-5">
            <h2 className="mb-2 text-lg font-semibold text-amber-950">
              ⚠️ 영문 이름으로 주문하면 전화번호가 발목을 잡습니다
            </h2>
            <p className="text-amber-900">
              통관부호 입력란 위에 이런 안내가 붙어 있습니다.
            </p>
            <blockquote className="my-3 rounded-lg border-l-4 border-amber-300 bg-white px-4 py-3 text-sm leading-6 text-gray-700">
              Korean name must match PCCC registration. If using non-Korean name, last 4
              digits of phone number must match PCCC registration.
            </blockquote>
            <p className="text-amber-900">
              풀어 쓰면 이렇습니다. 한글 이름으로 주문하면 그 이름이 통관부호 등록 정보와
              같아야 하고,{" "}
              <strong className="font-semibold">
                영문 이름으로 주문하면 전화번호 뒤 4자리가 통관부호에 등록된 번호와 같아야
                합니다.
              </strong>
            </p>
            <p className="mt-3 text-amber-900">
              아마존은 Full name을 영문으로 받으니 대부분 뒤쪽 경우에 해당합니다. 아마존에
              넣은 전화번호와 관세청에 등록한 전화번호가 다르면 통관에서 막힐 수 있으니,
              주문 전에 두 번호를 맞춰 두세요.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            주문 전 최종 확인
          </h2>
          <ul className="space-y-2">
            {[
              "Country/Region이 Republic of Korea로 선택되어 있다",
              "Full name이 여권과 같은 영문 이름이다",
              "Phone number가 +82 · 앞자리 0을 뺀 번호다",
              "Address 첫째 칸에 도로명 + 건물번호가 들어갔다",
              "Address 둘째 칸에 동·호수가 들어갔다",
              "Zip Code가 우편번호 5자리다",
              "City에 구·시·군이 들어갔다 (Seoul 같은 시·도가 아니다)",
              "Province에 시·도가 들어갔다",
              "개인통관고유부호를 준비했고, 등록 전화번호가 위 Phone number와 같다",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-0.5 text-gray-300">
                  ☐
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">함께 보기</h2>
          <p>
            영문 주소를 만드는 원리부터 보고 싶다면{" "}
            <Link
              href="/guide/english-address"
              className="font-medium text-blue-700 hover:underline"
            >
              한글 주소, 영문으로 쓰는 법
            </Link>
            을, 다른 쇼핑몰의 칸 이름이 궁금하다면{" "}
            <Link
              href="/guide/overseas-shopping"
              className="font-medium text-blue-700 hover:underline"
            >
              해외직구 배송지에 주소 넣는 법
            </Link>
            을 보세요.
          </p>
        </section>

        <LastVerified date={VERIFIED} note="데스크톱 웹 amazon.com 기준" />
      </article>

      <GuideCta label="내 주소를 아마존 칸에 맞게 변환하기" />
    </ContentLayout>
  );
}
