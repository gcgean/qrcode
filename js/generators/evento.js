/* Generator: Evento de calendário (VEVENT) */
(function () {
  window.QRGenerators = window.QRGenerators || {};
  window.QRGenerators.evento = {
    title: 'Evento',
    render(container) {
      container.innerHTML = `
        <label>Título do evento
          <input type="text" id="gen-evento-title" placeholder="Reunião de equipe" required />
        </label>
        <label>Local
          <input type="text" id="gen-evento-location" placeholder="Rua Exemplo, 123" />
        </label>
        <div class="form-row">
          <label>Início
            <input type="datetime-local" id="gen-evento-start" required />
          </label>
          <label>Fim
            <input type="datetime-local" id="gen-evento-end" required />
          </label>
        </div>
        <label>Descrição
          <textarea id="gen-evento-desc" placeholder="Descrição do evento..."></textarea>
        </label>
      `;
    },
    buildPayload() {
      const t = document.getElementById('gen-evento-title').value.trim();
      const loc = document.getElementById('gen-evento-location').value.trim();
      const start = document.getElementById('gen-evento-start').value;
      const end = document.getElementById('gen-evento-end').value;
      const desc = document.getElementById('gen-evento-desc').value.trim();
      if (!t) throw new Error('Informe o título.');
      if (!start || !end) throw new Error('Informe data/hora de início e fim.');

      function fmt(dt) {
        const d = new Date(dt);
        const pad = n => String(n).padStart(2, '0');
        return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
      }

      return [
        'BEGIN:VEVENT',
        `SUMMARY:${t}`,
        loc ? `LOCATION:${loc}` : null,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        desc ? `DESCRIPTION:${desc.replace(/\n/g, '\\n')}` : null,
        'END:VEVENT'
      ].filter(Boolean).join('\n');
    }
  };
})();
