const fs = require('fs');
const path = require('path');

const hikmetPath = path.join(__dirname, '../assets/data/hikmet.json');
const hikmetData = JSON.parse(fs.readFileSync(hikmetPath, 'utf8'));
const logoPath = path.join(__dirname, '../assets/images/logo.png');
const posterWeekendPath = path.join(__dirname, '../assets/images/haftasonu-programi.jpg');
const posterWeekdayPath = path.join(__dirname, '../assets/images/haftaici-programi.jpg');
const pdfWeekendPath = path.join(__dirname, '../assets/docs/haftasonu-programi.pdf');
const pdfWeekdayPath = path.join(__dirname, '../assets/docs/haftaici-programi.pdf');

const logoBytes = fs.readFileSync(logoPath);
const logoB64 = 'data:image/png;base64,' + logoBytes.toString('base64');

const posterWeekendBytes = fs.readFileSync(posterWeekendPath);
const posterWeekendB64 = 'data:image/jpeg;base64,' + posterWeekendBytes.toString('base64');

const posterWeekdayBytes = fs.readFileSync(posterWeekdayPath);
const posterWeekdayB64 = 'data:image/jpeg;base64,' + posterWeekdayBytes.toString('base64');

let pdfWeekendB64 = '';
try {
  const pdfBytes = fs.readFileSync(pdfWeekendPath);
  pdfWeekendB64 = 'data:application/pdf;base64,' + pdfBytes.toString('base64');
} catch (e) {
  console.log('Weekend PDF not found, skipping base64 pdf');
}

let pdfWeekdayB64 = '';
try {
  const pdfBytes = fs.readFileSync(pdfWeekdayPath);
  pdfWeekdayB64 = 'data:application/pdf;base64,' + pdfBytes.toString('base64');
} catch (e) {
  console.log('Weekday PDF not found, skipping base64 pdf');
}

const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>Yeşilpelit Öğrenci Yurdu Duyuru Panosu | Samsun Namaz Vakitleri & Haftasonu Programı</title>
  <link rel="icon" type="image/png" href="${logoB64}">

  <!-- Google Yazı Tipleri -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cinzel:wght@600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <style>
    /* ==========================================================================
       YEŞİLPELİT ÖĞRENCİ YURDU DUYURU PANOSU - TAM GÖMÜLÜ TASARIM SİSTEMİ
       ========================================================================== */
    :root {
      --brand-950: #031c10;
      --brand-900: #072a19;
      --brand-850: #0a3822;
      --brand-800: #0f5132;
      --brand-700: #15803d;
      --brand-600: #16a34a;
      --brand-500: #22c55e;
      --brand-400: #4ade80;
      --brand-200: #bbf7d0;
      --brand-100: #dcfce7;
      --brand-50:  #f0fdf4;

      --gold-900:  #78350f;
      --gold-800:  #92400e;
      --gold-700:  #b45309;
      --gold-600:  #d97706;
      --gold-500:  #f59e0b;
      --gold-400:  #fbbf24;
      --gold-300:  #fcd34d;
      --gold-100:  #fef3c7;
      --gold-50:   #fffbeb;

      --slate-950: #020617;
      --slate-900: #0f172a;
      --slate-800: #1e293b;
      --slate-700: #334155;
      --slate-600: #475569;
      --slate-500: #64748b;
      --slate-400: #94a3b8;
      --slate-300: #cbd5e1;
      --slate-200: #e2e8f0;
      --slate-100: #f1f5f9;
      --slate-50:  #f8fafc;

      --bg-body: #f4f6f8;
      --bg-card: #ffffff;
      --bg-card-subtle: #f8fafc;
      --text-main: #0f172a;
      --text-muted: #334155;
      --text-subtle: #64748b;
      --border-light: rgba(15, 23, 42, 0.08);
      --border-brand: rgba(21, 128, 61, 0.25);
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 6px 18px -2px rgba(7, 42, 25, 0.1);
      --shadow-lg: 0 16px 36px -4px rgba(7, 42, 25, 0.15);
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-xl: 26px;
      --transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    body.dark-mode {
      --bg-body: #05140d;
      --bg-card: #0a2116;
      --bg-card-subtle: #0f2b1d;
      --text-main: #f8fafc;
      --text-muted: #cbd5e1;
      --text-subtle: #94a3b8;
      --border-light: rgba(255, 255, 255, 0.08);
      --border-brand: rgba(34, 197, 94, 0.3);
      --shadow-md: 0 6px 22px rgba(0,0,0,0.5);
      --shadow-lg: 0 16px 40px rgba(0,0,0,0.7);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: var(--bg-body);
      color: var(--text-main);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 0.3s ease, color 0.3s ease;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, .font-display {
      font-family: 'Outfit', sans-serif;
      letter-spacing: -0.02em;
    }

    /* Üst Başlık Barı */
    .main-header {
      background: linear-gradient(135deg, var(--brand-950) 0%, var(--brand-900) 60%, var(--brand-850) 100%);
      color: white;
      border-bottom: 3px solid var(--gold-500);
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(12px);
    }

    .header-container {
      max-width: 1560px;
      margin: 0 auto;
      padding: 6px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .brand-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
    }

    .logo-frame {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-sm);
      background: white;
      padding: 3px;
      border: 2px solid var(--gold-400);
      box-shadow: 0 2px 10px rgba(245, 158, 11, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .logo-frame:hover {
      transform: scale(1.05);
    }

    .logo-frame img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    .brand-titles h1 {
      font-size: 1.15rem;
      font-weight: 900;
      line-height: 1.1;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .brand-titles h1 span {
      color: var(--gold-400);
    }

    .brand-subtitle {
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--gold-300);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 1px;
    }

    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 1px 6px;
      background: rgba(34, 197, 94, 0.2);
      border: 1px solid var(--brand-400);
      color: #86efac;
      font-size: 0.62rem;
      font-weight: 800;
      border-radius: 999px;
    }

    .live-dot {
      width: 6px;
      height: 6px;
      background-color: var(--brand-400);
      border-radius: 50%;
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
      70% { transform: scale(1.2); box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
    }

    /* Sağ Üst Saat & Aksiyonlar */
    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .digital-clock-box {
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(251, 191, 36, 0.4);
      border-radius: var(--radius-sm);
      padding: 4px 12px;
      text-align: right;
      min-width: 155px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }

    .clock-time {
      font-family: 'Outfit', monospace;
      font-size: 1.25rem;
      font-weight: 900;
      color: var(--gold-300);
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .clock-date {
      font-size: 0.68rem;
      font-weight: 600;
      color: #e2e8f0;
      margin-top: 1px;
    }

    .clock-hijri {
      font-size: 0.64rem;
      color: var(--gold-400);
      font-weight: 600;
    }

    .btn-icon-action {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: white;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-icon-action:hover {
      background: var(--gold-500);
      color: var(--slate-950);
      border-color: var(--gold-400);
    }

    /* Ana İçerik Konteyneri */
    .main-content {
      flex: 1;
      max-width: 1560px;
      width: 100%;
      margin: 0 auto;
      padding: 6px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* 1. BÖLÜM: SAMSUN NAMAZ VAKİTLERİ VİTRİNİ (KOMPAKT ŞERİT DÜZENİ) */
    .prayer-board-card {
      background: var(--bg-card);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-light);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }

    .prayer-header-banner {
      background: linear-gradient(135deg, var(--brand-950) 0%, var(--brand-900) 60%, #064e3b 100%);
      color: white;
      padding: 4px 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      position: relative;
    }

    .prayer-header-banner::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 35%;
      background: radial-gradient(circle at top right, rgba(245, 158, 11, 0.15), transparent 70%);
      pointer-events: none;
    }

    .prayer-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .prayer-icon-wrap {
      width: 24px;
      height: 24px;
      border-radius: 5px;
      background: linear-gradient(135deg, var(--gold-600), var(--gold-500));
      color: var(--slate-950);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.78rem;
      box-shadow: 0 2px 5px rgba(245, 158, 11, 0.3);
      flex-shrink: 0;
    }

    .prayer-title-text h2 {
      font-size: 0.88rem;
      font-weight: 800;
      color: white;
      line-height: 1.1;
      margin: 0;
      letter-spacing: 0.02em;
    }

    .prayer-source-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.68rem;
      color: var(--gold-300);
      line-height: 1;
      margin-top: 1px;
    }

    .source-link-tag {
      color: var(--gold-300);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .source-link-tag:hover {
      color: #ffffff;
      text-decoration: underline;
    }

    .source-separator {
      opacity: 0.5;
    }

    .source-temkin {
      opacity: 0.85;
      font-weight: 500;
    }

    .prayer-controls-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .next-prayer-countdown-box {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--gold-500);
      border-radius: 5px;
      padding: 2px 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .countdown-label {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--gold-300);
      font-weight: 700;
    }

    .countdown-time {
      font-family: 'Outfit', monospace;
      font-size: 0.95rem;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: 0.03em;
    }

    .btn-toggle-widget {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: white;
      padding: 2px 8px;
      border-radius: 5px;
      font-size: 0.68rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: var(--transition);
    }

    .btn-toggle-widget:hover {
      background: rgba(255, 255, 255, 0.22);
      border-color: var(--gold-400);
    }

    /* Namaz Vakitleri Kart Grid */
    .prayer-times-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      padding: 4px 8px;
      background: var(--bg-card);
    }

    @media (max-width: 900px) {
      .prayer-times-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 480px) {
      .prayer-times-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .prayer-card {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-light);
      border-radius: 6px;
      padding: 3px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 36px;
      transition: var(--transition);
      position: relative;
    }

    .prayer-card:hover {
      transform: translateY(-1px);
      border-color: var(--brand-500);
    }

    .prayer-card.active {
      background: linear-gradient(135deg, #072a19, #0f5132);
      color: white;
      border: 1.5px solid var(--gold-400);
      box-shadow: 0 2px 8px rgba(21, 128, 61, 0.35), 0 0 8px rgba(245, 158, 11, 0.35);
      z-index: 2;
    }

    .prayer-card-lead {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .prayer-card-icon {
      font-size: 0.8rem;
      color: var(--gold-600);
      line-height: 1;
    }

    .prayer-card.active .prayer-card-icon {
      color: var(--gold-400);
    }

    .prayer-name {
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--text-muted);
      line-height: 1;
    }

    .prayer-card.active .prayer-name {
      color: var(--gold-300);
    }

    .prayer-active-dot {
      width: 6px;
      height: 6px;
      background-color: var(--gold-400);
      border-radius: 50%;
      box-shadow: 0 0 6px var(--gold-400);
      animation: pulse 1.5s infinite;
    }

    .prayer-time {
      font-family: 'Outfit', monospace;
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1;
    }

    .prayer-card.active .prayer-time {
      color: #ffffff;
      font-weight: 900;
      text-shadow: 0 0 6px rgba(251, 191, 36, 0.6);
    }

    .fazilet-embed-drawer {
      display: none;
      padding: 10px 14px;
      background: var(--bg-card);
      border-top: 1px solid var(--border-light);
    }

    .fazilet-embed-drawer.open {
      display: block;
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fazilet-iframe-container {
      width: 100%;
      border-radius: var(--radius-sm);
      overflow: hidden;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.1);
      border: 1px solid var(--border-brand);
    }

    .fazilet-iframe-container iframe {
      width: 100%;
      height: 440px;
      border: 0;
      display: block;
    }

    /* 2. BÖLÜM: HAFTASONU PROGRAMI & ZAMAN ÇİZELGESİ */
    .weekend-program-section {
      background: var(--bg-card);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-light);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }

    .section-top-header {
      background: linear-gradient(135deg, var(--brand-900) 0%, #114227 100%);
      color: white;
      padding: 4px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      border-bottom: 2px solid var(--gold-600);
    }

    .section-top-header h2 {
      font-size: 0.92rem;
      font-weight: 800;
      color: white;
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0;
    }

    .section-top-header p {
      color: var(--gold-300);
      font-size: 0.68rem;
      font-weight: 500;
      margin: 0;
    }

    /* Program Seçici Sekmeler (Hafta İçi / Hafta Sonu) */
    .program-tab-switch {
      display: inline-flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.45);
      padding: 2px;
      border-radius: 6px;
      border: 1px solid rgba(251, 191, 36, 0.35);
      gap: 3px;
    }

    .btn-program-tab {
      background: transparent;
      border: none;
      color: var(--gold-200);
      font-weight: 700;
      font-size: 0.72rem;
      padding: 3px 10px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .btn-program-tab:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }

    .btn-program-tab.active {
      background: linear-gradient(135deg, var(--gold-600), var(--gold-500));
      color: var(--slate-950);
      box-shadow: 0 2px 6px rgba(217, 119, 6, 0.35);
      font-weight: 800;
    }

    .tab-today-badge {
      background: var(--brand-700);
      color: white;
      font-size: 0.58rem;
      padding: 1px 5px;
      border-radius: 999px;
      font-weight: 800;
      letter-spacing: 0.02em;
      line-height: 1.2;
    }

    .btn-program-tab.active .tab-today-badge {
      background: var(--brand-950);
      color: var(--gold-300);
    }

    .pdf-action-buttons {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .btn-pdf-download {
      background: linear-gradient(135deg, var(--gold-600), var(--gold-500));
      color: var(--slate-950);
      font-weight: 800;
      font-size: 0.72rem;
      padding: 3px 8px;
      border-radius: 4px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      box-shadow: 0 2px 6px rgba(217, 119, 6, 0.25);
      transition: var(--transition);
    }

    .btn-pdf-download:hover {
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(217, 119, 6, 0.4);
      color: var(--slate-950);
    }

    .btn-secondary-action {
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: white;
      font-weight: 700;
      font-size: 0.72rem;
      padding: 3px 8px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-secondary-action:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    /* Program Düzeni (Sol Afiş / Sağ Zaman Akışı) */
    .program-layout-grid {
      display: grid;
      grid-template-columns: clamp(340px, 31vw, 480px) 1fr;
      gap: 14px;
      padding: 6px 14px 8px;
      align-items: stretch;
    }

    @media (max-width: 1024px) {
      .program-layout-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Sol Kolon: Afiş Çerçevesi */
    .poster-frame-wrapper {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      padding: 6px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .poster-wood-border {
      border: 4px solid #c9a063;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0,0,0,0.18), inset 0 0 6px rgba(0,0,0,0.2);
      position: relative;
      background: #fbf7ee;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      max-height: calc(100vh - 175px);
    }

    .poster-wood-border:hover {
      transform: scale(1.015);
      box-shadow: 0 10px 28px rgba(0,0,0,0.25);
    }

    .poster-wood-border img {
      max-height: calc(100vh - 190px);
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }

    .poster-overlay-hint {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: 3px 8px;
      border-radius: 999px;
      font-size: 0.65rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 4px;
      pointer-events: none;
      white-space: nowrap;
    }

    .poster-footer-caption {
      margin-top: 4px;
      text-align: center;
      font-size: 0.68rem;
      color: var(--text-muted);
      line-height: 1.2;
    }

    /* Sağ Kolon: Şu Anki Program + Özel Alan */
    .schedule-flow-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 100%;
    }

    /* Şu Anki Program Kartı (Hero Banner) */
    .current-activity-card {
      background: linear-gradient(135deg, #072a19 0%, #0e4428 50%, #15803d 100%);
      border: 1.5px solid var(--gold-400);
      border-radius: var(--radius-sm);
      padding: 14px 18px;
      color: white;
      box-shadow: 0 4px 18px rgba(7, 42, 25, 0.25), 0 0 12px rgba(251, 191, 36, 0.15);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .current-activity-card::after {
      content: '';
      position: absolute;
      top: -30px;
      right: -30px;
      width: 140px;
      height: 140px;
      background: radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%);
      pointer-events: none;
    }

    body.dark-mode .current-activity-card {
      background: linear-gradient(135deg, #03140b 0%, #072a19 60%, #143825 100%);
      border-color: var(--gold-500);
    }

    .current-activity-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px;
    }

    .current-activity-live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(74, 222, 128, 0.4);
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: var(--brand-300);
      text-transform: uppercase;
    }

    .pulse-live-dot {
      width: 8px;
      height: 8px;
      background-color: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 8px #22c55e;
      animation: pulseLive 1.5s infinite;
    }

    @keyframes pulseLive {
      0% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 4px #22c55e; }
      50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 12px #4ade80; }
      100% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 4px #22c55e; }
    }

    .current-activity-period {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--gold-300);
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .current-activity-main {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .current-activity-icon-box {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(21, 128, 61, 0.4));
      border: 1.5px solid var(--gold-400);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.45rem;
      color: var(--gold-300);
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .current-activity-details {
      flex: 1;
      min-width: 0;
    }

    .current-activity-time-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: 'Outfit', monospace;
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--slate-950);
      background: var(--gold-400);
      padding: 1px 8px;
      border-radius: 4px;
      margin-bottom: 4px;
      line-height: 1.2;
    }

    .current-activity-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.3rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
      line-height: 1.2;
      letter-spacing: -0.01em;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    .current-activity-desc {
      font-size: 0.8rem;
      color: var(--brand-100);
      margin: 4px 0 0 0;
      line-height: 1.3;
      font-weight: 500;
    }

    .current-activity-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      font-size: 0.75rem;
    }

    .next-activity-row {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--gold-200);
    }

    .next-activity-row strong {
      color: #ffffff;
      font-weight: 700;
    }

    .activity-countdown-box {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--gold-300);
      font-weight: 700;
      font-family: 'Outfit', monospace;
      font-size: 0.78rem;
      background: rgba(0, 0, 0, 0.35);
      padding: 2px 7px;
      border-radius: 4px;
      border: 1px solid rgba(251, 191, 36, 0.25);
    }

    /* ==========================================================================
       GÜNÜN HİKMET KÖŞESİ (ÂYET-İ KERÎME VE HADÎS-İ ŞERÎF)
       ========================================================================== */
    .hikmet-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--bg-card);
      border: 1.5px solid rgba(202, 138, 4, 0.35);
      border-radius: var(--radius-sm);
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4);
      position: relative;
      overflow: hidden;
      min-height: 240px;
      transition: var(--transition);
    }

    body.dark-mode .hikmet-card {
      background: linear-gradient(135deg, rgba(7, 42, 25, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%);
      border-color: rgba(251, 191, 36, 0.3);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    /* Arka Plan Zarif Hat Dekoru */
    .hikmet-card::before {
      content: '﷽';
      position: absolute;
      top: 4px;
      right: 14px;
      font-family: 'Amiri', serif;
      font-size: 3.5rem;
      color: var(--gold-500);
      opacity: 0.06;
      pointer-events: none;
      line-height: 1;
    }

    body.dark-mode .hikmet-card::before {
      opacity: 0.12;
      color: var(--gold-400);
    }

    /* Üst Başlık & Sekmeler */
    .hikmet-header {
      padding: 8px 14px;
      background: linear-gradient(to right, rgba(7, 42, 25, 0.06), rgba(202, 138, 4, 0.08));
      border-bottom: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }

    body.dark-mode .hikmet-header {
      background: rgba(0, 0, 0, 0.25);
      border-bottom-color: rgba(255, 255, 255, 0.08);
    }

    .hikmet-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hikmet-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, var(--brand-900), var(--brand-800));
      color: var(--gold-300);
      padding: 3px 10px;
      border-radius: 999px;
      font-family: 'Cinzel', serif;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      border: 1px solid rgba(251, 191, 36, 0.4);
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }

    .hikmet-badge i {
      color: var(--gold-400);
      font-size: 0.8rem;
    }

    .hikmet-date-tag {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    /* Sekme Butonları */
    .hikmet-tabs-nav {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.05);
      padding: 2px;
      border-radius: 6px;
      gap: 2px;
      border: 1px solid var(--border-light);
    }

    body.dark-mode .hikmet-tabs-nav {
      background: rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .hikmet-tab-btn {
      background: transparent;
      border: none;
      padding: 4px 10px;
      border-radius: 4px;
      font-family: inherit;
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
    }

    .hikmet-tab-btn:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.4);
    }

    body.dark-mode .hikmet-tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .hikmet-tab-btn.active {
      background: var(--brand-800);
      color: #ffffff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    }

    body.dark-mode .hikmet-tab-btn.active {
      background: linear-gradient(135deg, var(--gold-600), var(--gold-500));
      color: var(--slate-950);
      font-weight: 800;
    }

    /* İçerik Gövdesi */
    .hikmet-body {
      flex: 1;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      min-height: 160px;
    }

    .hikmet-single-view {
      display: flex;
      flex-direction: column;
      gap: 10px;
      text-align: center;
      animation: hikmetFadeIn 0.35s ease-out;
    }

    @keyframes hikmetFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hikmet-type-indicator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-family: 'Cinzel', serif;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: var(--gold-600);
      margin-bottom: 2px;
    }

    body.dark-mode .hikmet-type-indicator {
      color: var(--gold-400);
    }

    .hikmet-arabic-wrap {
      position: relative;
      padding: 4px 10px;
    }

    .hikmet-arabic-text {
      font-family: 'Amiri', 'Traditional Arabic', serif;
      font-size: 1.35rem;
      font-weight: 700;
      line-height: 1.7;
      color: #064e3b;
      direction: rtl;
      text-align: center;
      letter-spacing: 0.01em;
      word-spacing: 2px;
      text-shadow: 0 1px 1px rgba(0,0,0,0.05);
    }

    body.dark-mode .hikmet-arabic-text {
      color: var(--gold-300);
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }

    .hikmet-turkish-wrap {
      position: relative;
      padding: 0 14px;
    }

    .hikmet-turkish-text {
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.5;
      color: var(--text-main);
      font-style: italic;
      position: relative;
    }

    .hikmet-turkish-text::before {
      content: '“';
      font-size: 1.4rem;
      color: var(--gold-500);
      font-family: serif;
      margin-right: 3px;
      line-height: 0;
      vertical-align: -3px;
    }

    .hikmet-turkish-text::after {
      content: '”';
      font-size: 1.4rem;
      color: var(--gold-500);
      font-family: serif;
      margin-left: 3px;
      line-height: 0;
      vertical-align: -3px;
    }

    .hikmet-meta-row {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 4px;
    }

    .hikmet-source-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--brand-700);
      background: rgba(21, 128, 61, 0.1);
      padding: 2px 10px;
      border-radius: 999px;
      border: 1px solid rgba(21, 128, 61, 0.2);
    }

    body.dark-mode .hikmet-source-tag {
      color: var(--gold-300);
      background: rgba(251, 191, 36, 0.1);
      border-color: rgba(251, 191, 36, 0.25);
    }

    .hikmet-reflection-box {
      background: rgba(245, 158, 11, 0.08);
      border-left: 3px solid var(--gold-500);
      padding: 5px 12px;
      border-radius: 0 6px 6px 0;
      font-size: 0.74rem;
      color: var(--text-muted);
      text-align: left;
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 4px;
    }

    body.dark-mode .hikmet-reflection-box {
      background: rgba(245, 158, 11, 0.06);
      color: #cbd5e1;
    }

    .hikmet-reflection-box strong {
      color: var(--gold-600);
    }

    body.dark-mode .hikmet-reflection-box strong {
      color: var(--gold-400);
    }

    /* İkisi Bir Arada (Dual View) Düzeni */
    .hikmet-dual-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      align-items: stretch;
      animation: hikmetFadeIn 0.35s ease-out;
    }

    @media (max-width: 768px) {
      .hikmet-dual-grid {
        grid-template-columns: 1fr;
      }
    }

    .hikmet-mini-card {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-light);
      border-radius: 6px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      text-align: center;
    }

    body.dark-mode .hikmet-mini-card {
      background: rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 255, 255, 0.08);
    }

    .hikmet-mini-card .hikmet-arabic-text {
      font-size: 1.1rem;
      line-height: 1.5;
    }

    .hikmet-mini-card .hikmet-turkish-text {
      font-size: 0.82rem;
      line-height: 1.4;
    }

    /* Alt Çubuk & Butonlar */
    .hikmet-footer {
      padding: 6px 14px;
      background: rgba(0, 0, 0, 0.03);
      border-top: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.72rem;
    }

    body.dark-mode .hikmet-footer {
      background: rgba(0, 0, 0, 0.2);
      border-top-color: rgba(255, 255, 255, 0.06);
    }

    .hikmet-counter {
      font-weight: 700;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .hikmet-actions {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .hikmet-nav-btn {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-light);
      color: var(--text-muted);
      width: 26px;
      height: 26px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .hikmet-nav-btn:hover {
      background: var(--brand-700);
      color: white;
      border-color: var(--brand-600);
    }

    body.dark-mode .hikmet-nav-btn:hover {
      background: var(--gold-500);
      color: var(--slate-950);
      border-color: var(--gold-400);
    }

    .hikmet-nav-btn.copy-btn:hover {
      background: #0284c7;
      border-color: #0369a1;
      color: white;
    }

    /* Canlı İlerleme Çubuğu (Kiosk Auto-cycle) */
    .hikmet-progress-bar {
      height: 2px;
      width: 100%;
      background: rgba(0, 0, 0, 0.06);
      position: absolute;
      bottom: 0;
      left: 0;
      overflow: hidden;
    }

    body.dark-mode .hikmet-progress-bar {
      background: rgba(255, 255, 255, 0.06);
    }

    .hikmet-progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(to right, var(--brand-500), var(--gold-400));
      transition: width 0.1s linear;
    }

    /* Modal Lightbox */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-backdrop.active {
      display: flex;
    }

    .modal-content-wrap {
      position: relative;
      max-width: 900px;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .modal-content-wrap img {
      max-width: 100%;
      max-height: 85vh;
      object-fit: contain;
      border-radius: var(--radius-md);
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      border: 4px solid #d4af37;
      display: block;
    }

    .modal-close-btn {
      position: absolute;
      top: -18px;
      right: -18px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--gold-500);
      color: var(--slate-950);
      border: none;
      font-size: 1.3rem;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0,0,0,0.4);
      transition: transform 0.2s;
    }

    .modal-close-btn:hover {
      transform: scale(1.1);
    }

    /* Kiosk TV Modu */
    body.tv-kiosk-mode {
      background: #021a10;
    }

    body.tv-kiosk-mode .main-content {
      max-width: 100%;
      padding: 16px 32px;
    }

    body.tv-kiosk-mode .clock-time {
      font-size: 2.2rem;
    }

    body.tv-kiosk-mode .prayer-time {
      font-size: 2rem;
    }

    /* Footer */
    .board-footer {
      background: var(--bg-card);
      border-top: 1px solid var(--border-light);
      padding: 4px 12px;
      margin-top: auto;
      text-align: center;
      font-size: 0.68rem;
      color: var(--text-subtle);
    }

    .footer-inner {
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
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
            <h2>SAMSUN NAMAZ VAKİTLERİ</h2>
            <div class="prayer-source-row">
              <a href="https://namaz-vakitleri.fazilettakvimi.com/samsun/57" target="_blank" rel="noopener noreferrer" class="source-link-tag">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>Fazilet Takvimi</span>
              </a>
              <span class="source-separator">·</span>
              <span class="source-temkin" id="prayerLiveBadge"><i class="fa-solid fa-circle-check text-gold-400"></i> Fazilet Takvimi Samsun (57)</span>
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
            src="https://namaz-vakitleri.fazilettakvimi.com/samsun/57" 
            title="Fazilet Takvimi Samsun (57) Günlük Namaz Vakitleri Resmi Penceresi"
            loading="lazy">
          </iframe>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-subtle); margin-top: 10px; text-align: right;">
          Doğrudan bağlantı: <a href="https://namaz-vakitleri.fazilettakvimi.com/samsun/57" target="_blank" rel="noopener noreferrer" style="color: var(--gold-600); font-weight: 700;">namaz-vakitleri.fazilettakvimi.com/samsun/57</a>
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

          <!-- Yazdır Butonu -->
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
      <span>Namaz Vakitleri: <a href="https://namaz-vakitleri.fazilettakvimi.com/samsun/57" target="_blank" rel="noopener noreferrer" style="color: var(--gold-600); text-decoration: underline;">Fazilet Takvimi (Samsun)</a></span>
    </div>
  </footer>

  <!-- ==========================================
       JAVASCRIPT MANTIĞI (TAM ENTEGRE)
       ========================================== -->
  <script>
    // 1. SAMSUN NAMAZ VAKİTLERİ (FAZİLET TAKVİMİ SAMSUN - 57)
    // Kaynak: https://namaz-vakitleri.fazilettakvimi.com/samsun/57
    const PRAYER_MODULE = (() => {
      let prayerTimes = {
        name: 'Samsun',
        fajr: '04:45',
        sunrise: '06:25',
        dhuhr: '12:34',
        asr: '15:50',
        maghrib: '18:22',
        isha: '19:50'
      };

      function applyFaziletData(data) {
        if (!data || !data.vakitler || !data.vakitler.length) return false;

        const tz = data.bolge_saatdilimi || 'Europe/Istanbul';

        const todayStr = new Intl.DateTimeFormat('en-CA', {
          timeZone: tz,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(new Date());

        let dayRecord = data.vakitler.find(v => v.tarih === todayStr);
        if (!dayRecord) {
          dayRecord = data.vakitler[1] || data.vakitler[0];
        }

        const formatTimeStr = (iso) => {
          if (!iso) return '';
          const d = new Date(iso);
          return new Intl.DateTimeFormat('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: tz
          }).format(d);
        };

        if (dayRecord) {
          prayerTimes = {
            name: data.bolge_adi || 'Samsun',
            fajr: formatTimeStr(dayRecord.imsak?.[0]?.tarih) || prayerTimes.fajr,
            sunrise: formatTimeStr(dayRecord.gunes?.[0]?.tarih) || prayerTimes.sunrise,
            dhuhr: formatTimeStr(dayRecord.ogle?.[0]?.tarih) || prayerTimes.dhuhr,
            asr: formatTimeStr(dayRecord.ikindi?.[0]?.tarih) || prayerTimes.asr,
            maghrib: formatTimeStr(dayRecord.aksam?.[0]?.tarih) || prayerTimes.maghrib,
            isha: formatTimeStr(dayRecord.yatsi?.[0]?.tarih) || prayerTimes.isha
          };

          if (data.takvimler && data.takvimler.length) {
            const takvim = data.takvimler.find(t => t.tarih === todayStr) || data.takvimler[0];
            if (takvim && takvim.hicri_tarih) {
              const hijriEl = document.getElementById('digitalHijri');
              if (hijriEl) {
                hijriEl.textContent = takvim.hicri_tarih + ' (Fazilet Hicrî)';
                hijriEl.dataset.fazilet = 'true';
              }
            }
          }

          const badge = document.getElementById('prayerLiveBadge');
          if (badge) {
            badge.innerHTML = '<i class="fa-solid fa-circle-check text-gold-400"></i> Fazilet Takvimi Samsun (57) Canlı';
          }

          try {
            localStorage.setItem('fazilet_samsun_vakitleri', JSON.stringify({
              date: todayStr,
              times: prayerTimes,
              bolge: data.bolge_adi || 'Samsun',
              timestamp: Date.now()
            }));
          } catch (e) {}

          renderPrayerCards();
          return true;
        }
        return false;
      }

      async function fetchLivePrayerTimes() {
        try {
          const rawStored = localStorage.getItem('fazilet_samsun_vakitleri');
          if (rawStored) {
            const stored = JSON.parse(rawStored);
            const todayStr = new Intl.DateTimeFormat('en-CA', {
              timeZone: 'Europe/Istanbul',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }).format(new Date());

            if (stored.date === todayStr && stored.times) {
              prayerTimes = stored.times;
              renderPrayerCards();
            }
          }
        } catch (e) {}

        const endpoints = [
          '/api/fazilet/samsun',
          'http://localhost:3000/api/fazilet/samsun',
          'assets/data/samsun_vakitler.json',
          './assets/data/samsun_vakitler.json'
        ];

        for (const ep of endpoints) {
          try {
            const res = await fetch(ep, { cache: 'no-cache' });
            if (res.ok) {
              const data = await res.json();
              if (applyFaziletData(data)) {
                console.log('[Fazilet Takvimi] Samsun (57) vakitleri ' + ep + ' üzerinden güncellendi.');
                return;
              }
            }
          } catch (err) {}
        }


        console.log('[Fazilet Takvimi] Samsun yerel temkinli vakitleri devrede.');
      }

      function getTimesArray() {
        return [
          { id: 'imsak',  name: 'İmsak',  time: prayerTimes.fajr,    icon: 'fa-regular fa-moon' },
          { id: 'gunes',  name: 'Güneş',  time: prayerTimes.sunrise, icon: 'fa-solid fa-sun' },
          { id: 'ogle',   name: 'Öğle',   time: prayerTimes.dhuhr,   icon: 'fa-regular fa-sun' },
          { id: 'ikindi', name: 'İkindi', time: prayerTimes.asr,     icon: 'fa-solid fa-cloud-sun' },
          { id: 'aksam',  name: 'Akşam',  time: prayerTimes.maghrib, icon: 'fa-solid fa-cloud-moon' },
          { id: 'yatsi',  name: 'Yatsı',  time: prayerTimes.isha,    icon: 'fa-solid fa-moon' }
        ];
      }

      function calculateCurrentAndNext() {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const currentSeconds = now.getSeconds();

        const times = getTimesArray().map(p => {
          const [h, m] = p.time.split(':').map(Number);
          return { ...p, totalMinutes: h * 60 + m };
        });

        let currentPrayer = times[times.length - 1];
        let nextPrayer = times[0];

        for (let i = 0; i < times.length; i++) {
          if (currentMinutes >= times[i].totalMinutes) {
            currentPrayer = times[i];
            nextPrayer = (i === times.length - 1) ? times[0] : times[i + 1];
          }
        }

        let diffMinutes = nextPrayer.totalMinutes - currentMinutes;
        if (diffMinutes <= 0) {
          diffMinutes += 24 * 60;
        }

        const remainingSecTotal = diffMinutes * 60 - currentSeconds;
        const remHours = Math.floor(remainingSecTotal / 3600);
        const remMins = Math.floor((remainingSecTotal % 3600) / 60);
        const remSecs = remainingSecTotal % 60;

        const pad = (n) => String(n).padStart(2, '0');
        const countdownString = pad(remHours) + ':' + pad(remMins) + ':' + pad(remSecs);

        return { currentPrayer, nextPrayer, countdownString };
      }

      function renderPrayerCards() {
        const grid = document.getElementById('prayerGrid');
        if (!grid) return;

        const times = getTimesArray();
        const { currentPrayer, nextPrayer, countdownString } = calculateCurrentAndNext();

        grid.innerHTML = times.map(p => {
          const isActive = p.id === currentPrayer.id;
          return \`
            <div class="prayer-card \${isActive ? 'active' : ''}" id="card-\${p.id}">
              <div class="prayer-card-lead">
                <div class="prayer-card-icon">
                  <i class="\${p.icon}"></i>
                </div>
                <div class="prayer-name">\${p.name}</div>
                \${isActive ? '<span class="prayer-active-dot" title="Şu Anki Vakit"></span>' : ''}
              </div>
              <div class="prayer-time">\${p.time}</div>
            </div>
          \`;
        }).join('');

        const cdLabel = document.getElementById('countdownLabel');
        const cdTime = document.getElementById('countdownTime');
        if (cdLabel) cdLabel.textContent = nextPrayer.name + ' Vaktine:';
        if (cdTime) cdTime.textContent = countdownString;
      }

      function setupDrawer() {
        const btn = document.getElementById('btnToggleFazilet');
        const drawer = document.getElementById('faziletDrawer');
        if (!btn || !drawer) return;

        btn.addEventListener('click', () => {
          drawer.classList.toggle('open');
          const isOpen = drawer.classList.contains('open');
          btn.innerHTML = isOpen 
            ? '<i class="fa-solid fa-chevron-up"></i> <span>Kapat</span>'
            : '<i class="fa-solid fa-calendar-days"></i> <span>Takvim</span>';
        });
      }

      function init() {
        setupDrawer();
        renderPrayerCards();
        fetchLivePrayerTimes();

        setInterval(() => {
          const { currentPrayer, nextPrayer, countdownString } = calculateCurrentAndNext();
          const cdLabel = document.getElementById('countdownLabel');
          const cdTime = document.getElementById('countdownTime');
          if (cdLabel) cdLabel.textContent = nextPrayer.name + ' Vaktine:';
          if (cdTime) cdTime.textContent = countdownString;

          document.querySelectorAll('.prayer-card').forEach(card => {
            if (card.id === 'card-' + currentPrayer.id) {
              if (!card.classList.contains('active')) {
                renderPrayerCards();
              }
            }
          });
        }, 1000);
      }

      return { init };
    })();

    // 2. ANA UYGULAMA (ZAMAN ÇİZELGESİ, SAAT, TEMA, TV MODU)
    // 2. ANA UYGULAMA (ZAMAN ÇİZELGESİ, DİNAMİK PROGRAM, SAAT, TEMA, TV MODU)
    const APP_MODULE = (() => {
      const POSTER_WEEKEND_B64 = "${posterWeekendB64}";
      const POSTER_WEEKDAY_B64 = "${posterWeekdayB64}";
      const PDF_WEEKEND_B64 = "${pdfWeekendB64 || 'assets/docs/haftasonu-programi.pdf'}";
      const PDF_WEEKDAY_B64 = "${pdfWeekdayB64 || 'assets/docs/haftaici-programi.pdf'}";

      // Hafta İçi Resmi Zaman Çizelgesi Maddeleri (Afişteki Günlük Program)
      const WEEKDAY_TIMELINE = [
        { time: '05:30', title: 'Sabah Namazına Kalkış', desc: 'Günün başlangıcı, abdest ve mescide hazırlık', icon: 'fa-solid fa-bell' },
        { time: '06:00', title: 'Sabah Namazı - Hatim ve Vazifeler', desc: 'Mescidde cemaatle sabah namazı, hatim ve günlük ders vazifeleri', icon: 'fa-solid fa-mosque' },
        { time: '07:00 – 08:00', title: 'Kahvaltı', desc: 'Yemekhanede toplu sabah kahvaltısı', icon: 'fa-solid fa-mug-hot' },
        { time: '08:00', title: 'Okula Çıkış', desc: 'Öğrencilerin okul dersleri için yurttan hareketi', icon: 'fa-solid fa-graduation-cap' },
        { time: '11:30 – 13:00', title: 'Öğle Yemeği', desc: 'Yemekhanede sıcak öğle tabldotu servisi', icon: 'fa-solid fa-utensils' },
        { time: '13:00', title: 'Öğle Namazı', desc: 'Mescidde cemaatle öğle namazı', icon: 'fa-solid fa-mosque' },
        { time: '16:00', title: 'İkindi Namazı', desc: 'Mescidde cemaatle ikindi namazı ve tesbihat', icon: 'fa-solid fa-mosque' },
        { time: '17:30 – 18:15', title: 'Akşam Yemeği', desc: 'Yemekhanede akşam tabldotu servisi', icon: 'fa-solid fa-utensils' },
        { time: '18:15 – 20:00', title: 'Dahili Ders', desc: 'Etüt salonlarında dahili dersler ve ders çalışma', icon: 'fa-solid fa-book-open' },
        { time: '18:27', title: 'Akşam Namazı (Gruplarda)', desc: 'Gruplar halinde mescidde akşam namazı', icon: 'fa-solid fa-mosque' },
        { time: '20:00', title: 'Yatsı Namazı', desc: 'Mescidde cemaatle yatsı namazı ve tesbihat', icon: 'fa-solid fa-moon' },
        { time: '23:00', title: 'İstirahat (Kapılar Kilitlenecek)', desc: 'Yurt içi sessizlik ve istirahat — 23:00 da kapılar kilitlenecektir', icon: 'fa-solid fa-bed' }
      ];

      // Hafta Sonu Resmi Zaman Çizelgesi Maddeleri (Cumartesi)
      const SATURDAY_TIMELINE = [
        { time: '05:30', title: 'Kalkış', desc: 'Günün başlangıcı ve sabah hazırlığı', icon: 'fa-solid fa-bell' },
        { time: '06:00', title: 'Sabah Namazı - Hatim', desc: 'Mescidde cemaatle sabah namazı ve Kuran tilaveti', icon: 'fa-solid fa-mosque' },
        { time: '09:00', title: 'Kahvaltı', desc: 'Yemekhanede toplu açık büfe kahvaltı', icon: 'fa-solid fa-mug-hot' },
        { time: '09:30', title: 'Duha', desc: 'Kuşluk vakti nafile namazı', icon: 'fa-solid fa-sun' },
        { time: '09:45', title: '1. Ders', desc: 'Medrese müfredatı ve ihtisas dersi', icon: 'fa-solid fa-graduation-cap' },
        { time: '11:30', title: 'Evrad Şerif', desc: 'Günün bereketi için toplu tilavet ve dualar', icon: 'fa-solid fa-book-quran' },
        { time: '12:00', title: 'Sohbet', desc: 'Manevi rehberlik ve ahlak hasbihali', icon: 'fa-solid fa-users' },
        { time: '12:30', title: 'Öğle Namazı', desc: 'Mescidde cemaatle öğle namazı', icon: 'fa-solid fa-mosque' },
        { time: '12:45', title: 'Öğle Yemeği', desc: 'Yemekhanede öğle tabldotu', icon: 'fa-solid fa-utensils' },
        { time: '13:15', title: 'Temizlik', desc: 'Oda, koridor ve etüt alanları düzeni', icon: 'fa-solid fa-broom' },
        { time: '16:00', title: 'İkindi Namazı', desc: 'Cemaatle ikindi namazı ve tesbihat', icon: 'fa-solid fa-mosque' },
        { time: '18:00', title: 'Akşam Yemeği', desc: 'Yemekhanede akşam menüsü', icon: 'fa-solid fa-utensils' },
        { time: '18:30', title: 'Akşam Namazı', desc: 'Cemaatle akşam namazı', icon: 'fa-solid fa-mosque' },
        { time: '20:00', title: 'Yatsı', desc: 'Yatsı namazı ve tesbihat', icon: 'fa-solid fa-moon' },
        { time: '23:00', title: 'İstirahat', desc: 'Yurt içi sessizlik ve gece istirahati', icon: 'fa-solid fa-bed' }
      ];

      const PROGRAM_CONFIG = {
        haftaici: {
          icon: 'fa-solid fa-calendar-week text-gold-400',
          title: 'HAFTAİÇİ PROGRAMIMIZ',
          subtitle: 'Düzenli Gün, Verimli Yarınlar — Günlük Zaman Çizelgesi Akışı',
          flowTitle: 'HAFTAİÇİ GÜNLÜK ZAMAN ÇİZELGESİ AKIŞI',
          caption: 'Yeşilpelit Öğrenci Yurdu Resmi Hafta İçi Düzenli Gün Programıdır.',
          posterSrc: POSTER_WEEKDAY_B64,
          posterAlt: 'Yeşilpelit Hafta İçi Günlük Program Afişi',
          pdfUrl: PDF_WEEKDAY_B64,
          pdfName: 'Yesilpelit-Haftaici-Programi.pdf',
          timeline: WEEKDAY_TIMELINE,
          reminderHtml: \`
            <div class="reminder-header">
              <span class="reminder-badge"><i class="fa-solid fa-shield-halved"></i> YURT DÜZENİ</span>
              <h4 class="reminder-title">HAFTA İÇİ ETÜT VE İSTİRAHAT</h4>
            </div>
            <div class="reminder-content-grid">
              <div class="reminder-item">
                <div class="reminder-icon"><i class="fa-solid fa-book-open"></i></div>
                <div class="reminder-details">
                  <span class="reminder-label">DAHİLİ DERS</span>
                  <span class="reminder-time">18:15 – 20:00</span>
                </div>
              </div>
              <div class="reminder-divider"></div>
              <div class="reminder-item">
                <div class="reminder-icon" style="color: #ef4444;"><i class="fa-solid fa-lock"></i></div>
                <div class="reminder-details">
                  <span class="reminder-label" style="color: #ef4444;">KAPILAR KİLİTLENİR</span>
                  <span class="reminder-time" style="color: #ef4444;">23:00</span>
                </div>
              </div>
            </div>
          \`
        },
        haftasonu: {
          icon: 'fa-solid fa-tree text-gold-400',
          title: 'BİR HAFTASONU DAHA NASIL GÜZEL GEÇİRİLİR?',
          subtitle: 'Manevi Sohbetler & Dahili Ders — Haftasonu Zaman Çizelgesi',
          flowTitle: 'CUMARTESİ GÜNLÜK ZAMAN ÇİZELGESİ AKIŞI',
          caption: 'Yeşilpelit Öğrenci Yurdu Resmi Haftasonu Oryantasyon ve İntibak Programıdır.',
          posterSrc: POSTER_WEEKEND_B64,
          posterAlt: 'Yeşilpelit Haftasonu Manevi Sohbetler ve Dahili Ders Zaman Çizelgesi Afişi',
          pdfUrl: PDF_WEEKEND_B64,
          pdfName: 'Yesilpelit-Haftasonu-Programi.pdf',
          timeline: SATURDAY_TIMELINE,
          reminderHtml: \`
            <div class="reminder-header">
              <span class="reminder-badge"><i class="fa-solid fa-bell"></i> HATIRLATMA</span>
              <h4 class="reminder-title">PAZAR GÜNLERİ</h4>
            </div>
            <div class="reminder-content-grid">
              <div class="reminder-item">
                <div class="reminder-icon"><i class="fa-solid fa-mug-hot"></i></div>
                <div class="reminder-details">
                  <span class="reminder-label">KAHVALTI</span>
                  <span class="reminder-time">11:00</span>
                </div>
              </div>
              <div class="reminder-divider"></div>
              <div class="reminder-item">
                <div class="reminder-icon"><i class="fa-solid fa-utensils"></i></div>
                <div class="reminder-details">
                  <span class="reminder-label">AKŞAM YEMEĞİ</span>
                  <span class="reminder-time">18:00</span>
                </div>
              </div>
            </div>
          \`
        }
      };

      let currentSelectedProgram = 'haftaici';

      function getTodayScheduleType() {
        const day = new Date().getDay(); // 0 = Pazar, 1-5 = Hafta İçi, 6 = Cumartesi
        return (day >= 1 && day <= 5) ? 'haftaici' : 'haftasonu';
      }

      function selectProgram(type) {
        if (!PROGRAM_CONFIG[type]) return;
        currentSelectedProgram = type;
        const config = PROGRAM_CONFIG[type];

        // Sekme butonlarını güncelle
        const btnHaftaici = document.getElementById('btnTabHaftaici');
        const btnHaftasonu = document.getElementById('btnTabHaftasonu');
        if (btnHaftaici && btnHaftasonu) {
          if (type === 'haftaici') {
            btnHaftaici.classList.add('active');
            btnHaftaici.setAttribute('aria-selected', 'true');
            btnHaftasonu.classList.remove('active');
            btnHaftasonu.setAttribute('aria-selected', 'false');
          } else {
            btnHaftasonu.classList.add('active');
            btnHaftasonu.setAttribute('aria-selected', 'true');
            btnHaftaici.classList.remove('active');
            btnHaftaici.setAttribute('aria-selected', 'false');
          }
        }

        // Başlık ve İkon
        const iconEl = document.getElementById('programHeaderIcon');
        const titleEl = document.getElementById('programHeaderTitle');
        const subTitleEl = document.getElementById('programHeaderSubtitle');
        if (iconEl) iconEl.className = config.icon;
        if (titleEl) titleEl.textContent = config.title;
        if (subTitleEl) subTitleEl.textContent = config.subtitle;

        // Afiş Görselleri
        const posterImg = document.getElementById('activePosterImg');
        const modalImg = document.getElementById('modalPosterImg');
        if (posterImg) {
          posterImg.src = config.posterSrc;
          posterImg.alt = config.posterAlt;
        }
        if (modalImg) {
          modalImg.src = config.posterSrc;
          modalImg.alt = config.posterAlt;
        }

        // Afiş Alt Açıklama
        const captionText = document.getElementById('captionText');
        if (captionText) captionText.textContent = config.caption;

        // Akış Başlığı
        const flowTitleEl = document.getElementById('timelineFlowTitle');
        if (flowTitleEl) flowTitleEl.textContent = config.flowTitle;

        // PDF İndir Butonu
        const downloadBtn = document.getElementById('downloadPdfBtn');
        if (downloadBtn) {
          downloadBtn.href = config.pdfUrl;
          downloadBtn.download = config.pdfName;
        }

        // Şu anki etkinliği güncelle
        updateCurrentActivity(new Date());
      }

      function updateLiveClock() {
        const now = new Date();
        const timeEl = document.getElementById('digitalClock');
        if (timeEl) {
          const h = String(now.getHours()).padStart(2, '0');
          const m = String(now.getMinutes()).padStart(2, '0');
          const s = String(now.getSeconds()).padStart(2, '0');
          timeEl.textContent = h + ':' + m + ':' + s;
        }

        const dateEl = document.getElementById('digitalDate');
        if (dateEl) {
          const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
          dateEl.textContent = now.toLocaleDateString('tr-TR', options);
        }

        const hijriEl = document.getElementById('digitalHijri');
        if (hijriEl && !hijriEl.dataset.fazilet) {
          try {
            const formatter = new Intl.DateTimeFormat('tr-TR-u-ca-islamic-umalqura', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
            hijriEl.textContent = formatter.format(now) + ' (Hicrî)';
          } catch (e) {
            hijriEl.textContent = '15 Rebîülevvel 1448 (Hicrî)';
          }
        }

        updateCurrentActivity(now);
      }

      function parseTimeToMinutes(str) {
        if (!str) return 0;
        const [h, m] = str.trim().split(':').map(Number);
        return h * 60 + (m || 0);
      }

      function updateCurrentActivity(now) {
        if (!currentSelectedProgram || !PROGRAM_CONFIG[currentSelectedProgram]) return;
        const items = PROGRAM_CONFIG[currentSelectedProgram].timeline;
        const currentMins = now.getHours() * 60 + now.getMinutes();
        const currentSecs = now.getSeconds();

        // Her etkinliğin başlangıç ve bitiş dakikasını hesapla
        const parsedItems = items.map((item, idx) => {
          let startMins = 0;
          let endMins = 0;

          if (item.time.includes('–') || item.time.includes('-')) {
            const parts = item.time.split(/[-–]/);
            startMins = parseTimeToMinutes(parts[0]);
            endMins = parseTimeToMinutes(parts[1]);
          } else {
            startMins = parseTimeToMinutes(item.time);
            if (idx + 1 < items.length) {
              const nextStartStr = items[idx + 1].time.split(/[-–]/)[0];
              endMins = parseTimeToMinutes(nextStartStr);
            } else {
              endMins = 23 * 60;
            }
          }

          return Object.assign({}, item, { startMins: startMins, endMins: endMins, idx: idx });
        });

        // Aktif etkinliği tespit et
        let activeItem = null;
        let nextItem = null;

        // Gece İstirahat dönemi (23:00 - 05:30 arası)
        if (currentMins >= 23 * 60 || currentMins < 5 * 60 + 30) {
          activeItem = parsedItems.find(it => it.title.toLowerCase().includes('istirahat')) || {
            time: '23:00 – 05:30',
            title: 'Gece İstirahati',
            desc: 'Yurt içi sessizlik ve dinlenme vakti — 23:00 da kapılar kilitlenir',
            icon: 'fa-solid fa-bed'
          };
          nextItem = parsedItems[0]; // 05:30 Sabah Namazına Kalkış
        } else {
          // Gün içi etkinlikler
          for (let i = 0; i < parsedItems.length; i++) {
            const it = parsedItems[i];
            if (currentMins >= it.startMins && currentMins < it.endMins) {
              activeItem = it;
              nextItem = (i + 1 < parsedItems.length) ? parsedItems[i + 1] : parsedItems[0];
              break;
            }
          }

          // Eğer aralık dışında kalırsa en son başlayan etkinliği al
          if (!activeItem) {
            for (let i = parsedItems.length - 1; i >= 0; i--) {
              if (currentMins >= parsedItems[i].startMins) {
                activeItem = parsedItems[i];
                nextItem = (i + 1 < parsedItems.length) ? parsedItems[i + 1] : parsedItems[0];
                break;
              }
            }
          }
        }

        if (!activeItem) {
          activeItem = parsedItems[0];
          nextItem = parsedItems[1] || parsedItems[0];
        }

        // DOM Elemanlarını Güncelle
        const timeEl = document.getElementById('currentActivityTime');
        const titleEl = document.getElementById('currentActivityTitle');
        const descEl = document.getElementById('currentActivityDesc');
        const iconEl = document.getElementById('currentActivityIcon');
        const nextTextEl = document.getElementById('nextActivityText');
        const countdownEl = document.getElementById('activityCountdownTime');
        const periodLabelEl = document.getElementById('currentPeriodLabel');

        if (timeEl) timeEl.textContent = activeItem.time;
        if (titleEl) titleEl.textContent = activeItem.title;
        if (descEl) descEl.textContent = activeItem.desc;
        if (iconEl) iconEl.className = activeItem.icon || 'fa-solid fa-bell';
        if (periodLabelEl) {
          periodLabelEl.textContent = (currentSelectedProgram === 'haftaici' ? 'Hafta İçi Akışı' : 'Hafta Sonu Akışı');
        }

        // Sonraki etkinliğe kalan süre hesabı
        if (nextItem) {
          const nextStartLabel = nextItem.time.split(/[-–]/)[0].trim();
          if (nextTextEl) {
            nextTextEl.textContent = nextStartLabel + ' — ' + nextItem.title;
          }

          if (countdownEl) {
            let diffMins = 0;
            if (nextItem.startMins >= currentMins) {
              diffMins = nextItem.startMins - currentMins - 1;
            } else {
              diffMins = (24 * 60 - currentMins) + nextItem.startMins - 1;
            }
            if (diffMins < 0) diffMins = 0;
            const diffSecs = 59 - currentSecs;
            const h = Math.floor(diffMins / 60);
            const m = diffMins % 60;
            const s = (diffSecs < 10 ? '0' : '') + diffSecs;

            countdownEl.textContent = (h > 0 ? h + ' sa ' : '') + m + ' dk ' + s + ' sn kaldı';
          }
        }
      }

      function setupLightbox() {
        const poster = document.getElementById('posterTrigger');
        const modal = document.getElementById('posterModal');
        const closeBtn = document.getElementById('closePosterModal');

        if (poster && modal) {
          poster.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
          });
        }

        if (closeBtn && modal) {
          closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          });
        }

        if (modal) {
          modal.addEventListener('click', (e) => {
            if (e.target === modal) {
              modal.classList.remove('active');
              document.body.style.overflow = '';
            }
          });
        }

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      }

      function setupKioskMode() {
        const btn = document.getElementById('btnToggleKiosk');
        if (!btn) return;

        btn.addEventListener('click', () => {
          document.body.classList.toggle('tv-kiosk-mode');
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
            btn.innerHTML = '<i class="fa-solid fa-compress"></i>';
            btn.title = 'Tam Ekrandan ��k';
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen().catch(() => {});
            }
            btn.innerHTML = '<i class="fa-solid fa-expand"></i>';
            btn.title = 'Pano / TV Modu (Tam Ekran)';
          }
        });
      }

      function setupThemeToggle() {
        const btn = document.getElementById('btnToggleTheme');
        if (!btn) return;

        const savedTheme = localStorage.getItem('yesilpelit_theme');
        if (savedTheme === 'dark') {
          document.body.classList.add('dark-mode');
          btn.innerHTML = '<i class="fa-solid fa-sun text-gold-400"></i>';
        }

        btn.addEventListener('click', () => {
          document.body.classList.toggle('dark-mode');
          const isDark = document.body.classList.contains('dark-mode');
          localStorage.setItem('yesilpelit_theme', isDark ? 'dark' : 'light');
          btn.innerHTML = isDark 
            ? '<i class="fa-solid fa-sun text-gold-400"></i>' 
            : '<i class="fa-solid fa-moon"></i>';
        });
      }

      function setupPrintAction() {
        const btn = document.getElementById('btnPrintSchedule');
        if (btn) {
          btn.addEventListener('click', () => window.print());
        }
      }

      // ==========================================
      // GÜNÜN HİKMET KÖŞESİ (ÂYET-İ KERÎME VE HADÎS-İ ŞERÎF)
      // ==========================================
      const HIKMET_COLLECTION = ${JSON.stringify(hikmetData, null, 6)};

      let activeHikmetIndex = 0;
      let activeHikmetTab = 'ayet'; // 'ayet', 'hadis', 'dual'
      let hikmetProgressTimer = null;
      let hikmetProgressPercent = 0;
      const HIKMET_CYCLE_DURATION = 15000;

      function getTodayHikmetIndex() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        return dayOfYear % HIKMET_COLLECTION.length;
      }

      function initHikmetSection() {
        activeHikmetIndex = getTodayHikmetIndex();
        renderHikmet();
        startHikmetAutoCycle();

        const card = document.getElementById('hikmetCard');
        if (card) {
          card.addEventListener('mouseenter', pauseHikmetAutoCycle);
          card.addEventListener('mouseleave', startHikmetAutoCycle);
          card.addEventListener('touchstart', pauseHikmetAutoCycle, { passive: true });
        }
      }

      function renderHikmet() {
        const item = HIKMET_COLLECTION[activeHikmetIndex];
        if (!item) return;

        const counterEl = document.getElementById('hikmetCounter');
        const dateTagEl = document.getElementById('hikmetDateTag');
        if (counterEl) {
          counterEl.innerHTML = '<i class="fa-regular fa-compass"></i> Hikmet ' + (activeHikmetIndex + 1) + ' / ' + HIKMET_COLLECTION.length;
        }
        if (dateTagEl) {
          dateTagEl.textContent = item.topic;
        }

        const tabAyet = document.getElementById('tabAyetBtn');
        const tabHadis = document.getElementById('tabHadisBtn');
        const tabDual = document.getElementById('tabDualBtn');
        [tabAyet, tabHadis, tabDual].forEach(b => { if (b) b.classList.remove('active'); });

        if (activeHikmetTab === 'ayet' && tabAyet) tabAyet.classList.add('active');
        else if (activeHikmetTab === 'hadis' && tabHadis) tabHadis.classList.add('active');
        else if (activeHikmetTab === 'dual' && tabDual) tabDual.classList.add('active');

        const bodyEl = document.getElementById('hikmetBody');
        if (!bodyEl) return;

        if (activeHikmetTab === 'ayet') {
          bodyEl.innerHTML = 
            '<div class="hikmet-single-view">' +
              '<div class="hikmet-type-indicator">' +
                '<i class="fa-solid fa-book-open"></i> GÜNÜN ÂYET-İ KERÎMESİ' +
              '</div>' +
              '<div class="hikmet-arabic-wrap">' +
                '<div class="hikmet-arabic-text" dir="rtl">' + item.ayet.arabic + '</div>' +
              '</div>' +
              '<div class="hikmet-turkish-wrap">' +
                '<div class="hikmet-turkish-text">' + item.ayet.turkish + '</div>' +
              '</div>' +
              '<div class="hikmet-meta-row">' +
                '<div class="hikmet-source-tag">' +
                  '<i class="fa-solid fa-bookmark text-gold-400"></i> ' + item.ayet.source +
                '</div>' +
              '</div>' +
              '<div class="hikmet-reflection-box">' +
                '<i class="fa-solid fa-lightbulb text-gold-400"></i>' +
                '<span><strong>Tefekkür:</strong> ' + item.reflection + '</span>' +
              '</div>' +
            '</div>';
        } else if (activeHikmetTab === 'hadis') {
          bodyEl.innerHTML = 
            '<div class="hikmet-single-view">' +
              '<div class="hikmet-type-indicator">' +
                '<i class="fa-solid fa-feather-pointed"></i> GÜNÜN HADÎS-İ ŞERÎFİ' +
              '</div>' +
              '<div class="hikmet-arabic-wrap">' +
                '<div class="hikmet-arabic-text" dir="rtl">' + item.hadis.arabic + '</div>' +
              '</div>' +
              '<div class="hikmet-turkish-wrap">' +
                '<div class="hikmet-turkish-text">' + item.hadis.turkish + '</div>' +
              '</div>' +
              '<div class="hikmet-meta-row">' +
                '<div class="hikmet-source-tag">' +
                  '<i class="fa-solid fa-bookmark text-gold-400"></i> ' + item.hadis.source +
                '</div>' +
              '</div>' +
              '<div class="hikmet-reflection-box">' +
                '<i class="fa-solid fa-lightbulb text-gold-400"></i>' +
                '<span><strong>Tefekkür:</strong> ' + item.reflection + '</span>' +
              '</div>' +
            '</div>';
        } else {
          bodyEl.innerHTML = 
            '<div class="hikmet-dual-grid">' +
              '<div class="hikmet-mini-card">' +
                '<div class="hikmet-type-indicator">' +
                  '<i class="fa-solid fa-book-open"></i> ÂYET-İ KERÎME' +
                '</div>' +
                '<div class="hikmet-arabic-text" dir="rtl">' + item.ayet.arabic + '</div>' +
                '<div class="hikmet-turkish-text">' + item.ayet.turkish + '</div>' +
                '<div class="hikmet-source-tag" style="margin: 0 auto;">' +
                  '<i class="fa-solid fa-bookmark text-gold-400"></i> ' + item.ayet.source +
                '</div>' +
              '</div>' +
              '<div class="hikmet-mini-card">' +
                '<div class="hikmet-type-indicator">' +
                  '<i class="fa-solid fa-feather-pointed"></i> HADÎS-İ ŞERÎF' +
                '</div>' +
                '<div class="hikmet-arabic-text" dir="rtl">' + item.hadis.arabic + '</div>' +
                '<div class="hikmet-turkish-text">' + item.hadis.turkish + '</div>' +
                '<div class="hikmet-source-tag" style="margin: 0 auto;">' +
                  '<i class="fa-solid fa-bookmark text-gold-400"></i> ' + item.hadis.source +
                '</div>' +
              '</div>' +
            '</div>';
        }
      }

      function switchHikmetTab(tab) {
        activeHikmetTab = tab;
        renderHikmet();
        resetHikmetProgress();
      }

      function nextHikmet() {
        activeHikmetIndex = (activeHikmetIndex + 1) % HIKMET_COLLECTION.length;
        renderHikmet();
        resetHikmetProgress();
      }

      function prevHikmet() {
        activeHikmetIndex = (activeHikmetIndex - 1 + HIKMET_COLLECTION.length) % HIKMET_COLLECTION.length;
        renderHikmet();
        resetHikmetProgress();
      }

      function randomHikmet() {
        let nextIdx = activeHikmetIndex;
        while (nextIdx === activeHikmetIndex && HIKMET_COLLECTION.length > 1) {
          nextIdx = Math.floor(Math.random() * HIKMET_COLLECTION.length);
        }
        activeHikmetIndex = nextIdx;
        renderHikmet();
        resetHikmetProgress();
      }

      function copyHikmetText() {
        const item = HIKMET_COLLECTION[activeHikmetIndex];
        if (!item) return;

        let text = '';
        if (activeHikmetTab === 'ayet') {
          text = '📖 Âyet-i Kerîme:\\n' + item.ayet.arabic + '\\n\\n"' + item.ayet.turkish + '"\\n(' + item.ayet.source + ')\\n\\n💡 Tefekkür: ' + item.reflection + '\\n— Yeşilpelit Öğrenci Yurdu';
        } else if (activeHikmetTab === 'hadis') {
          text = '🕊️ Hadîs-i Şerîf:\\n' + item.hadis.arabic + '\\n\\n"' + item.hadis.turkish + '"\\n(' + item.hadis.source + ')\\n\\n💡 Tefekkür: ' + item.reflection + '\\n— Yeşilpelit Öğrenci Yurdu';
        } else {
          text = '📖 Âyet-i Kerîme: "' + item.ayet.turkish + '" (' + item.ayet.source + ')\\n\\n🕊️ Hadîs-i Şerîf: "' + item.hadis.turkish + '" (' + item.hadis.source + ')\\n\\n💡 Tefekkür: ' + item.reflection + '\\n— Yeşilpelit Öğrenci Yurdu';
        }

        navigator.clipboard.writeText(text).then(() => {
          const btn = document.getElementById('btnCopyHikmet');
          if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check" style="color: #22c55e;"></i>';
            setTimeout(() => { btn.innerHTML = orig; }, 1500);
          }
        }).catch(() => {});
      }

      function startHikmetAutoCycle() {
        pauseHikmetAutoCycle();
        hikmetProgressPercent = 0;
        const progressEl = document.getElementById('hikmetProgressFill');

        hikmetProgressTimer = setInterval(() => {
          hikmetProgressPercent += (100 / (HIKMET_CYCLE_DURATION / 100));
          if (progressEl) progressEl.style.width = Math.min(hikmetProgressPercent, 100) + '%';
          if (hikmetProgressPercent >= 100) {
            hikmetProgressPercent = 0;
            if (activeHikmetTab === 'ayet') {
              activeHikmetTab = 'hadis';
            } else if (activeHikmetTab === 'hadis') {
              activeHikmetTab = 'ayet';
              activeHikmetIndex = (activeHikmetIndex + 1) % HIKMET_COLLECTION.length;
            }
            renderHikmet();
          }
        }, 100);
      }

      function pauseHikmetAutoCycle() {
        if (hikmetProgressTimer) {
          clearInterval(hikmetProgressTimer);
          hikmetProgressTimer = null;
        }
      }

      function resetHikmetProgress() {
        hikmetProgressPercent = 0;
        const progressEl = document.getElementById('hikmetProgressFill');
        if (progressEl) progressEl.style.width = '0%';
      }

      function init() {
        // Bugünün gününe göre varsayılan programı belirle
        const todayType = getTodayScheduleType();

        // "Bugün" rozetini ilgili sekmede göster
        const badgeHaftaici = document.getElementById('todayBadgeHaftaici');
        const badgeHaftasonu = document.getElementById('todayBadgeHaftasonu');
        if (todayType === 'haftaici') {
          if (badgeHaftaici) badgeHaftaici.style.display = 'inline-block';
        } else {
          if (badgeHaftasonu) badgeHaftasonu.style.display = 'inline-block';
        }

        // Programı otomatik seç
        selectProgram(todayType);

        updateLiveClock();
        setInterval(updateLiveClock, 1000);
        setupLightbox();
        setupKioskMode();
        setupThemeToggle();
        setupPrintAction();
        initHikmetSection();
      }

      return { 
        init, 
        selectProgram,
        switchHikmetTab,
        nextHikmet,
        prevHikmet,
        randomHikmet,
        copyHikmetText
      };
    })();

    // 3. CANLI SENKRONİZASYON (Tüm bağlı TV ve ekranların anında güncellenmesi)
    const SYNC_MODULE = (() => {
      let currentVersion = null;
      let isReloading = false;

      function showReloadToast() {
        if (isReloading) return;
        isReloading = true;

        let toast = document.getElementById('syncToast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'syncToast';
          toast.style.cssText = [
            'position: fixed',
            'bottom: 24px',
            'right: 24px',
            'background: rgba(7, 42, 25, 0.95)',
            'color: #fef08a',
            'border: 2px solid #ca8a04',
            'border-radius: 12px',
            'padding: 14px 22px',
            'font-family: inherit',
            'font-size: 0.95rem',
            'font-weight: 700',
            'box-shadow: 0 10px 30px rgba(0,0,0,0.6)',
            'z-index: 999999',
            'display: flex',
            'align-items: center',
            'gap: 12px',
            'transition: all 0.3s ease'
          ].join(';');
          document.body.appendChild(toast);
        }
        toast.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin" style="font-size: 1.3rem; color: #facc15;"></i> <span>Pano Güncellendi! Ekran otomatik yenileniyor...</span>';

        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }

      function initSSE() {
        try {
          const isHttp = window.location.protocol.startsWith('http');
          const host = isHttp ? window.location.origin : 'http://localhost:3000';
          const sseUrl = host + '/api/live-sync';

          const source = new EventSource(sseUrl);

          source.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.action === 'connected') {
                if (currentVersion === null) {
                  currentVersion = data.version;
                } else if (currentVersion !== data.version) {
                  showReloadToast();
                }
              } else if (data.action === 'reload') {
                showReloadToast();
              }
            } catch (e) {}
          };

          source.onerror = () => {
            source.close();
            startPolling();
          };
        } catch (e) {
          startPolling();
        }
      }

      let pollInterval = null;
      function startPolling() {
        if (pollInterval) return;
        pollInterval = setInterval(async () => {
          try {
            const isHttp = window.location.protocol.startsWith('http');
            const isGitHub = window.location.hostname.includes('github.io');

            let url;
            if (isGitHub) {
              url = 'assets/data/version.json?_t=' + Date.now();
            } else {
              const host = isHttp ? window.location.origin : 'http://localhost:3000';
              url = host + '/api/version?_t=' + Date.now();
            }

            const res = await fetch(url, { cache: 'no-store' });
            if (res.ok) {
              const data = await res.json();
              const serverVer = data.version;
              if (currentVersion === null) {
                currentVersion = serverVer;
              } else if (serverVer && currentVersion !== serverVer) {
                showReloadToast();
              }
            }
          } catch (e) {}
        }, 12000);
      }

      function init() {
        initSSE();
      }

      return { init };
    })();

    document.addEventListener('DOMContentLoaded', () => {
      PRAYER_MODULE.init();
      APP_MODULE.init();
      SYNC_MODULE.init();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('Successfully built completely self-contained index.html (' + htmlContent.length + ' bytes)!');
