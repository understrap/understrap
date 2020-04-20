<?php
/**
 * Left sidebar check
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$sidebar_pos = understrap_get_sidebar_pos();
if ( 'left' === $sidebar_pos || 'both' === $sidebar_pos ) {
	get_template_part( 'sidebar-templates/sidebar', 'left' );
}
?>
<div class="col-md-<?php understrap_content_area_width(); ?> content-area" id="primary">
