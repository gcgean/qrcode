/* Generator: PDF (link para PDF hospedado) */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.pdf = {
    title: 'PDF',
    render(container) {
      container.innerHTML = `
        <label>URL do PDF
          <input type="url" id="gen-pdf-url" placeholder="https://seusite.com/arquivo.pdf" required />
        </label>
        <p class="form-help">Hospede o PDF em um serviço como Google Drive, Dropbox ou seu próprio site e cole o link público aqui. O QR redireciona direto para o arquivo.</p>
      `;
    },
    buildPayload() {
      const v = document.getElementById('gen-pdf-url').value.trim();
      if (!v) throw new Error('Informe o link do PDF.');
      if (!/^https?:\/\//i.test(v)) return 'https://' + v;
      return v;
    }
  };
})();
