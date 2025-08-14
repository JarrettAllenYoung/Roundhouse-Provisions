(() => {
  const COUPON_SEL = '.outer-coupon-desktop, .outer-coupon-mobile';

  // a11y niceties
  document.querySelectorAll(COUPON_SEL).forEach(box => {
    box.setAttribute('role', 'button');
    box.setAttribute('tabindex', '0');
  });

  async function copyFrom(box){
    const codeEl = box.querySelector('.coupon-code-desktop, .coupon-code-mobile, [data-coupon]');
    if (!codeEl) return;
    const code = (codeEl.textContent || '').trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      box.classList.add('is-copied');
      codeEl.textContent = 'COPIED!';
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }

  function block(e, doCopy){
    const box = e.target && e.target.closest(COUPON_SEL);
    if (!box) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    e.returnValue = false; // legacy
    if (doCopy) copyFrom(box);
  }

  // Run BEFORE the <a> link handlers (capture phase)
  document.addEventListener('click',   e => block(e, true),  { capture: true, passive: false });
  ['pointerdown','pointerup','mousedown','mouseup','touchstart','touchend']
    .forEach(t => document.addEventListener(t, e => block(e, false), { capture: true, passive: false }));

  // Keyboard support inside the coupon
  document.addEventListener('keydown', e => {
    const box = e.target && e.target.closest(COUPON_SEL);
    if (!box) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      copyFrom(box);
    }
  }, true);
})();