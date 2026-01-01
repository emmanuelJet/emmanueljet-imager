import Link from 'next/link';

import meConfig from '@/config/me.config';
import appConfig from '@/config/app.config';

export const Footer = () => {
  const { name, url } = meConfig;
  const { name: appName } = appConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-6 text-center text-sm text-foreground/60'>
      <p>
        &copy; {currentYear} {appName}. Built by{' '}
        <Link
          href={`${url}`}
          target='blank'
          rel='opener'
          className='font-medium text-brand-purple hover:text-brand-orange transition-colors duration-200'
        >
          {name.brand}
        </Link>
        .
      </p>
    </footer>
  );
};
