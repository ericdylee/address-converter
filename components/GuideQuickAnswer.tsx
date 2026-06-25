type QuickAnswerRow = {
  label: string;
  value: string;
  note?: string;
};

type Props = {
  title?: string;
  rows: QuickAnswerRow[];
};

export default function GuideQuickAnswer({ title = "빠른 답", rows }: Props) {
  return (
    <aside className="mb-6 rounded-lg border border-blue-100 bg-blue-50/70 p-5 shadow-field sm:p-6">
      <h2 className="text-base font-semibold text-blue-950">{title}</h2>
      <dl className="mt-4 divide-y divide-blue-100 rounded-lg border border-blue-100 bg-white">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 px-4 py-3 sm:grid-cols-[150px_1fr] sm:gap-4"
          >
            <dt className="text-sm font-semibold text-blue-900">{row.label}</dt>
            <dd className="min-w-0 text-sm leading-6 text-gray-800">
              <span className="break-words font-mono text-gray-950">
                {row.value}
              </span>
              {row.note && (
                <span className="mt-0.5 block text-xs leading-5 text-gray-500">
                  {row.note}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
