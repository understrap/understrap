<?php
/**
 * Template Name: Vertical One Page
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published
 *
 * @package understrap
 */

get_header(); ?>

<?php
/*
 * Exclude the posts page from being shown in this layout.
 * Order pages by their order number.
 */
$exclude = get_option( 'page_for_posts' );
$args    = array(
	'post_type'    => 'page',
	'post__not_in' => array( $exclude ),
	'orderby'      => 'menu_order',
	'order'        => 'ASC'
);

$qry = new WP_Query( $args );

?>

<div class="wrapper" id="full-width-page-wrapper">

	<div id="content" class="container">

		<div id="primary" class="col-md-12 content-area">

			<main id="main" class="site-main" role="main">

				<?php if ( have_posts() ): while ( $qry->have_posts() ): $qry->the_post() ?>
					<div class="page">
						<?php get_template_part( 'loop-templates/content', 'verticalpage' ); ?>
					</div>

					<?php wp_reset_postdata(); //reset custom query?>
				<?php endwhile; endif; ?>

			</main><!-- #main -->

		</div><!-- #primary -->

	</div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
