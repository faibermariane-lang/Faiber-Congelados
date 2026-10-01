import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Chango } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/content";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
  variable: "--font-bricolage",
});

// Fonte retrô usada apenas nos títulos do cardápio.
const chango = Chango({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-chango",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: "/images/fundador-pastel.jpg", width: 864, height: 1184, alt: "Pastel Faiber" }],
  },
  icons: { icon: "/images/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#6B1420",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#empresa`,
  name: site.nome,
  description: site.seo.description,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  image: `${site.url}/images/fundador-pastel.jpg`,
  email: site.email,
  telephone: `+${site.whatsapp.numero}`,
  foundingDate: String(site.fundacao),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.cidade,
    addressRegion: site.uf,
    addressCountry: "BR",
  },
  areaServed: "Oeste de Santa Catarina",
  ...(site.instagram ? { sameAs: [site.instagram] } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${chango.variable}`}>
      <head>
        {/* Satoshi vem do Fontshare, que não é atendido pelo next/font. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
