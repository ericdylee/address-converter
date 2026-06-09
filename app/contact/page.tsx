import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의",
  description:
    "변환 결과 오류 제보, 기능 제안, 광고/제휴 등 문의를 받습니다. 이메일로 연락 주세요.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ContentLayout
      title="문의"
      lead="변환 결과 오류 제보, 기능 제안, 기타 문의를 환영합니다."
    >
      <div className="space-y-6 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            이메일로 문의하기
          </h2>
          <p className="mb-3">
            아래 이메일로 연락 주시면 확인 후 답변드리겠습니다. 변환이 잘못된
            경우, 입력한 한글 주소와 기대했던 영문 표기를 함께 적어 주시면 더 빨리
            처리할 수 있습니다.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            ✉️ {CONTACT_EMAIL}
          </a>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            이런 내용을 보내주세요
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>변환 결과가 이상하거나 틀린 경우 (입력 주소 + 올바른 표기)</li>
            <li>추가되면 좋을 기능이나 개선 아이디어</li>
            <li>광고·제휴 등 비즈니스 문의</li>
          </ul>
        </section>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        먼저{" "}
        <Link href="/faq" className="font-medium text-blue-700 hover:underline">
          자주 묻는 질문
        </Link>
        을 확인하시면 빠르게 답을 찾을 수도 있어요.
      </p>
    </ContentLayout>
  );
}
