import { CONTACT, NAV } from '../content/site';
import { mailHref, whatsappHref } from '../lib/contact';
import { Logo } from './ui/Logo';

export function Footer() {
  const links = [
    { href: '#topo', label: 'Início' },
    ...NAV.map((n) => ({ href: `#${n.id}`, label: n.label })),
  ];
  return (
    <footer className="bg-ink-soft text-creme/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo className="w-36 text-creme" />
          <p className="font-display mt-6 max-w-[26ch] text-xl font-[340] italic !leading-snug text-creme">
            Tradição, qualidade e praticidade desde {CONTACT.foundedYear}.
          </p>
          <p className="eyebrow mt-6 text-creme/60">
            {CONTACT.city} — {CONTACT.state}
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3 md:col-start-7">
          <p className="eyebrow text-laranja-soft">Navegue</p>
          <ul className="mt-5 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-line py-1 hover:text-creme">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow text-laranja-soft">Fale com a Faiber</p>
          <ul className="mt-5 space-y-2.5">
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-line py-1 hover:text-creme">
                WhatsApp · {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={mailHref()} className="link-line break-all py-1 hover:text-creme">
                E-mail
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x">
        <p className="flex flex-col gap-2 border-t border-creme/15 py-6 text-[0.8125rem] text-creme/55 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Faiber Congelados. Todos os direitos reservados.</span>
          <span>Fábrica de alimentos congelados em {CONTACT.city} — {CONTACT.stateShort}</span>
        </p>
      </div>
    </footer>
  );
}
