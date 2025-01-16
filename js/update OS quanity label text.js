// Function to update quantity text
const updateQuantityText = (selector) => {
    const options = document.querySelectorAll(
        `#ghm-offer-selector .product-options ${selector} > li`
    );

    options.forEach((li) => {
        const dataIndex = li.querySelector('label').getAttribute('data-index');
        const quantitySpan = li.querySelector('.quantity-container .quantity');

        if (quantitySpan) {
            switch (dataIndex) {
                case '0':
                    quantitySpan.textContent = '1 Box';
                    break;
                case '1':
                    quantitySpan.textContent = '3 Boxes';
                    break;
                case '2':
                    quantitySpan.textContent = '6 Boxes';
                    break;
            }
        }
    });
};

// Update all relevant lists
updateQuantityText('.one-time-my-account');
updateQuantityText('.subscribe-save-my-account');
updateQuantityText('.one-time-standard');

// Handle dynamically loaded content
const observer = new MutationObserver(() => {
    const oneTimeOptions = document.querySelectorAll(
        '#ghm-offer-selector .product-options .one-time-my-account > li'
    );
    const subscribeSaveOptions = document.querySelectorAll(
        '#ghm-offer-selector .product-options .subscribe-save-my-account > li'
    );
    const oneTimeStandardOptions = document.querySelectorAll(
        '#ghm-offer-selector .product-options .one-time-standard > li'
    );

    if (
        oneTimeOptions.length > 0 ||
        subscribeSaveOptions.length > 0 ||
        oneTimeStandardOptions.length > 0
    ) {
        updateQuantityText('.one-time-my-account');
        updateQuantityText('.subscribe-save-my-account');
        updateQuantityText('.one-time-standard');

        // Stop observing once the elements are updated
        observer.disconnect();
    }
});

observer.observe(document.querySelector('#ghm-offer-selector'), {
    childList: true,
    subtree: true,
});
