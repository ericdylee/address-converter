import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "일본 주소를 영문 주소로 쓰는 법 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "일본 주소, 영문으로 쓰는 법",
    subtitle: "번지, 동네, 시·구, 도도부현, 우편번호 순서를 예시로 확인하세요.",
    badge: "Japan Guide",
    rows: [
      { label: "Street", value: "1-1-1 Marunouchi" },
      { label: "City", value: "Chiyoda-ku" },
      { label: "Prefecture", value: "Tokyo" },
      { label: "ZIP", value: "100-0005" },
    ],
  });
}
