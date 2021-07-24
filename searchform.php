<?php
/**
 * The template for displaying search forms
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$uid = wp_unique_id( '-' ); // The search form specific unique ID.
?>

<form method="get" class="search-form" id="<?php echo 'search-form' . $uid; ?>" action="<?php echo esc_url( home_url( '/' ) ); ?>" role="search">
	<label class="sr-only" for="<?php echo 's' . $uid; ?>"><?php esc_html_e( 'Search', 'understrap' ); ?></label>
	<div class="input-group">
		<input class="field form-control" id="<?php echo 's' . $uid; ?>" name="s" type="text"
			placeholder="<?php esc_attr_e( 'Search &hellip;', 'understrap' ); ?>" value="<?php the_search_query(); ?>">
		<span class="input-group-append">
			<input class="submit btn btn-primary" id="<?php echo 'search-submit' . $uid; ?>" name="submit" type="submit"
			value="<?php esc_attr_e( 'Search', 'understrap' ); ?>">
		</span>
	</div>
</form>
