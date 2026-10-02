import { VALUES } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal, RevealItem } from './ui/Reveal';
import { Sketch } from './ui/Sketch';

export function Values() {
  return (
    <section aria-labelledby="pilares-title" className="relative bg-creme pb-24 md:pb-36">
      <div className="container-x">
        <Reveal className="grid gap-6 border-t border-line pt-16 md:grid-cols-12 md:pt-24">
          <RevealItem className="md:col-span-4">
            <Eyebrow index="05" className="text-bordo">
              Pilares
            </Eyebrow>
          </RevealItem>
          <RevealItem as="h2" id="pilares-title" className="font-display text-[clamp(2rem,4.4vw,3.75rem)] font-[400] text-ink md:col-span-8">
            Quatro ingredientes que não <em className="font-[320] text-bordo">saem da receita.</em>
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className="mt-14 grid gap-px border-y border-line bg-line sm:grid-cols-2 md:mt-20 lg:grid-cols-4" stagger={0.1} amount={0.15}>
          {VALUES.map((v, i) => (
            <RevealItem
              as="li"
              key={v.title}
              className="group relative isolate overflow-hidden bg-creme"
            >
              {/* preenchimento bordô que sobe no hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-bordo transition-transform duration-700 ease-editorial group-hover:scale-y-100"
              />
              <div className="flex h-full flex-col p-7 transition-colors duration-500 group-hover:text-creme md:p-9">
                <div className="flex items-start justify-between">
                  <span className="eyebrow text-muted tabular-nums transition-colors duration-500 group-hover:text-laranja-soft">
                    0{i + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-10 origin-right scale-x-50 bg-laranja transition-transform duration-700 ease-editorial group-hover:scale-x-100"
                  />
                </div>
                <div className="my-6 flex h-24 items-center justify-center md:my-10 md:h-32 text-bordo/45 transition-[color,transform] duration-700 ease-editorial group-hover:-translate-y-1.5 group-hover:scale-[1.06] group-hover:text-creme/50">
                  <Sketch name={v.sketch} className="h-full w-auto max-w-[70%]" delay={0.15 * i} />
                </div>
                <h3 className="font-display text-[2rem] font-[400] uppercase !leading-none tracking-[-0.01em]">{v.title}</h3>
                <p className="mt-4 max-w-[30ch] text-[0.975rem] text-ink-soft transition-colors duration-500 group-hover:text-creme/85">
                  {v.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
