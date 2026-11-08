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
      lead={`영문 주소 작성이 처음이어도 따라 할 수 있도록, 원리부터 실제 입력 화면까지 순서대로 정리한 ${GUIDES.length}편입니다. 처음이라면 1단계부터 차례로 읽는 것을 권합니다.`}
    >
      <article className="divide-y divide-gray-100 rounded-xl border border-border bg-white px-6 py-2 text-[15px] leading-7 text-gray-700 shadow-card sm:px-10 sm:py-4">
        {STAGES.map((stage) => {
          const articles = guidesByStage(stage.id);
          if (articles.length === 0) return null;

          return (
            <section key={stage.id} className="py-7">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                {stage.step}
              </p>
              <h2 className="mb-3 flex items-center gap-2.5 text-lg font-semibold tracking-tight text-gray-950 before:h-4 before:w-1 before:rounded-full before:bg-blue-600 before:content-['']">
                {stage.title}
              </h2>
              <p className="text-gray-600">{stage.desc}</p>

              <ol className="mt-4 space-y-2">
                {articles.map((a) => (
                  <li key={a.path}>
                    <Link
                      href={a.path}
                      className="block rounded-lg bg-gray-50 px-5 py-4 transition-colors hover:bg-blue-50"
                    >
                      <h3 className="font-semibold text-gray-950">
                        {a.title} →
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {a.desc}
                      </p>
                      <p className="mt-2 break-words font-mono text-[13px] leading-6 text-gray-500">
                        {a.example}
                      </p>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </article>

      <nav className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/"
          className="rounded-lg border border-border bg-white p-4 shadow-field transition-colors hover:border-blue-300"
        >
          <div className="text-sm font-semibold text-gray-950">주소 변환기 →</div>
          <p className="mt-1 text-sm text-gray-600">한글·일본 주소를 바로 영문으로 바꿔 보세요.</p>
        </Link>
        <Link
          href="/faq"
          className="rounded-lg border border-border bg-white p-4 shadow-field transition-colors hover:border-blue-300"
        >
          <div className="text-sm font-semibold text-gray-950">자주 묻는 질문 →</div>
          <p className="mt-1 text-sm text-gray-600">동/호수 처리, 일본 번지, 정확도 등 궁금한 점을 모았어요.</p>
        </Link>
      </nav>
    </ContentLayout>
  );
}
