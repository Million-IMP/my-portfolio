import type { MetadataRoute } from 'next';

// 검색 엔진 크롤러 접근 규칙 설정
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://my-portfolio-teal-zeta-57.vercel.app';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
