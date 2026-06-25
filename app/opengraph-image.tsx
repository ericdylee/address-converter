import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "한글·일본 주소를 영문 주소로 변환하는 주소 변환기 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "한글·일본 주소를 영문 주소로",
    subtitle: "해외 사이트 입력란에 맞춰 Street, City, State, ZIP을 칸별로 복사하세요.",
  });
}
