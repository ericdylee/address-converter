import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "영문 주소 변환할 때 자주 틀리는 실수 7가지",
  description:
    "City와 State 바꿔 넣기, 주소 순서, 동/호수 표기, 우편번호 형식, 국가 누락까지 한국·일본 주소를 영문으로 쓸 때 흔히 하는 실수를 잘못된 예·올바른 예로 정리했습니다.",
  path: "/guide/common-mistakes",
});

// 잘못된 예 / 올바른 예를 나란히 보여 주는 작은 블록.
// 사이트 브랜드 색(파랑·빨강 = 에어메일)을 그대로 써서 별도 컴포넌트 없이 인라인으로 둔다.
function WrongRight({ wrong, right }: { wrong: string; right: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-red-200 bg-red-50/70 px-4 py-3">
        <div className="mb-1 text-xs font-semibold uppercase text-red-700">
          ✕ 잘못된 예
        </div>
        <div className="break-words font-mono text-sm text-gray-900">{wrong}</div>
      </div>
      <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
        <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
          ✓ 올바른 예
        </div>
        <div className="break-words font-mono text-sm text-gray-950">{right}</div>
      </div>
    </div>
  );
}

export default function CommonMistakesGuide() {
  return (
    <ContentLayout
      title="영문 주소 변환할 때 자주 틀리는 실수 7가지"
      lead="해외 배송지나 영문 서류에 한국·일본 주소를 적을 때 가장 많이 나오는 실수와 올바른 예를 모았습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <p>
          영문 주소는 한 칸만 어긋나도 배송이 지연되거나 반송될 수 있습니다.
          아래 일곱 가지만 피해도 대부분의 문제가 사라집니다. 헷갈릴 때는{" "}
          <Link href="/" className="font-semibold text-blue-700 hover:underline">
            주소 변환기
          </Link>
          로 칸별 영문 주소를 만들어 그대로 복사하는 것이 가장 안전합니다.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            1. City(시·구)와 State(시·도)를 바꿔 넣기
          </h2>
          <p>
            가장 흔한 실수입니다. 한국 주소에서 <strong className="font-semibold text-gray-900">시·도</strong>(Seoul,
            Gyeonggi-do 등)는 <strong className="font-semibold text-gray-900">State / Province</strong> 칸에,{" "}
            <strong className="font-semibold text-gray-900">구·시·군</strong>(Gangnam-gu, Suwon-si 등)은{" "}
            <strong className="font-semibold text-gray-900">City</strong> 칸에 들어갑니다.
          </p>
          <WrongRight
            wrong={"City: Seoul\nState: Gangnam-gu"}
            right={"City: Gangnam-gu\nState: Seoul"}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            2. 한글 순서 그대로(큰 단위 → 작은 단위) 적기
          </h2>
          <p>
            영문 주소는 한글과 순서가 반대입니다. 가장 작은 단위인
            도로명·건물번호가 맨 앞에 오고, 도시·시도·국가가 뒤로 갑니다.
          </p>
          <WrongRight
            wrong={"Seoul, Gangnam-gu, Teheran-ro 152"}
            right={"152 Teheran-ro, Gangnam-gu, Seoul"}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            3. 동/호수를 한글로 남기거나 빠뜨리기
          </h2>
          <p>
            “101동 502호” 같은 상세주소는 보통 하이픈으로 합쳐{" "}
            <span className="font-mono">101-502</span> 로 적습니다. 해외 양식에
            Address Line 2(또는 Apartment/Suite/Unit) 칸이 있으면 그 칸에 따로
            적어도 됩니다.
          </p>
          <WrongRight
            wrong={"152 Teheran-ro 101동 502호"}
            right={"152 Teheran-ro, 101-502"}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            4. 우편번호 형식 틀리기
          </h2>
          <p>
            한국 우편번호는 2015년부터{" "}
            <strong className="font-semibold text-gray-900">5자리</strong>입니다(옛
            6자리 “135-080” 형식은 더 이상 쓰지 않습니다). 일본 우편번호는{" "}
            <strong className="font-semibold text-gray-900">3자리-4자리</strong>{" "}
            형식이라 하이픈이 필요합니다.
          </p>
          <WrongRight
            wrong={"한국  ZIP: 135-080\n일본  ZIP: 1000005"}
            right={"한국  ZIP: 06236\n일본  ZIP: 100-0005"}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            5. 국가(Country)를 빠뜨리기
          </h2>
          <p>
            국제 배송에는 받는 나라가 반드시 필요합니다. 한국은{" "}
            <span className="font-mono">South Korea</span>, 일본은{" "}
            <span className="font-mono">Japan</span> 으로 적습니다.
          </p>
          <WrongRight
            wrong={"152 Teheran-ro, Gangnam-gu, Seoul 06236"}
            right={"152 Teheran-ro, Gangnam-gu, Seoul 06236, South Korea"}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            6. 로마자 표기를 임의로 적기
          </h2>
          <p>
            도로명·지역명은 행정안전부 공식 영문 표기를 그대로 쓰는 것이
            안전합니다. 예를 들어 “테헤란로”는{" "}
            <span className="font-mono">Teheran-ro</span> 가 공식 표기입니다.
            소리 나는 대로 임의로 적으면 배송·서류에서 다른 주소로 인식될 수
            있습니다.
          </p>
          <WrongRight
            wrong={"Tehran-ro · Teheranro · Teheran Ro"}
            right={"Teheran-ro"}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            7. 도로명 주소와 지번 주소를 섞어 쓰기
          </h2>
          <p>
            도로명 주소(테헤란로 152)와 옛 지번 주소(역삼동 737)는 하나만
            골라서 일관되게 써야 합니다. 둘을 섞으면 같은 곳을 가리켜도 시스템이
            다른 주소로 봅니다. 국제적으로는 도로명 주소가 더 표준적입니다.
          </p>
          <WrongRight
            wrong={"152 Teheran-ro, Yeoksam-dong 737"}
            right={"152 Teheran-ro (도로명 하나로 통일)"}
          />
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-950">
            더 자세한 작성법
          </h2>
          <p>
            칸별 작성 원리는{" "}
            <Link
              href="/guide/english-address"
              className="font-semibold text-blue-700 hover:underline"
            >
              한글 주소 영문으로 쓰는 법
            </Link>
            , 해외 쇼핑몰 주문서 입력은{" "}
            <Link
              href="/guide/overseas-shopping"
              className="font-semibold text-blue-700 hover:underline"
            >
              해외직구 배송지 넣는 법
            </Link>
            , 일본 주소는{" "}
            <Link
              href="/guide/japan-address"
              className="font-semibold text-blue-700 hover:underline"
            >
              일본 주소 영문으로 쓰는 법
            </Link>
            에서 예시와 함께 확인할 수 있습니다.
          </p>
        </section>
      </article>

      <GuideCta />
    </ContentLayout>
  );
}
