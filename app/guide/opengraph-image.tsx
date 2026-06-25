import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "영문 주소 작성법과 해외직구 배송지 입력법을 모은 사용 가이드 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "영문 주소 사용 가이드",
    subtitle: "한국·일본 주소를 해외 양식에 맞게 쓰는 법을 예시로 확인하세요.",
    badge: "Guide",
  });
}
