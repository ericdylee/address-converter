import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import { createPageMetadata } from "@/lib/metadata";
import { guideJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "영문 주소가 필요한 서류 총정리 (비자·유학·해외 계좌)",
  description:
    "비자 신청서, 유학 원서, 해외 은행 계좌·해외 송금 수취인, 영문 재직·재학 증명서 등 주소를 영어로 적어야 하는 서류별 작성 요령과 주의점을 정리했습니다.",
  path: "/guide/english-documents",
});

const cases: { title: string; body: string; tip: string }[] = [
  {
    title: "비자·입국 서류 (Visa / Arrival card)",
    body: "숙소·거주지 주소(Residential address)를 영문으로 적습니다. 여러 칸(Street, City, State/Province, ZIP, Country)으로 나뉘는 경우가 많습니다.",
    tip: "여권상 영문 이름과 주소 표기를 일관되게 유지하세요.",
  },
  {
    title: "유학·어학연수 원서 (Application)",
    body: "본국 주소(Home / Permanent address)와 현지 주소를 따로 묻는 경우가 많습니다. 본국 주소에는 한국 주소의 영문 표기를 넣습니다.",
    tip: "Permanent address = 한국 집 주소, Current/Local address = 현지 주소.",
  },
  {
    title: "해외 은행 계좌·해외 송금",
    body: "수취인(Beneficiary) 또는 계좌 소유자 주소를 영문으로 요구합니다. 송금 시 은행 SWIFT 양식에도 주소가 들어갑니다.",
    tip: "은행 서류는 오타에 민감하므로 공식 표기를 그대로 복사해 쓰는 것이 안전합니다.",
  },
  {
    title: "영문 재직·재학·잔고 증명서",
    body: "발급 기관에 따라 회사/학교 주소나 본인 주소를 영문으로 기재합니다. 아포스티유·공증이 필요한 서류라면 표기가 서로 어긋나지 않게 통일해야 합니다.",
    tip: "여러 서류에 같은 주소를 쓸 때는 표기(철자·하이픈)를 완전히 동일하게 맞추세요.",
  },
];

export default function EnglishDocumentsGuide() {
  return (
    <ContentLayout
      title="영문 주소가 필요한 서류 총정리"
      lead="배송뿐 아니라 비자·유학·해외 계좌·증명서 같은 서류에서도 주소를 영어로 적어야 합니다. 서류는 배송과 달리 ‘표기 일관성’이 특히 중요합니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
      jsonLd={guideJsonLd({
        title: "영문 주소가 필요한 서류 총정리",
        path: "/guide/english-documents",
      })}
    >
      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            서류 주소는 ‘일관성’이 생명입니다
          </h2>
          <p>
            배송은 주소가 조금 달라도 도착하지만, 서류는 여러 문서에 적힌 주소가
            서로 다르면 심사나 공증 단계에서 문제가 될 수 있습니다. 그래서 한 번
            정한 영문 주소 표기(철자·하이픈·띄어쓰기)를 모든 서류에 똑같이 쓰는
            것이 가장 중요합니다. 공식 데이터 기반으로 한 번 변환해 두고 그대로
            재사용하는 것을 권합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-950">
            상황별 작성 요령
          </h2>
          {cases.map((c) => (
            <div
              key={c.title}
              className="rounded-lg border border-gray-200 bg-gray-50/60 p-4 sm:p-5"
            >
              <h3 className="text-base font-semibold text-gray-900">
                {c.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-7 text-gray-700">
                {c.body}
              </p>
              <p className="mt-2 text-sm leading-6 text-blue-900">
                <span className="font-semibold">Tip.</span> {c.tip}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            한 줄 주소 vs 여러 칸 주소
          </h2>
          <p>
            서류는 주소를 <strong className="font-semibold text-gray-900">한 줄</strong>로
            요구하기도 하고, 배송 양식처럼{" "}
            <strong className="font-semibold text-gray-900">여러 칸</strong>으로
            나누기도 합니다. 어느 쪽이든 내용은 같고 배치만 다릅니다. 한 줄이면
            작은 단위부터 이어 쓰고, 여러 칸이면 각 칸에 나눠 넣습니다.
          </p>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
                한 줄
              </div>
              <div className="break-words font-mono text-sm text-gray-950">
                291 Daehak-ro, Yuseong-gu, Daejeon 34141, South Korea
              </div>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
                여러 칸
              </div>
              <div className="break-words font-mono text-sm leading-6 text-gray-950">
                Street: 291 Daehak-ro
                <br />
                City: Yuseong-gu · State: Daejeon
                <br />
                ZIP: 34141 · Country: South Korea
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            이름 표기도 함께 확인하세요
          </h2>
          <p>
            서류에서는 주소만큼 이름 표기도 중요합니다. 영문 이름은{" "}
            <strong className="font-semibold text-gray-900">여권과 동일하게</strong>{" "}
            적고, 서류마다 성(Last name)·이름(First name) 순서가 어긋나지 않도록
            맞추세요. 주소·이름 모두 한 번 정한 표기를 끝까지 유지하는 것이
            핵심입니다.
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
            , 시·도 공식 영문 표기는{" "}
            <Link
              href="/guide/korea-region-names"
              className="font-semibold text-blue-700 hover:underline"
            >
              전국 시·도 영문 표기 정리표
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </section>
      </article>

      <GuideCta label="서류용 영문 주소 만들기" />
    </ContentLayout>
  );
}
