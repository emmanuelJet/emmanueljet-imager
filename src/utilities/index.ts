import appConfig from '@/config/app.config';

export * from './modules/schema.utility';
export * from './modules/metadata.utility';

const { url, version, environment } = appConfig;

export const isProduction = (): boolean => {
	return environment === 'production';
}

export const getIconPath = (
	relativePath: string
): string => {
	const brandIconBaseUrl = '/icons';
	return `${brandIconBaseUrl}/${relativePath}?v=${version}`;
}

export const getScreenshotPath = (
	relativePath: string
): string => {
	const screenshotBaseUrl = `${url}/screenshots`;
	return `${screenshotBaseUrl}/${relativePath}?v=${version}`;
}

export const getVersionedFaviconPath = (): string => {
  return `/favicon.ico?v=${version}`;
}

export const cn = (...inputs: (string | undefined | null | false)[]) => {
  const classes = inputs.filter(Boolean).join(' ').trim().split(/\s+/);
  return [...new Set(classes)].join(' ');
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
