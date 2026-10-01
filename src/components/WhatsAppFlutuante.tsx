import { linkWhatsApp, mensagens } from "@/content";
import { IconeWhatsApp } from "./Icones";

/** Botão fixo de WhatsApp, só no celular. */
export function WhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp(mensagens.geral)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Faiber pelo WhatsApp"
      className="fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-bordo text-white shadow-[0_8px_24px_-6px_rgb(79_15_24/0.55)] ring-4 ring-creme transition-transform active:scale-95 md:hidden"
    >
      <IconeWhatsApp className="size-7" />
    </a>
  );
}
