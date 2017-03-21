<?php
/**
 * Hero setup.
 *
 * @package understrap
 */

?>

<?php if ( is_active_sidebar( 'hero' ) || is_active_sidebar( 'statichero' ) ) : ?>

	<div class="wrapper" id="wrapper-hero">
	
		<?php get_sidebar( 'hero' ); ?>
		
		<?php get_sidebar( 'statichero' ); ?>

	</div>

<?php endif; ?>
