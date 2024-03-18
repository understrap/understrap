<?php
/**
 * My Account navigation
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/navigation.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 2.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_before_account_navigation' );
?>

<nav class="woocommerce-MyAccount-navigation">
	<div class="list-group">
		<?php
		foreach ( wc_get_account_menu_items() as $endpoint => $label ) {
			printf(
				'<a href="%s" class="%s">%s</a>',
				esc_url( wc_get_account_endpoint_url( $endpoint ) ),
				wc_get_account_menu_item_classes( $endpoint ), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Ok.
				esc_html( $label )
			);
		}
		?>
	</div>
</nav>

<?php
do_action( 'woocommerce_after_account_navigation' );
