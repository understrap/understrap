<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */

$the_theme = wp_get_theme();
$container = get_theme_mod( 'understrap_container_type' );
?>

<?php get_sidebar( 'footerfull' ); ?>

<div class="wrapper" id="wrapper-footer">

	<div class="<?php echo esc_attr( $container ); ?>">

		<div class="row">

			<div class="col-md-12">

				<footer class="site-footer" id="colophon" role="contentinfo">

					<div class="site-info" id="site-publisher" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">

						<meta itemprop="name" content="<?php echo get_bloginfo( 'name', 'display' ); ?>" />
						<meta itemprop="url" content="<?php echo home_url( '/' ); ?>" />
							<?php
							if ( has_custom_logo() ) {
								$image = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ) );
							?>
								<div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
									<meta itemprop="url" content="<?php echo current( $image ); ?>" />
									<meta itemprop="width" content="<?php echo next( $image ); ?>" />
									<meta itemprop="height" content="<?php echo next( $image ); ?>" />
								</div>
							<?php } ?>

							<?php echo get_bloginfo( 'name', 'display' ); ?> <?php echo copyright(); ?>
							<span class="sep"> | </span>

							<a href="<?php  echo esc_url( __( 'http://wordpress.org/','understrap' ) ); ?>"><?php printf( 
							/* translators:*/
							esc_html__( 'Proudly powered by %s', 'understrap' ),'WordPress' ); ?></a>
								<span class="sep"> | </span>
					
							<?php printf( // WPCS: XSS ok.
							/* translators:*/
								esc_html__( 'Theme: %1$s by %2$s.', 'understrap' ), $the_theme->get( 'Name' ),  '<a href="'.esc_url( __('http://understrap.com', 'understrap')).'">understrap.com</a>' ); ?> 
				
							(<?php printf( // WPCS: XSS ok.
							/* translators:*/
								esc_html__( 'Version: %1$s', 'understrap' ), $the_theme->get( 'Version' ) ); ?>)
					</div><!-- .site-info -->

				</footer><!-- #colophon -->

			</div><!--col end -->

		</div><!-- row end -->

	</div><!-- container end -->

</div><!-- wrapper end -->

</div><!-- #page we need this extra closing tag here -->

<?php wp_footer(); ?>

</body>

</html>

