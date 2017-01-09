<?php
/**
 * Static hero sidebar setup.
 *
 * @package understrap
 */

?>
<?php if ( is_active_sidebar( 'statichero' ) ) : ?>

	<!-- ******************* The Hero Widget Area ******************* -->

	<div class="wrapper" id="wrapper-static-hero">

		<?php dynamic_sidebar( 'statichero' ); ?>

		</div><!-- closing owl carousel -->

	</div><!-- #wrapper-static-hero -->

<?php endif; ?>
