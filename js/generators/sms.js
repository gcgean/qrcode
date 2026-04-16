/* Generator: SMS */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.sms = {
    title: 'SMS',
    render(container) {
      container.innerHTML = `
        <div class="form-row">
          <label>Código do país
            <input type="text" id="gen-sms-code" placeholder="55" value="55" />
          </label>
          <label>Número
            <input type="tel" id="gen-sms-number" placeholder="11 99999-9999" required />
          </label>
        </div>
        <label>Mensagem
          <textarea id="gen-sms-body" placeholder="Texto do SMS..."></textarea>
        </label>
      `;
    },
    buildPayload() {
      const code = document.getElementById('gen-sms-code').value.replace(/\D/g, '');
      const number = document.getElementById('gen-sms-number').value.replace(/\D/g, '');
      const body = document.getElementById('gen-sms-body').value.trim();
      if (!number) throw new Error('Informe o número para SMS.');
      return `SMSTO:+${code}${number}:${body}`;
    }
  };
})();
