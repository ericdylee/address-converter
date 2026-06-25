import Link from "next/link";

type Props = {
  label?: string;
};

export default function GuideCta({
  label = "내 주소로 칸별 영문주소 만들기",
}: Props) {
  return (
    <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/70 p-5 text-center">
      <p className="text-sm text-blue-900">
        <Link href="/" className="font-semibold text-blue-700 hover:underline">
          {label} →
        </Link>
      </p>
    </div>
  );
}
