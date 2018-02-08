<?php
/**
 * Theme basic setup.
 *
 * @package befluid
 */


// Set the content width based on the theme's design and stylesheet.
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'befluid_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function befluid_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on befluid, use a find and replace
		 * to change 'befluid' to the name of your theme in all the template files
		 */
		load_theme_textdomain( 'befluid', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => __( 'Primary Menu', 'befluid' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		/*
		 * Adding Thumbnail basic support
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Adding support for Widget edit icons in customizer
		 */
		add_theme_support( 'customize-selective-refresh-widgets' );

		/*
		 * Enable support for Post Formats.
		 * See http://codex.wordpress.org/Post_Formats
		 */
		add_theme_support( 'post-formats', array(
			'aside',
			'image',
			'video',
			'quote',
			'link',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'befluid_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Set up the WordPress Theme logo feature.
		add_theme_support( 'custom-logo' );

		// Check and setup theme default settings.
		befluid_setup_theme_default_settings();

	}
endif; // befluid_setup.
add_action( 'after_setup_theme', 'befluid_setup' );

if ( ! function_exists( 'befluid_custom_excerpt_more' ) ) {
	/**
	 * Removes the ... from the excerpt read more link
	 *
	 * @param string $more The excerpt.
	 *
	 * @return string
	 */
	function befluid_custom_excerpt_more( $more ) {
		return '';
	}
}
add_filter( 'excerpt_more', 'befluid_custom_excerpt_more' );

if ( ! function_exists( 'befluid_all_excerpts_get_more_link' ) ) {
	/**
	 * Adds a custom read more link to all excerpts, manually or automatically generated
	 *
	 * @param string $post_excerpt Posts's excerpt.
	 *
	 * @return string
	 */
	function befluid_all_excerpts_get_more_link( $post_excerpt ) {

		return $post_excerpt . ' [...]<p><a class="btn btn-secondary befluid-read-more-link" href="' . esc_url( get_permalink( get_the_ID() )) . '">' . __( 'Read More...',
		'befluid' ) . '</a></p>';
	}
}
add_filter( 'wp_trim_excerpt', 'befluid_all_excerpts_get_more_link' );

// Widgets
add_action( 'init', 'bs_widgets_init', 1 );
