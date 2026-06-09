import Link from "next/link";
import type { ReactNode } from "react";

// 글 형태의 정적 페이지(소개·가이드·FAQ·문의·개인정보)가 공통으로 쓰는 바깥 틀.
// 상단 뒤로가기 링크 + 제목 + 안내문(lead) + 본문(children) 구조를 한곳에 모아
// 모든 콘텐츠 페이지의 여백·정렬·색을 동일하게 유지한다.
type Props = {
  title: string;
  /** 제목 아래 한두 문장 요약(선택) */
  lead?: ReactNode;
  /** 상단 뒤로가기 링크. 기본은 "← 홈으로". */
  backLink?: { label: string; href: string };
  children: ReactNode;
};

export default function ContentLayout({ title, lead, backLink, children }: Props) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <Link
            href={backLink?.href ?? "/"}
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            ← {backLink?.label ?? "홈으로"}
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-950">
            {title}
          </h1>
          {lead && (
            <p className="mt-3 text-base leading-7 text-gray-600">{lead}</p>
          )}
        </header>

        {children}
      </div>
    </main>
  );
}
