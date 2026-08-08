import type { Metadata, Viewport } from 'next';
import { Archivo, Literata } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Analytics } from '@/components/Analytics';
import { SITE } from '@/lib/site';
import { organizationSchema, websiteSchema } from '@/lib/schema';

// Türkçe diacritics (ı İ ş ğ ç ö ü) `latin-ext` subset'inde — ikisi de
// zorunlu, aksi hâlde tarayıcı ı/ş için fallback fonta düşer ve satır
// içinde iki farklı font karışır.
const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-archivo',
  axes: ['wdth'],
  display: 'swap',
});

const literata = Literata({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-literata',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Miami Gezi Rehberi — Türkçe Miami seyahat rehberi | miamigezi",
    template: '%s | miamigezi',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: 'https://miamili.com' }],
  publisher: SITE.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: 'Miami Gezi Rehberi — Türkçe Miami seyahat rehberi',
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang={SITE.lang}
      className={`${archivo.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), websiteSchema()]),
          }}
        />
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-none focus:bg-ink focus:px-4 focus:py-2 focus:font-display focus:text-small focus:text-paper"
        >
          İçeriğe atla
        </a>
        <SiteHeader />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: '#f7f4ef',
  width: 'device-width',
  initialScale: 1,
};
