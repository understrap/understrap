<?php
/**
 * The template for displaying 404 pages (not found).
 * @package understrap
 */

get_header(); ?>
<div class="wrapper" id="404-wrapper">

    <div  id="content" class="container">

        <div id="primary" class="content-area">
            <main id="main" class="site-main" role="main" tabindex="-1">

                <section class="error-404 not-found">

                    <header class="page-header">
                        <h1 class="page-title"><?php _e( 'Oops! That page can&rsquo;t be found.', 'understrap' ); ?></h1>
                    </header><!-- .page-header -->

                    <div class="page-content">
                        <p><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'understrap' ); ?></p>

                        <form role="search" method="get" action="<?php echo home_url( '/' ); ?>" class="row">
                            <div class="col-sm-9">
                                <label for="searchbox" class="sr-only"><?php echo __( 'Search for:', 'understrap' ) ?></label>
                                <input type="search" placeholder="<?php echo __( 'Search ..', 'understrap' ) ?>" value="<?php echo get_search_query() ?>" name="s" title="<?php echo __( 'Search for:', 'understrap' ) ?>" class="form-control">
                            </div>
                            <div class="col-sm-3"><button type="submit" class="submit btn btn-raised" ><?php echo __( 'Search', 'understrap' ) ?></button></div>
                        </form>

                        <div class="row">
                            <div class="col-md-6">
                                <?php the_widget( 'WP_Widget_Recent_Posts' ); ?>
                            </div>
                            <div class="col-md-6">
                                <?php if ( understrap_categorized_blog() ) : // Only show the widget if site has multiple categories. ?>
                                    <div class="widget widget_categories">
                                        <h2><?php _e( 'Most Used Categories', 'understrap' ); ?></h2>
                                        <ul>
                                        <?php
                                            wp_list_categories( array(
                                                'orderby'    => 'count',
                                                'order'      => 'DESC',
                                                'show_count' => 1,
                                                'title_li'   => '',
                                                'number'     => 10,
                                            ) );
                                        ?>
                                        </ul>
                                    </div><!-- .widget -->
                                    <?php endif; ?>
                                </div>
                            </div>

                        <div class="row">
                            <div class="col-md-6">
                                <?php
                                    /* translators: %1$s: smiley */
                                    $archive_content = '<p>' . sprintf( __( 'Try looking in the monthly archives. %1$s', 'understrap' ), convert_smilies( ':)' ) ) . '</p>';
                                    //echo '<div class="form-control" data-dropdownjs="true">';
                                    the_widget( 'WP_Widget_Archives', 'dropdown=1', "after_title=</h2>$archive_content" );
                                    //echo '</div>';
                                ?>
                            </div>
                            <div class="col-md-6">
                                <?php the_widget( 'WP_Widget_Tag_Cloud' ); ?>
                            </div>
                        </div>

                    </div><!-- .page-content -->

                </section><!-- .error-404 -->

            </main><!-- #main -->

        </div><!-- #primary -->

    </div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
