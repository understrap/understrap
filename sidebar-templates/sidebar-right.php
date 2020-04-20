<?php
/**
 * The right sidebar containing the main widget area
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Return early if the sidebar is not active.
if ( ! is_active_sidebar( 'right-sidebar' ) ) {
	return;
}

// Set sidebar width according to the sidebar position (right or both).
$sidebar_pos = understrap_get_sidebar_pos();

// Print the sidebar.
?>
<div class="col-md-<?php understrap_right_sidebar_width( $sidebar_pos ); ?> widget-area" id="right-sidebar" role="complementary">
	<?php dynamic_sidebar( 'right-sidebar' ); ?>
</div><!-- #right-sidebar -->
