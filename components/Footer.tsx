import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 px-4 text-center text-xs text-gray-400 space-y-1">
      <p>데이터: 행정안전부 도로명주소 영문 API · 일본우편(Japan Post) 로마자 우편번호</p>
      <p>© {year} 한글 → 영문 주소 변환기</p>
      <p>
        <Link
          href="/privacy"
          className="hover:text-gray-600 underline-offset-2 hover:underline"
        >
          개인정보처리방침
        </Link>
      </p>
    </footer>
  );
}
