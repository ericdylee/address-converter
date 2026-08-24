import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "사용 가이드",
  description:
    "한글·일본 주소를 영문으로 정확히 작성하는 방법과 해외직구 배송지 입력 방법을 예시와 함께 정리한 가이드 모음입니다.",
  path: "/guide",
});

const articles = [
  {
    href: "/guide/amazon-address",
    title: "아마존 한국 주소 입력법 (실제 화면)",
    desc: "아마존의 실제 주소 입력 화면을 캡처해 칸별로 짚었습니다. City·Province를 헷갈리게 만드는 원인과 결제 단계의 개인통관고유부호까지 다룹니다.",
    example: "City → Michuhol-gu · Province → Incheon",
  },
  {
    href: "/guide/english-address",
    title: "한글 주소, 영문으로 쓰는 법",
    desc: "영문 주소의 어순, 도로명·지번 차이, 동/호수·층 표기, 실제 변환 예시까지 한 번에 정리했습니다.",
    example: "서울특별시 강남구 테헤란로 152 → 152 Teheran-ro, Gangnam-gu, Seoul",
  },
  {
    href: "/guide/apartment-unit",
    title: "아파트 동·호수, 건물명 영문 표기 정리",
    desc: "‘101동 502호’, ‘3층’, 오피스텔·빌라 건물명처럼 영문으로 옮기기 까다로운 상세주소를 규칙과 예시로 정리했습니다.",
    example: "101동 502호 → 101-502 · 3층 → 3F",
  },
  {
    href: "/guide/overseas-shopping",
    title: "해외직구 배송지에 한국·일본 주소 넣는 법",
    desc: "Address Line 1/2, City, State, ZIP 같은 해외 양식의 칸에 무엇을 넣어야 하는지 예시로 설명합니다.",
    example: "Address Line 1 → 152 Teheran-ro · City → Gangnam-gu · ZIP → 06236",
  },
  {
    href: "/guide/international-shipping",
    title: "국제우편·EMS 영문 주소와 라벨 작성법",
    desc: "우체국 EMS·국제소포 라벨의 보내는 사람/받는 사람 영문 주소, 세관신고서(CN22/CN23), 반품 라벨 작성법을 정리했습니다.",
    example: "From/To 주소 · CN22 세관신고서 · 전화 +82 표기",
  },
  {
    href: "/guide/japan-address",
    title: "일본 주소, 영문으로 쓰는 법",
    desc: "도도부현·시구정촌 구분, 丁目·番地·号의 하이픈 표기, 우편번호 형식까지 일본 주소 로마자 표기 규칙을 정리했습니다.",
    example: "東京都千代田区丸の内1-1-1 → 1-1-1 Marunouchi, Chiyoda-ku, Tokyo",
  },
  {
    href: "/guide/common-mistakes",
    title: "영문 주소 변환할 때 자주 틀리는 실수 7가지",
    desc: "City·State 자리 바꾸기, 동/호수 표기, 우편번호 형식, 국가 누락 등 흔한 실수를 잘못된 예·올바른 예로 비교합니다.",
    example: "City: Seoul / State: Gangnam-gu ✕ → City: Gangnam-gu / State: Seoul ✓",
  },
  {
    href: "/guide/korea-region-names",
    title: "전국 시·도 영문 표기 정리표",
    desc: "서울·부산·경기도 등 전국 17개 시·도의 공식 영문 표기와 City·State 칸에 넣는 법, 우편번호 형식을 정리했습니다.",
    example: "경기도 → Gyeonggi-do · 제주특별자치도 → Jeju-do",
  },
  {
    href: "/guide/english-documents",
    title: "영문 주소가 필요한 서류 총정리 (비자·유학·해외 계좌)",
    desc: "비자·유학 원서, 해외 은행 계좌·송금, 영문 재직·재학 증명서처럼 주소를 영어로 적어야 하는 서류별 요령과 표기 일관성 팁을 정리했습니다.",
    example: "Permanent address = 한국 집 주소 · 모든 서류에 표기 통일",
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
            <p className="mt-3 break-words rounded-md bg-gray-50 px-3 py-2 font-mono text-[13px] leading-6 text-gray-600">
              {a.example}
            </p>
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
