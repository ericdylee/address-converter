import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "아파트 동·호수 영문 표기 정리 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "아파트 동·호수, 건물명 영문 표기",
    subtitle: "101동 502호, 3층, 오피스텔·빌라 건물명을 어떤 규칙으로 쓰는지 정리했습니다.",
    badge: "Korea Guide",
    rows: [
      { label: "101동 502호", value: "101-502" },
      { label: "3층", value: "3F" },
      { label: "가동 101호", value: "Ga-101" },
      { label: "넣는 칸", value: "Address Line 2" },
    ],
  });
}
