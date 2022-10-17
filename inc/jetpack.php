<?php
/**
 * Jetpack Compatibility File
 *
 * @link https://jetpack.me/
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_action( 'after_setup_theme', 'understrap_jetpack_setup' );

if ( ! function_exists( 'understrap_jetpack_setup' ) ) {
	/**
	 * Jetpack setup function.
	 *
	 * @since 1.2.0 Reintroduced as `understrap_jetpack_setup()`
	 * @since 0.6.9 Renamed to `understrap_components_jetpack_setup()`
	 * @since 0.5.6 Renamed to `components_jetpack_setup()`
	 * @since 0.1.0
	 *
	 * @link https://jetpack.me/support/infinite-scroll/
	 * @link https://jetpack.me/support/responsive-videos/
	 * @link https://jetpack.me/support/social-menu/
	 */
	function understrap_jetpack_setup() {
		// Add theme support for Infinite Scroll.
		add_theme_support(
			'infinite-scroll',
			array(
				'container' => 'main',
				'render'    => 'understrap_jetpack_infinite_scroll_render',
				'footer'    => 'page',
			)
		);

		// Add theme support for Responsive Videos.
		add_theme_support( 'jetpack-responsive-videos' );

		// Add theme support for Social Menus.
		add_theme_support( 'jetpack-social-menu' );

	}
}

if ( ! function_exists( 'understrap_jetpack_infinite_scroll_render' ) ) {
	/**
	 * Custom render function for Jetpack's Infinite Scroll feature.
	 *
	 * @since 1.2.0 Renamed from understrap_components_infinite_scroll_render()
	 */
	function understrap_jetpack_infinite_scroll_render() {
		while ( have_posts() ) {
			the_post();
			if ( is_search() ) {
				get_template_part( 'loop-templates/content', 'search' );
			} else {
				$post_format = get_post_format();
				if ( false === $post_format ) {
					$post_format = '';
				}
				get_template_part( 'loop-templates/content', $post_format );
			}
		}
	}
}

if ( ! function_exists( 'understrap_jetpack_social_menu' ) ) {
	/**
	 * Display Jetpack's social menu if available.
	 *
	 * @since 1.2.0 Renamed from understrap_components_social_menu()
	 */
	function understrap_jetpack_social_menu() {
		if ( ! function_exists( 'jetpack_social_menu' ) ) {
			// Return early if social menu is not available.
			return;
		}
		jetpack_social_menu();
	}
}
