import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <MarqueeStrip />
      {/* Próximas seções: esteira de fotos, propósito, produtos, cardápio, simulador, destaque, história, contato e rodapé */}
      <div className="h-[60vh]" />
    </main>
  );
}
