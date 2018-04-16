<?php
/**
 * Sidebar - hero canvas setup.
 *
 * @package understrap
 */

if ( is_active_sidebar( 'herocanvas' ) ) :
	?>
	<!-- ******************* The Hero Canvas Widget Area ******************* -->

	<?php
	dynamic_sidebar( 'herocanvas' );

endif;
