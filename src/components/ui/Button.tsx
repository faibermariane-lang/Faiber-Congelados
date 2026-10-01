import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Variant = "bordo" | "laranja" | "contorno" | "contorno-claro";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  bordo: "bg-bordo text-branco hover:bg-bordo-escuro",
  laranja: "bg-laranja text-tinta hover:bg-[#ffc670]",
  contorno: "text-bordo ring-2 ring-inset ring-bordo hover:bg-bordo hover:text-branco",
  "contorno-claro": "text-branco ring-2 ring-inset ring-branco/70 hover:bg-branco hover:text-bordo",
};
const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[1rem] gap-2.5",
  lg: "h-14 px-8 text-[1.0625rem] gap-3",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  whatsapp?: boolean;
  magnetic?: boolean;
};

/** Botão em formato de pílula. `whatsapp` adiciona o ícone; `magnetic` ativa o efeito magnético. */
export function Button({ children, variant = "bordo", size = "md", whatsapp, magnetic, className = "", ...rest }: Props) {
  const external = rest.href?.startsWith("http");
  const link = (
    <a
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-full font-bold tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {whatsapp && <WhatsAppIcon className={size === "lg" ? "size-6" : "size-5"} />}
      <span>{children}</span>
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
