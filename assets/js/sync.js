/**
 * YEŞİLPELİT ÖĞRENCİ YURDU — CANLI SENKRONİZASYON MODÜLÜ
 * Bağlı TV ve ekranların dosya güncellemelerinde otomatik olarak tazelenmesini sağlar.
 * 1. SSE (/api/live-sync) üzerinden anlık sinyal dinler.
 * 2. Bağlantı kesilirse veya GitHub Pages ortamında ise sürüm polling (/api/version veya version.json) yapar.
 */

const SYNC_MODULE = (() => {
  let currentVersion = null;
  let isReloading = false;
  let pollInterval = null;

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
