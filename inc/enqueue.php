<?php
/**
 * Understrap enqueue scripts
 *
 * @package understrap
 */

if ( ! function_exists( 'understrap_scripts' ) ) {
	/**
	 * Load theme's JavaScript sources.
	 */
	function understrap_scripts() {
		wp_enqueue_style( 'understrap-styles', get_stylesheet_directory_uri() . '/css/theme.min.css', array(),
		'0.5.0' );
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'understrap-scripts', get_template_directory_uri() . '/js/theme.min.js', array(), '0.5.0',
		true );

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		// menu - vertical page association
		// do not load on WooCommerce pages
		// do not load if we are in WooCommerce pages.
		$loadit = true;
		if ( class_exists( 'WooCommerce' ) ) {
			if ( is_woocommerce() ) {
				$loadit = false;
			}
		}
		if ( is_page_template( ( 'page-templates/vertical-one-page.php' ) || is_home() || is_single() ) && $loadit ) {
			wp_enqueue_script( 'vertical-one-page', get_template_directory_uri() . '/js/vertical-one-page.js',
			array( 'jquery' ), '0.5.0', true );
			$page_for_posts = strtolower( get_the_title( get_option( 'page_for_posts' ) ) );
			$home_url       = home_url();
			$is_single      = is_single();
			$vars           = array(
				'pageForPosts' => $page_for_posts,
				'homeUrl'      => $home_url,
				'isSingle'     => $is_single,
			);
			wp_localize_script( 'vertical-one-page', 'vars', $vars );
		}
		// menu - vertical page association end.
	}
} // endif function_exists( 'understrap_scripts' ).

add_action( 'wp_enqueue_scripts', 'understrap_scripts' );

/**
 *Loading slider script conditionally
 */

if ( is_active_sidebar( 'hero' ) ) :
	add_action( 'wp_enqueue_scripts', 'understrap_slider' );

	if ( ! function_exists( 'understrap_slider' ) ) {
		/**
		 * Setup slider.
		 */
		function understrap_slider() {
			if ( is_front_page() ) {
				$data = array(
					'timeout' => intval( get_theme_mod( 'understrap_theme_slider_time_setting', 5000 ) ),
					'items'   => intval( get_theme_mod( 'understrap_theme_slider_count_setting', 1 ) ),
				);

				wp_enqueue_script( 'understrap-slider-script',
				get_stylesheet_directory_uri() . '/js/slider_settings.js', array(), '0.5.0' );
				wp_localize_script( 'understrap-slider-script', 'understrap_slider_variables', $data );
			}
		}
	}
endif;

