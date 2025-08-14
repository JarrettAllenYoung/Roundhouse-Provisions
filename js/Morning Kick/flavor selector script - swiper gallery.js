document.addEventListener('DOMContentLoaded', () => {
  // Variant IDs (from your offer selector radios)
  const STRAWBERRY_ID = 'a1H3w00000hoaeAEAQ';
  const WATERMELON_ID = 'a1HVo000003a4ubMAA';

  // Slide maps: slideNumber -> image URL
  // (Only define the slides you want to override; others remain untouched)
  const SLIDE_MAP = {
    [STRAWBERRY_ID]: {
      1: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/07/slide-1.jpg',
      2: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/07/Main-Img-3.jpg'
    },
    [WATERMELON_ID]: {
      1: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/MK-Watermelon-Mint-copy-square.webp',
      2: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/mk-wm-supp-facts-dark.webp'
    }
  };

  function setSlideImage(slideIndex, url) {
    // Main gallery
    const mainImg = document.querySelector(
      `.kimo-product-gallery-main-2 .swiper-wrapper .swiper-slide:nth-child(${slideIndex}) .swiper-zoom-container img`
    );
    if (mainImg && url) {
      mainImg.src = url;
      mainImg.removeAttribute('srcset'); // in case any sizes/srcset sneaks in later
    }

    // Thumbs gallery (exists on desktop)
    const thumbImg = document.querySelector(
      `.kimo-product-gallery-nav-2 .swiper-wrapper .swiper-slide:nth-child(${slideIndex}) img`
    );
    if (thumbImg && url) {
      thumbImg.src = url;
      thumbImg.removeAttribute('srcset');
    }
  }

  function applyVariantSlides(variantId) {
    const map = SLIDE_MAP[variantId];
    if (!map) return;
    Object.entries(map).forEach(([idx, url]) => setSlideImage(Number(idx), url));
  }

  // Handle flavor changes
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.name === 'variant-option' && el.type === 'radio' && el.checked) {
      applyVariantSlides(el.value);
    }
  });

  // Initialize to whatever is preselected (Strawberry in your case)
  const pre = document.querySelector('input[name="variant-option"]:checked');
  if (pre) applyVariantSlides(pre.value);
});