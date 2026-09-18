import Link from "next/link";
import { nextGuides, type Guide } from "@/lib/guides";

// 글 끝의 "이어서 읽기".
//
// 한 편만 보고 나가지 않게 하는 장치이면서, 글들이 흩어진 낱개가 아니라 하나의
// 주제로 이어져 있다는 신호이기도 하다. 링크는 lib/guides.ts 카탈로그에서 오므로
// 글이 늘거나 경로가 바뀌어도 끊어진 링크가 남지 않는다.
type Props = {
  guide: Guide;
};

export default function GuideNext({ guide }: Props) {
  const items = nextGuides(guide);
  if (items.length === 0) return null;

  return (
    <nav aria-labelledby="guide-next-heading" className="mt-6">
      <h2
        id="guide-next-heading"
        className="mb-3 text-base font-semibold text-gray-950"
      >
        이어서 읽기
      </h2>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="block rounded-lg border border-border bg-white p-4 shadow-field transition-colors hover:border-blue-300"
            >
              <span className="text-sm font-semibold text-gray-950">
                {item.title} →
              </span>
              <span className="mt-1 block text-sm leading-6 text-gray-600">
                {item.desc}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
