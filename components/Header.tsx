import Link from "next/link";

// 전역 상단 헤더. 배경은 푸터와 동일한 다크 톤(bg-gray-900).
// 로고(홈 링크) + 주요 메뉴를 둔다. 메뉴는 자바스크립트 없이 동작하며,
// 화면이 좁으면 가로로 스크롤된다.
const NAV = [
  { href: "/about", label: "소개" },
  { href: "/guide", label: "가이드" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "문의" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 shadow-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4">
        <Link
          href="/"
          aria-label="Address-Converter 홈"
          className="flex shrink-0 items-center gap-1.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 sm:gap-2.5"
        >
          {/* 파비콘과 동일한 위치 핀 마크 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="15" fill="#2563eb" />
            <path
              d="M32 13c-9.94 0-18 8.06-18 18 0 13.5 18 23 18 23s18-9.5 18-23c0-9.94-8.06-18-18-18Z"
              fill="#ffffff"
            />
            <circle cx="32" cy="31" r="7" fill="#2563eb" />
          </svg>
          <span className="text-[13px] font-bold tracking-tight sm:text-lg">
            <span className="text-white">Address</span>
            <span className="text-blue-400">-Converter</span>
          </span>
        </Link>

        <nav
          aria-label="주요 메뉴"
          className="scrollbar-none flex items-center overflow-x-auto text-[13px] font-medium sm:gap-0.5 sm:text-sm"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-1.5 py-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white sm:px-2.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
