import { createOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "전국 시·도 영문 표기 정리표 공유 이미지";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "전국 시·도 영문 표기 정리표",
    subtitle: "서울·부산·경기도 등 16개 시·도의 공식 영문 표기를 한 번에.",
    badge: "Korea Guide",
    rows: [
      { label: "서울특별시", value: "Seoul" },
      { label: "부산광역시", value: "Busan" },
      { label: "경기도", value: "Gyeonggi-do" },
      { label: "제주특별자치도", value: "Jeju-do" },
    ],
  });
}
