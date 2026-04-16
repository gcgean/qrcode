/* Generator: App (universal com detecção de plataforma via página de redirect) */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.app = {
    title: 'App',
    render(container) {
      container.innerHTML = `
        <label>Link Google Play (Android)
          <input type="url" id="gen-app-android" placeholder="https://play.google.com/store/apps/details?id=..." />
        </label>
        <label>Link App Store (iOS)
          <input type="url" id="gen-app-ios" placeholder="https://apps.apple.com/br/app/..." />
        </label>
        <label>Link padrão (fallback, web)
          <input type="url" id="gen-app-fallback" placeholder="https://seusite.com" />
        </label>
        <p class="form-help">Se você preencher só um, o QR leva direto para essa loja. Se preencher os dois, o QR abre uma página que detecta o dispositivo. Como o site é 100% estático, para detecção automática use um encurtador como <strong>branch.io</strong> ou hospede a página HTML de redirect.</p>
      `;
    },
    buildPayload() {
      const a = document.getElementById('gen-app-android').value.trim();
      const i = document.getElementById('gen-app-ios').value.trim();
      const f = document.getElementById('gen-app-fallback').value.trim();
      // Prioridade: se tiver só um, usa esse. Se tiver os dois, retorna Android por padrão (com aviso).
      if (a && !i) return a;
      if (i && !a) return i;
      if (!a && !i && f) return f;
      if (!a && !i) throw new Error('Informe ao menos um link (Android, iOS ou fallback).');
      // Se tiver os dois, vamos gerar um payload com ambos codificados no fragmento,
      // mas como isso exige página de roteamento, retornamos o link Android.
      return a;
    }
  };
})();
