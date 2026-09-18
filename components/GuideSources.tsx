import type { Guide } from "@/lib/guides";

// 글 끝의 "참고한 공식 자료".
//
// 남의 글을 옮긴 것이 아니라 공식 자료를 직접 보고 쓴 글이라는 근거를 화면에 남긴다.
// 각 링크 옆에 "이 자료에서 무엇을 확인했는지"를 적는 것이 핵심 — 링크만 나열하면
// 실제로 봤는지 알 수 없다.
type Props = {
  guide: Guide;
};

export default function GuideSources({ guide }: Props) {
  if (guide.sources.length === 0) return null;

  return (
    <section className="border-t border-gray-100 pt-6">
      <h2 className="mb-1 text-base font-semibold text-gray-950">
        참고한 공식 자료
      </h2>
      <p className="mb-3 text-sm leading-6 text-gray-500">
        이 글의 표기와 절차는 아래 공식 자료에서 직접 확인했습니다.
      </p>
      <ul className="space-y-2.5">
        {guide.sources.map((source) => (
          <li key={source.url} className="text-sm leading-6">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-700 underline-offset-2 hover:underline"
            >
              {source.label}
            </a>
            <span className="ml-1 text-gray-400" aria-hidden="true">
              ↗
            </span>
            <span className="block text-gray-600">{source.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
