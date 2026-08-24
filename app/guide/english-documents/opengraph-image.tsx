import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "영문 주소가 필요한 서류 총정리 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "영문 주소가 필요한 서류 총정리",
    subtitle: "비자·유학 원서·해외 계좌·증명서까지, 표기를 통일하는 요령을 정리했습니다.",
    badge: "Documents",
  });
}
