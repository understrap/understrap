<?php
/**
 * The template for displaying comments.
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package befluid
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
function befluid_comment($comment, $args, $depth) {
    if ( 'div' === $args['style'] ) {
        $tag       = 'div';
        $add_below = 'comment';
    } else {
        $tag       = 'li';
        $add_below = 'div-comment';
    }?>
    <<?php echo $tag; comment_class( empty( $args['has_children'] ) ? '' : 'parent' ); ?> id="comment-<?php comment_ID() ?>"><?php
    if ( 'div' != $args['style'] ) { ?>
        <div id="div-comment-<?php comment_ID() ?>" class="comment-body card mb-3"><?php
    } ?>
        <div class="comment-author vcard card-header d-block justify-content-start"><?php
            if ( $args['avatar_size'] != 0 ) {
                echo get_avatar( $comment, $args['avatar_size'],'','',array('class'=>'rounded-circle mr-2') );
            }
            printf( __( '<cite class="fn pr-2">%s</cite>' ), get_comment_author_link() ); ?>
        <?php
        if ( $comment->comment_approved == '0' ) { ?>
            <em class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.' ); ?></em><br/><?php
        } ?>
        <small class="comment-meta commentmetadata d-block">
            <a href="<?php echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ); ?>"><?php
                /* translators: 1: date, 2: time */
                printf(
                    __('%1$s at %2$s'),
                    get_comment_date(),
                    get_comment_time()
                ); ?>
            </a><?php
            edit_comment_link( __( '(Edit)' ), '  ', '' ); ?>
        </small>
				</div>
				<div class="card-body">
        <?php comment_text(); ?>
			</div>

        <div class="reply card-footer"><?php
                comment_reply_link(
                    array_merge(
                        $args,
                        array(
                            'add_below' => $add_below,
                            'depth'     => $depth,
                            'max_depth' => $args['max_depth']
                        )
                    )
                ); ?>
        </div><?php
    if ( 'div' != $args['style'] ) : ?>
        </div><?php
    endif;
}
?>

<div class="comments-area" id="comments">

	<?php // You can start editing here -- including this comment! ?>

	<?php if ( have_comments() ) : ?>

		<h2 class="comments-title lead mb-3">

			<?php
				$comments_number = get_comments_number();
				if ( 1 === (int)$comments_number ) {
					printf(
						/* translators: %s: post title */
						esc_html_x( 'One thought on &ldquo;%s&rdquo;', 'comments title', 'befluid' ),
						'<span>' . get_the_title() . '</span>'
					);
				} else {
					printf( // WPCS: XSS OK.
						/* translators: 1: number of comments, 2: post title */
						esc_html( _nx(
							'%1$s thought on &ldquo;%2$s&rdquo;',
							'%1$s thoughts on &ldquo;%2$s&rdquo;',
							$comments_number,
							'comments title',
							'befluid'
						) ),
						number_format_i18n( $comments_number ),
						'<span>' . get_the_title() . '</span>'
					);
				}
			?>

		</h2><!-- .comments-title -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through. ?>

			<nav class="comment-navigation" id="comment-nav-above">

				<h1 class="screen-reader-text"><?php esc_html_e( 'Comment navigation', 'befluid' ); ?></h1>

				<?php if ( get_previous_comments_link() ) { ?>
					<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments',
					'befluid' ) ); ?></div>
				<?php }
					if ( get_next_comments_link() ) { ?>
					<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;',
					'befluid' ) ); ?></div>
				<?php } ?>

			</nav><!-- #comment-nav-above -->

		<?php endif; // check for comment navigation. ?>

		<div class="comment-list">

			<?php
			wp_list_comments( array(
				'callback'	 => 'befluid_comment'
			) );
			?>

		</div><!-- .comment-list -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through. ?>

			<nav class="comment-navigation" id="comment-nav-below">

				<h1 class="screen-reader-text"><?php esc_html_e( 'Comment navigation', 'befluid' ); ?></h1>

				<?php if ( get_previous_comments_link() ) { ?>
					<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments',
					'befluid' ) ); ?></div>
				<?php }
					if ( get_next_comments_link() ) { ?>
					<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;',
					'befluid' ) ); ?></div>
				<?php } ?>

			</nav><!-- #comment-nav-below -->

		<?php endif; // check for comment navigation. ?>

	<?php endif; // endif have_comments(). ?>

	<?php
	// If comments are closed and there are comments, let's leave a little note, shall we?
	if ( ! comments_open() && '0' != get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
		?>

		<p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'befluid' ); ?></p>

	<?php endif;
	$commentargs= array(
		'title_reply_before' 		=>	'<h3 id="reply-title" class="comment-reply-title lead mb-3">',
		 'comment_notes_before' =>	'<p class="comment-notes"><small>' . __( 'Your email address will not be published.' ) . ( $req ? $required_text : '' ) . '</small></p>',
		 ' comment_notes_after'	=>	'<p class="form-allowed-tags"><small>' . sprintf( __( 'You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes: %s' ), ' <code>' . allowed_tags() . '</code>' ) . '</small></p>'
	);

	?>

	<?php comment_form($commentargs); // Render comments form. ?>

</div><!-- #comments -->
