import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "국제우편 EMS 영문 주소와 라벨 작성법 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "국제우편·EMS 라벨 작성법",
    subtitle: "보내는 사람·받는 사람 주소, 세관신고서(CN22/CN23), 반품 라벨까지.",
    badge: "EMS",
    rows: [
      { label: "Street", value: "165 Convensia-daero" },
      { label: "City", value: "Yeonsu-gu" },
      { label: "State", value: "Incheon" },
      { label: "ZIP", value: "21998" },
    ],
  });
}
