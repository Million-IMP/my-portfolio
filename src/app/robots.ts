import type { MetadataRoute } from 'next';

// 검색 엔진 크롤러 접근 규칙 설정
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://jk.dev';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
