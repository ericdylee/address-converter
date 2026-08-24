import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import { AUTHOR_NAME, AUTHOR_NAME_EN, SITE_NAME } from "@/lib/site";

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
            공식 주소 사이트와 무엇이 다른가요?
          </h2>
          <p>
            정부의 도로명주소 사이트에서도 영문 주소를 볼 수 있지만, 보통 한 줄로
            이어진 형태로만 제공됩니다. 해외 사이트나 서류는 대부분 Street, City,
            State, Postal Code처럼 <strong className="font-semibold text-gray-900">칸이 나뉘어</strong>{" "}
            있어서, 한 줄 주소를 매번 잘라 붙여야 하는 번거로움이 있습니다. 이
            도구는 그 과정을 대신합니다.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              영문 주소를 <strong className="font-semibold text-gray-900">칸별로 분리</strong>하고
              칸마다 개별 복사 버튼을 제공
            </li>
            <li>
              “101동 502호”, “3층” 같은{" "}
              <strong className="font-semibold text-gray-900">상세주소를 영문 규칙으로 자동 변환</strong>
            </li>
            <li>한국 주소와 일본 주소를 한 곳에서 처리</li>
            <li>
              해외 양식의 칸 이름(Address Line 1/2, City, State, ZIP)에 무엇을
              넣을지까지 안내
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            어떻게 동작하나요?
          </h2>
          <p>
            입력 중 자동완성으로 후보를 제시하고, 선택하면 콤마로 이어진 영문
            주소를 칸별로 분리해 줍니다. 동·호수나 번지 같은 상세주소는 영문
            규칙에 맞춰 자동으로 합쳐집니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            데이터 출처와 표기 기준
          </h2>
          <p>정확도의 근거가 되는 데이터 출처는 다음과 같습니다.</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-gray-900">한국 주소</strong> —
              행정안전부 도로명주소 영문 변환 API(
              <a
                href="https://business.juso.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-700 hover:underline"
              >
                business.juso.go.kr
              </a>
              )의 공식 영문 표기를 그대로 사용합니다.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">일본 주소</strong> —
              일본우편(Japan Post)의 우편번호별 공식 로마자 데이터를 기준으로
              지명을 정리합니다.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">상세주소(동·호·층)</strong>{" "}
              — 우편 관례에 따라 동은 하이픈으로, 호는 숫자만, 층은 F로 표기하는
              규칙을 적용합니다(예: 101동 502호 → 101-502, 3층 → 3F). 자세한
              규칙은{" "}
              <Link
                href="/guide/apartment-unit"
                className="font-medium text-blue-700 hover:underline"
              >
                동·호수 영문 표기 정리
              </Link>
              에서 볼 수 있습니다.
            </li>
          </ul>
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

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            누가 만들고 관리하나요
          </h2>
          <p>
            이 사이트는{" "}
            <strong className="font-semibold text-gray-900">
              {AUTHOR_NAME} ({AUTHOR_NAME_EN})
            </strong>
            이 혼자 만들고 관리하는 개인 서비스입니다. 해외 사이트에 주소를 넣을 때마다
            어느 칸에 무엇을 써야 하는지 매번 찾아보던 불편에서 시작했습니다.
          </p>
          <p className="mt-3">
            글은 다음 기준으로 씁니다.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              주소·우편번호·행정구역 표기는{" "}
              <strong className="font-semibold text-gray-900">
                행정안전부 영문주소 API로 직접 조회해 확인
              </strong>
              한 값만 씁니다. 기억이나 짐작으로 적지 않습니다.
            </li>
            <li>
              쇼핑몰 입력 화면을 다루는 글은{" "}
              <strong className="font-semibold text-gray-900">실제로 그 화면을 열어 캡처</strong>
              하고, 캡처에서 읽히는 내용만 적습니다. 글 아래에 확인한 날짜를 남깁니다.
            </li>
            <li>
              행정구역이 바뀌거나(예: 2026년 7월 전남광주통합특별시 출범) 사이트 화면이
              바뀌면 해당 글을 고치고 수정일을 갱신합니다.
            </li>
          </ul>
          <p className="mt-3">
            잘못된 내용을 발견하시면 알려주세요. 확인 후 고치고, 무엇을 고쳤는지
            해당 글에 남깁니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            운영 안내
          </h2>
          <p>
            모든 기능은 무료이며 광고로 운영비를 충당합니다. 공식 데이터가 갱신되거나
            표기 규칙에 개선이 필요하면 반영하고 있으며, 잘못된 결과 제보나 기능 제안은{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-700 hover:underline"
            >
              문의
            </Link>{" "}
            페이지로 받고 있습니다. 보내주신 의견은 서비스 개선에 직접
            활용됩니다.
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
