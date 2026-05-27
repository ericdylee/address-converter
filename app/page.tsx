"use client";

import { useState } from "react";
import AddressSearch from "@/components/AddressSearch";
import AddressCard from "@/components/AddressCard";
import DetailAddressInput from "@/components/DetailAddressInput";
import { combineStreetWithDetail } from "@/lib/romanize";
import type { AddressResult } from "@/lib/types";

export default function HomePage() {
  const [selected, setSelected] = useState<AddressResult | null>(null);
  const [detail, setDetail] = useState("");

  const fields = selected
    ? {
        street: combineStreetWithDetail(selected.english.street, detail),
        city: selected.english.city,
        state: selected.english.state,
        postalCode: selected.english.postalCode,
      }
    : { street: "", city: "", state: "", postalCode: "" };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            한글 → 영문 주소 변환기
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            해외 사이트 입력란에 맞춰 필드별로 복사할 수 있습니다
          </p>
        </header>

        <section className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <AddressSearch onSelect={setSelected} />
          <DetailAddressInput value={detail} onChange={setDetail} />
        </section>

        <section className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <h2 className="text-sm font-semibold text-gray-500 tracking-wide">
              변환 결과
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-3">
            <AddressCard
              label="Street Address"
              value={fields.street}
              placeholder="위에서 한글 주소를 선택하세요"
            />
            <AddressCard label="City" value={fields.city} />
            <AddressCard label="State / Province" value={fields.state} />
            <AddressCard label="Postal Code" value={fields.postalCode} />
          </div>

          <div className="mt-4 px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-600">
            <span className="font-medium">Country:</span> South Korea
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-gray-400">
          데이터: 행정안전부 도로명주소 영문 API
        </footer>
      </div>
    </main>
  );
}
