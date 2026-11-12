<?php
/**
 * Bootstrap 6 responsive navbar.
 *
 * @package Understrap
 */

defined( 'ABSPATH' ) || exit;

$container = get_theme_mod( 'understrap_container_type', 'container' );
?>
<nav id="main-nav" class="navbar md:navbar-expand bg-primary" data-bs-theme="dark" aria-labelledby="main-nav-label">
	<h2 id="main-nav-label" class="visually-hidden"><?php esc_html_e( 'Main Navigation', 'understrap' ); ?></h2>

	<div class="<?php echo esc_attr( $container ); ?>">
		<?php get_template_part( 'global-templates/navbar-branding' ); ?>

		<?php if ( has_nav_menu( 'primary' ) ) : ?>
			<button
				class="navbar-toggler btn-icon"
				type="button"
				data-bs-toggle="drawer"
				data-bs-target="#navbarNavDrawer"
				aria-controls="navbarNavDrawer"
				aria-label="<?php esc_attr_e( 'Open menu', 'understrap' ); ?>"
			>
				<span class="navbar-toggler-icon" aria-hidden="true"></span>
			</button>

			<dialog class="drawer drawer-end" tabindex="-1" id="navbarNavDrawer" aria-labelledby="navbarNavDrawerLabel">
				<div class="drawer-header">
					<h2 class="drawer-title" id="navbarNavDrawerLabel"><?php esc_html_e( 'Main Navigation', 'understrap' ); ?></h2>
					<button type="button" class="btn-close" data-bs-dismiss="drawer" aria-label="<?php esc_attr_e( 'Close menu', 'understrap' ); ?>"></button>
				</div>
				<div class="drawer-body">
					<?php
					wp_nav_menu(
						array(
							'theme_location'       => 'primary',
							'container'            => false,
							'menu_class'           => 'nav navbar-nav ms-auto',
							'menu_id'              => 'main-menu',
							'fallback_cb'          => false,
							'depth'                => 2,
							'walker'               => new Understrap_WP_Bootstrap_Navwalker(),
							'understrap_bootstrap6' => true,
						)
					);
					?>
				</div>
			</dialog>
		<?php endif; ?>
	</div>
</nav>
