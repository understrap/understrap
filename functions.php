<?php
/**
 * Understrap functions and definitions
 *
 * @package chesterStore
 */

 add_filter('body_class', 'mbe_body_class');

 add_action('wp_head', 'mbe_wp_head');

/**
 * Theme setup and custom theme supports.
 */
require get_template_directory() . '/inc/setup.php';

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
require get_template_directory() . '/inc/widgets.php';

/**
 * Load functions to secure your WP install.
 */
require get_template_directory() . '/inc/security.php';

/**
 * Enqueue scripts and styles.
 */
require get_template_directory() . '/inc/enqueue.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/pagination.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Custom Comments file.
 */
require get_template_directory() . '/inc/custom-comments.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Load custom WordPress nav walker.
 */
require get_template_directory() . '/inc/bootstrap-wp-navwalker.php';

/**
 * Load WooCommerce functions.
 */
require get_template_directory() . '/inc/woocommerce.php';

/**
 * Load Editor functions.
 */
require get_template_directory() . '/inc/editor.php';

function mbe_body_class($classes){
    if(is_user_logged_in()){
        $classes[] = 'body-logged-in';
    } else{
        $classes[] = 'body-logged-out';
    }
    return $classes;
}

function mbe_wp_head(){
    echo '<style>'.PHP_EOL;
    echo 'body{ padding-top: 4.5rem !important; }'.PHP_EOL;
  //   Using custom CSS class name.
    echo '@media (min-width:784px){body.body-logged-in .fixed-top{ top: 32px !important; }}@media (max-width:783px){body.body-logged-in .fixed-top{ top: 46px !important;} #wpadminbar{position:fixed !important;}'.PHP_EOL;
    // Using WordPress default CSS class name.
    echo '@media (min-width:784px){body.body-logged-in .fixed-top{ top: 32px !important; }}@media (max-width:783px){body.body-logged-in .fixed-top{ top: 46px !important;} #wpadminbar{position:fixed !important;}'.PHP_EOL;
    echo '</style>'.PHP_EOL;
}
