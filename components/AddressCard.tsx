"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
};

export default function AddressCard({ label, value, placeholder }: Props) {
  const [copied, setCopied] = useState(false);
  const hasValue = value.trim().length > 0;

  async function handleCopy() {
    if (!hasValue) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <div className="flex items-stretch gap-2">
      <div className="flex-1 rounded-lg border border-border bg-white px-4 py-3 shadow-field">
        <div className="mb-1 text-xs font-semibold uppercase text-gray-500">{label}</div>
        <div className={`break-all text-base leading-6 ${hasValue ? "text-gray-950" : "text-gray-300"}`}>
          {hasValue ? value : placeholder ?? "—"}
        </div>
      </div>
      {/* 보조 액션이라 고스트 스타일 — 진한 파랑은 "전체 복사" 하나만 (버튼 위계) */}
      <button
        type="button"
        onClick={handleCopy}
        disabled={!hasValue}
        aria-live="polite"
        className={`flex min-w-[84px] items-center justify-center gap-1.5 rounded-lg border px-4 text-sm font-semibold transition-colors ${
          !hasValue
            ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300"
            : copied
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-gray-300 bg-white text-gray-700 shadow-field hover:border-blue-500 hover:text-blue-700"
        }`}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}
