jQuery(window).on('elementor/frontend/init', () => {
    elementorFrontend.hooks.addAction('frontend/element_ready/widget', function ($scope, $) {
        if ($scope.hasClass('elementor-widget-mini-offer-selector')) {
            ($scope.data('widget_type').includes('skin-roundhouse-mini-os')
                ? miniOfferSelectorWithPlusMinus
                : miniOfferSelectorWithDropDown)($scope, $);
        }
    });

    function miniOfferSelectorWithPlusMinus($scope, $) {
        $scope.find('.ghm-mini-offer-selector').removeClass('ghm-hidden');

        const cartUrl = $scope.find('.ghm-mini-offer-selector').data('cartUrl');
        const isLoggedIn = $('body').hasClass('ghm-logged-in');
        const isAmbassador = $('body').hasClass('tcr-ambassador');
        const isAspire = $('body').hasClass('tcr-aspire');
        const $productOptions = $scope.find('.ghm-mini-offer-selector .product-option');
        const hasMultipleVariants = $productOptions.length > 1;

        const cookies = {
            tcrReturningCustomer: Cookies.get('tcrReturningCustomer'),
            tcrReferrer: Cookies.get('tcrReferrer'),
            tcrPagePath: Cookies.get('tcrPagePath'),
            tcrMedium: Cookies.get('tcrMedium'),
            tcrCampaign: Cookies.get('tcrCampaign'),
            mbsyGoldenHippo: Cookies.get('mbsygoldenhippo_new'),
            mbsyGoldenHippoFirstName: Cookies.get('mbsygoldenhippo_firstname'),
            mbsyGoldenHippoLastName: Cookies.get('mbsygoldenhippo_lastname'),
            ambassadorVanityCode: Cookies.get('ambassador_code'),
            ambassadorFirstName: Cookies.get('ambassador_firstName'),
            ambassadorLastName: Cookies.get('ambassador_lastName')
        };

        // Append additional parameters for the cart URL
        function appendAdditionalParams(param) {
            const tcrParams = Cookies.get('tcrParams') ? Cookies.get('tcrParams').substring(1) : '';

            // Append tcrParams directly to the URL if it exists
            if (tcrParams) {
                const urlParams = new URLSearchParams(tcrParams);
                urlParams.forEach((value, key) => param.set(key, value));
            }

            Object.entries(cookies).forEach(([key, value]) => {
                // Set cookies as key-value pairs using cookies object declared above
                if (value) param.set(key, value);
            });

            return param;
        }

        // Format currency using Intl API
        function formatCurrency(amount, currencyCode = 'USD') {
            return new Intl.NumberFormat(navigator.language || 'en-US', {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'narrowSymbol'
            }).format(amount);
        }

        function updateMiniOSCard(currentQuantity, familyId) {
            const productData = (isLoggedIn || isAmbassador || isAspire) ? $productOptions.filter(`[data-family-id="${familyId}"]`).data('oneTimeMyAccount') : $productOptions.filter(`[data-family-id="${familyId}"]`).data('oneTimeStandard');
            const currentQuantityInt = parseInt(currentQuantity);
            // productData is an array of objects. Get the index of the object that has the same quantity as the current quantity
            const currentArrIndexByQuantity = productData.findIndex(item => item.quantity === currentQuantityInt);
            const currentIndexProductData = productData[currentArrIndexByQuantity];
            const myAccountPrice = $productOptions.filter(`[data-family-id="${familyId}"]`).data('oneTimeMyAccount').find(item => item.quantity === currentQuantityInt).price;
            const { quantity, price, packageType, compareToPrice, variantId } = currentIndexProductData;
            const priceDifferenceInDollars = compareToPrice - price;
            const priceDifferenceInPercentage = Math.round((priceDifferenceInDollars / compareToPrice) * 100);
            const savingsMessage = priceDifferenceInPercentage > 0
                ? `Save ${priceDifferenceInPercentage}%`
                : 'Buy More & Save Big!';

            const $parent = $productOptions.filter(`[data-family-id="${familyId}"]`);
            $parent.find('.quantity-selector').val(quantity);
            $parent.find('.price-container .price').text(formatCurrency(price));
            $parent.find('.price-container .package-type').text(packageType);
            $parent.find('.savings-container .savings-in-percentage').text(savingsMessage);
            $parent.find('.login-container .my-account-price').text(formatCurrency(myAccountPrice));

            const addToCartLink = $parent.find('.add-to-cart-container a');
            const params = new URLSearchParams({ product1: variantId });

            if (isAmbassador || isAspire) {
                params.set('swapVariant', 'false');
            }

            appendAdditionalParams(params);
            addToCartLink.attr('href', `${cartUrl}?${params}`);
        }

        if (isLoggedIn || isAmbassador || isAspire) {
            $scope.find('.ghm-mini-offer-selector .login-container').hide();
        } else {
            $scope.find('.ghm-mini-offer-selector .login-container').show();
        }

        // Initialize quantities and prices on page load
        $productOptions.each(function (index, element) {
            const productData = (isLoggedIn || isAmbassador || isAspire) ? $(this).data('oneTimeMyAccount') : $(this).data('oneTimeStandard');

            $(this).find('.quantity-selector').val(productData[0].quantity);

            const quantity = $(this).find('.quantity-selector').val();
            const familyId = $(this).data('familyId');
            updateMiniOSCard(quantity, familyId);
        });

        // Plus button functionality
        $scope.find('.ghm-mini-offer-selector .product-option .quantity-selector-btn-plus').on('click', function () {
            const $quantityInput = $(this).prev();
            const currentQuantity = parseInt($quantityInput.val());
            const familyId = $(this).closest('.product-option').data('familyId');
            const productData = (isLoggedIn || isAmbassador || isAspire) ? $productOptions.filter(`[data-family-id="${familyId}"]`).data('oneTimeMyAccount') : $productOptions.filter(`[data-family-id="${familyId}"]`).data('oneTimeStandard');
            const nextProductObj = productData.find(item => item.quantity > currentQuantity);
            if (!nextProductObj) return;
            updateMiniOSCard(nextProductObj.quantity, familyId);
        });

        // Minus button functionality
        $scope.find('.ghm-mini-offer-selector .product-option .quantity-selector-btn-minus').on('click', function () {
            const $quantityInput = $(this).next();
            const currentQuantity = parseInt($quantityInput.val());
            const familyId = $(this).closest('.product-option').data('familyId');
            const productData = (isLoggedIn || isAmbassador || isAspire) ? $productOptions.filter(`[data-family-id="${familyId}"]`).data('oneTimeMyAccount') : $productOptions.filter(`[data-family-id="${familyId}"]`).data('oneTimeStandard');
            const previousProductObj = productData.slice().reverse().find(item => item.quantity < currentQuantity);
            if (!previousProductObj) return;
            updateMiniOSCard(previousProductObj.quantity, familyId);
        });

        // Handle out of stock
        $productOptions.each(function () {
            const isOutOfStock = $(this).data('outOfStock') === 1;
            $(this).find('.add-to-cart-container').toggle(!isOutOfStock);
            $(this).find('.out-of-stock-container').toggle(isOutOfStock);
        });

        // Variant selector logic
        if (hasMultipleVariants) {
            const $variantSelector = $scope.find('.product-variant-selector');
            $productOptions.hide().first().show();

            $variantSelector.on('change', function () {
                const selectedFamilyId = $(this).find('option:selected').val();
                $productOptions.hide().filter(`[data-family-id="${selectedFamilyId}"]`).show();
            });
        }
    }

    function miniOfferSelectorWithDropDown($scope, $) {
        // $scope represent widget wrapper element - `.elementor-widget-mini-offer-selector`. Always use $scope to find the current widget element.
        $scope.find('.ghm-mini-offer-selector').removeClass('ghm-hidden');

        const cartUrl = $scope.find('.ghm-mini-offer-selector').data('cartUrl');
        const isLoggedIn = $('body').hasClass('ghm-logged-in');
        const isAmbassador = $('body').hasClass('tcr-ambassador');
        const isAspire = $('body').hasClass('tcr-aspire');
        const isOutOfStock = $scope.find('.ghm-mini-offer-selector .product-option').data('outOfStock') === 1;
        const hasMultipleVariants = $scope.find('.ghm-mini-offer-selector .product-option').length > 1;

        const cookies = {
            tcrReturningCustomer: Cookies.get('tcrReturningCustomer'),
            tcrReferrer: Cookies.get('tcrReferrer'),
            tcrPagePath: Cookies.get('tcrPagePath'),
            tcrMedium: Cookies.get('tcrMedium'),
            tcrCampaign: Cookies.get('tcrCampaign'),
            mbsyGoldenHippo: Cookies.get('mbsygoldenhippo_new'),
            mbsyGoldenHippoFirstName: Cookies.get('mbsygoldenhippo_firstname'),
            mbsyGoldenHippoLastName: Cookies.get('mbsygoldenhippo_lastname'),
            ambassadorVanityCode: Cookies.get('ambassador_code'),
            ambassadorFirstName: Cookies.get('ambassador_firstName'),
            ambassadorLastName: Cookies.get('ambassador_lastName')
        };

        // Append additional parameters for the cart URL
        function appendAdditionalParams(param) {
            const tcrParams = Cookies.get('tcrParams') ? Cookies.get('tcrParams').substring(1) : '';

            // Append tcrParams directly to the URL if it exists
            if (tcrParams) {
                const urlParams = new URLSearchParams(tcrParams);
                urlParams.forEach((value, key) => param.set(key, value));
            }

            Object.entries(cookies).forEach(([key, value]) => {
                // Set cookies as key-value pairs using `cookies` object declared above
                if (value) param.set(key, value);
            });

            return param;
        }

        // Show/hide sections based on user status
        if (isLoggedIn || isAmbassador || isAspire) {
            $scope.find('.ghm-mini-offer-selector [data-product-type="one-time-standard"]').remove();
            $scope.find('.ghm-mini-offer-selector [data-product-type="one-time-my-account"]').show();
            $scope.find('.ghm-mini-offer-selector .login-container').hide();
        } else {
            $scope.find('.ghm-mini-offer-selector [data-product-type="one-time-standard"]').show();
            $scope.find('.ghm-mini-offer-selector [data-product-type="one-time-my-account"]').remove();
            $scope.find('.ghm-mini-offer-selector .login-container').show();
        }

        // Handle out of stock
        if (hasMultipleVariants) {
            $scope.find('.ghm-mini-offer-selector .product-option').each(function () {
                const isOutOfStock = $(this).data('outOfStock') === 1;
                if (isOutOfStock) {
                    $(this).find('.add-to-cart-container').hide();
                    $(this).find('.out-of-stock-container').show();
                    $(this).find('.buy-more-save-ribbon').hide();
                } else {
                    $(this).find('.add-to-cart-container').show();
                    $(this).find('.out-of-stock-container').hide();
                    $(this).find('.buy-more-save-ribbon').show();
                }
            });
        } else if (isOutOfStock) {
            $scope.find('.ghm-mini-offer-selector .add-to-cart-container').hide();
            $scope.find('.ghm-mini-offer-selector .out-of-stock-container').show();
            $scope.find('.buy-more-save-ribbon').hide();
        } else {
            $scope.find('.ghm-mini-offer-selector .add-to-cart-container').show();
            $scope.find('.ghm-mini-offer-selector .out-of-stock-container').hide();
            $scope.find('.buy-more-save-ribbon').show();
        }

        // Format currency using Intl API
        function formatCurrency(amount, currencyCode = 'USD') {
            return new Intl.NumberFormat(navigator.language || 'en-US', {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'narrowSymbol'
            }).format(amount);
        }

        // Update the "Add to Cart" link and display prices
        function updateCartLinkAndProductInfo(selectElement) {
            const $selectElement = $(selectElement).closest('.product-option');
            const selectedOption = $selectElement.find('option:selected');

            const variantId = selectedOption.val();
            const packageType = selectedOption.data('packageType');
            const singularPackageType = $selectElement.data('packageTypeSingular');
            const price = selectedOption.data('price');
            const quantity = selectedOption.data('quantity');
            const myAccountPrice = selectedOption.data('myAccountPrice');
            const priceDifferenceInPercentage = selectedOption.data('priceDifferenceInPercentage');

            // Update Add to Cart link
            const addToCartLink = $(selectElement).closest('.product-option').find('.add-to-cart-container a');
            const params = new URLSearchParams({ product1: variantId });
            // append swapVariant false if isAmbassador is true or isAspire is true
            if (isAmbassador || isAspire) {
                params.set('swapVariant', 'false');
            }
            appendAdditionalParams(params);
            addToCartLink.attr('href', `${cartUrl}?${params}`);

            // Update price and savings information
            const priceFormatted = formatCurrency(price / quantity);
            const myAccountPriceFormatted = formatCurrency(myAccountPrice / quantity);

            $selectElement.find('.price-container .price').text(priceFormatted);
            $selectElement.find('.price-container .package-type').text(singularPackageType);

            const savingsMessage = priceDifferenceInPercentage > 0
                ? `Save ${priceDifferenceInPercentage}%`
                : 'Buy More & Save Big!';

            $selectElement.find('.savings-container').text(savingsMessage);
            $selectElement.find('.login-container .my-account-price').text(myAccountPriceFormatted);
        }

        // Handle show and hide of product options based on variant selection
        if (hasMultipleVariants) {
            const $productOptions = $scope.find('.ghm-mini-offer-selector .product-option');
            const $variantSelector = $scope.find('.product-variant-selector');
            // Hide all product options except the first one
            $productOptions.hide().first().show();

            $variantSelector.on('change', function () {
                const selectFamilyId = $(this).find('option:selected').val();
                // Hide all product options and show the one with the selected family ID
                $productOptions.hide().filter(`[data-family-id="${selectFamilyId}"]`).show();
            });
        }

        // Initialize quantity select elements
        $scope.find('.ghm-mini-offer-selector [id^="quantity-select-"]').prop('selectedIndex', 0);
        $scope.find('.ghm-mini-offer-selector .product-option').each(function () {
            updateCartLinkAndProductInfo($(this).find('[id^="quantity-select-"]'));
        });

        // On quantity change, update the cart link and product info
        $scope.find('.ghm-mini-offer-selector [id^="quantity-select-"]').on('change', function () {
            updateCartLinkAndProductInfo($(this));
        });
    }
});