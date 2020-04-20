<?php
/**
 * Right sidebar check
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

</div><!-- #closing the primary container from /global-templates/left-sidebar-check.php -->

<?php
$sidebar_pos = understrap_get_sidebar_pos();
if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ) {
	get_template_part( 'sidebar-templates/sidebar', 'right' );
}
