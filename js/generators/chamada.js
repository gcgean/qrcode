/* Generator: Chamada telefônica */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.chamada = {
    title: 'Chamada',
    render(container) {
      container.innerHTML = `
        <div class="form-row">
          <label>Código do país
            <input type="text" id="gen-chamada-code" placeholder="55" value="55" />
          </label>
          <label>Número de telefone
            <input type="tel" id="gen-chamada-number" placeholder="11 99999-9999" required />
          </label>
        </div>
        <p class="form-help">Ao escanear, o celular disca o número automaticamente.</p>
      `;
    },
    buildPayload() {
      const code = document.getElementById('gen-chamada-code').value.replace(/\D/g, '');
      const number = document.getElementById('gen-chamada-number').value.replace(/\D/g, '');
      if (!number) throw new Error('Informe o número de telefone.');
      return `tel:+${code}${number}`;
    }
  };
})();
