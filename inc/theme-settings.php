<?php
/**
 * Check and setup theme's default settings
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_setup_theme_default_settings' ) ) {
	/**
	 * Store default theme settings in database.
	 */
	function understrap_setup_theme_default_settings() {
		$defaults = understrap_get_theme_default_settings();
		$settings = get_theme_mods();
		foreach ( $defaults as $setting_id => $default_value ) {
			// Check if setting is set, if not set it to its default value.
			if ( ! isset( $settings[ $setting_id ] ) ) {
				set_theme_mod( $setting_id, $default_value );
			}
		}
	}
}

if ( ! function_exists( 'understrap_get_theme_default_settings' ) ) {
	/**
	 * Retrieve default theme settings.
	 *
	 * @return array
	 */
	function understrap_get_theme_default_settings() {
		$defaults = array(
			'understrap_posts_index_style' => 'default',   // Latest blog posts style.
			'understrap_sidebar_position'  => 'right',     // Sidebar position.
			'understrap_container_type'    => 'container', // Container width.
		);

		/**
		 * Filters the default theme settings.
		 *
		 * @param array $defaults Array of default theme settings.
		 */
		return apply_filters( 'understrap_theme_default_settings', $defaults );
	}
}

if ( ! function_exists( 'understrap_get_bootstrap_version' ) ) {
	/**
	 * Retrieve the selected Bootstrap version, defaulting to Bootstrap 5.
	 *
	 * @return string
	 */
	function understrap_get_bootstrap_version() {
		return understrap_normalize_bootstrap_version( get_theme_mod( 'understrap_bootstrap_version', 'bootstrap5' ) );
	}
}

if ( ! function_exists( 'understrap_normalize_bootstrap_version' ) ) {
	/**
	 * Map retired or unrecognized Bootstrap settings to Bootstrap 5.
	 *
	 * @param string $version Stored Bootstrap version.
	 * @return string
	 */
	function understrap_normalize_bootstrap_version( $version ) {
		return 'bootstrap6' === $version ? 'bootstrap6' : 'bootstrap5';
	}
}
add_filter( 'theme_mod_understrap_bootstrap_version', 'understrap_normalize_bootstrap_version' );
