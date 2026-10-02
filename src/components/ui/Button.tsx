import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowRight } from "./icons";

type Variant = "primary" | "secondary";

const base =
  "roll-host group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-[8px] px-6 py-[1.05rem] text-[0.98rem] font-medium leading-none tracking-[-0.005em] transition-colors duration-500";

const variants: Record<Variant, string> = {
  primary: "bg-bordo text-offwhite",
  secondary:
    "text-bordo shadow-[inset_0_0_0_1.5px_var(--color-bordo)] hover:text-offwhite focus-visible:text-offwhite",
};

const fills: Record<Variant, string> = {
  // tinta mais escura subindo, com um filete laranja-forte na borda de ataque (acento mínimo)
  primary: "bg-texto shadow-[inset_0_2px_0_var(--color-laranja-forte)]",
  secondary: "bg-bordo shadow-[inset_0_2px_0_var(--color-laranja-forte)]",
};

/** Texto que "rola" para cima e é substituído por uma cópia. */
export function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

function Inner({ children, variant, icon }: { children: ReactNode; variant: Variant; icon?: ReactNode | false }) {
  return (
    <>
      {/* preenchimento vindo de baixo */}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 -z-10 h-full origin-bottom scale-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 ${fills[variant]}`}
      />
      <Roll>{children}</Roll>
      {icon !== false && <span className="relative flex h-[1.1em] w-[1.1em] overflow-hidden" aria-hidden>
        {icon ?? (
          <>
            <ArrowRight className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[130%]" />
            <ArrowRight className="absolute inset-0 -translate-x-[130%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
          </>
        )}
      </span>}
    </>
  );
}

type LinkProps = ComponentPropsWithoutRef<"a"> & { variant?: Variant; icon?: ReactNode | false; magnetic?: boolean };

export function ButtonLink({ variant = "primary", icon, magnetic = true, className = "", children, ...rest }: LinkProps) {
  const el = (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner variant={variant} icon={icon}>
        {children}
      </Inner>
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

type BtnProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant; icon?: ReactNode | false; magnetic?: boolean };

export function Button({ variant = "primary", icon, magnetic = true, className = "", children, ...rest }: BtnProps) {
  const el = (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner variant={variant} icon={icon}>
        {children}
      </Inner>
    </button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
