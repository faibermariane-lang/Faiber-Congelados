import { bootScript } from "@/lib/env";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ArtboardBridge } from "@/components/site/ArtboardBridge";
import { MotionProvider } from "@/components/site/MotionProvider";
import { Preloader } from "@/components/site/Preloader";
import { Header } from "@/components/site/Header";
import { Cursor } from "@/components/site/Cursor";
import { Grain } from "@/components/site/Grain";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <MotionProvider>
        <a
          href="#conteudo"
          className="label-mono fixed left-4 top-4 z-[100] -translate-y-24 bg-bordo px-4 py-3 text-offwhite focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Preloader />
        <Header />
        <main id="conteudo">{children}</main>
        <WhatsAppFloat />
        <ScrollProgress />
        <Cursor />
        <Grain />
        <SmoothScroll />
        <ArtboardBridge />
      </MotionProvider>
    </>
  );
}
