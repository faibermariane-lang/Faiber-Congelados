'use client';

import { useId, useState } from 'react';
import { CONTACT, CONTATO } from '@/content';
import { mailHref, whatsappHref } from '@/lib/contact';
import { ArrowRight } from './ui/icons';

type Errors = Partial<Record<'nome' | 'mensagem', string>>;

const inputCls =
  'mt-1.5 w-full rounded-lg border-2 border-bordo/25 bg-white px-3 text-base text-texto outline-none transition-colors focus:border-bordo focus-visible:ring-2 focus-visible:ring-bordo/30 aria-[invalid=true]:border-bordo';

export function Contact() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [ok, setOk] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const next: Errors = {};
    if (!get('nome')) next.nome = 'Informe seu nome.';
    if (get('mensagem').length < 5) next.mensagem = 'Escreva uma mensagem curta (pelo menos 5 caracteres).';
    setErrors(next);
    if (Object.keys(next).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      setOk(false);
      return;
    }
    const parts = [`Olá, Faiber! Sou ${get('nome')}`];
    if (get('empresa')) parts.push(`da ${get('empresa')}`);
    if (get('tipo')) parts.push(`(${get('tipo')})`);
    if (get('cidade')) parts.push(`de ${get('cidade')}`);
    const text = `${parts.join(', ').replace(', (', ' (')}. ${get('mensagem')}`;
    window.open(whatsappHref(text), '_blank', 'noopener,noreferrer');
    setOk(true);
  };

  const id = (k: string) => `${uid}-${k}`;

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-offwhite px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[90rem] gap-12 rounded-[28px] bg-laranja px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-20">
        <div className="lg:col-span-6">
          <h2 id="contato-title" className="display text-[clamp(3.5rem,9vw,8.5rem)] text-bordo">
            {CONTATO.title}
          </h2>
          <p className="mt-6 max-w-[44ch] text-bordo">{CONTATO.text}</p>

          <ul className="mt-10 border-t-2 border-bordo/25">
            {[
              { label: 'WhatsApp', value: CONTACT.whatsappDisplay, href: whatsappHref(), ext: true },
              { label: 'E-mail', value: CONTACT.email, href: mailHref(), ext: false },
            ].map((c) => (
              <li key={c.label} className="border-b-2 border-bordo/25">
                <a
                  href={c.href}
                  {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex min-h-16 items-center justify-between gap-4 py-5 text-bordo"
                >
                  <span className="min-w-0">
                    <span className="eyebrow block">{c.label}</span>
                    <span className="mt-1 block text-[1.25rem] font-bold [overflow-wrap:anywhere] sm:text-2xl">{c.value}</span>
                  </span>
                  <ArrowRight className="size-7 shrink-0 transition-transform duration-300 group-hover:translate-x-2 group-focus-visible:translate-x-2" />
                  {c.ext && <span className="sr-only">(abre em nova aba)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form noValidate onSubmit={onSubmit} className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-5 lg:col-start-8" aria-label="Formulário de contato">
          <div className="sm:col-span-2">
            <label htmlFor={id('nome')} className="text-sm font-semibold text-bordo">Nome *</label>
            <input id={id('nome')} name="nome" autoComplete="name" aria-invalid={!!errors.nome} aria-describedby={errors.nome ? id('nome-e') : undefined} className={`${inputCls} h-12`} />
            {errors.nome && <p id={id('nome-e')} className="mt-1 text-sm font-semibold text-bordo">{errors.nome}</p>}
          </div>
          <div>
            <label htmlFor={id('empresa')} className="text-sm font-semibold text-bordo">Empresa</label>
            <input id={id('empresa')} name="empresa" autoComplete="organization" className={`${inputCls} h-12`} />
          </div>
          <div>
            <label htmlFor={id('cidade')} className="text-sm font-semibold text-bordo">Cidade</label>
            <input id={id('cidade')} name="cidade" autoComplete="address-level2" className={`${inputCls} h-12`} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={id('tipo')} className="text-sm font-semibold text-bordo">Tipo de negócio</label>
            <select id={id('tipo')} name="tipo" defaultValue="" className={`${inputCls} h-12`}>
              <option value="">Selecione</option>
              {CONTATO.businessTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={id('mensagem')} className="text-sm font-semibold text-bordo">Mensagem *</label>
            <textarea id={id('mensagem')} name="mensagem" rows={4} aria-invalid={!!errors.mensagem} aria-describedby={errors.mensagem ? id('msg-e') : undefined} className={`${inputCls} min-h-32 py-3`} />
            {errors.mensagem && <p id={id('msg-e')} className="mt-1 text-sm font-semibold text-bordo">{errors.mensagem}</p>}
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="pill pill-solid w-full sm:w-auto">
              {CONTATO.submit}
              <ArrowRight className="pill-arrow size-5" />
            </button>
            <p role="status" className="mt-4 min-h-6 font-semibold text-bordo">
              {ok ? CONTATO.success : ''}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
