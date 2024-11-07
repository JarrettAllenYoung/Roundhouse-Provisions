
    
    (function($) {
        $(document).ready(function() {
            const isLoggedIn = $('body').hasClass('ghm-logged-in');
            const buyNowButton = document.getElementById('buy_now');
            const finalPrice = document.getElementById('price_amount');
            const instantSavings = $('#instant-savings');
            const regularPrice = $('#regular-price');
            const calloutBoxPrice = $('#callout-box-price');
            const productRadioOptions = document.getElementsByName('radio_desktop');
            const url = new URL(GHM.my_account_urls.cart).origin;
            const path = new URL(GHM.my_account_urls.cart).pathname;
            const cartUrl = `${url}${path}`;

            productRadioOptions[1].checked = true;
            finalPrice.innerHTML = isLoggedIn ? productRadioOptions[1].getAttribute('data-my-account-price') : productRadioOptions[1].getAttribute('data-price');
            buyNowButton.setAttribute('href', isLoggedIn ? `${cartUrl}?product1=${productRadioOptions[1].getAttribute('data-my-account-variant-id')}` : `${cartUrl}?product1=${productRadioOptions[1].getAttribute('data-variant-id')}`);
            instantSavings.text(isLoggedIn ? `Instant Savings: ${productRadioOptions[1].getAttribute('data-instant-savings-my-account')}` : `Instant Savings: ${productRadioOptions[1].getAttribute('data-instant-savings')}`);
            regularPrice.text(`Regular Price: ${productRadioOptions[1].getAttribute('data-regular-price')}`);
            calloutBoxPrice.text(productRadioOptions[1].getAttribute('data-my-account-price'));

            $('#callout-box-price #login').attr('href', GHM.my_account_urls.login);
            $('#callout-box-price #signup').attr('href', GHM.my_account_urls.signup);

            isLoggedIn ? $('.callout-box').hide() : $('#callout-box').show();

            for (const radio of productRadioOptions) {
                radio.addEventListener('change', function() {
                    finalPrice.innerHTML = isLoggedIn ? radio.getAttribute('data-my-account-price') : radio.getAttribute('data-price');
                    buyNowButton.setAttribute('href', isLoggedIn ? `${cartUrl}?product1=${radio.getAttribute('data-my-account-variant-id')}` : `${cartUrl}?product1=${radio.getAttribute('data-variant-id')}`);
                    instantSavings.text(isLoggedIn ? `Instant Savings: ${radio.getAttribute('data-instant-savings-my-account')}` : `Instant Savings: ${radio.getAttribute('data-instant-savings')}`);
                    regularPrice.text(`Regular Price: ${radio.getAttribute('data-regular-price')}`);
                    calloutBoxPrice.text(radio.getAttribute('data-my-account-price'));
                });
            }
        });
    })(jQuery);
