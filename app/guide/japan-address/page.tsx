import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import GuideQuickAnswer from "@/components/GuideQuickAnswer";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "일본 주소, 영문으로 쓰는 법",
  description:
    "일본 주소를 영문으로 쓸 때 번지, 동네, 시·구, 도도부현, 우편번호를 어느 순서와 어느 칸에 넣는지 예시로 정리했습니다.",
  path: "/guide/japan-address",
});

export default function JapanAddressGuide() {
  return (
    <ContentLayout
      title="일본 주소, 영문으로 쓰는 법"
      lead="일본 주소도 영문으로 쓸 때는 순서가 반대가 됩니다. 우편번호와 丁目·番地·号 규칙만 알면 어렵지 않습니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <GuideQuickAnswer
        rows={[
          { label: "Address Line 1", value: "1-1-1 Marunouchi" },
          {
            label: "Address Line 2",
            value: "Sakura Bldg. 5F",
            note: "건물명·층·호수가 있을 때만 사용합니다.",
          },
          { label: "City", value: "Chiyoda-ku" },
          { label: "State / Prefecture", value: "Tokyo" },
          { label: "ZIP / Postal Code", value: "100-0005" },
          { label: "Country", value: "Japan" },
        ]}
      />

      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            1. 영문 일본 주소는 순서가 반대입니다
          </h2>
          <p>
            일본어 주소는 <strong className="font-semibold text-gray-900">큰 단위 → 작은 단위</strong>{" "}
            순서로 씁니다(도도부현 → 시·구 → 동네 → 번지). 영문으로 쓸 때는
            한국 주소와 마찬가지로{" "}
            <strong className="font-semibold text-gray-900">작은 단위 → 큰 단위</strong>{" "}
            순서로 뒤집습니다. 번지가 맨 앞, 도도부현과 우편번호가 뒤로 갑니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            2. 일본 주소의 구성요소와 영문 대응
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">일본어</th>
                  <th className="px-4 py-2 font-semibold">영문 필드</th>
                  <th className="px-4 py-2 font-semibold">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2">丁目·番地·号 (번지)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Street Address 앞부분</td>
                  <td className="px-4 py-2 font-mono">1-1-1</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">町域 (동네 이름)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Street Address 뒷부분</td>
                  <td className="px-4 py-2 font-mono">Marunouchi</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">건물명·호수</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Address Line 2</td>
                  <td className="px-4 py-2 font-mono">Sakura Bldg. 5F</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">市·区·町·村 (시구정촌)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">City</td>
                  <td className="px-4 py-2 font-mono">Chiyoda-ku</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">都道府県 (도도부현)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">State / Prefecture</td>
                  <td className="px-4 py-2 font-mono">Tokyo</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">郵便番号 (우편번호 7자리)</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Postal Code</td>
                  <td className="px-4 py-2 font-mono">100-0005</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">국가</td>
                  <td className="px-4 py-2 font-medium text-gray-900">Country</td>
                  <td className="px-4 py-2 font-mono">Japan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            3. 실제 변환 예시 3가지
          </h2>
          <p className="mb-3">
            도시 유형에 따라 City·State 칸에 들어가는 것이 달라집니다. 아래
            세 예시로 감을 잡아 보세요. <strong className="font-semibold text-gray-900">State에는
            항상 도도부현</strong>이 들어갑니다.
          </p>
          <div className="space-y-4">
            <JpExample
              ko="〒100-0005 東京都千代田区丸の内1丁目1番1号"
              en="1-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005, Japan"
              note="도쿄 특별구 — 구(Chiyoda-ku)가 City, Tokyo가 State."
            />
            <JpExample
              ko="〒530-0001 大阪府大阪市北区梅田2丁目2番2号"
              en="2-2-2 Umeda, Kita-ku, Osaka 530-0001, Japan"
              note="오사카는 부(府)와 시 이름이 겹칩니다. 이때는 구(Kita-ku)를 City, Osaka를 State에."
            />
            <JpExample
              ko="〒273-0005 千葉県船橋市本町1丁目1番1号"
              en="1-1-1 Honcho, Funabashi, Chiba 273-0005, Japan"
              note="구가 없는 일반 시 — 시(Funabashi)가 City, 현(Chiba)이 State."
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            참고: 이 도구의 변환 결과는 일본우편(Japan Post) 공식 로마자
            데이터를 그대로 따릅니다. 공식 데이터는 장음을 생략하는 경우가
            있어(예: 丸の内 → <span className="font-mono">Marunochi</span>),
            널리 쓰이는 표기(<span className="font-mono">Marunouchi</span>)와
            철자가 조금 다를 수 있습니다. 둘 다 우편 배송에는 문제가 없습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            4. 丁目·番地·号는 하이픈 숫자로 씁니다
          </h2>
          <p>
            &ldquo;1丁目2番3号&rdquo;처럼 단위가 붙은 번지는 영문에서{" "}
            <span className="font-mono">1-2-3</span> 처럼 하이픈으로 이어 적는
            것이 표준입니다. 일본 우편(Japan Post)의 로마자 표기도 이 방식을
            씁니다. 이 도구의 일본 탭에서 우편번호로 동네까지 찾은 뒤,
            번지·건물번호 칸에 <span className="font-mono">1-2-3</span> 형태로 입력하면
            Street 칸 맨 앞에 자동으로 합쳐집니다.
          </p>
          <p className="mt-2">
            숫자 개수는 주소마다 다릅니다. 号가 없이 &ldquo;1丁目5番&rdquo;이면{" "}
            <span className="font-mono">1-5</span>, 세 단위가 다 있으면{" "}
            <span className="font-mono">1-5-3</span>처럼 있는 만큼만 이어 적으면
            됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            5. 건물명·맨션·호수는 어떻게 쓰나요
          </h2>
          <p>
            건물명(ビル·マンション)은 로마자로 적고 층/호를 뒤에 붙입니다. 층은
            &ldquo;F&rdquo;, 호실(号室)은 숫자만 씁니다.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              サクラビル 5階 → <span className="font-mono">Sakura Bldg. 5F</span>
            </li>
            <li>
              さくらマンション302号室 →{" "}
              <span className="font-mono">Sakura Mansion 302</span>
            </li>
          </ul>
          <p className="mt-3">
            해외 양식에 Address Line 2(또는 Apartment/Suite/Unit) 칸이 있으면
            건물명·호수만 그 칸에 적고, 없으면 Street 칸 끝에 이어 적으면 됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            6. 한국 주소 표기와 다른 점
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-gray-900">번지 표기</strong> —
              일본은 번지를 <span className="font-mono">1-2-3</span> 하이픈 숫자로
              적습니다. 한국은 도로명 + 건물번호(예:{" "}
              <span className="font-mono">152 Teheran-ro</span>) 방식입니다.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">우편번호</strong> —
              일본은 <span className="font-mono">100-0005</span>처럼 3-4자리,
              한국은 <span className="font-mono">06236</span>처럼 5자리입니다.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">City의 정체</strong> —
              일본은 시 안의 &lsquo;구&rsquo;가 City가 되기도 합니다(도쿄
              특별구, 오사카 등 정령시). 반면 State에는 언제나 도도부현이
              들어갑니다.
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            한국 주소 작성법은{" "}
            <Link
              href="/guide/english-address"
              className="font-medium text-blue-700 hover:underline"
            >
              한글 주소, 영문으로 쓰는 법
            </Link>
            에서 확인하세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            7. 자주 하는 실수
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Tokyo를 City 칸에 넣기 — Tokyo는 도도부현이므로 State/Prefecture
              칸에 넣고, City에는 시·구(예: Chiyoda-ku)를 넣습니다.
            </li>
            <li>
              우편번호 하이픈 누락 — 일본 우편번호는{" "}
              <span className="font-mono">100-0005</span> 처럼 3자리-4자리
              형식입니다.
            </li>
            <li>
              주소를 일본어 순서 그대로 적기 — 영문은 번지부터 시작해야
              합니다.
            </li>
            <li>국가(Japan) 누락 — 국제 배송에는 반드시 국가가 필요합니다.</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            City·State를 바꿔 넣는 것 같은 흔한 실수 모음은{" "}
            <Link
              href="/guide/common-mistakes"
              className="font-medium text-blue-700 hover:underline"
            >
              자주 틀리는 실수 7가지
            </Link>
            에서 볼 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                동네 이름(丁目 앞)의 로마자를 모르겠어요.
              </h3>
              <p className="mt-1">
                일본 탭에서 우편번호를 입력하면 동네·시·구·도도부현이 공식
                로마자로 자동으로 채워집니다. 번지(1-2-3)만 직접 넣으면 됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                도쿄는 City에 무엇을 넣나요?
              </h3>
              <p className="mt-1">
                Tokyo는 State/Prefecture입니다. City에는 千代田区(Chiyoda-ku)
                같은 &lsquo;구&rsquo;를 넣습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                우편번호 앞의 〒 기호도 적어야 하나요?
              </h3>
              <p className="mt-1">
                아니요. 〒는 일본 국내 표기 기호이므로 영문 주소에는 숫자
                (100-0005)만 적습니다.
              </p>
            </div>
          </div>
        </section>
      </article>

      <GuideCta />
    </ContentLayout>
  );
}

// 일본어/영문 변환 예시 한 쌍 + 설명을 보여주는 카드. 이 페이지 안에서만 쓴다.
function JpExample({
  ko,
  en,
  note,
}: {
  ko: string;
  en: string;
  note?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
          일본어
        </div>
        <div className="text-gray-900">{ko}</div>
      </div>
      <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
        <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
          영문
        </div>
        <div className="break-words font-mono text-gray-950">{en}</div>
      </div>
      {note && <p className="px-1 text-sm text-gray-500">{note}</p>}
    </div>
  );
}
