<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package understrap
 */

  get_header();

  if ( is_front_page() && is_home() ) {
    get_sidebar('hero');

    get_sidebar('statichero');
  } else {
    // Do nothing...or?
  }

  $container = get_theme_mod('understrap_container_type');
  $sidebar_pos = get_theme_mod('understrap_sidebar_position');

?>

<div class="wrapper" id="wrapper-index">

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

        <main class="site-main" id="main" role="main">

          <?php if ( have_posts() ) : ?>

            <?php /* Start the Loop */ ?>

            <?php while ( have_posts() ) : the_post(); ?>

              <?php
                /* Include the Post-Format-specific template for the content.
                 * If you want to override this in a child theme, then include a file
                 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                 */
                get_template_part( 'loop-templates/content', get_post_format() );
              ?>

            <?php endwhile; ?>

            <?php the_posts_navigation(); ?>

          <?php else : ?>

            <?php get_template_part( 'loop-templates/content', 'none' ); ?>

          <?php endif; ?>

        </main><!-- #main -->

      </div><!-- #primary -->

      <?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
        <?php get_sidebar( 'right' ); ?>
      <?php endif; ?>

    </div><!-- .row -->

  </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
