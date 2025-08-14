document.addEventListener('DOMContentLoaded', () => {
  const STRAWBERRY_ID = 'a1H3w00000hoaeAEAQ';
  const WATERMELON_ID = 'a1HVo000003a4ubMAA';

  const targetImg = document.querySelector('.elementor-widget-container img.wp-image-3139');
  if (!targetImg) return;

  const HERO_IMG = {
    [STRAWBERRY_ID]: {
      alt: 'Morning Kick — Strawberry Lemonade',
      src: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2024/05/MorningKick-mock-1-copy-827x1024.webp',
      srcset: [
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2024/05/MorningKick-mock-1-copy-242x300.webp 242w',
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2024/05/MorningKick-mock-1-copy-600x743.webp 600w',
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2024/05/MorningKick-mock-1-copy-768x951.webp 768w',
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2024/05/MorningKick-mock-1-copy-827x1024.webp 827w',
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2024/05/MorningKick-mock-1-copy.webp 1211w'
      ]
    },
    [WATERMELON_ID]: {
      alt: 'Morning Kick — Watermelon Mint',
      src: 'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/MK-Watermelon-1.webp',
      srcset: [
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/MK-Watermelon-1.webp 242w',
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/MK-Watermelon-1.webp 600w',
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/MK-Watermelon-1.webp 768w',
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/MK-Watermelon-1.webp 827w',
        'https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/08/MK-Watermelon-1.webp 1211w'
      ]
    }
  };

  function applyHero(variantId) {
    const cfg = HERO_IMG[variantId];
    if (!cfg) return;

    // Toggle padding class only for Watermelon
    if (variantId === WATERMELON_ID) {
      targetImg.classList.add('is-watermelon');
    } else {
      targetImg.classList.remove('is-watermelon');
    }

    // Update srcset first, then src
    targetImg.setAttribute('srcset', cfg.srcset.join(', '));
    targetImg.setAttribute('src', cfg.src);
    targetImg.setAttribute('sizes', '(max-width: 800px) 100vw, 800px');
    targetImg.setAttribute('alt', cfg.alt);
    targetImg.setAttribute('data-uw-rm-alt', cfg.alt);
    targetImg.setAttribute('data-uw-rm-alt-original', cfg.alt);
  }

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.name === 'variant-option' && el.type === 'radio' && el.checked) {
      applyHero(el.value);
    }
  });

  const pre = document.querySelector('input[name="variant-option"]:checked');
  if (pre) applyHero(pre.value);
});