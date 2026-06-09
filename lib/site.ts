// 사이트 전역에서 쓰는 기본 설정값(단일 출처).
//
// 배포 도메인이 정해지면 환경변수 NEXT_PUBLIC_SITE_URL 하나만 바꾸면
// 사이트맵·메타데이터·문의 이메일이 모두 그 도메인 기준으로 자동 갱신된다.
// (Vercel 프로젝트 Settings → Environment Variables 에 등록 후 재배포)

/** 사이트 대표 이름 (브라우저 탭 제목·OpenGraph 등에 사용) */
export const SITE_NAME = "한글·일본 주소 → 영문 변환기";

/**
 * 사이트 기본 URL.
 * 환경변수 NEXT_PUBLIC_SITE_URL 이 없으면 현재 Vercel 주소로 폴백한다.
 * 끝에 붙은 슬래시(/)는 제거해서 `${SITE_URL}/about` 처럼 안전하게 이어붙일 수 있게 한다.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://address-converter-eta.vercel.app"
).replace(/\/+$/, "");

/**
 * 공개 문의 이메일.
 * SITE_URL 의 호스트에서 맨 앞 www 를 떼어 `contact@<도메인>` 형태로 만든다.
 * 즉 NEXT_PUBLIC_SITE_URL 만 커스텀 도메인으로 바꾸면 문의 이메일도 같이 바뀐다.
 * (예: https://example.com → contact@example.com)
 */
export const CONTACT_EMAIL = `contact@${new URL(SITE_URL).host.replace(/^www\./, "")}`;
