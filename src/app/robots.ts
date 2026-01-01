import type { MetadataRoute } from 'next';

import appConfig from '@/config/app.config';

export const dynamic = 'force-static';
const { url } = appConfig;

const robots = (): MetadataRoute.Robots => {
	return {
		rules: {
			userAgent: '*',
			allow: [
				'/',
				'/*.png?*$',
				'/*.jpg?*$',
				'/*.svg?*$',
				'/*.ico?*$'
			],
			disallow: [
				'/404',
				'/500'
			],
			crawlDelay: 1,
		},
		sitemap: `${url}/sitemap.xml`,
		host: url,
	};
};

export default robots;
