<?php
/**
 * Understrap Theme Customizer
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_customize_register' ) ) {
	/**
	 * Register basic support (site title, description, header text color) for the Theme Customizer.
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer reference.
	 */
	function understrap_customize_register( $wp_customize ) {
		$settings = array( 'blogname', 'blogdescription', 'header_textcolor' );
		foreach ( $settings as $setting ) {
			$get_setting = $wp_customize->get_setting( $setting );
			if ( $get_setting instanceof WP_Customize_Setting ) {
				$get_setting->transport = 'postMessage';
			}
		}
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
		$wp_customize->add_section(
			'understrap_theme_layout_options',
			array(
				'title'       => __( 'Theme Layout Settings', 'understrap' ),
				'capability'  => 'edit_theme_options',
				'description' => __( 'Container width and sidebar defaults', 'understrap' ),
				'priority'    => apply_filters( 'understrap_theme_layout_options_priority', 160 ),
			)
		);

		$wp_customize->add_setting(
			'understrap_bootstrap_version',
			array(
				'default'           => 'bootstrap4',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'sanitize_text_field',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_bootstrap_version',
				array(
					'label'       => __( 'Bootstrap Version', 'understrap' ),
					'description' => __( 'Choose between Bootstrap 4 or Bootstrap 5', 'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'type'        => 'select',
					'choices'     => array(
						'bootstrap4' => __( 'Bootstrap 4', 'understrap' ),
						'bootstrap5' => __( 'Bootstrap 5', 'understrap' ),
					),
					'priority'    => apply_filters( 'understrap_bootstrap_version_priority', 10 ),
				)
			)
		);

		$wp_customize->add_setting(
			'understrap_container_type',
			array(
				'default'           => 'container',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'understrap_customize_sanitize_select',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_container_type',
				array(
					'label'       => __( 'Container Width', 'understrap' ),
					'description' => __( 'Choose between Bootstrap\'s container and container-fluid', 'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'type'        => 'select',
					'choices'     => array(
						'container'       => __( 'Fixed width container', 'understrap' ),
						'container-fluid' => __( 'Full width container', 'understrap' ),
					),
					'priority'    => apply_filters( 'understrap_container_type_priority', 10 ),
				)
			)
		);

		$wp_customize->add_setting(
			'understrap_navbar_type',
			array(
				'default'           => 'collapse',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'sanitize_text_field',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_navbar_type',
				array(
					'label'             => __( 'Responsive Navigation Type', 'understrap' ),
					'description'       => __(
						'Choose between an expanding and collapsing navbar or an offcanvas drawer.',
						'understrap'
					),
					'section'           => 'understrap_theme_layout_options',
					'type'              => 'select',
					'sanitize_callback' => 'understrap_customize_sanitize_select',
					'choices'           => array(
						'collapse'  => __( 'Collapse', 'understrap' ),
						'offcanvas' => __( 'Offcanvas', 'understrap' ),
					),
					'priority'          => apply_filters( 'understrap_navbar_type_priority', 20 ),
				)
			)
		);

		$wp_customize->add_setting(
			'understrap_sidebar_position',
			array(
				'default'           => 'right',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'sanitize_text_field',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_sidebar_position',
				array(
					'label'             => __( 'Sidebar Positioning', 'understrap' ),
					'description'       => __(
						'Set sidebar\'s default position. Can either be: right, left, both or none. Note: this can be overridden on individual pages.',
						'understrap'
					),
					'section'           => 'understrap_theme_layout_options',
					'type'              => 'select',
					'sanitize_callback' => 'understrap_customize_sanitize_select',
					'choices'           => array(
						'right' => __( 'Right sidebar', 'understrap' ),
						'left'  => __( 'Left sidebar', 'understrap' ),
						'both'  => __( 'Left & Right sidebars', 'understrap' ),
						'none'  => __( 'No sidebar', 'understrap' ),
					),
					'priority'          => apply_filters( 'understrap_sidebar_position_priority', 20 ),
				)
			)
		);

		$wp_customize->add_setting(
			'understrap_site_info_override',
			array(
				'default'           => '',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'wp_kses_post',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_site_info_override',
				array(
					'label'       => __( 'Footer Site Info', 'understrap' ),
					'description' => __( 'Override Understrap\'s site info located at the footer of the page.', 'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'type'        => 'textarea',
					'priority'    => 20,
				)
			)
		);

	}
} // End of if function_exists( 'understrap_theme_customize_register' ).
add_action( 'customize_register', 'understrap_theme_customize_register' );

if ( ! function_exists( 'understrap_customize_sanitize_select' ) ) {
	/**
	 * Sanitize select.
	 *
	 * @param string               $input   Slug to sanitize.
	 * @param WP_Customize_Setting $setting Setting instance.
	 * @return string|bool Sanitized slug if it is a valid choice; the setting default for
	 *                     invalid choices and false in all other cases.
	 */
	function understrap_customize_sanitize_select( $input, $setting ) {

		// Ensure input is a slug (lowercase alphanumeric characters, dashes and underscores are allowed only).
		$input = sanitize_key( $input );

		$control = $setting->manager->get_control( $setting->id );
		if ( ! $control instanceof WP_Customize_Control ) {
			return false;
		}

		// Get the list of possible select options.
		$choices = $control->choices;

		// If the input is a valid key, return it; otherwise, return the default.
		return ( array_key_exists( $input, $choices ) ? $input : $setting->default );

	}
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
if ( ! function_exists( 'understrap_customize_preview_js' ) ) {
	/**
	 * Setup JS integration for live previewing.
	 */
	function understrap_customize_preview_js() {
		wp_enqueue_script(
			'understrap_customizer',
			get_template_directory_uri() . '/js/customizer.js',
			array( 'customize-preview' ),
			'20130508',
			true
		);
	}
}
add_action( 'customize_preview_init', 'understrap_customize_preview_js' );

/**
 * Loads javascript for conditionally showing customizer controls.
 */
if ( ! function_exists( 'understrap_customize_controls_js' ) ) {
	/**
	 * Setup JS integration for live previewing.
	 */
	function understrap_customize_controls_js() {
		wp_enqueue_script(
			'understrap_customizer',
			get_template_directory_uri() . '/js/customizer-controls.js',
			array( 'customize-preview' ),
			'20130508',
			true
		);
	}
}
add_action( 'customize_controls_enqueue_scripts', 'understrap_customize_controls_js' );

if ( ! function_exists( 'understrap_default_navbar_type' ) ) {
	/**
	 * Overrides the responsive navbar type for Bootstrap 4.
	 *
	 * @param string $current_mod Current navbar type.
	 * @return string
	 */
	function understrap_default_navbar_type( $current_mod ) {

		if ( 'bootstrap5' !== get_theme_mod( 'understrap_bootstrap_version' ) ) {
			$current_mod = 'collapse';
		}

		return $current_mod;
	}
}
add_filter( 'theme_mod_understrap_navbar_type', 'understrap_default_navbar_type', 20 );
