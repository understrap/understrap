<?php
/**
 * Sidebar setup for footer full
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! is_active_sidebar( 'footerfull' ) ) {
	return;
}

$container = get_theme_mod( 'understrap_container_type' );
?>

<!-- ******************* The Footer Full-width Widget Area ******************* -->

<div class="wrapper" id="wrapper-footer-full" role="complementary">

	<div class="<?php echo esc_attr( $container ); ?>" id="footer-full-content" tabindex="-1">

		<div class="row">

			<?php dynamic_sidebar( 'footerfull' ); ?>

		</div>

	</div>

</div><!-- #wrapper-footer-full -->
