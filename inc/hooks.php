<?php
/**
 * Custom hooks
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_site_info' ) ) {
	/**
	 * Add site info hook to WP hook library.
	 */
	function understrap_site_info() {
		do_action( 'understrap_site_info' );
	}
}

add_action( 'understrap_site_info', 'understrap_add_site_info' );
if ( ! function_exists( 'understrap_add_site_info' ) ) {
	/**
	 * Add site info content.
	 */
	function understrap_add_site_info() {
		$the_theme = wp_get_theme();

		$site_info = sprintf(
			'<a href="%1$s">%2$s</a><span class="sep"> | </span>%3$s(%4$s)',
			esc_url( __( 'https://wordpress.org/', 'understrap' ) ),
			sprintf(
				/* translators: WordPress */
				esc_html__( 'Proudly powered by %s', 'understrap' ),
				'WordPress'
			),
			sprintf(
				/* translators: 1: Theme name, 2: Theme author */
				esc_html__( 'Theme: %1$s by %2$s.', 'understrap' ),
				$the_theme->get( 'Name' ),
				'<a href="' . esc_url( __( 'https://understrap.com', 'understrap' ) ) . '">understrap.com</a>'
			),
			sprintf(
				/* translators: Theme version */
				esc_html__( 'Version: %s', 'understrap' ),
				$the_theme->get( 'Version' )
			)
		);

		// Check if customizer site info has value.
		if ( get_theme_mod( 'understrap_site_info_override' ) ) {
			$site_info = get_theme_mod( 'understrap_site_info_override' );
		}

		echo apply_filters( 'understrap_site_info_content', $site_info ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
}
