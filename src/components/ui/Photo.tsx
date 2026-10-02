import Image from 'next/image';
import { IMAGES, imageSrc, type ImageKey } from '@/images';

/** Foto real (se o arquivo existir) ou placeholder areia com o nome do arquivo. */
export function Photo({ k, real, sizes, className = '' }: { k: ImageKey; real: boolean; sizes: string; className?: string }) {
  if (real) {
    return <Image src={imageSrc(k)} alt={IMAGES[k].alt} fill sizes={sizes} className={`object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={`${IMAGES[k].alt} (imagem a ser adicionada)`}
      className={`absolute inset-0 flex items-center justify-center bg-areia ${className}`}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-bordo/20" aria-hidden="true">
        <path d="M0 0L100 100M100 0L0 100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="relative bg-areia px-2 font-mono text-sm text-bordo">[IMAGEM: {IMAGES[k].file}]</span>
    </div>
  );
}
