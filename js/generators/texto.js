/* Generator: Texto livre */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.texto = {
    title: 'Texto',
    render(container) {
      container.innerHTML = `
        <label>Mensagem
          <textarea id="gen-texto" placeholder="Escreva seu texto aqui..." required></textarea>
        </label>
        <p class="form-help">Pode ser qualquer texto — o leitor mostrará como texto simples.</p>
      `;
    },
    buildPayload() {
      const v = document.getElementById('gen-texto').value.trim();
      if (!v) throw new Error('Digite algum texto.');
      return v;
    }
  };
})();
