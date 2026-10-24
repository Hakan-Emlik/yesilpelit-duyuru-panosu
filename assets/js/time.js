/**
 * YEŞİLPELİT DUYURU PANOSU — İSTANBUL SAATİ YARDIMCILARI
 * Tüm saat / gün hesapları cihazın saat diliminden bağımsız olarak
 * Europe/Istanbul üzerinden yapılır (yanlış ayarlı TV / tablet koruması).
 */
const TR_TIME = (() => {
  const TZ = 'Europe/Istanbul';
  const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const partsFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    weekday: 'short', hourCycle: 'h23'
  });

  const pad = (n) => String(n).padStart(2, '0');

  /** Şu anki İstanbul saatini parçalar halinde döndürür. */
  function now() {
    const date = new Date();
    const p = {};
    partsFormatter.formatToParts(date).forEach(({ type, value }) => { p[type] = value; });
    const hour = Number(p.hour) % 24;
    const minute = Number(p.minute);
    const second = Number(p.second);
    return {
      date,
      year: Number(p.year),
      month: Number(p.month),
      day: Number(p.day),
      hour,
      minute,
      second,
      weekday: WEEKDAYS[p.weekday],
      dateStr: `${p.year}-${p.month}-${p.day}`,
      minutes: hour * 60 + minute,
      seconds: hour * 3600 + minute * 60 + second
    };
  }

  /** 'YYYY-MM-DD' tarihine gün ekler. */
  function addDays(dateStr, days) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + days));
    return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
  }

  /** İki 'YYYY-MM-DD' tarihi arasındaki gün farkı (b - a). */
  function diffDays(a, b) {
    const toUtc = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
    return Math.round((toUtc(b) - toUtc(a)) / 86400000);
  }

  /** 'HH:MM' → gün içindeki dakika. Geçersizse null. */
  function toMinutes(str) {
    if (!str) return null;
    const match = String(str).trim().match(/^(\d{1,2}):(\d{2})/);
    if (!match) return null;
    return Number(match[1]) * 60 + Number(match[2]);
  }

  /** Gün içindeki dakika → 'HH:MM'. */
  function fromMinutes(mins) {
    const m = ((mins % 1440) + 1440) % 1440;
    return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
  }

  /** Saniye → 'SS:DD:ss'. */
  function formatDuration(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  }

  return { TZ, now, addDays, diffDays, toMinutes, fromMinutes, formatDuration, pad };
})();
