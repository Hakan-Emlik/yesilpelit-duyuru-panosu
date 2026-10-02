const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../assets/images/logo.png');
const posterPath = path.join(__dirname, '../assets/images/haftasonu-programi.jpg');
const pdfPath = path.join(__dirname, '../assets/docs/haftasonu-programi.pdf');

const logoBytes = fs.readFileSync(logoPath);
const logoB64 = 'data:image/png;base64,' + logoBytes.toString('base64');

const posterBytes = fs.readFileSync(posterPath);
const posterB64 = 'data:image/jpeg;base64,' + posterBytes.toString('base64');

let pdfB64 = '';
try {
  const pdfBytes = fs.readFileSync(pdfPath);
  pdfB64 = 'data:application/pdf;base64,' + pdfBytes.toString('base64');
} catch (e) {
  console.log('PDF not found, skipping base64 pdf');
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
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

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

    /* Sağ Kolon: İnteraktif Zaman Çizelgesi Akışı */
    .schedule-flow-wrapper {
      display: flex;
      flex-direction: column;
      gap: 5px;
      height: 100%;
      justify-content: space-between;
    }

    .schedule-header-card {
      background: linear-gradient(135deg, var(--gold-50), var(--brand-50));
      border: 1px solid var(--gold-300);
      border-radius: 5px;
      padding: 3px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    body.dark-mode .schedule-header-card {
      background: linear-gradient(135deg, #1c1917, #0c1f16);
      border-color: var(--gold-700);
    }

    .schedule-badge-title {
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--gold-900);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    body.dark-mode .schedule-badge-title {
      color: var(--gold-400);
    }

    .timeline-items-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      flex: 1;
    }

    @media (max-width: 1200px) {
      .timeline-items-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .timeline-items-list {
        grid-template-columns: 1fr;
      }
    }

    .timeline-card {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: 5px;
      padding: 4px 6px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: var(--transition);
      position: relative;
      min-height: 38px;
    }

    .timeline-card:hover {
      border-color: var(--brand-500);
      transform: translateX(1px);
    }

    .timeline-card.now-active {
      background: linear-gradient(135deg, #f0fdf4, #fef3c7);
      border: 1.5px solid var(--gold-500);
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25);
    }

    body.dark-mode .timeline-card.now-active {
      background: linear-gradient(135deg, #093320, #291e0a);
    }

    .timeline-time-pill {
      font-family: 'Outfit', monospace;
      font-weight: 800;
      font-size: 0.72rem;
      color: var(--brand-900);
      background: var(--brand-100);
      border: 1px solid var(--brand-200);
      padding: 1px 5px;
      border-radius: 4px;
      min-width: 44px;
      text-align: center;
      flex-shrink: 0;
    }

    .timeline-card.now-active .timeline-time-pill {
      background: var(--gold-500);
      color: var(--slate-950);
      border-color: var(--gold-600);
    }

    .timeline-info h4 {
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.15;
      margin: 0;
    }

    .timeline-info p {
      font-size: 0.62rem;
      color: var(--text-subtle);
      margin: 1px 0 0 0;
      line-height: 1.1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Pazar Günleri Hatırlatma Kartı (Afiş Alt Alanı) */
    .sunday-reminder-card {
      background: linear-gradient(135deg, rgba(254, 243, 199, 0.7), rgba(240, 253, 244, 0.8));
      border: 1.5px solid var(--gold-400);
      border-radius: 6px;
      padding: 3px 10px;
      margin-top: 3px;
      box-shadow: 0 2px 6px rgba(217, 119, 6, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px;
    }

    body.dark-mode .sunday-reminder-card {
      background: linear-gradient(135deg, rgba(120, 53, 15, 0.25), rgba(7, 42, 25, 0.5));
      border-color: var(--gold-600);
    }

    .reminder-header {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .reminder-badge {
      background: var(--gold-500);
      color: var(--brand-950);
      font-size: 0.62rem;
      font-weight: 800;
      letter-spacing: 0.03em;
      padding: 1px 6px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .reminder-title {
      font-family: 'Cinzel', serif;
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--gold-900);
      letter-spacing: 0.02em;
      margin: 0;
    }

    body.dark-mode .reminder-title {
      color: var(--gold-300);
    }

    .reminder-content-grid {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .reminder-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .reminder-icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--brand-100);
      color: var(--brand-800);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.68rem;
    }

    body.dark-mode .reminder-icon {
      background: var(--brand-900);
      color: var(--brand-300);
    }

    .reminder-details {
      display: flex;
      flex-direction: column;
    }

    .reminder-label {
      font-size: 0.6rem;
      font-weight: 700;
      color: var(--text-subtle);
      letter-spacing: 0.03em;
    }

    .reminder-time {
      font-family: 'Outfit', sans-serif;
      font-size: 0.95rem;
      font-weight: 900;
      color: var(--brand-900);
      line-height: 1;
    }

    body.dark-mode .reminder-time {
      color: var(--gold-400);
    }

    .reminder-divider {
      width: 1px;
      height: 20px;
      background: var(--gold-300);
    }

    body.dark-mode .reminder-divider {
      background: var(--gold-700);
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
              <a href="https://fazilettakvimi.com/namaz-vakitleri/" target="_blank" rel="noopener noreferrer" class="source-link-tag">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>Fazilet Takvimi</span>
              </a>
              <span class="source-separator">·</span>
              <span class="source-temkin">Temkinli Şer'î Vakitler</span>
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
            src="https://fazilettakvimi.com/gunluk/" 
            title="Fazilet Takvimi Günlük Namaz Vakitleri Resmi Penceresi"
            loading="lazy">
          </iframe>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-subtle); margin-top: 10px; text-align: right;">
          Doğrudan bağlantı: <a href="https://fazilettakvimi.com/namaz-vakitleri/" target="_blank" rel="noopener noreferrer" style="color: var(--gold-600); font-weight: 700;">fazilettakvimi.com/namaz-vakitleri</a>
        </p>
      </div>

    </section>

    <!-- 2. BÖLÜM: HAFTASONU PROGRAMI & ZAMAN ÇİZELGESİ (2. FOTOĞRAF & PDF) -->
    <section class="weekend-program-section" id="haftasonu-programi" aria-label="Haftasonu Programı ve Zaman Çizelgesi">
      
      <!-- Bölüm Üst Başlığı ve PDF Aksiyonları -->
      <div class="section-top-header">
        <div>
          <h2>
            <i class="fa-solid fa-tree text-gold-400"></i>
            <span>BİR HAFTASONU DAHA NASIL GÜZEL GEÇİRİLİR?</span>
          </h2>
          <p>Manevi Sohbetler & Dahili Ders — Cumartesi Zaman Çizelgesi</p>
        </div>

        <div class="pdf-action-buttons">
          <!-- PDF İndir Butonu -->
          <a href="${pdfB64 || 'assets/docs/haftasonu-programi.pdf'}" download="Yesilpelit-Haftasonu-Programi.pdf" class="btn-pdf-download" id="downloadPdfBtn">
            <i class="fa-solid fa-file-pdf"></i>
            <span>PDF Programını İndir</span>
          </a>

          <!-- Yazdır Butonu -->
          <button class="btn-secondary-action" id="btnPrintSchedule">
            <i class="fa-solid fa-print"></i>
            <span>A4 Yazdır</span>
          </button>

          <!-- Afişi Büyüt -->
          <button class="btn-secondary-action" onclick="document.getElementById('posterTrigger').click()">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
            <span>Afişi Büyüt</span>
          </button>
        </div>
      </div>

      <!-- Çift Görünüm Düzeni: Sol Afiş Çerçevesi + Sağ İnteraktif Zaman Çizelgesi -->
      <div class="program-layout-grid">
        
        <!-- Sol Kolon: 2. Fotoğraf Afiş Vitrini -->
        <div class="poster-frame-wrapper">
          <div class="poster-wood-border" id="posterTrigger" title="Büyütmek için tıklayın">
            <img src="${posterB64}" alt="Yeşilpelit Haftasonu Manevi Sohbetler ve Dahili Ders Zaman Çizelgesi Afişi">
            <div class="poster-overlay-hint">
              <i class="fa-solid fa-expand"></i>
              <span>Afişi İncelemek İçin Tıklayın</span>
            </div>
          </div>
          <div class="poster-footer-caption">
            <p><i class="fa-solid fa-circle-info text-gold-600"></i> Yeşilpelit Öğrenci Yurdu Resmi Haftasonu Oryantasyon ve İntibak Programıdır.</p>
          </div>
        </div>

        <!-- Sağ Kolon: İnteraktif Canlı Zaman Akışı (15 Madde) -->
        <div class="schedule-flow-wrapper">
          
          <div class="schedule-header-card">
            <div class="schedule-badge-title">
              <i class="fa-solid fa-clipboard-list"></i>
              <span>CUMARTESİ GÜNLÜK ZAMAN ÇİZELGESİ AKIŞI</span>
            </div>
            <span style="font-size: 0.82rem; font-weight: 700; color: var(--brand-700);">
              <i class="fa-solid fa-bell"></i> Canlı Saatle Senkronize
            </span>
          </div>

          <!-- 15 Program Maddesi -->
          <div class="timeline-items-list" id="timelineList">
            <!-- JS ile doldurulur -->
          </div>

          <!-- Pazar Günleri Hatırlatma Kartı (Afiş Alt Bölümü) -->
          <div class="sunday-reminder-card">
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
      <img src="${posterB64}" alt="Yeşilpelit Haftasonu Programı Büyük Boy Afiş">
    </div>
  </div>

  <!-- ==========================================
       ALT BİLGİ (FOOTER)
       ========================================== -->
  <footer class="board-footer">
    <div class="footer-inner">
      <span><strong>Yeşilpelit Öğrenci Yurdu Duyuru Panosu</strong> — İlim, Maneviyat ve Medeniyet Şuuruyla</span>
      <span>•</span>
      <span>Namaz Vakitleri: <a href="https://fazilettakvimi.com/namaz-vakitleri/" target="_blank" rel="noopener noreferrer" style="color: var(--gold-600); text-decoration: underline;">Fazilet Takvimi</a></span>
    </div>
  </footer>

  <!-- ==========================================
       JAVASCRIPT MANTIĞI (TAM ENTEGRE)
       ========================================== -->
  <script>
    // 1. SAMSUN NAMAZ VAKİTLERİ
    const PRAYER_MODULE = (() => {
      let prayerTimes = {
        name: 'Samsun',
        fajr: '04:54',
        sunrise: '06:19',
        dhuhr: '12:31',
        asr: '15:53',
        maghrib: '18:32',
        isha: '19:52'
      };

      async function fetchLivePrayerTimes() {
        try {
          const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Samsun&country=Turkey&method=13');
          if (res.ok) {
            const data = await res.json();
            if (data?.data?.timings) {
              const t = data.data.timings;
              prayerTimes = {
                name: 'Samsun',
                fajr: t.Fajr.slice(0, 5),
                sunrise: t.Sunrise.slice(0, 5),
                dhuhr: t.Dhuhr.slice(0, 5),
                asr: t.Asr.slice(0, 5),
                maghrib: t.Maghrib.slice(0, 5),
                isha: t.Isha.slice(0, 5)
              };
              renderPrayerCards();
            }
          }
        } catch (e) {
          console.log('Samsun yerel temkinli vakitleri devrede.');
        }
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
    const APP_MODULE = (() => {
      // Yeni Afişteki Resmi Zaman Çizelgesi Maddeleri
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
        if (hijriEl) {
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

        highlightCurrentTimelineItem(now);
      }

      function renderTimeline() {
        const container = document.getElementById('timelineList');
        if (!container) return;

        container.innerHTML = SATURDAY_TIMELINE.map((item, idx) => \`
          <div class="timeline-card" id="timeline-item-\${idx}">
            <div class="timeline-time-pill">\${item.time}</div>
            <div class="timeline-info">
              <h4>\${item.title}</h4>
              <p>\${item.desc}</p>
            </div>
          </div>
        \`).join('');
      }

      function highlightCurrentTimelineItem(now) {
        const currentMins = now.getHours() * 60 + now.getMinutes();
        let activeIdx = -1;
        for (let i = 0; i < SATURDAY_TIMELINE.length; i++) {
          const startStr = SATURDAY_TIMELINE[i].time.split(' ')[0];
          const [h, m] = startStr.split(':').map(Number);
          const itemMins = h * 60 + m;
          if (currentMins >= itemMins) {
            activeIdx = i;
          }
        }

        document.querySelectorAll('.timeline-card').forEach((card, idx) => {
          if (idx === activeIdx) {
            card.classList.add('now-active');
          } else {
            card.classList.remove('now-active');
          }
        });
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
            btn.title = 'Tam Ekrandan Çık';
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

      function init() {
        renderTimeline();
        updateLiveClock();
        setInterval(updateLiveClock, 1000);
        setupLightbox();
        setupKioskMode();
        setupThemeToggle();
        setupPrintAction();
      }

      return { init };
    })();

    document.addEventListener('DOMContentLoaded', () => {
      PRAYER_MODULE.init();
      APP_MODULE.init();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('Successfully built completely self-contained index.html (' + htmlContent.length + ' bytes)!');
