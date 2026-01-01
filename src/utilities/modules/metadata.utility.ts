import type { Metadata } from 'next';

import appConfig from '@/config/app.config';
import meConfig from '@/config/me.config';

import { getIconPath, getVersionedFaviconPath } from '..';

const {
  tagline,
  keywords,
  description,
  url: appUrl,
  name: appName,
} = appConfig;
const { url, name, email, socials, country } = meConfig;

export interface IMetadataImage {
	alt: string;
	url: string | URL;
	width: string | number;
	height: string | number;
}

export const getHomePageMetadata = (): Metadata => {
	const metadataImages = getMetadataImages();
  const arrayedSocials = Object.values(socials);
  const metadataTitle = `${appName} | ${tagline}`;

	const pageMetadata: Metadata = {
    keywords,
    description,
    publisher: name.brand,
		creator: `${name.brand} developers`,
		referrer: 'strict-origin-when-cross-origin',
    manifest: '/manifest.webmanifest',
		metadataBase: new URL(appUrl),
    applicationName: appName,
		category: 'Utility',
		generator: 'Next.js',
    title: metadataTitle,
		alternates: {
			canonical: '/'
		},
		authors: {
			name: name.full,
			url: url
		},
		formatDetection: {
			email: true,
			address: true,
			telephone: true
		},
		robots: {
			index: true,
			follow: true,
			nocache: false,
			noimageindex: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
		},
		icons: {
			shortcut: {
				url: getVersionedFaviconPath(),
				type: 'image/x-icon',
				sizes: '48x48'
			},
			icon: [
        {
          url: getIconPath('icon-192.png'),
          type: 'image/png',
          sizes: '192x192'
        },
        {
          url: getIconPath('icon-512.png'),
          type: 'image/png',
          sizes: '512x512'
        },
      ],
			apple: {
				url: getIconPath('apple-touch-icon.png'),
				type: 'image/png',
				sizes: '180x180'
			}
		},
    appleWebApp: {
      capable: true,
      title: appName,
      statusBarStyle: 'default',
    },
		twitter: {
			card: 'summary_large_image',
			site: name.brand,
			title: metadataTitle,
			images: metadataImages,
			creator: `@${name.brand}`,
			description: description,
		},
		openGraph: {
			type: 'website',
      determiner: 'a',
			locale: 'en',
			url: appUrl,
      ttl: 604800,
      emails: email,
			siteName: appName,
      countryName: country,
			title: metadataTitle,
			images: metadataImages,
			description: description,
      alternateLocale: ['en_US', 'en_GB'],
		},
		other: {
			'og:see_also': arrayedSocials
		},
	};

	return pageMetadata;
}

export const getMetadataImages = (): IMetadataImage[] => {
	return [
    {
			url: 'https://firebasestorage.googleapis.com/v0/b/emmanueljet.appspot.com/o/imager%2Femmanueljet-imager-seo-landscape-image.jpeg?alt=media&token=b6c0116e-4ffc-4455-a031-939dc3a531b3',
			width: 1024,
			height: 576,
			alt: `${appConfig.name} seo banner`
		},
    {
			url: 'https://firebasestorage.googleapis.com/v0/b/emmanueljet.appspot.com/o/brand%2Fseo%2Femmanueljet-seo-banner.jpg?alt=media&token=30005c4b-7b2c-4c25-ac21-a84afcd6c308',
			width: 1024,
			height: 1024,
			alt: `${appConfig.name} seo logo`
		},
		{
			url: 'https://firebasestorage.googleapis.com/v0/b/emmanueljet.appspot.com/o/brand%2Fseo%2Femmanueljet-seo-logo.png?alt=media&token=6e7bee04-514a-4d66-a2d4-a746274aec28',
			width: 512,
			height: 512,
			alt: `${meConfig.name.brand} logo`
		},
	];
}