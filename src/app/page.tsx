import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <WhatsAppFlutuante />
    </>
  );
}
