"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddressSearch from "@/components/AddressSearch";
import JpAddressSearch from "@/components/JpAddressSearch";
import { extractDetail } from "@/lib/extract-detail";
import type { AddressResult, JpAddressResult } from "@/lib/types";

type Tab = "kr" | "jp";

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("kr");

  // 한국: 후보의 4필드 + 검색어에서 추출한 상세주소를 URL로 전달.
  function handleKrSelect(result: AddressResult, query: string) {
    const detail = extractDetail(query);
    const koWithDetail = detail ? `${result.korean} ${detail}` : result.korean;
    const params = new URLSearchParams({
      street: result.english.street,
      city: result.english.city,
      state: result.english.state,
      zip: result.english.postalCode,
      ko: koWithDetail,
      detail,
      country: "kr",
    });
    router.push(`/result?${params.toString()}`);
  }

  // 일본: 우편번호로 채운 4필드 + 사용자가 입력한 번지(block)를 URL로 전달.
  // street엔 동네(town)만 담기고, 번지는 detail로 보내 결과 페이지에서 앞에 합쳐진다.
  function handleJpSelect(result: JpAddressResult, block: string) {
    const params = new URLSearchParams({
      street: result.english.street,
      city: result.english.city,
      state: result.english.state,
      zip: result.english.postalCode,
      ko: result.japanese,
      detail: block,
      country: "jp",
    });
    router.push(`/result?${params.toString()}`);
  }

  const tabBase =
    "flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors";
  const tabActive = "bg-blue-600 text-white";
  const tabIdle = "bg-gray-100 text-gray-600 hover:bg-gray-200";

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            한글·일본 주소 → 영문 변환기
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            해외 사이트 입력란에 맞춰 필드별로 복사할 수 있습니다
          </p>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-2 mb-5" role="tablist" aria-label="국가 선택">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "kr"}
              onClick={() => setTab("kr")}
              className={`${tabBase} ${tab === "kr" ? tabActive : tabIdle}`}
            >
              🇰🇷 한국
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "jp"}
              onClick={() => setTab("jp")}
              className={`${tabBase} ${tab === "jp" ? tabActive : tabIdle}`}
            >
              🇯🇵 일본
            </button>
          </div>

          {tab === "kr" ? (
            <AddressSearch onSelect={handleKrSelect} />
          ) : (
            <JpAddressSearch onSelect={handleJpSelect} />
          )}
        </section>
      </div>
    </main>
  );
}
