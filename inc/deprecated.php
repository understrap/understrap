<?php
/**
 * Rest in peace
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_slbd_count_widgets' ) ) {
	/**
	 * Count number of widgets in a sidebar
	 * Used to add classes to widget areas so widgets can be displayed one, two, three or four per row
	 *
	 * @param int $sidebar_id The ID of the sidebar.
	 * @deprecated 0.8.9
	 */
	function understrap_slbd_count_widgets( $sidebar_id ) {
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
