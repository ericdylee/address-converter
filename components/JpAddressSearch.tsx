"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { JpAddressResult, JpSearchResponse } from "@/lib/types";

type Props = {
  // block = 사용자가 직접 입력한 번지·건물번호 (예: "1-1-1")
  onSelect: (result: JpAddressResult, block: string) => void;
};

// 결과 페이지에서 돌아왔을 때 입력값을 복원하기 위한 저장 키 (탭 닫으면 사라짐)
const ZIP_STORAGE_KEY = "jp-address-zip";
const BLOCK_STORAGE_KEY = "jp-address-block";

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
  const zipInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  // 사용자가 직접 입력/포커스했는지. 복원된 값으로 자동 조회될 때
  // 드롭다운이 멋대로 열리지 않게 하기 위한 플래그.
  const interactedRef = useRef(false);

  const digits = zip.replace(/\D/g, "");

  const runSearch = useCallback(async (zipDigits: string) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/jp-address?zip=${zipDigits}`, {
        signal: ctrl.signal,
      });
      const data = (await res.json()) as JpSearchResponse & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "조회 중 오류가 발생했습니다.");
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

  // 결과 페이지에서 돌아온 경우 직전 입력값 복원.
  // sessionStorage는 브라우저에만 있어 서버 렌더링과 같은 화면을 먼저 그린 뒤
  // 마운트 후에 복원해야 한다 — 이 한 번의 setState는 의도된 것.
  useEffect(() => {
    const savedZip = sessionStorage.getItem(ZIP_STORAGE_KEY);
    const savedBlock = sessionStorage.getItem(BLOCK_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedZip) setZip(savedZip);
    if (savedBlock) setBlock(savedBlock);
  }, []);

  useEffect(() => {
    // 7자리가 다 모였을 때만 조회한다. (7자리 미만으로 지우는 경우의 초기화는 onChange에서 처리)
    if (digits.length !== 7) return;

    const handle = setTimeout(() => runSearch(digits), 300);
    return () => clearTimeout(handle);
  }, [digits, runSearch]);

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

  // 돋보기 버튼: debounce를 기다리지 않고 즉시 조회. 7자리가 아니면 입력란으로 포커스만.
  function handleSearchClick() {
    interactedRef.current = true;
    if (digits.length !== 7) {
      zipInputRef.current?.focus();
      return;
    }
    runSearch(digits);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // 드롭다운이 닫혀 있을 때 Enter = 즉시 조회
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

  const listboxVisible = open && results.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <label
        htmlFor="jp-zip-search"
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        일본 우편번호 (7자리)
      </label>
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <input
            ref={zipInputRef}
            id="jp-zip-search"
            type="text"
            inputMode="numeric"
            role="combobox"
            aria-expanded={listboxVisible}
            aria-controls="jp-zip-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              listboxVisible ? `jp-zip-option-${highlighted}` : undefined
            }
            value={zip}
            onChange={(e) => {
              interactedRef.current = true;
              setZip(e.target.value);
              sessionStorage.setItem(ZIP_STORAGE_KEY, e.target.value);
              setError(null);
              if (e.target.value.replace(/\D/g, "").length < 7) {
                setResults([]);
                setOpen(false);
              }
            }}
            onFocus={() => {
              interactedRef.current = true;
              if (results.length > 0) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="예: 100-0005"
            className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-[15px] text-gray-950 shadow-sm outline-none transition placeholder:text-gray-400 hover:border-blue-500 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100"
            autoComplete="off"
          />
          {loading && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              role="status"
              aria-label="조회 중"
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

      {digits.length > 0 && digits.length < 7 && (
        <p className="mt-2 text-sm text-gray-500">
          7자리를 모두 입력하면 자동으로 조회됩니다. ({digits.length}/7)
        </p>
      )}

      <div className="mt-3">
        <label
          htmlFor="jp-block"
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          번지·건물번호 (선택)
        </label>
        <input
          id="jp-block"
          type="text"
          value={block}
          onChange={(e) => {
            setBlock(e.target.value);
            sessionStorage.setItem(BLOCK_STORAGE_KEY, e.target.value);
          }}
          placeholder="예: 1-1-1 또는 1-1-1 〇〇빌딩 5F"
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-[15px] text-gray-950 shadow-sm outline-none transition placeholder:text-gray-400 hover:border-blue-500 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-100"
          autoComplete="off"
        />
        <p className="mt-2 text-xs leading-5 text-gray-500">
          우편번호로 동네까지 채워집니다. 丁目·番地·号(예: 1-1-1)와 건물명은 여기에 입력하세요.
        </p>
      </div>

      {error && <div className="mt-2 text-sm font-medium text-red-600">{error}</div>}

      {listboxVisible && (
        <ul
          id="jp-zip-listbox"
          role="listbox"
          aria-label="주소 후보"
          className="absolute z-10 mt-2 max-h-80 w-full overflow-auto rounded-lg border border-border bg-white shadow-dropdown"
        >
          {results.map((item, idx) => (
            <li
              key={item.id}
              id={`jp-zip-option-${idx}`}
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
              <div className="text-sm font-medium text-gray-950">{item.japanese}</div>
              <div className="mt-1 text-xs leading-5 text-gray-500">{item.englishLabel}</div>
            </li>
          ))}
        </ul>
      )}

      {open && !loading && results.length === 0 && digits.length === 7 && !error && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-gray-500 shadow-dropdown">
          <p className="font-medium text-gray-700">해당 우편번호를 찾을 수 없습니다.</p>
          <p className="mt-1 text-xs leading-5">
            숫자 7자리를 다시 확인해 주세요. 우편번호는 일본 우편(Japan Post)
            사이트나 받는 분에게 확인할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
