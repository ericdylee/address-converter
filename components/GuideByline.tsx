import { AUTHOR_NAME } from "@/lib/site";
import type { Guide } from "@/lib/guides";

// 글 제목 바로 아래 붙는 한 줄 이력.
//
// 누가 썼고, 언제 썼고, 언제 고쳤고, 무엇을 근거로 확인했는지를 본문보다 먼저 밝힌다.
// 읽는 사람이 "이 글이 지금도 맞는 이야기인가"를 스크롤하기 전에 판단할 수 있어야 한다.
type Props = {
  guide: Guide;
};

export default function GuideByline({ guide }: Props) {
  const { datePublished, dateModified, verified } = guide;

  return (
    <div className="mt-4 rounded-lg border border-border bg-white/70 px-4 py-3 text-[13px] leading-6 text-gray-600 shadow-field">
      <p>
        <span className="font-semibold text-gray-900">{AUTHOR_NAME}</span>
        <span className="mx-1.5 text-gray-300">·</span>
        <time dateTime={datePublished}>{datePublished}</time> 작성
        {dateModified !== datePublished && (
          <>
            <span className="mx-1.5 text-gray-300">·</span>
            <time dateTime={dateModified}>{dateModified}</time> 수정
          </>
        )}
      </p>
      <p className="mt-1.5 border-t border-gray-100 pt-1.5">
        <span className="font-semibold text-gray-700">확인 기준</span>
        <span className="mx-1.5 text-gray-300">·</span>
        <time dateTime={verified.date}>{verified.date}</time> {verified.how}
      </p>
    </div>
  );
}
