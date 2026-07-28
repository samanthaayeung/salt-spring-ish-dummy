// Cursor trail of ornament glyphs — shared by every page of the site.
// Glyphs fade in place; color-flips dark on light surfaces, light on dark
// (mix-blend-mode: difference). Skipped for reduced-motion users.
// Also swaps the cursor for a small square, same size as the glyphs.
(function () {
  // square cursor everywhere — plain white, same size as the trail glyphs
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent =
    '*, *::before, *::after { cursor: url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="11" height="11"%3E%3Crect width="11" height="11" fill="white"/%3E%3C/svg%3E\') 5 5, auto !important; }';
  document.head.appendChild(cursorStyle);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const style = document.createElement('style');
  style.textContent = [
    '.trail-glyph {',
    '  position: fixed;',
    '  z-index: 50;',
    '  font-size: 14px;',
    "  font-family: 'Geist Mono', 'Courier New', monospace;",
    '  color: #fff;',
    '  mix-blend-mode: difference;',
    '  pointer-events: none;',
    '  transform: translate(-50%, -50%);',
    '  animation: trail-fade 0.7s ease-out forwards;',
    '}',
    '@keyframes trail-fade { to { opacity: 0; } }'
  ].join('\n');
  document.head.appendChild(style);

  const glyphs = ['≈', '✻︎', '☼︎', '❀︎', '☾︎', '✶︎', '❋︎'];
  let next = 0, lastTime = 0;
  window.addEventListener('mousemove', (e) => {
    if (e.target && e.target.id === 'tripChart') return; // keep the chart area clear
    const now = performance.now();
    if (now - lastTime < 70) return; // one glyph every ~70ms, not every pixel
    lastTime = now;
    const g = document.createElement('span');
    g.className = 'trail-glyph';
    g.textContent = glyphs[next++ % glyphs.length];
    g.style.left = e.clientX + 'px';
    g.style.top = e.clientY + 'px';
    document.body.appendChild(g);
    setTimeout(() => g.remove(), 750);
  });
})();
