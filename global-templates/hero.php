<?php
/**
 * Hero setup.
 *
 * @package understrap
 */

?>

<?php if ( is_active_sidebar( 'hero' ) || is_active_sidebar( 'statichero' ) || is_active_sidebar( 'herocanvas' ) ) : ?>

	<div class="wrapper" id="wrapper-hero">
	
		<?php get_template_part( 'sidebar-templates/sidebar', 'hero' ); ?>
		
		<?php get_template_part( 'sidebar-templates/sidebar', 'herocanvas' ); ?>

		<?php get_template_part( 'sidebar-templates/sidebar', 'statichero' ); ?>

	</div>

<?php endif; ?>
