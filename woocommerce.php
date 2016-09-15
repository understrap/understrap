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

get_header(); ?>

<div class="wrapper" id="woocommerce-wrapper">
    
    <div class="container">
        
	   <div id="primary" class="<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>col-md-8<?php else : ?>col-md-12<?php endif; ?> content-area">
	   
            <main id="main" class="site-main" role="main">

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
        
        <?php get_sidebar(); ?>
        
    </div><!-- Container end -->
    
</div><!-- Wrapper end -->

<?php get_footer(); ?>
