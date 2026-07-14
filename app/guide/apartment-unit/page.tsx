import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/ContentLayout";
import GuideCta from "@/components/GuideCta";
import GuideQuickAnswer from "@/components/GuideQuickAnswer";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "아파트 동·호수, 건물명 영문 표기 정리",
  description:
    "101동 502호, 지하 1층, 오피스텔 호수, 빌라 건물명처럼 영문으로 옮기기 까다로운 상세주소를 어떤 규칙으로 쓰는지 실제 예시로 정리했습니다.",
  path: "/guide/apartment-unit",
});

// 이 글은 lib/romanize.ts 의 상세주소 변환 규칙을 사람이 읽을 수 있게 풀어 쓴 것.
// 규칙이 바뀌면 romanize.ts 와 이 표를 함께 맞춰야 한다.
const rules: { ko: string; en: string; note: string }[] = [
  { ko: "101동 502호", en: "101-502", note: "동은 하이픈, 호는 숫자만" },
  { ko: "101동", en: "101", note: "동만 있으면 숫자만" },
  { ko: "502호", en: "502", note: "호만 있으면 숫자만" },
  { ko: "3층", en: "3F", note: "층은 F" },
  { ko: "가동 101호", en: "Ga-101", note: "문자 동은 로마자 (가→Ga)" },
  { ko: "나동 302호", en: "Na-302", note: "나→Na, 다→Da …" },
];

export default function ApartmentUnitGuide() {
  return (
    <ContentLayout
      title="아파트 동·호수, 건물명 영문 표기 정리"
      lead="도로명까지는 쉬운데 ‘101동 502호’를 영어로 어떻게 쓰는지에서 막히는 경우가 많습니다. 규칙은 생각보다 단순합니다."
      backLink={{ label: "가이드 목록", href: "/guide" }}
    >
      <GuideQuickAnswer
        title="한눈에 보는 변환 규칙"
        rows={[
          { label: "101동 502호", value: "101-502" },
          { label: "3층 (지상)", value: "3F" },
          { label: "가동 101호", value: "Ga-101" },
          {
            label: "넣는 칸",
            value: "Address Line 2",
            note: "칸이 없으면 Street 끝에 쉼표로 이어 적습니다.",
          },
        ]}
      />

      <article className="space-y-7 rounded-lg border border-border bg-white p-6 text-[15px] leading-7 text-gray-700 shadow-card sm:p-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            1. 상세주소는 ‘숫자와 하이픈’으로 씁니다
          </h2>
          <p>
            해외 주소 양식에는 ‘동’이나 ‘호’ 같은 단위가 없습니다. 그래서 한국의
            동·호수는 한글 단위를 떼고{" "}
            <strong className="font-semibold text-gray-900">숫자와 하이픈</strong>
            으로만 적는 것이 관례입니다. 예를 들어 “101동 502호”는{" "}
            <span className="font-mono">101-502</span> 가 됩니다. 앞 숫자가 동,
            뒤 숫자가 호이고, 사이를 하이픈으로 잇습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-950">
            2. 경우별 변환 규칙표
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">한글 상세주소</th>
                  <th className="px-4 py-2 font-semibold">영문 표기</th>
                  <th className="px-4 py-2 font-semibold">설명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rules.map((r) => (
                  <tr key={r.ko}>
                    <td className="px-4 py-2">{r.ko}</td>
                    <td className="px-4 py-2 font-mono font-medium text-gray-900">
                      {r.en}
                    </td>
                    <td className="px-4 py-2 text-gray-500">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            ※ 이 사이트의 변환기는 결과 화면에서 상세주소를 입력하면 위 규칙을
            자동으로 적용해 줍니다. 직접 적을 때 참고용으로 쓰세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            3. 어느 칸에 넣나요 — Address Line 2
          </h2>
          <p>
            해외 양식에{" "}
            <strong className="font-semibold text-gray-900">
              Address Line 2
            </strong>{" "}
            (또는 <span className="font-mono">Apartment / Suite / Unit</span>)
            칸이 있으면 동·호수는 그 칸에 따로 적습니다. 이 칸이 없으면 Street
            주소(Address Line 1) 끝에 쉼표로 이어 붙이면 됩니다.
          </p>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
                한글
              </div>
              <div className="text-gray-900">
                부산광역시 해운대구 해운대로 570, 101동 2503호
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
                <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
                  칸이 나뉜 양식
                </div>
                <div className="break-words font-mono text-sm text-gray-950">
                  Line 1: 570 Haeundae-ro
                  <br />
                  Line 2: 101-2503
                </div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
                <div className="mb-1 text-xs font-semibold uppercase text-blue-700">
                  한 칸만 있는 양식
                </div>
                <div className="break-words font-mono text-sm text-gray-950">
                  570 Haeundae-ro, 101-2503
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            4. 오피스텔·상가·빌라는 어떻게 하나요
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-gray-900">오피스텔</strong> —
              아파트와 같습니다. “A동 1503호”처럼 동이 알파벳이면 그대로 두고
              (<span className="font-mono">A-1503</span>), 한글 동(가/나/다)은
              로마자로 바꿉니다(<span className="font-mono">Ga-1503</span>).
            </li>
            <li>
              <strong className="font-semibold text-gray-900">
                건물명이 있는 빌라·상가
              </strong>{" "}
              — 건물명은 로마자로 적고 층/호를 뒤에 붙입니다. 예: “행복빌라 3층
              301호” → <span className="font-mono">Haengbok Villa 3F, 301</span>.
              건물명은 임의로 번역하지 말고 소리 나는 대로 로마자로 옮기는 것이
              안전합니다.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">지하층</strong> —
              지하 1층은 <span className="font-mono">B1</span>(basement)로 적는
              것이 일반적입니다. 다만 배송에서는 지상/지하 구분보다 호수가 더
              중요하므로 호수를 빠뜨리지 않는 것이 우선입니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-950">
            5. 자주 하는 실수
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              “동/호”를 한글 그대로 남기기 — 해외 시스템은 한글을 읽지 못해
              배송이 지연될 수 있습니다.
            </li>
            <li>
              동과 호를 붙여 쓰기(<span className="font-mono">101502</span>) —
              반드시 하이픈으로 구분해야 합니다(
              <span className="font-mono">101-502</span>).
            </li>
            <li>
              호수를 통째로 빠뜨리기 — 아파트·오피스텔은 호수가 없으면 정확한
              배송지가 되지 않습니다.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-950">함께 보기</h2>
          <p>
            칸별 작성 원리 전체는{" "}
            <Link
              href="/guide/english-address"
              className="font-semibold text-blue-700 hover:underline"
            >
              한글 주소 영문으로 쓰는 법
            </Link>
            에서, 흔한 실수 모음은{" "}
            <Link
              href="/guide/common-mistakes"
              className="font-semibold text-blue-700 hover:underline"
            >
              자주 틀리는 실수 7가지
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </section>
      </article>

      <GuideCta />
    </ContentLayout>
  );
}
