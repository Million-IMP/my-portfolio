import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// 검색 엔진 크롤러를 위한 사이트맵 자동 생성
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ];
}
