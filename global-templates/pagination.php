<?php
/**
 * Boostrap 4 pagination
 *
 * @package understrap
 */

/**
 * Generates a pagination partial template for Bootstrap 4
 * Mostly based on http://www.wpbeginner.com/wp-themes/how-to-add-numeric-pagination-in-your-wordpress-theme/
 */
function understrap_pagination() {
	if ( is_singular() ) {
		return;
	}

	global $wp_query;

	/** Stop execution if there's only 1 page */
	if ( $wp_query->max_num_pages <= 1 ) {
		return;
	}

	$paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
	$max   = intval( $wp_query->max_num_pages );

	/**    Add current page to the array */
	if ( $paged >= 1 ) {
		$links[] = $paged;
	}

	/**    Add the pages around the current page to the array */
	if ( $paged >= 3 ) {
		$links[] = $paged - 1;
		$links[] = $paged - 2;
	}

	if ( ( $paged + 2 ) <= $max ) {
		$links[] = $paged + 2;
		$links[] = $paged + 1;
	}

	echo '<nav aria-label="Page navigation"><ul class="pagination ">' . "\n";

	/**    Link to first page, plus ellipses if necessary */
	if ( ! in_array( 1, $links ) ) {
		$class = 1 == $paged ? ' class="active page-item"' : ' class="page-item"';

		printf( // WPCS: XSS OK.
			'<li %s><a class="page-link" href="%s"><i class="fa fa-step-backward" aria-hidden="true"></i></a></li>' . "\n",
		$class,
		esc_url( get_pagenum_link( 1 ) ), '1' );

		/**    Previous Post Link */
		if ( get_previous_posts_link() ) {
			printf( // WPCS: XSS OK.
				'<li class="page-item"><span class="page-link">%1$s</span></li> ' . "\n",
			get_previous_posts_link(  // WPCS: XSS OK.
			 '<span aria-hidden="true">&laquo;</span><span class="sr-only">Previous page</span>' ) );
		}

		if ( ! in_array( 2, $links ) ) {
			echo '<li class="page-item"></li>';
		}
	}

	// Link to current page, plus 2 pages in either direction if necessary.
	sort( $links );
	foreach ( (array) $links as $link ) {
		$class = $paged == $link ? ' class="active page-item"' : ' class="page-item"';
		printf( // WPCS: XSS OK.
			'<li %s><a href="%s" class="page-link">%s</a></li>' . "\n",
			$class,
			esc_url( get_pagenum_link( $link ) ), $link );
	}

	// Next Post Link.
	if ( get_next_posts_link() ) {
		printf( // WPCS: XSS OK.
			'<li class="page-item"><span class="page-link">%s</span></li>' . "\n",
			get_next_posts_link( '<span aria-hidden="true">&raquo;</span><span class="sr-only">Next page</span>' ) );
	}

	// Link to last page, plus ellipses if necessary.
	if ( ! in_array( $max, $links ) ) {
		if ( ! in_array( $max - 1, $links ) ) {
			echo '<li class="page-item"></li>' . "\n";
		}

		$class = $paged == $max ? ' class="active "' : ' class="page-item"';
		printf( // WPCS: XSS OK.
			'<li %s><a class="page-link" href="%s" aria-label="Next"><span aria-hidden="true"><i class="fa fa-step-forward" aria-hidden="true"></i></span><span class="sr-only">%s</span></a></li>' . "\n",
		$class . ' page-item 9', esc_url( get_pagenum_link( esc_html( $max ) ) ), esc_html( $max ) );
	}

	echo '</ul></nav>' . "\n";
}
