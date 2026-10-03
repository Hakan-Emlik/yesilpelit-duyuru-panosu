/**
 * YEŞİLPELİT ÖĞRENCİ YURDU - SAMSUN NAMAZ VAKİTLERİ VE FAZİLET TAKVİMİ MODÜLÜ
 * Kaynak: https://fazilettakvimi.com/namaz-vakitleri/
 */

const PRAYER_MODULE = (() => {
  // Samsun İli Temkinli Namaz Vakitleri (Fazilet Takvimi Resmi Kaynağı)
  // Kaynak: https://namaz-vakitleri.fazilettakvimi.com/samsun/57
  let prayerTimes = {
    name: 'Samsun',
    fajr: '04:45',
    sunrise: '06:25',
    dhuhr: '12:34',
    asr: '15:50',
    maghrib: '18:22',
    isha: '19:50'
  };

  // Fazilet Takvimi API verisini parse edip kartlara uygular
  function applyFaziletData(data) {
    if (!data || !data.vakitler || !data.vakitler.length) return false;

    const tz = data.bolge_saatdilimi || 'Europe/Istanbul';

    // Bugünün tarihi (Europe/Istanbul saat diliminde YYYY-MM-DD)
    const todayStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());

    // Bugünkü vakit kaydı
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

      // Fazilet Takvimi Hicri Tarihini güncelle
      if (data.takvimler && data.takvimler.length) {
        const takvim = data.takvimler.find(t => t.tarih === todayStr) || data.takvimler[0];
        if (takvim && takvim.hicri_tarih) {
          const hijriEl = document.getElementById('digitalHijri');
          if (hijriEl) {
            hijriEl.textContent = `${takvim.hicri_tarih} (Fazilet Hicrî)`;
          }
        }
      }

      // Canlı senkronizasyon etiketini güncelle
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

  // https://namaz-vakitleri.fazilettakvimi.com/samsun/57 kaynağından vakitleri çeker
  async function fetchLivePrayerTimes() {
    // 1. Önce localStorage'da bugüne ait kayıt var mı kontrol et
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

    // 2. Canlı Fazilet Takvimi API'sinden çekmeyi dene (server.js proxy veya yerel json)
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
            console.log(`[Fazilet Takvimi] Samsun (57) vakitleri '${ep}' kaynağından başarıyla güncellendi.`);
            return;
          }
        }
      } catch (err) {
        // Sonraki endpoint'i dene
      }
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

  // Şu an hangi vakitteyiz ve sonraki vakte ne kadar var?
  function calculateCurrentAndNext() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getSeconds();

    const times = getTimesArray().map(p => {
      const [h, m] = p.time.split(':').map(Number);
      return { ...p, totalMinutes: h * 60 + m };
    });

    let currentPrayer = times[times.length - 1]; // varsayılan Yatsı (gece)
    let nextPrayer = times[0];                   // varsayılan İmsak

    for (let i = 0; i < times.length; i++) {
      if (currentMinutes >= times[i].totalMinutes) {
        currentPrayer = times[i];
        nextPrayer = (i === times.length - 1) ? times[0] : times[i + 1];
      }
    }

    // Gece yarısı geçişinde sonraki vakit farkı hesabı
    let diffMinutes = nextPrayer.totalMinutes - currentMinutes;
    if (diffMinutes <= 0) {
      diffMinutes += 24 * 60;
    }

    const remainingSecTotal = diffMinutes * 60 - currentSeconds;
    const remHours = Math.floor(remainingSecTotal / 3600);
    const remMins = Math.floor((remainingSecTotal % 3600) / 60);
    const remSecs = remainingSecTotal % 60;

    const pad = (n) => String(n).padStart(2, '0');
    const countdownString = `${pad(remHours)}:${pad(remMins)}:${pad(remSecs)}`;

    return {
      currentPrayer,
      nextPrayer,
      countdownString
    };
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

    // Geri sayım kutusunu güncelle
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
    renderPrayerCards();
    fetchLivePrayerTimes();

    // Her saniye geri sayımı ve aktif vakti güncelle
    setInterval(() => {
      const { currentPrayer, nextPrayer, countdownString } = calculateCurrentAndNext();
      const cdLabel = document.getElementById('countdownLabel');
      const cdTime = document.getElementById('countdownTime');
      if (cdLabel) cdLabel.textContent = `${nextPrayer.name} Vaktine:`;
      if (cdTime) cdTime.textContent = countdownString;

      // Aktif kart sınıfını kontrol et
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
    calculateCurrentAndNext
  };
})();

document.addEventListener('DOMContentLoaded', PRAYER_MODULE.init);
