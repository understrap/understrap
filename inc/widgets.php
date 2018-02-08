<?php
/**
 * Declaring widgets
 *
 * @package befluid
 */

/**
 * Count number of widgets in a sidebar
 * Used to add classes to widget areas so widgets can be displayed one, two, three or four per row
 */
if ( ! function_exists( 'befluid_slbd_count_widgets' ) ) {
	function befluid_slbd_count_widgets( $sidebar_id ) {
		// If loading from front page, consult $_wp_sidebars_widgets rather than options
		// to see if wp_convert_widget_settings() has made manipulations in memory.
		global $_wp_sidebars_widgets;
		if ( empty( $_wp_sidebars_widgets ) ) :
			$_wp_sidebars_widgets = get_option( 'sidebars_widgets', array() );
		endif;

		$sidebars_widgets_count = $_wp_sidebars_widgets;

		if ( isset( $sidebars_widgets_count[ $sidebar_id ] ) ) :
			$widget_count = count( $sidebars_widgets_count[ $sidebar_id ] );
			$widget_classes = 'widget-count-' . count( $sidebars_widgets_count[ $sidebar_id ] );
			if ( $widget_count % 4 == 0 || $widget_count > 6 ) :
				// Four widgets per row if there are exactly four or more than six
				$widget_classes .= ' col-md-3';
			elseif ( 6 == $widget_count ) :
				// If two widgets are published
				$widget_classes .= ' col-md-2';
			elseif ( $widget_count >= 3 ) :
				// Three widgets per row if there's three or more widgets
				$widget_classes .= ' col-md-4';
			elseif ( 2 == $widget_count ) :
				// If two widgets are published
				$widget_classes .= ' col-md-6';
			elseif ( 1 == $widget_count ) :
				// If just on widget is active
				$widget_classes .= ' col-md-12';
			endif;
			return $widget_classes;
		endif;
	}
}

if ( ! function_exists( 'befluid_widgets_init' ) ) {
	/**
	 * Initializes themes widgets.
	 */
	function befluid_widgets_init() {
		register_sidebar( array(
			'name'          => __( 'Right Sidebar', 'befluid' ),
			'id'            => 'right-sidebar',
			'description'   => 'Right sidebar widget area',
			'before_widget' => '<aside id="%1$s" class="card widget %2$s mb-3">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="card-header d-block py-2 text-center h6 widget-title card-title">',
			'after_title'   => '</h3>',
		) );

		register_sidebar( array(
			'name'          => __( 'Left Sidebar', 'befluid' ),
			'id'            => 'left-sidebar',
			'description'   => 'Left sidebar widget area',
			'before_widget' => '<aside id="%1$s" class="card widget %2$s mb-3">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="card-header d-block py-2 text-center h6 widget-title card-title">',
			'after_title'   => '</h3>',
		) );

		register_sidebar( array(
			'name'          => __( 'Hero Slider', 'befluid' ),
			'id'            => 'hero',
			'description'   => 'Hero slider area. Place two or more widgets here and they will slide!',
			'before_widget' => '<div class="carousel-item">',
			'after_widget'  => '</div>',
			'before_title'  => '',
			'after_title'   => '',
		) );

		register_sidebar( array(
			'name'          => __( 'Hero Static', 'befluid' ),
			'id'            => 'statichero',
			'description'   => 'Static Hero widget. no slider functionallity',
		    'before_widget'  => '<div id="%1$s" class="static-hero-widget %2$s '. befluid_slbd_count_widgets( 'statichero' ) .'">',
		    'after_widget'   => '</div><!-- .static-hero-widget -->',
		    'before_title'   => '<h3 class="widget-title">',
		    'after_title'    => '</h3>',
		) );

		register_sidebar( array(
			'name'          => __( 'Footer Full', 'befluid' ),
			'id'            => 'footerfull',
			'description'   => 'Widget area below main content and above footer',
		    'before_widget'  => '<div id="%1$s" class="px-0 card footer-widget %2$s '. befluid_slbd_count_widgets( 'footerfull' ) .'">',
		    'after_widget'   => '</div><!-- .footer-widget -->',
				'before_title'  => '<h3 class="card-header d-block py-2 text-center h6 widget-title card-title">',
				'after_title'   => '</h3>',
		) );

	}
} // endif function_exists( 'befluid_widgets_init' ).
add_action( 'widgets_init', 'befluid_widgets_init' );

/**
 * Registers all of the default WordPress widgets on startup.
 *
 * Calls {@see 'widgets_init'} action after all of the WordPress widgets have been registered.
 *
 * @since 2.2.0
 */
function bs_widgets_init() {
	if ( ! is_blog_installed() ) {
		return;
	}
	register_widget( 'BS_Widget_Pages' );
	register_widget( 'BS_Widget_Calendar' );
	register_widget( 'BS_Widget_Archives' );
	if ( get_option( 'link_manager_enabled' ) ) {
		register_widget( 'BS_Widget_Links' );
	}
	register_widget( 'BS_Widget_Media_Audio' );
	register_widget( 'BS_Widget_Media_Image' );
	register_widget( 'BS_Widget_Media_Gallery' );
	register_widget( 'BS_Widget_Media_Video' );
	register_widget( 'BS_Widget_Meta' );
	register_widget( 'BS_Widget_Search' );
	register_widget( 'BS_Widget_Text' );
	register_widget( 'BS_Widget_Categories' );
	register_widget( 'BS_Widget_Recent_Posts' );
	register_widget( 'BS_Widget_Recent_Comments' );
	register_widget( 'BS_Widget_RSS' );
	register_widget( 'BS_Widget_Tag_Cloud' );
	register_widget( 'BS_Nav_Menu_Widget' );
	register_widget( 'BS_Widget_Custom_HTML' );
	/**
	 * Fires after all default WordPress widgets have been registered.
	 *
	 * @since 2.2.0
	 */
	do_action( 'widgets_init' );
}
