/* =========================================================
   Customização — Moldura
   ========================================================= */

window.QRCustomization = (function () {

  const frames = [
    { id: 'none', label: 'Sem moldura' },
    { id: 'scan-bottom', label: 'SCAN ME' },
    { id: 'scan-top', label: 'ESCANEIE' },
    { id: 'rounded', label: 'Bordas arredondadas' },
    { id: 'circle', label: 'Círculo' },
    { id: 'phone', label: 'Celular' },
    { id: 'tag', label: 'Etiqueta' },
    { id: 'double', label: 'Moldura dupla' },
    { id: 'arrow', label: 'Com seta' },
  ];

  function renderFrames() {
    const list = document.getElementById('frameList');
    if (!list) return;
    list.innerHTML = '';
    frames.forEach((f, idx) => {
      const div = document.createElement('div');
      div.className = 'frame-item' + (idx === 0 ? ' is-active' : '');
      div.dataset.frame = f.id;
      div.title = f.label;
      div.innerHTML = getFramePreviewSVG(f.id);
      div.addEventListener('click', () => {
        list.querySelectorAll('.frame-item').forEach(i => i.classList.remove('is-active'));
        div.classList.add('is-active');
        window.QRState.frame = f.id;
        if (window.QRState.payload) {
          document.getElementById('generateBtn').click();
        }
      });
      list.appendChild(div);
    });
  }

  function getFramePreviewSVG(id) {
    const qrBox = '<rect x="20" y="20" width="60" height="60" fill="#000" opacity="0.12"/>';
    switch (id) {
      case 'none':
        return `<svg viewBox="0 0 100 100">${qrBox}<text x="50" y="95" text-anchor="middle" font-size="8" fill="#94a3b8">sem</text></svg>`;
      case 'scan-bottom':
        return `<svg viewBox="0 0 100 100"><rect x="12" y="12" width="76" height="76" fill="none" stroke="#0d9488" stroke-width="3" rx="4"/>${qrBox}<rect x="12" y="76" width="76" height="14" fill="#0d9488"/><text x="50" y="86" text-anchor="middle" font-size="7" fill="#fff" font-weight="700">SCAN ME</text></svg>`;
      case 'scan-top':
        return `<svg viewBox="0 0 100 100"><rect x="12" y="12" width="76" height="76" fill="none" stroke="#0d9488" stroke-width="3" rx="4"/>${qrBox}<rect x="12" y="10" width="76" height="14" fill="#0d9488"/><text x="50" y="20" text-anchor="middle" font-size="7" fill="#fff" font-weight="700">ESCANEIE</text></svg>`;
      case 'rounded':
        return `<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill="none" stroke="#0d9488" stroke-width="3" rx="14"/>${qrBox}</svg>`;
      case 'circle':
        return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#0d9488" stroke-width="3"/>${qrBox}</svg>`;
      case 'phone':
        return `<svg viewBox="0 0 100 100"><rect x="25" y="6" width="50" height="88" fill="none" stroke="#0d9488" stroke-width="3" rx="8"/><rect x="40" y="40" width="20" height="20" fill="#000" opacity="0.12"/></svg>`;
      case 'tag':
        return `<svg viewBox="0 0 100 100"><path d="M10 20 L10 80 L50 92 L90 80 L90 20 L50 8 Z" fill="none" stroke="#0d9488" stroke-width="3"/>${qrBox}</svg>`;
      case 'double':
        return `<svg viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" fill="none" stroke="#0d9488" stroke-width="2"/><rect x="14" y="14" width="72" height="72" fill="none" stroke="#0d9488" stroke-width="2"/>${qrBox}</svg>`;
      case 'arrow':
        return `<svg viewBox="0 0 100 100"><rect x="14" y="14" width="72" height="72" fill="none" stroke="#0d9488" stroke-width="3" rx="4"/>${qrBox}<path d="M50 92 L42 80 L58 80 Z" fill="#0d9488"/></svg>`;
      default:
        return `<svg viewBox="0 0 100 100">${qrBox}</svg>`;
    }
  }

  // Aplica a moldura ao canvas do QR. Retorna um elemento (canvas ou div com canvas dentro)
  function applyFrame(canvas, frameId) {
    if (!frameId || frameId === 'none') return canvas;

    // Para simplificar (e manter download PNG), vamos desenhar em canvas maior
    const pad = 40;       // padding ao redor do QR
    const bottomBar = (frameId === 'scan-bottom') ? 60 : 0;
    const topBar = (frameId === 'scan-top') ? 60 : 0;
    const arrowH = (frameId === 'arrow') ? 40 : 0;
    const size = canvas.width;

    const outW = size + pad * 2;
    const outH = size + pad * 2 + bottomBar + topBar + arrowH;

    const out = document.createElement('canvas');
    out.width = outW;
    out.height = outH;
    const ctx = out.getContext('2d');

    // Fundo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, outW, outH);

    // Moldura
    const stroke = '#0d9488';
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 10;

    const frameX = 5;
    const frameY = topBar + 5;
    const frameW = outW - 10;
    const frameH = size + pad * 2 + (frameId === 'scan-bottom' ? bottomBar : 0) - 10;

    if (frameId === 'rounded') {
      roundRect(ctx, frameX, frameY, frameW, frameH, 40);
      ctx.stroke();
    } else if (frameId === 'circle') {
      const cx = outW / 2, cy = topBar + (size + pad * 2) / 2;
      const r = Math.min(outW, size + pad * 2) / 2 - 10;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    } else if (frameId === 'double') {
      ctx.strokeRect(frameX, frameY, frameW, frameH);
      ctx.strokeRect(frameX + 14, frameY + 14, frameW - 28, frameH - 28);
    } else if (frameId === 'tag') {
      ctx.beginPath();
      const mid = outW / 2;
      ctx.moveTo(frameX + 40, frameY);
      ctx.lineTo(frameW + frameX - 40, frameY);
      ctx.lineTo(frameW + frameX, frameY + 40);
      ctx.lineTo(frameW + frameX, frameY + frameH - 40);
      ctx.lineTo(frameW + frameX - 40, frameY + frameH);
      ctx.lineTo(frameX + 40, frameY + frameH);
      ctx.lineTo(frameX, frameY + frameH - 40);
      ctx.lineTo(frameX, frameY + 40);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.strokeRect(frameX, frameY, frameW, frameH);
    }

    // Barra inferior SCAN ME
    if (frameId === 'scan-bottom') {
      ctx.fillStyle = stroke;
      ctx.fillRect(frameX, frameY + frameH - bottomBar, frameW, bottomBar);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 30px -apple-system,Segoe UI,sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCAN ME', outW / 2, frameY + frameH - bottomBar / 2);
    }
    // Barra superior ESCANEIE
    if (frameId === 'scan-top') {
      ctx.fillStyle = stroke;
      ctx.fillRect(frameX, frameY, frameW, topBar);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 26px -apple-system,Segoe UI,sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ESCANEIE-ME', outW / 2, frameY + topBar / 2);
    }
    // Seta apontando para baixo
    if (frameId === 'arrow') {
      ctx.fillStyle = stroke;
      ctx.beginPath();
      ctx.moveTo(outW / 2 - 24, frameY + frameH);
      ctx.lineTo(outW / 2 + 24, frameY + frameH);
      ctx.lineTo(outW / 2, frameY + frameH + arrowH - 4);
      ctx.closePath();
      ctx.fill();
    }

    // Desenha QR por cima
    const qrX = (outW - size) / 2;
    const qrY = topBar + pad;
    ctx.drawImage(canvas, qrX, qrY);

    // Phone shape (desenhado por cima)
    if (frameId === 'phone') {
      // Redesenha com moldura de celular
      const nc = document.createElement('canvas');
      nc.width = outW + 40; nc.height = outH + 60;
      const nctx = nc.getContext('2d');
      nctx.fillStyle = '#fff'; nctx.fillRect(0, 0, nc.width, nc.height);
      nctx.strokeStyle = stroke; nctx.lineWidth = 10;
      roundRect(nctx, 10, 10, nc.width - 20, nc.height - 20, 40);
      nctx.stroke();
      // speaker
      nctx.fillStyle = stroke;
      nctx.fillRect(nc.width / 2 - 30, 30, 60, 6);
      nctx.drawImage(out, 20, 40);
      return nc;
    }

    return out;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  return { renderFrames, applyFrame };
})();
