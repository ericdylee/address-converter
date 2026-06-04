"use client";

import { useEffect, useRef, useState } from "react";
import type { JpAddressResult, JpSearchResponse } from "@/lib/types";

type Props = {
  // block = 사용자가 직접 입력한 번지·건물번호 (예: "1-1-1")
  onSelect: (result: JpAddressResult, block: string) => void;
};

// 한국 AddressSearch와 같은 패턴(debounce, AbortController, 키보드 네비, 외부 클릭 닫힘)이지만
// 입력이 "우편번호 7자리"이고, 번지·건물번호는 별도 입력칸으로 받는다.
export default function JpAddressSearch({ onSelect }: Props) {
  const [zip, setZip] = useState("");
  const [block, setBlock] = useState("");
  const [results, setResults] = useState<JpAddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState(0);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const digits = zip.replace(/\D/g, "");

  useEffect(() => {
    // 7자리가 다 모였을 때만 조회한다. (7자리 미만으로 지우는 경우의 초기화는 onChange에서 처리)
    if (digits.length !== 7) return;

    const handle = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/jp-address?zip=${digits}`, {
          signal: ctrl.signal,
        });
        const data = (await res.json()) as JpSearchResponse & { error?: string };
        if (!res.ok) {
          setError(data.error ?? "조회 중 오류가 발생했습니다.");
          setResults([]);
        } else {
          setResults(data.results);
          setHighlighted(0);
          setOpen(true);
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError("네트워크 오류");
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(handle);
  }, [digits]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSelect(item: JpAddressResult) {
    onSelect(item, block);
    setOpen(false);
  }

  function handleSearchClick() {
    if (results.length === 0) return;
    handleSelect(results[highlighted] ?? results[0]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(results[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <label
        htmlFor="jp-zip-search"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        일본 우편번호 (7자리)
      </label>
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <input
            id="jp-zip-search"
            type="text"
            inputMode="numeric"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
              setError(null);
              if (e.target.value.replace(/\D/g, "").length < 7) {
                setResults([]);
                setOpen(false);
              }
            }}
            onFocus={() => results.length > 0 && setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="예: 100-0005"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            autoComplete="off"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              검색중...
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          disabled={results.length === 0}
          aria-label="검색"
          className={`px-4 rounded-lg flex items-center justify-center transition-colors ${
            results.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </div>

      <div className="mt-3">
        <label
          htmlFor="jp-block"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          번지·건물번호 (선택)
        </label>
        <input
          id="jp-block"
          type="text"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          placeholder="예: 1-1-1 또는 1-1-1 〇〇빌딩 5F"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
          autoComplete="off"
        />
        <p className="mt-1 text-xs text-gray-500">
          우편번호로 동네까지 채워집니다. 丁目·番地·号(예: 1-1-1)와 건물명은 여기에 입력하세요.
        </p>
      </div>

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

      {open && results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-auto">
          {results.map((item, idx) => (
            <li
              key={item.id}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              onMouseEnter={() => setHighlighted(idx)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                idx === highlighted ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="text-sm text-gray-900">{item.japanese}</div>
              <div className="text-xs text-gray-500 mt-1">{item.englishLabel}</div>
            </li>
          ))}
        </ul>
      )}

      {open && !loading && results.length === 0 && digits.length === 7 && !error && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm text-gray-500">
          해당 우편번호를 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
}
