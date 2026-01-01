import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';

import '@/styles/globals.css';
import { AppProvider } from '@/providers/AppProvider';
import { getHomePageMetadata, getHomePageSchema } from '@/utilities';

export const metadata: Metadata = getHomePageMetadata();

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fira = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
});

const homePageSchema = getHomePageSchema();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${fira.variable} antialiased`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
