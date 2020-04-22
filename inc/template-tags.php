<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_posted_on' ) ) {
	/**
	 * Prints HTML with meta information for the current post-date/time and author.
	 */
	function understrap_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s"> (%4$s) </time>';
		}
		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( 'c' ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( 'c' ) ),
			esc_html( get_the_modified_date() )
		);
		$posted_on   = apply_filters(
			'understrap_posted_on',
			sprintf(
				'<span class="posted-on">%1$s <a href="%2$s" rel="bookmark">%3$s</a></span>',
				esc_html_x( 'Posted on', 'post date', 'understrap' ),
				esc_url( get_permalink() ),
				apply_filters( 'understrap_posted_on_time', $time_string )
			)
		);
		$byline      = apply_filters(
			'understrap_posted_by',
			sprintf(
				'<span class="byline"> %1$s<span class="author vcard"> <a class="url fn n" href="%2$s">%3$s</a></span></span>',
				$posted_on ? esc_html_x( 'by', 'post author', 'understrap' ) : esc_html_x( 'Posted by', 'post author', 'understrap' ),
				esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
				esc_html( get_the_author() )
			)
		);
		echo $posted_on . $byline; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if ( ! function_exists( 'understrap_entry_footer' ) ) {
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function understrap_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'understrap' ) );
			if ( $categories_list && understrap_categorized_blog() ) {
				/* translators: %s: Categories of current post */
				printf( '<span class="cat-links">' . esc_html__( 'Posted in %s', 'understrap' ) . '</span>', $categories_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html__( ', ', 'understrap' ) );
			if ( $tags_list ) {
				/* translators: %s: Tags of current post */
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %s', 'understrap' ) . '</span>', $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}
		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link( esc_html__( 'Leave a comment', 'understrap' ), esc_html__( '1 Comment', 'understrap' ), esc_html__( '% Comments', 'understrap' ) );
			echo '</span>';
		}
		edit_post_link(
			sprintf(
				/* translators: %s: Name of current post */
				esc_html__( 'Edit %s', 'understrap' ),
				the_title( '<span class="sr-only">"', '"</span>', false )
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
}

if ( ! function_exists( 'understrap_categorized_blog' ) ) {
	/**
	 * Returns true if a blog has more than 1 category.
	 *
	 * @return bool
	 */
	function understrap_categorized_blog() {
		$all_the_cool_cats = get_transient( 'understrap_categories' );
		if ( false === $all_the_cool_cats ) {
			// Create an array of all the categories that are attached to posts.
			$all_the_cool_cats = get_categories(
				array(
					'fields'     => 'ids',
					'hide_empty' => 1,
					// We only need to know if there is more than one category.
					'number'     => 2,
				)
			);
			// Count the number of categories that are attached to the posts.
			$all_the_cool_cats = count( $all_the_cool_cats );
			set_transient( 'understrap_categories', $all_the_cool_cats );
		}
		if ( $all_the_cool_cats > 1 ) {
			// This blog has more than 1 category so understrap_categorized_blog should return true.
			return true;
		} else {
			// This blog has only 1 category so understrap_categorized_blog should return false.
			return false;
		}
	}
}

add_action( 'edit_category', 'understrap_category_transient_flusher' );
add_action( 'save_post', 'understrap_category_transient_flusher' );

if ( ! function_exists( 'understrap_category_transient_flusher' ) ) {
	/**
	 * Flush out the transients used in understrap_categorized_blog.
	 */
	function understrap_category_transient_flusher() {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		// Like, beat it. Dig?
		delete_transient( 'understrap_categories' );
	}
}

if ( ! function_exists( 'understrap_body_attributes' ) ) {
	/**
	 * Displays the attributes for the body element.
	 */
	function understrap_body_attributes() {
		/**
		 * Filters the body attributes.
		 *
		 * @param array $atts An associative array of attributes.
		 */
		$atts = array_unique( apply_filters( 'understrap_body_attributes', $atts = array() ) );
		if ( ! is_array( $atts ) || empty( $atts ) ) {
			return;
		}
		$attributes = '';
		foreach ( $atts as $name => $value ) {
			if ( $value ) {
				$attributes .= sanitize_key( $name ) . '="' . esc_attr( $value ) . '" ';
			} else {
				$attributes .= sanitize_key( $name ) . ' ';
			}
		}
		echo trim( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput
	}
}

if ( ! function_exists( 'understrap_post_nav' ) ) {
	/**
	 * Display navigation to next/previous post when applicable.
	 */
	function understrap_post_nav() {
		// Don't print empty markup if there's nowhere to navigate.
		$previous = ( is_attachment() ) ? get_post( get_post()->post_parent ) : get_adjacent_post( false, '', true );
		$next     = get_adjacent_post( false, '', false );

		if ( ! $next && ! $previous ) {
			return;
		}
		?>
		<nav class="nav navigation post-navigation justify-content-between" aria-labelledby="post-nav-label">
			<h2 id="post-nav-label" class="sr-only"><?php esc_html_e( 'Post navigation', 'understrap' ); ?></h2>
			<?php
			$icon_atts = array(
				'height' => '0.65rem',
				'width'  => '0.65rem',
			);
			if ( get_previous_post_link() ) {
				previous_post_link( '%link', understrap_bootstrap_icon( 'chevron-left', $icon_atts, false ) . '&nbsp;%title' );
			}
			if ( get_next_post_link() ) {
				next_post_link( '%link', '%title&nbsp;' . understrap_bootstrap_icon( 'chevron-right', $icon_atts, false ) );
			}
			?>
		</nav><!-- .navigation -->
		<?php
	}
}

if ( ! function_exists( 'understrap_bootstrap_icon' ) ) {
	/**
	 * Retrieves or diplays HTML markup for a Bootstrap icon.
	 *
	 * @param string   $name Name of the Bootstrap icon as used in the svg class: 'bi bi-name'.
	 * @param string[] $args (Optional) Associative array of attribute => value pairs for the <svg> tag.
	 * @param bool     $echo (Optional) Whether to echo (true) or return (return) the svg. Default: true.
	 * @return string
	 */
	function understrap_bootstrap_icon( $name, $args = array(), $echo = true ) {

		// Bootstrap Icons as of v1.0.0-alpha3.
		$icons = array(
			'chevron-right' => '<path fill-rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-rule="evenodd"/>',
			'chevron-left'  => '<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>',
		);

		/**
		 * Filters the available Bootstrap icons.
		 *
		 * @param string[] $icons Associative array of the Bootstrap icons' HTML excluding the <svg> tag.
		 */
		$icons = apply_filters( 'understrap_bootstrap_icons', $icons );

		// Return early if icon does not exist.
		if ( ! isset( $icons[ $name ] ) ) {
			return;
		}

		$default_svg_atts = array(
			'width'       => '1em',
			'height'      => '1em',
			'viewBox'     => '0 0 16 16',
			'fill'        => 'currentColor',
			'xmlns'       => 'http://www.w3.org/2000/svg',
			'focusable'   => 'false',
			'role'        => 'img',
			'aria-hidden' => 'true',
		);

		/**
		 * Filters the default arguments for Bootstrap icons.
		 *
		 * @param string[] $default_svg_atts Associative array of attribute => value pairs for the <svg> tag.
		 */
		$default_svg_atts = apply_filters( 'understrap_bootstrap_icon_svg_atts', $default_svg_atts );

		$custom_svg_atts = ! empty( $args ) ? true : false;
		$atts            = $custom_svg_atts ? wp_parse_args( $args, $default_svg_atts ) : $default_svg_atts;

		if ( isset( $atts['class'] ) ) {
			$class = ' ' . $atts['class'];
			unset( $atts['class'] );
		} else {
			$class = '';
		}

		$svg_atts = '';
		foreach ( $atts as $att => $value ) {
			switch ( strtolower( $att ) ) {
				case 'xmlns':
					$svg_atts .= $att . '="' . esc_url( $value ) . '" ';
					break;
				case 'viewbox':
					$svg_atts .= $att . '="' . $value . '" ';
					break;
				default:
					$svg_atts .= $att . '="' . esc_attr( $value ) . '" ';
			}
		}
		rtrim( $svg_atts );

		$svg = '<svg class="bi bi-' . $name . $class . '" ' . $svg_atts . '>' . $icons[ $name ] . '</svg>';
		if ( (bool) $echo ) {
			echo wp_kses( $svg, understrap_allowed_html_svg() );
		} else {
			return $svg;
		}
	}
} // End of if function_exists( 'understrap_bootstrap_icon' ).

if ( ! function_exists( 'understrap_get_allowed_html_svg' ) ) {
	/**
	 * Retrieves allowed HTML tags and attributes for <svg> tags.
	 *
	 * @return array|string[]
	 */
	function understrap_get_allowed_html_svg() {
		$allowed_html = array(
			'svg'     => array(
				'class'       => true,
				'xmlns'       => true,
				'width'       => true,
				'height'      => true,
				'viewbox'     => true,
				'aria-hidden' => true,
				'role'        => true,
				'focusable'   => true,
			),
			'path'    => array(
				'fill'      => true,
				'fill-rule' => true,
				'clip-rule' => true,
				'd'         => true,
				'transform' => true,
			),
			'polygon' => array(
				'fill'      => true,
				'fill-rule' => true,
				'points'    => true,
				'transform' => true,
				'focusable' => true,
			),
		);

		/**
		 * Filters the allowed html for svg markup.
		 *
		 * @param string[] $allowed_html Associative array of allowed HTML tags and attributes.
		 */
		$allowed_html = apply_filters( 'understrap_allowed_html_svg', $allowed_html );
		if ( ! is_array( $allowed_html ) ) {
			return array();
		}

		return $allowed_html;
	}
} // End of if function_exists( 'understrap_get_allowed_html_svg' ).
