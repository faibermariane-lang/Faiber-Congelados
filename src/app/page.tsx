import { Header } from '@/components/Header';
import { Hero } from '@/components/hero/Hero';
import { ProductRibbon } from '@/components/ProductRibbon';
import { SectionStub } from '@/components/SectionStub';
import { getImageAvailability } from '@/lib/images.server';

export default function Home() {
  const images = getImageAvailability();
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero images={images} />
        <ProductRibbon images={images} />
        <SectionStub id="historia" title="Nossa história" phase={2} tone="creme" />
        <SectionStub id="comanda" title="Comanda da casa" phase={3} tone="offwhite" />
        <SectionStub id="fundadores" title="Fundadores" phase={4} tone="creme" />
        <SectionStub id="contato" title="Contato" phase={4} tone="offwhite" />
      </main>
    </>
  );
}
