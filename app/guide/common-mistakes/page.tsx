import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import { createPageMetadata } from "@/lib/metadata";
import { guideJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "영문 주소 변환할 때 자주 틀리는 실수 7가지",
  description:
    "City와 State 바꿔 넣기, 주소 순서, 동/호수 표기, 우편번호 형식, 국가 누락까지 한국·일본 주소를 영문으로 쓸 때 흔히 하는 실수를 잘못된 예·올바른 예로 정리했습니다.",
  path: "/guide/common-mistakes",
});

// 잘못된 예 / 올바른 예를 나란히 보여 주는 작은 블록.
// 사이트 브랜드 색(파랑·빨강 = 에어메일)을 그대로 써서 별도 컴포넌트 없이 인라인으로 둔다.
// why: "이걸 틀리면 실제로 무슨 일이 생기는지"를 한 줄로 덧붙인다(선택).
function WrongRight({
  wrong,
  right,
  why,
}: {
  wrong: string;
  right: string;
  why?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-red-200 bg-red-50/70 px-4 py-3">
          <div className="mb-1 text-xs font-semibold uppercase text-red-700">
            ✕ 잘못된 예
          </div>
          <div className="break-words font-mono text-sm text-gray-900">
            {wrong}
          </div>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
          <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
            ✓ 올바른 예
          </div>
          <div className="break-words font-mono text-sm text-gray-950">
            {right}
          </div>
        </div>
      </div>
      {why && (
        <p className="px-1 text-sm text-gray-500">
          <span className="font-semibold text-gray-600">왜 문제?</span> {why}
        </p>
      )}
    </div>
  );
}

export default function CommonMistakesGuide() {
  return (
    <ContentLayout
      title="영문 주소 변환할 때 자주 틀리는 실수 7가지"
      lead="해외 배송지나 영문 서류에 한국·일본 주소를 적을 때 가장 많이 나오는 실수와 올바른 예를 모았습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
      jsonLd={guideJsonLd({
        title: "영문 주소 변환할 때 자주 틀리는 실수 7가지",
        path: "/guide/common-mistakes",
        dateModified: "2026-08-24",
      })}
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
            wrong={"City: Daegu\nState: Jung-gu"}
            right={"City: Jung-gu\nState: Daegu"}
            why="배송 시스템이 지역을 잘못 분류해 배송이 지연되거나, 영문 서류에서는 주소 불일치로 반려될 수 있습니다."
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
            wrong={"Daegu, Jung-gu, Gongpyeong-ro 88"}
            right={"88 Gongpyeong-ro, Jung-gu, Daegu"}
            why="해외 배송 시스템은 앞에서부터 도로·도시를 읽으므로, 순서가 뒤집히면 주소를 인식하지 못해 반송될 수 있습니다."
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
            wrong={"88 Gongpyeong-ro 101동 502호"}
            right={"88 Gongpyeong-ro, 101-502"}
            why="한글이 남아 있으면 현지 배송원이 못 읽고, 동/호수가 없으면 건물까지 와도 세대를 못 찾아 배달이 실패합니다."
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
            why="우편번호 자동 분류기가 형식을 못 읽으면 수작업으로 넘어가 배송이 늦어지고, 옛 번호는 아예 매칭이 안 됩니다."
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
            wrong={"88 Gongpyeong-ro, Jung-gu, Daegu 41911"}
            right={"88 Gongpyeong-ro, Jung-gu, Daegu 41911, South Korea"}
            why="국가가 없으면 발송국 내부 주소로 처리되어 국제 구간으로 넘어가지 못하거나 통관에서 막힐 수 있습니다."
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            6. 로마자 표기를 임의로 적기
          </h2>
          <p>
            도로명·지역명은 행정안전부 공식 영문 표기를 그대로 쓰는 것이
            안전합니다. 예를 들어 “공평로”는{" "}
            <span className="font-mono">Gongpyeong-ro</span> 가 공식 표기입니다.
            소리 나는 대로 임의로 적으면 배송·서류에서 다른 주소로 인식될 수
            있습니다.
          </p>
          <WrongRight
            wrong={"Gongpyung-ro · Gongpyeongro · Gongpyeong Ro"}
            right={"Gongpyeong-ro"}
            why="철자가 공식 표기와 다르면 검증 시스템이 다른 주소로 보아, 서류 심사나 배송 조회에서 불일치 처리될 수 있습니다."
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
            why="두 주소 체계가 섞이면 배송 시스템이 중복·모순 주소로 인식해 배송이 지연되거나 되돌아올 수 있습니다."
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">
            보내기 전 최종 체크리스트
          </h2>
          <p>주소를 붙여넣기 전에 아래 8가지를 눈으로 한 번 확인하세요.</p>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
            <ul className="space-y-1.5 text-sm leading-6 text-gray-800">
              <li>☐ 순서를 뒤집었나? (도로명·번지 → 도시 → 시도 → 국가)</li>
              <li>☐ City = 구·시, State = 시·도로 넣었나?</li>
              <li>☐ 동/호수를 101-502처럼 하이픈으로 적었나?</li>
              <li>☐ 우편번호 형식이 맞나? (한국 5자리 / 일본 3-4자리)</li>
              <li>☐ 국가(South Korea 또는 Japan)를 넣었나?</li>
              <li>☐ 로마자는 공식 표기(변환기 결과) 그대로인가?</li>
              <li>☐ 도로명·지번을 하나로 통일했나?</li>
              <li>☐ 받는 사람 이름·전화번호는 주소와 별도 칸에 넣었나?</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-950">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                City 칸 하나만 있고 State 칸이 없어요.
              </h3>
              <p className="mt-1">
                그럴 때는 큰 도시 이름(예: Seoul, Busan)을 City에 넣으면 됩니다.
                구·군까지 넣을 공간이 있으면 “Gangnam-gu, Seoul”처럼 함께
                적어도 좋습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                영문 주소는 대문자로 다 써야 하나요?
              </h3>
              <p className="mt-1">
                꼭 그렇진 않습니다. 각 단어의 첫 글자만 대문자로 쓰는 것이
                일반적입니다(예: Teheran-ro). 전부 대문자로 써도 배송에는 문제가
                없습니다.
              </p>
            </div>
          </div>
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
            , 전국 시·도의 정확한 영문 표기는{" "}
            <Link
              href="/guide/korea-region-names"
              className="font-semibold text-blue-700 hover:underline"
            >
              전국 시·도 영문 표기 정리표
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
