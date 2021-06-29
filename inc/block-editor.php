<?php
/**
 * Block editor (gutenberg) specific functionality
 *
 * @package UnderStrap
 */


add_action( 'after_setup_theme', 'understrap_block_editor_setup' );

if ( ! function_exists( 'understrap_block_editor_setup' ) ) {

	/**
	 * Sets up our default theme support for the WordPress block editor.
	 *
	 */
	function understrap_block_editor_setup() {

		// Add support for the block editor stylesheet.
		add_theme_support( 'editor-styles' );

		// Add support for wide alignment.
		add_theme_support( 'align-wide' );

		/**
		 * Filters the default bootstrap color palette so it can be overriden by child themes or plugins when we add theme support for editor-color-palette
		 *
		 * @param array $color_palette An array of color options for the editor-color-palette setting.
		 */
		$color_palette = apply_filters(
			'understrap_theme_editor_color_palette',
			array(
				array(
					'name'  => esc_attr__( 'blue', 'understrap' ),
					'slug'  => 'blue',
					'color' => '#007bff',
				),
				array(
					'name'  => esc_attr__( 'indigo', 'understrap' ),
					'slug'  => 'indigo',
					'color' => '#6610f2',
				),
				array(
					'name'  => esc_attr__( 'purple', 'understrap' ),
					'slug'  => 'purple',
					'color' => '#5533ff', // Note: See /_theme_variables.scss for our purple override.
				),
				array(
					'name'  => esc_attr__( 'pink', 'understrap' ),
					'slug'  => 'pink',
					'color' => '#e83e8c',
				),
				array(
					'name'  => esc_attr__( 'red', 'understrap' ),
					'slug'  => 'red',
					'color' => '#dc3545',
				),
				array(
					'name'  => esc_attr__( 'orange', 'understrap' ),
					'slug'  => 'orange',
					'color' => '#fd7e14',
				),
				array(
					'name'  => esc_attr__( 'yellow', 'understrap' ),
					'slug'  => 'yellow',
					'color' => '#ffc107',
				),
				array(
					'name'  => esc_attr__( 'green', 'understrap' ),
					'slug'  => 'green',
					'color' => '#28a745',
				),
				array(
					'name'  => esc_attr__( 'teal', 'understrap' ),
					'slug'  => 'teal',
					'color' => '#20c997',
				),
				array(
					'name'  => esc_attr__( 'cyan', 'understrap' ),
					'slug'  => 'cyan',
					'color' => '#17a2b8',
				),
			)
		);

		// Register our custom colors as options in the editor.
		add_theme_support( 'editor-color-palette', $color_palette );
	}
}
