import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description:
    "한글·일본 주소 영문 변환기 사용 중 자주 묻는 질문 모음 — 정확도, 동/호수 입력, 도로명·지번 선택, 일본 번지, City와 State 구분, 복사 문제, 개인정보 저장 여부 등.",
  alternates: { canonical: "/faq" },
};

// 질문/답변을 한곳에 정의해 화면 표시와 구조화 데이터(JSON-LD)에 함께 사용한다.
// 답변은 구조화 데이터에도 그대로 들어가므로 순수 텍스트로 작성한다.
const faqs: { q: string; a: string }[] = [
  {
    q: "이 서비스는 무료인가요?",
    a: "네, 모든 변환과 복사 기능은 무료입니다. 회원가입이나 로그인도 필요 없습니다.",
  },
  {
    q: "변환 결과가 정확한가요?",
    a: "한국 도로명·지번 주소의 영문 표기는 행정안전부 공식 영문주소 API 결과를 사용하므로 신뢰도가 높습니다. 다만 건물명·동·호수 같은 상세주소의 영문 변환은 일반적인 규칙에 따른 보조 결과이므로, 중요한 서류나 배송에서는 한 번 더 확인하는 것을 권장합니다.",
  },
  {
    q: "아파트 동/호수는 어떻게 입력하나요?",
    a: "검색 후 결과 화면에서 상세주소(예: 101동 502호)를 입력하면 영문 규칙에 맞춰 자동으로 합쳐집니다. 보통 동은 하이픈(-)으로, 호는 숫자만 남겨 '101-502' 형태로 Street 칸에 포함됩니다. 해외 양식에 Address Line 2(또는 Apartment/Suite) 칸이 따로 있으면 동/호 부분만 그 칸으로 옮겨 적어도 됩니다.",
  },
  {
    q: "도로명 주소와 지번 주소 중 무엇을 넣어야 하나요?",
    a: "둘 다 검색됩니다. 다만 도로명 주소가 국제적으로 더 표준적이고 배송에도 유리하므로 가능하면 도로명 주소 사용을 권장합니다.",
  },
  {
    q: "일본 주소는 어떻게 변환되나요?",
    a: "일본 탭에서 우편번호로 동네(town)·시·구·도도부현을 찾은 뒤, 번지(예: 1-1-1)를 직접 입력하면 됩니다. 일본 영문 주소는 작은 단위에서 큰 단위 순서(번지 → 동네 → 시·구 → 도도부현)로 표기되며, 결과 화면에서 칸별로 정리해 보여줍니다.",
  },
  {
    q: "City 칸과 State 칸이 헷갈려요.",
    a: "한국 주소에서는 보통 시·도(예: Seoul)를 State/Province에, 구·시·군(예: Gangnam-gu)을 City에 넣습니다. 만약 양식에 City 칸만 있고 State 칸이 없으면 큰 도시 이름(예: Seoul)을 City에 넣으면 됩니다. 일본은 도도부현(예: Tokyo)을 State/Prefecture에, 시·구(예: Chiyoda-ku)를 City에 넣습니다.",
  },
  {
    q: "복사 버튼이 동작하지 않아요.",
    a: "대부분의 최신 브라우저에서 작동하지만, 일부 환경에서는 클립보드 접근이 제한될 수 있습니다. 이 경우 해당 칸의 텍스트를 직접 길게 눌러(또는 드래그해) 복사해 주세요. 주소창이 http가 아닌 https인지도 확인하면 좋습니다.",
  },
  {
    q: "입력한 주소가 저장되나요?",
    a: "아니요. 입력한 검색어는 영문 변환을 위한 조회에만 사용되며 서버에 저장하지 않습니다. 이름·연락처 같은 개인정보도 수집하지 않습니다.",
  },
  {
    q: "검색해도 주소가 안 나와요.",
    a: "도로명(예: 테헤란로 152) 또는 건물명, 또는 지번(동/번지)으로 다시 검색해 보세요. 너무 짧은 키워드보다 도로명+건물번호처럼 조금 더 구체적으로 입력하면 후보가 잘 나옵니다. 그래도 안 나오면 띄어쓰기를 바꾸거나 일부만 입력해 보세요.",
  },
  {
    q: "어느 칸에 무엇을 넣어야 할지 모르겠어요.",
    a: "변환 결과 화면 아래의 '입력 가이드'에서 해외 양식의 칸 이름(Address Line 1, City, State, ZIP 등)과 우리 앱 필드의 대응 관계를 예시와 함께 안내합니다. 가이드 메뉴의 글에서도 자세한 작성법을 확인할 수 있습니다.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <ContentLayout
      title="자주 묻는 질문"
      lead="서비스를 쓰면서 자주 궁금해하는 내용을 모았습니다."
    >
      {/* 구글이 FAQ를 인식하도록 구조화 데이터(JSON-LD)를 함께 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-3">
        {faqs.map(({ q, a }) => (
          <section
            key={q}
            className="rounded-lg border border-border bg-white p-5 shadow-field sm:p-6"
          >
            <h2 className="text-base font-semibold text-gray-950">{q}</h2>
            <p className="mt-2 text-[15px] leading-7 text-gray-700">{a}</p>
          </section>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        원하는 답이 없다면{" "}
        <Link
          href="/contact"
          className="font-medium text-blue-700 hover:underline"
        >
          문의
        </Link>{" "}
        주세요.
      </p>
    </ContentLayout>
  );
}
