    (function($) {
        $(window).on('load', function () {
            const isLoggedIn = $('body').hasClass('ghm-logged-in');
            const buyNowButtonMobile = document.getElementById('buy_now_mobile');
            const finalPriceMobile = document.getElementById('price_amount_mobile');
            const instantSavingsMobile = $('#instant-savings-mobile');
            const regularPriceMobile = $('#regular-price-mobile');
            const calloutBoxPriceMobile = $('#callout-box-price-mobile');
            const productRadioOptionsMobile = document.getElementsByName('radio_mobile');
            const url = new URL(GHM.my_account_urls.cart).origin;
            const path = new URL(GHM.my_account_urls.cart).pathname;
            const cartUrl = `${url}${path}`;

            productRadioOptionsMobile[1].checked = true;
            finalPriceMobile.innerHTML = isLoggedIn ? productRadioOptionsMobile[1].getAttribute('data-my-account-price') : productRadioOptionsMobile[1].getAttribute('data-price');
            buyNowButtonMobile.setAttribute('href', isLoggedIn ? `${cartUrl}?product1=${productRadioOptionsMobile[1].getAttribute('data-my-account-variant-id')}` : `${cartUrl}?product1=${productRadioOptionsMobile[1].getAttribute('data-variant-id')}`);
            instantSavingsMobile.text(isLoggedIn ? `Instant Savings: ${productRadioOptionsMobile[1].getAttribute('data-instant-savings-my-account')}` : `Instant Savings: ${productRadioOptionsMobile[1].getAttribute('data-instant-savings')}`);
            regularPriceMobile.text(`Regular Price: ${productRadioOptionsMobile[1].getAttribute('data-regular-price')}`);
            calloutBoxPriceMobile.text(productRadioOptionsMobile[1].getAttribute('data-my-account-price'));

            $('#callout-box-price-mobile #login-mobile').attr('href', GHM.my_account_urls.login);
            $('#callout-box-price-mobile #signup-mobile').attr('href', GHM.my_account_urls.signup);

            isLoggedIn ? $('.callout-box-mobile').hide() : $('#callout-box-mobile').show();

            for (const radio of productRadioOptionsMobile) {
                radio.addEventListener('change', function() {
                    finalPriceMobile.innerHTML = isLoggedIn ? radio.getAttribute('data-my-account-price') : radio.getAttribute('data-price');
                    buyNowButtonMobile.setAttribute('href', isLoggedIn ? `${cartUrl}?product1=${radio.getAttribute('data-my-account-variant-id')}` : `${cartUrl}?product1=${radio.getAttribute('data-variant-id')}`);
                    instantSavingsMobile.text(isLoggedIn ? `Instant Savings: ${radio.getAttribute('data-instant-savings-my-account')}` : `Instant Savings: ${radio.getAttribute('data-instant-savings')}`);
                    regularPriceMobile.text(`Regular Price: ${radio.getAttribute('data-regular-price')}`);
                    calloutBoxPriceMobile.text(radio.getAttribute('data-my-account-price'));
                    
                    // Hide or show instant-savings and regular-price based on selection and login status
                    if (!isLoggedIn && radio.id === 'one_jar_mobile') {
                        instantSavingsMobile.hide();
                        regularPriceMobile.hide();
                    } else {
                        instantSavingsMobile.show();
                        regularPriceMobile.show();
                    }
                });
            }
        });
    })(jQuery);