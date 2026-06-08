import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 px-4 py-8 text-center text-xs leading-5 text-gray-400">
      <p>Copyright ⓒ 한글일본주소-영문변환기 · All rights reserved</p>
      <p>
        <Link
          href="/privacy"
          className="mt-2 inline-block font-medium text-blue-400 underline-offset-2 hover:text-blue-300 hover:underline"
        >
          개인정보처리방침
        </Link>
      </p>
    </footer>
  );
}
