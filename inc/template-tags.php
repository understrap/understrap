<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_posted_on' ) ) {
	/**
	 * Prints HTML with meta information for the current post-date/time and author.
	 */
	function understrap_posted_on() {
		$post = get_post();
		if ( ! $post ) {
			return;
		}

		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s"> (%4$s) </time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( 'c' ) ), // @phpstan-ignore-line -- post exists
			esc_html( get_the_date() ), // @phpstan-ignore-line -- post exists
			esc_attr( get_the_modified_date( 'c' ) ), // @phpstan-ignore-line -- post exists
			esc_html( get_the_modified_date() ) // @phpstan-ignore-line -- post exists
		);

		$posted_on = apply_filters(
			'understrap_posted_on',
			sprintf(
				'<span class="posted-on">%1$s <a href="%2$s" rel="bookmark">%3$s</a></span>',
				esc_html_x( 'Posted on', 'post date', 'understrap' ),
				esc_url( get_permalink() ), // @phpstan-ignore-line -- post exists
				apply_filters( 'understrap_posted_on_time', $time_string )
			)
		);

		$author_id = (int) get_the_author_meta( 'ID' );
		if ( 0 === $author_id ) {
			$byline = '';
		} else {
			$byline = apply_filters(
				'understrap_posted_by',
				sprintf(
					'<span class="byline"> %1$s<span class="author vcard"> <a class="url fn n" href="%2$s">%3$s</a></span></span>',
					$posted_on ? esc_html_x( 'by', 'post author', 'understrap' ) : esc_html_x( 'Posted by', 'post author', 'understrap' ),
					esc_url( get_author_posts_url( $author_id ) ),
					esc_html( get_the_author_meta( 'display_name', $author_id ) )
				)
			);
		}

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
			understrap_categories_tags_list();
		}
		understrap_comments_popup_link();
		understrap_edit_post_link();
	}
}

if ( ! function_exists( 'understrap_categories_tags_list' ) ) {
	/**
	 * Displays a list of categories and a list of tags.
	 *
	 * @since 1.2.0
	 */
	function understrap_categories_tags_list() {
		understrap_categories_list();
		understrap_tags_list();
	}
}

if ( ! function_exists( 'understrap_categories_list' ) ) {
	/**
	 * Displays a list of categories.
	 *
	 * @since 1.2.0
	 */
	function understrap_categories_list() {
		$categories_list = get_the_category_list( understrap_get_list_item_separator() );
		if ( $categories_list && understrap_categorized_blog() ) {
			/* translators: %s: Categories of current post */
			printf( '<span class="cat-links">' . esc_html__( 'Posted in %s', 'understrap' ) . '</span>', $categories_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}
}

if ( ! function_exists( 'understrap_tags_list' ) ) {
	/**
	 * Displays a list of tags.
	 *
	 * @since 1.2.0
	 */
	function understrap_tags_list() {
		$tags_list = get_the_tag_list( '', understrap_get_list_item_separator() );
		if ( $tags_list && ! is_wp_error( $tags_list ) ) {
			/* translators: %s: Tags of current post */
			printf( '<span class="tags-links">' . esc_html__( 'Tagged %s', 'understrap' ) . '</span>', $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}
}

if ( ! function_exists( 'understrap_comments_popup_link' ) ) {
	/**
	 * Displays the link to the comments for the current post.
	 *
	 * @since 1.2.0
	 */
	function understrap_comments_popup_link() {
		if ( is_single() || post_password_required() || ( ! comments_open() && 0 === absint( get_comments_number() ) ) ) {
			return;
		}

		$post_title    = get_the_title();
		$leave_comment = sprintf(
			/* translators: %s post title */
			__( 'Leave a comment<span class="screen-reader-text"> on %s</span>', 'understrap' ),
			$post_title
		);
		$leave_comment = wp_kses( $leave_comment, array( 'span' => array( 'class' => true ) ) );

		echo '<span class="comments-link">';
		comments_popup_link( $leave_comment );
		echo '</span>';
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
		}
		// This blog has only 1 category so understrap_categorized_blog should return false.
		return false;
	}
}

add_action( 'delete_category', 'understrap_category_transient_flusher' );
add_action( 'save_post', 'understrap_category_transient_flusher' );
add_action( 'trashed_post', 'understrap_category_transient_flusher' );
add_action( 'deleted_post', 'understrap_category_transient_flusher' );

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
				if ( ! is_string( $value ) ) {
					continue;
				}
				$attributes .= sanitize_key( $name ) . '="' . esc_attr( $value ) . '" ';
			} else {
				$attributes .= sanitize_key( $name ) . ' ';
			}
		}

		echo trim( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput
	}
}

if ( ! function_exists( 'understrap_comment_navigation' ) ) {
	/**
	 * Displays the comment navigation.
	 *
	 * @since 1.0.0
	 *
	 * @param string $nav_id The ID of the comment navigation.
	 */
	function understrap_comment_navigation( $nav_id ) {
		if ( get_comment_pages_count() <= 1 ) {
			// Return early if there are no comments to navigate through.
			return;
		}
		?>
		<nav class="comment-navigation" id="<?php echo esc_attr( $nav_id ); ?>">

			<h1 class="screen-reader-text"><?php esc_html_e( 'Comments navigation', 'understrap' ); ?></h1>

			<?php if ( get_previous_comments_link() ) { ?>
				<div class="nav-previous">
					<?php previous_comments_link( __( '&larr; Older Comments', 'understrap' ) ); ?>
				</div>
			<?php } ?>

			<?php if ( get_next_comments_link() ) { ?>
				<div class="nav-next">
					<?php next_comments_link( __( 'Newer Comments &rarr;', 'understrap' ) ); ?>
				</div>
			<?php } ?>

		</nav><!-- #<?php echo esc_attr( $nav_id ); ?> -->
		<?php
	}
}

if ( ! function_exists( 'understrap_edit_post_link' ) ) {
	/**
	 * Displays the edit post link for post.
	 *
	 * @since 1.0.0
	 */
	function understrap_edit_post_link() {
		edit_post_link(
			sprintf(
				/* translators: %s: Name of current post */
				esc_html__( 'Edit %s', 'understrap' ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
}

if ( ! function_exists( 'understrap_post_nav' ) ) {
	/**
	 * Display navigation to next/previous post when applicable.
	 *
	 * @global WP_Post|null $post The current post.
	 */
	function understrap_post_nav() {
		global $post;
		if ( ! $post ) {
			return;
		}

		// Don't print empty markup if there's nowhere to navigate.
		$previous = ( is_attachment() ) ? get_post( $post->post_parent ) : get_adjacent_post( false, '', true );
		$next     = get_adjacent_post( false, '', false );
		if ( ! $next && ! $previous ) {
			return;
		}
		?>
		<nav class="container navigation post-navigation">
			<h2 class="screen-reader-text"><?php esc_html_e( 'Post navigation', 'understrap' ); ?></h2>
			<div class="d-flex nav-links justify-content-between">
				<?php
				if ( get_previous_post_link() ) {
					previous_post_link( '<span class="nav-previous">%link</span>', _x( '<i class="fa fa-angle-left"></i>&nbsp;%title', 'Previous post link', 'understrap' ) );
				}
				if ( get_next_post_link() ) {
					next_post_link( '<span class="nav-next">%link</span>', _x( '%title&nbsp;<i class="fa fa-angle-right"></i>', 'Next post link', 'understrap' ) );
				}
				?>
			</div><!-- .nav-links -->
		</nav><!-- .post-navigation -->
		<?php
	}
}

if ( ! function_exists( 'understrap_link_pages' ) ) {
	/**
	 * Displays/retrieves page links for paginated posts (i.e. including the
	 * `<!--nextpage-->` Quicktag one or more times). This tag must be
	 * within The Loop. Default: echo.
	 *
	 * @since 1.0.0
	 *
	 * @return void|string Formatted output in HTML.
	 */
	function understrap_link_pages() {
		$args = apply_filters(
			'understrap_link_pages_args',
			array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'understrap' ),
				'after'  => '</div>',
			)
		);
		wp_link_pages( $args );
	}
}

if ( ! function_exists( 'understrap_get_select_control_class' ) ) {
	/**
	 * Retrieves the Bootstrap CSS class for the select tag.
	 *
	 * @since 1.2.0
	 *
	 * @return string Bootstrap CSS class for the select tag.
	 */
	function understrap_get_select_control_class() {
		if ( 'bootstrap4' === get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' ) ) {
			return 'form-control';
		}
		return 'form-select';
	}
}

if ( ! function_exists( 'understrap_get_list_item_separator' ) ) {
	/**
	 * Retrieves the localized list item separator.
	 *
	 * `wp_get_list_item_separator()` has been introduced in WP 6.0.0. For WP
	 * versions lower than 6.0.0 we have to use a custom translation.
	 *
	 * @since 1.2.0
	 *
	 * @return string Localized list item separator.
	 */
	function understrap_get_list_item_separator() {
		if ( function_exists( 'wp_get_list_item_separator' ) ) {
			return esc_html( wp_get_list_item_separator() );
		}
		/* translators: used between list items, there is a space after the comma */
		return esc_html__( ', ', 'understrap' );
	}
}

if ( ! function_exists( 'understrap_get_screen_reader_class' ) ) {
	/**
	 * Retrieves Bootstrap's screen reader text class.
	 *
	 * @param bool $focusable (Optional) Whether to make the screen reader text
	 *                        visually focusable. Default: false.
	 * @return string Bootstrap's screen reader text class.
	 */
	function understrap_get_screen_reader_class( $focusable = false ) {
		$bootstrap_version = get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' );
		if ( 'bootstrap4' === $bootstrap_version ) {
			return $focusable ? 'sr-only sr-only-focusable' : 'sr-only';
		}
		return $focusable ? 'visually-hidden-focusable' : 'visually-hidden';
	}
}
