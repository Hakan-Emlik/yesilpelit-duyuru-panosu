/**
 * YEŞİLPELİT ÖĞRENCİ YURDU - DİJİTAL DUYURU PANOSU ANA UYGULAMA MANTIĞI
 * Canlı Saat, Dinamik Zaman Akışı, Günün Hikmeti, Kiosk/TV Modu ve Tema Yönetimi.
 */

const APP_MODULE = (() => {
  // Gömülü veya dinamik yüklenecek program verisi
  let programData = (typeof EMBEDDED_PROGRAM_DATA !== 'undefined' && EMBEDDED_PROGRAM_DATA) ? EMBEDDED_PROGRAM_DATA : null;
  let hikmetData = (typeof EMBEDDED_HIKMET_DATA !== 'undefined' && EMBEDDED_HIKMET_DATA) ? EMBEDDED_HIKMET_DATA : [];

  let currentSelectedProgram = 'haftaici'; // 'haftaici' veya 'haftasonu'

  // Varsayılan / Yedek Program Konfigürasyonu
  const DEFAULT_PROGRAM_CONFIG = {
    haftaici: {
      sekme: 'Hafta İçi Programı',
      akisEtiketi: 'Hafta İçi Akışı',
      ikon: 'fa-solid fa-calendar-week text-gold-400',
      baslik: 'HAFTAİÇİ PROGRAMIMIZ',
      altBaslik: 'Düzenli Gün, Verimli Yarınlar — Günlük Zaman Çizelgesi Akışı',
      afisAciklama: 'Yeşilpelit Öğrenci Yurdu Resmi Hafta İçi Düzenli Gün Programıdır.',
      afis: 'assets/images/haftaici-programi.jpg',
      afisAlt: 'Yeşilpelit Hafta İçi Günlük Program Afişi',
      pdf: 'assets/docs/haftaici-programi.pdf',
      pdfAdi: 'Yesilpelit-Haftaici-Programi.pdf',
      akis: [
        { saat: '05:30', baslik: 'Sabah Namazına Kalkış', aciklama: 'Günün başlangıcı, abdest ve mescide hazırlık', ikon: 'fa-solid fa-bell' },
        { saat: '06:00', baslik: 'Sabah Namazı - Hatim ve Vazifeler', aciklama: 'Mescidde cemaatle sabah namazı, hatim ve günlük ders vazifeleri', ikon: 'fa-solid fa-mosque' },
        { saat: '07:00 – 08:00', baslik: 'Kahvaltı', aciklama: 'Yemekhanede toplu sabah kahvaltısı', ikon: 'fa-solid fa-mug-hot' },
        { saat: '08:00', baslik: 'Okula Çıkış', aciklama: 'Öğrencilerin okul dersleri için yurttan hareketi', ikon: 'fa-solid fa-graduation-cap' },
        { saat: '11:30 – 13:00', baslik: 'Öğle Yemeği', aciklama: 'Yemekhanede sıcak öğle tabldotu servisi', ikon: 'fa-solid fa-utensils' },
        { saat: '13:00', baslik: 'Öğle Namazı', aciklama: 'Mescidde cemaatle öğle namazı', ikon: 'fa-solid fa-mosque' },
        { saat: '16:00', baslik: 'İkindi Namazı', aciklama: 'Mescidde cemaatle ikindi namazı ve tesbihat', ikon: 'fa-solid fa-mosque' },
        { saat: '17:30 – 18:15', baslik: 'Akşam Yemeği', aciklama: 'Yemekhanede akşam tabldotu servisi', ikon: 'fa-solid fa-utensils' },
        { saat: '18:15 – 20:00', baslik: 'Dahili Ders', aciklama: 'Etüt salonlarında dahili dersler ve ders çalışma', ikon: 'fa-solid fa-book-open' },
        { saat: '18:27', vakit: 'aksam', sure: 20, baslik: 'Akşam Namazı (Gruplarda)', aciklama: 'Gruplar halinde mescidde akşam namazı', ikon: 'fa-solid fa-mosque' },
        { saat: '20:00', baslik: 'Yatsı Namazı', aciklama: 'Mescidde cemaatle yatsı namazı ve tesbihat', ikon: 'fa-solid fa-moon' },
        { saat: '23:00', baslik: 'İstirahat (Kapılar Kilitlenecek)', aciklama: 'Yurt içi sessizlik ve istirahat — 23:00 da kapılar kilitlenecektir', ikon: 'fa-solid fa-bed' }
      ]
    },
    haftasonu: {
      sekme: 'Hafta Sonu Programı',
      akisEtiketi: 'Hafta Sonu Akışı',
      ikon: 'fa-solid fa-tree text-gold-400',
      baslik: 'BİR HAFTASONU DAHA NASIL GÜZEL GEÇİRİLİR?',
      altBaslik: 'Manevi Sohbetler & Dahili Ders — Haftasonu Zaman Çizelgesi',
      afisAciklama: 'Yeşilpelit Öğrenci Yurdu Resmi Haftasonu Oryantasyon ve İntibak Programıdır.',
      afis: 'assets/images/haftasonu-programi.jpg',
      afisAlt: 'Yeşilpelit Haftasonu Manevi Sohbetler ve Dahili Ders Zaman Çizelgesi Afişi',
      pdf: 'assets/docs/haftasonu-programi.pdf',
      pdfAdi: 'Yesilpelit-Haftasonu-Programi.pdf',
      akis: [
        { saat: '05:30', baslik: 'Kalkış', aciklama: 'Günün başlangıcı ve sabah hazırlığı', ikon: 'fa-solid fa-bell' },
        { saat: '06:00', baslik: 'Sabah Namazı - Hatim', aciklama: 'Mescidde cemaatle sabah namazı ve Kur\'an tilaveti', ikon: 'fa-solid fa-mosque' },
        { saat: '09:00', baslik: 'Kahvaltı', aciklama: 'Yemekhanede toplu açık büfe kahvaltı', ikon: 'fa-solid fa-mug-hot' },
        { saat: '09:30', baslik: 'Duha', aciklama: 'Kuşluk vakti nafile namazı', ikon: 'fa-solid fa-sun' },
        { saat: '09:45', baslik: '1. Ders', aciklama: 'Medrese müfredatı ve ihtisas dersi', ikon: 'fa-solid fa-graduation-cap' },
        { saat: '11:30', baslik: 'Evrad Şerif', aciklama: 'Günün bereketi için toplu tilavet ve dualar', ikon: 'fa-solid fa-book-quran' },
        { saat: '12:00', baslik: 'Sohbet', aciklama: 'Manevi rehberlik ve ahlak hasbihali', ikon: 'fa-solid fa-users' },
        { saat: '12:30', baslik: 'Öğle Namazı', aciklama: 'Mescidde cemaatle öğle namazı', ikon: 'fa-solid fa-mosque' },
        { saat: '12:45', baslik: 'Öğle Yemeği', aciklama: 'Yemekhanede öğle tabldotu', ikon: 'fa-solid fa-utensils' },
        { saat: '13:15', baslik: 'Temizlik', aciklama: 'Oda, koridor ve etüt alanları düzeni', ikon: 'fa-solid fa-broom' },
        { saat: '16:00', baslik: 'İkindi Namazı', aciklama: 'Cemaatle ikindi namazı ve tesbihat', ikon: 'fa-solid fa-mosque' },
        { saat: '18:00', baslik: 'Akşam Yemeği', aciklama: 'Yemekhanede akşam menüsü', ikon: 'fa-solid fa-utensils' },
        { saat: '18:30', vakit: 'aksam', sure: 20, baslik: 'Akşam Namazı', aciklama: 'Cemaatle akşam namazı', ikon: 'fa-solid fa-mosque' },
        { saat: '20:00', baslik: 'Yatsı', aciklama: 'Yatsı namazı ve tesbihat', ikon: 'fa-solid fa-moon' },
        { saat: '23:00', baslik: 'İstirahat', aciklama: 'Yurt içi sessizlik ve gece istirahati', ikon: 'fa-solid fa-bed' }
      ]
    }
  };

  function getProgramConfig(type) {
    if (!programData) return DEFAULT_PROGRAM_CONFIG[type] || DEFAULT_PROGRAM_CONFIG.haftaici;

    if (type === 'haftaici') {
      return programData.haftaici || DEFAULT_PROGRAM_CONFIG.haftaici;
    }

    // Hafta sonu: Cumartesi veya Pazar
    const day = (typeof TR_TIME !== 'undefined') ? TR_TIME.now().weekday : new Date().getDay();
    if (day === 0 && programData.pazar) {
      return programData.pazar;
    }
    return programData.cumartesi || programData.haftasonu || DEFAULT_PROGRAM_CONFIG.haftasonu;
  }

  function getTodayScheduleType() {
    const day = (typeof TR_TIME !== 'undefined') ? TR_TIME.now().weekday : new Date().getDay();
    return (day >= 1 && day <= 5) ? 'haftaici' : 'haftasonu';
  }

  /**
   * Namaz vakitleri değiştikçe akış maddelerinin saatlerini günceller.
   * Örneğin: Akşam Namazı maddesi o günkü resmi akşam vaktini alır.
   */
  function resolveTimelineItems(rawItems) {
    if (!Array.isArray(rawItems)) return [];

    return rawItems.map(item => {
      let resolvedTime = item.saat || item.time || '';

      if (item.vakit && typeof PRAYER_MODULE !== 'undefined') {
        const livePrayerTime = PRAYER_MODULE.getPrayerTime(item.vakit);
        if (livePrayerTime) {
          if (item.sure && typeof TR_TIME !== 'undefined') {
            const startM = TR_TIME.toMinutes(livePrayerTime);
            if (startM !== null) {
              const endStr = TR_TIME.fromMinutes(startM + item.sure);
              resolvedTime = `${livePrayerTime} – ${endStr}`;
            } else {
              resolvedTime = livePrayerTime;
            }
          } else {
            resolvedTime = livePrayerTime;
          }
        }
      }

      return {
        time: resolvedTime,
        title: item.baslik || item.title || '',
        desc: item.aciklama || item.desc || '',
        icon: item.ikon || item.icon || 'fa-solid fa-bell'
      };
    });
  }

  function selectProgram(type) {
    currentSelectedProgram = type;
    const config = getProgramConfig(type);

    // Sekme Butonlarını Güncelle
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
    if (iconEl) iconEl.className = config.ikon || config.icon || 'fa-solid fa-calendar-day';
    if (titleEl) titleEl.textContent = config.baslik || config.title || '';
    if (subTitleEl) subTitleEl.textContent = config.altBaslik || config.subtitle || '';

    // Afiş
    const posterImg = document.getElementById('activePosterImg');
    const modalImg = document.getElementById('modalPosterImg');
    const posterSrc = config.afisB64 || config.afis || config.posterSrc || '';
    const posterAlt = config.afisAlt || config.posterAlt || 'Program Afişi';
    if (posterImg) {
      posterImg.src = posterSrc;
      posterImg.alt = posterAlt;
    }
    if (modalImg) {
      modalImg.src = posterSrc;
      modalImg.alt = posterAlt;
    }

    // Alt Açıklama
    const captionText = document.getElementById('captionText');
    if (captionText) captionText.textContent = config.afisAciklama || config.caption || '';

    // PDF İndir Butonu
    const downloadBtn = document.getElementById('downloadPdfBtn');
    if (downloadBtn) {
      downloadBtn.href = config.pdfB64 || config.pdf || config.pdfUrl || '#';
      downloadBtn.download = config.pdfAdi || config.pdfName || 'Yesilpelit-Program.pdf';
    }

    // Şu anki etkinliği güncelle
    updateCurrentActivity();
  }

  function updateLiveClock() {
    const timeInfo = (typeof TR_TIME !== 'undefined') ? TR_TIME.now() : null;
    const now = timeInfo ? timeInfo.date : new Date();

    const timeEl = document.getElementById('digitalClock');
    if (timeEl) {
      const h = String(timeInfo ? timeInfo.hour : now.getHours()).padStart(2, '0');
      const m = String(timeInfo ? timeInfo.minute : now.getMinutes()).padStart(2, '0');
      const s = String(timeInfo ? timeInfo.second : now.getSeconds()).padStart(2, '0');
      timeEl.textContent = `${h}:${m}:${s}`;
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
          day: 'numeric', month: 'long', year: 'numeric'
        });
        hijriEl.textContent = `${formatter.format(now)} (Hicrî)`;
      } catch (e) {
        hijriEl.textContent = 'Hicrî Takvim';
      }
    }

    updateCurrentActivity();
  }

  function parseTimeToMinutes(str) {
    if (!str) return 0;
    const match = str.trim().match(/^(\d{1,2}):(\d{2})/);
    if (!match) return 0;
    return Number(match[1]) * 60 + Number(match[2]);
  }

  function updateCurrentActivity() {
    const config = getProgramConfig(currentSelectedProgram);
    const rawItems = config.akis || config.timeline || [];
    const items = resolveTimelineItems(rawItems);
    if (items.length === 0) return;

    const timeInfo = (typeof TR_TIME !== 'undefined') ? TR_TIME.now() : null;
    const currentMins = timeInfo ? timeInfo.minutes : (new Date().getHours() * 60 + new Date().getMinutes());
    const currentSecs = timeInfo ? timeInfo.second : new Date().getSeconds();

    // Maddeleri başlama ve bitiş dakikalarıyla hesapla
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

      return { ...item, startMins, endMins, idx };
    });

    let activeItem = null;
    let nextItem = null;

    // Gece İstirahat dönemi (23:00 - 05:30)
    if (currentMins >= 23 * 60 || currentMins < 5 * 60 + 30) {
      activeItem = parsedItems.find(it => it.title.toLowerCase().includes('istirahat')) || {
        time: '23:00 – 05:30',
        title: 'Gece İstirahati',
        desc: 'Yurt içi sessizlik ve dinlenme vakti — 23:00\'te kapılar kilitlenir',
        icon: 'fa-solid fa-bed'
      };
      nextItem = parsedItems[0];
    } else {
      for (let i = 0; i < parsedItems.length; i++) {
        const it = parsedItems[i];
        if (currentMins >= it.startMins && currentMins < it.endMins) {
          activeItem = it;
          nextItem = (i + 1 < parsedItems.length) ? parsedItems[i + 1] : parsedItems[0];
          break;
        }
      }

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

    // DOM Güncelle
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
      periodLabelEl.textContent = config.akisEtiketi || (currentSelectedProgram === 'haftaici' ? 'Hafta İçi Akışı' : 'Hafta Sonu Akışı');
    }

    if (nextItem) {
      const nextStartLabel = nextItem.time.split(/[-–]/)[0].trim();
      if (nextTextEl) {
        nextTextEl.textContent = `${nextStartLabel} — ${nextItem.title}`;
      }

      if (countdownEl) {
        let diffMins = 0;
        if (nextItem.startMins >= currentMins) {
          diffMins = nextItem.startMins - currentMins - 1;
        } else {
          diffMins = (1440 - currentMins) + nextItem.startMins - 1;
        }
        if (diffMins < 0) diffMins = 0;
        const diffSecs = 59 - currentSecs;
        const h = Math.floor(diffMins / 60);
        const m = diffMins % 60;
        const s = (diffSecs < 10 ? '0' : '') + diffSecs;

        countdownEl.textContent = (h > 0 ? `${h} sa ` : '') + `${m} dk ${s} sn kaldı`;
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

  // ==========================================
  // GÜNÜN HİKMET KÖŞESİ (ÂYET-İ KERÎME VE HADÎS-İ ŞERÎF)
  // ==========================================
  let activeHikmetIndex = 0;
  let activeHikmetTab = 'ayet'; // 'ayet', 'hadis', 'dual'
  let hikmetProgressTimer = null;
  let hikmetProgressPercent = 0;
  const HIKMET_CYCLE_DURATION = 15000;

  function getTodayHikmetIndex() {
    if (!hikmetData || hikmetData.length === 0) return 0;
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return dayOfYear % hikmetData.length;
  }

  function initHikmetSection() {
    if (!hikmetData || hikmetData.length === 0) return;
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
    if (!hikmetData || hikmetData.length === 0) return;
    const item = hikmetData[activeHikmetIndex];
    if (!item) return;

    const counterEl = document.getElementById('hikmetCounter');
    const dateTagEl = document.getElementById('hikmetDateTag');
    if (counterEl) {
      counterEl.innerHTML = `<i class="fa-regular fa-compass"></i> Hikmet ${activeHikmetIndex + 1} / ${hikmetData.length}`;
    }
    if (dateTagEl) {
      dateTagEl.textContent = item.topic || 'Günün Öğüdü';
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
      bodyEl.innerHTML = `
        <div class="hikmet-single-view">
          <div class="hikmet-type-indicator">
            <i class="fa-solid fa-book-open"></i> GÜNÜN ÂYET-İ KERÎMESİ
          </div>
          <div class="hikmet-arabic-wrap">
            <div class="hikmet-arabic-text" dir="rtl">${item.ayet.arabic}</div>
          </div>
          <div class="hikmet-turkish-wrap">
            <div class="hikmet-turkish-text">${item.ayet.turkish}</div>
          </div>
          <div class="hikmet-meta-row">
            <div class="hikmet-source-tag">
              <i class="fa-solid fa-bookmark text-gold-400"></i> ${item.ayet.source}
            </div>
          </div>
          <div class="hikmet-reflection-box">
            <i class="fa-solid fa-lightbulb text-gold-400"></i>
            <span><strong>Tefekkür:</strong> ${item.reflection}</span>
          </div>
        </div>
      `;
    } else if (activeHikmetTab === 'hadis') {
      bodyEl.innerHTML = `
        <div class="hikmet-single-view">
          <div class="hikmet-type-indicator">
            <i class="fa-solid fa-feather-pointed"></i> GÜNÜN HADÎS-İ ŞERÎFİ
          </div>
          <div class="hikmet-arabic-wrap">
            <div class="hikmet-arabic-text" dir="rtl">${item.hadis.arabic}</div>
          </div>
          <div class="hikmet-turkish-wrap">
            <div class="hikmet-turkish-text">${item.hadis.turkish}</div>
          </div>
          <div class="hikmet-meta-row">
            <div class="hikmet-source-tag">
              <i class="fa-solid fa-bookmark text-gold-400"></i> ${item.hadis.source}
            </div>
          </div>
          <div class="hikmet-reflection-box">
            <i class="fa-solid fa-lightbulb text-gold-400"></i>
            <span><strong>Tefekkür:</strong> ${item.reflection}</span>
          </div>
        </div>
      `;
    } else {
      bodyEl.innerHTML = `
        <div class="hikmet-dual-grid">
          <div class="hikmet-mini-card">
            <div class="hikmet-type-indicator">
              <i class="fa-solid fa-book-open"></i> ÂYET-İ KERÎME
            </div>
            <div class="hikmet-arabic-text" dir="rtl">${item.ayet.arabic}</div>
            <div class="hikmet-turkish-text">${item.ayet.turkish}</div>
            <div class="hikmet-source-tag" style="margin: 0 auto;">
              <i class="fa-solid fa-bookmark text-gold-400"></i> ${item.ayet.source}
            </div>
          </div>
          <div class="hikmet-mini-card">
            <div class="hikmet-type-indicator">
              <i class="fa-solid fa-feather-pointed"></i> HADÎS-İ ŞERÎF
            </div>
            <div class="hikmet-arabic-text" dir="rtl">${item.hadis.arabic}</div>
            <div class="hikmet-turkish-text">${item.hadis.turkish}</div>
            <div class="hikmet-source-tag" style="margin: 0 auto;">
              <i class="fa-solid fa-bookmark text-gold-400"></i> ${item.hadis.source}
            </div>
          </div>
        </div>
      `;
    }
  }

  function switchHikmetTab(tab) {
    activeHikmetTab = tab;
    renderHikmet();
    resetHikmetProgress();
  }

  function nextHikmet() {
    if (!hikmetData || hikmetData.length === 0) return;
    activeHikmetIndex = (activeHikmetIndex + 1) % hikmetData.length;
    renderHikmet();
    resetHikmetProgress();
  }

  function prevHikmet() {
    if (!hikmetData || hikmetData.length === 0) return;
    activeHikmetIndex = (activeHikmetIndex - 1 + hikmetData.length) % hikmetData.length;
    renderHikmet();
    resetHikmetProgress();
  }

  function randomHikmet() {
    if (!hikmetData || hikmetData.length <= 1) return;
    let nextIdx = activeHikmetIndex;
    while (nextIdx === activeHikmetIndex) {
      nextIdx = Math.floor(Math.random() * hikmetData.length);
    }
    activeHikmetIndex = nextIdx;
    renderHikmet();
    resetHikmetProgress();
  }

  function copyHikmetText() {
    if (!hikmetData || hikmetData.length === 0) return;
    const item = hikmetData[activeHikmetIndex];
    if (!item) return;

    let text = '';
    if (activeHikmetTab === 'ayet') {
      text = `📖 Âyet-i Kerîme:\n${item.ayet.arabic}\n\n"${item.ayet.turkish}"\n(${item.ayet.source})\n\n💡 Tefekkür: ${item.reflection}\n— Yeşilpelit Öğrenci Yurdu`;
    } else if (activeHikmetTab === 'hadis') {
      text = `🕊️ Hadîs-i Şerîf:\n${item.hadis.arabic}\n\n"${item.hadis.turkish}"\n(${item.hadis.source})\n\n💡 Tefekkür: ${item.reflection}\n— Yeşilpelit Öğrenci Yurdu`;
    } else {
      text = `📖 Âyet-i Kerîme: "${item.ayet.turkish}" (${item.ayet.source})\n\n🕊️ Hadîs-i Şerîf: "${item.hadis.turkish}" (${item.hadis.source})\n\n💡 Tefekkür: ${item.reflection}\n— Yeşilpelit Öğrenci Yurdu`;
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
      if (progressEl) progressEl.style.width = `${Math.min(hikmetProgressPercent, 100)}%`;
      if (hikmetProgressPercent >= 100) {
        hikmetProgressPercent = 0;
        if (activeHikmetTab === 'ayet') {
          activeHikmetTab = 'hadis';
        } else if (activeHikmetTab === 'hadis') {
          activeHikmetTab = 'ayet';
          if (hikmetData && hikmetData.length > 0) {
            activeHikmetIndex = (activeHikmetIndex + 1) % hikmetData.length;
          }
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

  async function loadDataIfStandalone() {
    if (!programData) {
      try {
        const res = await fetch('assets/data/program.json');
        if (res.ok) programData = await res.json();
      } catch (e) {}
    }

    if (!hikmetData || hikmetData.length === 0) {
      try {
        const res = await fetch('assets/data/hikmet.json');
        if (res.ok) hikmetData = await res.json();
      } catch (e) {}
    }
  }

  async function init() {
    await loadDataIfStandalone();

    const todayType = getTodayScheduleType();
    const badgeHaftaici = document.getElementById('todayBadgeHaftaici');
    const badgeHaftasonu = document.getElementById('todayBadgeHaftasonu');
    if (todayType === 'haftaici') {
      if (badgeHaftaici) badgeHaftaici.style.display = 'inline-block';
    } else {
      if (badgeHaftasonu) badgeHaftasonu.style.display = 'inline-block';
    }

    selectProgram(todayType);

    updateLiveClock();
    setInterval(updateLiveClock, 1000);
    setupLightbox();
    setupKioskMode();
    setupThemeToggle();
    setupPrintAction();
    initHikmetSection();

    // Namaz vakti güncellendiğinde akışı tazele
    if (typeof PRAYER_MODULE !== 'undefined') {
      PRAYER_MODULE.onUpdate(() => {
        updateCurrentActivity();
      });
    }
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
