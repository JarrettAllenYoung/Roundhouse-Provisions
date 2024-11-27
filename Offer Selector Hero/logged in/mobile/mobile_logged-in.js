
    (function($) {
    $(document).ready(function() {
        const isLoggedIn = $('body').hasClass('ghm-logged-in');
        const buyNowButtonMobile = document.getElementById('logged-in-buy_now_mobile');
        const finalPriceMobile = document.getElementById('logged-in-price_amount_mobile');
        const instantSavingsMobile = $('#logged-in-instant-savings-mobile');
        const regularPriceMobile = $('#logged-in-regular-price-mobile');
        const calloutBoxPriceMobile = $('#logged-in-callout-box-price-mobile');
        const productRadioOptionsMobile = document.getElementsByName('logged-in-radio_mobile');
        const url = new URL(GHM.my_account_urls.cart).origin;
        const path = new URL(GHM.my_account_urls.cart).pathname;
        const cartUrl = `${url}${path}`;

        productRadioOptionsMobile[1].checked = true;
        finalPriceMobile.innerHTML = isLoggedIn
            ? productRadioOptionsMobile[1].getAttribute('data-my-account-price')
            : productRadioOptionsMobile[1].getAttribute('data-price');
        buyNowButtonMobile.setAttribute(
            'href',
            isLoggedIn
                ? `${cartUrl}?product1=${productRadioOptionsMobile[1].getAttribute('data-my-account-variant-id')}`
                : `${cartUrl}?product1=${productRadioOptionsMobile[1].getAttribute('data-variant-id')}`
        );
        instantSavingsMobile.text(
            isLoggedIn
                ? `Instant Savings: ${productRadioOptionsMobile[1].getAttribute('data-instant-savings-my-account')}`
                : `Instant Savings: ${productRadioOptionsMobile[1].getAttribute('data-instant-savings')}`
        );
        regularPriceMobile.text(`Regular Price: ${productRadioOptionsMobile[1].getAttribute('data-regular-price')}`);
        calloutBoxPriceMobile.text(productRadioOptionsMobile[1].getAttribute('data-my-account-price'));

        $('#logged-in-callout-box-price-mobile #logged-in-login-mobile').attr('href', GHM.my_account_urls.login);
        $('#logged-in-callout-box-price-mobile #logged-in-signup-mobile').attr('href', GHM.my_account_urls.signup);

        isLoggedIn ? $('.logged-in-callout-box-mobile').hide() : $('#logged-in-callout-box-mobile').show();

        for (const radio of productRadioOptionsMobile) {
            radio.addEventListener('change', function() {
                finalPriceMobile.innerHTML = isLoggedIn
                    ? radio.getAttribute('data-my-account-price')
                    : radio.getAttribute('data-price');
                buyNowButtonMobile.setAttribute(
                    'href',
                    isLoggedIn
                        ? `${cartUrl}?product1=${radio.getAttribute('data-my-account-variant-id')}`
                        : `${cartUrl}?product1=${radio.getAttribute('data-variant-id')}`
                );
                instantSavingsMobile.text(
                    isLoggedIn
                        ? `Instant Savings: ${radio.getAttribute('data-instant-savings-my-account')}`
                        : `Instant Savings: ${radio.getAttribute('data-instant-savings')}`
                );
                regularPriceMobile.text(`Regular Price: ${radio.getAttribute('data-regular-price')}`);
                calloutBoxPriceMobile.text(radio.getAttribute('data-my-account-price'));
            });
        }
    });
})(jQuery);

