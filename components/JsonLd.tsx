// 구조화 데이터(JSON-LD) 객체 1개 또는 여러 개를 <script>로 삽입한다.
// FAQ 페이지의 기존 인라인 패턴을 재사용 가능한 컴포넌트로 뽑은 것.
//
// data는 우리가 만든 정적 스키마 객체(사이트명·가이드 제목·경로)라 신뢰할 수
// 있지만, JSON 안의 "<" 를 유니코드 이스케이프해 문자열에 우연히 "</script>"
// 같은 값이 들어가도 스크립트 태그를 탈출하지 못하게 막는다(JSON-LD 표준 안전장치).
function serialize(item: object): string {
  return JSON.stringify(item).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(item) }}
        />
      ))}
    </>
  );
}
