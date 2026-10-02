import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { CONTACT, MESSAGES } from '../content/site';
import { mailHref, whatsappHref } from '../lib/contact';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal, RevealItem } from './ui/Reveal';
import { WhatsAppIcon } from './ui/icons';

const CHANNELS = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: CONTACT.whatsappDisplay,
    hint: 'Resposta direta com a nossa equipe',
    href: whatsappHref(MESSAGES.business),
    external: true,
    Icon: WhatsAppIcon,
  },
  {
    key: 'email',
    label: 'E-mail',
    value: CONTACT.email,
    hint: 'Para propostas, cadastros e condições',
    href: mailHref(),
    external: false,
    Icon: Mail,
  },
] as const;

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="paper bg-creme py-24 md:py-36">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <RevealItem>
            <Eyebrow index="08" className="text-bordo">
              Contato
            </Eyebrow>
          </RevealItem>
          <RevealItem as="h2" id="contato-title" className="font-display mt-6 text-[clamp(2.25rem,4.6vw,4rem)] font-[400] text-ink">
            Vamos colocar a Faiber <em className="font-[320] text-bordo">no seu cardápio?</em>
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[44ch] text-ink-soft md:text-lg">
            Quer conhecer nossos produtos, condições comerciais ou encontrar a melhor opção para o seu negócio? Fale
            diretamente com a nossa equipe.
          </RevealItem>
          <RevealItem as="p" className="mt-8 flex items-center gap-2 text-muted">
            <MapPin className="size-4 text-bordo" aria-hidden="true" />
            {CONTACT.city} — {CONTACT.state}
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className="grid gap-4 self-end lg:col-span-6 lg:col-start-7" stagger={0.12}>
          {CHANNELS.map(({ key, label, value, hint, href, external, Icon }) => (
            <RevealItem as="li" key={key}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group relative isolate flex items-center gap-5 overflow-hidden border border-bordo/25 bg-paper p-6 transition-colors duration-500 hover:border-bordo hover:text-creme focus-visible:text-creme md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-bordo transition-transform duration-700 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-current text-bordo transition-colors duration-500 group-hover:text-laranja-soft group-focus-visible:text-laranja-soft">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block text-bordo transition-colors duration-500 group-hover:text-laranja-soft group-focus-visible:text-laranja-soft">
                    {label}
                  </span>
                  <span className="font-display mt-1 block text-[1.2rem] [overflow-wrap:anywhere] xs:text-[1.35rem] font-[400] !leading-tight text-ink transition-colors duration-500 group-hover:text-creme group-focus-visible:text-creme md:text-[1.75rem]">
                    {value}
                  </span>
                  <span className="mt-1 block text-sm text-muted transition-colors duration-500 group-hover:text-creme/75 group-focus-visible:text-creme/75">
                    {hint}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-6 shrink-0 text-bordo transition-[transform,color] duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-creme group-focus-visible:text-creme"
                  aria-hidden="true"
                />
                {external && <span className="sr-only">(abre em nova aba)</span>}
              </a>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
