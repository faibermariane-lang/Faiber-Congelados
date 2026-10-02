'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PRODUCTS, type ProductId } from '@/content';

type Customer = { nome: string; empresa: string; cidade: string };

type OrderState = {
  items: Partial<Record<ProductId, number>>;
  customer: Customer;
  /** linha da comanda destacada temporariamente (não persiste) */
  highlight: ProductId | null;
  inc: (id: ProductId) => void;
  dec: (id: ProductId) => void;
  setQty: (id: ProductId, qty: number) => void;
  setCustomer: (patch: Partial<Customer>) => void;
  clear: () => void;
  flash: (id: ProductId) => void;
};

let flashTimer: ReturnType<typeof setTimeout> | undefined;

export const useOrder = create<OrderState>()(
  persist(
    (set, get) => ({
      items: {},
      customer: { nome: '', empresa: '', cidade: '' },
      highlight: null,
      inc: (id) => get().setQty(id, (get().items[id] ?? 0) + 1),
      dec: (id) => get().setQty(id, (get().items[id] ?? 0) - 1),
      setQty: (id, qty) =>
        set((s) => {
          const next = { ...s.items };
          const q = Math.max(0, Math.min(999, Math.round(qty)));
          if (q === 0) delete next[id];
          else next[id] = q;
          return { items: next };
        }),
      setCustomer: (patch) => set((s) => ({ customer: { ...s.customer, ...patch } })),
      clear: () => set({ items: {} }),
      flash: (id) => {
        clearTimeout(flashTimer);
        set({ highlight: id });
        flashTimer = setTimeout(() => set({ highlight: null }), 1500);
      },
    }),
    {
      name: 'faiber-comanda',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, customer: s.customer }),
      // reidratado manualmente após a montagem, para não divergir do HTML do servidor
      skipHydration: true,
    },
  ),
);

/** Totais derivados: itens (soma das quantidades) e unidades. */
export function totals(items: OrderState['items']) {
  let count = 0;
  let units = 0;
  for (const p of PRODUCTS) {
    const q = items[p.id] ?? 0;
    count += q;
    units += q * p.units;
  }
  return { count, units };
}
