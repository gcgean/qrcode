/* Generator: Código 2D (dados brutos) — gera QR com qualquer string */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.codigo2d = {
    title: 'Código 2D',
    render(container) {
      container.innerHTML = `
        <label>Dados do código 2D
          <textarea id="gen-2d-data" placeholder="Cole ou digite o conteúdo bruto que deseja codificar..." required></textarea>
        </label>
        <p class="form-help">Modo livre: use este tipo para payloads específicos, como códigos PIX, GS1, URIs customizadas, etc.</p>
      `;
    },
    buildPayload() {
      const v = document.getElementById('gen-2d-data').value;
      if (!v) throw new Error('Informe os dados.');
      return v;
    }
  };
})();
