<?php
/**
 * The template for displaying comments.
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package understrap
 */

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
        printf( _nx( 'One thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', get_comments_number(), 'comments title', 'understrap' ),
        number_format_i18n( get_comments_number() ), '<span>' . get_the_title() . '</span>' );
      ?>
    </h2>

    <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
      <nav class="comment-navigation" id="comment-nav-above">
        <h1 class="screen-reader-text"><?php _e( 'Comment navigation', 'understrap' ); ?></h1>
        <?php if ( get_previous_comments_link() ) { ?>
          <div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'understrap' ) ); ?></div>
        <?php } if ( get_next_comments_link() ) { ?>
          <div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'understrap' ) ); ?></div>
        <?php } ?>
      </nav><!-- #comment-nav-above -->
    <?php endif; // check for comment navigation ?>

    <ol class="comment-list">
      <?php
        wp_list_comments( array(
          'style'      => 'ol',
          'short_ping' => true,
        ) );
      ?>
    </ol><!-- .comment-list -->

    <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
      <nav class="comment-navigation" id="comment-nav-below">
        <h1 class="screen-reader-text"><?php _e( 'Comment navigation', 'understrap' ); ?></h1>
        <?php if ( get_previous_comments_link() ) { ?>
          <div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'understrap' ) );?></div>
        <?php } if ( get_next_comments_link() ) { ?>
          <div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'understrap' ) ); ?></div>
        <?php } ?>
      </nav><!-- #comment-nav-below -->
    <?php endif; // check for comment navigation ?>

  <?php endif; // have_comments() ?>

  <?php
    // If comments are closed and there are comments, let's leave a little note, shall we?
    if ( ! comments_open() && '0' != get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
  ?>

    <p class="no-comments"><?php _e( 'Comments are closed.', 'understrap' ); ?></p>

  <?php endif; ?>

   <?php
    /* Loads the comment-form.php template
    /* get_template_part('comment-form');
    */
  ?>

  <?php comment_form(); ?>

</div><!-- #comments -->
