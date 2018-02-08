<?php
/**
 * The template for displaying search forms in Underscores.me
 *
 * @package befluid
 */

?>

<form method="get" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>" role="search">
	<label class="assistive-text card-header d-block py-2 text-center h6" for="s"><?php esc_html_e( 'Search', 'befluid' ); ?></label>
	<div class="py-2 px-2">
	<div class="input-group">
		<input class="field form-control" id="s" name="s" type="text"
			placeholder="<?php esc_attr_e( 'Search &hellip;', 'befluid' ); ?>" value="<?php the_search_query(); ?>">
		<span class="input-group-append">
			<input class="submit btn btn-primary" id="searchsubmit" name="submit" type="submit"
			value="<?php esc_attr_e( 'Search', 'befluid' ); ?>">
	</span>
	</div>
	</div>
</form>
