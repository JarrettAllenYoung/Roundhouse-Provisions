<script type="text/javascript">
// set display property of nav elements for logged in and logged out users before dom ready. This fixes the content shift on desktop where nav is displayed when the page loads causing the delay.
if (window.innerWidth > 1024) {
var ghmLoggedInCookie = Cookies.get('ghm_logged_in');
var ghmAuthDataCookie = Cookies.get('ghm_auth_data');

var accountLoggedIn = ghmLoggedInCookie ? ghmLoggedInCookie === '1' : false;

var parentCont = document.querySelector('.right-menu-container');

var loggedInElements = parentCont.getElementsByClassName("account-menu-loggedin");

var loggedOutElements = parentCont.getElementsByClassName("account-menu-loggedout");

if(!accountLoggedIn) {
    for (let i = 0; i < loggedInElements.length; i++) {
      loggedInElements[i].style.display = "none";
    }

    for (let i = 0; i < loggedOutElements.length; i++) {
      loggedOutElements[i].style.display = "block";
    }
} else {
    for (let i = 0; i < loggedInElements.length; i++) {
      loggedInElements[i].style.display = "block";
    }

    for (let i = 0; i < loggedOutElements.length; i++) {
      loggedOutElements[i].style.display = "none";
    }
}
}

</script>