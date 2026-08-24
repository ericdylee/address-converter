import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "쇼핑몰별 주소 입력법",
  description:
    "아마존 등 해외 쇼핑몰의 실제 주소 입력 화면을 보면서 City·Province·ZIP 칸에 무엇을 넣는지 사이트별로 정리했습니다. 사이트마다 칸 이름과 순서가 다릅니다.",
  path: "/shops",
});

// 실제 화면을 확인해 글로 쓴 사이트만 목록에 올린다.
// 확인하지 않은 사이트를 추측으로 채우면 이 섹션의 존재 이유가 없어진다.
const shops: {
  href: string;
  name: string;
  desc: string;
  point: string;
}[] = [
  {
    href: "/shops/amazon",
    name: "아마존 (Amazon)",
    desc: "Province 칸이 따로 있고, 우편번호가 도시보다 위에 있습니다. 결제 단계에서 개인통관고유부호를 요구합니다.",
    point: "City = 구 · Province = 시·도",
  },
];

export default function ShopsIndexPage() {
  return (
    <ContentLayout
      title="쇼핑몰별 주소 입력법"
      lead="해외 쇼핑몰마다 주소 칸의 이름도, 순서도, 요구하는 정보도 다릅니다. 실제 입력 화면을 보면서 칸별로 짚어드립니다."
      jsonLd={breadcrumbSchema([
        { name: "홈", path: "/" },
        { name: "쇼핑몰별 입력법", path: "/shops" },
      ])}
    >
      <section className="rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-950">
          어느 사이트든 통하는 세 가지
        </h2>
        <p className="mb-4">
          칸 이름은 사이트마다 다르지만, 한국 주소를 나눠 넣는 원리는 같습니다. 이
          세 가지만 기억하면 처음 보는 양식도 대부분 채울 수 있습니다.
        </p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <span className="font-semibold text-gray-900">작은 단위가 먼저.</span> 영문
            주소는 도로명 → 구 → 시·도 순으로 좁은 곳에서 넓은 곳으로 갑니다. 한글
            주소와 정반대입니다.
          </li>
          <li>
            <span className="font-semibold text-gray-900">
              City에는 구·시·군, State/Province에는 시·도.
            </span>{" "}
            칸 이름이 State든 Province든 Region이든, 그 자리에는 서울·인천·경기도 같은
            시·도가 들어갑니다.
          </li>
          <li>
            <span className="font-semibold text-gray-900">
              전화번호는 +82 뒤에 앞자리 0을 뺀다.
            </span>{" "}
            010-1234-5678은 10 1234 5678이 됩니다.
          </li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          원리를 더 자세히 보려면{" "}
          <Link
            href="/guide/english-address"
            className="font-medium text-blue-700 hover:underline"
          >
            한글 주소, 영문으로 쓰는 법
          </Link>
          을 참고하세요.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-1 text-lg font-semibold text-gray-950">
          사이트별 실제 화면
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          직접 들어가 확인한 화면만 올립니다.
        </p>
        <div className="space-y-3">
          {shops.map((shop) => (
            <Link
              key={shop.href}
              href={shop.href}
              className="block rounded-lg border border-border bg-white p-5 shadow-field transition-colors hover:border-blue-300"
            >
              <p className="font-semibold text-gray-950">
                {shop.name}{" "}
                <span aria-hidden="true" className="text-blue-600">
                  →
                </span>
              </p>
              <p className="mt-1.5 text-sm leading-6 text-gray-600">{shop.desc}</p>
              <p className="mt-2 inline-block rounded bg-blue-50 px-2 py-1 font-mono text-xs text-blue-800">
                {shop.point}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-dashed border-gray-300 bg-gray-50/60 p-5">
        <h2 className="text-base font-semibold text-gray-900">준비 중</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          아이허브(iHerb)와 알리익스프레스 편을 실제 화면을 확인해 가며 쓰고 있습니다.
          먼저 다뤄줬으면 하는 사이트가 있으면{" "}
          <Link href="/contact" className="font-medium text-blue-700 hover:underline">
            문의
          </Link>
          로 알려주세요.
        </p>
      </section>

      <p className="mt-8 text-center text-sm leading-7 text-gray-600">
        바로 변환해 보고 싶다면{" "}
        <Link href="/" className="font-semibold text-blue-700 hover:underline">
          주소 변환기로 이동 →
        </Link>
      </p>
    </ContentLayout>
  );
}
