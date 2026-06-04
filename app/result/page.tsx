"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AddressCard from "@/components/AddressCard";
import { combineStreetWithDetail } from "@/lib/romanize";

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
    <div className="flex items-stretch gap-2">
      <div className="flex-1 bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-3">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
          영문 주소
        </div>
        <div className="text-sm text-gray-900 break-words font-mono leading-relaxed">
          {value}
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        className={`px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap min-w-[80px] ${
          copied ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {copied ? "복사됨!" : "복사"}
      </button>
    </div>
  );
}

// 해외 사이트 입력 양식의 칸 이름 ↔ 우리 앱 필드 매핑 안내.
// 정적 콘텐츠라 props 없이 항상 같은 표를 보여준다(필드가 비어 있어도 안내는 노출).
function FieldMappingGuide() {
  const rows: Array<{ foreign: string; field: string; note?: string }> = [
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
    {
      foreign: "ZIP / Postal Code / Postcode",
      field: "Postal Code (예: 06232)",
    },
    {
      foreign: "Country / Region",
      field: "South Korea (또는 Korea, Republic of)",
    },
  ];

  return (
    <details className="group mt-4 border border-gray-200 rounded-2xl bg-white overflow-hidden">
      <summary className="flex items-center justify-between gap-2 px-5 py-4 cursor-pointer list-none select-none text-sm font-medium text-gray-800 hover:bg-gray-50">
        <span>해외 사이트 어느 칸에 넣나요?</span>
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

      <div className="px-5 pb-5 pt-1 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-3">
          칸 이름은 사이트마다 조금씩 다릅니다. 아래 짝을 참고해 넣으세요.
        </p>
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.field}
              className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] sm:items-baseline gap-0.5 sm:gap-3"
            >
              <span className="text-xs text-gray-500 break-words">{row.foreign}</span>
              <span className="hidden sm:block text-gray-300" aria-hidden="true">
                →
              </span>
              <span className="text-sm font-medium text-gray-900 break-words">
                {row.field}
                {row.note && (
                  <span className="block mt-0.5 text-xs font-normal text-gray-500">
                    {row.note}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3">
          <p className="text-xs text-blue-800 leading-relaxed">
            <span className="font-semibold">팁 · </span>
            양식에 <span className="font-medium">City 칸만 있고 State 칸이 없으면</span>{" "}
            보통 큰 도시 이름(예: <span className="font-mono">Seoul</span>)을 City에 넣습니다.
            서울·부산 같은 광역시는 시(State)와 구(City)가 나뉘어 있어 헷갈릴 수 있어요.
          </p>
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
  const detail = params.get("detail") ?? "";

  const hasRequired = street && city && state && zip;

  if (!hasRequired) {
    return (
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700">잘못된 접근입니다.</p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            검색 페이지로 이동
          </Link>
        </div>
      </main>
    );
  }

  const streetWithDetail = combineStreetWithDetail(street, detail);
  const fullEnglish = `${streetWithDetail}, ${city}, ${state} ${zip}, South Korea`;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
            ← 다시 검색
          </Link>
          <span className="text-xs text-gray-400">변환 결과</span>
        </header>

        <section className="space-y-3 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-5">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              한글 주소
            </div>
            <div className="text-sm text-gray-900 break-words leading-relaxed">
              {ko}
            </div>
          </div>
          <FullAddressBlock value={fullEnglish} />
        </section>

        <section>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-gray-200" />
            <h2 className="text-xs font-semibold text-gray-500 tracking-wide">
              필드별 복사
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="space-y-3">
            <AddressCard label="Street Address" value={streetWithDetail} />
            <AddressCard label="City" value={city} />
            <AddressCard label="State / Province" value={state} />
            <AddressCard label="Postal Code" value={zip} />
          </div>
          <div className="mt-3 px-4 py-2 text-xs text-gray-500">
            Country: South Korea
          </div>

          <FieldMappingGuide />
        </section>

        <footer className="mt-10 text-center text-xs text-gray-400">
          데이터: 행정안전부 도로명주소 영문 API
        </footer>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 py-10 px-4">
          <div className="max-w-2xl mx-auto text-center text-sm text-gray-400">
            로딩 중…
          </div>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
