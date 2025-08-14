document.addEventListener('DOMContentLoaded', () => {
  const STRAWBERRY_ID = 'a1H3w00000hoaeAEAQ';
  const WATERMELON_ID = 'a1HVo000003a4ubMAA';

  // Attach .flavor-toggle to the wrapper .elementor-toggle (or a parent)
  const root = document.querySelector('.flavor-toggle') || document;

  const COPY = {
    [STRAWBERRY_ID]:
      'Each jar holds 30 servings of this delicious, strawberry lemonade flavored drink. Made with ingredients to help you stay healthy, alert, strong, and calm — with plenty of energy to handle whatever comes your way.',
    [WATERMELON_ID]:
      'Each jar holds 30 servings of this delicious, watermelon mint flavored drink. Made with ingredients to help you stay healthy, alert, strong, and calm — with plenty of energy to handle whatever comes your way.'
  };

  function getPara() {
    return (
      root.querySelector('.elementor-toggle [data-tab="1"].elementor-tab-content p') ||
      root.querySelector('#elementor-tab-content-5511 p')
    );
  }

  function applyFlavorText(variantId) {
    const p = getPara();
    const text = COPY[variantId];
    if (p && text) p.textContent = text; // use innerHTML if you ever need markup
  }

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.name === 'variant-option' && el.type === 'radio' && el.checked) {
      applyFlavorText(el.value);
    }
  });

  const pre = document.querySelector('input[name="variant-option"]:checked');
  if (pre) applyFlavorText(pre.value);
});