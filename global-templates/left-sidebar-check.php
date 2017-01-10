<?php
$sidebar_pos = get_theme_mod( 'understrap_sidebar_position' );
// On WooCommerce pages there is no need for sidebars as they leave
// too little space for WooCommerce itself. We check if WooCommerce
// is active and the current page is a WooCommerce page and we do
// not render sidebars.
$is_woocommerce = false;
$this_page_id   = get_queried_object_id();
if ( class_exists( 'WooCommerce' ) ) {

	if ( is_woocommerce() || is_shop() || get_option( 'woocommerce_shop_page_id' ) === $this_page_id ||
	     get_option( 'woocommerce_cart_page_id' ) == $this_page_id || get_option( 'woocommerce_checkout_page_id' ) == $this_page_id ||
	     get_option( 'woocommerce_pay_page_id' ) == $this_page_id || get_option( 'woocommerce_thanks_page_id' ) === $this_page_id ||
	     get_option( 'woocommerce_myaccount_page_id' ) == $this_page_id || get_option( 'woocommerce_edit_address_page_id' ) == $this_page_id ||
	     get_option( 'woocommerce_view_order_page_id' ) == $this_page_id || get_option( 'woocommerce_terms_page_id' ) == $this_page_id
	) {

		$is_woocommerce = true;
	}
}
?>
<?php if ( 'left' === $sidebar_pos || 'both' === $sidebar_pos && ! $is_woocommerce ) : ?>
	<?php get_sidebar( 'left' ); ?>
<?php endif; ?>

<?php

if ( $is_woocommerce ) {
	echo '<div class="col-md-12 content-area" id="primary">';
} else {
	$html = '';
	if ( 'right' === $sidebar_pos || 'left' === $sidebar_pos ) {
		$html = '<div class="';
		if ( is_active_sidebar( 'right-sidebar' ) || is_active_sidebar( 'left-sidebar' ) ) {
			$html .= 'col-md-8 content-area" id="primary">';
		} else {
			$html .= 'col-md-12 content-area" id="primary">';
		}
		echo $html;
	} elseif ( is_active_sidebar( 'right-sidebar' ) && is_active_sidebar( 'left-sidebar' ) ) {
		$html = '<div class="';
		if ( 'both' === $sidebar_pos ) {
			$html .= 'col-md-6 content-area" id="primary">';
		} else {
			$html .= 'col-md-12 content-area" id="primary">';
		}
		echo $html;
	} else {
	    echo '<div class="col-md-12 content-area" id="primary">';
	}
}
