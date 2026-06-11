"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AddressCard from "@/components/AddressCard";
import { CheckIcon, CopyIcon } from "@/components/icons";
import { combineStreetWithDetail, combineJpStreet } from "@/lib/romanize";

type Country = "kr" | "jp";

function FullAddressBlock({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const t = document.createElement("textarea");
      t.value = value;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      {/* 우편 라벨 연출: 에어메일 줄무늬 + 흰 카드 + mono 주소 (이 화면의 모티프 사용처는 여기 한 곳) */}
      <div className="flex-1 overflow-hidden rounded-lg border border-border bg-white shadow-card">
        <div className="airmail-stripe h-1.5" aria-hidden="true" />
        <div className="px-4 py-3">
          <div className="mb-1 text-xs font-semibold uppercase text-gray-500">
            영문 주소
          </div>
          <div className="break-words font-mono text-base leading-7 text-gray-950">
            {value}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className={`flex min-h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-5 text-sm font-semibold transition-colors ${
          copied
            ? "bg-emerald-600 text-white"
            : "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
        }`}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "복사됨!" : "전체 복사"}
      </button>
    </div>
  );
}

// 해외 사이트 입력 양식의 칸 이름 ↔ 우리 앱 필드 매핑 안내. 나라별로 예시가 달라진다.
type GuideRow = { foreign: string; field: string; note?: string };

const KR_ROWS: GuideRow[] = [
  {
    foreign: "Address / Street address / Address Line 1",
    field: "Street Address",
    note: "도로명 + 건물번호. 동/호도 이 칸 끝에 함께 넣어도 됩니다.",
  },
  {
    foreign: "apartment, Suite, Unit, etc. / Address Line 2 (선택)",
    field: "동 / 호 (예: 101-502)",
    note: "Street 칸에 이미 합쳐져 있어요. 이 칸이 따로 있으면 동/호 부분만 떼어 넣으세요.",
  },
  {
    foreign: "City / ward / town / village / Town·City",
    field: "City (구·시·군, 예: Gangnam-gu)",
  },
  {
    foreign: "State / Province / Region",
    field: "State / Province (시·도, 예: Seoul)",
  },
  { foreign: "ZIP / Postal Code / Postcode", field: "Postal Code (예: 06232)" },
  {
    foreign: "Country / Region",
    field: "South Korea (또는 Korea, Republic of)",
  },
];

const JP_ROWS: GuideRow[] = [
  {
    foreign: "Address / Street address / Address Line 1",
    field: "Street Address",
    note: "번지 + 동네 (예: 1-1-1 Marunouchi). 건물명도 이 칸 끝에 함께 넣어도 됩니다.",
  },
  {
    foreign: "apartment, Suite, Unit, etc. / Address Line 2 (선택)",
    field: "건물·호 (예: 〇〇빌딩 5F)",
    note: "Street 칸에 이미 합쳐져 있어요. 이 칸이 따로 있으면 건물/호 부분만 떼어 넣으세요.",
  },
  {
    foreign: "City / ward / town / Town·City",
    field: "City (시·구, 예: Chiyoda-ku)",
  },
  {
    foreign: "State / Province / Prefecture",
    field: "Prefecture (도도부현, 예: Tokyo)",
  },
  { foreign: "ZIP / Postal Code / Postcode", field: "Postal Code (예: 100-0005)" },
  { foreign: "Country / Region", field: "Japan" },
];

function FieldMappingGuide({ country }: { country: Country }) {
  const rows = country === "jp" ? JP_ROWS : KR_ROWS;

  return (
    <details open className="group mt-4 overflow-hidden rounded-lg border border-border bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 text-sm font-semibold text-gray-900 select-none hover:bg-gray-50">
        <span>입력 가이드</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="border-t border-gray-100 px-5 pt-1 pb-5">
        <p className="mb-3 text-sm leading-6 text-gray-500">
          칸 이름은 사이트마다 조금씩 다를 수 있습니다. 아래 가이드를 참고해주세요
        </p>
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.field}
              className="grid grid-cols-1 gap-0.5 sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:gap-3"
            >
              <span className="text-sm text-gray-500 break-words">{row.foreign}</span>
              <span className="hidden sm:block text-gray-300" aria-hidden="true">
                →
              </span>
              <span className="text-sm font-medium text-gray-900 break-words">
                {row.field}
                {row.note && (
                  <span className="block mt-0.5 text-sm font-normal text-gray-500">
                    {row.note}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-lg bg-blue-50/60 px-4 py-3">
          {country === "jp" ? (
            <p className="text-sm text-blue-800 leading-relaxed">
              <span className="font-semibold">팁 · </span>
              일본 영문 주소는 <span className="font-medium">작은 단위 → 큰 단위</span> 순으로
              씁니다(번지 → 동네 → 시·구 → 도도부현). City 칸만 있으면 보통 시·구 이름(예:{" "}
              <span className="font-mono">Chiyoda-ku</span>)을 넣습니다.
            </p>
          ) : (
            <p className="text-sm text-blue-800 leading-relaxed">
              <span className="font-semibold">팁 · </span>
              양식에 <span className="font-medium">City 칸만 있고 State 칸이 없으면</span>{" "}
              보통 큰 도시 이름(예: <span className="font-mono">Seoul</span>)을 City에 넣습니다.
              서울·부산 같은 광역시는 시(State)와 구(City)가 나뉘어 있어 헷갈릴 수 있어요.
            </p>
          )}
        </div>
      </div>
    </details>
  );
}

function ResultContent() {
  const params = useSearchParams();
  const street = params.get("street") ?? "";
  const city = params.get("city") ?? "";
  const state = params.get("state") ?? "";
  const zip = params.get("zip") ?? "";
  const ko = params.get("ko") ?? "";
  const country: Country = params.get("country") === "jp" ? "jp" : "kr";
  const isJp = country === "jp";

  // 상세주소(동·호 등). 검색 단계에서 넘어온 값으로 시작하고,
  // 결과 페이지에서도 직접 추가·수정할 수 있다 (입력 즉시 Street 칸에 반영).
  const [detail, setDetail] = useState(params.get("detail") ?? "");

  // 일본은 동네(street)가 빈 우편번호가 있으므로(시 전체) city·state·zip만 있으면 유효.
  const hasRequired = isJp ? city && state && zip : street && city && state && zip;

  if (!hasRequired) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700">
            표시할 주소 정보가 없습니다. 홈에서 주소를 다시 검색해주세요.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
          >
            검색 페이지로 이동
          </Link>
        </div>
      </main>
    );
  }

  // 한국: "도로명, 상세" 순 / 일본: "번지 동네" 순(번지가 앞).
  const streetWithDetail = isJp
    ? combineJpStreet(street, detail)
    : combineStreetWithDetail(street, detail);
  const countryLabel = isJp ? "Japan" : "South Korea";
  // 빈 칸(예: 동네 없는 일본 우편번호)이 콤마로 남지 않도록 비어있는 조각은 제외.
  const fullEnglish = [streetWithDetail, city, `${state} ${zip}`, countryLabel]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <Link href="/" className="text-sm font-medium text-blue-700 hover:text-blue-800">
            ← 다시 검색
          </Link>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-950">
            영문 주소 변환 결과
          </h1>
        </header>

        <section className="mb-8 space-y-3">
          <div className="rounded-lg border border-border bg-white p-5 shadow-card">
            <div className="mb-2 text-xs font-semibold uppercase text-gray-500">
              {isJp ? "일본어 주소" : "한글 주소"}
            </div>
            <div className="break-words text-base leading-7 text-gray-950">
              {ko}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-card">
            <label
              htmlFor="detail-input"
              className="mb-2 block text-xs font-semibold uppercase text-gray-500"
            >
              {isJp ? "번지·건물 추가 (선택)" : "상세주소 추가 (선택)"}
            </label>
            <input
              id="detail-input"
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder={isJp ? "예: 1-1-1 〇〇빌딩 5F" : "예: 101동 502호"}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3.5 text-[15px] text-gray-950 shadow-sm outline-none transition placeholder:text-gray-400 hover:border-blue-500 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100"
              autoComplete="off"
            />
            <p className="mt-2 text-xs leading-5 text-gray-500">
              {isJp
                ? "입력하면 아래 Street 칸 맨 앞에 합쳐집니다."
                : "입력하면 아래 Street 칸에 영문으로 합쳐집니다. (예: 101동 502호 → 101-502)"}
            </p>
          </div>
          <FullAddressBlock value={fullEnglish} />
        </section>

        <section>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <h2 className="text-sm font-semibold text-gray-500">
              필드별 복사
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="space-y-3">
            <AddressCard label="Street Address" value={streetWithDetail} />
            <AddressCard label="City" value={city} />
            <AddressCard
              label={isJp ? "Prefecture" : "State / Province"}
              value={state}
            />
            <AddressCard label="Postal Code" value={zip} />
            <AddressCard label="Country" value={countryLabel} />
          </div>

          <FieldMappingGuide country={country} />
        </section>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background px-4 py-10">
          <div className="mx-auto max-w-2xl text-center text-sm text-gray-400">
            로딩 중…
          </div>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
