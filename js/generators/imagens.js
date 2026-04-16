/* Generator: Imagens (link para galeria hospedada) */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.imagens = {
    title: 'Imagens',
    render(container) {
      container.innerHTML = `
        <label>URL da galeria / imagem
          <input type="url" id="gen-img-url" placeholder="https://photos.google.com/share/..." required />
        </label>
        <p class="form-help">Use um link de Google Fotos, Imgur, Flickr, Dropbox ou seu próprio site com a imagem / galeria publicada.</p>
      `;
    },
    buildPayload() {
      const v = document.getElementById('gen-img-url').value.trim();
      if (!v) throw new Error('Informe o link da imagem ou galeria.');
      if (!/^https?:\/\//i.test(v)) return 'https://' + v;
      return v;
    }
  };
})();
