"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

        {/* 검색 카드 아래 설명·안내 콘텐츠 (서비스 이해를 돕고 검색엔진 색인에도 도움) */}
        <section className="mt-10 space-y-6">
          <div className="rounded-lg border border-border bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-bold text-gray-950">
              한글·일본 주소를 영문으로 쉽고 정확하게
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-gray-700">
              해외 사이트에 주소를 영어로 입력해야 할 때, 도로명·지번·일본 우편번호
              주소를 공식 데이터 기반으로 변환해 Street / City / State / Postal Code
              칸별로 보여줍니다. 각 칸은 복사 버튼으로 바로 붙여넣을 수 있어요.
              회원가입 없이 무료로 사용하세요.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-white p-6 shadow-card">
              <h2 className="text-base font-semibold text-gray-950">
                이런 분께 추천해요
              </h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-gray-700">
                <li>해외직구 배송지를 영어로 입력해야 하는 분</li>
                <li>해외 배송 송장·반품 라벨을 작성하는 분</li>
                <li>유학·이민·비자 등 영문 서류에 주소가 필요한 분</li>
                <li>일본 주소를 영문으로 정리해야 하는 분</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-white p-6 shadow-card">
              <h2 className="text-base font-semibold text-gray-950">
                사용 방법 (3단계)
              </h2>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-7 text-gray-700">
                <li>위에서 한글(또는 일본) 주소를 검색합니다.</li>
                <li>자동완성 후보 중 내 주소를 선택합니다.</li>
                <li>칸별 영문 주소를 복사해 해외 양식에 붙여넣습니다.</li>
              </ol>
            </div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-6 text-center">
            <p className="text-sm leading-7 text-blue-900">
              영문 주소 작성법이 궁금하다면{" "}
              <Link
                href="/guide"
                className="font-semibold text-blue-700 hover:underline"
              >
                사용 가이드
              </Link>
              를, 궁금한 점은{" "}
              <Link
                href="/faq"
                className="font-semibold text-blue-700 hover:underline"
              >
                자주 묻는 질문
              </Link>
              을 확인하세요.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
