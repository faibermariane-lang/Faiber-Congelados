import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CONTACT, FLAVORS, PRODUCTS, type Product } from '../content/site';
import { cn } from '../lib/cn';
import { whatsappHref } from '../lib/contact';
import { Picture } from './ui/Picture';
import { PhotoPlaceholder } from './ui/PhotoPlaceholder';
import { Reveal, RevealItem } from './ui/Reveal';
import { Sketch } from './ui/Sketch';

/** Pequena estrela de quatro pontas, ornamento de cardápio */
function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('size-3', className)} aria-hidden="true" fill="currentColor">
      <path d="M8 0c.6 4.2 3.4 7.4 8 8-4.6.6-7.4 3.8-8 8-.6-4.2-3.4-7.4-8-8 4.6-.6 7.4-3.8 8-8Z" />
    </svg>
  );
}

function MenuCard({ product, featured, index }: { product: Product; featured: boolean; index: number }) {
  const message = `Olá! Tenho interesse em ${product.short} da Faiber Congelados (pacote com ${product.units}). Pode me passar sabores e condições?`;
  return (
    <motion.article
      aria-labelledby={`produto-${product.id}`}
      className={cn(
        'group relative flex w-[82vw] max-w-[22rem] shrink-0 snap-start flex-col border border-bordo/25 bg-paper p-4 transition-[border-color,background-color,box-shadow] duration-500 ease-editorial hover:border-bordo focus-within:border-bordo md:w-auto md:max-w-none md:p-5',
        'can-hover:hover:shadow-[0_24px_50px_-30px_rgba(76,12,22,0.45)]',
        featured ? 'md:col-span-3' : 'md:col-span-2',
      )}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* cabeçalho do item */}
      <div className="flex items-center gap-3 pb-3">
        <span className="font-condensed text-sm font-semibold tracking-[0.18em] text-bordo transition-colors duration-500 group-hover:text-laranja">
          Nº {product.number}
        </span>
        <span aria-hidden="true" className="leader h-1 flex-1 text-bordo/30" />
        <Ornament className="text-bordo/50 transition-transform duration-700 ease-editorial group-hover:translate-x-1 group-hover:text-laranja" />
      </div>

      {/* fotografia */}
      <div className={cn('relative overflow-hidden bg-creme-dark', featured ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
        <div className="h-full w-full transition-transform duration-[1.1s] ease-editorial group-hover:scale-[1.06]">
          {product.photo ? (
            <Picture photo={product.photo} sizes={featured ? '(min-width: 768px) 45vw, 82vw' : '(min-width: 768px) 30vw, 82vw'} />
          ) : (
            <PhotoPlaceholder sketch={product.sketch} label={product.name} />
          )}
        </div>
        {/* selo */}
        <span className="absolute right-3 top-3 grid size-[4.25rem] place-items-center rounded-full border border-dashed border-bordo/50 bg-paper text-center font-condensed text-[0.7rem] font-semibold uppercase leading-[1.05] tracking-[0.12em] text-bordo transition-transform duration-700 ease-editorial group-hover:-translate-y-1">
          <span>
            <span className="block text-[1.35rem] leading-none tracking-normal">20</span>
            unidades
          </span>
        </span>
        <span className="eyebrow absolute bottom-0 left-0 translate-y-full bg-bordo px-3 py-1.5 text-[0.65rem] text-creme transition-transform duration-500 ease-editorial group-hover:translate-y-0 group-focus-within:translate-y-0">
          Sabor da casa
        </span>
      </div>

      {/* nome + quantidade */}
      <div className="mt-5 flex items-end gap-3">
        <h3
          id={`produto-${product.id}`}
          className={cn(
            'font-condensed font-semibold uppercase leading-[0.9] tracking-[0.01em] text-ink',
            featured ? 'text-[2.6rem] md:text-[3.25rem]' : 'text-[2.4rem] md:text-[2.1rem] lg:text-[2.4rem]',
          )}
        >
          {product.name}
        </h3>
        <span aria-hidden="true" className="leader mb-2 h-1 flex-1 text-ink/30" />
        <span className="mb-1 whitespace-nowrap font-condensed text-base font-semibold uppercase tracking-[0.14em] text-bordo">
          {product.units}
        </span>
      </div>

      {/* informações: sempre visíveis no touch; com mouse, aparecem no hover (espaço reservado, sem layout shift) */}
      <div>
        <div>
          <div className="flex flex-col gap-4 pt-4 transition-[opacity,transform] duration-700 ease-editorial can-hover:translate-y-2 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-focus-within:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-focus-within:opacity-100">
            <p className="max-w-[44ch] text-[0.95rem] text-ink-soft">{product.description}</p>
            <a
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center gap-2 self-start py-2 text-bordo hover:text-laranja"
            >
              <span className="link-line">Pedir {product.short}</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">(abre o WhatsApp)</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductMenu() {
  return (
    <section id="produtos" aria-labelledby="produtos-title" className="paper relative isolate overflow-hidden bg-creme-dark py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-40 -z-10 hidden text-bordo/[0.08] md:block">
        <Sketch name="tomate" className="w-48" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-40 -z-10 hidden text-bordo/[0.08] md:block">
        <Sketch name="trigo" className="w-32 -rotate-[20deg]" />
      </div>

      <div className="container-x">
        {/* moldura de cardápio: filete duplo */}
        <div className="relative border-[5px] border-double border-bordo/40 px-0 py-10 sm:px-6 md:px-10 md:py-16 lg:px-14">
          <Reveal className="text-center">
            <RevealItem className="flex items-center justify-center gap-3 px-5 text-bordo">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-40 md:w-16" />
              <span className="eyebrow">
                Nº 06 · <span className="hidden sm:inline">Desde {CONTACT.foundedYear} · </span>
                {CONTACT.city} — {CONTACT.stateShort}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-40 md:w-16" />
            </RevealItem>
            <RevealItem
              as="h2"
              id="produtos-title"
              className="mt-6 px-4 font-condensed text-[clamp(3.25rem,10vw,8.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.005em] text-bordo"
            >
              O cardápio
              <span className="flex items-center justify-center gap-4 md:gap-6">
                <Ornament className="size-4 text-laranja md:size-6" />
                da Faiber
                <Ornament className="size-4 text-laranja md:size-6" />
              </span>
            </RevealItem>
            <RevealItem as="p" className="font-display mt-6 px-5 text-[1.25rem] font-[360] italic text-ink-soft md:text-[1.6rem]">
              Da nossa fábrica para o seu negócio.
            </RevealItem>

            {/* faixa de sabores */}
            <RevealItem className="mx-5 mt-10 border-y-[3px] border-double border-bordo/30 py-4 sm:mx-0">
              <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-condensed text-[1.05rem] font-medium uppercase tracking-[0.16em] text-ink">
                <span className="w-full text-[0.8rem] font-semibold text-bordo md:w-auto">Sabores da linha</span>
                {FLAVORS.map((f, i) => (
                  <span key={f} className="flex items-center gap-4">
                    {i > 0 && <span aria-hidden="true" className="text-laranja">·</span>}
                    {f}
                  </span>
                ))}
              </p>
            </RevealItem>
          </Reveal>

          {/* cartões: swipe no mobile, grade editorial no desktop */}
          <div className="relative mt-12 md:mt-16">
            <p className="eyebrow mb-4 flex items-center gap-2 px-5 text-[0.7rem] text-muted md:hidden">
              Deslize para ver os {PRODUCTS.length} produtos <ArrowRight className="size-3.5" aria-hidden="true" />
            </p>
            <div
              className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0 lg:gap-6"
            >
              {PRODUCTS.map((p, i) => (
                <MenuCard key={p.id} product={p} featured={i < 2} index={i} />
              ))}
            </div>
          </div>

          <div className="mx-5 mt-12 flex flex-col items-start justify-between gap-6 border-t border-bordo/25 pt-8 sm:mx-0 md:flex-row md:items-center">
            <p className="max-w-[52ch] text-[0.95rem] text-ink-soft">
              Todos os produtos são entregues congelados, em pacotes com 20 unidades. Consulte a disponibilidade de
              sabores e as condições para o seu negócio.
            </p>
            <a
              href={whatsappHref('Olá! Gostaria de receber o cardápio completo e as condições comerciais da Faiber Congelados.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shrink-0"
            >
              Solicitar condições
              <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
