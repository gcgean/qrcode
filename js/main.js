/* =========================================================
   QR Grátis — main.js
   Orquestra: seleção de tipo, render do formulário,
   customização, geração e download.
   ========================================================= */

(function () {
  const state = {
    type: 'link',
    payload: '',
    fgColor: '#000000',
    bgColor: '#ffffff',
    dotStyle: 'square',
    ecLevel: 'M',
    frame: 'none',
    logo: null,
    logoSize: 22,
    lastQRCanvas: null,
  };

  // Ano no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu toggle mobile
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('.main-nav').classList.toggle('is-open');
    });
  }

  // Type selection
  const typeButtons = document.querySelectorAll('.type-btn');
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.type = btn.dataset.type;
      renderForm();
      clearPreview();
    });
  });

  // Custom tabs
  document.querySelectorAll('.custom-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.custom-tab').forEach(t => t.classList.remove('is-active'));
      document.querySelectorAll('.custom-panel').forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      const panel = document.querySelector(`.custom-panel[data-panel="${tab.dataset.tab}"]`);
      if (panel) panel.classList.add('is-active');
    });
  });

  // Form renderer - chama o generator correspondente
  function renderForm() {
    const container = document.getElementById('formContainer');
    container.innerHTML = '';
    const gen = window.QRGenerators && window.QRGenerators[state.type];
    if (gen && typeof gen.render === 'function') {
      gen.render(container);
    } else {
      container.innerHTML = `<p class="form-help">Tipo "${state.type}" não disponível.</p>`;
    }
  }

  // Preview handling
  function clearPreview() {
    const preview = document.getElementById('qrPreview');
    preview.innerHTML = '<div class="qr-placeholder">Preencha o conteúdo e clique em Gerar QR Code</div>';
    document.getElementById('downloadBtn').disabled = true;
    document.getElementById('downloadSvgBtn').disabled = true;
    state.lastQRCanvas = null;
  }

  // --- Interstitial Ad ---
  let interstitialShown = false;

  function showInterstitialAd() {
    return new Promise((resolve) => {
      // Só mostra se AdSense tiver sido aceito e apenas uma vez por sessão
      if (interstitialShown || !window.adsbygoogle) {
        resolve();
        return;
      }
      interstitialShown = true;

      const modal    = document.getElementById('adInterstitial');
      const skipBtn  = document.getElementById('skipAdBtn');
      const countEl  = document.getElementById('skipCountdown');

      modal.hidden = false;
      document.body.style.overflow = 'hidden';

      // Tenta inicializar o slot do interstitial
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}

      let secs = 5;
      countEl.textContent = secs;

      const timer = setInterval(() => {
        secs--;
        if (secs > 0) {
          countEl.textContent = secs;
        } else {
          clearInterval(timer);
          skipBtn.textContent = 'Pular anúncio ×';
          skipBtn.classList.add('ready');
          skipBtn.disabled = false;
        }
      }, 1000);

      function closeModal() {
        clearInterval(timer);
        modal.hidden = true;
        document.body.style.overflow = '';
        resolve();
      }

      skipBtn.addEventListener('click', function handler() {
        if (!skipBtn.disabled) {
          skipBtn.removeEventListener('click', handler);
          closeModal();
        }
      });

      // Fecha automaticamente após 12s mesmo sem clicar
      setTimeout(closeModal, 12000);
    });
  }

  // Generate button
  document.getElementById('generateBtn').addEventListener('click', async () => {
    const gen = window.QRGenerators && window.QRGenerators[state.type];
    if (!gen) return;

    let payload;
    try {
      payload = gen.buildPayload();
    } catch (err) {
      alert(err.message || 'Verifique os campos.');
      return;
    }

    if (!payload) {
      alert('Preencha pelo menos um campo obrigatório.');
      return;
    }
    state.payload = payload;

    // Mostra anúncio interstitial antes de gerar
    await showInterstitialAd();

    // Lê opções de Forma
    state.fgColor = document.getElementById('fgColor').value;
    state.bgColor = document.getElementById('bgColor').value;
    state.dotStyle = document.getElementById('dotStyle').value;
    state.ecLevel = document.getElementById('ecLevel').value;

    try {
      const canvas = await window.QRCore.generate(payload, {
        fgColor: state.fgColor,
        bgColor: state.bgColor,
        dotStyle: state.dotStyle,
        ecLevel: state.ecLevel,
        logo: state.logo,
        logoSize: state.logoSize,
      });

      const preview = document.getElementById('qrPreview');
      preview.innerHTML = '';

      // Aplica moldura se selecionada
      const framed = window.QRCustomization.applyFrame(canvas, state.frame);
      preview.appendChild(framed);
      state.lastQRCanvas = framed;

      document.getElementById('downloadBtn').disabled = false;
      document.getElementById('downloadSvgBtn').disabled = false;

      // Revela e inicializa o ad de resultado (apenas na primeira geração)
      const adResult = document.getElementById('adResult');
      if (adResult && !adResult.classList.contains('is-visible')) {
        adResult.classList.add('is-visible');
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar QR Code: ' + (err.message || err));
    }
  });

  // Download
  document.getElementById('downloadBtn').addEventListener('click', () => {
    if (!state.lastQRCanvas) return;
    const canvas = state.lastQRCanvas.tagName === 'CANVAS' ? state.lastQRCanvas : canvasFromWrapper(state.lastQRCanvas);
    const link = document.createElement('a');
    link.download = `qr-${state.type}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  document.getElementById('downloadSvgBtn').addEventListener('click', async () => {
    if (!state.payload) return;
    try {
      const svg = await window.QRCore.generateSVG(state.payload, {
        fgColor: state.fgColor,
        bgColor: state.bgColor,
        ecLevel: state.ecLevel,
      });
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `qr-${state.type}-${Date.now()}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Erro ao gerar SVG: ' + (err.message || err));
    }
  });

  function canvasFromWrapper(wrapper) {
    // Se o wrapper for um div (com moldura), converte para canvas via serialização
    const inner = wrapper.querySelector('canvas');
    return inner || wrapper;
  }

  // Customization bindings
  const fg = document.getElementById('fgColor');
  const bg = document.getElementById('bgColor');
  [fg, bg, document.getElementById('dotStyle'), document.getElementById('ecLevel')].forEach(el => {
    el.addEventListener('change', () => {
      if (state.payload) document.getElementById('generateBtn').click();
    });
  });

  // Logo upload
  const logoInput = document.getElementById('logoInput');
  logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      state.logo = ev.target.result;
      if (state.payload) document.getElementById('generateBtn').click();
    };
    reader.readAsDataURL(file);
  });

  const logoSize = document.getElementById('logoSize');
  const logoSizeLabel = document.getElementById('logoSizeLabel');
  logoSize.addEventListener('input', () => {
    state.logoSize = +logoSize.value;
    logoSizeLabel.textContent = state.logoSize + '%';
    if (state.payload && state.logo) document.getElementById('generateBtn').click();
  });
  document.getElementById('removeLogo').addEventListener('click', () => {
    state.logo = null;
    logoInput.value = '';
    if (state.payload) document.getElementById('generateBtn').click();
  });

  // Frame state
  window.QRState = state;

  // Inicializa
  renderForm();
  if (window.QRCustomization && typeof window.QRCustomization.renderFrames === 'function') {
    window.QRCustomization.renderFrames();
  }
})();
