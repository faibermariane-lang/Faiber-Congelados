import type { Photo } from '../../content/site';
import { cn } from '../../lib/cn';

type PictureProps = {
  photo: Photo;
  sizes: string;
  className?: string;
  priority?: boolean;
  alt?: string;
};

/** Imagem responsiva em WebP, com dimensões declaradas para evitar layout shift. */
export function Picture({ photo, sizes, className, priority = false, alt }: PictureProps) {
  const srcSet = photo.widths.map((w) => `${photo.base}-${w}.webp ${w}w`).join(', ');
  const largest = photo.widths[photo.widths.length - 1];
  return (
    <img
      src={`${photo.base}-${largest}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={cn('block h-full w-full object-cover', className)}
    />
  );
}
