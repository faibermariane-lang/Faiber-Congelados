import type { NextConfig } from 'next';

// STATIC_EXPORT=1 gera uma versão estática em out/ (prévia sem servidor)
const staticExport = process.env.STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'], unoptimized: staticExport },
  ...(staticExport ? { output: 'export' as const } : {}),
};

export default nextConfig;
