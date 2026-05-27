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
      <div className="flex-1 border border-gray-200 rounded-lg px-4 py-3 bg-white">
        <div className="text-xs text-gray-500 font-medium mb-1">{label}</div>
        <div className={`text-sm break-all ${hasValue ? "text-gray-900" : "text-gray-300"}`}>
          {hasValue ? value : placeholder ?? "—"}
        </div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        disabled={!hasValue}
        className={`px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap min-w-[80px] ${
          !hasValue
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : copied
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {copied ? "복사됨!" : "복사"}
      </button>
    </div>
  );
}
