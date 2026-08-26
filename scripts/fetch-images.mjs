#!/usr/bin/env node
/**
 * fetch-images.mjs — Unsplash'ten sayfa görsellerini TEK SEFERLİK indirir.
 *
 * Neden tek seferlik: canlıda Unsplash API'sine bağımlı kalmak, üçüncü parti
 * bir servisi render yoluna sokar. Bu site tamamen statik (CLAUDE.md #7);
 * fotoğraflar repo'ya commit'lenir ve `public/images/` altından servis edilir.
 * Script yalnızca içerik eklendiğinde ELLE çalıştırılır.
 *
 * ── Unsplash API şartları (atlanamaz) ─────────────────────────────────────
 *   1. Her indirmede `links.download_location` ucuna bir istek atılır. Bu,
 *      fotoğrafçının indirme sayacını işleten ZORUNLU bildirimdir; atlanırsa
 *      uygulama erişimi askıya alınabilir.
 *   2. Fotoğrafçı adı + Unsplash profil linki görünür şekilde yayınlanır
 *      (bkz. src/components/Photo.tsx). Linkler utm_source taşır.
 *   Kaynak: https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
 *
 * ── Kota ──────────────────────────────────────────────────────────────────
 * Demo uygulama: 50 istek/saat. Hedef başına 2 istek (arama + download ucu).
 * Script DEVAM EDEBİLİR: manifest'te zaten olan anahtar atlanır, kota
 * dolunca temiz çıkar ve bir saat sonra yeniden çalıştırılır.
 *
 * ── alt metni ─────────────────────────────────────────────────────────────
 * Türkçe `alt`, görselin GERÇEKTEN ne gösterdiğini anlatmak zorunda ve script
 * bunu uyduramaz. Bu yüzden manifest'e Unsplash'in kendi açıklaması
 * `altSource` olarak yazılır, `alt` ise null bırakılır ve ELLE doldurulur.
 * Yeniden çalıştırma elle yazılan `alt`'ı KORUR (üzerine yazmaz).
 *
 * Kullanım:
 *   node scripts/fetch-images.mjs             # eksikleri indir
 *   node scripts/fetch-images.mjs --dry-run   # ne yapacağını yaz, indirme
 *   node scripts/fetch-images.mjs --only KEY  # tek hedef
 *   node scripts/fetch-images.mjs --force     # var olanı yeniden indir
 *   node scripts/fetch-images.mjs --check     # içerik/hedef eşleşmesi (API'siz)
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// ── Sabitler ──────────────────────────────────────────────────────────────
const API = 'https://api.unsplash.com';
/** Unsplash'te kayıtlı uygulama adı — attribution UTM'inde bu kullanılır. */
const APP_NAME = 'miamigezi';
const OUT_DIR = path.join('public', 'images');
const MANIFEST = path.join('src', 'content', 'images.json');

/** Yayın genişliği. Kap 78rem=1248px; 2x retina için 1600 yeterli. */
const WIDTH = 1600;
const WEBP_QUALITY = 80;
/** LQIP: 16px genişlik, next/image blur placeholder'ı bunu 40x büyütüyor. */
const BLUR_WIDTH = 16;

const FLAGS = {
  dryRun: process.argv.includes('--dry-run'),
  force: process.argv.includes('--force'),
  check: process.argv.includes('--check'),
  only: (() => {
    const i = process.argv.indexOf('--only');
    return i > -1 ? process.argv[i + 1] : null;
  })(),
};

// ─────────────────────────────────────────────────────────────────────────
// Hedefler — anahtar → arama terimi
//
// Arama terimleri EDİTORYALDİR (İngilizce; Unsplash'in dizini İngilizce).
// `key` iki yerde birden geçer: manifest anahtarı ve sayfa kodundaki
// getImage() çağrısı. Dosya adı anahtardan türer: 'guide:plajlar' →
// public/images/guide-plajlar.webp
// ─────────────────────────────────────────────────────────────────────────
const TARGETS = [
  // Sayfa hero'ları
  { key: 'page:home', query: 'Miami South Beach ocean drive art deco' },
  { key: 'page:blog', query: 'Miami skyline sunset waterfront' },
  { key: 'page:hakkinda', query: 'Miami art deco building facade' },

  // Rehberler (src/content/guides/*.ts ile slug bazında eşleşir)
  { key: 'guide:ilk-kez', query: 'Miami beach palm trees sunny day' },
  { key: 'guide:ucak-bileti', query: 'Miami International Airport' },
  { key: 'guide:oteller', query: 'Miami Beach hotel swimming pool' },
  { key: 'guide:gezilecek-yerler', query: 'Wynwood Miami street art mural' },
  { key: 'guide:plajlar', query: 'Miami Beach lifeguard tower' },
  { key: 'guide:hava-durumu', query: 'Miami storm clouds palm trees' },
  { key: 'guide:ulasim', query: 'Miami highway aerial view traffic' },
  { key: 'guide:yeme-icme', query: 'Miami restaurant outdoor dining' },
  { key: 'guide:alisveris', query: 'Miami Design District shopping street' },
  { key: 'guide:ailece-miami', query: 'Miami Beach family sunset' },

  // Yazılar (src/lib/blogData.ts ile slug bazında eşleşir)
  { key: 'blog:turk-ehliyetiyle-miamide-arac-kiralama', query: 'Miami highway driving car' },
  { key: 'blog:miamide-kasirga-uyarisi-gelirse-ne-yapmali', query: 'Miami storm dark clouds palm trees' },
  { key: 'blog:miamide-helal-yemek-ve-cami', query: 'shawarma kebab plate' },
  { key: 'blog:miamide-acil-saglik-durumu', query: 'emergency medical ambulance' },
  { key: 'blog:miamiden-key-weste-gunubirlik-gezi', query: 'Key West Florida overseas highway bridge' },
  { key: 'blog:miamide-tek-basina-kadin-seyahati', query: 'Miami street woman walking' },
  { key: 'blog:miamide-kredi-karti-mi-nakit-mi', query: 'credit card contactless payment terminal' },
  { key: 'blog:miamide-internet-ve-esim', query: 'smartphone sim card travel' },
  { key: 'blog:miamide-guvenlik-nelere-dikkat-etmeli', query: 'Miami Beach street at night neon' },
];

// ── Yardımcılar ───────────────────────────────────────────────────────────

/** 'guide:plajlar' → 'guide-plajlar'  (dosya adı ve URL parçası) */
function keyToFile(key) {
  return key.replace(':', '-');
}

/**
 * .env.local'i elle ayrıştırır. Bilinçli olarak bağımlılık eklemiyoruz ve
 * DEĞER ASLA log'lanmıyor (gizli anahtar transcript'e/settings'e sızmasın).
 */
function loadKey() {
  if (process.env.UNSPLASH_ACCESS_KEY) return process.env.UNSPLASH_ACCESS_KEY;
  for (const file of ['.env.local', '.env']) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*UNSPLASH_ACCESS_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  }
  return null;
}

function readManifest() {
  if (!fs.existsSync(MANIFEST)) return {};
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

/** Anahtara göre sıralı yazar — diff'ler okunabilir kalsın. */
function writeManifest(manifest) {
  const sorted = Object.fromEntries(
    Object.keys(manifest)
      .sort()
      .map((k) => [k, manifest[k]]),
  );
  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
}

let rateRemaining = null;

async function api(url, key) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${key}`,
      'Accept-Version': 'v1',
    },
  });
  const remaining = res.headers.get('x-ratelimit-remaining');
  if (remaining !== null) rateRemaining = Number(remaining);

  if (res.status === 403) {
    const body = await res.text();
    const err = new Error(
      `Unsplash 403 — kota dolmuş olabilir (kalan: ${remaining}). Bir saat sonra tekrar çalıştır.\n${body.slice(0, 200)}`,
    );
    err.rateLimited = true;
    throw err;
  }
  if (!res.ok) throw new Error(`Unsplash ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

/**
 * Adayları eler ve en iyisini seçer.
 *  - yatay ve yeterince geniş olmalı (hero bandı 1600px basıyor)
 *  - Unsplash'in kendi açıklaması olmalı: alt metnin DAYANAĞI bu. Açıklaması
 *    olmayan fotoğraf için dürüst bir alt yazılamaz, o yüzden elenir.
 *  - aynı fotoğraf iki sayfada kullanılmaz (usedIds)
 */
function pickPhoto(results, usedIds) {
  const eligible = results.filter(
    (p) =>
      p.width >= WIDTH &&
      p.width > p.height &&
      !usedIds.has(p.id) &&
      (p.description || p.alt_description),
  );
  if (!eligible.length) return null;
  // Unsplash arama sonuçları zaten alaka sırasında; beğeni sayısı eşit
  // alakada kaliteyi ayırıyor, ama sırayı tamamen bozmasın diye ilk 8'in
  // içinden seçiyoruz.
  return eligible.sort((a, b) => b.likes - a.likes)[0];
}

async function downloadBytes(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`İndirme ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// ── İçerik/hedef eşleşme denetimi (API'siz) ───────────────────────────────
// Hedef listesi elle yazılıyor; içerik SSOT'u ile sessizce ayrışmasın diye
// slug'lar dosyalardan okunup karşılaştırılır.
function contentSlugs() {
  const guides = fs
    .readdirSync(path.join('src', 'content', 'guides'))
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts')
    .map((f) => {
      const t = fs.readFileSync(path.join('src', 'content', 'guides', f), 'utf8');
      return (t.match(/slug:\s*'([^']+)'/) || [])[1];
    })
    .filter(Boolean);

  const generated = JSON.parse(
    fs.readFileSync(path.join('src', 'content', 'blog', 'generated-posts.json'), 'utf8'),
  )
    .filter((p) => p.status !== 'needs_review')
    .map((p) => p.slug);

  const seedText = fs.readFileSync(path.join('src', 'content', 'blog', 'seed.ts'), 'utf8');
  const seed = [...seedText.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

  return { guides, posts: [...seed, ...generated] };
}

/**
 * @param withAlt  Eksik Türkçe alt metnini ÖLÜMCÜL say. Yalnızca --check
 *   (CI kapısı) için true. İndirme yolunda false olmak ZORUNDA: script'in
 *   kendi başarı çıktısı `alt: null` yazıyor, ölümcül sayılsaydı yarıda
 *   kesilen bir koşu (kota doldu) bir daha çalıştırılamazdı.
 */
function checkCoverage(withAlt) {
  const { guides, posts } = contentSlugs();
  const have = new Set(TARGETS.map((t) => t.key));
  const problems = [];

  for (const slug of guides) {
    if (!have.has(`guide:${slug}`)) problems.push(`EKSİK hedef: guide:${slug}`);
  }
  for (const slug of posts) {
    // Günlük hat yeni yazı eklediğinde burası UYARI verir, hata değil:
    // görselsiz yazı sorunsuz render olur (Photo bileşeni null döner).
    if (!have.has(`blog:${slug}`)) problems.push(`UYARI eksik hedef: blog:${slug}`);
  }
  const knownGuides = new Set(guides);
  const knownPosts = new Set(posts);
  for (const t of TARGETS) {
    const [kind, slug] = [t.key.slice(0, t.key.indexOf(':')), t.key.slice(t.key.indexOf(':') + 1)];
    if (kind === 'guide' && !knownGuides.has(slug)) problems.push(`ÖKSÜZ hedef: ${t.key} (rehber yok)`);
    if (kind === 'blog' && !knownPosts.has(slug)) problems.push(`ÖKSÜZ hedef: ${t.key} (yazı yok)`);
  }

  // Manifest'te alt metni doldurulmamış kayıt varsa bu ÖLÜMCÜLDÜR: alt'sız
  // görsel ekran okuyucuda sessiz kalır ve build'e kadar fark edilmez.
  if (withAlt && fs.existsSync(MANIFEST)) {
    for (const [key, e] of Object.entries(JSON.parse(fs.readFileSync(MANIFEST, 'utf8')))) {
      if (!e.alt || !e.alt.trim()) problems.push(`ALT METNİ EKSİK: ${key} (altSource: "${e.altSource}")`);
    }
  }

  const fatal = problems.filter((p) => !p.startsWith('UYARI'));
  problems.forEach((p) => console[p.startsWith('UYARI') ? 'warn' : 'error'](`  ${p}`));
  if (!problems.length) {
    console.log(`✓ hedef/içerik eşleşmesi tam — ${guides.length} rehber, ${posts.length} yazı, ${TARGETS.length} hedef`);
  }
  return fatal.length;
}

// ── Ana akış ──────────────────────────────────────────────────────────────
async function main() {
  if (FLAGS.check) process.exit(checkCoverage(true) ? 1 : 0);

  const key = loadKey();
  if (!key && !FLAGS.dryRun) {
    console.error('UNSPLASH_ACCESS_KEY yok. .env.local dosyasına ekle (değeri komut satırına YAZMA).');
    process.exit(1);
  }

  const coverageProblems = checkCoverage(false);
  if (coverageProblems) {
    console.error('\nHedef listesi içerikle uyuşmuyor — önce TARGETS düzeltilmeli.');
    process.exit(1);
  }

  const manifest = readManifest();
  const usedIds = new Set(Object.values(manifest).map((e) => e.unsplashId));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const queue = TARGETS.filter((t) => {
    if (FLAGS.only) return t.key === FLAGS.only;
    if (FLAGS.force) return true;
    return !manifest[t.key];
  });

  console.log(
    `\n${queue.length} hedef indirilecek (${TARGETS.length} toplam, ${TARGETS.length - queue.length} zaten var).`,
  );
  if (FLAGS.dryRun) {
    queue.forEach((t) => console.log(`  · ${t.key.padEnd(46)} "${t.query}"`));
    console.log(`\n--dry-run: ${queue.length * 2} API isteği gerekirdi (kota 50/saat).`);
    return;
  }

  let done = 0;
  for (const target of queue) {
    const file = keyToFile(target.key);
    try {
      // 1) Arama
      const search = await api(
        `${API}/search/photos?query=${encodeURIComponent(target.query)}` +
          `&per_page=8&orientation=landscape&content_filter=high`,
        key,
      );
      const photo = pickPhoto(search.results ?? [], usedIds);
      if (!photo) {
        console.warn(`  ! ${target.key}: uygun aday yok ("${target.query}") — terimi değiştir`);
        continue;
      }

      // 2) ZORUNLU indirme bildirimi (Unsplash API şartı)
      await api(photo.links.download_location, key);

      // 3) Baytları CDN'den al (bu istek API kotasına sayılmaz)
      const raw = await downloadBytes(`${photo.urls.raw}&w=${WIDTH * 2}&fm=jpg&q=90`);

      // 4) WebP'ye çevir + sıkıştır
      const out = path.join(OUT_DIR, `${file}.webp`);
      const info = await sharp(raw)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(out);

      // 5) blur placeholder (next/image için)
      const blur = await sharp(raw).resize({ width: BLUR_WIDTH }).webp({ quality: 55 }).toBuffer();

      usedIds.add(photo.id);
      const prev = manifest[target.key];
      const samePhoto = prev?.unsplashId === photo.id;
      manifest[target.key] = {
        key: target.key,
        src: `/images/${file}.webp`,
        width: info.width,
        height: info.height,
        blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
        // Türkçe alt — ELLE doldurulur ve yeniden çalıştırmada korunur,
        // AMA YALNIZCA FOTOĞRAF AYNIYSA. Fotoğraf değiştiyse eski alt artık
        // başka bir kareyi anlatıyor demektir: otomatik null'a düşer, kapı
        // (--check) onu yakalar. Bu koruma olmadan --force ile değiştirilen
        // bir görselin altında eski açıklama sessizce yaşamaya devam ediyordu.
        alt: samePhoto ? (prev?.alt ?? null) : null,
        // temsilî: karede ya da Unsplash açıklamasında Miami/Florida kanıtı
        // yoksa true. Varsayılan GÜVENLİ tarafta (true): kanıtlanmamış bir
        // fotoğraf sessizce "Miami" ima etmesin. Fotoğraf değişince de
        // güvenli tarafa döner — yeni kare için karar yeniden verilir.
        illustrative: samePhoto ? (prev?.illustrative ?? true) : true,
        // alt metninin dayanağı: Unsplash'in kendi açıklaması. Uydurma yasak.
        altSource: photo.description || photo.alt_description || '',
        photographer: photo.user.name,
        photographerUrl: `https://unsplash.com/@${photo.user.username}?utm_source=${APP_NAME}&utm_medium=referral`,
        unsplashUrl: `${photo.links.html}?utm_source=${APP_NAME}&utm_medium=referral`,
        unsplashId: photo.id,
        query: target.query,
      };
      writeManifest(manifest); // her adımda yaz: yarıda kesilirse kaybolmasın
      done++;
      const kb = Math.round(info.size / 1024);
      console.log(
        `  ✓ ${target.key.padEnd(46)} ${info.width}×${info.height} ${String(kb).padStart(4)}KB  © ${photo.user.name}  [kota kalan: ${rateRemaining}]`,
      );
    } catch (err) {
      if (err.rateLimited) {
        console.error(`\n${err.message}`);
        console.error(`${done} hedef indirildi, manifest kaydedildi. Kalanlar için scripti tekrar çalıştır.`);
        process.exit(2);
      }
      console.error(`  ✗ ${target.key}: ${err.message}`);
    }
  }

  const missingAlt = Object.values(manifest).filter((e) => !e.alt);
  console.log(`\n${done} görsel indirildi. Manifest: ${MANIFEST}`);
  if (missingAlt.length) {
    console.log(`\n${missingAlt.length} kayıtta Türkçe alt metni EKSİK — elle doldurulmalı:`);
    for (const e of missingAlt) console.log(`  ${e.key.padEnd(46)} altSource: "${e.altSource}"`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
