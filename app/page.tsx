"use client";

import { useRouter } from "next/navigation";
import AddressSearch from "@/components/AddressSearch";
import type { AddressResult } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();

  function handleSelect(result: AddressResult) {
    const params = new URLSearchParams({
      street: result.english.street,
      city: result.english.city,
      state: result.english.state,
      zip: result.english.postalCode,
      ko: result.korean,
    });
    router.push(`/result?${params.toString()}`);
  }

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

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <AddressSearch onSelect={handleSelect} />
        </section>

        <footer className="mt-10 text-center text-xs text-gray-400">
          데이터: 행정안전부 도로명주소 영문 API
        </footer>
      </div>
    </main>
  );
}

