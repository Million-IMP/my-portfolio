// 배포 환경에 따라 바뀌는 사이트 base URL의 단일 소스.
// 실도메인이 정해지면 NEXT_PUBLIC_BASE_URL 값만 바꾸면 된다.
const FALLBACK_URL = "https://my-portfolio-teal-zeta-57.vercel.app";

const rawBaseUrl = (process.env.NEXT_PUBLIC_BASE_URL || FALLBACK_URL).trim();

// 스킴 누락(`jk.dev`) 시 new URL()이 throw하며 빌드가 깨지는 것을 방지하고,
// 끝에 붙은 슬래시(`https://jk.dev/`)로 sitemap/robots URL에 `//`가 생기는 것을 방지
const withScheme = /^https?:\/\//.test(rawBaseUrl) ? rawBaseUrl : `https://${rawBaseUrl}`;

export const SITE_URL = withScheme.replace(/\/+$/, "");
