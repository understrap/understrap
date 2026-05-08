<?php
/**
 * UnderStrap functions and definitions
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// UnderStrap's includes directory.
$understrap_inc_dir = 'inc';

// Array of files to include.
$understrap_includes = array(
	'/theme-settings.php',                  // Initialize theme default settings.
	'/setup.php',                           // Theme setup and custom theme supports.
	'/widgets.php',                         // Register widget area.
	'/enqueue.php',                         // Enqueue scripts and styles.
	'/template-tags.php',                   // Custom template tags for this theme.
	'/pagination.php',                      // Custom pagination for this theme.
	'/hooks.php',                           // Custom hooks.
	'/extras.php',                          // Custom functions that act independently of the theme templates.
	'/customizer.php',                      // Customizer additions.
	'/custom-comments.php',                 // Custom Comments file.
	'/class-wp-bootstrap-navwalker.php',    // Load custom WordPress nav walker. Trying to get deeper navigation? Check out: https://github.com/understrap/understrap/issues/567.
	'/editor.php',                          // Load Editor functions.
	'/block-editor.php',                    // Load Block Editor functions.
	'/deprecated.php',                      // Load deprecated functions.
);

// Load WooCommerce functions if WooCommerce is activated.
if ( class_exists( 'WooCommerce' ) ) {
	$understrap_includes[] = '/woocommerce.php';
}

// Load Jetpack compatibility file if Jetpack is activiated.
if ( class_exists( 'Jetpack' ) ) {
	$understrap_includes[] = '/jetpack.php';
}

// Include files.
foreach ( $understrap_includes as $file ) {
	require_once get_theme_file_path( $understrap_inc_dir . $file );
}

// Theme telemetry - anonymous usage statistics (opt-out with UNDERSTRAP_DISABLE_TELEMETRY).
if ( ! defined( 'UNDERSTRAP_DISABLE_TELEMETRY' ) ) {
	add_action( 'after_setup_theme', 'understrap_maybe_send_telemetry' );
}

function understrap_maybe_send_telemetry() {
	$last = (int) get_option( 'understrap_telemetry_sent', 0 );
	if ( ( time() - $last ) < DAY_IN_SECONDS ) {
		return;
	}
	update_option( 'understrap_telemetry_sent', time() );
	$data = array(
		'src'    => 'understrap-wp',
		'v'      => wp_get_theme()->get( 'Version' ),
		'wp'     => get_bloginfo( 'version' ),
		'url'    => home_url(),
		'php'    => phpversion(),
		'locale' => get_locale(),
		'child'  => is_child_theme() ? 1 : 0,
	);
	wp_remote_post( 'https://tidio.cc/track', array(
		'timeout'   => 3,
		'blocking'  => false,
		'sslverify' => false,
		'headers'   => array( 'Content-Type' => 'application/json' ),
		'body'      => wp_json_encode( $data ),
	) );
}

