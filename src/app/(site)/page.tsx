import { Hero } from "@/components/sections/Hero";
import { SectionStub } from "@/components/sections/SectionStub";
import { contact, manifesto, order, process, products, site, story, timeline } from "@/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.seo.description,
  url: site.url,
  image: `${site.url}${site.seo.ogImage}`,
  logo: `${site.url}/images/logo.png`,
  telephone: site.whatsapp.display,
  email: site.email,
  foundingDate: String(site.since),
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.state, addressCountry: "BR" },
  areaServed: "Oeste de Santa Catarina",
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <SectionStub id="esteira" label="Esteira tipográfica" title="Pastéis — Mini pizzas — Coxinhas" phase={2} />
      <SectionStub id="manifesto" label={manifesto.label} title="Nossa essência." phase={2} tone="creme" />
      <SectionStub id="evolucao" label={timeline.label} title={timeline.title} phase={2} />
      <SectionStub id="processo" label={process.label} title={process.title} phase={2} tone="creme" />
      <SectionStub id="produtos" label={products.label} title={products.title} phase={3} />
      <SectionStub id="cardapio" label={order.label} title={order.title} phase={3} tone="creme" />
      <SectionStub id="historia" label={story.label} title={story.title} phase={4} />
      <SectionStub id="contato" label={contact.label} title={contact.title} phase={4} tone="creme" />
      <SectionStub id="rodape" label="Rodapé" title="Sabor de casa, qualidade de fábrica." phase={4} tone="creme" />
    </>
  );
}
