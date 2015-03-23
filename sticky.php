<!-- ******************* The Sticky Area ******************* -->
<div class="wrapper" id="wrapper-sticky">
    <div class="container">
        <div class="col-md-12">
 
             <?php
            // Get IDs of sticky posts
            $sticky = get_option('sticky_posts');
            // First loop to display only the single, most recent sticky post
            $most_recent_sticky_post = new WP_Query(array(
                // Only sticky posts
                'post__in' => $sticky,
                // Treat them as sticky posts
                'ignore_sticky_posts' => 1,
                // Order by ID
                'orderby' => ID,
                // Get only the most recent
                'posts_per_page' => 1
            ));
            while ($most_recent_sticky_post->have_posts()) : $most_recent_sticky_post->the_post(); ?>
                <?php
                                        /* Include the Post-Format-specific template for the content.
                                         * If you want to override this in a child theme, then include a file
                                         * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                                         */
                                        get_template_part( 'content', get_post_format() );
                ?>
            <?php endwhile; wp_reset_query(); ?>

        </div>
    </div>
</div>


