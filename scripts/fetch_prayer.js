/**
 * Fazilet Takvimi'nden güncel vakitleri çekip assets/data/fazilet_atakum.json
 * arşivine ekler. GitHub Actions bu betiği her gün otomatik çalıştırır
 * (.github/workflows/vakitleri-guncelle.yml), böylece GitHub Pages'teki pano
 * bilgisayar kapalıyken de güncel vakitleri gösterir.
 *
 * Kullanım: npm run fetch:prayer
 */
const path = require('path');
const {
  fetchArchive, readArchive, mergeArchives, pruneArchive, writeArchive
} = require('./lib/fazilet');

const TARGET = path.join(__dirname, '..', 'assets', 'data', 'fazilet_atakum.json');

async function main() {
  const existing = readArchive(TARGET);
  const fresh = await fetchArchive(15000);
  const merged = pruneArchive(mergeArchives(existing, fresh), 14);
  const changed = writeArchive(TARGET, merged);
  const days = Object.keys(merged.gunler);
  console.log(`[Fazilet] ${days.length} gün (${days[0]} → ${days[days.length - 1]}). ${changed ? 'Dosya güncellendi.' : 'Değişiklik yok.'}`);
}

main().catch(err => {
  console.error('[Fazilet] Vakitler alınamadı:', err.message);
  process.exit(1);
});
