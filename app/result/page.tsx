"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AddressCard from "@/components/AddressCard";
import DetailAddressInput from "@/components/DetailAddressInput";
import { combineStreetWithDetail } from "@/lib/romanize";

function ResultContent() {
  const params = useSearchParams();
  const street = params.get("street") ?? "";
  const city = params.get("city") ?? "";
  const state = params.get("state") ?? "";
  const zip = params.get("zip") ?? "";
  const ko = params.get("ko") ?? "";

  const [detail, setDetail] = useState("");

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

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← 다시 검색
          </Link>
          <span className="text-xs text-gray-400">변환 결과</span>
        </header>

        {ko && (
          <div className="mb-6 px-4 py-3 bg-white border border-gray-200 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">원본 (한글)</div>
            <div className="text-sm text-gray-900">{ko}</div>
          </div>
        )}

        <section className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <DetailAddressInput value={detail} onChange={setDetail} />
        </section>

        <section className="space-y-3">
          <AddressCard label="Street Address" value={streetWithDetail} />
          <AddressCard label="City" value={city} />
          <AddressCard label="State / Province" value={state} />
          <AddressCard label="Postal Code" value={zip} />
        </section>

        <div className="mt-4 px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-600">
          <span className="font-medium">Country:</span> South Korea
        </div>

        <footer className="mt-10 text-center text-xs text-gray-400">
          데이터: 행정안전부 도로명주소 영문 API
        </footer>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}