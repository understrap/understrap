<?php
/**
 * The template for displaying all single posts.
 *
 * @package understrap
 */

get_header(); ?>
<div class="wrapper" id="single-wrapper">
    
    <div  id="content" class="container">
        
        <div id="primary" class="<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>col-md-8<?php else : ?>col-md-12<?php endif; ?> content-area">
            
            <main id="main" class="site-main" role="main" tabindex="-1">
                
            <?php if ( function_exists('yoast_breadcrumb') ) {
                $yoast_links_options = get_option( 'wpseo_internallinks' );
                $yoast_bc_enabled=$yoast_links_options['breadcrumbs-enable'];
                    if ($yoast_bc_enabled) { ?>
                        <div class="breadcrumb">
                            <?php yoast_breadcrumb('<p id="breadcrumbs"> <i class="fa fa-home"></i> ','</p>'); ?>
                        </div>
                <?php }
            } ?>

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
        
        <?php get_template_part('sidebar'); ?>
        
    </div><!-- Container end -->
    
</div><!-- Wrapper end -->

<?php get_footer(); ?>
