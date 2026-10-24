/**
 * Fazilet Takvimi — Samsun Atakum (İlçe 2025) namaz vakitleri yardımcıları.
 *
 * Fazilet'in herkese açık API'si yalnızca dün / bugün / yarın verisini döndürür.
 * Bu yüzden gelen veriler sade bir "arşiv" biçimine dönüştürülüp gün gün biriktirilir:
 *
 * {
 *   "kaynak": "...", "bolge": "Atakum", "ilceId": 2025, "saatDilimi": "Europe/Istanbul",
 *   "guncellendi": "2026-10-24T14:00:00.000Z",
 *   "gunler": {
 *     "2026-10-24": { "imsak": "05:08", "gunes": "06:48", "ogle": "12:29",
 *                     "ikindi": "15:25", "aksam": "17:50", "yatsi": "19:19",
 *                     "hicri": "13 Cemâziyelevvel 1448" }
 *   }
 * }
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const DISTRICT_ID = 2025;
const TIME_ZONE = 'Europe/Istanbul';
const PAGE_URL = `https://namaz-vakitleri.fazilettakvimi.com/samsun-atakum/${DISTRICT_ID}`;
const API_URL = `https://backend.fazilettakvimi.com/content/public/daily?districtId=${DISTRICT_ID}&lang=tr`;
const VAKIT_KEYS = ['imsak', 'gunes', 'ogle', 'ikindi', 'aksam', 'yatsi'];

function fetchRaw(timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const req = https.get(API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': PAGE_URL
      },
      timeout: timeoutMs
    }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Fazilet API HTTP ${res.statusCode}`));
      }
      let raw = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { raw += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          if (!parsed || !parsed.success || !Array.isArray(parsed.vakitler)) {
            return reject(new Error('Geçersiz Fazilet yanıtı'));
          }
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('timeout', () => req.destroy(new Error('Fazilet API zaman aşımı')));
    req.on('error', reject);
  });
}

function toLocalHHMM(iso, tz) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d)) return null;
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: tz
  }).format(d);
}

function todayStr(tz = TIME_ZONE, offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(d);
}

function emptyArchive() {
  return {
    kaynak: PAGE_URL,
    bolge: 'Atakum',
    ilceId: DISTRICT_ID,
    saatDilimi: TIME_ZONE,
    guncellendi: null,
    gunler: {}
  };
}

/** Fazilet API yanıtını arşiv biçimine dönüştürür. */
function rawToArchive(raw) {
  const tz = raw.bolge_saatdilimi || TIME_ZONE;
  const archive = emptyArchive();
  archive.bolge = raw.bolge_adi || archive.bolge;
  archive.saatDilimi = tz;
  archive.guncellendi = new Date().toISOString();

  const hicriByDate = {};
  (raw.takvimler || []).forEach(t => {
    if (t && t.tarih && t.hicri_tarih) hicriByDate[t.tarih] = t.hicri_tarih;
  });

  (raw.vakitler || []).forEach(v => {
    if (!v || !v.tarih) return;
    const day = {};
    for (const key of VAKIT_KEYS) {
      const hhmm = toLocalHHMM(v[key] && v[key][0] && v[key][0].tarih, tz);
      if (!hhmm) return; // eksik kayıtları atla
      day[key] = hhmm;
    }
    if (hicriByDate[v.tarih]) day.hicri = hicriByDate[v.tarih];
    archive.gunler[v.tarih] = day;
  });

  return archive;
}

/** Birden fazla arşivi gün bazında birleştirir (sonraki argüman öncekini ezer). */
function mergeArchives(...archives) {
  const result = emptyArchive();
  for (const a of archives) {
    if (!a || !a.gunler) continue;
    Object.assign(result.gunler, a.gunler);
    if (a.bolge) result.bolge = a.bolge;
    if (a.guncellendi && (!result.guncellendi || a.guncellendi > result.guncellendi)) {
      result.guncellendi = a.guncellendi;
    }
  }
  result.gunler = sortDays(result.gunler);
  return result;
}

/** Belirtilen günden eski kayıtları atar. */
function pruneArchive(archive, keepPastDays = 7) {
  const limit = todayStr(archive.saatDilimi || TIME_ZONE, -keepPastDays);
  const gunler = {};
  Object.keys(archive.gunler || {}).forEach(date => {
    if (date >= limit) gunler[date] = archive.gunler[date];
  });
  return Object.assign({}, archive, { gunler: sortDays(gunler) });
}

function sortDays(gunler) {
  const sorted = {};
  Object.keys(gunler).sort().forEach(k => { sorted[k] = gunler[k]; });
  return sorted;
}

function readArchive(file) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (data && data.gunler) return data;
    if (data && data.vakitler) return rawToArchive(data); // eski ham biçim
  } catch (e) { /* dosya yok veya bozuk */ }
  return null;
}

/**
 * Arşivi diske yazar. Gün verisi değişmediyse dosyaya dokunmaz
 * (gereksiz git değişikliklerini önlemek için). Yazıldıysa true döner.
 */
function writeArchive(file, archive) {
  const existing = readArchive(file);
  if (existing && JSON.stringify(existing.gunler) === JSON.stringify(archive.gunler)) {
    return false;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(archive, null, 2) + '\n', 'utf8');
  return true;
}

async function fetchArchive(timeoutMs) {
  return rawToArchive(await fetchRaw(timeoutMs));
}

module.exports = {
  DISTRICT_ID,
  PAGE_URL,
  API_URL,
  TIME_ZONE,
  fetchRaw,
  fetchArchive,
  rawToArchive,
  mergeArchives,
  pruneArchive,
  readArchive,
  writeArchive,
  todayStr
};
