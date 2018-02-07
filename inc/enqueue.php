<?php
/**
 * Befluid enqueue scripts
 *
 * @package befluid
 */

if ( ! function_exists( 'befluid_scripts' ) ) {
	/**
	 * Load theme's JavaScript sources.
	 */
	function befluid_scripts() {
		// Get the theme data.
		$the_theme = wp_get_theme();
		wp_enqueue_style( 'befluid-styles', get_stylesheet_directory_uri() . '/css/theme.min.css', array(), $the_theme->get( 'Version' ), false );
		wp_enqueue_script( 'jquery');
		wp_enqueue_script( 'popper-scripts', get_template_directory_uri() . '/js/popper.min.js', array(), true);
		wp_enqueue_script( 'befluid-scripts', get_template_directory_uri() . '/js/theme.min.js', array(), $the_theme->get( 'Version' ), true );
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
} // endif function_exists( 'befluid_scripts' ).

add_action( 'wp_enqueue_scripts', 'befluid_scripts' );
