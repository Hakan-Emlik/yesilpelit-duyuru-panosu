/**
 * YEŞİLPELİT ÖĞRENCİ YURDU DUYURU PANOSU — STANDALONE DERLEYİCİ
 *
 * Bu betik projedeki modüler kaynakları (CSS, JS, JSON verileri, görseller ve PDF'ler)
 * tek bir kendi kendine yeten (self-contained) `index.html` dosyasına derler.
 *
 * Artık:
 * 1. CSS tek kaynaktır: `assets/css/style.css`
 * 2. JS tek kaynaktır: `assets/js/time.js`, `prayer.js`, `app.js`, `sync.js`
 * 3. İçerikler JSON'dur: `assets/data/program.json`, `hikmet.json`, `fazilet_atakum.json`
 * 4. Dosyalarda yapılan herhangi bir düzenleme bu derleyici çalıştırıldığında anında `index.html`'e yansır!
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

// 1. Dosya Yolları
const paths = {
  styleCss: path.join(ROOT_DIR, 'assets', 'css', 'style.css'),
  timeJs: path.join(ROOT_DIR, 'assets', 'js', 'time.js'),
  prayerJs: path.join(ROOT_DIR, 'assets', 'js', 'prayer.js'),
  appJs: path.join(ROOT_DIR, 'assets', 'js', 'app.js'),
  syncJs: path.join(ROOT_DIR, 'assets', 'js', 'sync.js'),
  programJson: path.join(ROOT_DIR, 'assets', 'data', 'program.json'),
  hikmetJson: path.join(ROOT_DIR, 'assets', 'data', 'hikmet.json'),
  faziletJson: path.join(ROOT_DIR, 'assets', 'data', 'fazilet_atakum.json'),
  samsunJsonFallback: path.join(ROOT_DIR, 'assets', 'data', 'samsun_vakitler.json'),
  versionJson: path.join(ROOT_DIR, 'assets', 'data', 'version.json'),

  logoImg: path.join(ROOT_DIR, 'assets', 'images', 'logo.png'),
  posterWeekdayImg: path.join(ROOT_DIR, 'assets', 'images', 'haftaici-programi.jpg'),
  posterWeekendImg: path.join(ROOT_DIR, 'assets', 'images', 'haftasonu-programi.jpg'),
  pdfWeekday: path.join(ROOT_DIR, 'assets', 'docs', 'haftaici-programi.pdf'),
  pdfWeekend: path.join(ROOT_DIR, 'assets', 'docs', 'haftasonu-programi.pdf'),

  outputHtml: path.join(ROOT_DIR, 'index.html')
};

// 2. Metin / Kod Dosyalarını Oku
const styleCss = fs.readFileSync(paths.styleCss, 'utf8');
const timeJs = fs.readFileSync(paths.timeJs, 'utf8');
const prayerJs = fs.readFileSync(paths.prayerJs, 'utf8');
const appJs = fs.readFileSync(paths.appJs, 'utf8');
const syncJs = fs.readFileSync(paths.syncJs, 'utf8');

const hikmetData = JSON.parse(fs.readFileSync(paths.hikmetJson, 'utf8'));
const programData = JSON.parse(fs.readFileSync(paths.programJson, 'utf8'));

let faziletData = null;
if (fs.existsSync(paths.faziletJson)) {
  try { faziletData = JSON.parse(fs.readFileSync(paths.faziletJson, 'utf8')); } catch (e) {}
}
if (!faziletData && fs.existsSync(paths.samsunJsonFallback)) {
  try { faziletData = JSON.parse(fs.readFileSync(paths.samsunJsonFallback, 'utf8')); } catch (e) {}
}

// 3. Medya Dosyalarını Base64 Formatına Dönüştür
function toBase64(file, mime) {
  if (fs.existsSync(file)) {
    return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
  }
  return '';
}

const logoB64 = toBase64(paths.logoImg, 'image/png');
const posterWeekdayB64 = toBase64(paths.posterWeekdayImg, 'image/jpeg');
const posterWeekendB64 = toBase64(paths.posterWeekendImg, 'image/jpeg');
const pdfWeekdayB64 = toBase64(paths.pdfWeekday, 'application/pdf');
const pdfWeekendB64 = toBase64(paths.pdfWeekend, 'application/pdf');

// Program verisine gömülü base64 afiş ve PDF'leri ekle
if (programData.haftaici) {
  programData.haftaici.afisB64 = posterWeekdayB64 || programData.haftaici.afis;
  programData.haftaici.pdfB64 = pdfWeekdayB64 || programData.haftaici.pdf;
}
if (programData.cumartesi) {
  programData.cumartesi.afisB64 = posterWeekendB64 || programData.cumartesi.afis;
  programData.cumartesi.pdfB64 = pdfWeekendB64 || programData.cumartesi.pdf;
}
if (programData.haftasonu) {
  programData.haftasonu.afisB64 = posterWeekendB64 || programData.haftasonu.afis;
  programData.haftasonu.pdfB64 = pdfWeekendB64 || programData.haftasonu.pdf;
}

// 4. Standalone HTML Sayfası Oluştur
const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>Yeşilpelit Öğrenci Yurdu Duyuru Panosu | Samsun Namaz Vakitleri & Günlük Program</title>
  <link rel="icon" type="image/png" href="${logoB64}">

  <!-- Google Yazı Tipleri -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cinzel:wght@600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <style>
${styleCss}
  </style>
</head>
<body>

  <!-- ==========================================
       ANA BAŞLIK VE KONTROL BARI
       ========================================== -->
  <header class="main-header">
    <div class="header-container">
      
      <!-- Logo ve Kurumsal Başlık -->
      <a href="#" class="brand-wrapper" aria-label="Yeşilpelit Öğrenci Yurdu Ana Sayfası">
        <div class="logo-frame">
          <img src="${logoB64}" alt="Yeşilpelit Öğrenci Yurdu Logosu">
        </div>
        <div class="brand-titles">
          <h1>YEŞİLPELİT <span>ÖĞRENCİ YURDU</span></h1>
          <div class="brand-subtitle">
            <span>DİJİTAL DUYURU & BİLGİLENDİRME PANOSU</span>
            <div class="live-badge">
              <span class="live-dot"></span>
              <span>YAYINDA</span>
            </div>
          </div>
        </div>
      </a>

      <!-- Dijital Saat & Kontrol Butonları -->
      <div class="header-actions">
        <div class="digital-clock-box">
          <div class="clock-time" id="digitalClock">--:--:--</div>
          <div class="clock-date" id="digitalDate">Yükleniyor...</div>
          <div class="clock-hijri" id="digitalHijri">Hicrî Takvim Hesaplanıyor...</div>
        </div>

        <button class="btn-icon-action" id="btnToggleTheme" title="Koyu / Açık Tema" aria-label="Temayı Değiştir">
          <i class="fa-solid fa-moon"></i>
        </button>

        <button class="btn-icon-action" id="btnToggleKiosk" title="Pano / TV Modu (Tam Ekran)" aria-label="Tam Ekran Modu">
          <i class="fa-solid fa-expand"></i>
        </button>
      </div>

    </div>
  </header>

  <!-- ==========================================
       ANA İÇERİK ALANI
       ========================================== -->
  <main class="main-content">

    <!-- 1. BÖLÜM: SAMSUN NAMAZ VAKİTLERİ VİTRİNİ -->
    <section class="prayer-board-card" id="namaz-vakitleri" aria-label="Namaz Vakitleri Bölümü">
      
      <div class="prayer-header-banner">
        <div class="prayer-title-group">
          <div class="prayer-icon-wrap">
            <i class="fa-solid fa-mosque"></i>
          </div>
          <div class="prayer-title-text">
            <h2>SAMSUN ATAKUM NAMAZ VAKİTLERİ</h2>
            <div class="prayer-source-row">
              <a href="https://namaz-vakitleri.fazilettakvimi.com/samsun-atakum/2025" target="_blank" rel="noopener noreferrer" class="source-link-tag">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>Fazilet Takvimi</span>
              </a>
              <span class="source-separator">·</span>
              <span class="source-temkin" id="prayerLiveBadge"><i class="fa-solid fa-circle-check text-gold-400"></i> Fazilet Takvimi Samsun Atakum Canlı</span>
            </div>
          </div>
        </div>

        <div class="prayer-controls-group">
          <!-- Geri Sayım Kutusu -->
          <div class="next-prayer-countdown-box">
            <i class="fa-regular fa-clock text-gold-400"></i>
            <span class="countdown-label" id="countdownLabel">Sonraki Vakte:</span>
            <span class="countdown-time" id="countdownTime">--:--:--</span>
          </div>

          <!-- Takvim Çekmecesi Aç/Kapat Butonu -->
          <button class="btn-toggle-widget" id="btnToggleFazilet" title="Fazilet Takvimi Canlı Penceresini Aç/Kapat">
            <i class="fa-solid fa-calendar-days"></i>
            <span>Takvim</span>
          </button>
        </div>
      </div>

      <!-- Namaz Vakitleri Kart Grid (6 Vakit Tek İnce Satır) -->
      <div class="prayer-times-grid" id="prayerGrid">
        <!-- JS ile 6 vakit kartı doldurulur -->
      </div>

      <!-- Açılır / Kapanır Fazilet Takvimi Resmi Canlı İframe Widget'ı -->
      <div class="fazilet-embed-drawer" id="faziletDrawer">
        <div class="fazilet-iframe-container">
          <iframe 
            src="https://namaz-vakitleri.fazilettakvimi.com/samsun-atakum/2025" 
            title="Fazilet Takvimi Samsun Atakum (2025) Günlük Namaz Vakitleri Resmi Penceresi"
            loading="lazy">
          </iframe>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-subtle); margin-top: 10px; text-align: right;">
          Doğrudan bağlantı: <a href="https://namaz-vakitleri.fazilettakvimi.com/samsun-atakum/2025" target="_blank" rel="noopener noreferrer" style="color: var(--gold-600); font-weight: 700;">namaz-vakitleri.fazilettakvimi.com/samsun-atakum/2025</a>
        </p>
      </div>

    </section>

    <!-- 2. BÖLÜM: GÜNLÜK VE HAFTASONU PROGRAMI & ZAMAN ÇİZELGESİ -->
    <section class="weekend-program-section" id="haftasonu-programi" aria-label="Günlük Program ve Zaman Çizelgesi">
      
      <!-- Bölüm Üst Başlığı, Sekme Değiştirici ve PDF Aksiyonları -->
      <div class="section-top-header">
        <div class="header-titles-group">
          <h2>
            <i id="programHeaderIcon" class="fa-solid fa-calendar-week text-gold-400"></i>
            <span id="programHeaderTitle">HAFTAİÇİ PROGRAMIMIZ</span>
          </h2>
          <p id="programHeaderSubtitle">Düzenli Gün, Verimli Yarınlar — Günlük Zaman Çizelgesi</p>
        </div>

        <!-- Program Seçici Sekmeler (Hafta İçi / Hafta Sonu) -->
        <div class="program-tab-switch" role="tablist" aria-label="Program Dönemi">
          <button class="btn-program-tab" id="btnTabHaftaici" role="tab" aria-selected="false" onclick="APP_MODULE.selectProgram('haftaici')">
            <i class="fa-solid fa-calendar-day"></i>
            <span>Hafta İçi Programı</span>
            <span class="tab-today-badge" id="todayBadgeHaftaici" style="display: none;">Bugün</span>
          </button>
          <button class="btn-program-tab" id="btnTabHaftasonu" role="tab" aria-selected="false" onclick="APP_MODULE.selectProgram('haftasonu')">
            <i class="fa-solid fa-tree"></i>
            <span>Hafta Sonu Programı</span>
            <span class="tab-today-badge" id="todayBadgeHaftasonu" style="display: none;">Bugün</span>
          </button>
        </div>

        <div class="pdf-action-buttons">
          <!-- PDF İndir Butonu (Dinamik) -->
          <a href="#" download="Yesilpelit-Program.pdf" class="btn-pdf-download" id="downloadPdfBtn" title="A4 Formatında PDF İndir">
            <i class="fa-solid fa-file-pdf"></i>
            <span id="downloadPdfLabel">PDF İndir</span>
          </a>

          <!-- Yazdır Butonu (A4 Özel Basım) -->
          <button class="btn-secondary-action" id="btnPrintSchedule" title="A4 Sayfa Olarak Yazdır">
            <i class="fa-solid fa-print"></i>
            <span>A4 Yazdır</span>
          </button>

          <!-- Afişi Büyüt -->
          <button class="btn-secondary-action" onclick="document.getElementById('posterTrigger').click()" title="Afişi Tam Boyut İncele">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
            <span>Afişi Büyüt</span>
          </button>
        </div>
      </div>

      <!-- Çift Görünüm Düzeni: Sol Afiş Çerçevesi + Sağ İnteraktif Zaman Çizelgesi -->
      <div class="program-layout-grid">
        
        <!-- Sol Kolon: Afiş Vitrini -->
        <div class="poster-frame-wrapper">
          <div class="poster-wood-border" id="posterTrigger" title="Büyütmek için tıklayın">
            <img id="activePosterImg" src="" alt="Yeşilpelit Program Afişi">
            <div class="poster-overlay-hint">
              <i class="fa-solid fa-expand"></i>
              <span>Afişi İncelemek İçin Tıklayın</span>
            </div>
          </div>
          <div class="poster-footer-caption" id="posterCaption">
            <p><i class="fa-solid fa-circle-info text-gold-600"></i> <span id="captionText">Yeşilpelit Öğrenci Yurdu Resmi Programıdır.</span></p>
          </div>
        </div>

        <!-- Sağ Kolon: Şu Anki Program + Özel Ayrılmış Alan -->
        <div class="schedule-flow-wrapper">
          
          <!-- 1. ŞU ANKİ ETKİNLİK KARTI (Canlı Vurgu) -->
          <div class="current-activity-card" id="currentActivityCard">
            <div class="current-activity-header">
              <div class="current-activity-live-badge">
                <span class="pulse-live-dot"></span>
                <span>ŞU ANDA YURTTAKİ PROGRAM</span>
              </div>
              <div class="current-activity-period">
                <i class="fa-solid fa-clock"></i>
                <span id="currentPeriodLabel">Hafta İçi Akışı</span>
              </div>
            </div>

            <div class="current-activity-main">
              <div class="current-activity-icon-box">
                <i id="currentActivityIcon" class="fa-solid fa-bell"></i>
              </div>
              <div class="current-activity-details">
                <div class="current-activity-time-pill" id="currentActivityTime">--:--</div>
                <h3 class="current-activity-title" id="currentActivityTitle">Program Belirleniyor...</h3>
                <p class="current-activity-desc" id="currentActivityDesc">Lütfen bekleyiniz...</p>
              </div>
            </div>

            <div class="current-activity-footer">
              <div class="next-activity-row">
                <i class="fa-solid fa-forward text-gold-400"></i>
                <span>Sıradaki:</span>
                <strong id="nextActivityText">Hesaplanıyor...</strong>
              </div>
              <div class="activity-countdown-box" id="activityCountdownBox" title="Sonraki programa kalan süre">
                <i class="fa-regular fa-hourglass-half"></i>
                <span id="activityCountdownTime">--:--:--</span>
              </div>
            </div>
          </div>

          <!-- 2. GÜNÜN HİKMET KÖŞESİ (ÂYET-İ KERÎME VE HADÎS-İ ŞERÎF) -->
          <div class="hikmet-card" id="hikmetCard">
            <!-- Üst Başlık & Sekmeler -->
            <div class="hikmet-header">
              <div class="hikmet-title-group">
                <div class="hikmet-badge">
                  <i class="fa-solid fa-book-quran"></i>
                  <span>GÜNÜN HİKMETİ</span>
                </div>
                <span class="hikmet-date-tag" id="hikmetDateTag">Günün Öğüdü</span>
              </div>

              <!-- Sekme Butonları -->
              <div class="hikmet-tabs-nav" role="tablist">
                <button class="hikmet-tab-btn active" id="tabAyetBtn" role="tab" aria-selected="true" onclick="APP_MODULE.switchHikmetTab('ayet')">
                  <i class="fa-solid fa-book-open"></i> Âyet-i Kerîme
                </button>
                <button class="hikmet-tab-btn" id="tabHadisBtn" role="tab" aria-selected="false" onclick="APP_MODULE.switchHikmetTab('hadis')">
                  <i class="fa-solid fa-feather-pointed"></i> Hadîs-i Şerîf
                </button>
                <button class="hikmet-tab-btn" id="tabDualBtn" role="tab" aria-selected="false" onclick="APP_MODULE.switchHikmetTab('dual')">
                  <i class="fa-solid fa-table-columns"></i> İkisi Bir Arada
                </button>
              </div>
            </div>

            <!-- İçerik Alanı -->
            <div class="hikmet-body" id="hikmetBody">
              <!-- Dinamik olarak JS tarafından doldurulacaktır -->
            </div>

            <!-- Alt Bilgi & Gezinme Çubuğu -->
            <div class="hikmet-footer">
              <div class="hikmet-counter" id="hikmetCounter">
                <i class="fa-regular fa-compass"></i> Hikmet 1 / 10
              </div>
              
              <div class="hikmet-actions">
                <button class="hikmet-nav-btn" onclick="APP_MODULE.prevHikmet()" title="Önceki Hikmet">
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="hikmet-nav-btn" onclick="APP_MODULE.randomHikmet()" title="Farklı Bir Hikmet Getir">
                  <i class="fa-solid fa-shuffle"></i>
                </button>
                <button class="hikmet-nav-btn" onclick="APP_MODULE.nextHikmet()" title="Sonraki Hikmet">
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
                <button class="hikmet-nav-btn copy-btn" id="btnCopyHikmet" onclick="APP_MODULE.copyHikmetText()" title="Metni Kopyala">
                  <i class="fa-regular fa-copy"></i>
                </button>
              </div>
            </div>

            <!-- Kiosk / TV için Canlı İlerleme Çubuğu -->
            <div class="hikmet-progress-bar" id="hikmetProgressBar">
              <div class="hikmet-progress-fill" id="hikmetProgressFill"></div>
            </div>
          </div>

        </div>

      </div>

    </section>

  </main>

  <!-- ==========================================
       MODAL / LIGHTBOX (AFİŞİ BÜYÜT)
       ========================================== -->
  <div class="modal-backdrop" id="posterModal" role="dialog" aria-modal="true" aria-label="Afiş Önizleme">
    <div class="modal-content-wrap">
      <button class="modal-close-btn" id="closePosterModal" aria-label="Kapat">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <img id="modalPosterImg" src="" alt="Yeşilpelit Büyük Boy Afiş">
    </div>
  </div>

  <!-- ==========================================
       ALT BİLGİ (FOOTER)
       ========================================== -->
  <footer class="board-footer">
    <div class="footer-inner">
      <span><strong>Yeşilpelit Öğrenci Yurdu Duyuru Panosu</strong> — İlim, Maneviyat ve Medeniyet Şuuruyla</span>
      <span>•</span>
      <span>Namaz Vakitleri: <a href="https://namaz-vakitleri.fazilettakvimi.com/samsun-atakum/2025" target="_blank" rel="noopener noreferrer" style="color: var(--gold-600); text-decoration: underline;">Fazilet Takvimi (Samsun Atakum)</a></span>
    </div>
  </footer>

  <!-- ==========================================
       JAVASCRIPT MANTIĞI (TAM ENTEGRE)
       ========================================== -->
  <script>
    // Gömülü Veriler (Tek Kaynak)
    const EMBEDDED_FAZILET_DATA = ${JSON.stringify(faziletData)};
    const EMBEDDED_PROGRAM_DATA = ${JSON.stringify(programData)};
    const EMBEDDED_HIKMET_DATA = ${JSON.stringify(hikmetData)};

    // 1. İSTANBUL SAATİ MODÜLÜ
${timeJs}

    // 2. NAMAZ VAKİTLERİ VE FAZİLET TAKVİMİ MODÜLÜ
${prayerJs}

    // 3. ANA UYGULAMA MODÜLÜ
${appJs}

    // 4. CANLI SENKRONİZASYON MODÜLÜ
${syncJs}

    // Uygulamayı Başlat
    document.addEventListener('DOMContentLoaded', () => {
      PRAYER_MODULE.init();
      APP_MODULE.init();
      SYNC_MODULE.init();
    });
  </script>
</body>
</html>
`;

// 5. Dosyayı Diske Yaz
fs.writeFileSync(paths.outputHtml, htmlContent, 'utf8');

// 6. Sürüm Bilgisini Güncelle
try {
  fs.writeFileSync(paths.versionJson, JSON.stringify({
    version: Date.now(),
    updatedAt: new Date().toISOString()
  }, null, 2), 'utf8');
} catch (e) {}

console.log(`[Derleme Başarılı] Tam entegre ve kendi kendine yeten index.html üretildi (${(htmlContent.length / 1024 / 1024).toFixed(2)} MB).`);
