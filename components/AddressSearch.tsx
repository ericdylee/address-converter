"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AddressResult, SearchResponse } from "@/lib/types";
import { extractDetail } from "@/lib/extract-detail";

type Props = {
  onSelect: (result: AddressResult, query: string) => void;
};

// 결과 페이지에서 "다시 검색"으로 돌아왔을 때 검색어를 복원하기 위한 저장 키.
// sessionStorage라 탭을 닫으면 사라진다.
const QUERY_STORAGE_KEY = "kr-address-query";

// 빈 입력 상태에서 눌러볼 수 있는 예시 (도로명 / 관공서 / 건물명+상세주소 케이스를 하나씩)
const EXAMPLE_QUERIES = ["강남대로 396", "세종대로 110", "동덕아파트 101동 504호"];

// 검색어에서 상세주소(동·호 등)를 떼어내고 juso API에 보낼 키워드만 남긴다.
function toKeyword(raw: string): string {
  const trimmed = raw.trim();
  const detail = extractDetail(trimmed);
  return detail ? trimmed.replace(detail, "").trim() : trimmed;
}

export default function AddressSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState(0);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  // 사용자가 직접 입력/포커스했는지. 복원된 검색어로 자동 검색될 때
  // 드롭다운이 멋대로 열리지 않게 하기 위한 플래그.
  const interactedRef = useRef(false);

  const runSearch = useCallback(async (keyword: string) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/search-address?q=${encodeURIComponent(keyword)}`,
        { signal: ctrl.signal },
      );
      const data = (await res.json()) as SearchResponse & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "검색 중 오류가 발생했습니다.");
        setResults([]);
      } else {
        setResults(data.results);
        setHighlighted(0);
        setOpen(interactedRef.current);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setError("네트워크 오류");
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // 결과 페이지에서 돌아온 경우 직전 검색어 복원 (아래 debounce 효과가 검색까지 다시 실행).
  // sessionStorage는 브라우저에만 있어 서버 렌더링과 같은 화면을 먼저 그린 뒤
  // 마운트 후에 복원해야 한다 — 이 한 번의 setState는 의도된 것.
  useEffect(() => {
    const saved = sessionStorage.getItem(QUERY_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setQuery(saved);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) return;
    const keyword = toKeyword(query);
    if (keyword.length < 2) return;

    const handle = setTimeout(() => runSearch(keyword), 300);
    return () => clearTimeout(handle);
  }, [query, runSearch]);

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
    sessionStorage.setItem(QUERY_STORAGE_KEY, item.korean);
  }

  // 돋보기 버튼: debounce를 기다리지 않고 즉시 검색. 입력이 짧으면 입력란으로 포커스만.
  function handleSearchClick() {
    interactedRef.current = true;
    const keyword = toKeyword(query);
    if (keyword.length < 2) {
      inputRef.current?.focus();
      return;
    }
    runSearch(keyword);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // 드롭다운이 닫혀 있을 때 Enter = 즉시 검색
    if (e.key === "Enter" && (!open || results.length === 0)) {
      e.preventDefault();
      handleSearchClick();
      return;
    }
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

  const trimmedLength = query.trim().length;
  const listboxVisible = open && results.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor="address-search" className="mb-2 block text-sm font-semibold text-gray-800">
        한글 주소 검색 (도로명 · 지번 · 건물명 + 상세주소)
      </label>
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            id="address-search"
            type="text"
            role="combobox"
            aria-expanded={listboxVisible}
            aria-controls="address-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              listboxVisible ? `address-option-${highlighted}` : undefined
            }
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              interactedRef.current = true;
              setQuery(v);
              sessionStorage.setItem(QUERY_STORAGE_KEY, v);
              if (v.trim().length < 2) {
                setResults([]);
                setError(null);
                setOpen(false);
              }
            }}
            onFocus={() => {
              interactedRef.current = true;
              if (results.length > 0) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="예: 강남대로 396 · 101동 502호"
            className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-[15px] text-gray-950 shadow-sm outline-none transition placeholder:text-gray-400 hover:border-blue-500 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100"
            autoComplete="off"
          />
          {loading && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              role="status"
              aria-label="검색 중"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 animate-spin text-gray-400"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M22 12a10 10 0 0 0-10-10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          aria-label="검색"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
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

      {trimmedLength === 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500">예시:</span>
          {EXAMPLE_QUERIES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                interactedRef.current = true;
                setQuery(example);
                sessionStorage.setItem(QUERY_STORAGE_KEY, example);
              }}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600 transition-colors hover:border-blue-400 hover:text-blue-700"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {trimmedLength === 1 && (
        <p className="mt-2 text-sm text-gray-500">
          두 글자 이상 입력하면 자동으로 검색됩니다.
        </p>
      )}

      {error && (
        <div className="mt-2 text-sm font-medium text-red-600">{error}</div>
      )}

      {listboxVisible && (
        <ul
          id="address-search-listbox"
          role="listbox"
          aria-label="주소 후보"
          className="absolute z-10 mt-2 max-h-80 w-full overflow-auto rounded-lg border border-border bg-white shadow-dropdown"
        >
          {results.map((item, idx) => (
            <li
              key={item.id}
              id={`address-option-${idx}`}
              role="option"
              aria-selected={idx === highlighted}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              onMouseEnter={() => setHighlighted(idx)}
              className={`cursor-pointer border-b border-gray-100 px-4 py-3 last:border-b-0 ${
                idx === highlighted ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="text-sm font-medium text-gray-950">{item.korean}</div>
              <div className="mt-1 text-xs leading-5 text-gray-500">{item.englishFull}</div>
            </li>
          ))}
        </ul>
      )}

      {open && !loading && results.length === 0 && trimmedLength >= 2 && !error && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-gray-500 shadow-dropdown">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
