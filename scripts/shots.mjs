/**
 * npm run shots -- <fase>
 * Abre o site (BASE_URL, padrão http://localhost:3000) em 3 tamanhos,
 * rola até cada seção, espera as animações e salva os prints em screenshots/fase-N/.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const fase = process.argv[2] || process.env.FASE || '1';
const base = process.env.BASE_URL || 'http://localhost:3000';
const outDir = path.join(process.cwd(), 'screenshots', `fase-${fase}`);
fs.mkdirSync(outDir, { recursive: true });

const DEVICES = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'celular', width: 390, height: 844, mobile: true },
];
const SECTIONS = ['inicio', 'fita', 'historia', 'comanda', 'fundadores', 'contato', 'rodape'];

const browser = await chromium.launch();
const report = [];

for (const d of DEVICES) {
  const ctx = await browser.newContext({
    viewport: { width: d.width, height: d.height },
    isMobile: d.mobile,
    hasTouch: d.mobile,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3200);

  for (const id of SECTIONS) {
    const exists = await page.evaluate((id) => !!document.getElementById(id), id);
    if (!exists) continue;
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      const top = el.getBoundingClientRect().top + window.scrollY - (id === 'inicio' ? 0 : 72);
      window.scrollTo(0, top);
    }, id);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(outDir, `${d.name}-${id}.png`) });
  }

  // página inteira: rola até o fim para disparar as revelações
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += Math.round(d.height * 0.6)) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, `${d.name}-pagina-inteira.png`), fullPage: true });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report.push({ device: d.name, overflowX: overflow, errors });
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
console.log(`Prints em ${path.relative(process.cwd(), outDir)}/`);
