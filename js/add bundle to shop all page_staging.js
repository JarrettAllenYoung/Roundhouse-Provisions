jQuery(document).ready(function() {
    // Define the URLs
    let loggedOutURL = "https://cart.roundhouseprovisions.com/cart/?product1=a0NVo00000IO0u9MAD";
    let loggedInURL = "https://cart.roundhouseprovisions.com/cart/?product1=a0NVo00000IO1qDMAT&tcrReturningCustomer=1";

    // Check if the body has the class for logged-in or logged-out users
    let cartURL = jQuery('body').hasClass('ghm-logged-in') ? loggedInURL : loggedOutURL;

    // Inject the button with the correct URL
    jQuery('.post-4050 .elementor-widget-mini-offer-selector .elementor-widget-container')
        .html('<a class="add-to-cart-btn" href="' + cartURL + '">Add to cart</a>');
});