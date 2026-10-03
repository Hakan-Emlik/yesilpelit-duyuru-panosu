/**
 * YEŞİLPELİT ÖĞRENCİ YURDU - DİJİTAL DUYURU PANOSU ANA UYGULAMA MANTIĞI
 */

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

  // Canlı Saat & Tarih Yönetimi
  function updateLiveClock() {
    const now = new Date();

    // Dijital Saat
    const timeEl = document.getElementById('digitalClock');
    if (timeEl) {
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      timeEl.textContent = `${h}:${m}:${s}`;
    }

    // Miladi Tarih
    const dateEl = document.getElementById('digitalDate');
    if (dateEl) {
      const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
      dateEl.textContent = now.toLocaleDateString('tr-TR', options);
    }

    // Hicri Tarih (Fazilet Takvimi varsa resmi tarih korunur)
    const hijriEl = document.getElementById('digitalHijri');
    if (hijriEl && !hijriEl.dataset.fazilet) {
      hijriEl.textContent = getHijriDate(now);
    }


    // Zaman çizelgesindeki anlık aktif etkinliği işaretle
    highlightCurrentTimelineItem(now);
  }

  function getHijriDate(date) {
    try {
      const formatter = new Intl.DateTimeFormat('tr-TR-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return `${formatter.format(date)} (Hicrî)`;
    } catch (e) {
      return '15 Rebîülevvel 1448 (Hicrî)';
    }
  }

  // Zaman çizelgesini DOM'a render et
  function renderTimeline() {
    const container = document.getElementById('timelineList');
    if (!container) return;

    container.innerHTML = SATURDAY_TIMELINE.map((item, idx) => `
      <div class="timeline-card" id="timeline-item-${idx}">
        <div class="timeline-time-pill">${item.time}</div>
        <div class="timeline-info">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  function highlightCurrentTimelineItem(now) {
    const currentMins = now.getHours() * 60 + now.getMinutes();

    let activeIdx = -1;
    for (let i = 0; i < SATURDAY_TIMELINE.length; i++) {
      const startStr = SATURDAY_TIMELINE[i].time.split(' ')[0]; // '09:00' from '09:00 - 09:30'
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

  // Lightbox Modal Yönetimi (2. Fotoğraf Afiş Büyütme)
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

  // TV / Kiosk Modu (Tam Ekran)
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

  // Tema Değiştirici (Dark / Light)
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

  // Yazdır / A4 Baskı Butonu
  function setupPrintAction() {
    const btn = document.getElementById('btnPrintSchedule');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.print();
    });
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

  return {
    init
  };
})();

// Canlı Senkronizasyon Modülü (Bağlı TV ve ekranların anında yenilenmesi)
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
      const sseUrl = `${host}/api/live-sync`;

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
          url = `assets/data/version.json?_t=${Date.now()}`;
        } else {
          const host = isHttp ? window.location.origin : 'http://localhost:3000';
          url = `${host}/api/version?_t=${Date.now()}`;
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
  APP_MODULE.init();
  SYNC_MODULE.init();
});

