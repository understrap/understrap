<?php
/**
 * understrap enqueue scripts
 *
 * @package understrap
 */

function understrap_scripts() {
    wp_enqueue_style( 'understrap-theme', get_stylesheet_directory_uri() . '/css/theme.min.css', array(), '0.3.7');

    // Unregister the default jQuery
    wp_deregister_script('jquery');  
  
    // Register the copy of jQuery that comes with WordPress again
    // The last parameter set to TRUE states that it should be loaded  
    // in the footer.  
    wp_register_script('jquery', '/wp-includes/js/jquery/jquery.js', false, '1.11.3', true);

    // Now load it 
    wp_enqueue_script('jquery'); 
        
    wp_enqueue_script( 'understrap-navigation', get_template_directory_uri() . '/js/bootstrap.min.js', array(), '20120206', true );

    wp_enqueue_script( 'understrap-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

    if ( is_active_sidebar( 'hero' ) ) {
        wp_enqueue_style( 'understrap-carousel-style', get_template_directory_uri() . '/css/owl.carousel.css', array(), '20024' );
        wp_enqueue_script( 'understrap-carousel-script', get_template_directory_uri() . '/js/owl.carousel.min.js', array(), '20024', true );}
    }

add_action( 'wp_enqueue_scripts', 'understrap_scripts' );

// Removing the fuc!?$% emoji´s
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
