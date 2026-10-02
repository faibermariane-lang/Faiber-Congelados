export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { SITE } from '@/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
