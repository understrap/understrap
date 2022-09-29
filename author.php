<?php
/**
 * The template for displaying the author pages
 *
 * Learn more: https://codex.wordpress.org/Author_Templates
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper" id="author-wrapper">

	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

		<div class="row">

			<!-- Do the left sidebar check -->
			<?php get_template_part( 'global-templates/left-sidebar-check' ); ?>

			<main class="site-main" id="main">

				<header class="page-header author-header">

					<?php
					if ( get_query_var( 'author_name' ) ) {
						$curauth = get_user_by( 'slug', get_query_var( 'author_name' ) );
					} else {
						$curauth = get_userdata( intval( $author ) );
					}

					the_archive_title( '<h1 class="page-title">', '</h1>' );

					if ( ! empty( $curauth->ID ) ) {
						$alt = sprintf(
							/* translators: %s: author name */
							_x( 'Profile picture of %s', 'Avatar alt', 'understrap' ),
							$curauth->display_name
						);
						echo get_avatar( $curauth->ID, 96, '', $alt );
					}

					if ( ! empty( $curauth->user_url ) || ! empty( $curauth->user_description ) ) {
						?>
						<dl>
							<?php if ( ! empty( $curauth->user_url ) ) : ?>
								<dt><?php esc_html_e( 'Website', 'understrap' ); ?></dt>
								<dd>
									<a href="<?php echo esc_url( $curauth->user_url ); ?>"><?php echo esc_html( $curauth->user_url ); ?></a>
								</dd>
							<?php endif; ?>

							<?php if ( ! empty( $curauth->user_description ) ) : ?>
								<dt>
									<?php
									printf(
										/* translators: %s: author name */
										esc_html__( 'About %s', 'understrap' ),
										$curauth->display_name
									);
									?>
								</dt>
								<dd><?php echo esc_html( $curauth->user_description ); ?></dd>
							<?php endif; ?>
						</dl>
						<?php
					}

					if ( have_posts() ) {
						printf(
							/* translators: %s: author name */
							'<h2>' . esc_html__( 'Posts by %s', 'understrap' ) . '</h2>',
							$curauth->display_name
						);
					}
					?>

				</header><!-- .page-header -->

				<!-- The Loop -->
				<?php
				if ( have_posts() ) {
					while ( have_posts() ) {
						the_post();
						get_template_part( 'loop-templates/content', 'author' );
					}
				} else {
					get_template_part( 'loop-templates/content', 'none' );
				}
				?>
				<!-- End Loop -->

			</main><!-- #main -->

			<!-- The pagination component -->
			<?php understrap_pagination(); ?>

			<!-- Do the right sidebar check -->
			<?php get_template_part( 'global-templates/right-sidebar-check' ); ?>

		</div> <!-- .row -->

	</div><!-- #content -->

</div><!-- #author-wrapper -->

<?php
get_footer();
