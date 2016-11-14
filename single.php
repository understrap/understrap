<?php
/**
 * The template for displaying all single posts.
 *
 * @package understrap
 */

 get_header();

  $container = get_theme_mod('understrap_container_type');
  $sidebar_pos = get_theme_mod('understrap_sidebar_position');

?>
<div class="wrapper" id="single-wrapper">

  <div class="<?php echo $container?>" id="content">

    <div class="row">
      <?php if ( 'left' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
        <?php get_sidebar( 'left' ); ?>
      <?php endif; ?>

      <?php if ( 'right' === $sidebar_pos || 'left' === $sidebar_pos ): ?>
      <div class="<?php if ( is_active_sidebar( 'right-sidebar' ) || is_active_sidebar( 'left-sidebar' )) : ?>col-md-8<?php else : ?>col-md-12<?php endif; ?> content-area" id="primary">

      <?php elseif ( is_active_sidebar( 'right-sidebar' ) && is_active_sidebar( 'left-sidebar' ) ): ?>
        <div class="<?php if ( 'both' === $sidebar_pos ) : ?>col-md-6<?php else : ?>col-md-12<?php endif; ?> content-area" id="primary">
      <?php endif; ?>

        <main class="site-main" id="main">

          <?php while ( have_posts() ) : the_post(); ?>

            <?php get_template_part( 'loop-templates/content', 'single' ); ?>

            <?php understrap_post_nav(); ?>

            <?php
              // If comments are open or we have at least one comment, load up the comment template
              if ( comments_open() || get_comments_number() ) :
                  comments_template();
              endif;
            ?>

          <?php endwhile; // end of the loop. ?>

        </main><!-- #main -->

      </div><!-- #primary -->

      <?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
        <?php get_sidebar( 'right' ); ?>
      <?php endif; ?>

    </div><!-- .row -->

  </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
