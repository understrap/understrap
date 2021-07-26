<?php
/**
 * The template for displaying the author pages
 *
 * Learn more: https://codex.wordpress.org/Author_Templates
 *
 * @package UnderStrap
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

					printf(
						/* translators: %s: author name */
						'<h1 class="page-title">' . esc_html__( 'About %s', 'understrap' ) . '</h1>',
						$curauth->display_name
					);

					if ( ! empty( $curauth->ID ) ) {
						echo get_avatar( $curauth->ID );
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
								<dt><?php esc_html_e( 'Profile', 'understrap' ); ?></dt>
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
						echo '<ul>';
						while ( have_posts() ) {
							the_post();
							echo '<li>';
								printf(
									'<a rel="bookmark" href="%1$s">%2$s</a>',
									esc_url( apply_filters( 'the_permalink', get_permalink( $post ), $post ) ),
									get_the_title()
								);
								understrap_posted_on();
								esc_html_e( 'in', 'understrap' );
								the_category( '&' );
							echo '</li>';
						}
						echo '</ul>';
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
