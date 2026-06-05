import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200/80 px-4 py-8 text-center text-xs leading-5 text-gray-500">
      <p className="text-gray-400">
        데이터: 행정안전부 도로명주소 영문 API · 일본우편(Japan Post) 로마자 우편번호
      </p>
      <p className="mt-3">copyrightⓒ한글일본주소-영문변환기</p>
      <p>all right reserve</p>
      <p>
        <Link
          href="/privacy"
          className="mt-2 inline-block font-medium text-blue-700 underline-offset-2 hover:text-blue-800 hover:underline"
        >
          개인정보처리방침
        </Link>
      </p>
    </footer>
  );
}
