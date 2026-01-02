import meConfig from '@/config/me.config';
import appConfig from '@/config/app.config';

const {
  url,
  version,
  tagline,
  keywords,
  launchedAt,
  description,
  name: appName
} = appConfig;
const { name, email, country, socials, url: authorUrl } = meConfig;

export const getHomePageSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    url,
    description,
    name: appName,
    headline: tagline,
    image: schemaImageObject(),
    license: 'https://opensource.org/licenses/AGPL-3.0',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    permissions: 'Internet Access, Read and Write Files',
    applicationCategory: 'UtilityApplication',
    applicationSubCategory: 'Image Processing',
    keywords: keywords.join(', '),
    datePublished: launchedAt,
    softwareVersion: version,
    countryOfOrigin: country,
    operatingSystem: 'Any',
    downloadUrl: url,
    installUrl: url,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      honorificPrefix: 'Mr.',
      givenName: name.first,
      familyName: name.last,
      additionalName: name.middle,
      alternateName: name.nickname,
      gender: 'GenderType::Male',
      jobTitle: 'Software Engineer',
      email: `mailto:${email}`,
      nationality: {
        '@type': 'Country',
        name: country,
        alternateName: 'NG'
      },
			name: name.full,
			url: authorUrl,
      sameAs: [
        ...Object.values(socials)
      ]
    },
    maintainer: {
      '@type': 'Organization',
      legalName: `${name.brand} innovative solutions limited`,
      name: name.brand,
      url: authorUrl,
      sameAs: [
        ...Object.values(socials)
      ]
    },
    publisher: {
      '@type': 'Organization',
      legalName: `${name.brand} innovative solutions limited`,
      name: name.brand,
      url: authorUrl,
      sameAs: [
        ...Object.values(socials)
      ]
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '524'
    },
    featureList: [
      'Format Conversion (WebP, AVIF, PNG, JPEG)',
      'Client-side Processing',
      'Batch Processing',
      'Image Compression',
      'Privacy Focused',
      'Offline Capable'
    ],
    screenshot: [
      `${url}/screenshots/desktop-screenshot-1.png`,
      `${url}/screenshots/desktop-screenshot-2.png`,
      `${url}/screenshots/desktop-screenshot-3.png`,
      `${url}/screenshots/mobile-screenshot-1.png`,
      `${url}/screenshots/mobile-screenshot-2.png`,
      `${url}/screenshots/mobile-screenshot-3.png`,
      `${url}/screenshots/mobile-screenshot-4.png`,
    ],
  }
}

export const schemaImageObject = () => {
	return {
		'@type': 'ImageObject',
		name: `${appName} SEO Banner`,
		description: `${appName} seo banner`,
    caption: `${appName} seo banner`,
		contentUrl: 'https://firebasestorage.googleapis.com/v0/b/emmanueljet.appspot.com/o/imager%2Femmanueljet-imager-seo-landscape-image.jpeg?alt=media&token=b6c0116e-4ffc-4455-a031-939dc3a531b3',
		encodingFormat: 'image/jpeg',
		copyrightNotice: name.brand,
		acquireLicensePage: authorUrl,
		creditText: name.brand,
		license: authorUrl,
		height: '576',
		width: '1024',
		creator: {
			'@type': 'Person',
      honorificPrefix: 'Mr.',
      givenName: name.first,
      familyName: name.last,
      additionalName: name.middle,
      alternateName: name.nickname,
      gender: 'GenderType::Male',
      nationality: 'NG',
			name: name.full,
			url: authorUrl
		}
	};
}