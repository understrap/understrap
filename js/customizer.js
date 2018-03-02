/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ ) {

	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	// Header text color.
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title a, .site-description' ).css( {
					'clip': 'rect(1px, 1px, 1px, 1px)',
					'position': 'absolute'
				} );
			} else {
				$( '.site-title a, .site-description' ).css( {
					'clip': 'auto',
					'position': 'relative'
				} );
				$( '.site-title a, .site-description' ).css( {
					'color': to
				} );
			}
		} );
	} );

	wp.customize( 'text_color', function( value ) {
		value.bind( function( to ) {
			$( 'body' ).css( {
				'color': to
			} );
		} );
	} );

	wp.customize( 'primary_color', function( value ) {
		value.bind( function( to ) {
			$( 'a' ).css( {
				'color': to
			} );
			$( '*[class*="primary"]' ).css( {
				'background-color': to,
				'border-color': to
			} );
		} );
	} );

	wp.customize( 'primary_hover_color', function( value ) {
		value.bind( function( to ) {
			$( 'a' ).css( {
				'color': to
			} );
			$( '*[class*="primary"]:hover' ).css( {
				'background-color': to,
				'border-color': to
			} );
		} );
	} );

} )( jQuery );
