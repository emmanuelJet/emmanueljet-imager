import packageInfo from '../../package.json';

export interface IAppConfig {
  name: string;
  url: string;
  version: string;
  tagline: string;
  launchedAt: string;
  description: string;
  environment: string;
  keywords: Array<string>;
};

const appConfig: IAppConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'emmanueljet imager',
  version: process.env.NEXT_PUBLIC_APP_VERSION || packageInfo.version,
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://imager.emmanueljet.com',
  tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || 'premium image optimization',
  environment: process.env.NEXT_PUBLIC_APP_ENVIRONMENT || process.env.NODE_ENV,
  launchedAt: process.env.NEXT_PUBLIC_APP_LAUNCHED_AT || '2026-01-01T00:00:00.000Z',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'High-performance AI-ready image compression and conversion tool. Compress AVIF, WebP, PNG, and JPEG images with ease.',
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS ? process.env.NEXT_PUBLIC_APP_KEYWORDS.split(', ') : [
    'image optimization',
    'image optimisation',
    'image compression',
    'compression tool',
    'image optimizer',
    'image optimiser',
    'webp converter',
    'avif converter',
    'compress jpeg',
    'compress png',
    'JET',
    'emmanueljet',
    'Emmanuel Joseph',
    'Emmanuel Joseph (JET)',
  ],
}

export default appConfig;
