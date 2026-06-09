import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";

export const metadata: Metadata = {
  title: "사용 가이드",
  description:
    "한글·일본 주소를 영문으로 정확히 작성하는 방법과 해외직구 배송지 입력 방법을 예시와 함께 정리한 가이드 모음입니다.",
  alternates: { canonical: "/guide" },
};

const articles = [
  {
    href: "/guide/english-address",
    title: "한글 주소, 영문으로 쓰는 법",
    desc: "영문 주소의 어순, 도로명·지번 차이, 동/호수·층 표기, 실제 변환 예시까지 한 번에 정리했습니다.",
  },
  {
    href: "/guide/overseas-shopping",
    title: "해외직구 배송지에 한국·일본 주소 넣는 법",
    desc: "Address Line 1/2, City, State, ZIP 같은 해외 양식의 칸에 무엇을 넣어야 하는지 예시로 설명합니다.",
  },
];

export default function GuideIndexPage() {
  return (
    <ContentLayout
      title="사용 가이드"
      lead="영문 주소 작성이 처음이어도 따라 할 수 있도록 예시 중심으로 정리했습니다."
    >
      <div className="space-y-3">
        {articles.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="block rounded-lg border border-border bg-white p-5 shadow-card transition-colors hover:border-blue-300 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-gray-950">{a.title} →</h2>
            <p className="mt-1.5 text-[15px] leading-7 text-gray-600">{a.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/70 p-5 text-center">
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
