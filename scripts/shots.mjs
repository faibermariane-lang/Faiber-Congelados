#!/usr/bin/env node
/**
 * Capturas por seção e de página inteira, em 3 breakpoints.
 *   npm run shots -- --phase 1          (padrão: fase 1)
 *   npm run shots -- --phase 2 --only desktop,mobile
 * Usa o servidor em http://localhost:3000 se estiver no ar; senão, sobe `next dev`.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { setTimeout as wait } from "node:timers/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const arg = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const phase = arg("phase", process.env.PHASE ?? "1");
const base = arg("url", "http://localhost:3000");
const only = arg("only", "")?.split(",").filter(Boolean);
const motion = arg("motion", "1") !== "0";

const devices = [
  { key: "desktop", width: 1440, height: 900 },
  { key: "tablet", width: 768, height: 1024 },
  { key: "mobile", width: 390, height: 844 },
].filter((d) => !only.length || only.includes(d.key));

// Ordem e espera extra por seção (seções pinadas/animadas precisam de mais tempo).
// `progress`: fração da seção a rolar antes da captura (para pinagens, ex.: 0.5).
const sections = [
  { id: "hero", slug: "hero", settle: 2600 },
  { id: "esteira", slug: "esteira" },
  { id: "manifesto", slug: "manifesto" },
  { id: "evolucao", slug: "evolucao" },
  { id: "processo", slug: "processo" },
  { id: "produtos", slug: "produtos" },
  { id: "cardapio", slug: "comanda" },
  { id: "historia", slug: "historia" },
  { id: "contato", slug: "contato" },
  { id: "rodape", slug: "rodape" },
];

const previewFont = join(process.cwd(), "scripts", "preview-fonts", "figtree-latin.woff2");
const outDir = join(process.cwd(), "screenshots", `fase-${phase}`);
mkdirSync(outDir, { recursive: true });

async function up(url) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(4000) });
    return r.status < 500;
  } catch {
    return false;
  }
}

let server;
if (!(await up(base))) {
  console.log("› subindo next dev…");
  server = spawn("npx", ["next", "dev", "-p", "3000"], { stdio: "ignore", detached: true });
  for (let i = 0; i < 90 && !(await up(base)); i++) await wait(1000);
  if (!(await up(base))) throw new Error("servidor não respondeu");
}

const executablePath = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const browser = await chromium.launch({ executablePath });

try {
  for (const d of devices) {
    const ctx = await browser.newContext({
      viewport: { width: d.width, height: d.height },
      deviceScaleFactor: 1,
      reducedMotion: motion ? "no-preference" : "reduce",
      hasTouch: d.key !== "desktop",
      isMobile: d.key === "mobile",
    });
    const page = await ctx.newPage();
    // Sem acesso ao Fontshare (ex.: container de CI), usa substitutos de pré-visualização:
    // Satoshi → Figtree (arquivo local); Clash Display → reserva Bricolage Grotesque do próprio CSS.
    if (!process.env.ALLOW_FONTSHARE) {
      await page.route(/api\.fontshare\.com/, (r) =>
        r.fulfill({
          contentType: "text/css",
          body: '@font-face{font-family:"Satoshi";src:url(https://preview.fonts/figtree.woff2) format("woff2");font-weight:300 900;font-display:swap}',
        }),
      );
      await page.route(/preview\.fonts/, (r) => r.fulfill({ contentType: "font/woff2", body: readFileSync(previewFont) }));
    }
    await page.goto(`${base}/?artboard=1${motion ? "" : "&motion=0"}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await wait(400);

    let n = 0;
    for (const s of sections) {
      const ok = await page.evaluate((id) => window.__faiber?.scrollTo(id, true) ?? false, s.id);
      if (!ok) continue;
      n++;
      if (s.progress) {
        await page.evaluate(({ id, p }) => {
          const el = document.getElementById(id);
          window.__faiber.scrollToY(el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * p);
        }, { id: s.id, p: s.progress });
      }
      await wait(s.settle ?? 1600);
      const file = `${d.key}-${String(n).padStart(2, "0")}-${s.slug}.png`;
      await page.screenshot({ path: join(outDir, file) });
      console.log(`  ✓ ${file}`);
    }

    // Página inteira: percorre tudo para disparar as revelações e volta ao topo.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(d.height * 0.6)) {
      await page.evaluate((yy) => window.__faiber.scrollToY(yy), y);
      await wait(220);
    }
    await wait(1200);
    await page.evaluate(() => window.__faiber.scrollToY(0));
    await wait(1600);
    await page.screenshot({ path: join(outDir, `${d.key}-00-pagina-inteira.png`), fullPage: true });
    console.log(`  ✓ ${d.key}-00-pagina-inteira.png`);
    await ctx.close();
  }
} finally {
  await browser.close();
  if (server) process.kill(-server.pid);
}
console.log(`\nCapturas em screenshots/fase-${phase}/`);
