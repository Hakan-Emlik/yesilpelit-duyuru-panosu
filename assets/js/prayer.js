/**
 * YEŞİLPELİT ÖĞRENCİ YURDU - SAMSUN ATAKUM NAMAZ VAKİTLERİ VE FAZİLET TAKVİMİ MODÜLÜ
 * Kaynak: https://namaz-vakitleri.fazilettakvimi.com/samsun-atakum/2025
 *
 * Bu modül:
 * 1. TR_TIME üzerinden Europe/Istanbul saatini esas alır.
 * 2. Gömülü veya harici arşiv verisini (assets/data/fazilet_atakum.json) ve canlı API'yi destekler.
 * 3. Günün namaz vakitlerini ve Hicrî tarihini ekrana basar.
 * 4. Geri sayımı ve anlık aktif vakti yönetir.
 * 5. Namaz vakitleri güncellendiğinde dinleyicileri (örn. app.js akşam namazı akışı) bilgilendirir.
 */

const PRAYER_MODULE = (() => {
  // Varsayılan / Yedek Samsun Atakum temkinli vakitleri
  let prayerTimes = {
    name: 'Samsun Atakum',
    fajr: '05:08',
    sunrise: '06:48',
    dhuhr: '12:29',
    asr: '15:25',
    maghrib: '17:50',
    isha: '19:19'
  };

  let tomorrowPrayerTimes = null;
  let currentHijriDate = '';
  let dataStatus = 'loading'; // 'live', 'archive', 'stale', 'fallback'
  const listeners = [];

  function onUpdate(fn) {
    if (typeof fn === 'function') listeners.push(fn);
  }

  function notifyListeners() {
    listeners.forEach(fn => {
      try { fn(prayerTimes, tomorrowPrayerTimes); } catch (e) { console.error(e); }
    });
  }

  /**
   * Fazilet verisini uygular.
   * Hem yeni arşiv formatını (gunler: { 'YYYY-MM-DD': { imsak, ... } })
   * hem de doğrudan API ham formatını (vakitler: [...]) destekler.
   */
  function applyFaziletData(data, sourceLabel) {
    if (!data) return false;

    const todayStr = (typeof TR_TIME !== 'undefined') ? TR_TIME.now().dateStr : new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());

    const bolge = (data.bolge_adi || data.bolge) ? 'Samsun Atakum' : 'Samsun Atakum';

    // 1. Yeni Arşiv Biçimi (gunler objesi)
    if (data.gunler && typeof data.gunler === 'object') {
      const todayRecord = data.gunler[todayStr];
      const tomorrowStr = (typeof TR_TIME !== 'undefined') ? TR_TIME.addDays(todayStr, 1) : todayStr;
      const tomorrowRecord = data.gunler[tomorrowStr];

      if (tomorrowRecord) {
        tomorrowPrayerTimes = {
          fajr: tomorrowRecord.imsak,
          sunrise: tomorrowRecord.gunes,
          dhuhr: tomorrowRecord.ogle,
          asr: tomorrowRecord.ikindi,
          maghrib: tomorrowRecord.aksam,
          isha: tomorrowRecord.yatsi
        };
      }

      if (todayRecord) {
        prayerTimes = {
          name: bolge,
          fajr: todayRecord.imsak || prayerTimes.fajr,
          sunrise: todayRecord.gunes || prayerTimes.sunrise,
          dhuhr: todayRecord.ogle || prayerTimes.dhuhr,
          asr: todayRecord.ikindi || prayerTimes.asr,
          maghrib: todayRecord.aksam || prayerTimes.maghrib,
          isha: todayRecord.yatsi || prayerTimes.isha
        };
        currentHijriDate = todayRecord.hicri || '';
        dataStatus = sourceLabel === 'live' ? 'live' : 'archive';
        updateUI(true);
        saveToCache(todayStr, prayerTimes, currentHijriDate);
        notifyListeners();
        return true;
      } else {
        // Bugün arşivde yoksa en yakın günü bul
        const availableDates = Object.keys(data.gunler).sort();
        if (availableDates.length > 0) {
          const fallbackDate = availableDates[availableDates.length - 1];
          const rec = data.gunler[fallbackDate];
          prayerTimes = {
            name: bolge,
            fajr: rec.imsak || prayerTimes.fajr,
            sunrise: rec.gunes || prayerTimes.sunrise,
            dhuhr: rec.ogle || prayerTimes.dhuhr,
            asr: rec.ikindi || prayerTimes.asr,
            maghrib: rec.aksam || prayerTimes.maghrib,
            isha: rec.yatsi || prayerTimes.isha
          };
          currentHijriDate = rec.hicri || '';
          dataStatus = 'stale';
          updateUI(false, `Yaklaşık (${fallbackDate})`);
          notifyListeners();
          return true;
        }
      }
    }

    // 2. Ham Fazilet API Biçimi (vakitler dizisi)
    if (data.vakitler && Array.isArray(data.vakitler)) {
      const tz = data.bolge_saatdilimi || 'Europe/Istanbul';
      const formatTimeStr = (iso) => {
        if (!iso) return '';
        const d = new Date(iso);
        return new Intl.DateTimeFormat('tr-TR', {
          hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: tz
        }).format(d);
      };

      let dayRecord = data.vakitler.find(v => v.tarih === todayStr);
      let isExact = true;
      if (!dayRecord) {
        dayRecord = data.vakitler[1] || data.vakitler[0];
        isExact = false;
      }

      if (dayRecord) {
        prayerTimes = {
          name: bolge,
          fajr: formatTimeStr(dayRecord.imsak?.[0]?.tarih) || prayerTimes.fajr,
          sunrise: formatTimeStr(dayRecord.gunes?.[0]?.tarih) || prayerTimes.sunrise,
          dhuhr: formatTimeStr(dayRecord.ogle?.[0]?.tarih) || prayerTimes.dhuhr,
          asr: formatTimeStr(dayRecord.ikindi?.[0]?.tarih) || prayerTimes.asr,
          maghrib: formatTimeStr(dayRecord.aksam?.[0]?.tarih) || prayerTimes.maghrib,
          isha: formatTimeStr(dayRecord.yatsi?.[0]?.tarih) || prayerTimes.isha
        };

        if (data.takvimler && Array.isArray(data.takvimler)) {
          const takvim = data.takvimler.find(t => t.tarih === todayStr) || data.takvimler[0];
          if (takvim && takvim.hicri_tarih) {
            currentHijriDate = takvim.hicri_tarih;
          }
        }

        dataStatus = isExact ? (sourceLabel === 'live' ? 'live' : 'archive') : 'stale';
        updateUI(isExact);
        if (isExact) saveToCache(todayStr, prayerTimes, currentHijriDate);
        notifyListeners();
        return true;
      }
    }

    return false;
  }

  function saveToCache(dateStr, times, hijri) {
    try {
      localStorage.setItem('fazilet_atakum_vakitleri', JSON.stringify({
        date: dateStr,
        times,
        hijri,
        districtId: 2025,
        timestamp: Date.now()
      }));
    } catch (e) {}
  }

  function updateUI(isCurrentDay, customBadgeText) {
    const badge = document.getElementById('prayerLiveBadge');
    if (badge) {
      if (dataStatus === 'live') {
        badge.className = 'source-temkin';
        badge.innerHTML = '<i class="fa-solid fa-circle-check text-gold-400"></i> Fazilet Takvimi Samsun Atakum Canlı';
      } else if (dataStatus === 'archive' && isCurrentDay) {
        badge.className = 'source-temkin';
        badge.innerHTML = '<i class="fa-solid fa-calendar-check text-gold-400"></i> Fazilet Takvimi Samsun Atakum';
      } else {
        badge.className = 'source-temkin is-stale';
        badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${customBadgeText || 'Temkinli Yedek Vakitler'}`;
      }
    }

    if (currentHijriDate) {
      const hijriEl = document.getElementById('digitalHijri');
      if (hijriEl) {
        hijriEl.textContent = `${currentHijriDate} (Fazilet Hicrî)`;
        hijriEl.dataset.fazilet = 'true';
      }
    }

    renderPrayerCards();
  }

  async function fetchLivePrayerTimes() {
    // 1. LocalStorage kontrolü
    try {
      const rawStored = localStorage.getItem('fazilet_atakum_vakitleri');
      if (rawStored) {
        const stored = JSON.parse(rawStored);
        const todayStr = (typeof TR_TIME !== 'undefined') ? TR_TIME.now().dateStr : new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit'
        }).format(new Date());

        if (stored.date === todayStr && stored.times) {
          prayerTimes = stored.times;
          if (stored.hijri) currentHijriDate = stored.hijri;
          dataStatus = 'archive';
          updateUI(true);
        }
      }
    } catch (e) {}

    // 2. Canlı ve yerel kaynakları sırayla dene
    const endpoints = [
      { url: '/api/fazilet/atakum', type: 'live' },
      { url: '/api/prayer/atakum', type: 'live' },
      { url: 'assets/data/fazilet_atakum.json', type: 'archive' },
      { url: './assets/data/fazilet_atakum.json', type: 'archive' },
      { url: 'assets/data/samsun_vakitler.json', type: 'archive' }
    ];

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep.url, { cache: 'no-cache' });
        if (res.ok) {
          const data = await res.json();
          if (applyFaziletData(data, ep.type)) {
            return;
          }
        }
      } catch (err) {}
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
    const timeInfo = (typeof TR_TIME !== 'undefined') ? TR_TIME.now() : null;
    const nowMinutes = timeInfo ? timeInfo.minutes : (new Date().getHours() * 60 + new Date().getMinutes());
    const nowSeconds = timeInfo ? timeInfo.second : new Date().getSeconds();

    const parseM = (str) => {
      if (!str) return 0;
      const [h, m] = str.split(':').map(Number);
      return h * 60 + (m || 0);
    };

    const times = getTimesArray().map(p => ({
      ...p,
      totalMinutes: parseM(p.time)
    }));

    let currentPrayer = times[times.length - 1]; // Gece ise Yatsı
    let nextPrayer = times[0];                   // İmsak
    let diffMinutes = 0;

    if (nowMinutes < times[0].totalMinutes) {
      // Gece yarısı ile imsak arası
      currentPrayer = times[times.length - 1];
      nextPrayer = times[0];
      diffMinutes = times[0].totalMinutes - nowMinutes;
    } else if (nowMinutes >= times[times.length - 1].totalMinutes) {
      // Yatsıdan sonra gece
      currentPrayer = times[times.length - 1];
      nextPrayer = times[0];
      const tomorrowImsakM = tomorrowPrayerTimes ? parseM(tomorrowPrayerTimes.fajr) : times[0].totalMinutes;
      diffMinutes = (1440 - nowMinutes) + tomorrowImsakM;
    } else {
      // Gün içi vakitler
      for (let i = 0; i < times.length; i++) {
        if (nowMinutes >= times[i].totalMinutes) {
          currentPrayer = times[i];
          nextPrayer = (i === times.length - 1) ? times[0] : times[i + 1];
        }
      }
      diffMinutes = nextPrayer.totalMinutes - nowMinutes;
      if (diffMinutes <= 0) diffMinutes += 1440;
    }

    const remainingSecTotal = Math.max(0, diffMinutes * 60 - nowSeconds);
    const remHours = Math.floor(remainingSecTotal / 3600);
    const remMins = Math.floor((remainingSecTotal % 3600) / 60);
    const remSecs = remainingSecTotal % 60;
    const pad = (n) => String(n).padStart(2, '0');
    const countdownString = `${pad(remHours)}:${pad(remMins)}:${pad(remSecs)}`;

    return { currentPrayer, nextPrayer, countdownString };
  }

  function renderPrayerCards() {
    const grid = document.getElementById('prayerGrid');
    if (!grid) return;

    const times = getTimesArray();
    const { currentPrayer, nextPrayer, countdownString } = calculateCurrentAndNext();

    grid.innerHTML = times.map(p => {
      const isActive = p.id === currentPrayer.id;
      return `
        <div class="prayer-card ${isActive ? 'active' : ''}" id="card-${p.id}">
          <div class="prayer-card-lead">
            <div class="prayer-card-icon">
              <i class="${p.icon}"></i>
            </div>
            <div class="prayer-name">${p.name}</div>
            ${isActive ? '<span class="prayer-active-dot" title="Şu Anki Vakit"></span>' : ''}
          </div>
          <div class="prayer-time">${p.time}</div>
        </div>
      `;
    }).join('');

    const cdLabel = document.getElementById('countdownLabel');
    const cdTime = document.getElementById('countdownTime');
    if (cdLabel) cdLabel.textContent = `${nextPrayer.name} Vaktine:`;
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
    if (typeof EMBEDDED_FAZILET_DATA !== 'undefined' && EMBEDDED_FAZILET_DATA) {
      applyFaziletData(EMBEDDED_FAZILET_DATA, 'archive');
    }
    renderPrayerCards();
    fetchLivePrayerTimes();

    setInterval(() => {
      const { currentPrayer, nextPrayer, countdownString } = calculateCurrentAndNext();
      const cdLabel = document.getElementById('countdownLabel');
      const cdTime = document.getElementById('countdownTime');
      if (cdLabel) cdLabel.textContent = `${nextPrayer.name} Vaktine:`;
      if (cdTime) cdTime.textContent = countdownString;

      document.querySelectorAll('.prayer-card').forEach(card => {
        if (card.id === `card-${currentPrayer.id}`) {
          if (!card.classList.contains('active')) {
            renderPrayerCards();
          }
        }
      });
    }, 1000);
  }

  return {
    init,
    calculateCurrentAndNext,
    getPrayerTimes: () => ({ ...prayerTimes }),
    getPrayerTime: (id) => {
      const map = {
        imsak: prayerTimes.fajr,
        gunes: prayerTimes.sunrise,
        ogle: prayerTimes.dhuhr,
        ikindi: prayerTimes.asr,
        aksam: prayerTimes.maghrib,
        yatsi: prayerTimes.isha
      };
      return map[id] || null;
    },
    onUpdate
  };
})();
