#!/usr/bin/env node
/**
 * check-renk.mjs — krem/bej koruma kapısı
 *
 * "Ocean Drive Sunset" yönünün sert kuralı: KREM/BEJ YASAK, ikincil yüzeyler
 * SOĞUK (maviye çalan). Bu kapı o kuralı çalıştırılabilir hâle getirir.
 *
 * İki katman:
 *   1. Bilinen-kötü liste — daha önce bu marka ailesinde görülmüş krem/bej
 *      hex'leri, adıyla yakalanır (hata mesajı net olsun diye).
 *   2. Sıcak nötr BANDI — listede olmayan YENİ bir krem de yakalanır.
 *      R≈G>B ve düşük chroma. Kritik ayrım: krem/bej ile paletin meşru
 *      sunset/sun aksanları İKİSİ DE sıcaktır (R>B); onları ayıran şey
 *      chroma'dır. #C9B89E (bej) R-B=43 · #ffc53d (sun) R-B=194.
 *      Bu yüzden bant İKİ eşik ister; tek eşikle ya paleti yakalar ya kremi kaçırır.
 *
 * Kullanım:
 *   node scripts/check-renk.mjs              # src'yi tara, ihlalde exit 1
 *   node scripts/check-renk.mjs --self-test  # kapının kendi birim testi
 */

import fs from 'node:fs';
import path from 'node:path';

const FLAGS = { selfTest: process.argv.includes('--self-test') };

// ── Yapılandırma ──────────────────────────────────────────────────────────
const SCAN_ROOTS = ['src'];
const EXTS = new Set(['.css', '.ts', '.tsx']);
// Build artifactları ve bağımlılıklar taranmaz: üretilmiş CSS'te Tailwind'in
// kendi nötrleri var, onlar bizim yazdığımız kod değil.
const SKIP_DIRS = new Set(['.next', 'node_modules', '.git', 'out', 'dist', '.vercel', 'coverage']);

// Katman 1 — bilinen krem/bej hex'leri (6 hane, küçük harfe normalize).
const BANNED_HEX = new Map([
  ['e8ddd0', 'klasik krem yüzey'],
  ['f2ede7', 'kırık beyaz krem'],
  ['c9b89e', 'bej / tan'],
  ['fafaf7', 'sıcak kırık beyaz'],
  ['f5f1ea', 'krem kağıt'],
  ['faf9f6', 'sıcak kırık beyaz'],
]);

// Katman 2 — sıcak nötr bandı eşikleri.
const TOL_RG = 30;      // |R-G|: nötr sayılmak için R ve G birbirine yakın olmalı
const MAX_WARMTH = 90;  // R-B: bunun ÜSTÜ doygun sıcak aksandır (sunset/sun), nötr değil

// `#icerik`, `#article`, `#publisher` gibi anchor/JSON-LD @id parçaları RENK DEĞİL.
// Sondaki negatif lookahead onları eler: `#article` -> 'a' hex ama 'r' değil.
const COLOR_RE =
  /#(?<hex>[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-zA-Z_-])|rgba?\(\s*(?<r>\d{1,3})\s*[, ]\s*(?<g>\d{1,3})\s*[, ]\s*(?<b>\d{1,3})/g;

// ── Renk ayrıştırma ───────────────────────────────────────────────────────
function literalToRGB(match) {
  const g = match.groups;
  if (g.hex) {
    let h = g.hex.toLowerCase();
    if (h.length === 3 || h.length === 4) h = h.slice(0, 3).split('').map((c) => c + c).join('');
    h = h.slice(0, 6);
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), hex: h };
  }
  const r = Number(g.r), gg = Number(g.g), b = Number(g.b);
  if ([r, gg, b].some((v) => Number.isNaN(v) || v > 255)) return null;
  const hex = [r, gg, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  return { r, g: gg, b, hex };
}

// ── Sınıflandırma ─────────────────────────────────────────────────────────
function classify(c) {
  const named = BANNED_HEX.get(c.hex);
  if (named) return `bilinen krem/bej (#${c.hex} — ${named})`;

  // Sıcak nötr bandı. Üç koşul birlikte gerekir:
  //   R≈G   → nötr (renk kanalları birbirine yakın; pembe/turkuaz burada elenir)
  //   G>B   → sıcak (maviye DEĞİL sarıya çalıyor). Katı '>' saf griyi ve
  //           beyazı da eler: #ffffff'te 255>255 yanlıştır.
  //   R-B küçük → düşük chroma. Bu olmadan bant #ffc53d (sun, R-B=194) gibi
  //           paletin meşru doygun sıcak aksanlarını da yerdi.
  const dRG = Math.abs(c.r - c.g);
  const warmth = c.r - c.b;
  if (dRG <= TOL_RG && c.g > c.b && warmth > 0 && warmth <= MAX_WARMTH) {
    return `sıcak nötr bandı: R≈G>B (|R-G|=${dRG}≤${TOL_RG}, R-B=${warmth}≤${MAX_WARMTH}) — krem/bej ailesi`;
  }
  return null;
}

// ── Tarama ────────────────────────────────────────────────────────────────
function scanText(text) {
  const hits = [];
  text.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(COLOR_RE)) {
      const c = literalToRGB(m);
      if (!c) continue;
      const reason = classify(c);
      if (reason) hits.push({ line: i + 1, col: m.index + 1, literal: m[0], reason });
    }
  });
  return hits;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name), out);
    } else if (EXTS.has(path.extname(e.name))) {
      out.push(path.join(dir, e.name));
    }
  }
  return out;
}

function scanRepo() {
  const violations = [];
  let files = 0;
  for (const root of SCAN_ROOTS) {
    if (!fs.existsSync(root)) continue;
    for (const file of walk(root)) {
      files++;
      for (const hit of scanText(fs.readFileSync(file, 'utf8'))) violations.push({ file, ...hit });
    }
  }
  return { violations, files };
}

// ── Self-test: İKİ YÖNLÜ ──────────────────────────────────────────────────
// (a) her krem/bej YAKALANMALI, (b) paletin gerçek renkleri GEÇMELİ.
// Sadece (a) yazılırsa bant zamanla paleti de yer; sadece (b) yazılırsa kapı
// ölü olur ve "0 ihlal" hiçbir şey kanıtlamaz.
const MUST_CATCH = [
  ['bilinen krem #E8DDD0', '#E8DDD0'],
  ['bilinen krem #F2EDE7', 'background: #F2EDE7;'],
  ['bilinen bej #C9B89E', '#c9b89e'],
  ['bilinen sıcak beyaz #FAFAF7', '#FAFAF7'],
  ['bilinen krem #f5f1ea', '#f5f1ea'],
  ['bilinen sıcak beyaz #FAF9F6', '#FAF9F6'],
  ['listede OLMAYAN yeni krem', '#efe6d9'],
  ['listede OLMAYAN yeni bej', '#d8cfc0'],
  ['listede OLMAYAN kum tonu', '#e3dccf'],
  ['3 haneli krem', 'color: #fed;'],
  ['alfa kanallı krem', '#f5f1eaff'],
  ['rgb() gösterimli krem', 'rgb(232, 221, 208)'],
  ['rgba() gösterimli bej', 'rgba(201,184,158,0.5)'],
  ['koyu sıcak nötr', '#4a453c'],
];

const MUST_PASS = [
  ['paper', '--color-paper: #ffffff;'],
  ['paper-2 (soğuk)', '--color-paper-2: #f5f8fc;'],
  ['ink', '#0a1633'],
  ['ink-2', '#3a4c74'],
  ['mute', '#5b6c87'],
  ['flamingo', '#f5317f'],
  ['flamingo-quiet', '#ce146c'],
  ['flamingo-deep', '#bb1362'],
  ['flamingo-wash (pembeye çalar)', '#fdecf3'],
  ['lagoon', '#0fb5ba'],
  ['lagoon-deep', '#0a7379'],
  ['lagoon-ink', '#0c3d49'],
  ['sunset (doygun sıcak aksan)', '#ff8a3d'],
  ['sun (doygun sıcak aksan)', '#ffc53d'],
  ['nötr gri', '#f5f5f5'],
  ['siyah', '#000000'],
  ['anchor #icerik renk değil', 'href="#icerik"'],
  ['JSON-LD @id #article renk değil', '"@id": "https://x/y#article"'],
  ['@id #publisher renk değil', '#publisher'],
];

function selfTest() {
  let failed = 0;

  for (const [name, sample] of MUST_CATCH) {
    const hits = scanText(sample);
    if (!hits.length) {
      console.error(`SELF-TEST FAIL: '${name}' YAKALANMALIYDI → ${sample}`);
      failed++;
    } else {
      console.log(`✓ yakalandı: ${name} → ${hits[0].reason}`);
    }
  }

  for (const [name, sample] of MUST_PASS) {
    const hits = scanText(sample);
    if (hits.length) {
      console.error(`SELF-TEST FAIL: '${name}' YANLIŞ POZİTİF — geçmeliydi → ${hits[0].literal} (${hits[0].reason})`);
      failed++;
    } else {
      console.log(`✓ yanlış pozitif yok: ${name}`);
    }
  }

  if (failed) {
    console.error(`\nSELF-TEST FAIL — ${failed} vaka başarısız`);
    process.exit(1);
  }
  console.log(`\nSELF-TEST OK — ${MUST_CATCH.length} krem/bej yakalandı, ${MUST_PASS.length} meşru renk geçti`);
}

// ── Ana akış ──────────────────────────────────────────────────────────────
function main() {
  if (FLAGS.selfTest) return selfTest();

  const { violations, files } = scanRepo();
  if (violations.length) {
    console.error(`\n✗ KREM/BEJ KAPISI — ${violations.length} ihlal (${files} dosya tarandı)\n`);
    for (const v of violations) {
      console.error(`  ${v.file}:${v.line}:${v.col}  ${v.literal}`);
      console.error(`      ${v.reason}`);
    }
    console.error(`\n"Ocean Drive Sunset" kuralı: krem/bej yasak, ikincil yüzeyler SOĞUK.`);
    console.error(`Soğuk alternatif: --color-paper-2 (#f5f8fc) veya --color-paper (#ffffff).\n`);
    process.exit(1);
  }
  console.log(`✓ krem/bej yok — ${files} dosya tarandı (src/**/*.{css,ts,tsx})`);
}

main();
