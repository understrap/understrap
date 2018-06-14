<?php
/**
 * Hero setup.
 *
 * @package understrap
 */

?>

<?php if ( is_active_sidebar( 'hero' ) || is_active_sidebar( 'statichero' ) || is_active_sidebar( 'herocanvas' ) ) : ?>

	<div class="wrapper" id="wrapper-hero">
	
		<?php get_sidebar( 'hero' ); ?>
		
		<?php get_sidebar( 'herocanvas' ); ?>

		<?php get_sidebar( 'statichero' ); ?>

	</div>

<?php endif; ?>
