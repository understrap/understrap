<?php
/**
 * Sidebar - hero setup
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! is_active_sidebar( 'hero' ) ) {
	return;
}
?>

<!-- ******************* The Hero Widget Area ******************* -->

<div id="carouselExampleControls" class="carousel slide" data-interval="false" data-bs-ride="false">

	<div class="carousel-inner">

		<?php
			ob_start();
			dynamic_sidebar( 'hero' );
			echo wp_kses_post( understrap_remove_hero_lazy_load( ob_get_clean() ) );
		?>

	</div>

	<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" data-bs-slide="prev">

		<span class="carousel-control-prev-icon" aria-hidden="true"></span>

		<span class="screen-reader-text"><?php echo esc_html_x( 'Previous', 'carousel control', 'understrap' ); ?></span>

	</a>

	<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" data-bs-slide="next">

		<span class="carousel-control-next-icon" aria-hidden="true"></span>

		<span class="screen-reader-text"><?php echo esc_html_x( 'Next', 'carousel control', 'understrap' ); ?></span>

	</a>

</div><!-- .carousel -->
