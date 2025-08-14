document.addEventListener('DOMContentLoaded', () => {
  // 1) Build the promo HTML
  const promoHTML = `
    <div class="july-2025-promo-outer-container">
      <p class="heading-copy">
        SUMMER SALE ☀️ SAVE 10%
      </p>
      <p class="heading-copy">
        with CODE: DELTA10
      </p>
      <p class="disclaimer-copy">Must be a Roundhouse Provisions Account holder to use coupon code. Coupon code is valid from 7/24/25-7/31/25 and cannot be combined with other offers. Applies to VIP pricing, excludes subscription pricing and bundles.</p>
    </div>`;
  // 2) Locate the element right before the Buy-Now button
  const productOptions = document.querySelector('#ghm-offer-selector .product-options');
  const buttonContainer = document.querySelector('#ghm-offer-selector .button-container');

  if (productOptions && buttonContainer) {
    // 3) Insert the promo block between them
    productOptions.insertAdjacentHTML('afterend', promoHTML);
  }
});