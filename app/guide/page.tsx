import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import { createPageMetadata } from "@/lib/metadata";
import { GUIDES, STAGES, guidesByStage } from "@/lib/guides";

export const metadata: Metadata = createPageMetadata({
  title: "사용 가이드",
  description:
    "한글·일본 주소를 영문으로 정확히 작성하는 방법과 해외직구 배송지 입력 방법을 예시와 함께 정리한 가이드 모음입니다.",
  path: "/guide",
});

// 글을 그냥 나열하지 않고 읽는 순서(1→2→3단계)로 묶는다.
// 목록만 훑어도 "원리 → 쇼핑몰 입력 → 국제우편·서류"라는 하나의 과정이 보여야
// 편수를 채우려고 쓴 글이 아니라는 게 드러난다. 순서·묶음은 lib/guides.ts가 정한다.
export default function GuideIndexPage() {
  return (
    <ContentLayout
      title="사용 가이드"
      lead="영문 주소 작성이 처음이어도 따라 할 수 있도록, 원리부터 실제 입력 화면까지 순서대로 정리했습니다."
    >
      <p className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 px-5 py-4 text-sm leading-6 text-blue-900">
        전체 {GUIDES.length}편입니다. 처음이라면 1단계부터 차례로 읽는 것을
        권합니다. 급하면 각 글 맨 위의 <strong className="font-semibold">빠른 답</strong>만
        봐도 됩니다.
      </p>

      <div className="space-y-10">
        {STAGES.map((stage) => {
          const articles = guidesByStage(stage.id);
          if (articles.length === 0) return null;

          return (
            <section key={stage.id}>
              <header className="mb-4 border-b border-border pb-3">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                  {stage.step}
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-950">
                  {stage.title}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-gray-600">
                  {stage.desc}
                </p>
              </header>

              <ol className="space-y-3">
                {articles.map((a) => (
                  <li key={a.path}>
                    <Link
                      href={a.path}
                      className="block rounded-lg border border-border bg-white p-5 shadow-card transition-colors hover:border-blue-300 sm:p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-950">
                        {a.title} →
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-7 text-gray-600">
                        {a.desc}
                      </p>
                      <p className="mt-3 break-words rounded-md bg-gray-50 px-3 py-2 font-mono text-[13px] leading-6 text-gray-600">
                        {a.example}
                      </p>
                      <p className="mt-2.5 text-xs leading-5 text-gray-500">
                        <time dateTime={a.verified.date}>{a.verified.date}</time>{" "}
                        확인
                      </p>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 text-center">
        <p className="text-sm text-blue-900">
          바로 변환해 보고 싶다면?{" "}
          <Link href="/" className="font-semibold text-blue-700 hover:underline">
            주소 변환기로 이동 →
          </Link>
        </p>
      </div>
    </ContentLayout>
  );
}
