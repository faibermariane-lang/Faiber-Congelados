import Image from "next/image";
import type { Img } from "@/content";

/**
 * Foto real quando existir; senão, placeholder areia na proporção correta
 * com a legenda `[FOTO: ...]` em mono (visível de propósito no artboard).
 */
export function Photo({
  img,
  className = "",
  sizes = "100vw",
  priority = false,
  fill = false,
  fit = "cover",
  captionTop = false,
}: {
  img: Img;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Preenche o contêiner (object-cover) em vez de usar a proporção da imagem. */
  fill?: boolean;
  /** `contain` para PNG recortado (fundo transparente). */
  fit?: "cover" | "contain";
  /** Legenda do placeholder no topo (quando há texto sobreposto embaixo). */
  captionTop?: boolean;
}) {
  if (img.src) {
    return fill ? (
      <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`} />
    ) : (
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        priority={priority}
        className={`h-auto w-full ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={img.alt}
      className={`relative flex w-full ${captionTop ? "items-start" : "items-end"} bg-areia ${fill ? "h-full" : ""} ${className}`}
      style={fill ? undefined : { aspectRatio: `${img.width} / ${img.height}` }}
    >
      <span className="label-mono max-w-[36ch] p-4 text-[0.66rem] normal-case tracking-[0.02em] text-bordo/70">{img.placeholder}</span>
    </div>
  );
}
