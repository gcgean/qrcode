/* Generator: Vídeo (link) */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.video = {
    title: 'Vídeo',
    render(container) {
      container.innerHTML = `
        <label>URL do vídeo
          <input type="url" id="gen-video-url" placeholder="https://www.youtube.com/watch?v=..." required />
        </label>
        <p class="form-help">Suporta YouTube, Vimeo, TikTok, Instagram ou qualquer link direto de vídeo.</p>
      `;
    },
    buildPayload() {
      const v = document.getElementById('gen-video-url').value.trim();
      if (!v) throw new Error('Informe o link do vídeo.');
      if (!/^https?:\/\//i.test(v)) return 'https://' + v;
      return v;
    }
  };
})();
