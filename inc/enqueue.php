<?php
/**
 * Understrap enqueue scripts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_scripts' ) ) {
	/**
	 * Load theme's JavaScript and CSS sources.
	 */
	function understrap_scripts() {
		// Get the theme data.
		$the_theme         = wp_get_theme();
		$theme_version     = $the_theme->get( 'Version' );
		$bootstrap_version = understrap_get_bootstrap_version();
		$suffix            = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		$is_bootstrap6 = 'bootstrap6' === $bootstrap_version;
		$asset_name    = $is_bootstrap6 ? 'theme-bootstrap6' : 'theme';
		$theme_styles  = "/css/{$asset_name}{$suffix}.css";
		$theme_scripts = "/js/{$asset_name}{$suffix}.js";

		$css_version = $theme_version . '.' . filemtime( get_template_directory() . $theme_styles );
		wp_enqueue_style( 'understrap-styles', get_template_directory_uri() . $theme_styles, array(), $css_version );

		if ( ! $is_bootstrap6 && is_admin_bar_showing() ) {
			understrap_offcanvas_admin_bar_inline_styles();
		}

		wp_enqueue_script( 'jquery' );

		$js_version = $theme_version . '.' . filemtime( get_template_directory() . $theme_scripts );
		wp_enqueue_script( 'understrap-scripts', get_template_directory_uri() . $theme_scripts, array(), $js_version, true );

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
} // End of if function_exists( 'understrap_scripts' ).

add_action( 'wp_enqueue_scripts', 'understrap_scripts' );

/**
 * Load the Bootstrap 6 entry point as a module while retaining the script
 * handle used by child themes and compatibility with older WordPress versions.
 *
 * @param string $tag    Script tag.
 * @param string $handle Script handle.
 * @return string
 */
function understrap_bootstrap6_script_tag( $tag, $handle ) {
	if ( 'understrap-scripts' !== $handle || 'bootstrap6' !== understrap_get_bootstrap_version() ) {
		return $tag;
	}

	$module_tag = preg_replace_callback(
		'/<script\b(?=[^>]*\ssrc\s*=)[^>]*>/i',
		'understrap_set_module_script_type',
		$tag,
		1
	);
	return null === $module_tag ? $tag : $module_tag;
}
add_filter( 'script_loader_tag', 'understrap_bootstrap6_script_tag', 10, 2 );

/**
 * Set the type on the external script without changing adjacent inline scripts.
 *
 * @param array $matches Matched script opening tag.
 * @return string
 */
function understrap_set_module_script_type( $matches ) {
	$attributes = preg_replace( '/\s+type\s*=\s*(["\'])[^"\']*\1/i', '', substr( $matches[0], 7, -1 ), 1 );
	return '<script type="module"' . $attributes . '>';
}

if ( ! function_exists( 'understrap_offcanvas_admin_bar_inline_styles' ) ) {
	/**
	 * Add inline styles for the offcanvas component if the admin bar is visible.
	 *
	 * Fixes that the offcanvas close icon is hidden behind the admin bar.
	 *
	 * @since 1.2.0
	 */
	function understrap_offcanvas_admin_bar_inline_styles() {
		$navbar_type = get_theme_mod( 'understrap_navbar_type', 'collapse' );
		if ( 'offcanvas' !== $navbar_type ) {
			return;
		}

		$css = '
		body.admin-bar .offcanvas.show  {
			margin-top: 32px;
		}
		@media screen and ( max-width: 782px ) {
			body.admin-bar .offcanvas.show {
				margin-top: 46px;
			}
		}';
		wp_add_inline_style( 'understrap-styles', $css );
	}
}
