import { MotionConfig } from 'motion/react';
import { CompanyStory } from './components/CompanyStory';
import { Contact } from './components/Contact';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { FounderSection } from './components/FounderSection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImpactBlock } from './components/ImpactBlock';
import { PastelHistory } from './components/PastelHistory';
import { ProductMarquee } from './components/ProductMarquee';
import { ProductMenu } from './components/ProductMenu';
import { Timeline } from './components/Timeline';
import { Values } from './components/Values';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {/* impacto → respiro → informação → imagem → história → produto → emoção → conversão */}
        <Hero />
        <ProductMarquee />
        <PastelHistory />
        <CompanyStory />
        <Timeline />
        <Values />
        <ProductMenu />
        <ImpactBlock />
        <FounderSection />
        <ContactCTA />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
