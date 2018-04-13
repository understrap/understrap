<?php
/**
 * Sidebar - hero canvas setup.
 *
 * @package understrap
 */

?>

<?php if ( is_active_sidebar( 'herocanvas' ) ) : ?>

	<!-- ******************* The Hero Canvas Widget Area ******************* -->

	<div class="wrapper" id="wrapper-hero-canvas">

		<?php dynamic_sidebar( 'herocanvas' ); ?>

	</div>

<?php endif; ?>