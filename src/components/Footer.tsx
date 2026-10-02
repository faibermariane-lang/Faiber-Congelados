import Image from 'next/image';
import { CONTACT, FOOTER, NAV, SITE } from '@/content';
import { IMAGES, imageSrc } from '@/images';
import { mailHref, whatsappHref } from '@/lib/contact';
import { DoodleField } from './ui/Doodles';

const link = 'inline-flex min-h-11 items-center text-creme/90 underline-offset-4 transition-colors hover:text-laranja hover:underline';

export function Footer() {
  return (
    <footer id="rodape" className="relative isolate overflow-hidden bg-bordo px-4 pb-10 pt-20 text-creme sm:px-6 lg:px-10">
      <DoodleField
        opacity={0.09}
        items={[
          { name: 'pastel', x: 36, y: 58, size: 10, rotate: -10, color: 'text-creme', speed: 40 },
          { name: 'folha', x: 90, y: 50, size: 5, rotate: 20, color: 'text-creme', speed: 30 },
          { name: 'coxinha', x: 58, y: 64, size: 4.5, rotate: -14, color: 'text-laranja', speed: 50 },
        ]}
      />
      <div className="mx-auto grid max-w-[90rem] gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src={imageSrc('logoBranca')} alt={IMAGES.logoBranca.alt} width={IMAGES.logoBranca.width} height={IMAGES.logoBranca.height} className="h-auto w-36" />
          <p className="mt-6 text-lg font-semibold text-laranja">{SITE.slogan}</p>
          <p className="mt-1 text-creme/85">
            {CONTACT.city}, {CONTACT.state}
          </p>
        </div>
        <nav aria-label="Rodapé" className="md:col-span-3">
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-1 md:col-span-4">
          <li>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={link}>
              WhatsApp · {CONTACT.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={mailHref()} className={`${link} [overflow-wrap:anywhere]`}>
              {CONTACT.email}
            </a>
          </li>
          {CONTACT.instagram && (
            <li>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                Instagram
              </a>
            </li>
          )}
        </ul>
      </div>
      <p className="mx-auto mt-14 max-w-[90rem] border-t border-creme/20 pt-6 text-sm text-creme/75">{FOOTER.rights}</p>
    </footer>
  );
}
