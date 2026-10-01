import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Chango } from "next/font/google";
import "./globals.css";
import { seo, contato } from "@/content";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { IntroProvider } from "@/components/motion/IntroContext";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/layout/Cursor";
import { Header } from "@/components/layout/Header";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
  variable: "--font-bricolage",
});

// Fonte retrô: usada apenas no título do Cardápio
const chango = Chango({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-chango" });

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Faiber Congelados",
    title: seo.title,
    description: seo.description,
    images: [{ url: "/images/pasteis-pronta-entrega.webp", width: 1080, height: 1350, alt: "Pastéis Faiber Congelados" }],
  },
  icons: { icon: "/images/logo.png" },
};

export const viewport: Viewport = { themeColor: "#6B1420" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Faiber Congelados",
  description: seo.description,
  url: seo.url,
  email: contato.email,
  telephone: "+55-49-9199-5920",
  foundingDate: "2010",
  founder: [{ "@type": "Person", name: "José Moraci Faiber" }, { "@type": "Person", name: "Mariclei Rossi" }],
  address: { "@type": "PostalAddress", addressLocality: "Chapecó", addressRegion: "SC", addressCountry: "BR" },
  areaServed: "Oeste de Santa Catarina",
  logo: `${seo.url}/images/logo.png`,
  image: `${seo.url}/images/pasteis-pronta-entrega.webp`,
};

// Roda antes da pintura: esconde o preloader para quem já viu (ou pediu menos movimento)
const introScript = `try{if(sessionStorage.getItem("faiber-intro-visto")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${chango.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-bordo focus:px-5 focus:py-3 focus:text-branco">
          Pular para o conteúdo
        </a>
        <IntroProvider>
          <SmoothScroll>
            <Preloader />
            <Cursor />
            <Header />
            {children}
          </SmoothScroll>
        </IntroProvider>
      </body>
    </html>
  );
}
