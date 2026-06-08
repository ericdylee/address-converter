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
    "flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors";
  const tabActive = "bg-blue-600 text-white shadow-sm";
  const tabIdle = "text-gray-500 hover:bg-white hover:text-gray-900";

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
            Address Converter
          </p>
          <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">
            한글·일본 주소 → 영문 변환기
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            해외 사이트 입력란에 맞춰 필드별로 복사할 수 있습니다
          </p>
        </header>

        <section className="rounded-lg border border-border bg-white p-5 shadow-card sm:p-6">
          <div
            className="mb-6 flex gap-1 rounded-lg border border-border bg-gray-50 p-1"
            role="tablist"
            aria-label="국가 선택"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === "kr"}
              onClick={() => setTab("kr")}
              className={`${tabBase} ${tab === "kr" ? tabActive : tabIdle}`}
            >
              <span
                className={`mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  tab === "kr" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
                }`}
              >
                KR
              </span>
              한국
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "jp"}
              onClick={() => setTab("jp")}
              className={`${tabBase} ${tab === "jp" ? tabActive : tabIdle}`}
            >
              <span
                className={`mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  tab === "jp" ? "bg-white/20 text-white" : "bg-red-100 text-red-700"
                }`}
              >
                JP
              </span>
              일본
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
