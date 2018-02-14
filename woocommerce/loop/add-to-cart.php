<?php
/**
 * Loop Add to Cart
 * Updated for Understrap to maintain Woocommerce 3.0.3 compatability.
 * This template can be overridden by copying it to yourtheme/woocommerce/loop/add-to-cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see        https://docs.woocommerce.com/document/template-structure/
 * @author        WooThemes
 * @package    WooCommerce/Templates
 * @version 	3.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $product;
echo apply_filters( 'woocommerce_loop_add_to_cart_link',
	sprintf( '<div class="add-to-cart-container"><a href="%s" rel="nofollow" data-product_id="%s" data-product_sku="%s" data-quantity="%s" class="%s product_type_%s single_add_to_cart_button btn btn-outline-primary btn-block %s"> %s</a></div>',
		esc_url( $product->add_to_cart_url() ),
		esc_attr( $product->get_id() ),
		esc_attr( $product->get_sku() ),
		esc_attr( isset( $quantity ) ? $quantity : 1 ),
	$product->is_purchasable() && $product->is_in_stock() ? 'add_to_cart_button' : '',
		esc_attr( $product->get_type() ),
	$product->get_type() == 'simple' ? 'ajax_add_to_cart' : '',
		esc_html( $product->add_to_cart_text() )
	),
	$product );
