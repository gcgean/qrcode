/* Generator: WhatsApp */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.whatsapp = {
    title: 'WhatsApp',
    render(container) {
      container.innerHTML = `
        <div class="form-row">
          <label>Código do país
            <input type="text" id="gen-wa-code" placeholder="55" value="55" />
          </label>
          <label>Número
            <input type="tel" id="gen-wa-number" placeholder="11 99999-9999" required />
          </label>
        </div>
        <label>Mensagem inicial (opcional)
          <textarea id="gen-wa-message" placeholder="Olá! Gostaria de saber mais sobre..."></textarea>
        </label>
        <p class="form-help">Ao escanear, abre o WhatsApp direto na conversa.</p>
      `;
    },
    buildPayload() {
      const code = document.getElementById('gen-wa-code').value.replace(/\D/g, '');
      const number = document.getElementById('gen-wa-number').value.replace(/\D/g, '');
      const message = document.getElementById('gen-wa-message').value.trim();
      if (!number) throw new Error('Informe o número do WhatsApp.');
      let url = `https://wa.me/${code}${number}`;
      if (message) url += '?text=' + encodeURIComponent(message);
      return url;
    }
  };
})();
