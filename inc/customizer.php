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

		// Theme text colors
		$wp_customize->add_setting( 'text_color', array(
			'default'		=> '',
			'type'			=> 'theme_mod',
			'transport'		=> 'postMessage',
			'capability'	=> 'edit_theme_options',
		) );
		
		$wp_customize->add_control(
			new WP_Customize_Color_Control( $wp_customize, 'text_color', array(
				'label'   => __( 'Text Color', 'understrap' ),
				'section' => 'colors',
				'settings'   => 'text_color',
				)
			) );

		$wp_customize->add_setting( 'primary_color', array(
			'default'		=> '',
			'type'			=> 'theme_mod',
			'transport'		=> 'postMessage',
			'capability'	=> 'edit_theme_options',
		) );
		
		$wp_customize->add_control(
			new WP_Customize_Color_Control( $wp_customize, 'primary_color', array(
				'label'   => __( 'Primary Color', 'understrap' ),
				'description'	=> 'Set up Bootstraps "Primary" color which affects links, buttons etc.',
				'section' => 'colors',
				'settings'   => 'primary_color',
				)
			) );

		$wp_customize->add_setting( 'primary_hover_color', array(
			'default'		=> '',
			'type'			=> 'theme_mod',
			'transport'		=> 'postMessage',
			'capability'	=> 'edit_theme_options',
		) );
		
		$wp_customize->add_control(
			new WP_Customize_Color_Control( $wp_customize, 'primary_hover_color', array(
				'label'   => __( 'Primary Hover Color', 'understrap' ),
				'section' => 'colors',
				'settings'   => 'primary_hover_color',
				)
			) );


		// Theme layout settings.
		$wp_customize->add_section( 'understrap_theme_layout_options', array(
			'title'       => __( 'Theme Layout Settings', 'understrap' ),
			'capability'  => 'edit_theme_options',
			'description' => __( 'Container width and sidebar defaults', 'understrap' ),
			'priority'    => 160,
		) );

		 //select sanitization function
        function understrap_theme_slug_sanitize_select( $input, $setting ){
         
            //input must be a slug: lowercase alphanumeric characters, dashes and underscores are allowed only
            $input = sanitize_key($input);
 
            //get the list of possible select options 
            $choices = $setting->manager->get_control( $setting->id )->choices;
                             
            //return input if valid or return default option
            return ( array_key_exists( $input, $choices ) ? $input : $setting->default );                
             
        }

		$wp_customize->add_setting( 'understrap_container_type', array(
			'default'           => 'container',
			'type'              => 'theme_mod',
			'sanitize_callback' => 'understrap_theme_slug_sanitize_select',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_container_type', array(
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
			'sanitize_callback' => 'sanitize_text_field',
			'capability'        => 'edit_theme_options',
		) );

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'understrap_sidebar_position', array(
					'label'       => __( 'Sidebar Positioning', 'understrap' ),
					'description' => __( "Set sidebar's default position. Can either be: right, left, both or none. Note: this can be overridden on individual pages.",
					'understrap' ),
					'section'     => 'understrap_theme_layout_options',
					'settings'    => 'understrap_sidebar_position',
					'type'        => 'select',
					'sanitize_callback' => 'understrap_theme_slug_sanitize_select',
					'choices'     => array(
						'right' => __( 'Right sidebar', 'understrap' ),
						'left'  => __( 'Left sidebar', 'understrap' ),
						'both'  => __( 'Left & Right sidebars', 'understrap' ),
						'none'  => __( 'No sidebar', 'understrap' ),
					),
					'priority'    => '20',
				)
			) );
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

/**
 * Read Customizer Settings and output them in embedded CSS.
 */
if ( ! function_exists( 'understrap_theme_customize_css' ) ) {
	function understrap_theme_customize_css() {
		echo "<style type=\"text/css\">\r\n";

			if (!empty( get_theme_mod('text_color') ) ) {
				echo "body { color: " . get_theme_mod('text_color') . "; }\r\n";
			}

			if (!empty( get_theme_mod('primary_color') ) ) {
				echo "a { color: " . get_theme_mod('primary_color') . "; }\r\n";
				echo "*[class*='primary'] { background-color: " . get_theme_mod('primary_color') . "; border-color: " . get_theme_mod('primary_color') . "; }\r\n";
			}

			if (!empty( get_theme_mod('primary_hover_color') ) ) {
				echo "a:hover { color: " . get_theme_mod('primary_hover_color') . "; }\r\n";
				echo "*[class*='primary']:hover { background-color: " . get_theme_mod('primary_hover_color') . ";  border-color: " . get_theme_mod('primary_hover_color') . "; }\r\n";
			}

		echo "</style>\r\n";
	}
}

add_action( 'wp_head', 'understrap_theme_customize_css');