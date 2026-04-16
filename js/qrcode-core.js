/* =========================================================
   QRCore — gera canvas/SVG usando a lib qrcode@1.5.3
   e aplica customização de forma dos pontos e logo.
   ========================================================= */

window.QRCore = (function () {

  function generate(text, opts) {
    return new Promise((resolve, reject) => {
      if (!window.QRCode) return reject(new Error('Biblioteca QRCode não carregada'));

      const size = 512;
      const margin = 2;

      // Gera canvas base
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const options = {
        errorCorrectionLevel: opts.ecLevel || 'M',
        margin,
        width: size,
        color: { dark: opts.fgColor, light: opts.bgColor },
      };

      window.QRCode.toCanvas(canvas, text, options, (err) => {
        if (err) return reject(err);

        // Aplica estilo dos pontos (redesenha a partir da matriz)
        if (opts.dotStyle && opts.dotStyle !== 'square') {
          applyDotStyle(canvas, text, opts);
        }

        // Aplica logo
        if (opts.logo) {
          applyLogo(canvas, opts.logo, opts.logoSize).then(() => resolve(canvas)).catch(reject);
        } else {
          resolve(canvas);
        }
      });
    });
  }

  function generateSVG(text, opts) {
    return new Promise((resolve, reject) => {
      if (!window.QRCode) return reject(new Error('Biblioteca QRCode não carregada'));
      window.QRCode.toString(text, {
        type: 'svg',
        errorCorrectionLevel: opts.ecLevel || 'M',
        margin: 2,
        color: { dark: opts.fgColor, light: opts.bgColor },
      }, (err, str) => {
        if (err) return reject(err);
        resolve(str);
      });
    });
  }

  // Redesenha QR com pontos arredondados ou circulares
  function applyDotStyle(canvas, text, opts) {
    try {
      const qr = window.QRCode.create(text, {
        errorCorrectionLevel: opts.ecLevel || 'M',
      });
      const modules = qr.modules;
      const size = modules.size;
      const margin = 2;

      const ctx = canvas.getContext('2d');
      const totalSize = canvas.width;
      const moduleSize = totalSize / (size + margin * 2);

      ctx.fillStyle = opts.bgColor;
      ctx.fillRect(0, 0, totalSize, totalSize);

      ctx.fillStyle = opts.fgColor;
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (!modules.get(row, col)) continue;
          const x = (col + margin) * moduleSize;
          const y = (row + margin) * moduleSize;
          drawDot(ctx, x, y, moduleSize, opts.dotStyle);
        }
      }
    } catch (err) {
      console.warn('applyDotStyle falhou, usando quadrado padrão', err);
    }
  }

  function drawDot(ctx, x, y, size, style) {
    if (style === 'dots') {
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size / 2 * 0.9, 0, Math.PI * 2);
      ctx.fill();
    } else if (style === 'rounded') {
      const r = size * 0.25;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + size - r, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + r);
      ctx.lineTo(x + size, y + size - r);
      ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
      ctx.lineTo(x + r, y + size);
      ctx.quadraticCurveTo(x, y + size, x, y + size - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, size, size);
    }
  }

  function applyLogo(canvas, logoDataUrl, logoSize) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        const sizePct = (logoSize || 22) / 100;
        const totalSize = canvas.width;
        const logoArea = totalSize * sizePct;
        const pad = logoArea * 0.15;

        // Fundo branco atrás do logo para garantir leitura
        const bgSize = logoArea + pad * 2;
        const bgX = (totalSize - bgSize) / 2;
        const bgY = (totalSize - bgSize) / 2;
        ctx.fillStyle = '#ffffff';
        roundRect(ctx, bgX, bgY, bgSize, bgSize, 12);
        ctx.fill();

        const logoX = (totalSize - logoArea) / 2;
        const logoY = (totalSize - logoArea) / 2;
        ctx.drawImage(img, logoX, logoY, logoArea, logoArea);
        resolve();
      };
      img.onerror = reject;
      img.src = logoDataUrl;
    });
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

  return { generate, generateSVG };
})();
