<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package understrap
 */

 get_header();
?>

<?php
$container = get_theme_mod('understrap_container_type');
$sidebar_pos = get_theme_mod('understrap_sidebar_position');
?>

<div class="wrapper" id="woocommerce-wrapper">

  <div class="container">

      <!-- Do the left sidebar check -->
      <?php get_template_part( 'global-templates/left-sidebar-check', 'none' ); ?>

      <main class="site-main" id="main" role="main">

        <!-- The WooCommerce loop -->

        <?php
          if (is_singular('product')) {

            woocommerce_content();

          } else {

            //For ANY product archive.
            //Product taxonomy, product search or /shop landing page etc.
            woocommerce_get_template('archive-product.php');

          }
        ?>

      </main><!-- #main -->

    </div><!-- #primary -->

      <!-- Do the right sidebar check -->
      <?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ): ?>
      
        <?php get_sidebar( 'right' ); ?>
      
      <?php endif; ?>

  </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
