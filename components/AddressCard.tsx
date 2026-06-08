"use client";

import { useState } from "react";

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
        <div className="mb-1 text-[11px] font-semibold uppercase text-gray-500">{label}</div>
        <div className={`break-all text-sm leading-6 ${hasValue ? "text-gray-950" : "text-gray-300"}`}>
          {hasValue ? value : placeholder ?? "—"}
        </div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        disabled={!hasValue}
        className={`min-w-[84px] rounded-lg px-4 text-sm font-semibold transition-colors ${
          !hasValue
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : copied
              ? "bg-emerald-600 text-white"
              : "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
        }`}
      >
        {copied ? "복사됨!" : "복사"}
      </button>
    </div>
  );
}
