export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { SITE } from '@/content';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: '/artboard' }], sitemap: `${SITE.url}/sitemap.xml` };
}
