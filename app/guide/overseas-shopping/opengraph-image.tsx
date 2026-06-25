import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "해외직구 배송지에 한국·일본 주소를 넣는 법 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "해외직구 배송지 입력법",
    subtitle: "Address Line 1/2, City, State, ZIP, Country 칸별 예시를 확인하세요.",
    badge: "Shopping Guide",
  });
}
