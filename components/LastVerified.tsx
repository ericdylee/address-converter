// 실전 글 하단의 "최종 확인일" 표기.
//
// 쇼핑몰 화면은 수시로 바뀐다. 이 글이 "언제 본 화면"을 설명하는지 밝혀두면
// 읽는 사람이 지금 자기 화면과 다를 때 판단할 수 있고, 검색엔진에도 방치된
// 글이 아니라 관리되는 글이라는 신호가 된다.
type Props = {
  /** ISO 형식(YYYY-MM-DD). <time datetime>에 그대로 쓰인다. */
  date: string;
  /** 무엇을 확인했는지 한 줄 (예: "데스크톱 웹 기준") */
  note?: string;
};

export default function LastVerified({ date, note }: Props) {
  return (
    <p className="mt-6 border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500">
      최종 확인{" "}
      <time dateTime={date} className="font-medium text-gray-700">
        {date}
      </time>{" "}
      화면 기준{note ? ` · ${note}` : ""}. 쇼핑몰이 화면을 바꾸면 실제와 다를 수
      있습니다. 다르면{" "}
      <a
        href="/contact"
        className="font-medium text-blue-700 underline-offset-2 hover:underline"
      >
        알려주세요
      </a>
      .
    </p>
  );
}
