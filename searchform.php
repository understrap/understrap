<?php
/**
 * The template for displaying search forms
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<form method="get" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>" role="search" aria-labelledby="site-search">

	<fieldset aria-labelledby="site-search">

		<h3 class="sr-only" id="site-search">
			<?php esc_html_e( 'Search this site', 'understrap' ); ?>
		</h3>

		<div class="input-group">

			<label class="sr-only" for="s"><?php esc_html_e( 'Search string', 'understrap' ); ?></label>
			<input class="field form-control" id="s" name="s" type="search" spellcheck="false" autocomplete="off" placeholder="<?php esc_attr_e( 'Search &hellip;', 'understrap' ); ?>" value="<?php the_search_query(); ?>">

			<span class="input-group-append">
				<label class="sr-only" for="searchsubmit"><?php esc_html_e( 'Conduct search', 'understrap' ); ?></label>
				<input class="submit btn btn-primary" id="searchsubmit" name="submit" type="submit" value="<?php esc_attr_e( 'Search', 'understrap' ); ?>">
			</span>

		</div>

	</fieldset>
</form>
