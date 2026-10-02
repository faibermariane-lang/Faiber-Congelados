"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { waLink } from "@/content";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Botão flutuante discreto, visível depois do hero. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0.05 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a Faiber pelo WhatsApp"
          className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-[8px] bg-bordo text-offwhite shadow-[0_14px_34px_rgba(43,10,14,0.18)] transition-colors hover:bg-texto md:bottom-8 md:right-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <WhatsAppIcon className="h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
