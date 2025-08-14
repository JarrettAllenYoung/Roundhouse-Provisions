document.addEventListener('DOMContentLoaded', () => {
  const STRAWBERRY_ID = 'a1H3w00000hoaeAEAQ';
  const WATERMELON_ID = 'a1HVo000003a4ubMAA';

  // Target the container (use either class or data-id; both included for safety)
  const container = document.querySelector('.elementor-element-74e7d14b, [data-id="74e7d14b"]');
  if (!container) return;

  // Map flavor -> background image URL
  const BG = {
    [STRAWBERRY_ID]: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2024/05/morning-kick-hero-banner-copy.webp',
    [WATERMELON_ID]: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/watermelon-mint-desktop-scaled.webp'
  };

  function applyContainerBg(variantId) {
    const url = BG[variantId];
    if (!url) return;
    // Inline style wins. Add !important to resist Elementor inline rules if needed.
    container.style.setProperty('background-image', `url("${url}")`, 'important');
  }

  // init
  const pre = document.querySelector('input[name="variant-option"]:checked');
  if (pre) applyContainerBg(pre.value);

  // on flavor change
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.name === 'variant-option' && el.type === 'radio' && el.checked) {
      applyContainerBg(el.value);
    }
  });
});