import type { Metadata, Viewport } from 'next';
import { Big_Shoulders, Chango, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { CONTACT, SITE } from '@/content';
import { AppShell } from '@/components/AppShell';
import './globals.css';

const bigShoulders = Big_Shoulders({ weight: '900', subsets: ['latin'], display: 'swap', variable: '--font-big-shoulders' });
const chango = Chango({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-chango' });
const plexMono = IBM_Plex_Mono({ weight: ['400', '500', '600'], subsets: ['latin'], display: 'swap', variable: '--font-plex-mono' });
// Fallback local da Satoshi (carregada do Fontshare): métrica parecida, nunca bloqueia o texto
const hanken = Hanken_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-hanken', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Faiber Congelados',
    title: SITE.title,
    description: SITE.description,
    url: '/',
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description },
};

export const viewport: Viewport = {
  themeColor: '#FEFCF8',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Faiber Congelados',
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/images/logo.png`,
  foundingDate: String(CONTACT.foundedYear),
  founders: [
    { '@type': 'Person', name: 'José Moraci Faiber' },
    { '@type': 'Person', name: 'Mariclei Rossi' },
  ],
  telephone: '+55 49 9199-5920',
  email: CONTACT.email,
  address: { '@type': 'PostalAddress', addressLocality: CONTACT.city, addressRegion: CONTACT.stateShort, addressCountry: 'BR' },
  areaServed: 'Oeste de Santa Catarina',
};

/** Aplica ?artboard=1 e ?motion=0 antes da primeira pintura. */
const bootScript = `(function(){try{var q=new URLSearchParams(location.search);var d=document.documentElement;d.dataset.js='1';if(q.get('artboard')==='1')d.dataset.artboard='1';if(q.get('motion')==='0')d.dataset.motion='off';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${bigShoulders.variable} ${chango.variable} ${plexMono.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
