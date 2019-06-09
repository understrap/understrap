/**
 * Javascript for fixed navbar setting
 */

// Select the main navbar
var mainNav = document.querySelector('#wrapper-navbar > nav.navbar');

var mainNavOffset = function mainNavOffset() {

  //Check if fixed navbar is set
  if (mainNav.classList.contains('fixed-top')) {
    
    //Dynamically offset content so that content is always visible.
    var navHeight = mainNav.offsetHeight;
    document.getElementById('page').style.marginTop = navHeight + 'px'; 
  }

  /** 
  * For when logged in. Offsets fixed navbar so that it's not hidden by wpadmin bar.
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