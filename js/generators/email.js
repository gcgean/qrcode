/* Generator: E-mail */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.email = {
    title: 'E-mail',
    render(container) {
      container.innerHTML = `
        <label>Destinatário
          <input type="email" id="gen-email-to" placeholder="contato@exemplo.com" required />
        </label>
        <label>Assunto
          <input type="text" id="gen-email-subject" placeholder="Assunto do e-mail" />
        </label>
        <label>Mensagem
          <textarea id="gen-email-body" placeholder="Corpo do e-mail..."></textarea>
        </label>
      `;
    },
    buildPayload() {
      const to = document.getElementById('gen-email-to').value.trim();
      const subject = document.getElementById('gen-email-subject').value.trim();
      const body = document.getElementById('gen-email-body').value.trim();
      if (!to) throw new Error('Informe o e-mail do destinatário.');
      const params = [];
      if (subject) params.push('subject=' + encodeURIComponent(subject));
      if (body) params.push('body=' + encodeURIComponent(body));
      return `mailto:${to}${params.length ? '?' + params.join('&') : ''}`;
    }
  };
})();
