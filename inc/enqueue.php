<?php
/**
 * UnderStrap enqueue scripts
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_scripts' ) ) {
	/**
	 * Load theme's JavaScript and CSS sources.
	 */
	function understrap_scripts() {
		// Get the theme data.
		$the_theme     = wp_get_theme();
		$theme_version = $the_theme->get( 'Version' );
		$css_path      = '/css/theme.min.css';
		$css_rtl_path  = '/css/theme-rtl.min.css';

		if ( is_rtl() ) {
			$css_version = $theme_version . '.' . filemtime( get_template_directory() . $css_rtl_path );
			wp_enqueue_style( 'understrap-styles-rtl', get_template_directory_uri() . $css_rtl_path, array(), $css_version );
		} else {
			$css_version = $theme_version . '.' . filemtime( get_template_directory() . $css_path );
			wp_enqueue_style( 'understrap-styles', get_template_directory_uri() . $css_path, array(), $css_version );
		}

		wp_enqueue_script( 'jquery' );

		$js_version = $theme_version . '.' . filemtime( get_template_directory() . '/js/theme.min.js' );
		wp_enqueue_script( 'understrap-scripts', get_template_directory_uri() . '/js/theme.min.js', array(), $js_version, true );
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
} // endif function_exists( 'understrap_scripts' ).

add_action( 'wp_enqueue_scripts', 'understrap_scripts' );
