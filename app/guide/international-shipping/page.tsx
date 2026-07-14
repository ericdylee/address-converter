import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "국제우편·EMS 영문 주소와 라벨 작성법",
  description:
    "우체국 EMS·국제소포 라벨의 보내는 사람(From)·받는 사람(To) 영문 주소, 세관신고서 작성, 반품 라벨까지 해외로 물건을 보낼 때 필요한 영문 주소 쓰는 법을 정리했습니다.",
  path: "/guide/international-shipping",
});

export default function InternationalShippingGuide() {
  return (
    <ContentLayout
      title="국제우편·EMS 영문 주소와 라벨 작성법"
      lead="해외 쇼핑몰 주문서가 아니라, 내가 직접 해외로 물건을 ‘보낼 때’ 필요한 영문 주소와 라벨 작성법입니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            보내는 물건에는 주소가 두 개 필요합니다
          </h2>
          <p>
            EMS·국제소포·해외 택배 라벨에는{" "}
            <strong className="font-semibold text-gray-900">
              보내는 사람(From / Sender)
            </strong>
            과{" "}
            <strong className="font-semibold text-gray-900">
              받는 사람(To / Recipient)
            </strong>{" "}
            주소를 모두 영문으로 적어야 합니다. 국내에서 부치더라도 국제 구간을
            지나므로 보내는 사람 주소(한국 주소)까지 영문으로 쓰는 것이
            원칙입니다. 반송이 필요할 때 이 주소가 쓰이기 때문입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            라벨 항목별 작성 예시
          </h2>
          <p className="mb-3">
            우체국 EMS 라벨(또는 상업용 라벨)의 보내는 사람 칸에 한국 주소를
            영문으로 적을 때 예시입니다. 한 줄로 이어 쓰는 라벨이 많으므로,
            작은 단위 → 큰 단위 순서로 한 줄로 정리해 두면 편합니다.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
                한글 주소
              </div>
              <div className="text-gray-900">
                대전광역시 유성구 대학로 291, 카이스트 (34141)
              </div>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
                라벨 영문 (한 줄)
              </div>
              <div className="break-words font-mono text-sm text-gray-950">
                291 Daehak-ro, Yuseong-gu, Daejeon 34141, South Korea
              </div>
            </div>
          </div>
          <ul className="mt-4 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="font-semibold text-gray-900">Name</strong> —
              보내는/받는 사람 이름은 영문(여권 표기)으로 적습니다.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">
                Tel / Phone
              </strong>{" "}
              — 국가번호를 포함해 적으면 좋습니다(한국 <span className="font-mono">+82</span>).
              맨 앞 0은 뺍니다: 010-1234-5678 → <span className="font-mono">+82 10-1234-5678</span>.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">
                Postal Code / Country
              </strong>{" "}
              — 우편번호와 국가명(<span className="font-mono">South Korea</span>)은
              반드시 채웁니다. 국제 구간 분류의 기준이 됩니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            세관신고서(CN22/CN23)의 주소
          </h2>
          <p>
            일정 금액 이상이거나 물품을 보낼 때는 세관신고서(CN22 또는 CN23)를
            함께 붙입니다. 여기에도 보내는 사람·받는 사람 주소를 영문으로 적고,
            내용물(품명)과 가격을 영어로 기재합니다. 주소 부분은 위 라벨과 동일한
            영문 주소를 그대로 쓰면 됩니다. 품명은 “clothes”, “documents”, “gift”
            처럼 구체적이고 간단한 영어로 적는 것이 통관에 유리합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            반품·리턴 라벨(Return Address)
          </h2>
          <p>
            해외 쇼핑몰에 반품할 때 받는 사람은 판매자 주소지만, 보내는 사람
            칸에는 내 한국 주소를 영문으로 적습니다. 반품 라벨이 이미 인쇄되어
            오는 경우가 많지만, 직접 써야 한다면 이 사이트에서 내 주소를 변환해
            보내는 사람 칸에 채우면 됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            자주 하는 실수
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              보내는 사람 주소를 한글로 적기 — 반송 시 해외 우체국이 읽지
              못합니다. 보내는 사람도 영문으로 씁니다.
            </li>
            <li>
              전화번호에 국가번호 누락 — 통관·배송 문의 때 연락이 닿지 않을 수
              있습니다.
            </li>
            <li>
              국가명 생략 — 목적지·출발지 국가는 국제우편에서 가장 먼저 보는
              항목입니다.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-950">함께 보기</h2>
          <p>
            해외 쇼핑몰 주문서의 배송지 칸 채우는 법은{" "}
            <Link
              href="/guide/overseas-shopping"
              className="font-semibold text-blue-700 hover:underline"
            >
              해외직구 배송지 넣는 법
            </Link>
            에서, 칸별 작성 원리는{" "}
            <Link
              href="/guide/english-address"
              className="font-semibold text-blue-700 hover:underline"
            >
              한글 주소 영문으로 쓰는 법
            </Link>
            에서 확인하세요.
          </p>
        </section>
      </article>

      <GuideCta label="보낼 주소를 영문으로 변환하기" />
    </ContentLayout>
  );
}
