<?php
/**
 * Basic Contact Form 7 support
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_filter( 'wpcf7_form_tag', 'understrap_wpcf7_tag_add_classes' );

if ( ! function_exists( 'understrap_wpcf7_tag_add_classes' ) ) {
	/**
	 * Adds Bootstrap classes to the Contact form 7 tag attributes.
	 *
	 * @param wpcf7-form-tag-array $tag Array of tag attributes.
	 * @return wpcf7-form-tag-array Maybe filtered tag attributes.
	 */
	function understrap_wpcf7_tag_add_classes( $tag ) {

		$classes = understrap_wpcf7_get_input_class_map();

		if ( ! isset( $classes[ $tag['basetype'] ] ) ) {
			return $tag;
		}

		if ( ! is_array( $classes[ $tag['basetype'] ] ) ) {
			return understrap_wpcf7_add_class( $tag, $classes[ $tag['basetype'] ] );
		}

		foreach ( $classes[ $tag['basetype'] ] as $class ) {
			$tag = understrap_wpcf7_add_class( $tag, $class );
		}

		return $tag;
	}
}

if ( ! function_exists( 'understrap_wpcf7_get_input_class_map' ) ) {
	/**
	 * Retrieves an array of Bootstrap input classes keyed by input type.
	 *
	 * @return array<string,string[]|string> Associate
	 */
	function understrap_wpcf7_get_input_class_map() {

		$classes = array(
			'text'           => 'form-control',
			'email'          => 'form-control',
			'textarea'       => 'form-control',
			'url'            => 'form-control',
			'date'           => 'form-control',
			'quiz'           => 'form-control',
			'file'           => 'form-control',
			'submit'         => understrap_wpcf7_get_submit_classes(),
			'select'         => 'form-select',
			'range'          => 'form-range',
			// Non standard input types.
			'search'         => 'form-control',
			'tel'            => 'form-control',
			'number'         => 'form-control',
			'datetime-local' => 'form-control',
			'week'           => 'form-control',
			'month'          => 'form-control',
			'color'          => 'form-control form-control-color',
		);

		if ( 'bootstrap4' === get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' ) ) {
			$classes['select'] = 'form-control';
			$classes['range']  = 'form-control-range';
			$classes['color']  = 'form-control';
		}

		return $classes;
	}
}

if ( ! function_exists( 'understrap_wpcf7_get_submit_classes' ) ) {
	/**
	 * Retrieves the Bootstrap CSS classes applied to the Contact Form 7 submit button.
	 *
	 * @return string[] Array of classes applied to the submit button.
	 */
	function understrap_wpcf7_get_submit_classes() {
		$classes = array( 'btn', 'btn-outline-primary' );

		/**
		 * Filters the classes added to the Contact Form 7 submit button.
		 *
		 * @param string[] $classes Array of classes to be added to the submit button.
		 */
		return apply_filters( 'understrap_wpcf7_submit_classes', $classes );
	}
}

if ( ! function_exists( 'understrap_wpcf7_add_class' ) ) {
	/**
	 * Adds classes to a Contact From 7 tag.
	 *
	 * @param wpcf7-form-tag-array $tag   Array of tag attributes.
	 * @param string               $class Class(es) to add to the tag.
	 * @return wpcf7-form-tag-array Array of tag attributes.
	 */
	function understrap_wpcf7_add_class( $tag, $class ) {

		if ( empty( $tag['options'] ) ) {
			$tag['options'][] = "class:{$class}";
		} elseif ( ! in_array( "class:{$class}", $tag['options'], true ) ) {
			// Add class to the beginning of the array to let users override the class.
			array_unshift( $tag['options'], "class:{$class}" );
		}
		return $tag;
	}
}

add_filter( 'wpcf7_form_response_output', 'understrap_wpcf7_form_response_output', 10, 5 );

if ( ! function_exists( 'understrap_wpcf7_form_response_output' ) ) {
	/**
	 * Adds Bootstrap classes to the non-AJAX form response output.
	 *
	 * @param string            $output  Form response HTML.
	 * @param string            $class   CSS class added to the container wrapping the response.
	 * @param string            $content The form response output content.
	 * @param WPCF7_ContactForm $form    Form instance.
	 * @param string            $status  Form status.
	 * @return string The filtered form response output.
	 */
	function understrap_wpcf7_form_response_output( $output, $class, $content, $form, $status ) {

		return str_replace( $class, $class . ' alert', $output );
	}
}
