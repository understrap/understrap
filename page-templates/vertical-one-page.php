<?php
/**
 * Template Name: Vertical One Page
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published
 *
 * @package understrap
 */

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<?php

/*
 * Exclude the posts page from being shown in this layout.
 * Order pages by their order number.
 */
$exclude = array();
// exclude blog page.
array_push( $exclude, get_option( 'page_for_posts' ) );
// exclude WooCommerce pages.
array_push( $exclude, get_option( 'woocommerce_cart_page_id' ) );
array_push( $exclude, get_option( 'woocommerce_shop_page_id' ) );
array_push( $exclude, get_option( 'woocommerce_checkout_page_id' ) );
array_push( $exclude, get_option( 'woocommerce_pay_page_id' ) );
array_push( $exclude, get_option( 'woocommerce_thanks_page_id' ) );
array_push( $exclude, get_option( 'woocommerce_myaccount_page_id' ) );
array_push( $exclude, get_option( 'woocommerce_edit_address_page_id' ) );
array_push( $exclude, get_option( 'woocommerce_view_order_page_id' ) );
array_push( $exclude, get_option( 'woocommerce_terms_page_id' ) );
$args = array(
	'post_type'    => 'page',
	'post__not_in' => $exclude,
	'orderby'      => 'menu_order',
	'order'        => 'ASC',
);

$qry = new WP_Query( $args );
?>

<div class="wrapper" id="full-width-page-wrapper">

	<div class="<?php echo esc_html( $container ); ?>" id="content">

		<div class="col-md-12 content-area" id="primary">

			<main class="site-main" id="main" role="main">

				<?php if ( have_posts() ) : while ( $qry->have_posts() ) : $qry->the_post() ?>
					<div class="page">
						<?php get_template_part( 'loop-templates/content', 'verticalpage' ); ?>
					</div>

					<?php wp_reset_postdata(); // reset custom query. ?>
					<?php
				endwhile;
				endif;
				?>

			</main><!-- #main -->

		</div><!-- #primary -->

	</div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
