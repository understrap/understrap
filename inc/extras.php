<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_filter( 'body_class', 'understrap_body_classes' );

if ( ! function_exists( 'understrap_body_classes' ) ) {
	/**
	 * Adds custom classes to the array of body classes.
	 *
	 * @param array $classes Classes for the body element.
	 *
	 * @return array
	 */
	function understrap_body_classes( $classes ) {
		// Adds a class of group-blog to blogs with more than 1 published author.
		if ( is_multi_author() ) {
			$classes[] = 'group-blog';
		}
		// Adds a class of hfeed to non-singular pages.
		if ( ! is_singular() ) {
			$classes[] = 'hfeed';
		}

		// Adds a body class based on the presence of a sidebar.
		$sidebar_pos = get_theme_mod( 'understrap_sidebar_position' );
		if ( is_page_template(
			array(
				'page-templates/fullwidthpage.php',
				'page-templates/no-title.php',
			)
		) ) {
			$classes[] = 'understrap-no-sidebar';
		} elseif (
			is_page_template(
				array(
					'page-templates/both-sidebarspage.php',
					'page-templates/left-sidebarpage.php',
					'page-templates/right-sidebarpage.php',
				)
			)
		) {
			$classes[] = 'understrap-has-sidebar';
		} elseif ( 'none' !== $sidebar_pos ) {
			$classes[] = 'understrap-has-sidebar';
		} else {
			$classes[] = 'understrap-no-sidebar';
		}

		return $classes;
	}
}

if ( function_exists( 'understrap_adjust_body_class' ) ) {
	/*
	 * understrap_adjust_body_class() deprecated in v0.9.4. We keep adding the
	 * filter for child themes which use their own understrap_adjust_body_class.
	 */
	add_filter( 'body_class', 'understrap_adjust_body_class' );
}

// Filter custom logo with correct classes.
add_filter( 'get_custom_logo', 'understrap_change_logo_class' );

if ( ! function_exists( 'understrap_change_logo_class' ) ) {
	/**
	 * Replaces logo CSS class.
	 *
	 * @param string $html Markup.
	 *
	 * @return string
	 */
	function understrap_change_logo_class( $html ) {

		$html = str_replace( 'class="custom-logo"', 'class="img-fluid"', $html );
		$html = str_replace( 'class="custom-logo-link"', 'class="navbar-brand custom-logo-link"', $html );
		$html = str_replace( 'alt=""', 'title="Home" alt="logo"', $html );

		return $html;
	}
}

if ( ! function_exists( 'understrap_pingback' ) ) {
	/**
	 * Add a pingback url auto-discovery header for single posts of any post type.
	 */
	function understrap_pingback() {
		if ( is_singular() && pings_open() ) {
			echo '<link rel="pingback" href="' . esc_url( get_bloginfo( 'pingback_url' ) ) . '">' . "\n";
		}
	}
}
add_action( 'wp_head', 'understrap_pingback' );

if ( ! function_exists( 'understrap_mobile_web_app_meta' ) ) {
	/**
	 * Add mobile-web-app meta.
	 */
	function understrap_mobile_web_app_meta() {
		echo '<meta name="mobile-web-app-capable" content="yes">' . "\n";
		echo '<meta name="apple-mobile-web-app-capable" content="yes">' . "\n";
		echo '<meta name="apple-mobile-web-app-title" content="' . esc_attr( get_bloginfo( 'name' ) ) . ' - ' . esc_attr( get_bloginfo( 'description' ) ) . '">' . "\n";
	}
}
add_action( 'wp_head', 'understrap_mobile_web_app_meta' );

if ( ! function_exists( 'understrap_default_body_attributes' ) ) {
	/**
	 * Adds schema markup to the body element.
	 *
	 * @param array<string,string> $atts An associative array of attributes.
	 * @return array<string,string>
	 */
	function understrap_default_body_attributes( $atts ) {
		$atts['itemscope'] = '';
		$atts['itemtype']  = 'http://schema.org/WebSite';
		return $atts;
	}
}
add_filter( 'understrap_body_attributes', 'understrap_default_body_attributes' );

// Escapes all occurrences of 'the_archive_description'.
add_filter( 'get_the_archive_description', 'understrap_escape_the_archive_description' );

if ( ! function_exists( 'understrap_escape_the_archive_description' ) ) {
	/**
	 * Escapes the description for an author or post type archive.
	 *
	 * @param string $description Archive description.
	 * @return string Maybe escaped $description.
	 */
	function understrap_escape_the_archive_description( $description ) {
		if ( is_author() || is_post_type_archive() ) {
			return wp_kses_post( $description );
		}

		/*
		 * All other descriptions are retrieved via term_description() which returns
		 * a sanitized description.
		 */
		return $description;
	}
} // End of if function_exists( 'understrap_escape_the_archive_description' ).

// Escapes all occurrences of 'the_title()' and 'get_the_title()'.
add_filter( 'the_title', 'understrap_kses_title' );

// Escapes all occurrences of 'the_archive_title' and 'get_the_archive_title()'.
add_filter( 'get_the_archive_title', 'understrap_kses_title' );

if ( ! function_exists( 'understrap_kses_title' ) ) {
	/**
	 * Sanitizes data for allowed HTML tags for titles.
	 *
	 * @param string $data Title to filter.
	 * @return string Filtered title with allowed HTML tags and attributes intact.
	 */
	function understrap_kses_title( $data ) {

		// Get allowed tags and protocols.
		$allowed_tags      = wp_kses_allowed_html( 'post' );
		$allowed_protocols = wp_allowed_protocols();
		if (
			in_array( 'polylang/polylang.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true )
			|| in_array( 'polylang-pro/polylang.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true )
		) {
			if ( ! in_array( 'data', $allowed_protocols, true ) ) {
				$allowed_protocols[] = 'data';
			}
		}

		if ( has_filter( 'understrap_kses_title' ) ) {
			/**
			 * Filters the allowed HTML tags and attributes in titles.
			 *
			 * @param array<string,array<string,bool>> $allowed_tags Allowed HTML tags and attributes in titles.
			 */
			$allowed_tags = apply_filters_deprecated( 'understrap_kses_title', array( $allowed_tags ), '1.2.0' );
		}

		return wp_kses( $data, $allowed_tags, $allowed_protocols );
	}
} // End of if function_exists( 'understrap_kses_title' ).

if ( ! function_exists( 'understrap_hide_posted_by' ) ) {
	/**
	 * Hides the posted by markup in `understrap_posted_on()`.
	 *
	 * @since 1.0.0
	 *
	 * @param string $byline Posted by HTML markup.
	 * @return string Maybe filtered posted by HTML markup.
	 */
	function understrap_hide_posted_by( $byline ) {
		if ( is_author() ) {
			return '';
		}
		return $byline;
	}
}
add_filter( 'understrap_posted_by', 'understrap_hide_posted_by' );


add_filter( 'excerpt_more', 'understrap_custom_excerpt_more' );

if ( ! function_exists( 'understrap_custom_excerpt_more' ) ) {
	/**
	 * Removes the ... from the excerpt read more link
	 *
	 * @param string $more The excerpt.
	 *
	 * @return string
	 */
	function understrap_custom_excerpt_more( $more ) {
		if ( ! is_admin() ) {
			$more = '';
		}
		return $more;
	}
}

add_filter( 'wp_trim_excerpt', 'understrap_all_excerpts_get_more_link' );

if ( ! function_exists( 'understrap_all_excerpts_get_more_link' ) ) {
	/**
	 * Adds a custom read more link to all excerpts, manually or automatically generated
	 *
	 * @param string $post_excerpt Posts's excerpt.
	 *
	 * @return string
	 */
	function understrap_all_excerpts_get_more_link( $post_excerpt ) {
		if ( is_admin() || ! get_the_ID() ) {
			return $post_excerpt;
		}

		$permalink = esc_url( get_permalink( (int) get_the_ID() ) ); // @phpstan-ignore-line -- post exists

		return $post_excerpt . ' [...]<p><a class="btn btn-secondary understrap-read-more-link" href="' . $permalink . '">' . __(
			'Read More...',
			'understrap'
		) . '<span class="screen-reader-text"> from ' . get_the_title( get_the_ID() ) . '</span></a></p>';

	}
}
