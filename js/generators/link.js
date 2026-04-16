/* Generator: Link / URL */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.link = {
    title: 'Link',
    render(container) {
      container.innerHTML = `
        <label>Insira o URL
          <input type="url" id="gen-link-url" placeholder="https://seusite.com.br" required />
        </label>
        <p class="form-help">Exemplo: https://www.exemplo.com.br/produto</p>
      `;
    },
    buildPayload() {
      const v = document.getElementById('gen-link-url').value.trim();
      if (!v) throw new Error('Informe uma URL válida.');
      // Adiciona https:// se faltar
      if (!/^https?:\/\//i.test(v)) return 'https://' + v;
      return v;
    }
  };
})();
