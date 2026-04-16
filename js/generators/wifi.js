/* Generator: WI-FI */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.wifi = {
    title: 'WI-FI',
    render(container) {
      container.innerHTML = `
        <label>Nome da rede (SSID)
          <input type="text" id="gen-wifi-ssid" placeholder="MinhaRede" required />
        </label>
        <div class="form-row">
          <label>Tipo de criptografia
            <select id="gen-wifi-type">
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Sem senha</option>
            </select>
          </label>
          <label>Senha
            <input type="text" id="gen-wifi-password" placeholder="Senha do Wi-Fi" />
          </label>
        </div>
        <label style="display:flex;align-items:center;gap:8px;">
          <input type="checkbox" id="gen-wifi-hidden" />
          Rede oculta
        </label>
        <p class="form-help">Ao escanear, o celular conecta automaticamente.</p>
      `;
    },
    buildPayload() {
      const ssid = document.getElementById('gen-wifi-ssid').value;
      const type = document.getElementById('gen-wifi-type').value;
      const password = document.getElementById('gen-wifi-password').value;
      const hidden = document.getElementById('gen-wifi-hidden').checked;
      if (!ssid) throw new Error('Informe o nome da rede (SSID).');
      const esc = s => (s || '').replace(/([\\;,":])/g, '\\$1');
      let p = `WIFI:T:${type};S:${esc(ssid)};`;
      if (type !== 'nopass' && password) p += `P:${esc(password)};`;
      if (hidden) p += 'H:true;';
      p += ';';
      return p;
    }
  };
})();
