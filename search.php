<?php
/**
 * The template for displaying search results pages.
 *
 * @package understrap
 */

 get_header();
?>
<?php
$container = get_theme_mod('understrap_container_type');
$sidebar_pos = get_theme_mod('understrap_sidebar_position');
?>

<div class="wrapper search-wrapper">

  <div class="<?php echo $container?>" id="content">

    <div class="row">

      <!-- Do the left sidebar check -->
      <?php get_template_part( 'global-templates/left-sidebar-check', 'none' ); ?>

        <main class="site-main" id="main" role="main">

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

            <?php the_posts_navigation(); ?>

          <?php else : ?>

            <?php get_template_part( 'loop-templates/content', 'none' ); ?>

          <?php endif; ?>

        </main><!-- #main -->

      </section><!-- #primary -->

      <!-- Do the right sidebar check -->
      <?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
      
        <?php get_sidebar( 'right' ); ?>
      
      <?php endif; ?>

    </div><!-- .row -->

  </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
