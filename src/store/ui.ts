'use client';

import { create } from 'zustand';

type UiState = {
  menuOpen: boolean;
  /** barra fixa da comanda (mobile) visível */
  orderBarVisible: boolean;
  setMenuOpen: (v: boolean) => void;
  setOrderBarVisible: (v: boolean) => void;
};

export const useUi = create<UiState>()((set) => ({
  menuOpen: false,
  orderBarVisible: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setOrderBarVisible: (orderBarVisible) => set({ orderBarVisible }),
}));
