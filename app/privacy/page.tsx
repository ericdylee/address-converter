import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 한글 → 영문 주소 변환기",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <Link href="/" className="text-sm font-medium text-blue-700 hover:text-blue-800">
            ← 홈으로
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-950">개인정보처리방침</h1>
          <p className="mt-2 text-xs text-gray-500">시행일 · 최종 수정일: 2026-06-04</p>
        </header>

        <div className="space-y-6 rounded-lg border border-border bg-white p-6 text-sm leading-7 text-gray-700 shadow-card">
          <p>
            본 방침은 ‘한글 → 영문 주소 변환기’(이하 ‘서비스’)가 이용자의 개인정보를 어떻게
            처리하는지 설명합니다.
          </p>

          <section>
            <h2 className="mb-2 font-semibold text-gray-950">1. 수집하는 개인정보</h2>
            <p>
              서비스는 회원가입이나 로그인 기능이 없으며, 이름·연락처 등 이용자의 개인정보를 직접
              수집하거나 저장하지 않습니다. 이용자가 입력한 주소 검색어는 영문 변환을 위해
              행정안전부 도로명주소 영문 API 조회에만 사용되며, 서버에 저장하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-gray-950">2. 쿠키 및 광고</h2>
            <p>
              본 서비스는 Google AdSense를 통해 광고를 게재할 수 있습니다. Google을 포함한 제3자
              광고 사업자는 쿠키 및 광고 식별자를 사용하여 이용자의 관심사에 기반한 맞춤형 광고를
              제공할 수 있습니다.
            </p>
            <p className="mt-2">
              이용자는{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-700 hover:underline"
              >
                Google 광고 설정
              </a>
              에서 맞춤형 광고를 비활성화하거나,{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-700 hover:underline"
              >
                aboutads.info
              </a>
              에서 제3자 쿠키 사용을 거부할 수 있습니다. 자세한 내용은 Google 개인정보처리방침을
              참고하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-gray-950">3. 외부 링크</h2>
            <p>
              본 서비스는 외부 사이트로 연결되는 링크를 포함할 수 있으며, 외부 사이트의 개인정보
              처리에 대해서는 책임지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-gray-950">4. 방침 변경</h2>
            <p>본 개인정보처리방침이 변경되는 경우 변경 내용을 본 페이지에 게시합니다.</p>
          </section>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-medium text-blue-700 hover:text-blue-800">
            ← 홈으로
          </Link>
        </div>
      </div>
    </main>
  );
}
