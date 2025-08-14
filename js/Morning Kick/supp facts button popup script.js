document.addEventListener('DOMContentLoaded', () => {
  const STRAWBERRY_ID = 'a1H3w00000hoaeAEAQ';
  const WATERMELON_ID = 'a1HVo000003a4ubMAA';

  const strawberrySel = '.popup-btn--strawberry';
  const watermelonSel = '.popup-btn--watermelon';

  function normalizeButtons() {
    [strawberrySel, watermelonSel].forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.classList.remove('is-hidden'); // neutralize any CSS hiding
      el.removeAttribute('hidden');
      el.style.display = '';            // reset to CSS default
      el.setAttribute('aria-hidden', 'false');
    });
  }

  function showOnly(selToShow) {
    const showEl = document.querySelector(selToShow);
    const hideSel = selToShow === strawberrySel ? watermelonSel : strawberrySel;
    const hideEl = document.querySelector(hideSel);

    if (showEl) {
      showEl.style.display = ''; // visible
      showEl.removeAttribute('hidden');
      showEl.setAttribute('aria-hidden', 'false');
      showEl.classList.remove('is-hidden');
    }

    if (hideEl) {
      hideEl.style.display = 'none'; // hidden
      hideEl.setAttribute('hidden', '');
      hideEl.setAttribute('aria-hidden', 'true');
      hideEl.classList.remove('is-hidden'); // keep class neutral
    }
  }

  function applyButtons(variantId) {
    if (variantId === WATERMELON_ID) showOnly(watermelonSel);
    else showOnly(strawberrySel);
  }

  normalizeButtons();

  const pre = document.querySelector('input[name="variant-option"]:checked');
  applyButtons(pre ? pre.value : STRAWBERRY_ID);

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.name === 'variant-option' && el.type === 'radio' && el.checked) {
      applyButtons(el.value);
    }
  });
});