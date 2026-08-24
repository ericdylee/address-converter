import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import GuideQuickAnswer from "@/components/GuideQuickAnswer";
import { createPageMetadata } from "@/lib/metadata";
import { guideJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "한글 주소, 영문으로 쓰는 법",
  description:
    "한국 주소를 영문으로 작성할 때 Address Line 1/2, City, State, ZIP 칸에 무엇을 넣는지 실제 예시로 빠르게 확인하세요.",
  path: "/guide/english-address",
});

export default function EnglishAddressGuide() {
  return (
    <ContentLayout
      title="한글 주소, 영문으로 쓰는 법"
      lead="영문 주소는 한글 주소와 순서가 반대입니다. 원리만 이해하면 어렵지 않습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
      jsonLd={guideJsonLd({
        title: "한글 주소, 영문으로 쓰는 법",
        path: "/guide/english-address",
      })}
    >
      <GuideQuickAnswer
        rows={[
          { label: "Address Line 1", value: "152 Teheran-ro" },
          {
            label: "Address Line 2",
            value: "101-502",
            note: "동/호수 칸이 따로 있을 때만 사용합니다.",
          },
          { label: "City", value: "Gangnam-gu" },
          { label: "State / Province", value: "Seoul" },
          { label: "ZIP / Postal Code", value: "06236" },
          { label: "Country", value: "South Korea" },
        ]}
      />

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
            앞에 오고, 도시·시도·국가가 뒤로 갑니다. 이 한 가지 원리만 기억하면
            나머지는 각 칸에 무엇을 넣느냐의 문제일 뿐입니다.
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
            3. 도로 이름은 유형에 따라 표기가 다릅니다
          </h2>
          <p className="mb-3">
            도로명은 “로”, “길”, “대로”처럼 끝이 조금씩 다른데, 영문 표기도 그에
            맞춰 붙습니다. 규칙만 알면 대부분 그대로 옮길 수 있습니다.
          </p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">한글</th>
                  <th className="px-4 py-2 font-semibold">영문</th>
                  <th className="px-4 py-2 font-semibold">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2">대로</td>
                  <td className="px-4 py-2 font-medium text-gray-900">-daero</td>
                  <td className="px-4 py-2 font-mono">세종대로 → Sejong-daero</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">로</td>
                  <td className="px-4 py-2 font-medium text-gray-900">-ro</td>
                  <td className="px-4 py-2 font-mono">테헤란로 → Teheran-ro</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">길</td>
                  <td className="px-4 py-2 font-medium text-gray-900">-gil</td>
                  <td className="px-4 py-2 font-mono">방배로12길 → Bangbae-ro 12-gil</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            로마자 철자가 헷갈릴 때는 추측하지 말고{" "}
            <Link href="/" className="font-medium text-blue-700 hover:underline">
              변환기
            </Link>
            에 한글 주소를 검색하세요. 행정안전부 공식 표기를 그대로 보여줍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            4. 실제 변환 예시 4가지
          </h2>
          <p className="mb-3">
            지역 유형에 따라 City·State 칸에 들어가는 것이 달라집니다. 아래
            예시로 감을 잡아 보세요.
          </p>
          <div className="space-y-4">
            <ExampleCard
              ko="서울특별시 강남구 테헤란로 152, 101동 502호 (06236)"
              en="152 Teheran-ro, 101-502, Gangnam-gu, Seoul 06236, South Korea"
              note="특별시·광역시는 구(Gangnam-gu)가 City, 시·도(Seoul)가 State."
            />
            <ExampleCard
              ko="부산광역시 부산진구 서면로 39, 1201호 (47285)"
              en="39 Seomyeon-ro, 1201, Busanjin-gu, Busan 47285, South Korea"
              note="부산도 같은 규칙 — 구가 City, Busan이 State."
            />
            <ExampleCard
              ko="경기도 성남시 분당구 판교로 228 (13529)"
              en="228 Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do 13529, South Korea"
              note="도(道)는 시(Seongnam-si)가 City, 도(Gyeonggi-do)가 State. 구는 시 이름과 함께 적으면 됩니다."
            />
            <ExampleCard
              ko="서울특별시 중구 세종대로 110, 서울시청 (04524)"
              en="110 Sejong-daero, Seoul City Hall, Jung-gu, Seoul 04524, South Korea"
              note="건물명이 있으면 건물번호 뒤에 그대로 붙입니다."
            />
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            5. 도로명 주소 vs 지번 주소
          </h2>
          <p>
            한국에는 도로명 주소(예: 테헤란로 152)와 옛 지번 주소(예: 역삼동
            737)가 함께 쓰입니다. 둘 다 변환할 수 있지만, 도로명 주소가 국제적으로
            더 표준적이고 배송에도 유리하므로 가능하면 도로명 주소를 사용하세요.
            해외 택배사·세관 시스템도 도로명 기반 표기를 더 잘 인식합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            6. 동·호수·층은 어떻게 쓰나요
          </h2>
          <p>
            아파트 동/호수는 보통 하이픈으로 합쳐 적습니다. 예를 들어 “101동
            502호”는 <span className="font-mono">101-502</span> 가 됩니다. 층은
            “F”로 표기합니다(예: 3층 → 3F). 이 도구는 상세주소를 입력하면 이런
            규칙을 자동으로 적용해 Street 칸에 합쳐 줍니다. 해외 양식에 Address
            Line 2(또는 Apartment/Suite/Unit) 칸이 따로 있으면 동/호 부분만 그
            칸으로 옮겨 적어도 됩니다. 건물명·오피스텔·빌라 이름까지 포함한 자세한
            규칙은{" "}
            <Link
              href="/guide/apartment-unit"
              className="font-medium text-blue-700 hover:underline"
            >
              아파트 동·호수, 건물명 영문 표기 정리
            </Link>
            에서 확인하세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            7. 건물명·회사 주소·사서함 처리
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-gray-900">건물명·회사명</strong> —
              건물번호 다음에 영문 건물/회사 이름을 적습니다. 예:{" "}
              <span className="font-mono">152 Teheran-ro, Gangnam Finance Center</span>.
              받는 사람이 회사면 이름과 부서를 맨 윗줄(Attention/C/O)에 따로 적으면
              전달이 확실합니다.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">사서함(P.O. Box)</strong> —
              사서함은 도로명 대신 <span className="font-mono">P.O. Box 1234</span>{" "}
              형태로 Address Line 1에 넣고, City·State·우편번호는 동일하게 적습니다.
              단, 국제 특송(FedEx·DHL 등)은 사서함으로 배송이 안 되는 경우가 많으니
              실제 도로명 주소를 권장합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            8. 해외 양식 칸에 맞춰 넣기
          </h2>
          <p>
            해외 사이트는 칸 이름이 제각각입니다(Address Line 1/2, Town/City,
            State/Province/Region, ZIP/Postal Code). 우리 앱의 4개 필드를 그대로
            대응시키면 됩니다. 쇼핑몰별 실제 입력 예시는{" "}
            <Link
              href="/guide/overseas-shopping"
              className="font-medium text-blue-700 hover:underline"
            >
              해외직구 배송지에 주소 넣는 법
            </Link>
            에서 자세히 다룹니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            9. 자주 하는 실수
          </h2>
          <p>
            City·State 뒤바꿈, 한글 어순 그대로 적기, 동/호수 누락, 우편번호 형식 등
            흔한 실수는 잘못된 예와 올바른 예를 나란히 놓고{" "}
            <Link
              href="/guide/common-mistakes"
              className="font-medium text-blue-700 hover:underline"
            >
              자주 틀리는 실수 7가지
            </Link>
            에 정리해 두었습니다. 이 글을 다 읽었다면 그 글로 한 번 점검해 보세요.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                영문 이름도 함께 적어야 하나요?
              </h3>
              <p className="mt-1">
                배송·서류의 “받는 사람(Recipient/Name)” 칸에는 영문 이름을 따로
                적습니다. 주소 칸에는 주소만 넣으면 됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                도로명이 영어로 안 바뀌면 어떻게 하나요?
              </h3>
              <p className="mt-1">
                로마자 철자를 직접 만들지 말고{" "}
                <Link href="/" className="font-medium text-blue-700 hover:underline">
                  변환기
                </Link>
                에 검색하세요. 공식 데이터에 있는 정확한 표기를 보여줍니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                우편번호를 모르면 어떻게 찾나요?
              </h3>
              <p className="mt-1">
                도로명이나 건물명으로 검색하면 후보와 함께 우편번호(5자리)가 같이
                나옵니다. 그 값을 ZIP/Postal Code 칸에 넣으면 됩니다.
              </p>
            </div>
          </div>
        </section>
      </article>

      <GuideCta />
    </ContentLayout>
  );
}

// 한글/영문 변환 예시 한 쌍을 보여주는 카드. 이 페이지 안에서만 쓰는 표시용 조각.
function ExampleCard({
  ko,
  en,
  note,
}: {
  ko: string;
  en: string;
  note?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
          한글
        </div>
        <div className="text-gray-900">{ko}</div>
      </div>
      <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
        <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
          영문
        </div>
        <div className="break-words font-mono text-gray-950">{en}</div>
      </div>
      {note && <p className="px-1 text-sm text-gray-500">{note}</p>}
    </div>
  );
}
