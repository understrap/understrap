<?php
/**
 * The left sidebar containing the main widget area
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Return early if the sidebar is not active.
if ( ! is_active_sidebar( 'left-sidebar' ) ) {
	return;
}

// Set sidebar width according to the sidebar position (left or both).
$sidebar_pos = understrap_get_sidebar_pos();

// Print the sidebar.
?>
<div class="col-md-<?php understrap_left_sidebar_width( $sidebar_pos ); ?> widget-area" id="left-sidebar" role="complementary">
	<?php dynamic_sidebar( 'left-sidebar' ); ?>
</div><!-- #left-sidebar -->
<?php
