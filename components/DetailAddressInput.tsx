"use client";

import { romanizeDetail } from "@/lib/romanize";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DetailAddressInput({ value, onChange }: Props) {
  const preview = romanizeDetail(value);

  return (
    <div>
      <label htmlFor="detail-address" className="block text-sm font-medium text-gray-700 mb-2">
        상세주소 (선택 — 동/호/층)
      </label>
      <input
        id="detail-address"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예: 101동 502호"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        autoComplete="off"
      />
      {preview && (
        <div className="mt-2 text-xs text-gray-500">
          영문: <span className="text-gray-700 font-mono">{preview}</span>
        </div>
      )}
    </div>
  );
}
