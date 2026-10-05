/**
 * YEŞİLPELİT ÖĞRENCİ YURDU - DİJİTAL DUYURU PANOSU ANA UYGULAMA MANTIĞI
 */

const APP_MODULE = (() => {
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
      posterSrc: 'assets/images/haftaici-programi.jpg',
      posterAlt: 'Yeşilpelit Hafta İçi Günlük Program Afişi',
      pdfUrl: 'assets/docs/haftaici-programi.pdf',
      pdfName: 'Yesilpelit-Haftaici-Programi.pdf',
      timeline: WEEKDAY_TIMELINE,
      reminderHtml: `
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
      `
    },
    haftasonu: {
      icon: 'fa-solid fa-tree text-gold-400',
      title: 'BİR HAFTASONU DAHA NASIL GÜZEL GEÇİRİLİR?',
      subtitle: 'Manevi Sohbetler & Dahili Ders — Haftasonu Zaman Çizelgesi',
      flowTitle: 'CUMARTESİ GÜNLÜK ZAMAN ÇİZELGESİ AKIŞI',
      caption: 'Yeşilpelit Öğrenci Yurdu Resmi Haftasonu Oryantasyon ve İntibak Programıdır.',
      posterSrc: 'assets/images/haftasonu-programi.jpg',
      posterAlt: 'Yeşilpelit Haftasonu Manevi Sohbetler ve Dahili Ders Zaman Çizelgesi Afişi',
      pdfUrl: 'assets/docs/haftasonu-programi.pdf',
      pdfName: 'Yesilpelit-Haftasonu-Programi.pdf',
      timeline: SATURDAY_TIMELINE,
      reminderHtml: `
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
      `
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

    // Alt Hatırlatma Kartı
    const reminderCard = document.getElementById('programReminderCard');
    if (reminderCard) reminderCard.innerHTML = config.reminderHtml;

    // Yalnızca o anki aktif etkinliği göster ve güncelle
    updateCurrentActivity(new Date());
  }

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

    // O anki yurt programını ve kalan süreyi canlı güncelle
    updateCurrentActivity(now);
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

  // Saat metnini dakikaya çevirir ("08:00" -> 480)
  function parseTimeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const clean = timeStr.trim();
    const parts = clean.split(':').map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  }

  // O an yurtta hangi program yapılıyorsa yalnızca onu gösterir
  function updateCurrentActivity(now) {
    if (!currentSelectedProgram || !PROGRAM_CONFIG[currentSelectedProgram]) return;
    const items = PROGRAM_CONFIG[currentSelectedProgram].timeline;
    if (!items || items.length === 0) return;

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

  // ==========================================
  // GÜNÜN HİKMET KÖŞESİ (ÂYET-İ KERÎME VE HADÎS-İ ŞERÎF)
  // ==========================================
  const HIKMET_COLLECTION = [
    {
      topic: 'İlim ve İrfan',
      reflection: 'İlim tahsil etmek, kula iki cihanda da izzet ve yüksek mertebe kazandırır.',
      ayet: {
        arabic: 'يَرْفَعِ اللّٰهُ الَّذ۪ينَ اٰمَنُوا مِنْكُمْ وَالَّذ۪ينَ اُو۫تُوا الْعِلْمَ دَرَجَاتٍۜ',
        turkish: 'Allah, içinizden îmân edenlerin ve kendilerine ilim verilenlerin derecelerini yükseltir.',
        source: 'Mücâdele Sûresi, 11. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'مَنْ سَلَكَ طَرِيقاً يَلْتَمِسُ فِيهِ عِلْماً سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقاً إِلَى الْجَنَّةِ',
        turkish: 'Kim ilim tahsil etmek için bir yola çıkarsa, Allah Teâlâ ona cennetin yolunu kolaylaştırır.',
        source: 'Sahîh-i Müslim, Zikir, 39; Ebû Dâvûd, İlim, 1'
      }
    },
    {
      topic: 'Sabır ve Namaz',
      reflection: 'Karşılaşılan her zorlukta müminin sığınağı namaz, kalkanı ise sabırdır.',
      ayet: {
        arabic: 'يَٓا اَيُّهَا الَّذ۪ينَ اٰمَنُوا اسْتَع۪ينُوا بِالصَّبْرِ وَالصَّلٰوةِۜ اِنَّ اللّٰهَ مَعَ الصَّابِر۪ينَ',
        turkish: 'Ey îmân edenler! Sabır ve namaz ile Allah\'tan yardım isteyin. Muhakkak ki Allah sabredenlerle beraberdir.',
        source: 'Bakara Sûresi, 153. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'الصَّلاَةُ عِمَادُ الدِّينِ، فَمَنْ أَقَامَهَا فَقَدْ أَقَامَ الدِّينَ',
        turkish: 'Namaz dinin direğidir; kim onu dosdoğru kılarsa dinini ikame etmiş (ayakta tutmuş) olur.',
        source: 'Beyhakî, Şuabü\'l-Îmân, III, 39; Aclûnî, Keşfü\'l-Hafâ, II, 31'
      }
    },
    {
      topic: 'İhlas ve Niyet',
      reflection: 'İhlas ile yapılan küçük bir amel, riyasız niyetle dağlar gibi sevaba vesile olur.',
      ayet: {
        arabic: 'وَمَٓا اُمِرُٓوا اِلَّا لِيَعْبُdُوا اللّٰهَ مُخْلِص۪ينَ لَهُ الدّ۪ينَ حُنَفَٓاءَ',
        turkish: 'Halbuki onlara, ancak dini yalnız O\'na has kılarak, dosdoğru bir şekilde Allah\'a ibadet etmeleri emrolunmuştu.',
        source: 'Beyyine Sûresi, 5. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
        turkish: 'Ameller ancak niyetlere göredir ve herkesin niyet ettiği ne ise eline geçecek olan odur.',
        source: 'Sahîh-i Buhârî, Bed\'ü\'l-Vahy, 1; Sahîh-i Müslim, İmâre, 155'
      }
    },
    {
      topic: 'Kardeşlik ve Muhabbet',
      reflection: 'Yurt hayatının bereketi, kardeşlik hukukuna ve hürmete riayet etmekle artar.',
      ayet: {
        arabic: 'اِنَّمَا الْمُؤْمِنُونَ اِخْوَةٌ فَاَصْلِحُوا بَيْنَ اَخَوَيْكُمْ وَاتَّقُوا اللّٰهَ لَعَلَّكُمْ تُرْحَمُونَ',
        turkish: 'Müminler ancak kardeştirler. Öyleyse kardeşlerinizin arasını düzeltin ve Allah\'a karşı gelmekten sakının ki merhamete nail olasınız.',
        source: 'Hucurât Sûresi, 10. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'الْمُسْلِمُ أَخُو الْمُسْلِمِ لاَ يَظْلِمُهُ وَلاَ يُسْلِمُهُ',
        turkish: 'Müslüman Müslümanın kardeşidir; ona zulmetmez ve onu asla yalnız başına tehlikeye terk etmez.',
        source: 'Sahîh-i Buhârî, Mezâlim, 3; Sahîh-i Müslim, Birr, 58'
      }
    },
    {
      topic: 'Kur\'ân-ı Kerîm ve Tilavet',
      reflection: 'Mescidde okunan hatimler ve vazifeler, ömrün en bereketli ve nurlu dakikalarıdır.',
      ayet: {
        arabic: 'اَلَّذ۪ينَ اٰتَيْنَاهُمُ الْكِتَابَ يَتْلُونَهُ حَقَّ تِلاَوَتِه۪ۜ اُو۫لٰٓئِكَ يُؤْمِنُونَ بِه۪ۜ',
        turkish: 'Kendilerine kitap verdiğimiz kimseler, onu hakkını vererek okurlar. İşte onlar ona hakikaten îmân edenlerdir.',
        source: 'Bakara Sûresi, 121. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
        turkish: 'Sizin en hayırlınız, Kur\'ân-ı Kerîm\'i öğrenen ve onu başkalarına öğreteninizdir.',
        source: 'Sahîh-i Buhârî, Fezâilü\'l-Kur\'ân, 21; Tirmizî, Sevâb, 15'
      }
    },
    {
      topic: 'Zamanın Kıymeti',
      reflection: 'Müminin lügatinde boş vakit yoktur; bir hayrı tamamlayınca diğer hayra koşmak vardır.',
      ayet: {
        arabic: 'فَاِذَا فَرَغْتَ فَانْصَبْۙ وَاِلٰى رَبِّكَ فَارْغَبْ',
        turkish: 'Öyleyse, bir işi bitirince hemen diğerine koyul ve yalnız Rabbine yönelip O\'na rağbet et.',
        source: 'İnşirâh Sûresi, 7-8. Âyet-i Kerîmeler'
      },
      hadis: {
        arabic: 'نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالْفَرَاغُ',
        turkish: 'İki büyük nimet vardır ki, insanların çoğu bunların kıymetini bilmeyip aldanmıştır: Sağlık ve boş vakit.',
        source: 'Sahîh-i Buhârî, Rikâk, 1; Sünen-i Tirmizî, Zühd, 1'
      }
    },
    {
      topic: 'Güzel Ahlak ve Edep',
      reflection: 'İlim edeple taçlanmadıkça sahibine ağırlık olur; güzellik ancak güzel ahlaktadır.',
      ayet: {
        arabic: 'وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُۜ اِدْفَعْ بِالَّت۪ي هِيَ اَحْسَنُ',
        turkish: 'İyilikle kötülük bir olmaz. Sen kötülüğü en güzel olanla sav; bir de bakarsın ki aranızda düşmanlık bulunan kimse sımsıcak bir dost oluvermiştir.',
        source: 'Fussilet Sûresi, 34. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِساً يَوْمَ الْقِيَامَةِ أَحَاسِنَكُمْ أَخْلاَقاً',
        turkish: 'Kıyamet gününde bana en sevimli olanınız ve makamı bana en yakın bulunanınız, ahlakı en güzel olanınızdır.',
        source: 'Sünen-i Tirmizî, Birr ve Sıla, 71'
      }
    },
    {
      topic: 'Tebessüm ve İyilik',
      reflection: 'Sabah mescide veya derse girerken kardeşine bir tebessüm, gönülleri muhabbetle fetheder.',
      ayet: {
        arabic: 'وَقُولُوا لِلنَّاسِ حُسْنًا وَاَق۪يمُوا الصَّلٰوةَ',
        turkish: 'İnsanlara güzel ve tatlı söz söyleyin, namazı dosdoğru kılın.',
        source: 'Bakara Sûresi, 83. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
        turkish: 'Kardeşinin yüzüne tebessüm etmen senin için bir sadakadır.',
        source: 'Sünen-i Tirmizî, Birr ve Sıla, 36'
      }
    },
    {
      topic: 'İnsanlara Faydalı Olmak',
      reflection: 'Yurt arkadaşının dersine yardım etmek ve yükünü hafifletmek en kıymetli amellerdendir.',
      ayet: {
        arabic: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوٰىۖ وَلَا تَعَاوَنُوا عَلَى الْاِثْمِ وَالْعُدْوَانِ',
        turkish: 'İyilik ve takva (Allah\'a saygı) üzerinde yardımlaşın; günah ve düşmanlık üzerine yardımlaşmayın.',
        source: 'Mâide Sûresi, 2. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
        turkish: 'İnsanların en hayırlısı, insanlara en çok faydası ve iyiliği dokunandır.',
        source: 'Taberânî, el-Mu\'cemü\'l-Evsat, VI, 58; Beyhakî'
      }
    },
    {
      topic: 'İstikamet ve Doğruluk',
      reflection: 'En büyük keramet ve muvaffakiyet, her şartta istikamet üzere dosdoğru olabilmektir.',
      ayet: {
        arabic: 'فَاسْتَقِمْ كَمَٓا اُمِرْتَ وَمَنْ تَابَ مَعَكَ',
        turkish: 'Emrolunduğun gibi dosdoğru ol! Seninle beraber tövbe edenler de öyle olsunlar.',
        source: 'Hûd Sûresi, 112. Âyet-i Kerîme'
      },
      hadis: {
        arabic: 'قُلْ آمَنْتُ بِاللَّهِ ثُمَّ اسْتَقِمْ',
        turkish: 'De ki: Allah\'a inandım; sonra da her işinde dosdoğru ve istikamet üzere ol!',
        source: 'Sahîh-i Müslim, Îmân, 62; Sünen-i Tirmizî, Zühd, 61'
      }
    }
  ];

  let activeHikmetIndex = 0;
  let activeHikmetTab = 'ayet'; // 'ayet', 'hadis', 'dual'
  let hikmetProgressTimer = null;
  let hikmetProgressPercent = 0;
  const HIKMET_CYCLE_DURATION = 15000; // 15 saniye

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

    // Tarih ve Sayaç
    const counterEl = document.getElementById('hikmetCounter');
    const dateTagEl = document.getElementById('hikmetDateTag');
    if (counterEl) {
      counterEl.innerHTML = `<i class="fa-regular fa-compass"></i> Hikmet ${activeHikmetIndex + 1} / ${HIKMET_COLLECTION.length}`;
    }
    if (dateTagEl) {
      dateTagEl.textContent = item.topic;
    }

    // Sekme butonlarını güncelle
    const tabAyet = document.getElementById('tabAyetBtn');
    const tabHadis = document.getElementById('tabHadisBtn');
    const tabDual = document.getElementById('tabDualBtn');
    [tabAyet, tabHadis, tabDual].forEach(b => { if (b) b.classList.remove('active'); });

    if (activeHikmetTab === 'ayet' && tabAyet) tabAyet.classList.add('active');
    else if (activeHikmetTab === 'hadis' && tabHadis) tabHadis.classList.add('active');
    else if (activeHikmetTab === 'dual' && tabDual) tabDual.classList.add('active');

    // Gövde İçeriğini Render Et
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
      // Dual View (İkisi bir arada)
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
      if (progressEl) progressEl.style.width = Math.min(hikmetProgressPercent, 100) + '%';
      if (hikmetProgressPercent >= 100) {
        hikmetProgressPercent = 0;
        // Eğer dual değilse ayet ile hadis arasında geçiş yap
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

