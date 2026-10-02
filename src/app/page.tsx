import { Comanda } from '@/components/Comanda';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Founders } from '@/components/Founders';
import { Header } from '@/components/Header';
import { Hero } from '@/components/hero/Hero';
import { History } from '@/components/History';
import { ProductRibbon } from '@/components/ProductRibbon';
import { getImageAvailability } from '@/lib/images.server';

export default function Home() {
  const images = getImageAvailability();
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero images={images} />
        <ProductRibbon images={images} />
        <History images={images} />
        <Comanda />
        <Founders images={images} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
