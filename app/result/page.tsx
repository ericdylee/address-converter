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
