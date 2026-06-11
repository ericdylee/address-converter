import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

// App Router 규약: app/not-found.tsx 가 404 화면을 담당한다.
// 레이아웃(헤더/푸터)은 layout.tsx 가 그대로 감싸준다.
export default function NotFound() {
  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase text-gray-400">404</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-gray-600">
          주소가 바뀌었거나 잘못 입력된 링크일 수 있어요. 아래에서 원하는
          페이지로 이동해 주세요.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            주소 변환기로 이동
          </Link>
          <Link
            href="/guide"
            className="rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-field transition-colors hover:border-blue-300"
          >
            사용 가이드 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
