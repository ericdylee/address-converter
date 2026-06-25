import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "한글 주소를 영문 주소로 쓰는 법 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "한글 주소, 영문으로 쓰는 법",
    subtitle: "Address Line 1/2, City, State, ZIP 칸에 넣을 값을 한 번에 확인하세요.",
    badge: "Korea Guide",
  });
}
