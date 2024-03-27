<?php
/**
 * Declaring widgets
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_add_widget_categories_class' ) ) {
	/**
	 * Adds Bootstrap class to select tag in the Categories widget.
	 *
	 * @since 1.2.0
	 *
	 * @param array $cat_args An array of Categories widget drop-down arguments.
	 * @return array The filtered array of Categories widget drop-down arguments.
	 */
	function understrap_add_widget_categories_class( $cat_args ) {

		if ( isset( $cat_args['class'] ) ) {
			$cat_args['class'] .= ' ' . understrap_get_select_control_class();
		} else {
			$cat_args['class'] = understrap_get_select_control_class();
		}

		return $cat_args;
	}
}
add_filter( 'widget_categories_dropdown_args', 'understrap_add_widget_categories_class' );

if ( ! function_exists( 'understrap_add_block_widget_categories_class' ) ) {
	/**
	 * Adds Bootstrap class to select tag in the Categories block widget.
	 *
	 * @since 1.2.0
	 *
	 * @param string $output      The taxonomy drop-down HTML output.
	 * @param array  $parsed_args Arguments used to build the drop-down.
	 * @return string The filtered taxonomy drop-down HTML output.
	 */
	function understrap_add_block_widget_categories_class( $output, $parsed_args ) {
		$class = understrap_get_select_control_class();

		if ( isset( $parsed_args['class'] ) && ! empty( $parsed_args['class'] ) ) {
			$search  = array(
				"class=\"{$parsed_args['class']}\"",
				"class='{$parsed_args['class']}'",
			);
			$replace = array(
				"class=\"{$parsed_args['class']} {$class}\"",
				"class=\"{$parsed_args['class']} {$class}\"",
			);
		} else {
			$search  = '<select';
			$replace = "<select class=\"{$class}\"";
		}

		return str_replace( $search, $replace, $output );
	}
}
add_filter( 'wp_dropdown_cats', 'understrap_add_block_widget_categories_class', 10, 2 );

if ( ! function_exists( 'understrap_add_block_widget_archives_classes' ) ) {
	/**
	 * Adds Bootstrap class to select tag in the Archives widget.
	 *
	 * @since 1.2.0
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string The filtered block content.
	 */
	function understrap_add_block_widget_archives_classes( $block_content, $block ) {

		if ( isset( $block['attrs']['displayAsDropdown'] ) && true === $block['attrs']['displayAsDropdown'] ) {
			return str_replace(
				'<select',
				'<select class="' . understrap_get_select_control_class() . '"',
				$block_content
			);
		}
		return $block_content;
	}
}
add_filter( 'render_block_core/archives', 'understrap_add_block_widget_archives_classes', 10, 2 );

if ( ! function_exists( 'understrap_add_block_widget_search_classes' ) ) {
	/**
	 * Adds Bootstrap classes to search block widget.
	 *
	 * @since 1.2.0
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string The filtered block content.
	 */
	function understrap_add_block_widget_search_classes( $block_content, $block ) {

		$search  = array(
			'wp-block-search__input ',
			'wp-block-search__input"',
			'wp-block-search__button ',
		);
		$replace = array(
			'wp-block-search__input form-control ',
			'wp-block-search__input form-control"',
			'wp-block-search__button btn btn-primary ',
		);

		if ( isset( $block['attrs']['buttonPosition'] ) && 'button-inside' === $block['attrs']['buttonPosition'] ) {
			$search[]  = 'wp-block-search__inside-wrapper';
			$replace[] = 'wp-block-search__inside-wrapper input-group';

			if ( 'bootstrap4' === get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' ) ) {
				$search[]  = '<button';
				$search[]  = '</button>';
				$replace[] = '<div class="input-group-append"><button';
				$replace[] = '</button></div>';
			}
		}

		return str_replace( $search, $replace, $block_content );
	}
}
add_filter( 'render_block_core/search', 'understrap_add_block_widget_search_classes', 10, 2 );

/**
 * Add active class to first item of carousel hero widget area.
 *
 * @since 1.2.0
 *
 * @param array $params {
 *     Parameters passed to a widget’s display callback.
 *
 *     @type array $args  {
 *         An array of widget display arguments.
 *
 *         @type string $name          Name of the sidebar the widget is assigned to.
 *         @type string $id            ID of the sidebar the widget is assigned to.
 *         @type string $description   The sidebar description.
 *         @type string $class         CSS class applied to the sidebar container.
 *         @type string $before_widget HTML markup to prepend to each widget in the sidebar.
 *         @type string $after_widget  HTML markup to append to each widget in the sidebar.
 *         @type string $before_title  HTML markup to prepend to the widget title when displayed.
 *         @type string $after_title   HTML markup to append to the widget title when displayed.
 *         @type string $widget_id     ID of the widget.
 *         @type string $widget_name   Name of the widget.
 *     }
 *     @type array $widget_args {
 *         An array of multi-widget arguments.
 *
 *         @type int $number Number increment used for multiples of the same widget.
 *     }
 * }
 * @return array Maybe filtered parameters.
 */
function understrap_hero_active_carousel_item( $params ) {
	if (
		! isset( $params[0] )
		|| ! isset( $params[0]['id'] )
		|| 'hero' !== $params[0]['id']
	) {
		return $params;
	}

	static $item_number = 1;
	if (
		1 === $item_number
		&& isset( $params[0]['before_widget'] )
		&& is_string( $params[0]['before_widget'] )
	) {
		$params[0]['before_widget'] = str_replace(
			'carousel-item',
			'carousel-item active',
			$params[0]['before_widget']
		);
	}
	$item_number++;

	return $params;
}
add_filter( 'dynamic_sidebar_params', 'understrap_hero_active_carousel_item' );

/**
 * Add filter to the parameters passed to a widget's display callback.
 * The filter is evaluated on both the front and the back end!
 *
 * @link https://developer.wordpress.org/reference/hooks/dynamic_sidebar_params/
 */
add_filter( 'dynamic_sidebar_params', 'understrap_widget_classes' );

if ( ! function_exists( 'understrap_widget_classes' ) ) {

	/**
	 * Count number of visible widgets in a sidebar and add classes to widgets accordingly,
	 * so widgets can be displayed one, two, three or four per row.
	 *
	 * @global array $sidebars_widgets
	 *
	 * @param array $params {
	 *     Parameters passed to a widget’s display callback.
	 *
	 *     @type array $args  {
	 *         An array of widget display arguments.
	 *
	 *         @type string $name          Name of the sidebar the widget is assigned to.
	 *         @type string $id            ID of the sidebar the widget is assigned to.
	 *         @type string $description   The sidebar description.
	 *         @type string $class         CSS class applied to the sidebar container.
	 *         @type string $before_widget HTML markup to prepend to each widget in the sidebar.
	 *         @type string $after_widget  HTML markup to append to each widget in the sidebar.
	 *         @type string $before_title  HTML markup to prepend to the widget title when displayed.
	 *         @type string $after_title   HTML markup to append to the widget title when displayed.
	 *         @type string $widget_id     ID of the widget.
	 *         @type string $widget_name   Name of the widget.
	 *     }
	 *     @type array $widget_args {
	 *         An array of multi-widget arguments.
	 *
	 *         @type int $number Number increment used for multiples of the same widget.
	 *     }
	 * }
	 * @return array Maybe filtered parameters.
	 */
	function understrap_widget_classes( $params ) {

		global $sidebars_widgets;

		/*
		 * When the corresponding filter is evaluated on the front end
		 * this takes into account that there might have been made other changes.
		 */
		$sidebars_widgets_count = apply_filters( 'sidebars_widgets', $sidebars_widgets );

		// Only apply changes if sidebar ID is set and the widget's classes depend on the number of widgets in the sidebar.
		if ( isset( $params[0]['id'] ) && strpos( $params[0]['before_widget'], 'dynamic-classes' ) ) {
			$sidebar_id   = $params[0]['id'];
			$widget_count = count( $sidebars_widgets_count[ $sidebar_id ] );

			$widget_classes = 'widget-count-' . $widget_count;
			if ( 0 === $widget_count % 4 || $widget_count > 6 ) {
				// Four widgets per row if there are exactly four or more than six widgets.
				$widget_classes .= ' col-md-3';
			} elseif ( 6 === $widget_count ) {
				// If exactly six widgets are published.
				$widget_classes .= ' col-md-2';
			} elseif ( $widget_count >= 3 ) {
				// Three widgets per row if there's three or more widgets.
				$widget_classes .= ' col-md-4';
			} elseif ( 2 === $widget_count ) {
				// If two widgets are published.
				$widget_classes .= ' col-md-6';
			} elseif ( 1 === $widget_count ) {
				// If just on widget is active.
				$widget_classes .= ' col-md-12';
			}

			// Replace the placeholder class 'dynamic-classes' with the classes stored in $widget_classes.
			$params[0]['before_widget'] = str_replace( 'dynamic-classes', $widget_classes, $params[0]['before_widget'] );
		}

		return $params;

	}
} // End of if function_exists( 'understrap_widget_classes' ).

add_action( 'widgets_init', 'understrap_widgets_init' );

if ( ! function_exists( 'understrap_widgets_init' ) ) {
	/**
	 * Initializes themes widgets.
	 */
	function understrap_widgets_init() {
		register_sidebar(
			array(
				/* translators: Widget area title */
				'name'          => __( 'Right Sidebar', 'understrap' ),
				'id'            => 'right-sidebar',
				'description'   => __( 'Right sidebar widget area', 'understrap' ),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);

		register_sidebar(
			array(
				/* translators: Widget area title */
				'name'          => __( 'Left Sidebar', 'understrap' ),
				'id'            => 'left-sidebar',
				'description'   => __( 'Left sidebar widget area', 'understrap' ),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);

		register_sidebar(
			array(
				/* translators: Widget area title */
				'name'          => __( 'Hero Slider', 'understrap' ),
				'id'            => 'hero',
				'description'   => __( 'Hero slider area. Place two or more widgets here and they will slide!', 'understrap' ),
				'before_widget' => '<div class="carousel-item">',
				'after_widget'  => '</div>',
				'before_title'  => '',
				'after_title'   => '',
			)
		);

		register_sidebar(
			array(
				/* translators: Widget area title */
				'name'          => __( 'Hero Canvas', 'understrap' ),
				'id'            => 'herocanvas',
				'description'   => __( 'Full size canvas hero area for Bootstrap and other custom HTML markup', 'understrap' ),
				'before_widget' => '',
				'after_widget'  => '',
				'before_title'  => '',
				'after_title'   => '',
			)
		);

		register_sidebar(
			array(
				/* translators: Widget area title */
				'name'          => __( 'Top Full', 'understrap' ),
				'id'            => 'statichero',
				'description'   => __( 'Full top widget with dynamic grid', 'understrap' ),
				'before_widget' => '<div id="%1$s" class="static-hero-widget %2$s dynamic-classes">',
				'after_widget'  => '</div><!-- .static-hero-widget -->',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);

		register_sidebar(
			array(
				/* translators: Widget area title */
				'name'          => __( 'Footer Full', 'understrap' ),
				'id'            => 'footerfull',
				'description'   => __( 'Full sized footer widget with dynamic grid', 'understrap' ),
				'before_widget' => '<div id="%1$s" class="footer-widget %2$s dynamic-classes">',
				'after_widget'  => '</div><!-- .footer-widget -->',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);

	}
} // End of function_exists( 'understrap_widgets_init' ).
