<script>
jQuery(document).ready(function() {
    // Define the URLs
    let loggedOutURL = "https://cart.roundhouseprovisions.com/cart/?product1=a0NVo00000IO0u9MAD";
    let loggedInURL = "https://cart.roundhouseprovisions.com/cart/?product1=a0NVo00000IO1qDMAT&tcrReturningCustomer=1";

    // Check if the body has the class for logged-in or logged-out users
    let cartURL = jQuery('body').hasClass('ghm-logged-in') ? loggedInURL : loggedOutURL;

    // Inject the button with the correct URL
    jQuery('.post-4115 .elementor-widget-mini-offer-selector .elementor-widget-container')
        .html('<a class="add-to-cart-btn" href="' + cartURL + '">Add to cart</a>');
});
</script>

<style>
.post-4115 a.add-to-cart-btn {
    display: flex !important;
    color: #EE5531;
    align-items: start !important;
    justify-content: start !important;
    text-align: left !important;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: underline;
}
.post-4115 .buy-more-save-ribbon {
    display: none;
}
/*
.post-4115 a.add-to-cart-btn {
    background-color: #CE3510;
    font-size: 18px;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 700;
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    transition: all 200ms;
    display: inline-block !important;
    width: 244px !important;
    text-align: center;
}
.post-4115 a.add-to-cart-btn::before {
	content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url('https://cdn.roundhouseprovisions.com/wp-content/uploads/2025/03/cart.svg') no-repeat center center;
    background-size: contain;
    margin-right: 12px;
	color: #fff !important;
}
.post-4115 a.add-to-cart-btn:hover {
    background-color: #9A2E14;
}
.post-4115 .buy-more-save-ribbon {
    display: none;
}
@media only screen and (max-width: 767px) {
	.post-4115 a.add-to-cart-btn {
		width: 138px !important;
	}
	.post-4115 a.add-to-cart-btn::before {
	    display: none;
	}
}
/*
</style>