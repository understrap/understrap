/**
 * Vertical page navigation
 * A temporary source file providing smooth scrolling navigation to Pages
 */
(function( $ ) {
	var currentPage = location.href;
	var adjustedHeight = $( 'body' ).hasClass( 'admin-bar' ) ? 36 : 0;
	var blogPage = vars.homeUrl + '/' + vars.pageForPosts;
	if ( currentPage.substr( -1 ) === '/' ) {
		currentPage = currentPage.substr( 0, currentPage.length - 1 );
	}

	$( document ).ready(function() {
		// smoothly scroll to an ID
		$( 'a[href*="#"]:not([href="#"])' ).click( function ( e ) {
			var target;
			// if not on root URL
			if ( currentPage === blogPage || vars.isSingle ) {
				target = $(this);
				target = vars.homeUrl + '/' + target[0].hash;
				location = target;
			}
			target = $( this.hash );
			target = target.length ? target : $( '[name=' + this.hash.slice(1) + ']' );
			if ( target.length ) {

				$( 'html, body' ).delay( 100 ).animate({
					scrollTop: target.offset().top - adjustedHeight
				}, 800);
				// put the hash  in  location bar
				window.history.pushState( null, null, e.delegateTarget.href );
				return false;
			}
		});
	});
})( jQuery );
