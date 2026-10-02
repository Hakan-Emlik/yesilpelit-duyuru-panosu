const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

let PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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
  } catch (e) {}
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

function startServer(portToTry) {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
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

    // Tarayıcıyı otomatik olarak aç
    openBrowser(localUrl);
  });
}

startServer(PORT);
