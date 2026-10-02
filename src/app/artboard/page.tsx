import { notFound } from 'next/navigation';
import { Artboard } from './Artboard';

export const metadata = { title: 'Artboard · Faiber', robots: { index: false } };

/** Prancheta de desenvolvimento: não existe em produção. */
export default function ArtboardPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <Artboard />;
}
