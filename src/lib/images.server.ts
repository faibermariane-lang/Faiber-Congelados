import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { IMAGES, type ImageAvailability, type ImageKey } from '@/images';

/** Verifica no disco quais imagens já foram adicionadas em /public/images. */
export function getImageAvailability(): ImageAvailability {
  const dir = path.join(process.cwd(), 'public', 'images');
  return Object.fromEntries(
    (Object.keys(IMAGES) as ImageKey[]).map((k) => [k, fs.existsSync(path.join(dir, IMAGES[k].file))]),
  ) as ImageAvailability;
}
