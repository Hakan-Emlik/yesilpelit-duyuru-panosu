const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

let PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Fazilet Takvimi Samsun (57) API
const FAZILET_SAMSUN_URL = 'https://backend.fazilettakvimi.com/content/public/daily?districtId=57&lang=tr';
const CACHE_FILE = path.join(__dirname, 'assets', 'data', 'samsun_vakitler.json');

let cachedFaziletData = null;
let lastFetchTime = 0;

function fetchFaziletData(callback) {
  https.get(FAZILET_SAMSUN_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Referer': 'https://namaz-vakitleri.fazilettakvimi.com/samsun/57'
    }
  }, (res) => {
    if (res.statusCode !== 200) {
      return callback(new Error(`Fazilet API HTTP ${res.statusCode}`));
    }
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.success) {
          cachedFaziletData = parsed;
          lastFetchTime = Date.now();
          // Önbellek dosyasına da yaz
          fs.mkdir(path.dirname(CACHE_FILE), { recursive: true }, () => {
            fs.writeFile(CACHE_FILE, JSON.stringify(parsed, null, 2), 'utf8', () => {});
          });
          return callback(null, parsed);
        }
        callback(new Error('Geçersiz Fazilet yanıtı'));
      } catch (err) {
        callback(err);
      }
    });
  }).on('error', callback);
}

function handleFaziletApiRequest(req, res) {
  // Önbellek 15 dakikadan yeniyse hemen ver
  if (cachedFaziletData && (Date.now() - lastFetchTime < 15 * 60 * 1000)) {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(JSON.stringify(cachedFaziletData));
    return;
  }

  fetchFaziletData((err, data) => {
    if (!err && data) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });
      res.end(JSON.stringify(data));
    } else {
      // Ağ hatası varsa diskteki önbelleğe başvur
      fs.readFile(CACHE_FILE, 'utf8', (readErr, fileData) => {
        if (!readErr && fileData) {
          try {
            cachedFaziletData = JSON.parse(fileData);
          } catch(e) {}
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache'
          });
          res.end(fileData);
        } else {
          res.writeHead(500, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ success: false, error: err ? err.message : 'Veri alınamadı' }));
        }
      });
    }
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function getLocalIpAddress() {
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  } catch (e) { }
  return '127.0.0.1';
}

function openBrowser(url) {
  if (process.platform === 'win32') {
    // 1. Chrome ile dene
    exec(`start chrome "${url}"`, (err) => {
      if (err) {
        // 2. Edge ile dene
        exec(`start msedge "${url}"`, (err2) => {
          if (err2) {
            // 3. Varsayılan tarayıcı
            exec(`start "" "${url}"`);
          }
        });
      }
    });
  } else if (process.platform === 'darwin') {
    exec(`open "${url}"`);
  } else {
    exec(`xdg-open "${url}"`);
  }
}

// Canlı Senkronizasyon Sistemi (Bağlı TV ve ekranların anında yenilenmesi)
let currentVersion = Date.now();
let sseClients = [];
const VERSION_FILE = path.join(__dirname, 'assets', 'data', 'version.json');

function updateVersionFile() {
  try {
    fs.mkdirSync(path.dirname(VERSION_FILE), { recursive: true });
    fs.writeFileSync(VERSION_FILE, JSON.stringify({
      version: currentVersion,
      updatedAt: new Date().toISOString()
    }, null, 2), 'utf8');
  } catch (e) {}
}

function notifyClients() {
  currentVersion = Date.now();
  updateVersionFile();

  const payload = `data: ${JSON.stringify({ action: 'reload', version: currentVersion })}\n\n`;
  for (let i = sseClients.length - 1; i >= 0; i--) {
    const client = sseClients[i];
    try {
      client.write(payload);
    } catch (err) {
      sseClients.splice(i, 1);
    }
  }
  console.log(`📡 [Canlı Senkronizasyon] Değişiklik algılandı. ${sseClients.length} bağlı ekrana otomatik yenileme iletildi.`);
}

let watchDebounce = null;
function watchForChanges() {
  const watchTargets = [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'assets', 'css'),
    path.join(__dirname, 'assets', 'js'),
    path.join(__dirname, 'assets', 'images'),
    path.join(__dirname, 'assets', 'docs')
  ];

  const trigger = (filename) => {
    if (filename && (filename.includes('samsun_vakitler.json') || filename.includes('version.json'))) {
      return;
    }
    if (watchDebounce) clearTimeout(watchDebounce);
    watchDebounce = setTimeout(() => {
      notifyClients();
    }, 700);
  };

  watchTargets.forEach(target => {
    if (fs.existsSync(target)) {
      try {
        fs.watch(target, { recursive: true }, (eventType, filename) => trigger(filename));
      } catch(e) {}
    }
  });
}

function startServer(portToTry) {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);

    // Fazilet Takvimi Samsun (57) API rotası
    if (reqPath === '/api/fazilet/samsun' || reqPath === '/api/prayer/samsun') {
      handleFaziletApiRequest(req, res);
      return;
    }

    // Canlı Senkronizasyon (SSE) rotası
    if (reqPath === '/api/live-sync') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write(`data: ${JSON.stringify({ action: 'connected', version: currentVersion })}\n\n`);
      sseClients.push(res);
      req.on('close', () => {
        sseClients = sseClients.filter(c => c !== res);
      });
      return;
    }

    // Sürüm kontrol rotası (Yedek polling)
    if (reqPath === '/api/version') {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store'
      });
      res.end(JSON.stringify({ version: currentVersion }));
      return;
    }

    // Manuel yenileme tetikleme rotası
    if (reqPath === '/api/trigger-reload') {
      notifyClients();
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({ success: true, version: currentVersion, clients: sseClients.length }));
      return;
    }

    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    const filePath = path.normalize(path.join(__dirname, reqPath));

    // Security check: ensure filePath is within __dirname
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Access Denied');
      return;
    }



    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>404 - Dosya Bulunamadı</h1><p>${reqPath}</p>`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${portToTry} dolu, ${portToTry + 1} deneniyor...`);
      startServer(portToTry + 1);
    } else {
      console.error('Sunucu hatası:', err);
    }
  });

  server.listen(portToTry, '0.0.0.0', () => {
    const localIp = getLocalIpAddress();
    const localUrl = `http://localhost:${portToTry}`;
    const lanUrl = `http://${localIp}:${portToTry}`;

    console.log(`======================================================`);
    console.log(`🌿 Yeşilpelit Öğrenci Yurdu Duyuru Panosu Yayında!`);
    console.log(`👉 Bu Bilgisayarda:  ${localUrl}`);
    console.log(`👉 Yurt Ağındaki Diğer Cihazlardan (Aynı Wi-Fi):`);
    console.log(`   ${lanUrl}`);
    console.log(`   (Telefon, tablet veya TV tarayıcısına bu adresi yazınız)`);
    console.log(`   (Sayfa zaten açıksa F5 / Yenile yapınız)`);
    console.log(`======================================================`);

    // Fazilet Takvimi Samsun namaz vakitlerini başlangıçta senkronize et
    fetchFaziletData((err, data) => {
      if (!err && data && data.success) {
        console.log(`🕌 [Fazilet Takvimi] Samsun (57) namaz vakitleri başarıyla senkronize edildi.`);
      } else {
        console.log(`⚠️ [Fazilet Takvimi] Canlı bağlantı bekleniyor, yerel önbellek devrede.`);
      }
    });

    // Her 30 dakikada bir arka planda vakitleri tazele
    setInterval(() => {
      fetchFaziletData((err) => {
        if (!err) console.log(`🕌 [Fazilet Takvimi] Samsun (57) vakitleri periyodik olarak güncellendi.`);
      });
    }, 30 * 60 * 1000);

    // Canlı Senkronizasyon dosya izleyicisini başlat
    updateVersionFile();
    watchForChanges();
    console.log(`📡 [Canlı Senkronizasyon] TV ve bağlı ekran izleyici devrede.`);


    // Tarayıcıyı otomatik olarak aç
    openBrowser(localUrl);
  });
}


startServer(PORT);
