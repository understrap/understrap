<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package understrap
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<div id="secondary" class="col-md-4 widget-area" role="complementary">

	<?php dynamic_sidebar( 'sidebar-1' ); ?>
	
</div><!-- #secondary -->
