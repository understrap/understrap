<?php
/**
 * understrap Theme Customizer
 *
 * @package understrap
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function understrap_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
    $wp_customize->add_section( 'themename_color_scheme', array(
        'title'          => __( 'Header Settings', 'understrap' ),
        'priority'       => 35,
    ) );

    $wp_customize->add_setting( 'themename_theme_options[color_scheme]', array(
        'default'        => 'some-default-value',
        'type'           => 'option',
        'capability'     => 'edit_theme_options',
    ) );

    $wp_customize->add_control( 'themename_color_scheme', array(
        'label'      => __( 'Activate Header', 'understrap' ),
        'section'    => 'themename_color_scheme',
        'settings'   => 'themename_theme_options[color_scheme]',
        'type'       => 'radio',
        'choices'    => array(
            'value1' => 'Off',
            'value2' => 'On all pages',
            'value3' => 'On Frontpage only',
        ),
    ) );
}
add_action( 'customize_register', 'understrap_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function understrap_customize_preview_js() {
	wp_enqueue_script( 'understrap_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20130508', true );
}
add_action( 'customize_preview_init', 'understrap_customize_preview_js' );
