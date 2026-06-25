import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "영문 주소 변환할 때 자주 틀리는 실수 모음 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "영문 주소, 자주 틀리는 실수 7가지",
    subtitle: "City·State 자리, 동/호수, 우편번호, 국가까지 올바른 예로 확인하세요.",
    badge: "Korea Guide",
  });
}
