<?php
/**
 * Understrap enqueue scripts
 *
 * @package understrap
 */

/**
 * @param  string  $filename
 * @return string
 */
function asset_path($filename) {
    $manifest_path = get_stylesheet_directory_uri() .'/rev-manifest.json';
    if ( file_exists($manifest_path ) ) {
        $manifest = json_decode( file_get_contents( $manifest_path ), TRUE );
    } else {
        $manifest = [];
    }
    if ( array_key_exists( $filename, $manifest ) ) {
        return $manifest[$filename];
    }
    return $filename;
}

if ( ! function_exists( 'understrap_scripts' ) ) {
	/**
	 * Load theme's JavaScript and CSS sources.
	 */
	function understrap_scripts() {

		wp_enqueue_style( 'understrap-styles', get_stylesheet_directory_uri() . '/'. asset_path('css/theme.min.css'), array(), null);

		wp_enqueue_script( 'jquery');
		wp_enqueue_script( 'popper-scripts', get_template_directory_uri() . '/js/popper.min.js', array(), false, true);

		wp_enqueue_script( 'understrap-scripts', get_template_directory_uri() . '/' . asset_path('js/theme.min.js'), array(), null, true );
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
} // endif function_exists( 'understrap_scripts' ).

add_action( 'wp_enqueue_scripts', 'understrap_scripts' );
