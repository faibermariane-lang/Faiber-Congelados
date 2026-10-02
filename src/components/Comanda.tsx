'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { COMANDA, PRODUCTS, type Product } from '@/content';
import { whatsappHref } from '@/lib/contact';
import { orderMessage } from '@/lib/order-message';
import { useInViewOnce } from '@/lib/useInView';
import { totals, useOrder } from '@/store/order';
import { useUi } from '@/store/ui';
import { DigitRoll } from './ui/DigitRoll';
import { WhatsAppIcon } from './ui/icons';

function Stamp() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="pointer-events-none absolute right-3 top-3 size-24 text-bordo opacity-15 sm:right-5 sm:top-4 sm:size-28">
      <defs>
        <path id="stamp-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fill="currentColor" fontFamily="var(--font-plex-mono), monospace" fontSize="11.5" fontWeight="600" letterSpacing="1.6">
        <textPath href="#stamp-circle">{COMANDA.stamp}</textPath>
      </text>
      <text x="60" y="66" textAnchor="middle" fill="currentColor" fontFamily="var(--font-big-shoulders), sans-serif" fontWeight="900" fontSize="20">
        2010
      </text>
    </svg>
  );
}

function Row({ product }: { product: Product }) {
  const qty = useOrder((s) => s.items[product.id] ?? 0);
  const highlight = useOrder((s) => s.highlight === product.id);
  const inc = useOrder((s) => s.inc);
  const dec = useOrder((s) => s.dec);
  const rowRef = useRef<HTMLLIElement>(null);
  const name = product.name.toLowerCase();

  useEffect(() => {
    if (highlight) rowRef.current?.querySelector<HTMLButtonElement>('[data-inc]')?.focus({ preventScroll: true });
  }, [highlight]);

  return (
    <li
      ref={rowRef}
      id={`item-${product.id}`}
      className={`-mx-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-500 sm:gap-5 ${
        highlight ? 'bg-laranja/45' : 'bg-transparent'
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[1.0625rem] font-semibold uppercase tracking-wide text-texto sm:text-lg">{product.name}</span>
          <span aria-hidden="true" className="mb-1 hidden min-w-4 flex-1 border-b-2 border-dotted border-texto/30 sm:block" />
        </div>
        <span className="text-sm text-texto/75">
          {product.pack} com {product.units} unidades
        </span>
      </div>

      <div
        role="group"
        aria-label={`Quantidade de ${name}`}
        className="flex items-center"
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            inc(product.id);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            dec(product.id);
          }
        }}
      >
        <button
          type="button"
          onClick={() => dec(product.id)}
          disabled={qty === 0}
          aria-label={`Diminuir ${name}`}
          className="grid size-11 place-items-center rounded-full border-2 border-bordo text-xl font-semibold text-bordo transition-colors hover:bg-bordo hover:text-creme disabled:border-texto/20 disabled:text-texto/30 disabled:hover:bg-transparent"
        >
          −
        </button>
        <output aria-live="off" className="w-10 text-center sm:w-12 text-lg font-semibold tabular-nums text-texto">
          {qty}
        </output>
        <button
          type="button"
          data-inc
          onClick={() => inc(product.id)}
          aria-label={`Aumentar ${name}`}
          className="grid size-11 place-items-center rounded-full border-2 border-bordo bg-bordo text-xl font-semibold text-creme transition-colors hover:border-texto hover:bg-texto"
        >
          +
        </button>
      </div>
    </li>
  );
}

function Field({
  label,
  name,
  autoComplete,
  required,
  value,
  onChange,
  inputRef,
}: {
  label: string;
  name: string;
  autoComplete: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-texto">
        {label}
        {required ? <span className="text-bordo"> *</span> : <span className="font-normal text-texto/70"> (opcional)</span>}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-12 w-full rounded-lg border-2 border-texto/20 bg-white px-3 text-base text-texto outline-none transition-colors focus:border-bordo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bordo/30"
      />
    </div>
  );
}

export function Comanda() {
  const items = useOrder((s) => s.items);
  const customer = useOrder((s) => s.customer);
  const setCustomer = useOrder((s) => s.setCustomer);
  const clear = useOrder((s) => s.clear);
  const setBar = useUi((s) => s.setOrderBarVisible);
  const barVisible = useUi((s) => s.orderBarVisible);
  const { count, units } = totals(items);
  const valid = count > 0 && customer.nome.trim().length > 0;
  const message = orderMessage(items, customer);

  const [sent, setSent] = useState(false);
  const [date, setDate] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const nomeRef = useRef<HTMLInputElement>(null);
  const [paperRef, printed] = useInViewOnce<HTMLDivElement>(0.12);
  const helpId = useId();

  useEffect(() => {
    setDate(new Date().toLocaleDateString('pt-BR'));
  }, []);

  // barra fixa (mobile) enquanto a comanda estiver na tela
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const mq = window.matchMedia('(max-width: 63.98rem)');
    const io = new IntersectionObserver(([e]) => setBar(e.isIntersecting && mq.matches), { rootMargin: '-15% 0px -15% 0px' });
    io.observe(el);
    return () => {
      io.disconnect();
      setBar(false);
    };
  }, [setBar]);

  // campos focados nunca ficam atrás da barra
  useEffect(() => {
    document.documentElement.style.scrollPaddingBottom = barVisible ? '88px' : '';
  }, [barVisible]);

  const send = () => {
    if (!valid) {
      if (count === 0) document.querySelector<HTMLButtonElement>('#comanda [data-inc]')?.focus();
      else nomeRef.current?.focus();
      return;
    }
    window.open(whatsappHref(message), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section
      id="comanda"
      ref={sectionRef}
      aria-labelledby="comanda-title"
      className="relative bg-offwhite px-4 pb-32 pt-24 sm:px-6 lg:px-10 lg:pb-32 lg:pt-32"
    >
      <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <h2 id="comanda-title" className="misprint font-retro text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.95] text-bordo">
            {COMANDA.title}
          </h2>
          <p className="mt-6 max-w-[38ch] text-texto">{COMANDA.text}</p>
          <p className="mt-4 max-w-[42ch] font-mono text-sm text-texto/80">{COMANDA.note}</p>
        </div>

        <div className="lg:col-span-7">
          <div ref={paperRef}>
          <div className="reveal-clip" data-shown={printed} style={{ transitionDuration: '0.9s' }}>
            <div className="picote relative bg-white px-4 py-10 font-mono shadow-[0_18px_40px_-28px_rgba(43,10,14,0.45)] sm:px-9 sm:py-12">
              {/* cabeçalho */}
              <header className="relative border-b-2 border-dashed border-texto/25 pb-6 pr-28 sm:pr-36">
                <p className="text-lg font-semibold tracking-wide text-bordo">{COMANDA.paperTitle}</p>
                <p className="text-sm text-texto/80">{COMANDA.paperPlace}</p>
                <p className="mt-3 flex gap-5 text-sm text-texto/80">
                  <span>{COMANDA.paperNumber}</span>
                  <span>{date}</span>
                </p>
                <Stamp />
              </header>

              <ul className="mt-4 divide-y divide-dashed divide-texto/15" aria-label="Itens da comanda">
                {PRODUCTS.map((p) => (
                  <Row key={p.id} product={p} />
                ))}
              </ul>

              {/* total */}
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t-2 border-dashed border-texto/25 pt-5 text-[1.0625rem] font-semibold uppercase text-texto sm:text-lg">
                <span>Total:</span>
                <span className="flex items-baseline gap-1.5">
                  <DigitRoll value={count} /> {count === 1 ? 'item' : 'itens'} · <DigitRoll value={units} /> unidades
                </span>
              </div>
              <p className="sr-only" aria-live="polite">
                Total: {count} {count === 1 ? 'item' : 'itens'}, {units} unidades.
              </p>

              {/* dados */}
              <div className="mt-8 grid gap-4 font-sans sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Nome" name="nome" autoComplete="name" required value={customer.nome} onChange={(v) => setCustomer({ nome: v })} inputRef={nomeRef} />
                </div>
                <Field label="Empresa" name="empresa" autoComplete="organization" value={customer.empresa} onChange={(v) => setCustomer({ empresa: v })} />
                <Field label="Cidade" name="cidade" autoComplete="address-level2" value={customer.cidade} onChange={(v) => setCustomer({ cidade: v })} />
              </div>

              <div className="mt-8 font-sans">
                <button
                  type="button"
                  onClick={send}
                  disabled={!valid}
                  aria-describedby={!valid ? helpId : undefined}
                  className="pill pill-solid w-full disabled:cursor-not-allowed disabled:border-texto/15 disabled:bg-texto/10 disabled:text-texto/55"
                >
                  <WhatsAppIcon className="size-5" />
                  {COMANDA.send}
                </button>
                {!valid && (
                  <p id={helpId} className="mt-3 text-center text-sm text-texto/80">
                    {COMANDA.help}
                  </p>
                )}

                {sent && (
                  <div role="status" className="mt-5 rounded-xl border-2 border-bordo/20 bg-creme p-4">
                    <p className="font-semibold text-bordo">{COMANDA.done}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSent(false);
                          document.querySelector<HTMLButtonElement>('#comanda [data-inc]')?.focus();
                        }}
                        className="pill pill-outline pill-sm"
                      >
                        {COMANDA.edit}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          clear();
                          setSent(false);
                        }}
                        className="pill pill-outline pill-sm"
                      >
                        {COMANDA.clear}
                      </button>
                    </div>
                  </div>
                )}

                <details className="group mt-5 text-sm">
                  <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-bordo">
                    <span aria-hidden="true" className="transition-transform group-open:rotate-90">
                      ›
                    </span>
                    {COMANDA.preview}
                  </summary>
                  <p className="mt-2 rounded-lg bg-creme p-4 font-mono text-sm leading-relaxed text-texto">{message}</p>
                </details>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* barra fixa inferior (mobile) */}
      <div
        aria-hidden={!barVisible}
        className={`fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-between gap-3 border-t border-bordo/15 bg-offwhite px-4 pb-[env(safe-area-inset-bottom)] transition-transform duration-300 lg:hidden ${
          barVisible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
        }`}
      >
        <p className="font-mono text-sm leading-tight text-texto">
          <span className="font-semibold">{count}</span> {count === 1 ? 'item' : 'itens'}
          <br />
          <span className="text-texto/75">{units} unidades</span>
        </p>
        <button type="button" onClick={send} tabIndex={barVisible ? 0 : -1} className="pill pill-solid pill-sm">
          <WhatsAppIcon className="size-4" />
          {valid ? 'Enviar pedido' : count === 0 ? 'Escolher itens' : 'Informar nome'}
        </button>
      </div>
    </section>
  );
}
