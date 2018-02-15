<?php
/**
 * Check and setup theme's default settings
 *
 * @package befluid
 *
 */

if ( ! function_exists( 'befluid_setup_theme_default_settings' ) ) :
	function befluid_setup_theme_default_settings() {

		// check if settings are set, if not set defaults.
		// Caution: DO NOT check existence using === always check with == .
		// Latest blog posts style.
		$befluid_posts_index_style = get_theme_mod( 'befluid_posts_index_style' );
		if ( '' == $befluid_posts_index_style ) {
			set_theme_mod( 'befluid_posts_index_style', 'default' );
		}

		// Sidebar position.
		$befluid_sidebar_position = get_theme_mod( 'befluid_sidebar_position' );
		if ( '' == $befluid_sidebar_position ) {
			set_theme_mod( 'befluid_sidebar_position', 'right' );
		}

		// Container width.
		$befluid_container_type = get_theme_mod( 'befluid_container_type' );
		if ( '' == $befluid_container_type ) {
			set_theme_mod( 'befluid_container_type', 'container' );
		}
	}
endif;
