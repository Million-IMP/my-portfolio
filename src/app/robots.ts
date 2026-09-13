import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// 검색 엔진 크롤러 접근 규칙 설정
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
