<?php
/**
 * The template for displaying search forms
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$uid = wp_unique_id( 's-' ); // The search form specific unique ID for the input.

$aria_label = '';
if ( isset( $args['aria_label'] ) && ! empty( $args['aria_label'] ) ) {
	$aria_label = 'aria-label="' . esc_attr( $args['aria_label'] ) . '"';
}

$submit_wrapper_open  = understrap_is_bootstrap_v4() ? '<span class="input-group-append">' : '';
$submit_wrapper_close = understrap_is_bootstrap_v4() ? '</span>' : '';
?>

<form
	role="search"
	class="search-form"
	method="get"
	action="<?php echo esc_url( home_url( '/' ) ); ?>"
	<?php echo $aria_label; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped above. ?>
>
	<label class="screen-reader-text" for="<?php echo $uid; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Ok. ?>">
		<?php echo esc_html_x( 'Search for:', 'label', 'understrap' ); ?>
	</label>
	<div class="input-group">
		<input
			type="search"
			class="field search-field form-control"
			id="<?php echo $uid; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Ok. ?>"
			name="s"
			value="<?php the_search_query(); ?>"
			placeholder="<?php echo esc_attr_x( 'Search &hellip;', 'placeholder', 'understrap' ); ?>"
		>
		<?php echo $submit_wrapper_open; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Ok. ?>
			<input
				type="submit"
				class="submit search-submit btn btn-primary"
				name="submit"
				value="<?php echo esc_attr_x( 'Search', 'submit button', 'understrap' ); ?>"
			>
		<?php echo $submit_wrapper_close; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Ok. ?>
	</div>
</form>
<?php
