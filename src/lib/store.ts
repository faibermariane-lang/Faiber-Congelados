"use client";

import { create } from "zustand";
import { products } from "@/content";

type OrderState = {
  items: Record<string, number>;
  add: (id: string, qty?: number) => void;
  set: (id: string, qty: number) => void;
  clear: () => void;
};

const empty = () => Object.fromEntries(products.items.map((p) => [p.id, 0]));

export const useOrder = create<OrderState>((set) => ({
  items: empty(),
  add: (id, qty = 1) => set((s) => ({ items: { ...s.items, [id]: Math.max(0, (s.items[id] ?? 0) + qty) } })),
  set: (id, qty) => set((s) => ({ items: { ...s.items, [id]: Math.max(0, Math.min(999, qty)) } })),
  clear: () => set({ items: empty() }),
}));

export const selectTotal = (s: OrderState) => Object.values(s.items).reduce((a, b) => a + b, 0);

type UIState = {
  /** Preloader concluído (ou pulado): libera as entradas do hero. */
  introDone: boolean;
  setIntroDone: () => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  introDone: false,
  setIntroDone: () => set({ introDone: true }),
  menuOpen: false,
  setMenuOpen: (v) => set({ menuOpen: v }),
}));
