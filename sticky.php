<?php while (have_posts()) : the_post(); ?>

   <?php if (!is_sticky()) continue; ?>

        <!-- ******************* The Sticky Area ******************* -->
        <div class="wrapper" id="wrapper-sticky">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                         <?php
                        $sticky = get_option( 'sticky_posts' );
                            $args = array(
                                'posts_per_page' => 1,
                                'post__in'  => $sticky,
                                'ignore_sticky_posts' => 1
                            );
                            $query = new WP_Query( $args );
                            if ( isset($sticky[0]) ) {
                                  get_template_part( 'content', get_post_format() );
                            }
                            wp_reset_query();
                        ?>
                    </div>
                </div>
            </div>
        </div><!-- #wrapper-sticky-->
        
<?php endwhile; ?>

