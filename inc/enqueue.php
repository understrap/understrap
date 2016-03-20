<?php
/**
 * understrap enqueue scripts
 *
 * @package understrap
 */

function understrap_scripts() {
    wp_enqueue_style( 'understrap-theme', get_stylesheet_directory_uri() . '/css/theme.min.css', array(), '0.3.8');

    // Unregister the default jQuery because it comes with the theme.min.js fiel already
    wp_deregister_script('jquery');  
        
    wp_enqueue_script( 'understrap-theme', get_template_directory_uri() . '/js/theme.min.js', array(), '0.3.8', true );


add_action( 'wp_enqueue_scripts', 'understrap_scripts' );

// Removing the fuc!?$% emoji´s
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
