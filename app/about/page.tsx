import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description:
    "한글·일본 주소를 영문으로 변환해주는 무료 도구입니다. 해외직구·해외 배송·유학/이민 서류처럼 영문 주소가 필요한 상황에서 도로명·지번·일본 우편번호 주소를 Street/City/State/Postal 4개 필드로 나눠 복사할 수 있습니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentLayout
      title="서비스 소개"
      lead={`${SITE_NAME}는 한글·일본 주소를 해외 사이트 입력 양식에 맞는 영문 주소로 바꿔주는 무료 도구입니다.`}
    >
      <article className="space-y-6 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            어떤 서비스인가요?
          </h2>
          <p>
            해외 쇼핑몰이나 배송 신청서에 한국·일본 주소를 영어로 적어야 할 때,
            막상 도로명 주소를 어떻게 영어로 옮겨야 할지, 어느 칸에 무엇을 넣어야
            할지 막막한 경우가 많습니다. 이 사이트는 한글(또는 일본어) 주소를
            입력하면 공식 데이터를 바탕으로 영문 주소를 자동으로 만들어주고,{" "}
            <strong className="font-semibold text-gray-900">
              Street / City / State / Postal Code
            </strong>{" "}
            처럼 칸별로 나눠 보여줍니다. 각 칸 옆에는 복사 버튼이 있어 해외
            사이트의 입력란에 그대로 붙여넣기 편합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            이런 상황에서 쓸 수 있어요
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>해외직구 — 아마존·이베이 등에서 배송지(주소)를 영어로 입력할 때</li>
            <li>해외 배송 송장·반품 라벨에 보내는 사람/받는 사람 주소를 적을 때</li>
            <li>유학·이민·비자 등 영문 서류에 주소를 기재할 때</li>
            <li>해외 호텔·항공·각종 회원가입에서 영문 주소가 필요할 때</li>
            <li>일본 주소(우편번호 기준)를 영문으로 정리해야 할 때</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            어떻게 동작하나요?
          </h2>
          <p>
            한국 주소는{" "}
            <strong className="font-semibold text-gray-900">
              행정안전부 도로명주소 영문 API
            </strong>
            의 공식 영문 표기를 사용합니다. 일본 주소는 우편번호를 기준으로 영문
            지명을 정리해 보여줍니다. 입력 중 자동완성으로 후보를 제시하고,
            선택하면 콤마로 이어진 영문 주소를 칸별로 분리해 줍니다. 동·호수나
            번지 같은 상세주소는 영문 규칙에 맞춰 합쳐집니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            정확도와 한계
          </h2>
          <p>
            도로명·지번 주소의 표기는 공식 API 결과를 따르므로 신뢰도가 높지만,
            건물명·동·호수 등 상세주소의 영문 변환은 일반적인 규칙에 따른 보조
            결과입니다. 중요한 서류나 배송에서는 변환 결과를 한 번 더 확인해
            주세요. 잘못된 결과나 개선 아이디어가 있으면 언제든{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-700 hover:underline"
            >
              문의
            </Link>{" "}
            주시면 반영하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            요금과 개인정보
          </h2>
          <p>
            모든 기능은 무료입니다. 회원가입이나 로그인이 없으며, 입력한 주소
            검색어는 영문 변환 조회에만 쓰이고 서버에 저장하지 않습니다. 자세한
            내용은{" "}
            <Link
              href="/privacy"
              className="font-medium text-blue-700 hover:underline"
            >
              개인정보처리방침
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </section>
      </article>

      <nav className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/guide"
          className="rounded-lg border border-border bg-white p-4 shadow-field transition-colors hover:border-blue-300"
        >
          <div className="text-sm font-semibold text-gray-950">사용 가이드 →</div>
          <p className="mt-1 text-sm text-gray-600">
            영문 주소 작성법과 해외직구 입력 방법을 예시로 정리했어요.
          </p>
        </Link>
        <Link
          href="/faq"
          className="rounded-lg border border-border bg-white p-4 shadow-field transition-colors hover:border-blue-300"
        >
          <div className="text-sm font-semibold text-gray-950">
            자주 묻는 질문 →
          </div>
          <p className="mt-1 text-sm text-gray-600">
            동/호수 처리, 일본 번지, 정확도 등 궁금한 점을 모았어요.
          </p>
        </Link>
      </nav>
    </ContentLayout>
  );
}
