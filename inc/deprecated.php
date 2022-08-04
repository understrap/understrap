<?php
/**
 * Rest in peace
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_kses_title' ) ) {
	/*
	 * Throw a deprecation notice if the function is not defined but used by
	 * the child theme.
	 */

	/**
	 * Sanitizes data for allowed HTML tags for post title.
	 *
	 * @param string $data Post title to filter.
	 * @return string Filtered post title with allowed HTML tags and attributes intact.
	 *
	 * @deprecated 1.2.0 Replaced with `wp_kses_post()`.
	 */
	function understrap_kses_title( $data ) {

		_deprecated_function( 'understrap_kses_title', '1.2.0' );

		global $allowedposttags;
		if ( is_array( $allowedposttags ) ) {
			$allowed_tags = apply_filters_deprecated( 'understrap_kses_title', $allowedposttags, '1.2.0' );
			return wp_kses( $data, $allowed_tags );
		}


		return wp_kses_post( $data );
	}
} // End of if function_exists( 'understrap_kses_title' ).

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

/**
 * This function has never existed in any of the templates. It serves to extract
 * strings for translations which have been removed or changed and may still be
 * be present in child themes. The corresponding translations are not maintained.
 */
function deprecated_translations() {
	array(
		__( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'understrap' ),
		__( 'Previous', 'understrap' ),
		__( 'Next', 'understrap' ),
		__( 'About:', 'understrap' ),
		__( 'Profile', 'understrap' ),
		__( 'Posts by', 'understrap' ),
		__( 'Permanent Link:', 'understrap' ),
		__( 'in', 'understrap' ),
		__( 'Edit', 'understrap' ),
	);
}
