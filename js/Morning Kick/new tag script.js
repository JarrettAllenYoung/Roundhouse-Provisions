document.addEventListener('DOMContentLoaded', () => {
  const STRAWBERRY_ID = 'a1H3w00000hoaeAEAQ';
  const WATERMELON_ID = 'a1HVo000003a4ubMAA';

  function setNewImageTagVisibility(show) {
    document.querySelectorAll('.new-image-tag').forEach(img => {
      if (show) {
        img.style.display = 'block';
        img.removeAttribute('hidden');
        img.setAttribute('aria-hidden', 'false');
      } else {
        img.style.display = 'none';
        img.setAttribute('hidden', '');
        img.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Init to preselected flavor (Strawberry by default = hidden)
  const pre = document.querySelector('input[name="variant-option"]:checked');
  setNewImageTagVisibility(pre && pre.value === WATERMELON_ID);

  // Update on flavor change
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.name === 'variant-option' && el.type === 'radio' && el.checked) {
      setNewImageTagVisibility(el.value === WATERMELON_ID);
    }
  });
});