/* =========================================================
   Banner LGPD + carregamento AdSense
   ========================================================= */

(function () {
  const STORAGE_KEY = 'qrgratis_consent';
  const banner = document.getElementById('lgpdBanner');
  const accept = document.getElementById('lgpdAccept');
  const reject = document.getElementById('lgpdReject');
  const stickyMobile = document.querySelector('.ad-sticky-mobile');
  const stickyClose = document.getElementById('adStickyClose');

  const existing = localStorage.getItem(STORAGE_KEY);

  function loadAds() {
    // Inicializa blocos AdSense já presentes
    if (window.adsbygoogle) {
      document.querySelectorAll('ins.adsbygoogle').forEach(() => {
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
      });
    } else {
      // retry após o script carregar
      const check = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(check);
          document.querySelectorAll('ins.adsbygoogle').forEach(() => {
            try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
          });
        }
      }, 250);
      setTimeout(() => clearInterval(check), 10000);
    }
  }

  function hideBanner() { banner.hidden = true; }
  function showBanner() { banner.hidden = false; }

  if (existing === 'accepted') {
    loadAds();
  } else if (existing === 'rejected') {
    // Não carrega AdSense. Remove o script se estiver pendente.
    const s = document.getElementById('adsense-script');
    if (s) s.remove();
  } else {
    showBanner();
  }

  if (accept) accept.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    hideBanner();
    loadAds();
  });
  if (reject) reject.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    hideBanner();
    const s = document.getElementById('adsense-script');
    if (s) s.remove();
  });

  // Sticky mobile close
  if (stickyClose && stickyMobile) {
    stickyClose.addEventListener('click', () => {
      stickyMobile.style.display = 'none';
    });
  }
})();
