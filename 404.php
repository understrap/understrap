<?php
/**
 * The template for displaying 404 pages (not found).
 * @package understrap
 */

 get_header();

  $container = get_theme_mod('understrap_container_type');
  $sidebar_pos = get_theme_mod('understrap_sidebar_position');
?>
<div class="wrapper" id="404-wrapper">

  <div class="<?php echo $container?>" id="content" tabindex="-1">

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

          <section class="error-404 not-found">

            <header class="page-header">

              <h1 class="page-title"><?php _e( 'Oops! That page can&rsquo;t be found.', 'understrap' ); ?></h1>

            </header><!-- .page-header -->

            <div class="page-content">

              <p><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'understrap' ); ?></p>

              <?php get_search_form(); ?>

              <?php get_sidebar( '404' ); ?>

            </div><!-- .page-content -->

          </section><!-- .error-404 -->

        </main><!-- #main -->

      </div><!-- #primary -->

      <?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
        <?php get_sidebar( 'right' ); ?>
      <?php endif; ?>

    </div> <!-- .row -->

  </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
