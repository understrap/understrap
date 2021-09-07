<?php
/**
 * Template Name: Left and Right Sidebar Layout
 *
 * This template can be used to override the default template and sidebar setup
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper" id="page-wrapper">

	<div class="<?php echo esc_attr( $container ); ?>" id="content">

		<div class="row">

			<?php
			get_template_part( 'sidebar-templates/sidebar', 'left' );

			if ( is_active_sidebar( 'left-sidebar' ) xor is_active_sidebar( 'right-sidebar' ) ) {
				$class = 'col-md-8';
			} elseif ( is_active_sidebar( 'left-sidebar' ) && is_active_sidebar( 'right-sidebar' ) ) {
				$class = 'col-md-4';
			} else {
				$class = 'col-md-12';
			}
			?>
			<div class="<?php echo $class; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> content-area" id="primary">

				<main class="site-main" id="main" role="main">

					<?php
					while ( have_posts() ) {
						the_post();

						get_template_part( 'loop-templates/content', 'page' );

						// If comments are open or we have at least one comment, load up the comment template.
						if ( comments_open() || get_comments_number() ) {
							comments_template();
						}
					}
					?>

				</main><!-- #main -->

			</div><!-- #primary -->

			<?php get_template_part( 'sidebar-templates/sidebar', 'right' ); ?>

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #page-wrapper -->

<?php
get_footer();
