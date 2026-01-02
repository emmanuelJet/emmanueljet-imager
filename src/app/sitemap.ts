import type { MetadataRoute } from 'next';

import appConfig from '@/config/app.config';

export const dynamic = 'force-static';
const { url } = appConfig;

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: url,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
};

export default sitemap;
