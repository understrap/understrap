<?php
/**
 * The template for displaying search results pages.
 *
 * @package understrap
 */

 get_header();

  $container = get_theme_mod('understrap_container_type');
  $sidebar_pos = get_theme_mod('understrap_sidebar_position');

?>
<div class="wrapper search-wrapper">

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

      <section class="<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>col-md-8<?php else : ?>col-md-12<?php endif; ?> content-area" id="primary">

        <main class="site-main" id="main">

          <?php if ( have_posts() ) : ?>

            <header class="page-header">

              <h1 class="page-title"><?php printf( __( 'Search Results for: %s', 'understrap' ), '<span>' . get_search_query() . '</span>' ); ?></h1>

            </header><!-- .page-header -->

            <?php /* Start the Loop */ ?>
            <?php while ( have_posts() ) : the_post(); ?>

              <?php
                /**
                 * Run the loop for the search to output the results.
                 * If you want to overload this in a child theme then include a file
                 * called content-search.php and that will be used instead.
                 */
                get_template_part( 'loop-templates/content', 'search' );
              ?>

            <?php endwhile; ?>

            <?php understrap_numeric_posts_nav(); ?>

          <?php else : ?>

            <?php get_template_part( 'loop-templates/content', 'none' ); ?>

          <?php endif; ?>

        </main><!-- #main -->

      </section><!-- #primary -->

      <?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
        <?php get_sidebar( 'right' ); ?>
      <?php endif; ?>

    </div><!-- .row -->

  </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
