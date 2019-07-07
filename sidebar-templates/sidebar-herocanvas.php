<?php
/**
 * Sidebar - hero canvas setup.
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<?php if ( is_active_sidebar( 'herocanvas' ) ) : ?>

	<!-- ******************* The Hero Canvas Widget Area ******************* -->

	<?php dynamic_sidebar( 'herocanvas' ); ?>

<?php endif; ?>
