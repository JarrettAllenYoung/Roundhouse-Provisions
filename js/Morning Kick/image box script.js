document.addEventListener('DOMContentLoaded', () => {
  const STRAWBERRY_ID = 'a1H3w00000hoaeAEAQ';
  const WATERMELON_ID = 'a1HVo000003a4ubMAA';

  // Grab the single image box
  const box = document.querySelector('.flavor-image-box');
  if (!box) return;

  const img   = box.querySelector('img');
  const title = box.querySelector('.elementor-image-box-title');

  // Map flavor -> image URL + title text
  const FLAVOR_BOX = {
    [STRAWBERRY_ID]: {
      img: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2024/05/delicious-icon-copy.svg',
      title: 'Delicious Strawberry Lemonade',
      alt: 'delicious icon — Strawberry Lemonade'
    },
    [WATERMELON_ID]: {
      img: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/delicious-icon-copy.webp',
      title: 'Delicious Watermelon Mint',
      alt: 'delicious icon — Watermelon Mint'
    }
  };

  function applyFlavorBox(variantId) {
    const cfg = FLAVOR_BOX[variantId];
    if (!cfg || !img || !title) return;
    img.src = cfg.img;
    img.alt = cfg.alt;
    // keep UserWay / accessibility attrs in sync if present
    img.setAttribute('data-uw-rm-alt', cfg.alt);
    img.setAttribute('data-uw-rm-alt-original', cfg.alt);
    title.textContent = cfg.title;
  }

  // Change on flavor select
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.name === 'variant-option' && el.type === 'radio' && el.checked) {
      applyFlavorBox(el.value);
    }
  });

  // Init to preselected (Strawberry auto-selected on load)
  const pre = document.querySelector('input[name="variant-option"]:checked');
  if (pre) applyFlavorBox(pre.value);
});