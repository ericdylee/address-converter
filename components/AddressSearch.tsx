"use client";

import { useEffect, useRef, useState } from "react";
import type { AddressResult, SearchResponse } from "@/lib/types";
import { extractDetail } from "@/lib/extract-detail";

type Props = {
  onSelect: (result: AddressResult, query: string) => void;
};

export default function AddressSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState(0);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;

    const detail = extractDetail(trimmed);
    const searchKeyword = detail ? trimmed.replace(detail, "").trim() : trimmed;
    if (searchKeyword.length < 2) return;

    const handle = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/search-address?q=${encodeURIComponent(searchKeyword)}`,
          { signal: ctrl.signal },
        );
        const data = (await res.json()) as SearchResponse & { error?: string };
        if (!res.ok) {
          setError(data.error ?? "검색 중 오류가 발생했습니다.");
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
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSelect(item: AddressResult) {
    const originalQuery = query;
    onSelect(item, originalQuery);
    setOpen(false);
    setQuery(item.korean);
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

  const searchDisabled = results.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor="address-search" className="block text-sm font-medium text-gray-700 mb-2">
        한글 주소 검색 (도로명 · 지번 · 건물명 + 상세주소)
      </label>
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <input
            id="address-search"
            type="text"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              if (v.trim().length < 2) {
                setResults([]);
                setError(null);
                setOpen(false);
              }
            }}
            onFocus={() => results.length > 0 && setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="예: 강남대로 396 · 동덕아파트 101동 504호"
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
          disabled={searchDisabled}
          aria-label="검색"
          className={`px-4 rounded-lg flex items-center justify-center transition-colors ${
            searchDisabled
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

      {error && (
        <div className="mt-2 text-sm text-red-600">{error}</div>
      )}

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
              <div className="text-sm text-gray-900">{item.korean}</div>
              <div className="text-xs text-gray-500 mt-1">{item.englishFull}</div>
            </li>
          ))}
        </ul>
      )}

      {open && !loading && results.length === 0 && query.trim().length >= 2 && !error && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
