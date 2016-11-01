<?php
/**
 * The template for displaying all single posts.
 *
 * @package understrap
 */

 get_header();
?>
<div class="wrapper" id="single-wrapper">

  <div class="container" id="content">

    <div class="row">

      <div class="<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>col-md-8<?php else : ?>col-md-12<?php endif; ?> content-area" id="primary">

        <main class="site-main" id="main" role="main">

          <?php while ( have_posts() ) : the_post(); ?>

            <?php get_template_part( 'loop-templates/content', 'single' ); ?>

            <?php the_post_navigation(); ?>

            <?php
              // If comments are open or we have at least one comment, load up the comment template
              if ( comments_open() || get_comments_number() ) :
                  comments_template();
              endif;
            ?>

          <?php endwhile; // end of the loop. ?>

        </main><!-- #main -->

      </div><!-- #primary -->

      <?php get_sidebar(); ?>

    </div><!-- .row -->

  </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
