<?php
/**
 * Befluid Theme Customizer
 *
 * @package befluid
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
if ( ! function_exists( 'befluid_customize_register' ) ) {
	/**
	 * Register basic customizer support.
	 *
	 * @param object $wp_customize Customizer reference.
	 */
	function befluid_customize_register( $wp_customize ) {
		$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
		$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
		$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
	}
}
add_action( 'customize_register', 'befluid_customize_register' );

if ( ! function_exists( 'befluid_theme_customize_register' ) ) {
	/**
	 * Register individual settings through customizer's API.
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer reference.
	 */
	function befluid_theme_customize_register( $wp_customize ) {

		// Theme layout settings.
		$wp_customize->add_section( 'befluid_theme_layout_options', array(
			'title'       => __( 'Theme Layout Settings', 'befluid' ),
			'capability'  => 'edit_theme_options',
			'description' => __( 'Container width and sidebar defaults', 'befluid' ),
			'priority'    => 160,
		) );

		 //select sanitization function
        function befluid_theme_slug_sanitize_select( $input, $setting ){
         
            //input must be a slug: lowercase alphanumeric characters, dashes and underscores are allowed only
            $input = sanitize_key($input);
 
            //get the list of possible select options 
            $choices = $setting->manager->get_control( $setting->id )->choices;
                             
            //return input if valid or return default option
            return ( array_key_exists( $input, $choices ) ? $input : $setting->default );                
             
        }

		$wp_customize->add_setting( 'befluid_container_type', array(
			'default'           => 'container',
			'type'              => 'theme_mod',
			'sanitize_callback' => 'befluid_theme_slug_sanitize_select',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'befluid_container_type', array(
					'label'       => __( 'Container Width', 'befluid' ),
					'description' => __( "Choose between Bootstrap's container and container-fluid", 'befluid' ),
					'section'     => 'befluid_theme_layout_options',
					'settings'    => 'befluid_container_type',
					'type'        => 'select',
					'choices'     => array(
						'container'       => __( 'Fixed width container', 'befluid' ),
						'container-fluid' => __( 'Full width container', 'befluid' ),
					),
					'priority'    => '10',
				)
			) );

		$wp_customize->add_setting( 'befluid_sidebar_position', array(
			'default'           => 'right',
			'type'              => 'theme_mod',
			'sanitize_callback' => 'sanitize_text_field',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'befluid_sidebar_position', array(
					'label'       => __( 'Sidebar Positioning', 'befluid' ),
					'description' => __( "Set sidebar's default position. Can either be: right, left, both or none. Note: this can be overridden on individual pages.",
					'befluid' ),
					'section'     => 'befluid_theme_layout_options',
					'settings'    => 'befluid_sidebar_position',
					'type'        => 'select',
					'sanitize_callback' => 'befluid_theme_slug_sanitize_select',
					'choices'     => array(
						'right' => __( 'Right sidebar', 'befluid' ),
						'left'  => __( 'Left sidebar', 'befluid' ),
						'both'  => __( 'Left & Right sidebars', 'befluid' ),
						'none'  => __( 'No sidebar', 'befluid' ),
					),
					'priority'    => '20',
				)
			) );
	}
} // endif function_exists( 'befluid_theme_customize_register' ).
add_action( 'customize_register', 'befluid_theme_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
if ( ! function_exists( 'befluid_customize_preview_js' ) ) {
	/**
	 * Setup JS integration for live previewing.
	 */
	function befluid_customize_preview_js() {
		wp_enqueue_script( 'befluid_customizer', get_template_directory_uri() . '/js/customizer.js',
			array( 'customize-preview' ), '20130508', true );
	}
}
add_action( 'customize_preview_init', 'befluid_customize_preview_js' );
