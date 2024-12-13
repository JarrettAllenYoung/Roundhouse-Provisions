    (function ($) {
        $(window).on('load', function () {
            // Cache DOM elements for performance
            const isLoggedIn = $('body').hasClass('ghm-logged-in');
            const buyNowButton = $('#buy_now');
            const finalPrice = $('#price_amount');
            const instantSavings = $('#instant-savings');
            const regularPrice = $('#regular-price');
            const calloutBoxPrice = $('#callout-box-price');
            const productRadioOptions = document.getElementsByName('radio_desktop');
            const url = new URL(GHM.my_account_urls.cart).origin;
            const path = new URL(GHM.my_account_urls.cart).pathname;
            const cartUrl = `${new URL(GHM.my_account_urls.cart).origin}${new URL(GHM.my_account_urls.cart).pathname}`;
            
            // Helper function to update UI elements based on selected radio button
            function updatePricing(radio) {
                const price = isLoggedIn ? $(radio).data('my-account-price') : $(radio).data('price');
                const savings = isLoggedIn
                    ? `Instant Savings: ${$(radio).data('instant-savings-my-account')}`
                    : `Instant Savings: ${$(radio).data('instant-savings')}`;
                const variantId = isLoggedIn
                    ? $(radio).data('my-account-variant-id')
                    : $(radio).data('variant-id');
                const regular = `Regular Price: ${$(radio).data('regular-price')}`;
                
                finalPrice.html(price);
                instantSavings.text(savings);
                regularPrice.text(regular);
                calloutBoxPrice.text($(radio).data('my-account-price'));
                buyNowButton.attr('href', `${cartUrl}?product1=${variantId}`);
                
                // Hide or show instant-savings and regular-price based on selected radio button and login status
                if (!isLoggedIn && radio.id === 'one_jar_desktop') {
                    instantSavings.hide();
                    regularPrice.hide();
                } else {
                    instantSavings.text(savings).show(); // Show and update
                    regularPrice.text(regular).show();   // Show and update
                }
            }
    
            // Initialize with the second product selected by default
            if (productRadioOptions[1]) {
                productRadioOptions[1].checked = true;
                updatePricing(productRadioOptions[1]);
            }
    
            // Set login and signup links
            $('#callout-box-price #login').attr('href', GHM.my_account_urls.login);
            $('#callout-box-price #signup').attr('href', GHM.my_account_urls.signup);
    
            // Toggle visibility of the callout box based on login status
            isLoggedIn ? $('.callout-box').hide() : $('#callout-box').show();
    
            // Add event listener to all radio buttons
            for (const radio of productRadioOptions) {
                radio.addEventListener('change', function () {
                    console.log('Radio changed:', radio.id);
                    updatePricing(radio);
                });
            }
        });
    })(jQuery);