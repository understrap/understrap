<?php
/**
 * Pagination layout
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'understrap_pagination' ) ) {
	/**
	 * Displays the navigation to next/previous set of posts.
	 *
	 * @param array  $args {
	 *     (Optional) Array of arguments for generating paginated links for archives.
	 *
	 *     @type string $base               Base of the paginated url. Default empty.
	 *     @type string $format             Format for the pagination structure. Default empty.
	 *     @type int    $total              The total amount of pages. Default is the value WP_Query's
	 *                                      `max_num_pages` or 1.
	 *     @type int    $current            The current page number. Default is 'paged' query var or 1.
	 *     @type string $aria_current       The value for the aria-current attribute. Possible values are 'page',
	 *                                      'step', 'location', 'date', 'time', 'true', 'false'. Default is 'page'.
	 *     @type bool   $show_all           Whether to show all pages. Default false.
	 *     @type int    $end_size           How many numbers on either the start and the end list edges.
	 *                                      Default 1.
	 *     @type int    $mid_size           How many numbers to either side of the current pages. Default 2.
	 *     @type bool   $prev_next          Whether to include the previous and next links in the list. Default true.
	 *     @type bool   $prev_text          The previous page text. Default '&laquo;'.
	 *     @type bool   $next_text          The next page text. Default '&raquo;'.
	 *     @type string $type               Controls format of the returned value. Possible values are 'plain',
	 *                                      'array' and 'list'. Default is 'array'.
	 *     @type array  $add_args           An array of query args to add. Default false.
	 *     @type string $add_fragment       A string to append to each link. Default empty.
	 *     @type string $before_page_number A string to appear before the page number. Default empty.
	 *     @type string $after_page_number  A string to append after the page number. Default empty.
	 *     @type string $screen_reader_text Screen reader text for the nav element. Default 'Posts navigation'.
	 * }
	 * @param string $class                 (Optional) Classes to be added to the <ul> element. Default 'pagination'.
	 */
	function understrap_pagination( $args = array(), $class = 'pagination' ) {

		if ( ! $GLOBALS['wp_query'] instanceof WP_Query || ( ! isset( $args['total'] ) && $GLOBALS['wp_query']->max_num_pages <= 1 ) ) {
			return;
		}

		$args = wp_parse_args(
			$args,
			array(
				'mid_size'           => 2,
				'prev_next'          => true,
				'prev_text'          => _x( '&laquo;', 'previous set of posts', 'understrap' ),
				'next_text'          => _x( '&raquo;', 'next set of posts', 'understrap' ),
				'current'            => max( 1, get_query_var( 'paged' ) ),
				'screen_reader_text' => __( 'Posts navigation', 'understrap' ),
			)
		);

		// Make sure we always get an array.
		$args['type'] = 'array';

		/**
		 * Array of paginated links.
		 *
		 * @var array<int,string>
		 */
		$links = paginate_links( $args );
		if ( empty( $links ) ) {
			return;
		}
		?>

		<!-- The pagination component -->
		<nav aria-labelledby="posts-nav-label">

			<h2 id="posts-nav-label" class="screen-reader-text">
				<?php echo esc_html( $args['screen_reader_text'] ); ?>
			</h2>

			<ul class="<?php echo esc_attr( $class ); ?>">

				<?php
				foreach ( $links as $link ) {
					?>
					<li class="page-item <?php echo strpos( $link, 'current' ) ? 'active' : ''; ?>">
						<?php
						$search  = array( 'page-numbers', 'dots' );
						$replace = array( 'page-link', 'disabled dots' );
						echo str_replace( $search, $replace, $link ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
						?>
					</li>
					<?php
				}
				?>

			</ul>

		</nav>

		<?php
	}
}
