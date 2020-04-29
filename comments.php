<?php
/**
 * The template for displaying comments
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div class="comments-area" id="comments">

	<?php // You can start editing here -- including this comment! ?>

	<?php if ( have_comments() ) : ?>

		<h2 class="comments-title">

			<?php
			$comments_number = get_comments_number();
			if ( 1 === (int) $comments_number ) {
				printf(
					/* translators: %s: post title */
					esc_html_x( 'One thought on &ldquo;%s&rdquo;', 'comments title', 'understrap' ),
					'<span>' . get_the_title() . '</span>'
				);
			} else {
				printf(
					esc_html(
						/* translators: 1: number of comments, 2: post title */
						_nx(
							'%1$s thought on &ldquo;%2$s&rdquo;',
							'%1$s thoughts on &ldquo;%2$s&rdquo;',
							$comments_number,
							'comments title',
							'understrap'
						)
					),
					number_format_i18n( $comments_number ), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					'<span>' . get_the_title() . '</span>'
				);
			}
			?>

		</h2><!-- .comments-title -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through. ?>

			<nav class="comment-navigation" id="comment-nav-above">

				<h1 class="sr-only"><?php esc_html_e( 'Comment navigation', 'understrap' ); ?></h1>

				<?php if ( get_previous_comments_link() ) { ?>
					<div class="nav-previous">
						<?php previous_comments_link( __( '&larr; Older Comments', 'understrap' ) ); ?>
					</div>
				<?php } ?>

				<?php	if ( get_next_comments_link() ) { ?>
					<div class="nav-next">
						<?php next_comments_link( __( 'Newer Comments &rarr;', 'understrap' ) ); ?>
					</div>
				<?php } ?>

			</nav><!-- #comment-nav-above -->

		<?php endif; // Check for comment navigation. ?>

		<ol class="comment-list">

			<?php
			wp_list_comments(
				array(
					'style'      => 'ol',
					'short_ping' => true,
				)
			);
			?>

		</ol><!-- .comment-list -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through. ?>

			<nav class="comment-navigation" id="comment-nav-below">

				<h1 class="sr-only"><?php esc_html_e( 'Comment navigation', 'understrap' ); ?></h1>

				<?php if ( get_previous_comments_link() ) { ?>
					<div class="nav-previous">
						<?php previous_comments_link( __( '&larr; Older Comments', 'understrap' ) ); ?>
					</div>
				<?php } ?>

				<?php	if ( get_next_comments_link() ) { ?>
					<div class="nav-next">
						<?php next_comments_link( __( 'Newer Comments &rarr;', 'understrap' ) ); ?>
					</div>
				<?php } ?>

			</nav><!-- #comment-nav-below -->

		<?php endif; // Check for comment navigation. ?>

	<?php endif; // End of if have_comments(). ?>

	<?php comment_form(); // Render comments form. ?>

</div><!-- #comments -->
