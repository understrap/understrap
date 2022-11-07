<?php
/**
 * Navbar branding
 *
 * @package Understrap
 * @since 1.2.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! has_custom_logo() ) {
	$anchor = sprintf(
		'<a class="navbar-brand d-inline-block" rel="home" href="%1$s" itemprop="url">%2$s</a>',
		esc_url( get_home_url( null, '/' ) ),
		esc_html( get_bloginfo( 'name', 'display' ) )
	);

	if ( is_front_page() && is_home() ) {
		echo '<h1 class="navbar-brand m-0 p-0">' . $anchor . '</h1>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- ok.
	} else {
		echo $anchor; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- ok.
	}
} else {
	the_custom_logo();
}
