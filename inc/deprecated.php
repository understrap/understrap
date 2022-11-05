<?php
/**
 * Rest in peace
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_theme_slug_sanitize_select' ) ) {
	/**
	 * Sanitize select.
	 *
	 * @deprecated 1.2.0 Use understrap_customize_sanitize_select()
	 * @see understrap_customize_sanitize_select()
	 *
	 * @since 0.6.11
	 *
	 * @param string               $input   Slug to sanitize.
	 * @param WP_Customize_Setting $setting Setting instance.
	 * @return string|bool Sanitized slug if it is a valid choice; the setting default for
	 *                     invalid choices and false in all other cases.
	 */
	function understrap_theme_slug_sanitize_select( $input, $setting ) {
		_deprecated_function( __FUNCTION__, '1.2.0', 'understrap_customize_sanitize_select' );
		return understrap_customize_sanitize_select( $input, $setting );
	}
}

if ( ! function_exists( 'understrap_adjust_body_class' ) ) {
	/**
	 * Setup body classes.
	 *
	 * @param array $classes CSS classes.
	 *
	 * @deprecated 0.9.4 Styling of tag has been removed in Bootstrap v4 Alpha 6.
	 * @link https://github.com/twbs/bootstrap/issues/20939
	 */
	function understrap_adjust_body_class( $classes ) {
		_deprecated_function( 'understrap_adjust_body_class', '0.9.4' );
		return $classes;
	}
}

if ( ! function_exists( 'understrap_slbd_count_widgets' ) ) {
	/**
	 * Count number of widgets in a sidebar
	 * Used to add classes to widget areas so widgets can be displayed one, two, three or four per row
	 *
	 * @param int $sidebar_id The ID of the sidebar.
	 * @deprecated 0.8.9
	 */
	function understrap_slbd_count_widgets( $sidebar_id ) {

		_deprecated_function( 'understrap_slbd_count_widgets', '0.8.9', 'understrap_widget_classes' );

		// If loading from front page, consult $_wp_sidebars_widgets rather than options
		// to see if wp_convert_widget_settings() has made manipulations in memory.
		global $_wp_sidebars_widgets;
		if ( empty( $_wp_sidebars_widgets ) ) :
			$_wp_sidebars_widgets = get_option( 'sidebars_widgets', array() ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		endif;
		$sidebars_widgets_count = $_wp_sidebars_widgets;
		if ( isset( $sidebars_widgets_count[ $sidebar_id ] ) ) :
			$widget_count   = count( $sidebars_widgets_count[ $sidebar_id ] );
			$widget_classes = 'widget-count-' . count( $sidebars_widgets_count[ $sidebar_id ] );
			if ( 0 == $widget_count % 4 || $widget_count > 6 ) : // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
				// Four widgets per row if there are exactly four or more than six.
				$widget_classes .= ' col-md-3';
			elseif ( 6 == $widget_count ) : // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
				// If two widgets are published.
				$widget_classes .= ' col-md-2';
			elseif ( $widget_count >= 3 ) :
				// Three widgets per row if there's three or more widgets.
				$widget_classes .= ' col-md-4';
			elseif ( 2 == $widget_count ) : // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
				// If two widgets are published.
				$widget_classes .= ' col-md-6';
			elseif ( 1 == $widget_count ) : // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
				// If just on widget is active.
				$widget_classes .= ' col-md-12';
			endif;
			return $widget_classes;
		endif;
	}
}
