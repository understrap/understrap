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

<div id="carouselExampleControls" class="carousel slide" data-bs-interval="false">

	<div class="carousel-inner">

		<?php dynamic_sidebar( 'hero' ); ?>

	</div>

	<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">

		<span class="carousel-control-prev-icon" aria-hidden="true"></span>

		<span class="screen-reader-text"><?php echo esc_html_x( 'Previous', 'carousel control', 'understrap' ); ?></span>

	</a>

	<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">

		<span class="carousel-control-next-icon" aria-hidden="true"></span>

		<span class="screen-reader-text"><?php echo esc_html_x( 'Next', 'carousel control', 'understrap' ); ?></span>

	</a>

</div><!-- .carousel -->
