import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const defaultDescription =
  "한글·일본 주소를 행정안전부·우편번호 공식 데이터 기반으로 영문 주소(Street/City/State/Postal)로 변환하고 칸별로 복사하세요. 해외직구·해외 배송·유학 서류 작성에 유용합니다.";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_NAME,
      url: absoluteUrl(path),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
