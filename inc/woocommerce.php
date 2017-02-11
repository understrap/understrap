<?php
/**
 * Add WooCommerce support
 *
 * @package understrap
 */

add_action( 'after_setup_theme', 'woocommerce_support' );
if ( ! function_exists( 'woocommerce_support' ) ) {
	/**
	 * Declares WooCommerce theme support.
	 */
	function woocommerce_support() {
		add_theme_support( 'woocommerce' );
	}
}

/**
* Remove basic WooCOmmerce hooks.
*/
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);


/**
* Hook in custom WooCommerce content area.
*/
add_action('woocommerce_before_main_content', 'my_theme_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'my_theme_wrapper_end', 10);

function my_theme_wrapper_start() {
  echo '<section id="main">';
}

function my_theme_wrapper_end() {
  echo '</section>';
}