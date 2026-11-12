/**
 * Scripts within the customizer controls window.
 *
 * Shows the navbar type setting in Bootstrap 5 mode.
 */

( function () {
	wp.customize.bind( 'ready', function () {
		// Only show the navbar type setting when running Bootstrap 5.
		wp.customize( 'understrap_bootstrap_version', function ( setting ) {
			wp.customize.control(
				'understrap_navbar_type',
				function ( control ) {
					const visibility = function () {
						if ( 'bootstrap5' === setting.get() ) {
							control.container.slideDown( 180 );
						} else {
							control.container.slideUp( 180 );
						}
					};

					visibility();
					setting.bind( visibility );
				}
			);
		} );
	} );
} )();
