import type { MetadataRoute } from 'next';

import appConfig from '@/config/app.config';
import { getMetadataImages } from '@/utilities';

export const dynamic = 'force-static';
const { url } = appConfig;

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: url,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
      images: getMetadataImages().map((image) => image.url.toString()),
    },
  ];
};

export default sitemap;
