/**
 * npm run preview:static
 * Gera a exportação estática (out/) e uma cópia com caminhos relativos
 * (preview/) que funciona em qualquer subpasta, para prévias sem servidor.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

execSync('next build', { stdio: 'inherit', env: { ...process.env, STATIC_EXPORT: '1' } });

const src = path.resolve('out');
const dst = path.resolve('preview');
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
// alguns hosts reservam caminhos que começam com "_": renomeia _next → next-assets
fs.renameSync(path.join(dst, '_next'), path.join(dst, 'next-assets'));
for (const f of fs.readdirSync(dst)) {
  if (/^(artboard|_not-found|404)/.test(f) || f.endsWith('.txt') || f === 'sitemap.xml') fs.rmSync(path.join(dst, f), { recursive: true });
}

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const file of walk(dst).filter((f) => /\.(html|js|css)$/.test(f))) {
  let s = fs.readFileSync(file, 'utf8');
  s = s
    .replace(/(["'(`])\/_next\//g, '$1./next-assets/')
    .replace(/, \/_next\//g, ', ./next-assets/')
    .replace(/(["`])\/images\//g, '$1./images/')
    .replace(/"\/(icon|apple-icon)\.png/g, '"./$1.png')
    // o Next descobre o prefixo pela URL do próprio script
    .replace(/\.indexOf\("\.\/next-assets\/"\)/g, '.indexOf("/next-assets/")')
    // caractere de substituição literal (U+FFFD) vira escape equivalente em JS
    .replace(/\uFFFD/g, file.endsWith('.js') ? '\\uFFFD' : '\uFFFD');
  fs.writeFileSync(file, s);
}
console.log('Prévia estática em preview/');
