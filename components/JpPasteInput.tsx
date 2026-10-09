"use client";

import { useState } from "react";
import type { JpAddressResult, JpParseResponse, ParsedJpAddress } from "@/lib/types";

type Props = { onSelect: (result: JpAddressResult, block: string) => void };

// 일본어 주소 한 줄을 통째로 붙여넣는 주 입력. 예약 확인 메일의 주소를 그대로 복사해 오는 상황을 위해.
// 잘못 맞췄을 수도 있으니 바로 이동하지 않고, 해석 결과를 먼저 보여준 뒤 확인을 받는다.
export default function JpPasteInput({ onSelect }: Props) {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState<ParsedJpAddress | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "fail" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("loading");
    setParsed(null);
    try {
      const res = await fetch(`/api/jp-address?q=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as JpParseResponse;
      setParsed(data.parsed);
      setStatus(data.parsed ? "idle" : "fail");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="jp-paste" className="mb-2 block text-sm font-semibold text-gray-800">
        일본어 주소 붙여넣기
      </label>
      <textarea
        id="jp-paste"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="〒150-0001 東京都渋谷区神宮前1-2-3 〇〇ビル5F"
        className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-950 shadow-sm outline-none transition placeholder:text-gray-500 hover:border-blue-500 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100"
      />
      <p className="mt-1.5 text-xs text-gray-500">
        예약 확인 메일·호텔 홈페이지의 주소를 그대로 복사해 넣으세요. 우편번호가 없어도 됩니다.
      </p>
      <button
        type="submit"
        disabled={status === "loading" || !text.trim()}
        className="mt-3 h-12 w-full rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "loading" ? "해석 중…" : "변환"}
      </button>

      {status === "fail" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          주소를 알아보지 못했어요. 아래 <b>우편번호로 찾기</b>를 써주세요.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          일시적인 오류가 났어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      {parsed && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm">
          <p className="text-gray-700">
            {parsed.result.japanese} → <b>{parsed.result.englishLabel}</b> ({parsed.result.english.postalCode})
          </p>
          {parsed.block && <p className="mt-1 text-gray-700">번지·층/호: {parsed.block}</p>}
          {parsed.building && (
            <p className="mt-1 text-gray-600">
              건물명 「{parsed.building}」은 공식 영문 표기가 없어 넣지 않았어요. 필요하면 다음 화면의
              상세주소 칸에 직접 로마자로 적어주세요.
            </p>
          )}
          <button
            type="button"
            onClick={() => onSelect(parsed.result, parsed.block)}
            className="mt-3 rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-gray-800"
          >
            이 주소로 영문 보기
          </button>
        </div>
      )}
    </form>
  );
}
