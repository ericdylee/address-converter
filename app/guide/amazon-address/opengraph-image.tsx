import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "아마존 한국 주소 입력법 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "아마존 한국 주소 입력법",
    subtitle: "실제 화면으로 보는 City·Province 구분과 개인통관고유부호까지.",
    badge: "Amazon",
    rows: [
      { label: "Address", value: "100 Inha-ro" },
      { label: "City", value: "Michuhol-gu" },
      { label: "Province", value: "Incheon" },
      { label: "Zip Code", value: "22212" },
    ],
  });
}
