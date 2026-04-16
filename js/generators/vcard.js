/* Generator: V-card (contato) */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.vcard = {
    title: 'V-card',
    render(container) {
      container.innerHTML = `
        <div class="form-row">
          <label>Nome
            <input type="text" id="gen-vcard-firstname" placeholder="João" required />
          </label>
          <label>Sobrenome
            <input type="text" id="gen-vcard-lastname" placeholder="Silva" />
          </label>
        </div>
        <div class="form-row">
          <label>Empresa
            <input type="text" id="gen-vcard-org" placeholder="Empresa LTDA" />
          </label>
          <label>Cargo
            <input type="text" id="gen-vcard-title" placeholder="Gerente" />
          </label>
        </div>
        <div class="form-row">
          <label>Telefone
            <input type="tel" id="gen-vcard-phone" placeholder="+55 11 99999-9999" />
          </label>
          <label>E-mail
            <input type="email" id="gen-vcard-email" placeholder="email@exemplo.com" />
          </label>
        </div>
        <label>Site
          <input type="url" id="gen-vcard-url" placeholder="https://seusite.com" />
        </label>
        <label>Endereço
          <input type="text" id="gen-vcard-address" placeholder="Rua Exemplo, 123 - Cidade/UF" />
        </label>
      `;
    },
    buildPayload() {
      const first = document.getElementById('gen-vcard-firstname').value.trim();
      const last = document.getElementById('gen-vcard-lastname').value.trim();
      const org = document.getElementById('gen-vcard-org').value.trim();
      const jobTitle = document.getElementById('gen-vcard-title').value.trim();
      const phone = document.getElementById('gen-vcard-phone').value.trim();
      const email = document.getElementById('gen-vcard-email').value.trim();
      const url = document.getElementById('gen-vcard-url').value.trim();
      const addr = document.getElementById('gen-vcard-address').value.trim();
      if (!first && !last) throw new Error('Informe ao menos o nome.');

      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${last};${first};;;`,
        `FN:${first} ${last}`.trim(),
      ];
      if (org) lines.push(`ORG:${org}`);
      if (jobTitle) lines.push(`TITLE:${jobTitle}`);
      if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (url) lines.push(`URL:${url}`);
      if (addr) lines.push(`ADR:;;${addr};;;;`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }
  };
})();
