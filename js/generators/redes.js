/* Generator: Redes Sociais */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  const networks = {
    instagram: { label: 'Instagram', base: 'https://instagram.com/' },
    facebook:  { label: 'Facebook',  base: 'https://facebook.com/' },
    twitter:   { label: 'Twitter/X', base: 'https://x.com/' },
    tiktok:    { label: 'TikTok',    base: 'https://tiktok.com/@' },
    youtube:   { label: 'YouTube',   base: 'https://youtube.com/@' },
    linkedin:  { label: 'LinkedIn',  base: 'https://linkedin.com/in/' },
    pinterest: { label: 'Pinterest', base: 'https://pinterest.com/' },
    telegram:  { label: 'Telegram',  base: 'https://t.me/' },
  };
  window.QRGenerators.redes = {
    title: 'Redes Sociais',
    render(container) {
      const opts = Object.entries(networks).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
      container.innerHTML = `
        <div class="form-row">
          <label>Rede social
            <select id="gen-redes-net">${opts}</select>
          </label>
          <label>Usuário ou link completo
            <input type="text" id="gen-redes-handle" placeholder="@seuusuario" required />
          </label>
        </div>
        <p class="form-help">Digite só o nome de usuário ou cole o URL completo.</p>
      `;
    },
    buildPayload() {
      const net = document.getElementById('gen-redes-net').value;
      let handle = document.getElementById('gen-redes-handle').value.trim();
      if (!handle) throw new Error('Informe o usuário.');
      if (/^https?:\/\//i.test(handle)) return handle;
      handle = handle.replace(/^@/, '');
      return networks[net].base + handle;
    }
  };
})();
