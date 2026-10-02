'use client';

import Image from 'next/image';
import { CONTACT, FOOTER, NAV, SITE } from '@/content';
import { IMAGES, imageSrc } from '@/images';
import { mailHref, whatsappHref } from '@/lib/contact';
import { useInViewOnce } from '@/lib/useInView';

export function Footer() {
  const [logoRef, shown] = useInViewOnce<HTMLDivElement>(0.2);
  return (
    <footer id="rodape" className="overflow-hidden bg-offwhite px-4 pt-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[90rem] gap-10 border-t-2 border-bordo/15 pt-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src={imageSrc('logo')} alt={IMAGES.logo.alt} width={IMAGES.logo.width} height={IMAGES.logo.height} className="h-auto w-32" />
          <p className="mt-5 text-lg font-bold text-bordo">{SITE.slogan}</p>
          <p className="mt-2 text-texto/85">
            {CONTACT.city}, {CONTACT.state}
          </p>
        </div>
        <nav aria-label="Rodapé" className="md:col-span-3">
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="inline-flex min-h-11 items-center text-texto hover:text-bordo hover:underline">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-1 md:col-span-4">
          <li>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-texto hover:text-bordo hover:underline">
              WhatsApp · {CONTACT.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={mailHref()} className="inline-flex min-h-11 items-center text-texto [overflow-wrap:anywhere] hover:text-bordo hover:underline">
              {CONTACT.email}
            </a>
          </li>
          {CONTACT.instagram && (
            <li>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-texto hover:text-bordo hover:underline">
                Instagram
              </a>
            </li>
          )}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-[90rem] text-sm text-texto/75">{FOOTER.rights}</p>

      {/* logo gigante, cortado na base, revelado por máscara */}
      <div ref={logoRef} aria-hidden="true" className="relative mx-auto mt-10 h-[30vw] max-w-[90rem] overflow-hidden">
        <div className="reveal-clip absolute inset-x-0 top-0" data-shown={shown} style={{ transitionDuration: '1.2s' }}>
          <Image src={imageSrc('logo')} alt="" width={IMAGES.logo.width} height={IMAGES.logo.height} sizes="100vw" className="h-auto w-full" />
        </div>
      </div>
    </footer>
  );
}
