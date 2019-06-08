//Fixed navbar
var mainNav = document.querySelector('#wrapper-navbar > nav.navbar');

var mainNavOffset = function mainNavOffset() {
  if (mainNav.classList.contains('fixed-top')) {
    var navHeight = mainNav.offsetHeight;
    document.getElementById('page').style.marginTop = navHeight + 'px'; 
  }
  /** 
  * For when logged in
  * @see /wp-includes/admin-bar.php
  */
  if (document.querySelector('body').classList.contains('logged-in')) {
    var scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 46) {
      mainNav.classList.add('scrolled')
    } else {
      mainNav.classList.remove('scrolled')
    }
  }
};

mainNavOffset();
window.onresize = mainNavOffset;
window.addEventListener('scroll', mainNavOffset);