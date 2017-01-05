<?php
/**
 * Understrap Theme Customizer
 *
 * @package understrap
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
if ( ! function_exists( 'understrap_customize_register' ) ) {
	/**
	 * Register basic customizer support.
	 *
	 * @param object $wp_customize Customizer reference.
	 */
	function understrap_customize_register( $wp_customize ) {
		$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
		$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
		$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
	}
}
add_action( 'customize_register', 'understrap_customize_register' );

if ( ! function_exists( 'understrap_theme_customize_register' ) ) {
	/**
	 * Register individual settings through customizer's API.
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer reference.
	 */
	function understrap_theme_customize_register( $wp_customize ) {

		// Theme layout settings.
		$wp_customize->add_section( 'understrap_theme_layout_options', array(
			'title'       => __( 'Theme Layout Settings', 'understrap' ),
			'capability'  => 'edit_theme_options',
			'description' => __( 'Container width and sidebar defaults', 'understrap' ),
			'priority'    => 160,
		) );

		$wp_customize->add_setting( 'understrap_container_type', array(
			'default'           => 'container',
			'type'              => 'theme_mod',
			'sanitize_callback' => 'esc_textarea',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'container_type', array(
					'label'       => __( 'Container Width', 'understrap' ),
					'description' => __( "Choose between Bootstrap's container and container-fluid", 'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'settings'    => 'understrap_container_type',
					'type'        => 'select',
					'choices'     => array(
						'container'       => __( 'Fixed width container', 'understrap' ),
						'container-fluid' => __( 'Full width container', 'understrap' ),
					),
					'priority'    => '10',
				)
			) );

		$wp_customize->add_setting( 'understrap_sidebar_position', array(
			'default'           => 'right',
			'type'              => 'theme_mod',
			'sanitize_callback' => 'esc_textarea',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_sidebar_position', array(
					'label'       => __( 'Sidebar Positioning', 'understrap' ),
					'description' => __( "Set sidebar's position. Can either be: right, left, both or none",
					'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'settings'    => 'understrap_sidebar_position',
					'type'        => 'select',
					'choices'     => array(
						'right' => __( 'Right sidebar', 'understrap' ),
						'left'  => __( 'Left sidebar', 'understrap' ),
						'both'  => __( 'Left & Right sidebars', 'understrap' ),
						'none'  => __( 'No sidebar', 'understrap' ),
					),
					'priority'    => '20',
				)
			) );

		// How to display posts index page (home.php).
		$wp_customize->add_setting( 'understrap_posts_index_style', array(
			'default'           => 'default',
			'type'              => 'theme_mod',
			'sanitize_callback' => 'esc_textarea',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_posts_index_style', array(
					'label'       => __( 'Posts Index Style', 'understrap' ),
					'description' => __( 'Choose how to display latest posts', 'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'settings'    => 'understrap_posts_index_style',
					'type'        => 'select',
					'choices'     => array(
						'default' => __( 'Default', 'understrap' ),
						'masonry' => __( 'Masonry', 'understrap' ),
						'grid'    => __( 'Grid', 'understrap' ),
					),
					'priority'    => '30',
				)
			) );

		// Columns setup for grid posts.
		/**
		 * Function and callback to check when grid is enabled.
		 *
		 * @return bool
		 */
		function is_grid_enabled() {
			return 'grid' == get_theme_mod( 'understrap_posts_index_style' );
		}

		// How many columns to use each grid post.
		$wp_customize->add_setting( 'understrap_grid_post_columns', array(
			'default'    => '6',
			'type'       => 'theme_mod',
			'capability' => 'edit_theme_options',
			'transport'  => 'refresh',
			'sanitize_callback' => 'absint',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_grid_post_columns', array(
					'label'       => __( 'Grid Post Columns', 'understrap' ),
					'description' => __( 'Choose how many columns to use', 'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'settings'    => 'understrap_grid_post_columns',
					'type'        => 'select',
					'choices' => array(
					'6' => '2',
					'4' => '3',
					'3' => '4',
					'2' => '6',
					'12' => '1',
					),
					'default'     => 2,
					'priority'    => '30',
					'transport'   => 'refresh',
				)
			) );

		// hook to auto-hide/show depending the understrap_posts_index_style option.
		$wp_customize->get_control( 'understrap_grid_post_columns' )->active_callback = 'is_grid_enabled';

	}
} // endif function_exists( 'understrap_theme_customize_register' ).
add_action( 'customize_register', 'understrap_theme_customize_register' );


/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
if ( ! function_exists( 'understrap_customize_preview_js' ) ) {
	/**
	 * Setup JS integration for live previewing.
	 */
	function understrap_customize_preview_js() {
		wp_enqueue_script( 'understrap_customizer', get_template_directory_uri() . '/js/customizer.js',
			array( 'customize-preview' ), '20130508', true );
	}
}
add_action( 'customize_preview_init', 'understrap_customize_preview_js' );
