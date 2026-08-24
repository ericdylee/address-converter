"use client";

import { useState } from "react";
import AddressCard from "@/components/AddressCard";
import { CheckIcon, CopyIcon } from "@/components/icons";
import { combineStreetWithDetail, combineJpStreet } from "@/lib/romanize";

// 결과 페이지에서 "상세주소 입력값에 따라 달라지는" 부분만 모은 클라이언트 컴포넌트.
// 나머지(한글 주소, 입력 가이드)는 page.tsx에서 서버 렌더한다 — 크롤러가 읽을
// 본문을 남기기 위해서다.

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

type Props = {
  street: string;
  city: string;
  state: string;
  zip: string;
  initialDetail: string;
  isJp: boolean;
};

export default function ResultInteractive({
  street,
  city,
  state,
  zip,
  initialDetail,
  isJp,
}: Props) {
  // 상세주소(동·호 등). 검색 단계에서 넘어온 값으로 시작하고,
  // 결과 페이지에서도 직접 추가·수정할 수 있다 (입력 즉시 Street 칸에 반영).
  const [detail, setDetail] = useState(initialDetail);

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
    <>
      <section className="mb-8 space-y-3">
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
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3.5 text-[15px] text-gray-950 shadow-sm outline-none transition placeholder:text-gray-500 hover:border-blue-500 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100"
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
          <h2 className="text-sm font-semibold text-gray-500">필드별 복사</h2>
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
      </section>
    </>
  );
}
