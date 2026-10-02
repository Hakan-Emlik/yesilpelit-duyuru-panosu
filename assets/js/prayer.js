/**
 * YEŞİLPELİT ÖĞRENCİ YURDU - SAMSUN NAMAZ VAKİTLERİ VE FAZİLET TAKVİMİ MODÜLÜ
 * Kaynak: https://fazilettakvimi.com/namaz-vakitleri/
 */

const PRAYER_MODULE = (() => {
  // Samsun İli Temkinli Namaz Vakitleri (Fazilet Takvimi standartları)
  let prayerTimes = {
    name: 'Samsun',
    fajr: '04:54',
    sunrise: '06:19',
    dhuhr: '12:31',
    asr: '15:53',
    maghrib: '18:32',
    isha: '19:52'
  };

  // Canlı API'den Samsun için güncel vakitleri çeker
  async function fetchLivePrayerTimes() {
    try {
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Samsun&country=Turkey&method=13`);
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
      console.log('Samsun yerel temkinli vakitleri devrede (Fazilet Takvimi).');
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
