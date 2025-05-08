(function(){
  // 1) Savings-badge retry (unchanged)
  let attempts = 0;
  function tryUpdateSavings() {
    const one = document.querySelector('label[for^="one-time-standard"][data-quantity="1"]');
    if (!one) {
      if (++attempts < 20) return setTimeout(tryUpdateSavings, 100);
      return console.error("Couldn’t find the one-jar label after multiple attempts.");
    }
    one.querySelector('.savings-message').textContent = "Or pay member price of $49.95";
    document
      .querySelector('label[for^="one-time-standard"][data-quantity="3"] .savings-message')
      .textContent = "Or pay member price of $134.85";
    document
      .querySelector('label[for^="one-time-standard"][data-quantity="6"] .savings-message')
      .textContent = "Or pay member price of $254.70";
    console.log("Savings messages updated.");
  }

  // 2) Blue-box patch helper
  function patchBlueBox() {
    const sel = document.querySelector('.ghm-offer-selector input[type="radio"]:checked');
    const bp  = document.querySelector('.ghm-offer-selector .logged-out-message-container .message p');
    if (!sel || !bp) return;
    const savingsText = sel.closest('label').querySelector('.savings-message').textContent;
    bp.textContent = savingsText;
  }

  // 3) Button-swap patch helper
  function patchButton() {
    document
      .querySelectorAll('.ghm-offer-selector .button-container .add-to-cart')
      .forEach(btn => {
        if (/^Add To Cart/.test(btn.textContent)) {
          btn.textContent = btn.textContent.replace(/^Add To Cart/, 'Buy Now');
        }
      });
  }

  // 4) Kick off on full load
  window.addEventListener('load', () => {
    // a) run savings retry
    tryUpdateSavings();

    // b) initial blue-box & button patches
    patchBlueBox();
    patchButton();

    // c) observe VWO re-renders of the button
    const btnContainer = document.querySelector('.ghm-offer-selector .button-container');
    if (btnContainer) {
      new MutationObserver(patchButton)
        .observe(btnContainer, { childList: true, subtree: true });
    }

    // d) observe VWO re-renders of the blue-box
    const blueContainer = document.querySelector('.ghm-offer-selector .logged-out-message-container .message');
    if (blueContainer) {
      new MutationObserver(patchBlueBox)
        .observe(blueContainer, { childList: true, subtree: true });
    }

    // e) **HARD-CODED** button+blue-box on change
    document
      .querySelectorAll('.ghm-offer-selector input[type="radio"]')
      .forEach(radio => {
        radio.addEventListener('change', function(){
          const qty = this.closest('label').getAttribute('data-quantity');
          const btn = document.querySelector('.ghm-offer-selector .button.add-to-cart');
          const bp  = document.querySelector('.ghm-offer-selector .logged-out-message-container .message p');

          // delay slightly so VWO finishes its own swap
          setTimeout(() => {
            if (qty === '1') {
              btn.textContent = 'Buy Now - $79.95';
              bp && (bp.textContent = 'Or pay member price of $49.95');
            }
            else if (qty === '3') {
              btn.textContent = 'Buy Now - $215.85';
              bp && (bp.textContent = 'Or pay member price of $134.85');
            }
            else if (qty === '6') {
              btn.textContent = 'Buy Now - $407.70';
              bp && (bp.textContent = 'Or pay member price of $254.70');
            }
          }, 50);
        });
      });
  });
})();
