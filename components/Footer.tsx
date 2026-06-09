import Link from "next/link";

// 전역 하단 푸터. 주요 페이지로 가는 링크 + 저작권 표기.
const LINKS = [
  { href: "/about", label: "소개" },
  { href: "/guide", label: "가이드" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "문의" },
  { href: "/privacy", label: "개인정보처리방침" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 px-4 py-8 text-center text-xs leading-5 text-gray-400">
      <nav
        aria-label="푸터 메뉴"
        className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
      >
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-medium text-blue-400 underline-offset-2 hover:text-blue-300 hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <p>Copyright ⓒ 한글일본주소-영문변환기 · All rights reserved</p>
    </footer>
  );
}
