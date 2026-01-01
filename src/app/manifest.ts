import type { MetadataRoute } from 'next';

import appConfig from '@/config/app.config';
import { getIconPath, getScreenshotPath } from '@/utilities';

export const dynamic = 'force-static';
const { name, description } = appConfig;

const manifest = (): MetadataRoute.Manifest => {
  return {
    name,
    lang: 'en',
    short_name: 'emmanueljet',
    description,
    start_url: '/',
    display: 'standalone',
    display_override: ['fullscreen', 'minimal-ui'],
    orientation: 'portrait-primary',
    background_color: '#1C1E21',
    categories: ['Utility'],
    theme_color: '#8B15BA',
    icons: [
      {
        src: getIconPath('favicon-16x16.png'),
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: getIconPath('favicon-32x32.png'),
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: getIconPath('icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: getIconPath('icon-192-maskable.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: getIconPath('icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: getIconPath('icon-512-maskable.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: getScreenshotPath('desktop-screenshot-1.png'),
        form_factor: 'wide',
        sizes: '2560x1600',
        type: 'image/png',
      },
      {
        src: getScreenshotPath('desktop-screenshot-2.png'),
        form_factor: 'wide',
        sizes: '2560x1600',
        type: 'image/png',
      },
      {
        src: getScreenshotPath('desktop-screenshot-3.png'),
        form_factor: 'wide',
        sizes: '2560x1600',
        type: 'image/png',
      },
      {
        src: getScreenshotPath('mobile-screenshot-1.png'),
        form_factor: 'narrow',
        sizes: '1442x3202',
        type: 'image/png',
      },
      {
        src: getScreenshotPath('mobile-screenshot-2.png'),
        form_factor: 'narrow',
        sizes: '1442x3202',
        type: 'image/png',
      },
      {
        src: getScreenshotPath('mobile-screenshot-3.png'),
        form_factor: 'narrow',
        sizes: '1442x3202',
        type: 'image/png',
      },
      {
        src: getScreenshotPath('mobile-screenshot-4.png'),
        form_factor: 'narrow',
        sizes: '1442x3202',
        type: 'image/png',
      },
    ],
  };
};

export default manifest;
