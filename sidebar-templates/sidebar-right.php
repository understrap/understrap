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
$sidebar_width = understrap_right_sidebar_width( understrap_sidebar_pos() );

// Print the sidebar.
?>
<div class="col-md-<?php echo absint( $sidebar_width ); ?> widget-area" id="right-sidebar" role="complementary">
	<?php dynamic_sidebar( 'right-sidebar' ); ?>
</div><!-- #right-sidebar -->
